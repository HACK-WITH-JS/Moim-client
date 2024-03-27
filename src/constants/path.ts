export const PATH = {
  HOME: "/",
  MY: "/my",
  MY_ARTICLES: "/my/articles",
  MY_BOOKMARKS: "/my/bookmarks",
} as const;

// TODO 환경 변수로 제거 필요
export const API_BASE_URL = "http://localhost:8080";

export const AUTH_PATH = {
  GOOGLE: `${API_BASE_URL}/api/auth/google`,
  GITHUB: `${API_BASE_URL}/api/auth/github`,
} as const;
