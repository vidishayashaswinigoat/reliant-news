import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Article, Comment } from '../types';
import { CarouselCard } from './CarouselCard';

interface CarouselViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onArticleViewed: (articleId: string) => void;
  allComments: Record<string, Comment[]>;
  onAddComment: (articleId: string, text: string) => void;
}

export const CarouselView: React.FC<CarouselViewProps> = ({ articles, onSelectArticle, onArticleViewed, allComments, onAddComment }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // FIX: Replaced NodeJS.Timeout with a browser-compatible type.
    const viewedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [visibleArticleId, setVisibleArticleId] = useState<string | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const articleId = entry.target.getAttribute('data-article-id');
                if (articleId) {
                    setVisibleArticleId(articleId);
                }
            }
        });
    }, []);

    useEffect(() => {
        const currentObserver = new IntersectionObserver(handleIntersection, {
            root: containerRef.current,
            threshold: 0.8, // 80% of the item must be visible
        });
        observer.current = currentObserver;

        const container = containerRef.current;

        if (container) {
            Array.from(container.children).forEach(child => {
                // FIX: Add type guard to ensure child is an Element before observing.
                if (child instanceof Element) {
                    currentObserver.observe(child);
                }
            });
        }

        return () => {
            if (container) {
                Array.from(container.children).forEach(child => {
                    // FIX: Add type guard to ensure child is an Element before unobserving.
                    if (child instanceof Element) {
                        currentObserver.unobserve(child);
                    }
                });
            }
        };
    }, [articles, handleIntersection]);

    useEffect(() => {
        if (viewedTimeoutRef.current) {
            clearTimeout(viewedTimeoutRef.current);
        }
        if (visibleArticleId) {
            viewedTimeoutRef.current = setTimeout(() => {
                onArticleViewed(visibleArticleId);
            }, 3000); // Mark as read after 3 seconds
        }

        return () => {
            if (viewedTimeoutRef.current) {
                clearTimeout(viewedTimeoutRef.current);
            }
        };
    }, [visibleArticleId, onArticleViewed]);

    return (
        <div 
            ref={containerRef}
            className="h-[calc(100vh-150px)] w-full max-w-md mx-auto snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-hide"
        >
            {articles.filter(a => a.hook && a.bullets).map((article, index) => (
                <div 
                    key={article.id}
                    data-article-id={article.id}
                    className="h-full w-full snap-start flex-shrink-0 flex items-center justify-center"
                >
                    <CarouselCard 
                        article={article} 
                        onSelectArticle={onSelectArticle}
                        isVisible={visibleArticleId === article.id}
                        comments={allComments[article.id] || []}
                        onAddComment={(text) => onAddComment(article.id, text)}
                    />
                </div>
            ))}
        </div>
    );
};