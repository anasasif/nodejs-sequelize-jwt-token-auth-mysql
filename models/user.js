module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define("user", {

    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_login: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });
  return User;
};