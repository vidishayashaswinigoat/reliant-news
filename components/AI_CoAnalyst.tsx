import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from '../types';
import { createCoAnalystChat } from '../services/geminiService';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Chat } from '@google/genai';

interface AI_CoAnalystProps {
  config: { industry: string | null; focus: string | null };
}

export const AI_CoAnalyst: React.FC<AI_CoAnalystProps> = ({ config }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (config.industry && config.focus) {
        chatRef.current = createCoAnalystChat(config.industry, config.focus);
        setMessages([
            { role: 'model', text: `Hello! I am your AI Co-Analyst. How can I help you analyze the ${config.industry} sector today?` }
        ]);
        setError(chatRef.current ? null : "AI Co-Analyst is unavailable. API Key may be missing.");
    }
  }, [config]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: input });
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
          return newMessages;
        });
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while communicating with the co-analyst.');
      setMessages(prev => prev.filter(m => m.role !== 'model' || m.text !== ''));
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold flex items-center gap-2">
            <Bot className="text-blue-500" /> AI Co-Analyst
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Your strategic co-pilot</p>
      </div>

      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-800/50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Bot size={20} className="text-white" />
                </div>
            )}
             <div className={`max-w-xs md:max-w-sm rounded-2xl p-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-lg'}`}>
                {msg.text || <Loader2 className="animate-spin w-4 h-4" />}
            </div>
            {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-gray-800 dark:text-white" />
                </div>
            )}
          </div>
        ))}
        {error && <div className="text-center text-red-500 text-sm p-2 bg-red-100 dark:bg-red-900/50 rounded-md">{error}</div>}
         <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a strategic question..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isLoading || !!error}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || !!error}
            className="bg-blue-600 text-white p-2.5 rounded-lg disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
          </button>
        </div>
      </div>
    </div>
  );
};
