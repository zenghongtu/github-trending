// https://pm2.keymetrics.io/docs/usage/application-declaration/
// # Start all applications
// pm2 start ecosystem.config.js
//
// # Stop all
// pm2 stop ecosystem.config.js
//
// # Restart all
// pm2 restart ecosystem.config.js
//
// # Reload all
// pm2 reload ecosystem.config.js
//
// # Delete all
// pm2 delete ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "github-trending",
      script: "npm",
      automation: false,
      args: "run start",
      exec_mode: "fork", // default fork
      instances: 1, //"max",
      kill_timeout: 4000,
      wait_ready: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "256M",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "production",
        PORT: 7668,
      },
    },
  ],
};
