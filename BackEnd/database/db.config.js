const dbconfig = {
  HOTS: 'vrk7xcrab1wsx4r1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  USER: 'uz6i7f3oaf38hyon',
  PASSWORD: 'q9c1q5ybjgfsb4ql',
  DB: 'i8fusb36ynxj9m7z',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = dbconfig;
