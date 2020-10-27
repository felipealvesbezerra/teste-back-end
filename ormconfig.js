module.exports = {
  "type": "mysql",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
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
