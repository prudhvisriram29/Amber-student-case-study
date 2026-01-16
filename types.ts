
export interface SafetyBreakdown {
  overallScore: number;
  crimeStats: string;
  studentFeedback: string;
  highlights: string[];
}

export interface StudentTour {
  id: string;
  studentName: string;
  tourName: string;
  avatarUrl: string;
}

export interface AreaInsight {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  originalPrice?: number;
  commuteTime: number;
  safetyScore: number;
  socialScore: number;
  amenities: string[];
  imageUrl: string;
  description: string;
  safetyBreakdown: SafetyBreakdown;
  confidenceScore: number;
  studentTours: StudentTour[];
  areaInsights: AreaInsight[];
}

export interface Roommate {
  id: string;
  name: string;
  university: string;
  matchScore: number;
  traits: string[];
  imageUrl: string;
  habitType: 'Early Bird' | 'Night Owl';
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'in-progress';
  category: 'logistics' | 'arrival' | 'finance';
  icon: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  category: 'Social' | 'Study' | 'Jobs' | 'Sports';
  members: number;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface DirectMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
}

export type ViewState = 'discovery' | 'listing-detail' | 'roommates' | 'arrival' | 'community' | 'messaging';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}
