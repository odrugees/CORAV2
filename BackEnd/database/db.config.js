const dbconfig = {
  HOTS: "ec2-107-20-104-234.compute-1.amazonaws.com:5432",
  USER: "hwvuumqlrikpfn",
  PASSWORD: "676a8e4043f444be84f39bcfbcd48e4a3f9c82a54eb8f89a7b59e1703192a057",
  DB: "dcgfm523rhg320",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};

module.exports = dbconfig;
