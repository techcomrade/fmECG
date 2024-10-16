export interface IAuthenticationService {
  userRegister: () => Promise<boolean>;
  userLogin: () => Promise<string>;
  refreshToken: () => Promise<string>;
  validateToken: () => Promise<string>;
}
