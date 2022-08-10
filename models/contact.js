module.exports = (sequelize,DataTypes)=>{
    const Users = sequelize.define("users",
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
        UniqueId : {
            type : DataTypes.STRING,
        },
        status : {
            type : DataTypes.BOOLEAN,
        }
      },
      {
        freezeTableName: true,
        tableName: "users",
        timestamps: true,
        paranoid: true,
      }
    );
    return Users;
  };
  