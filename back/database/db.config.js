const { Sequelize } = require("sequelize");

const sequelizes = new Sequelize(process.env.DB_NAME, "root", "", {
  host: process.env.DB_HOST,
  dialect: "mysql",
});
try {
  sequelizes.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

sequelizes.sync((error) => {
  console.log("Database Sync Error", error);
});

module.exports = sequelizes;
