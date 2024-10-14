export interface IAuthenticationSerivce {
  userRegister: () => boolean;
  userLogin: () => string;
  refreshToken: () => string;
  validateToken: () => string;
}
