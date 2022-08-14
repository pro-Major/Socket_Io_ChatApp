const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    { 
      ContactId : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
    },
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
        allowNull : false,
      },
      Password: {
        type: DataTypes.STRING,
        unique : true,
        allowNull : false,
      },
      UniqueId: {
        type: DataTypes.STRING,
        allowNull : false,
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
  // console.log(`models`,models)

  Users.associate = function (models) {
  console.log(`models`,models)
    Users.belongsToMany(models.conversation, { through: 'group_members', as : 'Conversation' ,foreignKey: 'ContactId'});
  };


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
