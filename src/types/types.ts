
export interface UserData {
  name: string;
  designation: string;
  company: string;
  email: string;
}

export interface GeneratedResult {
  id: string;
  poem: string;
  portraitUrl: string;
  portraitStyle?: ImageStyle;
  createdAt: string;
}

export type ImageStyle = 
  | "professional" 
  | "linkedin" 
  | "avatar" 
  | "marvel" 
  | "rockstar" 
  | "gta";

