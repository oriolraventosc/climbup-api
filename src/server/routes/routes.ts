const routes = {
  users: "/users",
  login: "/login",
  register: "/register",
  climbingWalls: "/climbingWalls",
  loadAllClimbingWalls: "/loadAllClimbingWalls",
  debug: process.env.DEBUG,
  loadClimbingWallsFiltered: "/loadClimbingWallsByLocation",
};

export default routes;
