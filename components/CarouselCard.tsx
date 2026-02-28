import React, { useState } from 'react';
import { Article, Comment } from '../types';
import { Bot, BookOpen, Scale, Check, Flame, BrainCircuit, MessageCircle } from 'lucide-react';
import { CommentsSheet } from './CommentsSheet';
import { Tooltip } from './Tooltip';
import { metricInfo } from '../data/metricsInfo';

interface CarouselCardProps {
    article: Article;
    onSelectArticle: (article: Article) => void;
    isVisible: boolean;
    comments: Comment[];
    onAddComment: (text: string) => void;
}

const MetricBadge: React.FC<{ article: Article }> = ({ article }) => {
    const { primaryMetric, metrics } = article.analysis;
    let icon: React.ReactNode;
    let metricName: string;
    let metricValue: string;

    switch (primaryMetric) {
        case 'ideologicalLeaning':
            const leaning = metrics.ideologicalLeaning ?? 0;
            icon = <Scale size={16} />;
            metricName = 'Leaning';
            metricValue = `: ${leaning > 0.1 ? 'Right' : leaning < -0.1 ? 'Left' : 'Neutral'}`;
            break;
        case 'factualIntegrity':
            icon = <Check size={16} />;
            metricName = 'Factual';
            metricValue = `: ${((metrics.factualIntegrity ?? 0) * 100).toFixed(0)}%`;
            break;
        case 'hypeBias':
            const hype = metrics.hypeBias ?? 0;
            icon = <BrainCircuit size={16} />;
            metricName = 'Tech Tone';
            metricValue = `: ${hype > 0.1 ? 'Hype' : hype < -0.1 ? 'Fear' : 'Balanced'}`;
            break;
        case 'sentimentIntensity':
            icon = <Flame size={16} />;
            metricName = 'Intensity';
            metricValue = `: ${((metrics.sentimentIntensity ?? 0) * 100).toFixed(0)}%`;
            break;
        default:
            return null;
    }

    return (
        <div className="absolute top-4 left-4 bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm">
            {icon}
            <span>
                <Tooltip metricKey={primaryMetric as keyof typeof metricInfo}>{metricName}</Tooltip>
                {metricValue}
            </span>
        </div>
    );
};

export const CarouselCard: React.FC<CarouselCardProps> = ({ article, onSelectArticle, isVisible, comments, onAddComment }) => {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    
    const cardStyle = {
        backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    
    return (
        <>
        <div 
            style={cardStyle}
            className="w-full h-full bg-gray-700 dark:bg-gray-800 rounded-2xl shadow-2xl relative flex flex-col justify-end p-6 text-white"
        >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <MetricBadge article={article} />

            <div className="relative z-10 space-y-4">
                <div className="space-y-2">
                    <p className="text-sm font-semibold">{article.source}</p>
                    <h2 className={`text-2xl font-bold transition-transform duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>{article.hook}</h2>
                </div>
                
                <ul className="space-y-2">
                    {article.bullets?.map((bullet, index) => (
                        <li 
                            key={index} 
                            className={`flex items-start gap-2 transition-all duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transitionDelay: `${150 * (index + 1)}ms` }}
                        >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-200">{bullet}</p>
                        </li>
                    ))}
                </ul>

                <div className="pt-4 flex gap-3">
                    <button 
                        onClick={() => onSelectArticle(article)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <BookOpen size={18} />
                        Read Full Story
                    </button>
                     <button 
                        onClick={() => onSelectArticle(article)}
                        className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors backdrop-blur-sm"
                    >
                        <Bot size={18} />
                        Chat
                    </button>
                    <button 
                        onClick={() => setIsCommentsOpen(true)}
                        className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors backdrop-blur-sm relative"
                    >
                        <MessageCircle size={18} />
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold px-1.5 rounded-full">
                            {comments.length}
                        </span>
                    </button>
                </div>
            </div>
        </div>
        {isCommentsOpen && (
            <CommentsSheet 
                comments={comments}
                onAddComment={onAddComment}
                onClose={() => setIsCommentsOpen(false)}
            />
        )}
        </>
    );
};
