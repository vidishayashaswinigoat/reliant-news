import React, { useState, useCallback } from 'react';
import { verifyTextContent } from '../services/geminiService';
import { VerificationResult } from '../types';
import { VerificationResultCard } from './VerificationResultCard';
import { Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const VerifyView: React.FC = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<VerificationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = useCallback(async () => {
        if (!text.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const verificationResult = await verifyTextContent(text);
            setResult(verificationResult);
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Verification failed. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [text]);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Reliant Verify</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Fact-check any story. Paste text from a WhatsApp forward, social media post, or article link to verify its claims.
                </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste the text you want to verify here..."
                    className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                    disabled={isLoading}
                />
                <button
                    onClick={handleVerify}
                    disabled={isLoading || !text.trim()}
                    className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <ShieldCheck size={20} />
                            Analyze & Verify
                        </>
                    )}
                </button>
            </div>

            <div className="mt-8">
                {error && (
                    <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md" role="alert">
                        <div className="flex items-center">
                            <AlertTriangle size={20} className="mr-3" />
                            <div>
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                {result && <VerificationResultCard result={result} />}
            </div>
        </div>
    );
};
