interface AppConfig {
  servicesEndpoint: string;
  serviceSecret: string;
}

export const appConfig: AppConfig = {
  servicesEndpoint: process.env.SERVICES_ENDPOINT!,
  serviceSecret: process.env.SERVICE_SECRET!,
};
