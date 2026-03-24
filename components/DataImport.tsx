import React, { useRef, useState } from 'react';
import { UploadCloud, X, FileBarChart, Users, Loader2, Zap } from 'lucide-react';
import { parseCSVData } from '../utils/csvParser';
import { LeadData } from '../types';
import { importLeadsToAPI } from '../services/apiService';

interface DataImportProps {
    existingLeads: LeadData[];
    onImportComplete: () => Promise<void>;
    onClose: () => void;
}

const DataImport: React.FC<DataImportProps> = ({ existingLeads, onImportComplete, onClose }) => {
    const [leadsCsv, setLeadsCsv] = useState<string | null>(null);
    const [revenueCsv, setRevenueCsv] = useState<string | null>(null);
    const [specializedCsv, setSpecializedCsv] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [isImporting, setIsImporting] = useState(false);

    const leadsInputRef = useRef<HTMLInputElement>(null);
    const revenueInputRef = useRef<HTMLInputElement>(null);
    const specializedInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'leads' | 'revenue' | 'specialized') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            if (type === 'leads') {
                setLeadsCsv(text);
            } else if (type === 'revenue') {
                setRevenueCsv(text);
            } else {
                setSpecializedCsv(text);
            }
        };
        reader.onerror = () => {
            setError(`Failed to read ${file.name}`);
        };
        reader.readAsText(file);
    };

    const processImport = async () => {
        if (!leadsCsv && !revenueCsv && !specializedCsv) {
            setError('Please upload at least one CSV file.');
            return;
        }

        try {
            setIsImporting(true);
            const parsedData = parseCSVData(leadsCsv || '', revenueCsv || '', specializedCsv || '', existingLeads);
            console.log('[DataImport] Parsed data:', parsedData.length, 'leads');
            parsedData.forEach(l => {
                const cxMetrics = l.monthlyStats.flatMap(s => s.categories.cx?.metrics || []);
                const opsMetrics = l.monthlyStats.flatMap(s => s.categories.ops?.metrics || []);
                if (cxMetrics.length > 0 || opsMetrics.length > 0) {
                    console.log(`[DataImport] ${l.name} (${l.roleType}): CX=${cxMetrics.length} metrics, Ops=${opsMetrics.length} metrics`);
                }
            });

            if (parsedData.length === 0) {
                setError('No valid data found in the provided CSVs.');
                setIsImporting(false);
                return;
            }

            // Save to Backend Database
            await importLeadsToAPI(parsedData);

            // Re-fetch fresh data from DB
            await onImportComplete();
            onClose();
        } catch (err: any) {
            setError('Error parsing or saving CSVs: ' + err.message);
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <UploadCloud className="text-indigo-600" />
                        Import Dashboard Data
                    </h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
                    {error && (
                        <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold border border-rose-100">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        {/* Leads CSV Upload */}
                        <div
                            className={`p-5 border-2 border-dashed rounded-3xl text-center transition-all ${leadsCsv ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer'}`}
                            onClick={() => !leadsCsv && leadsInputRef.current?.click()}
                        >
                            <input
                                type="file" accept=".csv" className="hidden" ref={leadsInputRef}
                                onChange={(e) => handleFileUpload(e, 'leads')}
                            />
                            <Users size={24} className={`mx-auto mb-2 ${leadsCsv ? 'text-emerald-500' : 'text-slate-400'}`} />
                            <h3 className={`text-sm font-bold ${leadsCsv ? 'text-emerald-700' : 'text-slate-700'}`}>
                                {leadsCsv ? 'Structure Uploaded' : '1. Hierarchy Structure'}
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-1">Select leads.csv (optional if already set)</p>
                        </div>

                        {/* Revenue CSV Upload */}
                        <div
                            className={`p-5 border-2 border-dashed rounded-3xl text-center transition-all ${revenueCsv ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer'}`}
                            onClick={() => !revenueCsv && revenueInputRef.current?.click()}
                        >
                            <input
                                type="file" accept=".csv" className="hidden" ref={revenueInputRef}
                                onChange={(e) => handleFileUpload(e, 'revenue')}
                            />
                            <FileBarChart size={24} className={`mx-auto mb-2 ${revenueCsv ? 'text-emerald-500' : 'text-slate-400'}`} />
                            <h3 className={`text-sm font-bold ${revenueCsv ? 'text-emerald-700' : 'text-slate-700'}`}>
                                {revenueCsv ? 'Performance Uploaded' : '2. Revenue Performance'}
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-1">Select revenue_performance.csv</p>
                        </div>

                        {/* Specialized CSV Upload */}
                        <div
                            className={`p-5 border-2 border-dashed rounded-3xl text-center transition-all ${specializedCsv ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer'}`}
                            onClick={() => !specializedCsv && specializedInputRef.current?.click()}
                        >
                            <input
                                type="file" accept=".csv" className="hidden" ref={specializedInputRef}
                                onChange={(e) => handleFileUpload(e, 'specialized')}
                            />
                            <Zap size={24} className={`mx-auto mb-2 ${specializedCsv ? 'text-emerald-500' : 'text-slate-400'}`} />
                            <h3 className={`text-sm font-bold ${specializedCsv ? 'text-emerald-700' : 'text-slate-700'}`}>
                                {specializedCsv ? 'Specialized Metrics Uploaded' : '3. Specialized Performance'}
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-1">Optional: specialized_performance.csv (CX/Ops)</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={onClose} disabled={isImporting} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-white rounded-xl transition-colors disabled:opacity-50">
                        Cancel
                    </button>
                    <button
                        onClick={processImport}
                        disabled={(!leadsCsv && !revenueCsv && !specializedCsv) || isImporting}
                        className={`px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition-all flex items-center gap-2 ${leadsCsv || revenueCsv || specializedCsv ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-300 cursor-not-allowed shadow-none'}`}
                    >
                        {isImporting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Import & Sync Dashboard'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataImport;
