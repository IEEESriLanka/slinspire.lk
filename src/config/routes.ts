/**
 * Centralized Route Paths
 * Compatible with HashRouter on GitHub Pages
 */

export const ROUTES = {
  HOME: "/",
  CAREER_COMPASS_WEB: "/career-compass-web",
  CAREER_COMPASS_BOOK: "/career-compass-book",
  CAREER_EXPLORER: "/career-explorer",
  GALLERY: "/gallery",
  ABOUT_US: "/aboutus",
  PARTNERS: "/partners",
  PARTNERS_LEGACY: "/patners",
  TEAM: "/team",
  SESSION_RECORDINGS: "/session-recordings",
  PLAYLIST: "/playlist/:categoryId",
  getPlaylistUrl: (categoryId: number | string) => `/playlist/${categoryId}`,

  // Events
  STEP_UP: "/step-up",
  STEP_UP_REGISTER: "/step-up/register",
  STEP_UP_SUCCESS: "/step-up/success",
  WEB_LAUNCH: "/web-launch",
} as const;
