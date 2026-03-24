/**
 * ===================================================================
 * SUPERTEAM KPI DASHBOARD — Google Apps Script Backend
 * ===================================================================
 * Replaces: Express + MongoDB
 * Database:  Google Sheets (this same spreadsheet)
 * Auth:      Simple token-based (HMAC-SHA256)
 * 
 * SHEET STRUCTURE (auto-created on first run):
 *   "Users"    → id | name | password | teamName | role | roleType | avatar | mandate | email
 *   "LeadData" → id | monthlyStatsJSON
 *
 * DEPLOY: Publish → Deploy as web app → Execute as Me → Anyone
 * ===================================================================
 */

// ── Config ──────────────────────────────────────────────────────────
const SECRET_KEY = 'superteam_secret_key_2026'; // Change this!
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';
const DEFAULT_PASSWORD = 'Welcome123!';
const TOKEN_EXPIRY_DAYS = 5;

// ── Sheet Helpers ───────────────────────────────────────────────────

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function getUsersSheet() {
  return getOrCreateSheet('Users', [
    'id', 'name', 'password', 'teamName', 'role', 'roleType', 'avatar', 'mandate', 'email'
  ]);
}

function getLeadDataSheet() {
  return getOrCreateSheet('LeadData', ['id', 'monthlyStatsJSON']);
}

function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function findRowByColumn(sheet, colIndex, value) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][colIndex]).toLowerCase() === String(value).toLowerCase()) {
      return i + 1; // 1-based row number
    }
  }
  return -1;
}

// ── Simple Auth (no bcrypt in Apps Script, using SHA-256) ───────────

function hashPassword(password) {
  const raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password + SECRET_KEY);
  return raw.map(b => ('0' + ((b + 256) % 256).toString(16)).slice(-2)).join('');
}

