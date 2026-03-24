
export enum PillarType {
  PERFORMANCE = 'PERFORMANCE',
  ENABLEMENT = 'ENABLEMENT',
  CX_QUALITY = 'CX_QUALITY',
  GROWTH = 'GROWTH',
  QA_PRODUCT = 'QA_PRODUCT'
}

export type UserRole = 'executive' | string;

export type ViewType = PillarType | 'overview' | 'cadence' | UserRole;

export interface KPI {
  name: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  status: 'good' | 'warning' | 'critical';
  target?: string | number;
}

export interface MetricCategory {
  target: number;
  achieved: number;
  percentage: number;
  smc?: number;
  lp?: number;
  mp?: number;
  policiesSold?: number;
  mentorsAchieved?: number;
  totalMentors?: number;
  limitedPayPercentage?: number;
  multiPayPercentage?: number;
}

export interface SpecializedMetric {
  name: string;
  target: string;
  actual: string;
  status: 'good' | 'warning' | 'critical';
}

export interface MonthlyBreakdown {
  month: string;
  categories: {
    health?: MetricCategory;
    term?: MetricCategory;
    both?: MetricCategory;
    total: MetricCategory;
    cx?: {
      metrics: SpecializedMetric[];
      rating: 'Exceptional' | 'Strong' | 'Needs Improvement';
    };
    ops?: {
      metrics: SpecializedMetric[];
      rating: 'Exceptional' | 'Strong' | 'Needs Improvement';
    };
  };
  score: number;
  weightedScore: number;
  totalScore: number;
  advisors?: {
    total: number;
    critical: number;
    achieved: number;
    rate: number;
  };
}

export interface LeadData {
  id: UserRole;
  name: string;
  teamName: string;
  role: string;
  roleType: 'consultant' | 'spm' | 'pm' | 'apm' | 'cx_manager' | 'ops_manager';
  avatar: string;
  mandate?: string;
  monthlyStats: MonthlyBreakdown[];
}

export interface PillarData {
  id: PillarType;
  title: string;
  systemRole: string;
  owner: string;
  dailyKpis: KPI[];
  monthlyKpis: KPI[];
  actionItems: string[];
  chartData: any[];
}
