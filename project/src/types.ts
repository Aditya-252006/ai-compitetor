export interface Competitor {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  description: string;
  industry: string;
  fundingStage: string;
  location: string;
  isActive: boolean;
}

export interface CompetitorProject {
  id: string;
  competitorId: string;
  competitorName: string;
  competitorLogo: string;
  title: string;
  description: string;
  category: 'Product' | 'Marketing' | 'Funding' | 'Partnership' | 'Acquisition';
  sourceUrl: string;
  sourceType: string;
  publishedDate: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  sentimentScore: number;
  aiSummary: string;
  tags: string[];
}

export interface MarketTrend {
  id: string;
  title: string;
  description: string;
  industry: string;
  trendType: string;
  impactLevel: 'Low' | 'Medium' | 'High';
  keywords: string[];
  sourceUrl: string;
  publishedDate: string;
}

export interface SWOTAnalysis {
  competitorId: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  insightType: 'Opportunity' | 'Risk' | 'Recommendation';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  relatedCompetitorId?: string;
  status: 'New' | 'Reviewed' | 'Actioned';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
