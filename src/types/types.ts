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
