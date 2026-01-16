
import { Property, Roommate, Task, CommunityGroup, QuizQuestion, DirectMessage } from './types';

export const AMBER_RED = '#E52D2D';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Cozy Student Apartment',
    location: 'Central University District',
    price: 250,
    originalPrice: 260,
    commuteTime: 12,
    safetyScore: 9.4,
    socialScore: 9.1,
    amenities: ['All Bills Included', 'High Social Score', 'Gym'],
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    description: 'Modern co-living space with extensive social facilities and a focus on community.',
    confidenceScore: 9.4,
    safetyBreakdown: {
      overallScore: 9.4,
      crimeStats: '22% lower crime rate than London average. Highly managed corporate zone.',
      studentFeedback: 'Students feel very safe walking home from the Jubilee line at 11 PM.',
      highlights: ['24/7 On-site Security', 'CCTV in all corridors', 'Keycard access only']
    },
    studentTours: [
      { id: 't1', studentName: 'John', tourName: "Room Walkthrough", avatarUrl: 'https://picsum.photos/seed/john/150/150' },
      { id: 't2', studentName: 'Maria', tourName: "Apartment Tour", avatarUrl: 'https://picsum.photos/seed/maria/150/150' },
      { id: 't3', studentName: 'Ahmed', tourName: "Shared Space", avatarUrl: 'https://picsum.photos/seed/ahmed/150/150' },
    ],
    areaInsights: [
      { label: 'Safety', value: 'High', icon: '🛡️', color: 'bg-blue-50 text-blue-600' },
      { label: 'Cafes', value: '10+ nearby', icon: '☕', color: 'bg-red-50 text-red-600' },
      { label: 'Night Transport', value: 'Available', icon: '🚆', color: 'bg-indigo-50 text-indigo-600' },
    ]
  },
  {
    id: '2',
    name: 'The Urban Nest',
    location: 'London, NW1 7BH',
    price: 280,
    originalPrice: 290,
    commuteTime: 20,
    safetyScore: 8.8,
    socialScore: 7.5,
    amenities: ['Utilities Extra', 'Study Lounges', 'Private Kitchen'],
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    description: 'A premium student accommodation near major London universities.',
    confidenceScore: 8.8,
    safetyBreakdown: {
      overallScore: 8.8,
      crimeStats: 'Moderate residential area. Well-lit streets with regular police patrols.',
      studentFeedback: 'Busy area during the day, quieter at night.',
      highlights: ['Secure Bike Storage', 'Concierge Service', 'Video Intercom']
    },
    studentTours: [
      { id: 't4', studentName: 'Li', tourName: "Standard Room", avatarUrl: 'https://picsum.photos/seed/li/150/150' },
      { id: 't5', studentName: 'Sarah', tourName: "Kitchen Review", avatarUrl: 'https://picsum.photos/seed/sarah/150/150' },
    ],
    areaInsights: [
      { label: 'Safety', value: 'Medium-High', icon: '🛡️', color: 'bg-blue-50 text-blue-600' },
      { label: 'Libraries', value: '3 nearby', icon: '📖', color: 'bg-green-50 text-green-600' },
      { label: 'Groceries', value: '5 min walk', icon: '🛒', color: 'bg-orange-50 text-orange-600' },
    ]
  }
];

export const ROOMMATES: Roommate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    university: 'University College London',
    matchScore: 95,
    traits: ['Quiet at night', 'Loves cooking', 'Masters student'],
    imageUrl: 'https://picsum.photos/seed/user1/150/150',
    habitType: 'Early Bird'
  },
  {
    id: '2',
    name: 'Liam Chen',
    university: 'Kings College London',
    matchScore: 88,
    traits: ['Early riser', 'Enjoys fitness', 'Clean freak'],
    imageUrl: 'https://picsum.photos/seed/user2/150/150',
    habitType: 'Early Bird'
  }
];

export const DEMO_MESSAGES: Record<string, DirectMessage[]> = {
  '1': [
    { id: 'm1', sender: 'them', text: "Hey! I saw we're matched for The Collective.", timestamp: '10:00 AM' },
    { id: 'm2', sender: 'me', text: "Hi Sarah! Yeah, it looks like we have very similar study habits.", timestamp: '10:05 AM' },
    { id: 'm3', sender: 'them', text: "Totally. Are you also doing a Masters at LSE?", timestamp: '10:06 AM' }
  ],
  '2': [
    { id: 'm4', sender: 'them', text: "Hello! Looking for a clean roommate?", timestamp: 'Yesterday' },
    { id: 'm5', sender: 'me', text: "Definitely. I'm a bit of a clean freak myself haha.", timestamp: 'Yesterday' }
  ]
};

export const ARRIVAL_TASKS: Task[] = [
  { id: '1', title: 'Airport Pickup', status: 'completed', category: 'arrival', icon: '✈️' },
  { id: '2', title: 'UK SIM Card', status: 'completed', category: 'logistics', icon: '📱' },
  { id: '3', title: 'Open Bank Account', status: 'pending', category: 'finance', icon: '🏦' },
  { id: '4', title: 'Local Grocery Map', status: 'pending', category: 'logistics', icon: '🛒' }
];

export const COMMUNITY_GROUPS: CommunityGroup[] = [
  { id: '1', name: 'LSE International Students', category: 'Social', members: 1240, description: 'Connect with fellow global students at LSE.', icon: '🌍' },
  { id: '2', name: 'Canary Wharf Gym Buddies', category: 'Sports', members: 86, description: 'Morning workout groups for E14 residents.', icon: '💪' },
  { id: '3', name: 'UCL Study Sprint', category: 'Study', members: 450, description: 'Find study partners for finals week.', icon: '📚' },
  { id: '4', name: 'Part-time Jobs London', category: 'Jobs', members: 3200, description: 'Verified student-friendly job listings.', icon: '💼' },
  { id: '5', name: 'West End Theatre Lovers', category: 'Social', members: 210, description: 'Weekly trips to see musicals and plays.', icon: '🎭' },
  { id: '6', name: 'Coding Bootcamp London', category: 'Study', members: 890, description: 'Learn React and Node with other students.', icon: '💻' }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, question: "What's your typical sleep schedule?", options: ["Early Bird (6am-10pm)", "Night Owl (12am-8am)", "It's complicated"] },
  { id: 2, question: "How often do you like to host friends?", options: ["Rarely - My room is a sanctuary", "Sometimes - Weekend gatherings", "Frequently - I love socializing"] },
  { id: 3, question: "What is your cleaning style?", options: ["Minimalist - I clean as I go", "Weekend Warrior - Deep clean once a week", "Relaxed - A bit of clutter is fine"] }
];
