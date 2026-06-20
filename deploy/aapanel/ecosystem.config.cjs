module.exports = {
  apps: [
    {
      name: "cms-admin",
      cwd: "/www/wwwroot/cms.wnskcex.com/admin",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3100,
      },
      autorestart: true,
      max_restarts: 10,
    },
    {
      name: "cms-api",
      cwd: "/www/wwwroot/cms.wnskcex.com/api",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3200,
      },
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
