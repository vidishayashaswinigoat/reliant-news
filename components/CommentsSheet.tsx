import React, { useState } from 'react';
import { Comment } from '../types';
import { X, Send } from 'lucide-react';

interface CommentsSheetProps {
    comments: Comment[];
    onAddComment: (text: string) => void;
    onClose: () => void;
}

export const CommentsSheet: React.FC<CommentsSheetProps> = ({ comments, onAddComment, onClose }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-end" onClick={onClose}>
            <div 
                className="bg-white dark:bg-gray-800 w-full max-w-md h-[70vh] rounded-t-2xl shadow-lg flex flex-col animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">Comments ({comments.length})</h3>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <X size={20} />
                    </button>
                </header>

                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {comments.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 pt-10">No comments yet. Be the first to share your thoughts!</p>
                    ) : (
                        comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-3">
                                <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm text-gray-800 dark:text-white">{comment.user}</p>
                                        <p className="text-xs text-gray-400">{comment.timestamp}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                         <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="bg-blue-600 text-white p-2.5 rounded-lg disabled:bg-gray-400 transition-colors"
                        >
                            <Send />
                        </button>
                    </form>
                </footer>
            </div>
             <style>{`
                @keyframes slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};
