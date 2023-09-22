// development
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "sepcms",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// production
// module.exports = {
//   HOST: "containers-us-west-136.railway.app",
//   USER: "root",
//   PASSWORD: "eDOw7SFJUAOa13F5UDpq",
//   DB: "railway",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
