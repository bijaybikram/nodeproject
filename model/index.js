const seedAdmin = require("../adminSeeder.js");
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  // port: 7295,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("CONNECTED!!");
    // check if there exist an admin or not
    seedAdmin(db.users);
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blogs = require("./blogModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);

//relationships
db.users.hasMany(db.blogs);
db.blogs.belongsTo(db.users);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;
