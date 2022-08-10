const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      FirstName: {
        type: DataTypes.STRING,
      },
      LastName: {
        type: DataTypes.STRING,
      },
      ProfilePhoto: {
        type: DataTypes.TEXT,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
      },
      UniqueId: {
        type: DataTypes.STRING,
      },
      Status: {
        type: DataTypes.BOOLEAN,
      },
      LastLogin: {
        type: DataTypes.DATE,
      },
      RememberToken: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
      tableName: "users",
      timestamps: true,
      paranoid: true,
    }
  );
  // INSTANCE METHOD FOR COMPARING PASSWORD
  Users.prototype.comparePassword = function (passw) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(passw, this.Password, function (err, isMatch) {
        if (err) {
          return reject(err);
      }
        return resolve(isMatch);
      });
    });
  };

  return Users;
};
