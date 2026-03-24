/**
 * ===================================================================
 * API Service — Google Apps Script Backend
 * ===================================================================
 * Replace your existing services/apiService.ts with this file.
 * 
 * IMPORTANT: Set your deployed Apps Script URL below.
 * ===================================================================
 */

import { LeadData } from '../types';

// ┌─────────────────────────────────────────────────────────────────┐
// │  PASTE YOUR DEPLOYED APPS SCRIPT WEB APP URL HERE              │
// └─────────────────────────────────────────────────────────────────┘
const APPS_SCRIPT_URL = 'YOUR_DEPLOYED_APPS_SCRIPT_URL_HERE';
// Example: 'https://script.google.com/macros/s/AKfycbx.../exec'


// ── Login ───────────────────────────────────────────────────────────

export const login = async (username: string, password: string) => {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }, // Apps Script needs text/plain to avoid CORS preflight
    body: JSON.stringify({
      action: 'login',
      username,
      password
    })
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result.data; // { token, roleType, id }
};


// ── Fetch Leads ─────────────────────────────────────────────────────

export const fetchLeadsFromAPI = async (): Promise<LeadData[]> => {
  try {
    const token = localStorage.getItem('token');
    const url = `${APPS_SCRIPT_URL}?action=leads&token=${encodeURIComponent(token || '')}`;
    
    const response = await fetch(url);
    const result = await response.json();

    if (result.error) {
      console.error('Fetch leads error:', result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error('Could not fetch leads from API:', error);
    return [];
  }
};


// ── Import Leads ────────────────────────────────────────────────────

export const importLeadsToAPI = async (data: LeadData[]): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        action: 'import',
        token,
        data
      })
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return true;
  } catch (error) {
    console.error('Could not import leads to API:', error);
    throw error;
  }
};
