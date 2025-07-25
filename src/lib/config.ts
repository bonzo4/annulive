interface AppConfig {
  servicesEndpoint: string;
}

export const appConfig: AppConfig = {
  servicesEndpoint: process.env.SERVICES_ENDPOINT!,
};
