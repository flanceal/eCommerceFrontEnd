class ConfigService {
  private static readonly AUTH0_DOMAIN: string | undefined = import.meta.env
    .VITE_AUTH0_DOMAIN;

  public static readonly getAuth0Domain = () => {
    if (!ConfigService.AUTH0_DOMAIN) {
      throw new Error('Domain for Auth0 is not specified');
    }

    return ConfigService.AUTH0_DOMAIN;
  };

  private static readonly AUTH0_CLIENT_ID: string | undefined = import.meta.env
    .VITE_AUTH0_CLIENT_ID;

  public static readonly getAuth0ClientId = () => {
    if (!ConfigService.AUTH0_CLIENT_ID) {
      throw new Error('ClientID for Auth0 is not specified');
    }

    return ConfigService.AUTH0_CLIENT_ID;
  };

  private static readonly AUTH0_AUDIENCE: string | undefined = import.meta.env
    .VITE_AUTH0_AUDIENCE;

  public static readonly getAuth0Audience = () => {
    if (!ConfigService.AUTH0_AUDIENCE) {
      throw new Error('Audience for Auth0 is not specified');
    }

    return ConfigService.AUTH0_AUDIENCE;
  };
}

export default ConfigService;
