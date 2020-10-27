module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3307,
  "username": "root",
  "password": "docker",
  "database": "testeback",
  "entities": [
    process.env.NODE_ENV==='production' ?
    "./dist/modules/**/typeorm/entities/*.js" :
    "./src/modules/**/typeorm/entities/*.ts"
  ],
  "migrations": [
    process.env.NODE_ENV==='production' ?
    "./dist/shared/infra/database/migrations/*.js" :
    "./src/shared/infra/database/migrations/*.ts"
  ],
  "cli" : {
    "migrationsDir" :
    process.env.NODE_ENV==='production' ?
    "./dist/shared/infra/database/migrations" :
    "./src/shared/infra/database/migrations"
  }
}
