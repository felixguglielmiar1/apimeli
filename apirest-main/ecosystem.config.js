module.exports = {
  apps : [{
    name: 'server',
    script: './server.js',
    instances:1,
    watch: true,
    autorestart: true
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }]

};
