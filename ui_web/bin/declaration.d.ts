
declare interface AppContext {
    env?: string;
    apiUrl?: string;
    clientId?: string; // identity to check concurrent login
    ssoUrl?: string;
    hostUrl?: string;
    identity?: any;
    loginResult?: boolean;
    token?: string;
    supportedLanguages?: string[];
  }