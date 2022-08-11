const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const TempUser = sequelize.define(
    "tempUser",
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
      MobileNumber: {
        type: DataTypes.STRING,
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
      tableName: "temp_user",
      timestamps: true,
    }
  );
  // INSTANCE METHOD FOR COMPARING PASSWORD
  TempUser.prototype.comparePassword = function (passw) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(passw, this.Password, function (err, isMatch) {
        if (err) {
          return reject(err);
      }
        return resolve(isMatch);
      });
    });
  };

  return TempUser;
};
