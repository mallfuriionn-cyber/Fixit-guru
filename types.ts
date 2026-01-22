
export enum CharacterType {
  KAREL = 'KAREL',
  LUCIE = 'LUCIE',
  DASA = 'DASA',
  FRANTISEK = 'FRANTISEK'
}

export enum UserPath {
  BEGINNER = 'BEGINNER',
  EXPERIENCED = 'EXPERIENCED',
  PRO = 'PRO',
  GUEST = 'GUEST'
}

export enum ProposalStatus {
  PENDING = 'PENDING',
  DEVELOPMENT = 'DEVELOPMENT',
  DEPLOYED = 'DEPLOYED'
}

export enum InnovationCategory {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  OPTIMIZATION = 'OPTIMIZATION',
  RESEARCH = 'RESEARCH'
}

// Define common UI types
export type CmdSection = 'none' | 'history' | 'help' | 'about' | 'eco' | 'legislation' | 'appearance' | 'feedback' | 'expert' | 'admin' | 'myRepairs';
export type DisplayMode = 'light' | 'dark' | 'amoled';
export type BgPattern = 'studio' | 'blueprint' | 'topographic' | 'neural';
export type UITheme = 'default' | 'grandma' | 'workshop';
export type AuthMode = 'none' | 'login' | 'register';
export type ViewState = 'landing' | 'chat';

export interface InnovationProposal {
  id: string;
  title: string;
  category: InnovationCategory;
  specialist: CharacterType;
  description: string;
  author: string;
  authorTier: UserPath;
  votes: number;
  status: ProposalStatus;
  timestamp: Date;
  userVoted?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  character: CharacterType;
  timestamp: Date;
  imageUrl?: string;
  audioUrl?: string;
  isSafetyWarning?: boolean;
}

export interface UserProfile {
  name: string;
  path: UserPath;
  wasteSavedTotal: number;
  lastSpecialist: CharacterType;
  biometryEnabled: boolean;
  gdprAccepted: boolean;
  liabilityAccepted: boolean;
}

export interface ChatSession {
  id: string;
  character: CharacterType;
  messages: Message[];
  timestamp: Date;
}

export interface RepairProject {
  id: string;
  title: string;
  specialist: CharacterType;
  date: Date;
  status: 'completed' | 'ongoing' | 'failed';
  ecoSaving: number; // v kg
  summary: string;
  toolsUsed: string[];
}

export interface BlackBoxEntry {
  id: string;
  task: string;
  date: Date;
  outcome: 'success' | 'failed';
  summary: string;
}

export interface EcoStats {
  wasteSavedKg: number;
  co2SavedKg: number;
  moneySavedCzk: number;
}
