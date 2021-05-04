const pippo = {

  http: {
    baseUrl: 'https://api.multimmobiliare.com/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    defaults: {
      app: 'prod',
    },
    jwt: {
      key: {
        token: 'X-Fideconto-JWT',
        refresh_token: 'X-Fideconto-Refresh-JWT',
      },
      header: {
        token: 'x-fideconto-jwt',
        refresh_token: 'x-fideconto-refresh-jwt',
      },
    },
  },
  validation: {
    measure: {
      min: 1,
      max: 1e10,
    },
  },
  tables: {
    pagination: {
      sizes: [10, 20, 50, 100],
      size: 10,
    },
  },
  app: {
    name: 'Fideconto',
    storage: {
      key: 'admin-fideconto-storage',
      version: 'v1.6',
    },
  },

};
