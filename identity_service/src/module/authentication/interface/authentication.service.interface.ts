export interface IAuthenticationSerivce {
  userRegister: () => boolean;
  userLogin: () => string;
  refreshToken
}
