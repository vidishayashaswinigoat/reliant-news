import React from 'react';
import { Article } from '../types';
import { TrendingUp, TrendingDown, Minus, Scale, Check, Flame, BrainCircuit } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
}

const MetricIndicator: React.FC<{ article: Article }> = ({ article }) => {
    const { primaryMetric, metrics } = article.analysis;

    switch (primaryMetric) {
        case 'ideologicalLeaning':
            const value = metrics.ideologicalLeaning ?? 0;
            const percentage = (value + 1) * 50;
            const color = value > 0.1 ? 'bg-blue-500' : value < -0.1 ? 'bg-red-500' : 'bg-gray-400';
            return (
                <div>
                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 mb-1">
                        <span>Left</span>
                        <span className="font-semibold flex items-center gap-1"><Scale size={12}/> <Tooltip metricKey="ideologicalLeaning">Ideology</Tooltip></span>
                        <span>Right</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 relative">
                         <div className={`h-1.5 rounded-full absolute ${color}`} style={{ left: `${percentage}%`, width: '2px', transform: 'translateX(-50%)' }}></div>
                         <div className="h-1.5 w-px bg-gray-400 absolute left-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            );
        case 'factualIntegrity':
            const factuality = (metrics.factualIntegrity ?? 0) * 100;
            return (
                <div>
                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 mb-1">
                       <span className="font-semibold flex items-center gap-1"><Check size={12}/> <Tooltip metricKey="factualIntegrity">Factual Integrity</Tooltip></span>
                       <span className="font-bold">{factuality.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${factuality}%` }}></div>
                    </div>
                </div>
            );
        case 'hypeBias':
             const hype = metrics.hypeBias ?? 0;
             return (
                <div className="text-sm flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span className="font-semibold flex items-center gap-1"><BrainCircuit size={12}/> <Tooltip metricKey="hypeBias">Tech Analysis</Tooltip></span>
                    <span className="font-bold">{hype > 0.1 ? 'Hype' : hype < -0.1 ? 'Fear' : 'Balanced'}</span>
                </div>
            )
        case 'sentimentIntensity':
             const intensity = (metrics.sentimentIntensity ?? 0) * 100;
             return (
                 <div>
                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 mb-1">
                       <span className="font-semibold flex items-center gap-1"><Flame size={12}/> <Tooltip metricKey="sentimentIntensity">Sentiment Intensity</Tooltip></span>
                       <span className="font-bold">{intensity.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${intensity}%` }}></div>
                    </div>
                </div>
            );
        default:
            return null;
    }
};


export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelectArticle }) => {
  return (
    <div 
        onClick={() => onSelectArticle(article)}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
    >
      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover rounded-t-lg" />
      )}
      <div className="p-5 flex-grow">
        <p className="text-sm text-blue-500 dark:text-blue-400 font-semibold">{article.genre}</p>
        <h3 className="text-lg font-bold mt-1 text-gray-800 dark:text-white leading-tight">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{article.source} &bull; {article.publicationDate}</p>
      </div>
      <div className="p-5 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
        <MetricIndicator article={article} />
      </div>
    </div>
  );
};
