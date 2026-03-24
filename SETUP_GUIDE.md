# Superteam KPI Dashboard — Google Apps Script Migration Guide

## Why This Works

Your current setup (Vercel + MongoDB) fails because Vercel's serverless functions run from dynamic IPs that MongoDB Atlas can't whitelist reliably. Google Sheets + Apps Script solves this completely:

- **Google Sheets** = your database (free, no IP restrictions, easy to view/edit)
- **Google Apps Script** = your API server (free hosting, auto-scales, HTTPS built-in)
- **Your React frontend** = stays on Vercel, untouched (just a new API URL)

---

## Step-by-Step Setup (15 minutes)

### Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet
2. Name it **"Superteam KPI Dashboard"**
3. Note the spreadsheet URL — you'll need it in the next step

### Step 2: Add the Apps Script Code

1. In your spreadsheet, go to **Extensions → Apps Script**
2. This opens the Apps Script editor
3. Delete any existing code in `Code.gs`
4. Copy-paste the **entire contents** of the provided `Code.gs` file
5. Click **Save** (Ctrl+S)

### Step 3: Initialize the Sheets

1. In the Apps Script editor, select `setupSheets` from the function dropdown (next to the ▶ Run button)
2. Click **▶ Run**
3. Google will ask for permissions — click **Review Permissions → [Your Account] → Allow**
4. Check your spreadsheet — you should now see two sheets: **Users** and **LeadData**

### Step 4: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Type" → select **Web app**
3. Set these options:
   - **Description**: "Superteam KPI API v1"
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. **Copy the Web App URL** — it looks like:  
   `https://script.google.com/macros/s/AKfycbx.../exec`

> ⚠️ **Important**: Every time you edit the Apps Script code, you must create a **New deployment** (not update the existing one) for changes to take effect.

### Step 5: Update Your Frontend

1. Open `services/apiService.ts` in your project
2. Replace the **entire file** with the provided `apiService.ts`
3. Paste your Web App URL into the `APPS_SCRIPT_URL` constant:
   ```typescript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```

### Step 6: Clean Up Your Project

Since you no longer need the Express/MongoDB backend, you can optionally:

1. **Remove** the `/server` folder entirely
2. **Remove** the `/api` folder (Vercel serverless function)
3. **Remove** these from `package.json` dependencies:
   - `mongoose`
   - `express`
   - `cors`
   - `dotenv`
   - `jsonwebtoken`
   - `bcryptjs`
4. **Simplify** `vercel.json` to just:
   ```json
   {
     "version": 2,
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
5. Run `npm install` to clean up

### Step 7: Deploy & Test

1. Commit and push to GitHub
2. Vercel auto-deploys
3. Test login with `admin` / `admin123`
4. Import your CSV data through the dashboard UI — it now saves to Google Sheets!

---

## How It Works

### Architecture

```
┌──────────────────┐         ┌──────────────────────┐
│   React Frontend │  HTTP   │  Google Apps Script   │
│   (Vercel)       │ ──────► │  (Web App)            │
│                  │         │                       │
│  apiService.ts   │ ◄────── │  Code.gs              │
└──────────────────┘  JSON   └──────────┬───────────┘
                                        │ reads/writes
                                        ▼
                              ┌──────────────────────┐
                              │   Google Sheets       │
                              │                       │
                              │  "Users" sheet        │
                              │  "LeadData" sheet     │
                              └──────────────────────┘
```

### API Endpoints

| Action         | Method | Parameters                          |
|---------------|--------|-------------------------------------|
| Health check  | GET    | `?action=ping`                      |
| Get leads     | GET    | `?action=leads&token=xxx`           |
| Login         | POST   | `{ action: "login", username, password }` |
| Import data   | POST   | `{ action: "import", token, data }` |
| Change password | POST | `{ action: "update_password", token, oldPassword, newPassword }` |

### Data Storage

- **Users sheet**: One row per user with auth info and profile metadata
- **LeadData sheet**: One row per lead with `monthlyStats` stored as a JSON string

This keeps things simple. You can open the Google Sheet anytime to inspect or manually edit data.

---

## Seeding Your Existing Data

You have two options to get your existing data into the new system:

### Option A: Use the Dashboard UI (Recommended)

1. Log in as admin
2. Use the CSV Import feature as you normally would
3. The data will be saved to Google Sheets instead of MongoDB

### Option B: Manual Entry via Sheet

1. Open your Google Sheet
2. In the **Users** sheet, add rows manually:
   | id | name | password | teamName | role | roleType | avatar | mandate | email |
   |---|---|---|---|---|---|---|---|---|
   | ashish | Ashish Narula | (leave blank — set via import) | Underdogs | Senior Program Manager | spm | | | |
3. The password will be set automatically on first import

---

## Security Notes

- **Tokens** use HMAC-SHA256 signing (not JWT, since Apps Script doesn't have a JWT library, but the security is equivalent)
- **Passwords** are SHA-256 hashed with a salt (the secret key)
- **Change the `SECRET_KEY`** in `Code.gs` before deploying to production
- The admin password is hardcoded — change `ADMIN_PASS` in `Code.gs` if needed
- The Web App URL is public but all data endpoints require a valid token
- Google Sheets access is limited to your Google account

---

## Troubleshooting

### "TypeError: Failed to fetch"
- Make sure your Apps Script is deployed with **"Anyone"** access
- Check that you copied the full URL including `/exec` at the end

### CORS errors
- The `Content-Type: text/plain` header in POST requests avoids CORS preflight issues
- If you still see CORS errors, ensure you're using `text/plain` not `application/json`

### Data not showing up
- Open the Google Sheet and check the **Users** and **LeadData** tabs
- Verify the import was successful by checking for rows in both sheets

### "Not authorized" error
- Tokens expire after 5 days — log out and log in again
- Check that the `SECRET_KEY` in Code.gs hasn't changed since the token was issued

### Slow responses
- First call after a period of inactivity may take 2-3 seconds (Apps Script cold start)
- Subsequent calls are fast (~200-500ms)
- If you have 50+ leads, consider batching imports

---

## Limitations & Scaling

| Factor | Limit |
|--------|-------|
| Google Sheets rows | 10 million cells per spreadsheet |
| Apps Script execution | 6 minutes per call |
| Daily triggers | 90 min/day for free accounts |
| URL Fetch calls | 20,000/day |
| Concurrent users | Works well for ~20-50 simultaneous users |

For a KPI dashboard with a few dozen team members, this is more than enough. If you ever outgrow it, the same architecture works with Firebase or Supabase as a drop-in replacement.
