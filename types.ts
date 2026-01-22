
export enum CharacterType {
  KAREL = 'KAREL',
  LUCIE = 'LUCIE',
  DASA = 'DASA',
  FRANTISEK = 'FRANTISEK',
  REKLAMACE = 'REKLAMACE'
}

export enum UserPath {
  BEGINNER = 'BEGINNER',
  EXPERIENCED = 'EXPERIENCED',
  PRO = 'PRO',
  GUEST = 'GUEST'
}

export enum UserRole {
  GUEST = 'GUEST',
  REGISTERED = 'REGISTERED',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER'
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

export type CmdSection = 'none' | 'history' | 'help' | 'about' | 'eco' | 'legislation' | 'appearance' | 'feedback' | 'expert' | 'admin' | 'myRepairs' | 'identity' | 'wall' | 'messages' | 'legal';
export type DisplayMode = 'light' | 'dark' | 'amoled';
export type BgPattern = 'studio' | 'blueprint' | 'topographic' | 'neural';
export type UITheme = 'default' | 'grandma' | 'workshop';
export type AuthMode = 'none' | 'login' | 'register';
export type ViewState = 'landing' | 'chat';

export interface VoltagePoint {
  time: string;
  value: number;
}

export interface InstructionBlock {
  id: string;
  type: 'text' | 'warning' | 'image' | 'measurement' | 'poll' | 'code' | '3d';
  content: string;
  meta?: any;
}

export interface SynthesisComment {
  id: string;
  author: string;
  content: string;
  date: Date;
  avatar?: string;
}

export interface SynthesisPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  date: Date;
  content?: string;
  comments?: SynthesisComment[];
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface SynthesisPoll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
  userVotedOptionId?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'stl' | 'zip';
  size: string;
  date: Date;
}

export interface RepairProject {
  id: string;
  title: string;
  specialist: CharacterType;
  date: Date;
  status: 'completed' | 'ongoing' | 'failed';
  ecoSaving: number; 
  summary: string;
  toolsUsed: string[];
  voltageLog?: VoltagePoint[];
  repairCost?: number;
}

export interface Tool {
  id: string;
  name: string;
  category: 'electrical' | 'mechanical' | 'chemical' | 'other';
  isCalibrated?: boolean;
}

export interface TerminalMail {
  id: string;
  from: string;
  fromRole: UserRole;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high';
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  isPublic: boolean;
  path: UserPath;
  role: UserRole;
  wasteSavedTotal: number;
  moneySavedTotal: number;
  lastSpecialist: CharacterType;
  biometryEnabled: boolean;
  gdprAccepted: boolean;
  liabilityAccepted: boolean;
  inventory: Tool[];
  mail: TerminalMail[];
  avatarUrl?: string;
  lightningCount: number;
  isAdmin?: boolean;
}

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

export interface ChatSession {
  id: string;
  character: CharacterType;
  messages: Message[];
  timestamp: Date;
  title?: string;
}
