// development
// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "",
//   DB: "sepcms",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

// production on filess.io
// module.exports = {
//   HOST: "o2r.h.filess.io",
//   USER: "blogspot_shutwonder",
//   PASSWORD: "4a52e3d5a73054bb5c66d6b30340661651617748",
//   DB: "blogspot_shutwonder",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

// Production on railway
module.exports = {
  HOST: "monorail.proxy.rlwy.net",
  USER: "root",
  PASSWORD: "MQKBSeKUdYNNHyGVjUScpcTagYeZxWvm",
  DB: "railway",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
