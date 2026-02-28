import React, { useMemo } from 'react';
import { Poll, PollOption } from '../types';
import { Check } from 'lucide-react';

interface PollProps {
    poll: Poll;
    userVote?: string; // optionId
    onVote: (optionId: string) => void;
}

export const PollComponent: React.FC<PollProps> = ({ poll, userVote, onVote }) => {
    const totalVotes = useMemo(() => {
        return poll.options.reduce((sum, option) => sum + option.votes + (userVote && option.id === userVote ? 1 : 0), 0);
    }, [poll, userVote]);
    
    const getVoteCount = (option: PollOption) => {
        return option.votes + (userVote && option.id === userVote ? 1 : 0);
    }
    
    return (
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-bold text-gray-800 dark:text-white mb-4">{poll.question}</h4>
            <div className="space-y-3">
                {poll.options.map(option => {
                    const hasVotedForThis = userVote === option.id;
                    const votes = getVoteCount(option);
                    const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

                    if (userVote) {
                        return (
                            <div key={option.id} className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-md p-3 text-left overflow-hidden">
                                <div 
                                    className={`absolute top-0 left-0 h-full ${hasVotedForThis ? 'bg-blue-200 dark:bg-blue-800/50' : 'bg-gray-300 dark:bg-gray-500/50'} transition-all duration-500 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                                <div className="relative flex justify-between items-center">
                                    <span className={`font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2`}>
                                        {option.text}
                                        {hasVotedForThis && <Check size={16} className="text-blue-600 dark:text-blue-400"/>}
                                    </span>
                                    <span className="font-bold text-gray-700 dark:text-gray-200">{percentage.toFixed(0)}%</span>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <button
                                key={option.id}
                                onClick={() => onVote(option.id)}
                                className="w-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md p-3 text-left font-semibold transition-colors"
                            >
                                {option.text}
                            </button>
                        );
                    }
                })}
            </div>
            {userVote && <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-right">{totalVotes} votes</p>}
        </div>
    );
};
