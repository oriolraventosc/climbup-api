import type { ClimbingWall } from "../types/types";

const pagination = (climbingWalls: ClimbingWall[], limit: number) =>
  climbingWalls.slice(0, limit);

export default pagination;
