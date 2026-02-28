import React, { useState, useCallback, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { Feed } from './components/Feed';
import { ArticleView } from './components/ArticleView';
import { NewsMirror } from './components/NewsMirror';
import { VerifyView } from './components/VerifyView';
import { CarouselView } from './components/CarouselView';
import { BusinessIntelligenceSuite } from './components/BusinessIntelligenceSuite';
import { Article, Comment } from './types';
import { mockArticles } from './data/mockData';
import { BarChart3, Newspaper, ShieldCheck, PlayCircle, Lock } from 'lucide-react';

type AppView = 'onboarding' | 'feed' | 'news-mirror' | 'verify' | 'carousel' | 'bis';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('onboarding');
  const [userGenres, setUserGenres] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());
  
  // State for interactive features
  const [userVotes, setUserVotes] = useState<Record<string, string>>({}); // { pollId: optionId }
  const [allComments, setAllComments] = useState<Record<string, Comment[]>>({}); // { articleId: Comment[] }
  const [bisConfig, setBisConfig] = useState<{ industry: string | null; focus: string | null }>({ industry: null, focus: null });

  useEffect(() => {
    // Initialize comments from mock data
    const initialComments = mockArticles.reduce((acc, article) => {
        if (article.comments) {
            acc[article.id] = article.comments;
        }
        return acc;
    }, {} as Record<string, Comment[]>);
    setAllComments(initialComments);
  }, []);

  const handleVote = useCallback((pollId: string, optionId: string) => {
    setUserVotes(prev => ({ ...prev, [pollId]: optionId }));
  }, []);

  const handleAddComment = useCallback((articleId: string, text: string) => {
    const newComment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        avatar: 'https://i.pravatar.cc/40?u=current_user',
        text,
        timestamp: 'Just now',
    };
    setAllComments(prev => ({
        ...prev,
        [articleId]: [...(prev[articleId] || []), newComment],
    }));
  }, []);


  const handleOnboardingComplete = useCallback((genres: string[]) => {
    setUserGenres(genres);
    setView('feed');
  }, []);
  
  const handleBisOnboardingComplete = useCallback((industry: string, focus: string) => {
    setBisConfig({ industry, focus });
  }, []);

  const markArticleAsRead = useCallback((articleId: string) => {
    setReadArticles(prev => new Set(prev).add(articleId));
  }, []);

  const handleSelectArticle = useCallback((article: Article) => {
    setSelectedArticle(article);
    markArticleAsRead(article.id);
  }, [markArticleAsRead]);

  const handleCloseArticle = useCallback(() => {
    setSelectedArticle(null);
  }, []);
  
  const handleSetView = useCallback((newView: AppView) => {
      if (view !== 'onboarding') {
          setView(newView);
      }
  }, [view]);

  const articlesRead = mockArticles.filter(a => readArticles.has(a.id));

  const renderContent = () => {
    switch (view) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'feed':
        return <Feed articles={mockArticles} onSelectArticle={handleSelectArticle} userGenres={userGenres} />;
      case 'news-mirror':
        return <NewsMirror readArticles={articlesRead} onBackToFeed={() => setView('feed')} />;
      case 'verify':
        return <VerifyView />;
      case 'carousel':
        return (
            <CarouselView 
                articles={mockArticles} 
                onSelectArticle={handleSelectArticle} 
                onArticleViewed={markArticleAsRead}
                allComments={allComments}
                onAddComment={handleAddComment}
            />
        );
      case 'bis':
        return <BusinessIntelligenceSuite config={bisConfig} onOnboardingComplete={handleBisOnboardingComplete} />;
      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            🧭 Reliant
          </h1>
          {view !== 'onboarding' && (
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => handleSetView('feed')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${view === 'feed' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-current={view === 'feed' ? 'page' : undefined}
                >
                    <Newspaper size={18} />
                    Feed
                </button>
                <button 
                    onClick={() => handleSetView('carousel')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${view === 'carousel' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-current={view === 'carousel' ? 'page' : undefined}
                >
                    <PlayCircle size={18} />
                    Carousel
                </button>
                <button 
                    onClick={() => handleSetView('news-mirror')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${view === 'news-mirror' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-current={view === 'news-mirror' ? 'page' : undefined}
                >
                    <BarChart3 size={18} />
                    News Mirror
                </button>
                 <button 
                    onClick={() => handleSetView('verify')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${view === 'verify' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-current={view === 'verify' ? 'page' : undefined}
                >
                    <ShieldCheck size={18} />
                    Verify News
                </button>
                <button 
                    onClick={() => handleSetView('bis')}
                    title="Business Intelligence Suite — Enterprise Analytics for Decision-Makers"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${view === 'bis' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-current={view === 'bis' ? 'page' : undefined}
                >
                    <Lock size={16} className="text-yellow-600 dark:text-yellow-400" />
                    BIS
                </button>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
      {selectedArticle && (
        <ArticleView 
            article={selectedArticle} 
            onClose={handleCloseArticle}
            userVote={userVotes[selectedArticle.poll?.id ?? '']}
            onVote={handleVote}
            bisConfig={bisConfig}
        />
      )}
    </div>
  );
};

export default App;
