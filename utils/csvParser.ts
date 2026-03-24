import { LeadData, MonthlyBreakdown, MetricCategory } from '../types';

const MONTH_ORDER = ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];

const MONTH_MAP: Record<string, string> = {
    'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June',
    'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December',
    'January': 'January', 'February': 'February', 'March': 'March', 'April': 'April',
    'June': 'June', 'July': 'July', 'August': 'August', 'September': 'September',
    'October': 'October', 'November': 'November', 'December': 'December'
};

const normalizeMonth = (raw: string): string => {
    return MONTH_MAP[raw] || raw;
};

// Canonical metadata — single source of truth for role/team assignments
const LEAD_METADATA: Record<string, { teamName: string; role: string; roleType: string }> = {
    'ayush': { teamName: 'Elites', role: 'Consultant', roleType: 'consultant' },
    'srija': { teamName: 'Rising Stars', role: 'Consultant', roleType: 'consultant' },
    'parth': { teamName: 'Supremes', role: 'Consultant', roleType: 'consultant' },
    'sushant': { teamName: 'Quality Guard', role: 'CX Quality Manager', roleType: 'cx_manager' },
    'daxit': { teamName: 'Growth Ops', role: 'Upsell & Tech Ops Lead', roleType: 'ops_manager' },
    'akhil': { teamName: 'Rainmakers', role: 'Associate Program Manager', roleType: 'apm' },
    'royden': { teamName: 'Supremes', role: 'Associate Program Manager', roleType: 'apm' },
    'anirudh': { teamName: 'Elites', role: 'Associate Program Manager', roleType: 'apm' },
    'kimmy': { teamName: 'Underdogs', role: 'Associate Program Manager', roleType: 'apm' },
    'kanishka': { teamName: 'Rainmakers', role: 'Associate Program Manager', roleType: 'apm' },
    'akaash': { teamName: 'Rising Stars', role: 'Associate Program Manager', roleType: 'apm' },
    'bhagirathi': { teamName: 'Rising Stars', role: 'Associate Program Manager', roleType: 'apm' },
    'bikkina': { teamName: 'Supremes', role: 'Associate Program Manager', roleType: 'apm' },
    'tangella': { teamName: 'Supremes', role: 'Associate Program Manager', roleType: 'apm' },
    'pranav': { teamName: 'Rainmakers', role: 'Associate Program Manager', roleType: 'apm' },
    'nikita': { teamName: 'Underdogs', role: 'Associate Program Manager', roleType: 'apm' },
    'aditya': { teamName: 'Underdogs', role: 'Associate Program Manager', roleType: 'apm' },
    'lakshita': { teamName: 'Rainmakers', role: 'Associate Program Manager', roleType: 'apm' },
    'soniya': { teamName: 'Elites', role: 'Associate Program Manager', roleType: 'apm' },
    'richi': { teamName: 'Underdogs', role: 'Associate Program Manager', roleType: 'apm' },
    'vaishnavi': { teamName: 'Rising Stars', role: 'Associate Program Manager', roleType: 'apm' },
    'kirti': { teamName: 'Elites', role: 'Program Manager', roleType: 'pm' },
    'rohan': { teamName: 'Supremes', role: 'Program Manager', roleType: 'pm' },
    'ananya': { teamName: 'Elites', role: 'Program Manager', roleType: 'pm' },
    'shubhra': { teamName: 'Elites', role: 'Program Manager', roleType: 'pm' },
    'ashish': { teamName: 'Underdogs', role: 'Senior Program Manager', roleType: 'spm' },
    'sudeeti': { teamName: 'Supremes', role: 'Senior Program Manager', roleType: 'spm' },
    'aditi': { teamName: 'Rising Stars', role: 'Senior Program Manager', roleType: 'spm' },
    'shivangi': { teamName: 'Rainmakers', role: 'Senior Program Manager', roleType: 'spm' },
    'deepak': { teamName: 'Underdogs', role: 'Consultant', roleType: 'consultant' },
};

