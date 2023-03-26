export interface AuthorizationResponse {
  [x: string]: any;
  status?: number;
  message: string;
  token?: { bearer: string; uid: string };
}
