import React from 'react';
import { VerificationResult, ClaimVerification } from '../types';
import { CheckCircle, XCircle, AlertCircle, HelpCircle, List, BarChart, BookCheck } from 'lucide-react';

interface VerificationResultCardProps {
  result: VerificationResult;
}

const getVerdictConfig = (verdict: VerificationResult['overallVerdict']) => {
    switch (verdict) {
        case 'True':
            return {
                Icon: CheckCircle,
                color: 'green',
                text: 'text-green-800 dark:text-green-200',
                bg: 'bg-green-100 dark:bg-green-900/50',
                border: 'border-green-500',
            };
        case 'False':
            return {
                Icon: XCircle,
                color: 'red',
                text: 'text-red-800 dark:text-red-200',
                bg: 'bg-red-100 dark:bg-red-900/50',
                border: 'border-red-500',
            };
        case 'Partially True':
            return {
                Icon: AlertCircle,
                color: 'yellow',
                text: 'text-yellow-800 dark:text-yellow-200',
                bg: 'bg-yellow-100 dark:bg-yellow-900/50',
                border: 'border-yellow-500',
            };
        default:
            return {
                Icon: HelpCircle,
                color: 'gray',
                text: 'text-gray-800 dark:text-gray-200',
                bg: 'bg-gray-100 dark:bg-gray-700',
                border: 'border-gray-500',
            };
    }
};

const ClaimStatusIcon: React.FC<{ status: ClaimVerification['status'] }> = ({ status }) => {
    const config = getVerdictConfig(status);
    return <config.Icon size={20} className={`text-${config.color}-500 flex-shrink-0`} />;
};

export const VerificationResultCard: React.FC<VerificationResultCardProps> = ({ result }) => {
    const verdictConfig = getVerdictConfig(result.overallVerdict);
    const { Icon, text, bg, border } = verdictConfig;

    return (
        <div className={`border-l-4 ${border} ${bg} p-6 rounded-lg shadow-md animate-fade-in-fast`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                    <Icon size={40} className={`${text.split(' ')[0]}`} />
                    <div className="ml-4">
                        <h3 className={`text-2xl font-bold ${text.split(' ')[0]}`}>{result.overallVerdict}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Overall Verdict</p>
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                    <p className={`text-3xl font-bold ${text.split(' ')[0]}`}>{result.confidenceScore}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Confidence Score</p>
                </div>
            </div>

            <div className="mt-6 space-y-6">
                {/* Claims Analysis */}
                <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2"><List size={18} /> Extracted Claims</h4>
                    <ul className="space-y-3">
                        {result.claims.map((claim, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <ClaimStatusIcon status={claim.status} />
                                <div>
                                    <p className="text-gray-800 dark:text-gray-100">{claim.claim}</p>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{claim.status}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Framing Analysis */}
                <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><BarChart size={18} /> Framing & Tone Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-300 italic">"{result.framingAnalysis}"</p>
                </div>

                {/* Verified Sources */}
                <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><BookCheck size={18} /> Verified Sources</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.verifiedSources.length > 0 ? result.verifiedSources.map(source => (
                            <span key={source} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                {source}
                            </span>
                        )) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No specific sources could be identified to corroborate the claims.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
