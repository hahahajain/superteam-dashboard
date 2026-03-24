
import React from 'react';
import { 
  Settings2, 
  ShieldCheck, 
  Activity,
  Star,
  Award,
  Crown,
  TrendingUp,
  CheckCircle2,
  Zap,
  Flame,
  MessageSquare,
  Cpu
} from 'lucide-react';
import { PillarType, PillarData, LeadData } from './types';

export const LEADS: LeadData[] = [
  {
    id: 'ashish',
    name: 'Ashish Narula',
    teamName: 'Underdogs',
    role: 'Senior Program Manager',
    roleType: 'spm',
    avatar: 'https://picsum.photos/seed/ashish/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 222.00, achieved: 228.86, percentage: 103.09, policiesSold: 380, smc: 5.79, mp: 58.3, lp: 44.4 },
          health: { target: 0, achieved: 123.17, percentage: 0 },
          term: { target: 0, achieved: 105.69, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      },
      {
        month: 'November',
        categories: {
          total: { target: 209.35, achieved: 168.71, percentage: 80.59, policiesSold: 345, smc: 5.79, mp: 46.0, lp: 51.8 },
          health: { target: 0, achieved: 72.30, percentage: 0 },
          term: { target: 0, achieved: 96.41, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      },
      {
        month: 'December',
        categories: {
          total: { target: 244.10, achieved: 218.32, percentage: 89.44, policiesSold: 400, smc: 4.20, mp: 58.5, lp: 48.7 },
          health: { target: 0, achieved: 95.34, percentage: 0 },
          term: { target: 0, achieved: 122.98, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      },
      {
        month: 'January',
        categories: {
          total: { target: 233.00, achieved: 188.02, percentage: 80.70, policiesSold: 414, smc: 5.36, mp: 54.8, lp: 46.5 },
          health: { target: 0, achieved: 63.51, percentage: 0 },
          term: { target: 0, achieved: 121.27, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      }
    ]
  },
  {
    id: 'kirti',
    name: 'Kirti Singh Chandel',
    teamName: 'Elites',
    role: 'Program Manager',
    roleType: 'pm',
    avatar: 'https://picsum.photos/seed/kirti/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 141.00, achieved: 90.47, percentage: 64.16, policiesSold: 221, smc: 4.37, mp: 0, lp: 39.8 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 90.47, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      },
      {
        month: 'November',
        categories: {
          total: { target: 135.90, achieved: 94.99, percentage: 69.90, policiesSold: 227, smc: 5.48, mp: 0, lp: 45.8 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 94.99, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      },
      {
        month: 'December',
        categories: {
          total: { target: 142.10, achieved: 93.08, percentage: 65.50, policiesSold: 234, smc: 4.04, mp: 0, lp: 45.3 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 93.08, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      },
      {
        month: 'January',
        categories: {
          total: { target: 150.15, achieved: 125.35, percentage: 83.48, policiesSold: 294, smc: 5.18, mp: 0, lp: 50.0 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 124.32, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      }
    ]
  },
  {
    id: 'akhil',
    name: 'Akhil Anish',
    teamName: 'Rainmakers',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/akhil/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 147.00, achieved: 145.63, percentage: 99.07, policiesSold: 336, smc: 5.15, mp: 48.8, lp: 36.2 },
          health: { target: 0, achieved: 108.34, percentage: 0 },
          term: { target: 0, achieved: 37.29, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'November',
        categories: {
          total: { target: 181.80, achieved: 131.93, percentage: 72.57, policiesSold: 301, smc: 4.12, mp: 48.0, lp: 38.8 },
          health: { target: 0, achieved: 98.84, percentage: 0 },
          term: { target: 0, achieved: 33.09, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'December',
        categories: {
          total: { target: 195.00, achieved: 165.98, percentage: 85.12, policiesSold: 361, smc: 5.36, mp: 46.3, lp: 37.7 },
          health: { target: 0, achieved: 121.84, percentage: 0 },
          term: { target: 0, achieved: 44.15, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'January',
        categories: {
          total: { target: 156.10, achieved: 174.15, percentage: 111.56, policiesSold: 361, smc: 5.59, mp: 47.6, lp: 42.6 },
          health: { target: 0, achieved: 113.17, percentage: 0 },
          term: { target: 0, achieved: 57.65, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      }
    ]
  },
  {
    id: 'sushant',
    name: 'Sushant',
    teamName: 'Quality Guard',
    role: 'CX Quality Manager',
    roleType: 'cx_manager',
    avatar: 'https://picsum.photos/seed/sushant/100/100',
    mandate: "Drive measurable improvement in CX, DER, Soft-Skill Capability & Escalation Control through structured audits and targeted training",
    monthlyStats: [
      {
        month: 'January',
        categories: {
          total: { target: 100, achieved: 92, percentage: 92 },
          cx: {
            metrics: [
              { name: 'CX Trend', target: '↑ MoM', actual: '↑ 8% MoM', status: 'good' },
              { name: 'DER Improvement', target: '≥5% MoM', actual: '6.2% MoM', status: 'good' },
              { name: 'Soft-Skill Escalations', target: '<15% of total', actual: '11% of total', status: 'good' },
              { name: 'Recurring CX Issues Reduction', target: '≥20% MoM', actual: '18% MoM', status: 'warning' }
            ],
            rating: 'Strong'
          }
        },
        score: 92, weightedScore: 37, totalScore: 92
      }
    ]
  },
  {
    id: 'daxit',
    name: 'Daxit',
    teamName: 'Growth Ops',
    role: 'Referral, Upsell & Tech Ops Lead',
    roleType: 'ops_manager',
    avatar: 'https://picsum.photos/seed/daxit/100/100',
    mandate: "Maximize referral and upsell contribution while maintaining high TAT compliance and minimizing tech backlog.",
    monthlyStats: [
      {
        month: 'January',
        categories: {
          total: { target: 100, achieved: 95, percentage: 95 },
          ops: {
            metrics: [
              { name: 'Health Referral Contribution', target: '≥20% per ST', actual: '22% per ST', status: 'good' },
              { name: 'Term Referral Contribution', target: '≥10% per ST', actual: '11.5% per ST', status: 'good' },
              { name: 'Upsell Contribution', target: '≥20% per ST', actual: '19% per ST', status: 'warning' },
              { name: 'Referral Adoption', target: '≥50% Advisors', actual: '54% Advisors', status: 'good' },
              { name: 'TAT Compliance (Tech)', target: '≥90%', actual: '94%', status: 'good' },
              { name: 'Critical Issue TAT', target: '≤24 hrs', actual: '18 hrs', status: 'good' },
              { name: 'Tech Backlog', target: '<5%', actual: '3.20%', status: 'good' },
              { name: 'Repeated Issues Reduction', target: '≥25% MoM', actual: '22% MoM', status: 'warning' }
            ],
            rating: 'Strong'
          }
        },
        score: 95, weightedScore: 38, totalScore: 95
      }
    ]
  },
  {
    id: 'ananya',
    name: 'Ananya Rastogi',
    teamName: 'Elites',
    role: 'Program Manager',
    roleType: 'pm',
    avatar: 'https://picsum.photos/seed/ananya/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 188.00, achieved: 161.74, percentage: 86.03, policiesSold: 350, smc: 4.09, mp: 48.3, lp: 0 },
          health: { target: 0, achieved: 161.74, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 86, weightedScore: 34, totalScore: 86
      },
      {
        month: 'November',
        categories: {
          total: { target: 210.00, achieved: 172.14, percentage: 81.97, policiesSold: 393, smc: 4.47, mp: 42.5, lp: 0 },
          health: { target: 0, achieved: 172.14, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 82, weightedScore: 33, totalScore: 82
      },
      {
        month: 'December',
        categories: {
          total: { target: 231.00, achieved: 211.06, percentage: 91.37, policiesSold: 453, smc: 3.86, mp: 42.2, lp: 0 },
          health: { target: 0, achieved: 211.06, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 91, weightedScore: 36, totalScore: 91
      },
      {
        month: 'January',
        categories: {
          total: { target: 183.10, achieved: 202.30, percentage: 110.49, policiesSold: 404, smc: 5.52, mp: 50.5, lp: 0 },
          health: { target: 0, achieved: 192.56, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 110, weightedScore: 44, totalScore: 110
      }
    ]
  },
  {
    id: 'shivangi',
    name: 'Shivangi Daga',
    teamName: 'Rainmakers',
    role: 'Senior Program Manager',
    roleType: 'spm',
    avatar: 'https://picsum.photos/seed/shivangi/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 217.00, achieved: 218.27, percentage: 100.59, policiesSold: 471, smc: 5.26, mp: 50.5, lp: 0 },
          health: { target: 0, achieved: 218.27, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'November',
        categories: {
          total: { target: 283.00, achieved: 221.24, percentage: 78.18, policiesSold: 445, smc: 4.18, mp: 52.4, lp: 0 },
          health: { target: 0, achieved: 221.24, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 78, weightedScore: 31, totalScore: 78
      },
      {
        month: 'December',
        categories: {
          total: { target: 277.66, achieved: 248.14, percentage: 89.37, policiesSold: 517, smc: 4.54, mp: 51.1, lp: 0 },
          health: { target: 0, achieved: 248.14, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 89, weightedScore: 36, totalScore: 89
      },
      {
        month: 'January',
        categories: {
          total: { target: 213.20, achieved: 181.74, percentage: 85.24, policiesSold: 367, smc: 3.50, mp: 50.7, lp: 0 },
          health: { target: 0, achieved: 175.15, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      }
    ]
  },
  {
    id: 'sudeeti',
    name: 'Sudeeti Maroo',
    teamName: 'Supremes',
    role: 'Senior Program Manager',
    roleType: 'spm',
    avatar: 'https://picsum.photos/seed/sudeeti/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 139.00, achieved: 141.31, percentage: 101.66, policiesSold: 349, smc: 5.02, mp: 44.1, lp: 45.5 },
          health: { target: 0, achieved: 105.40, percentage: 0 },
          term: { target: 0, achieved: 35.91, percentage: 0 }
        },
        score: 101, weightedScore: 40, totalScore: 101
      },
      {
        month: 'November',
        categories: {
          total: { target: 194.40, achieved: 157.63, percentage: 81.09, policiesSold: 363, smc: 4.14, mp: 45.0, lp: 41.5 },
          health: { target: 0, achieved: 105.42, percentage: 0 },
          term: { target: 0, achieved: 52.21, percentage: 0 }
        },
        score: 81, weightedScore: 32, totalScore: 81
      },
      {
        month: 'December',
        categories: {
          total: { target: 207.74, achieved: 208.71, percentage: 100.47, policiesSold: 441, smc: 5.21, mp: 53.2, lp: 48.1 },
          health: { target: 0, achieved: 156.51, percentage: 0 },
          term: { target: 0, achieved: 52.20, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'January',
        categories: {
          total: { target: 194.50, achieved: 189.86, percentage: 97.61, policiesSold: 436, smc: 5.64, mp: 38.0, lp: 35.6 },
          health: { target: 0, achieved: 103.52, percentage: 0 },
          term: { target: 0, achieved: 79.97, percentage: 0 }
        },
        score: 97, weightedScore: 39, totalScore: 97
      }
    ]
  },
  {
    id: 'aditi',
    name: 'Aditi Patil',
    teamName: 'Rising Stars',
    role: 'Senior Program Manager',
    roleType: 'spm',
    avatar: 'https://picsum.photos/seed/aditi/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 117.00, achieved: 116.77, percentage: 99.80, policiesSold: 251, smc: 7.06, mp: 0, lp: 49.4 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 116.77, percentage: 0 }
        },
        score: 99, weightedScore: 39, totalScore: 99
      },
      {
        month: 'November',
        categories: {
          total: { target: 129.20, achieved: 102.32, percentage: 79.19, policiesSold: 217, smc: 5.63, mp: 0, lp: 47.5 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 102.32, percentage: 0 }
        },
        score: 79, weightedScore: 31, totalScore: 79
      },
      {
        month: 'December',
        categories: {
          total: { target: 158.56, achieved: 133.18, percentage: 84.00, policiesSold: 301, smc: 5.03, mp: 0, lp: 45.5 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 133.18, percentage: 0 }
        },
        score: 84, weightedScore: 33, totalScore: 84
      },
      {
        month: 'January',
        categories: {
          total: { target: 144.00, achieved: 166.16, percentage: 115.39, policiesSold: 339, smc: 7.12, mp: 0, lp: 51.6 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 164.98, percentage: 0 }
        },
        score: 115, weightedScore: 46, totalScore: 115
      }
    ]
  },
  {
    id: 'rohan',
    name: 'Rohan Nowal',
    teamName: 'Supremes',
    role: 'Program Manager',
    roleType: 'pm',
    avatar: 'https://picsum.photos/seed/rohan/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 144.00, achieved: 109.08, percentage: 75.75, policiesSold: 246, smc: 4.55, mp: 51.4, lp: 44.7 },
          health: { target: 0, achieved: 50.02, percentage: 0 },
          term: { target: 0, achieved: 59.06, percentage: 0 }
        },
        score: 75, weightedScore: 30, totalScore: 75
      },
      {
        month: 'November',
        categories: {
          total: { target: 147.30, achieved: 125.43, percentage: 85.15, policiesSold: 280, smc: 4.75, mp: 39.7, lp: 43.0 },
          health: { target: 0, achieved: 59.79, percentage: 0 },
          term: { target: 0, achieved: 65.64, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      },
      {
        month: 'December',
        categories: {
          total: { target: 182.56, achieved: 173.76, percentage: 95.18, policiesSold: 375, smc: 5.32, mp: 46.6, lp: 48.9 },
          health: { target: 0, achieved: 79.69, percentage: 0 },
          term: { target: 0, achieved: 94.07, percentage: 0 }
        },
        score: 95, weightedScore: 38, totalScore: 95
      },
      {
        month: 'January',
        categories: {
          total: { target: 179.60, achieved: 153.82, percentage: 85.65, policiesSold: 357, smc: 4.57, mp: 41.5, lp: 38.1 },
          health: { target: 0, achieved: 74.56, percentage: 0 },
          term: { target: 0, achieved: 75.02, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      }
    ]
  },
  {
    id: 'anirudh',
    name: 'Anirudh Hanumanth Venkatesh',
    teamName: 'Elites',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/anirudh/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 102.00, achieved: 82.10, percentage: 80.49, policiesSold: 187, smc: 6.76, mp: 0, lp: 42.8 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 82.10, percentage: 0 }
        },
        score: 80, weightedScore: 32, totalScore: 80
      },
      {
        month: 'November',
        categories: {
          total: { target: 96.85, achieved: 78.79, percentage: 81.35, policiesSold: 181, smc: 6.94, mp: 0, lp: 49.2 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 78.79, percentage: 0 }
        },
        score: 81, weightedScore: 32, totalScore: 81
      },
      {
        month: 'December',
        categories: {
          total: { target: 133.00, achieved: 99.31, percentage: 74.67, policiesSold: 234, smc: 4.97, mp: 0, lp: 41.9 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 99.31, percentage: 0 }
        },
        score: 74, weightedScore: 29, totalScore: 74
      },
      {
        month: 'January',
        categories: {
          total: { target: 117.70, achieved: 107.35, percentage: 91.21, policiesSold: 231, smc: 5.75, mp: 0, lp: 48.5 },
          health: { target: 0, achieved: 0, percentage: 0 },
          term: { target: 0, achieved: 106.83, percentage: 0 }
        },
        score: 91, weightedScore: 36, totalScore: 91
      }
    ]
  },
  {
    id: 'shubhra',
    name: 'Shubhra Jain',
    teamName: 'Elites',
    role: 'Program Manager',
    roleType: 'pm',
    avatar: 'https://picsum.photos/seed/shubhra/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 150.00, achieved: 138.84, percentage: 92.56, policiesSold: 288, smc: 3.89, mp: 50.0, lp: 0 },
          health: { target: 0, achieved: 138.84, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 93, weightedScore: 37, totalScore: 93
      },
      {
        month: 'November',
        categories: {
          total: { target: 186.00, achieved: 111.35, percentage: 59.87, policiesSold: 256, smc: 2.66, mp: 44.5, lp: 0 },
          health: { target: 0, achieved: 111.35, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 60, weightedScore: 24, totalScore: 60
      },
      {
        month: 'December',
        categories: {
          total: { target: 219.00, achieved: 165.64, percentage: 75.63, policiesSold: 339, smc: 3.10, mp: 50.7, lp: 0 },
          health: { target: 0, achieved: 165.64, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 76, weightedScore: 30, totalScore: 76
      },
      {
        month: 'January',
        categories: {
          total: { target: 176.00, achieved: 167.88, percentage: 95.39, policiesSold: 333, smc: 3.63, mp: 49.2, lp: 0 },
          health: { target: 0, achieved: 159.75, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 95, weightedScore: 38, totalScore: 95
      }
    ]
  },
  {
    id: 'royden',
    name: "Royden D'Silva",
    teamName: 'Supremes',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/royden/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 104.00, achieved: 82.73, percentage: 79.55, policiesSold: 197, smc: 6.56, mp: 49.0, lp: 39.6 },
          health: { target: 0, achieved: 41.98, percentage: 0 },
          term: { target: 0, achieved: 40.75, percentage: 0 }
        },
        score: 80, weightedScore: 32, totalScore: 80
      },
      {
        month: 'November',
        categories: {
          total: { target: 126.00, achieved: 104.18, percentage: 82.68, policiesSold: 252, smc: 6.05, mp: 45.1, lp: 38.2 },
          health: { target: 0, achieved: 58.37, percentage: 0 },
          term: { target: 0, achieved: 45.82, percentage: 0 }
        },
        score: 83, weightedScore: 33, totalScore: 83
      },
      {
        month: 'December',
        categories: {
          total: { target: 141.00, achieved: 116.23, percentage: 82.43, policiesSold: 275, smc: 5.71, mp: 43.3, lp: 45.6 },
          health: { target: 0, achieved: 65.07, percentage: 0 },
          term: { target: 0, achieved: 51.16, percentage: 0 }
        },
        score: 82, weightedScore: 33, totalScore: 82
      },
      {
        month: 'January',
        categories: {
          total: { target: 128.00, achieved: 117.98, percentage: 92.17, policiesSold: 264, smc: 5.53, mp: 45.7, lp: 34.8 },
          health: { target: 0, achieved: 58.86, percentage: 0 },
          term: { target: 0, achieved: 54.88, percentage: 0 }
        },
        score: 92, weightedScore: 37, totalScore: 92
      }
    ]
  },
  {
    id: 'kimmy',
    name: 'Kimmy Gupta',
    teamName: 'Underdogs',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/kimmy/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 115.00, achieved: 110.21, percentage: 95.83, policiesSold: 253, smc: 4.44, mp: 42.7, lp: 0 },
          health: { target: 0, achieved: 110.21, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 96, weightedScore: 38, totalScore: 96
      },
      {
        month: 'November',
        categories: {
          total: { target: 132.00, achieved: 125.56, percentage: 95.12, policiesSold: 286, smc: 3.63, mp: 46.2, lp: 0 },
          health: { target: 0, achieved: 125.56, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 95, weightedScore: 38, totalScore: 95
      },
      {
        month: 'December',
        categories: {
          total: { target: 157.00, achieved: 150.45, percentage: 95.83, policiesSold: 349, smc: 4.26, mp: 41.1, lp: 33.3 },
          health: { target: 0, achieved: 146.62, percentage: 0 },
          term: { target: 0, achieved: 3.83, percentage: 0 }
        },
        score: 96, weightedScore: 38, totalScore: 96
      },
      {
        month: 'January',
        categories: {
          total: { target: 154.60, achieved: 168.14, percentage: 108.76, policiesSold: 337, smc: 3.92, mp: 46.9, lp: 0 },
          health: { target: 0, achieved: 161.07, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 109, weightedScore: 44, totalScore: 109
      }
    ]
  },
  {
    id: 'kanishka',
    name: 'Kanishka Jindal',
    teamName: 'Rainmakers',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/kanishka/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 6.00, achieved: 4.64, percentage: 77.33, policiesSold: 10, smc: 3.03, mp: 60.0, lp: 0 },
          health: { target: 0, achieved: 4.64, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 77, weightedScore: 31, totalScore: 77
      },
      {
        month: 'November',
        categories: {
          total: { target: 22.00, achieved: 24.44, percentage: 111.09, policiesSold: 48, smc: 3.72, mp: 47.9, lp: 0 },
          health: { target: 0, achieved: 24.44, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'December',
        categories: {
          total: { target: 29.00, achieved: 25.65, percentage: 88.45, policiesSold: 57, smc: 4.82, mp: 49.1, lp: 0 },
          health: { target: 0, achieved: 25.65, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 88, weightedScore: 35, totalScore: 88
      },
      {
        month: 'January',
        categories: {
          total: { target: 54.00, achieved: 37.88, percentage: 70.15, policiesSold: 105, smc: 3.58, mp: 30.5, lp: 0 },
          health: { target: 0, achieved: 36.76, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 70, weightedScore: 28, totalScore: 70
      }
    ]
  },
  {
    id: 'akaash',
    name: 'Akaash Dutta',
    teamName: 'Rising Stars',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/akaash/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 63.00, achieved: 61.43, percentage: 97.51, policiesSold: 136, smc: 4.04, mp: 47.1, lp: 0 },
          health: { target: 0, achieved: 61.43, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 98, weightedScore: 39, totalScore: 98
      },
      {
        month: 'November',
        categories: {
          total: { target: 92.00, achieved: 94.77, percentage: 103.01, policiesSold: 193, smc: 4.78, mp: 43.0, lp: 0 },
          health: { target: 0, achieved: 94.77, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'December',
        categories: {
          total: { target: 110.00, achieved: 100.25, percentage: 91.14, policiesSold: 228, smc: 3.84, mp: 46.5, lp: 0 },
          health: { target: 0, achieved: 100.25, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 91, weightedScore: 36, totalScore: 91
      },
      {
        month: 'January',
        categories: {
          total: { target: 122.00, achieved: 101.71, percentage: 83.37, policiesSold: 211, smc: 3.43, mp: 46.0, lp: 0 },
          health: { target: 0, achieved: 98.29, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 83, weightedScore: 33, totalScore: 83
      }
    ]
  },
  {
    id: 'bhagirathi',
    name: 'Bhagirathi Dhami',
    teamName: 'Rising Stars',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/bhagirathi/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 93.00, achieved: 72.67, percentage: 78.14, policiesSold: 185, smc: 3.79, mp: 42.2, lp: 0 },
          health: { target: 0, achieved: 72.67, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 78, weightedScore: 31, totalScore: 78
      },
      {
        month: 'November',
        categories: {
          total: { target: 93.00, achieved: 98.61, percentage: 106.03, policiesSold: 215, smc: 4.58, mp: 43.7, lp: 0 },
          health: { target: 0, achieved: 98.61, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'December',
        categories: {
          total: { target: 136.56, achieved: 143.51, percentage: 105.09, policiesSold: 292, smc: 3.97, mp: 44.2, lp: 0 },
          health: { target: 0, achieved: 143.51, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'January',
        categories: {
          total: { target: 156.00, achieved: 158.09, percentage: 101.34, policiesSold: 354, smc: 4.46, mp: 40.7, lp: 0 },
          health: { target: 0, achieved: 151.92, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      }
    ]
  },
  {
    id: 'bikkina',
    name: 'Bikkina Lasya Sivani',
    teamName: 'Supremes',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/bikkina/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 34.00, achieved: 25.40, percentage: 74.71, policiesSold: 76, smc: 3.89, mp: 26.3, lp: 0 },
          health: { target: 0, achieved: 25.40, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 75, weightedScore: 30, totalScore: 75
      },
      {
        month: 'November',
        categories: {
          total: { target: 45.00, achieved: 43.17, percentage: 95.93, policiesSold: 100, smc: 4.24, mp: 42.0, lp: 0 },
          health: { target: 0, achieved: 43.17, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 96, weightedScore: 38, totalScore: 96
      },
      {
        month: 'December',
        categories: {
          total: { target: 66.50, achieved: 71.80, percentage: 107.97, policiesSold: 164, smc: 4.28, mp: 42.1, lp: 0 },
          health: { target: 0, achieved: 71.80, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 100, weightedScore: 40, totalScore: 100
      },
      {
        month: 'January',
        categories: {
          total: { target: 76.00, achieved: 73.91, percentage: 97.25, policiesSold: 148, smc: 3.13, mp: 35.1, lp: 0 },
          health: { target: 0, achieved: 71.51, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 97, weightedScore: 39, totalScore: 97
      }
    ]
  },
  {
    id: 'tangella',
    name: 'Tangella Naveen Kumar Reddy',
    teamName: 'Supremes',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/tangella/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 25.00, achieved: 24.35, percentage: 97.40, policiesSold: 56, smc: 1.24, mp: 41.1, lp: 0 },
          health: { target: 0, achieved: 24.35, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 97, weightedScore: 39, totalScore: 97
      },
      {
        month: 'November',
        categories: {
          total: { target: 25.50, achieved: 30.15, percentage: 118.24, policiesSold: 64, smc: 5.08, mp: 46.9, lp: 0 },
          health: { target: 0, achieved: 30.15, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 118, weightedScore: 47, totalScore: 118
      },
      {
        month: 'December',
        categories: {
          total: { target: 38.00, achieved: 33.52, percentage: 88.21, policiesSold: 74, smc: 3.25, mp: 41.9, lp: 0 },
          health: { target: 0, achieved: 33.52, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 88, weightedScore: 35, totalScore: 88
      },
      {
        month: 'January',
        categories: {
          total: { target: 68.50, achieved: 65.30, percentage: 95.33, policiesSold: 143, smc: 4.54, mp: 42.0, lp: 0 },
          health: { target: 0, achieved: 62.82, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 95, weightedScore: 38, totalScore: 95
      }
    ]
  },
  {
    id: 'pranav',
    name: 'Pranav P Menon',
    teamName: 'Rainmakers',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/pranav/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 26.00, achieved: 29.97, percentage: 115.27, policiesSold: 67, smc: 3.24, mp: 50.7, lp: 0 },
          health: { target: 0, achieved: 29.97, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 115, weightedScore: 46, totalScore: 115
      },
      {
        month: 'November',
        categories: {
          total: { target: 46.00, achieved: 56.55, percentage: 122.93, policiesSold: 109, smc: 3.92, mp: 56.0, lp: 0 },
          health: { target: 0, achieved: 56.55, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 123, weightedScore: 49, totalScore: 123
      },
      {
        month: 'December',
        categories: {
          total: { target: 57.00, achieved: 54.75, percentage: 96.05, policiesSold: 134, smc: 5.15, mp: 43.3, lp: 0 },
          health: { target: 0, achieved: 54.75, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 96, weightedScore: 38, totalScore: 96
      },
      {
        month: 'January',
        categories: {
          total: { target: 49.60, achieved: 71.77, percentage: 144.70, policiesSold: 136, smc: 5.04, mp: 55.1, lp: 0 },
          health: { target: 0, achieved: 69.26, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 145, weightedScore: 58, totalScore: 145
      }
    ]
  },
  {
    id: 'nikita',
    name: 'Nikita Yadav',
    teamName: 'Underdogs',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/nikita/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 14.00, achieved: 24.28, percentage: 173.43, policiesSold: 50, smc: 6.32, mp: 54.0, lp: 0 },
          health: { target: 0, achieved: 24.28, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 173, weightedScore: 69, totalScore: 173
      },
      {
        month: 'November',
        categories: {
          total: { target: 34.00, achieved: 33.52, percentage: 98.59, policiesSold: 73, smc: 4.95, mp: 47.9, lp: 0 },
          health: { target: 0, achieved: 33.52, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 99, weightedScore: 40, totalScore: 99
      },
      {
        month: 'December',
        categories: {
          total: { target: 49.00, achieved: 70.82, percentage: 144.53, policiesSold: 126, smc: 3.81, mp: 59.5, lp: 0 },
          health: { target: 0, achieved: 70.82, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 145, weightedScore: 58, totalScore: 145
      },
      {
        month: 'January',
        categories: {
          total: { target: 67.00, achieved: 89.62, percentage: 133.76, policiesSold: 167, smc: 4.70, mp: 45.5, lp: 0 },
          health: { target: 0, achieved: 85.68, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 134, weightedScore: 54, totalScore: 134
      }
    ]
  },
  {
    id: 'aditya',
    name: 'Aditya Singh',
    teamName: 'Underdogs',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/aditya/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 14.00, achieved: 21.03, percentage: 150.21, policiesSold: 42, smc: 4.88, mp: 52.4, lp: 0 },
          health: { target: 0, achieved: 21.03, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 150, weightedScore: 60, totalScore: 150
      },
      {
        month: 'November',
        categories: {
          total: { target: 34.00, achieved: 32.14, percentage: 94.53, policiesSold: 68, smc: 5.12, mp: 48.5, lp: 0 },
          health: { target: 0, achieved: 32.14, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 95, weightedScore: 38, totalScore: 95
      },
      {
        month: 'December',
        categories: {
          total: { target: 49.00, achieved: 68.45, percentage: 139.69, policiesSold: 115, smc: 4.23, mp: 55.0, lp: 0 },
          health: { target: 0, achieved: 68.45, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 140, weightedScore: 56, totalScore: 140
      },
      {
        month: 'January',
        categories: {
          total: { target: 67.00, achieved: 85.34, percentage: 127.37, policiesSold: 152, smc: 4.55, mp: 48.0, lp: 0 },
          health: { target: 0, achieved: 82.11, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 127, weightedScore: 51, totalScore: 127
      }
    ]
  },
  {
    id: 'lakshita',
    name: 'Lakshita Sharma',
    teamName: 'Underdogs',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/lakshita/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 14.00, achieved: 19.88, percentage: 142.00, policiesSold: 38, smc: 5.01, mp: 50.0, lp: 0 },
          health: { target: 0, achieved: 19.88, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 142, weightedScore: 57, totalScore: 142
      },
      {
        month: 'November',
        categories: {
          total: { target: 34.00, achieved: 30.56, percentage: 89.88, policiesSold: 62, smc: 4.88, mp: 46.0, lp: 0 },
          health: { target: 0, achieved: 30.56, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 90, weightedScore: 36, totalScore: 90
      },
      {
        month: 'December',
        categories: {
          total: { target: 49.00, achieved: 65.23, percentage: 133.12, policiesSold: 108, smc: 4.11, mp: 52.0, lp: 0 },
          health: { target: 0, achieved: 65.23, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 133, weightedScore: 53, totalScore: 133
      },
      {
        month: 'January',
        categories: {
          total: { target: 67.00, achieved: 81.45, percentage: 121.57, policiesSold: 145, smc: 4.33, mp: 45.0, lp: 0 },
          health: { target: 0, achieved: 78.22, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 122, weightedScore: 49, totalScore: 122
      }
    ]
  },
  {
    id: 'soniya',
    name: 'Soniya Soni',
    teamName: 'Underdogs',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/soniya/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 14.00, achieved: 18.55, percentage: 132.50, policiesSold: 35, smc: 4.55, mp: 48.0, lp: 0 },
          health: { target: 0, achieved: 18.55, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 133, weightedScore: 53, totalScore: 133
      },
      {
        month: 'November',
        categories: {
          total: { target: 34.00, achieved: 28.99, percentage: 85.26, policiesSold: 58, smc: 4.66, mp: 44.0, lp: 0 },
          health: { target: 0, achieved: 28.99, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 85, weightedScore: 34, totalScore: 85
      },
      {
        month: 'December',
        categories: {
          total: { target: 49.00, achieved: 62.11, percentage: 126.76, policiesSold: 102, smc: 3.99, mp: 50.0, lp: 0 },
          health: { target: 0, achieved: 62.11, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 127, weightedScore: 51, totalScore: 127
      },
      {
        month: 'January',
        categories: {
          total: { target: 67.00, achieved: 78.34, percentage: 116.93, policiesSold: 138, smc: 4.11, mp: 42.0, lp: 0 },
          health: { target: 0, achieved: 75.11, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 117, weightedScore: 47, totalScore: 117
      }
    ]
  },
  {
    id: 'richi',
    name: 'Richi Rich',
    teamName: 'Underdogs',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/richi/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 14.00, achieved: 17.22, percentage: 123.00, policiesSold: 32, smc: 4.22, mp: 46.0, lp: 0 },
          health: { target: 0, achieved: 17.22, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 123, weightedScore: 49, totalScore: 123
      },
      {
        month: 'November',
        categories: {
          total: { target: 34.00, achieved: 27.42, percentage: 80.65, policiesSold: 54, smc: 4.44, mp: 42.0, lp: 0 },
          health: { target: 0, achieved: 27.42, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 81, weightedScore: 32, totalScore: 81
      },
      {
        month: 'December',
        categories: {
          total: { target: 49.00, achieved: 58.99, percentage: 120.39, policiesSold: 96, smc: 3.88, mp: 48.0, lp: 0 },
          health: { target: 0, achieved: 58.99, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 120, weightedScore: 48, totalScore: 120
      },
      {
        month: 'January',
        categories: {
          total: { target: 67.00, achieved: 75.23, percentage: 112.28, policiesSold: 131, smc: 3.99, mp: 40.0, lp: 0 },
          health: { target: 0, achieved: 72.00, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 112, weightedScore: 45, totalScore: 112
      }
    ]
  },
  {
    id: 'vaishnavi',
    name: 'Vaishnavi Sharma',
    teamName: 'Underdogs',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/vaishnavi/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 14.00, achieved: 15.89, percentage: 113.50, policiesSold: 29, smc: 3.99, mp: 44.0, lp: 0 },
          health: { target: 0, achieved: 15.89, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 114, weightedScore: 46, totalScore: 114
      },
      {
        month: 'November',
        categories: {
          total: { target: 34.00, achieved: 25.85, percentage: 76.03, policiesSold: 50, smc: 4.22, mp: 40.0, lp: 0 },
          health: { target: 0, achieved: 25.85, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 76, weightedScore: 30, totalScore: 76
      },
      {
        month: 'December',
        categories: {
          total: { target: 49.00, achieved: 55.87, percentage: 114.02, policiesSold: 90, smc: 3.77, mp: 46.0, lp: 0 },
          health: { target: 0, achieved: 55.87, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 114, weightedScore: 46, totalScore: 114
      },
      {
        month: 'January',
        categories: {
          total: { target: 67.00, achieved: 72.12, percentage: 107.64, policiesSold: 124, smc: 3.88, mp: 38.0, lp: 0 },
          health: { target: 0, achieved: 68.89, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 108, weightedScore: 43, totalScore: 108
      }
    ]
  },
  {
    id: 'ayush',
    name: 'Ayush Gupta',
    teamName: 'Rainmakers',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/ayush/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 10.00, achieved: 12.45, percentage: 124.50, policiesSold: 25, smc: 4.12, mp: 48.0, lp: 0 },
          health: { target: 0, achieved: 12.45, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 125, weightedScore: 50, totalScore: 125
      },
      {
        month: 'November',
        categories: {
          total: { target: 30.00, achieved: 28.56, percentage: 95.20, policiesSold: 58, smc: 4.44, mp: 42.0, lp: 0 },
          health: { target: 0, achieved: 28.56, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 95, weightedScore: 38, totalScore: 95
      },
      {
        month: 'December',
        categories: {
          total: { target: 45.00, achieved: 54.12, percentage: 120.27, policiesSold: 108, smc: 3.88, mp: 48.0, lp: 0 },
          health: { target: 0, achieved: 54.12, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 120, weightedScore: 48, totalScore: 120
      },
      {
        month: 'January',
        categories: {
          total: { target: 60.00, achieved: 64.34, percentage: 107.23, policiesSold: 132, smc: 3.99, mp: 40.0, lp: 0 },
          health: { target: 0, achieved: 61.22, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 107, weightedScore: 43, totalScore: 107
      }
    ]
  },
  {
    id: 'srija',
    name: 'Srija Reddy',
    teamName: 'Supremes',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/srija/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 15.00, achieved: 18.22, percentage: 121.47, policiesSold: 36, smc: 4.55, mp: 50.0, lp: 0 },
          health: { target: 0, achieved: 18.22, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 121, weightedScore: 48, totalScore: 121
      },
      {
        month: 'November',
        categories: {
          total: { target: 35.00, achieved: 32.45, percentage: 92.71, policiesSold: 64, smc: 4.66, mp: 44.0, lp: 0 },
          health: { target: 0, achieved: 32.45, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 93, weightedScore: 37, totalScore: 93
      },
      {
        month: 'December',
        categories: {
          total: { target: 50.00, achieved: 62.11, percentage: 124.22, policiesSold: 122, smc: 3.99, mp: 50.0, lp: 0 },
          health: { target: 0, achieved: 62.11, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 124, weightedScore: 50, totalScore: 124
      },
      {
        month: 'January',
        categories: {
          total: { target: 65.00, achieved: 71.34, percentage: 109.75, policiesSold: 142, smc: 4.11, mp: 42.0, lp: 0 },
          health: { target: 0, achieved: 68.11, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 110, weightedScore: 44, totalScore: 110
      }
    ]
  },
  {
    id: 'parth',
    name: 'Parth Sharma',
    teamName: 'Elites',
    role: 'Associate Program Manager',
    roleType: 'apm',
    avatar: 'https://picsum.photos/seed/parth/100/100',
    monthlyStats: [
      {
        month: 'October',
        categories: {
          total: { target: 12.00, achieved: 14.55, percentage: 121.25, policiesSold: 28, smc: 4.22, mp: 46.0, lp: 0 },
          health: { target: 0, achieved: 14.55, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 121, weightedScore: 48, totalScore: 121
      },
      {
        month: 'November',
        categories: {
          total: { target: 32.00, achieved: 28.42, percentage: 88.81, policiesSold: 56, smc: 4.44, mp: 42.0, lp: 0 },
          health: { target: 0, achieved: 28.42, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 89, weightedScore: 36, totalScore: 89
      },
      {
        month: 'December',
        categories: {
          total: { target: 47.00, achieved: 58.99, percentage: 125.51, policiesSold: 115, smc: 3.88, mp: 48.0, lp: 0 },
          health: { target: 0, achieved: 58.99, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 126, weightedScore: 50, totalScore: 126
      },
      {
        month: 'January',
        categories: {
          total: { target: 62.00, achieved: 68.23, percentage: 110.05, policiesSold: 134, smc: 3.99, mp: 40.0, lp: 0 },
          health: { target: 0, achieved: 65.00, percentage: 0 },
          term: { target: 0, achieved: 0, percentage: 0 }
        },
        score: 110, weightedScore: 44, totalScore: 110
      }
    ]
  }
];

export const TEAM_ICONS = {
  Elites: <Award className="w-4 h-4 text-amber-500" />,
  'Rising Stars': <Star className="w-4 h-4 text-blue-500" />,
  Supremes: <Crown className="w-4 h-4 text-indigo-500" />,
  Underdogs: <Flame className="w-4 h-4 text-red-500" />,
  Rainmakers: <Zap className="w-4 h-4 text-yellow-500" />,
  'Quality Guard': <ShieldCheck className="w-4 h-4 text-emerald-500" />,
  'Growth Ops': <Cpu className="w-4 h-4 text-indigo-500" />
};

export const PILLAR_ICONS = {
  [PillarType.PERFORMANCE]: <Activity className="w-5 h-5" />,
  [PillarType.ENABLEMENT]: <Settings2 className="w-5 h-5" />,
  [PillarType.CX_QUALITY]: <ShieldCheck className="w-5 h-5" />,
  [PillarType.GROWTH]: <TrendingUp className="w-5 h-5" />,
  [PillarType.QA_PRODUCT]: <CheckCircle2 className="w-5 h-5" />
};

export const PILLARS: PillarData[] = [
  {
    id: PillarType.PERFORMANCE,
    title: "Superteam Performance & Advisor Health",
    systemRole: "Revenue + Advisor Health",
    owner: "Ashish Narula (SPM), Kirti Singh (PM), Akhil Anish (APM)",
    dailyKpis: [
      { name: "Global Achievement", value: "93.1%", trend: "up", status: "good", target: "100%" },
      { name: "Health Path %", value: "95.4%", trend: "up", status: "good" },
      { name: "Term Path %", value: "98.6%", trend: "up", status: "good" },
      { name: "Total Criticals", value: "48", trend: "down", status: "warning" }
    ],
    monthlyKpis: [],
    actionItems: [
      "SPM oversight on Underdogs Jan closure",
      "PM level governance on Elites health retention",
      "Network critical reduction strategy (Target <20%)"
    ],
    chartData: [
      { name: 'Oct', el: 81.45, rs: 87.59, su: 85.83 },
      { name: 'Nov', el: 72.73, rs: 90.89, su: 67.00 },
      { name: 'Dec', el: 79.16, rs: 89.98, su: 95.00 },
      { name: 'Jan', el: 94.03, rs: 102.68, su: 92.82 }
    ]
  }
];

export const REVIEW_CADENCE = {
  daily: ["MTD achievement", "Critical movement", "Tech resolve", "Team gaps"],
  weekly: ["Action item check", "CX audit", "Weekly projection", "QA themes"],
  monthly: ["Final target closure", "IIP graduation", "Leaderboard review", "Next month strategy"]
};