export const parseCSVData = (leadsCsvText: string, revenueCsvText: string, specializedCsvText: string = '', existingLeads: LeadData[] = []): LeadData[] => {
    const leadsMap = new Map<string, LeadData>();

    // Initialize with existing leads to allow appending/merging
    existingLeads.forEach(lead => {
        const key = lead.name.toLowerCase();
        leadsMap.set(key, JSON.parse(JSON.stringify(lead)));
    });

    // Helper to get lead by ID or Name
    const findLead = (identifier: string) => {
        const lower = identifier.toLowerCase();
        // Try ID match
        for (const l of leadsMap.values()) {
            if (String(l.id).toLowerCase() === lower) return l;
        }
        // Try Name match
        return leadsMap.get(lower);
    };

    // Parse Leads
    if (leadsCsvText) {
        const leadsLines = leadsCsvText.trim().split('\n');
        // ... (headers check omitted for brevity but should remain)
        for (let i = 1; i < leadsLines.length; i++) {
            const row = parseCSVRow(leadsLines[i]);
            if (row.length < 5) continue;

            const id = row[0].trim();
            if (!id) continue;

            const nameKey = (row[1]?.trim() || '').toLowerCase();
            const existingLead = leadsMap.get(nameKey);

            const lead: LeadData = {
                id: id as any,
                name: row[1]?.trim() || existingLead?.name || '',
                teamName: row[2]?.trim() || existingLead?.teamName || '',
                role: row[3]?.trim() || existingLead?.role || '',
                roleType: (row[4]?.trim() as any) || existingLead?.roleType,
                avatar: row[5]?.trim() || existingLead?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(row[1]?.trim() || 'U')}`,
                mandate: row[6]?.trim() || existingLead?.mandate || '',
                monthlyStats: existingLead ? existingLead.monthlyStats : []
            };
            leadsMap.set(nameKey, lead);
        }
    }

    // Parse Revenue & Performance
    if (revenueCsvText) {
        const revLines = revenueCsvText.trim().split('\n');
        if (revLines.length > 0) {
            const revHeaders = parseCSVRow(revLines[0]).map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
            
            const getIdx = (keyMatch: string | string[]) => {
                const keys = Array.isArray(keyMatch) ? keyMatch : [keyMatch];
                for (const key of keys) {
                    const idx = revHeaders.findIndex(h => h.includes(key));
                    if (idx !== -1) return idx;
                }
                return -1;
            };

            const idxName = Math.max(0, getIdx(['leadname', 'name']));
            const idxMonth = Math.max(1, getIdx('month'));
            const idxTotalTarget = getIdx('totaltarget');
            const idxTotalAchieved = getIdx('totalachieved');
            const idxHealthTarget = getIdx('healthtarget');
            const idxHealthAchieved = getIdx('healthachieved');
            const idxTermTarget = getIdx('termtarget');
            const idxTermAchieved = getIdx('termachieved');
            const idxTotalScore = getIdx(['totalscore', 'score']);
            const idxAdvisorsTotal = getIdx(['advisorstotal', 'totaladvisors']);
            const idxAdvisorsCritical = getIdx(['advisorscritical', 'criticaladvisors']);
            const idxAdvisorsAchieved = getIdx(['advisorsachieved', 'advisorachieved', 'achievedadvisors']);
            const idxPoliciesSold = getIdx(['policiessold', 'policies', 'nopolicies']);
            const idxSMC = getIdx('smc');
            const idxMP = getIdx('mp');
            const idxLP = getIdx('lp');

            for (let i = 1; i < revLines.length; i++) {
                const row = parseCSVRow(revLines[i]);
                if (row.length < 2) continue;

                const getValue = (idx: number) => idx >= 0 ? row[idx] : '';
                const leadName = getValue(idxName)?.trim();
                const monthRaw = getValue(idxMonth)?.trim();
                const month = normalizeMonth(monthRaw);

                if (!leadName || !month) continue;

                let lead = findLead(leadName);
                if (!lead) {
                    const stubId = leadName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                    lead = { id: stubId as any, name: leadName, teamName: '', role: '', roleType: 'consultant' as any, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(leadName)}`, mandate: '', monthlyStats: [] };
                    leadsMap.set(leadName.toLowerCase(), lead);
                }

                let monthStat = lead.monthlyStats.find(m => m.month === month);
                if (!monthStat) {
                    monthStat = {
                        month: month,
                        categories: {
                            total: { target: 0, achieved: 0, percentage: 0 },
                            health: { target: 0, achieved: 0, percentage: 0 },
                            term: { target: 0, achieved: 0, percentage: 0 }
                        },
                        score: 0, weightedScore: 0, totalScore: 0
                    };
                    lead.monthlyStats.push(monthStat);
                }

                const safeParseFloat = (val: string) => {
                    const parsed = parseFloat(val?.replace(/[^0-9.-]/g, '') || '0');
                    return isNaN(parsed) ? 0 : parsed;
                };

                // CRITICAL: Handle inconsistent column shifts.
                // Some rows are missing Advisors_Achieved/total_Advisors columns (index 12/13).
                // Percentages (SMC/MP/LP) are always at the end.
                const pctValues = row.filter(v => v.includes('%')).map(safeParseFloat);
                const numericValues = row.filter(v => v !== '' && !v.includes('%') && !isNaN(parseFloat(v.replace(/[^0-9.-]/g, ''))));
                
                // Achievement Conversion (Lakhs to Crores)
                const totalTarget = safeParseFloat(getValue(idxTotalTarget)) / 100;
                const totalAchieved = safeParseFloat(getValue(idxTotalAchieved)) / 100;

                // Extract percentages from the end of the row if they exist, otherwise try header indices
                let smc = 0, mp = 0, lp = 0;
                if (pctValues.length >= 3) {
                    [smc, mp, lp] = pctValues.slice(-3);
                } else {
                    smc = safeParseFloat(getValue(idxSMC));
                    mp = safeParseFloat(getValue(idxMP));
                    lp = safeParseFloat(getValue(idxLP));
                }

                monthStat.categories.total = {
                    target: totalTarget,
                    achieved: totalAchieved,
                    percentage: totalTarget > 0 ? (totalAchieved / totalTarget) * 100 : 0,
                    policiesSold: safeParseFloat(getValue(idxPoliciesSold)),
                    smc: smc,
                    mp: mp,
                    lp: lp
                };

                const healthTarget = safeParseFloat(getValue(idxHealthTarget)) / 100;
                const healthAchieved = safeParseFloat(getValue(idxHealthAchieved)) / 100;
                monthStat.categories.health = {
                    target: healthTarget, achieved: healthAchieved,
                    percentage: healthTarget > 0 ? (healthAchieved / healthTarget) * 100 : 0
                };

                const termTarget = safeParseFloat(getValue(idxTermTarget)) / 100;
                const termAchieved = safeParseFloat(getValue(idxTermAchieved)) / 100;
                monthStat.categories.term = {
                    target: termTarget, achieved: termAchieved,
                    percentage: termTarget > 0 ? (termAchieved / termTarget) * 100 : 0
                };

                // Advisors: Try to find achieved and total. 
                // Total is often idx 9 or 13 in header, or row.length - 4 in Shifted rows.
                let aTotal = safeParseFloat(getValue(idxAdvisorsTotal));
                let aAchieved = safeParseFloat(getValue(idxAdvisorsAchieved));
                let aCritical = safeParseFloat(getValue(idxAdvisorsCritical));

                // Fallback for shifted rows (like Akaash Jan where index 12/13 are actually SMC/MP)
                if (row.length < 17 && aTotal > 0 && String(getValue(idxAdvisorsTotal)).includes('%')) {
                   aTotal = safeParseFloat(getValue(idxAdvisorsTotal - 2)); // Shifted
                }
                
                // Specific fix for the "0 / 16" bug: if Advisors_Achieved (12) is a percentage, 
                // it means the numeric achieved is likely at index 10 or 11.
                if (String(getValue(idxAdvisorsAchieved)).includes('%')) {
                    aAchieved = safeParseFloat(getValue(10));
                    aTotal = safeParseFloat(getValue(11));
                }

                if (aTotal > 0 || aCritical > 0 || aAchieved > 0) {
                    monthStat.advisors = {
                        total: aTotal,
                        critical: aCritical,
                        achieved: aAchieved,
                        rate: aTotal > 0 ? (aCritical / aTotal) * 100 : 0
                    };
                }

                const csvTotalScore = safeParseFloat(getValue(idxTotalScore));
                // Use CSV totalScore if available, otherwise compute from achievement %
                const efficiencyScore = csvTotalScore > 0 
                    ? csvTotalScore 
                    : (totalTarget > 0 ? Math.round((totalAchieved / totalTarget) * 100) : 0);
                
                monthStat.score = efficiencyScore;
                monthStat.totalScore = efficiencyScore;
                monthStat.weightedScore = Math.round(efficiencyScore * 0.4);
            }
        }
    }

    // Parse Specialized Performance
    if (specializedCsvText) {
        const specLines = specializedCsvText.trim().split('\n');
        if (specLines.length > 1) {
            const specHeaders = parseCSVRow(specLines[0]).map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
            const idxId = specHeaders.indexOf('leadid');
            const idxMonth = specHeaders.indexOf('month');
            const idxMetricName = specHeaders.indexOf('metricname');
            const idxMetricTarget = specHeaders.indexOf('metrictarget');
            const idxMetricActual = specHeaders.indexOf('metricactual');
            const idxMetricStatus = specHeaders.indexOf('metricstatus');
            const idxTotalScore = specHeaders.indexOf('totalscoreformonth');
            const idxRating = specHeaders.indexOf('overallratingformonth');

            for (let i = 1; i < specLines.length; i++) {
                const row = parseCSVRow(specLines[i]);
                if (row.length < 4) continue;

                const leadId = row[idxId]?.trim();
                const monthRaw = row[idxMonth]?.trim();
                const monthMap: Record<string, string> = {
                    'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June',
                    'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
                };
                const month = monthMap[monthRaw] || monthRaw;

                if (!leadId || !month) continue;

                const lead = findLead(leadId);
                if (!lead) continue;

                let monthStat = lead.monthlyStats.find(m => m.month === month);
                if (!monthStat) {
                    monthStat = {
                        month: month,
                        categories: {
                            total: { target: 0, achieved: 0, percentage: 0 },
                        },
                        score: 0, weightedScore: 0, totalScore: 0
                    };
                    lead.monthlyStats.push(monthStat);
                }

                const roleType = String(lead.roleType).toLowerCase();
                const metric = {
                    name: row[idxMetricName]?.trim(),
                    target: row[idxMetricTarget]?.trim(),
                    actual: row[idxMetricActual]?.trim(),
                    status: (row[idxMetricStatus]?.trim().toLowerCase() || 'good') as any
                };

                if (roleType === 'cx_manager') {
                    if (!monthStat.categories.cx) {
                        monthStat.categories.cx = { metrics: [], rating: (row[idxRating] as any) || 'Strong' };
                    } else if (i === 1 || !(monthStat.categories as any).cx_reset) {
                        monthStat.categories.cx.metrics = [];
                        (monthStat.categories as any).cx_reset = true;
                    }
                    monthStat.categories.cx.metrics.push(metric);
                    if (row[idxRating]) monthStat.categories.cx.rating = row[idxRating] as any;
                } else if (roleType === 'ops_manager') {
                    if (!monthStat.categories.ops) {
                        monthStat.categories.ops = { metrics: [], rating: (row[idxRating] as any) || 'Strong' };
                    } else if (i === 1 || !(monthStat.categories as any).ops_reset) {
                        monthStat.categories.ops.metrics = [];
                        (monthStat.categories as any).ops_reset = true;
                    }
                    monthStat.categories.ops.metrics.push(metric);
                    if (row[idxRating]) monthStat.categories.ops.rating = row[idxRating] as any;
                }

                if (row[idxTotalScore]) {
                    const score = parseInt(row[idxTotalScore], 10);
                    if (!isNaN(score)) {
                        monthStat.score = score;
                        monthStat.totalScore = score;
                        monthStat.weightedScore = Math.round(score * 0.4);
                    }
                }
            }
        }
    }

    // Deduplicate and order monthly stats for each lead
    const result = Array.from(leadsMap.values());
    result.forEach(lead => {
        const monthMap = new Map<string, MonthlyBreakdown>();
        lead.monthlyStats.forEach(stat => {
            const normalized = normalizeMonth(stat.month);
            stat.month = normalized;
            // Keep only the latest version of each month
            monthMap.set(normalized, stat);
        });
        lead.monthlyStats = Array.from(monthMap.values())
            .sort((a, b) => MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month));

        // Apply canonical metadata — always correct roleType/teamName/role
        const nameKey = lead.name.toLowerCase().split(' ')[0];
        const idKey = String(lead.id).toLowerCase();
        const meta = LEAD_METADATA[idKey] || LEAD_METADATA[nameKey];
        if (meta) {
            lead.roleType = meta.roleType as any;
            lead.teamName = meta.teamName;
            lead.role = meta.role;
        }
    });
    return result;

    function parseCSVRow(text: string): string[] {
        let result: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }
};
