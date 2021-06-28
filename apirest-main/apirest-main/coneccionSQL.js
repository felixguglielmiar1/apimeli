const config=require('./milddleware/config').config
const rest = new (require('rest-mssql-nodejs'))({
  user: config.user,
  password: config.password,
  server: config.server, 
  database: config.database,
  options: { 
      encrypt: true 
  } 
})

module.exports={rest}