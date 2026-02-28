export type PrimaryMetric = 
  | 'ideologicalLeaning' 
  | 'factualIntegrity' 
  | 'hypeBias' 
  | 'sentimentIntensity';

export interface Analysis {
  primaryMetric: PrimaryMetric;
  metrics: {
    ideologicalLeaning?: number; // Politics: -1 (Left) to +1 (Right)
    establishmentBias?: number; // Politics
    factualIntegrity?: number;  // Science/Health: 0 to 1
    opinionation?: number;      // Science/Health: 0 to 1
    sensationalism?: number;    // All: 0 to 1
    hypeBias?: number;          // Tech: -1 (Fear) to +1 (Hype)
    sentimentIntensity?: number;// Sports/Culture: 0 to 1
  };
  sentiment: {
    score: 'Positive' | 'Neutral' | 'Negative';
    value: number;
  };
  topics: string[];
  claims: {
    statement: string;
    corroboration: number;
  }[];
  sourceCredibility: number;
  explainability: string[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface Article {
  id: string;
  title: string;
  source: string;
  publicationDate: string;
  genre: string;
  summary: string;
  fullText: string;
  analysis: Analysis;
  eventId?: string;
  imageUrl?: string;
  hook?: string; // For Carousel
  bullets?: string[]; // For Carousel
  poll?: Poll; // For Gamification
  comments?: Comment[]; // For Social Interaction
}

export interface ShortClip extends Article {}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ClaimVerification {
  claim: string;
  status: 'True' | 'False' | 'Partially True' | 'Unverified';
}

export interface VerificationResult {
  overallVerdict: 'True' | 'False' | 'Partially True' | 'Unverified';
  confidenceScore: number;
  claims: ClaimVerification[];
  framingAnalysis: string;
  verifiedSources: string[];
}