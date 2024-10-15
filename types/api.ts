export interface ApiError extends Error {
  info?: any;
  status?: number;
}
