
import React, { useMemo } from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface FeedProps {
  articles: Article[];
  userGenres: string[];
  onSelectArticle: (article: Article) => void;
}

export const Feed: React.FC<FeedProps> = ({ articles, userGenres, onSelectArticle }) => {
    const sortedArticles = useMemo(() => {
        return [...articles].sort((a, b) => {
            const aIsPreferred = userGenres.includes(a.genre);
            const bIsPreferred = userGenres.includes(b.genre);
            if (aIsPreferred && !bIsPreferred) return -1;
            if (!aIsPreferred && bIsPreferred) return 1;
            return 0;
        });
    }, [articles, userGenres]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Personalized Feed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedArticles.map(article => (
          <ArticleCard key={article.id} article={article} onSelectArticle={onSelectArticle} />
        ))}
      </div>
    </div>
  );
};
   