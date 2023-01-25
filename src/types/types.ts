import type { JwtPayload } from "jsonwebtoken";

export interface UserStructure {
  email: string;
  password: string;
  name: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  email: string;
}

export interface ClimbingWallFilters {
  installations: string;
  activities: string;
  location: string;
}

export interface ClimbingWall {
  name: string;
  city: string;
  address: string;
  email: string;
  telephone: number;
  description: string;
  prices: string;
  installations: string[];
  schedule: string;
  activities: string[];
  website: string;
  id?: string;
  picture1?: string;
  picture2?: string;
  picture3?: string;
  picture4?: string;
}
