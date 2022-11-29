export default () => ({
  app: {
    env: process.env.APP_ENV,
    port: process.env.APP_PORT,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
});