function createToken(payload) {
  payload.exp = Date.now() + (TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const data = Utilities.base64EncodeWebSafe(JSON.stringify(payload));
  const sig = Utilities.computeHmacSha256Signature(data, SECRET_KEY)
    .map(b => ('0' + ((b + 256) % 256).toString(16)).slice(-2)).join('');
  return data + '.' + sig;
}

function verifyToken(token) {
  if (!token) return null;
  try {
    const [data, sig] = token.split('.');
    const expectedSig = Utilities.computeHmacSha256Signature(data, SECRET_KEY)
      .map(b => ('0' + ((b + 256) % 256).toString(16)).slice(-2)).join('');
    if (sig !== expectedSig) return null;
    const payload = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(data)).getDataAsString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

// ── Response Helpers ────────────────────────────────────────────────

function jsonResponse(data, status) {
  const output = ContentService.createTextOutput(JSON.stringify({
    status: status || 200,
    data: data
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function errorResponse(message, status) {
  const output = ContentService.createTextOutput(JSON.stringify({
    status: status || 400,
    error: message
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ── API Router ──────────────────────────────────────────────────────

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  const token = e.parameter.token || '';

  switch (action) {
    case 'ping':
      return jsonResponse({ message: 'Superteam API is live!', timestamp: new Date().toISOString() });

    case 'leads':
      return handleGetLeads(token);

    default:
      return jsonResponse({ message: 'Superteam KPI API. Use action=ping, action=leads, or POST for login/import.' });
  }
}

function doPost(e) {
  let body = {};
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return errorResponse('Invalid JSON body');
  }

  const action = (body.action || '').toLowerCase();

  switch (action) {
    case 'login':
      return handleLogin(body.username, body.password);

    case 'import':
      return handleImport(body.token, body.data);

    case 'update_password':
      return handleUpdatePassword(body.token, body.oldPassword, body.newPassword);

    default:
      return errorResponse('Unknown action. Use: login, import, update_password');
  }
}

// ── Login Handler ───────────────────────────────────────────────────

function handleLogin(username, password) {
  if (!username || !password) {
    return errorResponse('Username and password required', 400);
  }

  username = String(username).toLowerCase().trim();

  // Admin/Executive login
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = createToken({ id: 'executive', roleType: 'executive' });
    return jsonResponse({ token: token, roleType: 'executive', id: 'executive' });
  }

  // Regular user login
  const sheet = getUsersSheet();
  const row = findRowByColumn(sheet, 0, username);
  if (row === -1) {
    return errorResponse('Invalid credentials', 400);
  }

  const userData = sheet.getRange(row, 1, 1, 9).getValues()[0];
  const storedHash = userData[2]; // password column
  const inputHash = hashPassword(password);

  if (storedHash !== inputHash) {
    return errorResponse('Invalid credentials', 400);
  }

  const token = createToken({ id: userData[0], roleType: userData[5] });
  return jsonResponse({
    token: token,
    roleType: userData[5],
    id: userData[0]
  });
}

// ── Get Leads Handler ───────────────────────────────────────────────

function handleGetLeads(token) {
  const user = verifyToken(token);
  if (!user) {
    return errorResponse('Not authorized', 401);
  }

  const usersSheet = getUsersSheet();
  const leadDataSheet = getLeadDataSheet();
  const users = sheetToObjects(usersSheet);
  const leadDataRows = sheetToObjects(leadDataSheet);

  // Build a map of monthlyStats by lead id
  const statsMap = {};
  leadDataRows.forEach(row => {
    try {
      statsMap[row.id] = JSON.parse(row.monthlyStatsJSON || '[]');
    } catch (e) {
      statsMap[row.id] = [];
    }
  });

  let leads = users.map(u => ({
    id: u.id,
    name: u.name,
    teamName: u.teamName,
    role: u.role,
    roleType: u.roleType,
    avatar: u.avatar || '',
    mandate: u.mandate || '',
    monthlyStats: statsMap[u.id] || []
  }));

  // Role-based filtering
  if (user.roleType !== 'executive' && user.roleType !== 'admin') {
    leads = leads.filter(l => l.id === user.id);
  }

  return jsonResponse(leads);
}

// ── Import Handler ──────────────────────────────────────────────────

function handleImport(token, data) {
  const user = verifyToken(token);
  if (!user) {
    return errorResponse('Not authorized', 401);
  }
  if (user.roleType !== 'executive' && user.roleType !== 'admin') {
    return errorResponse('Not authorized to import data', 403);
  }
  if (!Array.isArray(data)) {
    return errorResponse('Expected an array of lead data', 400);
  }

  const usersSheet = getUsersSheet();
  const leadDataSheet = getLeadDataSheet();
  const defaultHash = hashPassword(DEFAULT_PASSWORD);

  let created = 0;
  let updated = 0;

  data.forEach(lead => {
    if (!lead.id || !lead.name) return;

    const leadId = String(lead.id).toLowerCase().trim();

    // ── Upsert into Users sheet ──
    const userRow = findRowByColumn(usersSheet, 0, leadId);
    const userData = [
      leadId,
      lead.name || '',
      '', // password placeholder (set below)
      lead.teamName || '',
      lead.role || '',
      lead.roleType || '',
      lead.avatar || '',
      lead.mandate || '',
      lead.email || ''
    ];

    if (userRow === -1) {
      // New user — set default password
      userData[2] = defaultHash;
      usersSheet.appendRow(userData);
      created++;
    } else {
      // Existing user — preserve password & merge metadata
      const existing = usersSheet.getRange(userRow, 1, 1, 9).getValues()[0];
      userData[2] = existing[2]; // keep existing password

      // Preserve metadata if incoming is empty
      if (!userData[3] && existing[3]) userData[3] = existing[3]; // teamName
      if (!userData[4] && existing[4]) userData[4] = existing[4]; // role
      if (!userData[5] && existing[5]) userData[5] = existing[5]; // roleType

      usersSheet.getRange(userRow, 1, 1, 9).setValues([userData]);
      updated++;
    }

    // ── Upsert into LeadData sheet ──
    const statsJson = JSON.stringify(lead.monthlyStats || []);
    const dataRow = findRowByColumn(leadDataSheet, 0, leadId);
    if (dataRow === -1) {
      leadDataSheet.appendRow([leadId, statsJson]);
    } else {
      leadDataSheet.getRange(dataRow, 2).setValue(statsJson);
    }
  });

  return jsonResponse({
    message: 'Data imported successfully',
    created: created,
    updated: updated,
    total: data.length
  });
}

// ── Update Password Handler ─────────────────────────────────────────

function handleUpdatePassword(token, oldPassword, newPassword) {
  const user = verifyToken(token);
  if (!user) {
    return errorResponse('Not authorized', 401);
  }

  const sheet = getUsersSheet();
  const row = findRowByColumn(sheet, 0, user.id);
  if (row === -1) {
    return errorResponse('User not found', 404);
  }

  const storedHash = sheet.getRange(row, 3).getValue();
  if (storedHash !== hashPassword(oldPassword)) {
    return errorResponse('Current password is incorrect', 400);
  }

  sheet.getRange(row, 3).setValue(hashPassword(newPassword));
  return jsonResponse({ message: 'Password updated successfully' });
}

// ── Utility: Seed initial data from constants ───────────────────────
// Run this once manually from the Apps Script editor to load your
// existing LEADS data into the sheet.

function seedInitialData() {
  Logger.log('Run importInitialData() with your LEADS array to seed the sheet.');
  Logger.log('Or use the CSV import feature from the dashboard UI.');
}

// ── Setup: Run once to initialize sheets ────────────────────────────

function setupSheets() {
  getUsersSheet();
  getLeadDataSheet();
  Logger.log('Sheets initialized! Now deploy as web app.');
}
