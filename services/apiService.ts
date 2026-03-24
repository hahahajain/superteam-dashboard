/**
 * API Service — Google Apps Script Backend (v2)
 * 
 * Uses GET-based approach to avoid Apps Script redirect issues with POST.
 */

import { LeadData } from '../types';

const APPS_SCRIPT_URL = 'https://script.google.com/a/macros/joinditto.in/s/AKfycbyJHaC8TFlrLeZUvXbXuwhxYnleifmP31Urdezs73sEjPkGg7MJgGOyUFASEgvW_h8I5Q/exec';
// Example: 'https://script.google.com/macros/s/AKfycbx.../exec'


// ── Helper: Call Apps Script reliably ────────────────────────────────

async function callAppsScript(params: Record<string, string>): Promise<any> {
  // Encode all params as URL query string (avoids POST redirect issues)
  const url = new URL(APPS_SCRIPT_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    redirect: 'follow'
  });

  const text = await response.text();

  if (!text || text.trim().length === 0) {
    throw new Error('Empty response from server');
  }

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error('Invalid response from server');
  }

  if (result.error) {
    throw new Error(result.error);
  }

  return result.data;
}


// ── Login ───────────────────────────────────────────────────────────

export const login = async (username: string, password: string) => {
  return await callAppsScript({
    action: 'login',
    username,
    password
  });
};


// ── Fetch Leads ─────────────────────────────────────────────────────

export const fetchLeadsFromAPI = async (): Promise<LeadData[]> => {
  try {
    const token = localStorage.getItem('token') || '';
    const data = await callAppsScript({
      action: 'leads',
      token
    });
    return data || [];
  } catch (error) {
    console.error('Could not fetch leads from API:', error);
    return [];
  }
};


// ── Import (no-op — data managed in Google Sheets) ──────────────────

export const importLeadsToAPI = async (_data: LeadData[]): Promise<boolean> => {
  console.warn('Import disabled — data is managed directly in Google Sheets.');
  return true;
};
