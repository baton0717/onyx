export interface UserProfile {
  id: string;
  name: string;
  age: number;
  job: string;
  bio: string;
  photos: string[];
  tags: string[];
  distance: number; // km
  compatibilityScore: number; // 0-100
  isVerified: boolean;
}

export interface Match {
  id: string;
  user: UserProfile;
  matchedAt: Date;
  lastMessage?: string;
  lastMessageAt?: Date;
  hasUnread: boolean;
  iceBreakers: IceBreaker[];
}

export interface IceBreaker {
  id: string;
  question: string;
  category: 'lifestyle' | 'values' | 'fun' | 'date';
}

export type RootTabParamList = {
  Home: undefined;
  Matches: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  UserDetail: { user: UserProfile };
  Chat: { match: Match };
};
