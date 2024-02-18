module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    otp: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    otpGeneratedTime: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return User;
};
