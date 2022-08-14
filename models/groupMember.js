module.exports = (sequelize,DataTypes)=>{
    const GroupMembers = sequelize.define("group_members",
    {   
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement : true,
        },
        ContactId  : {
            type : DataTypes.INTEGER,
            notnull : true,
        },
        ConversationId : {
            type : DataTypes.INTEGER,
            notnull : true,
        },
        JoinedDateTime : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        },
        LeftDateTime : { 
            type : DataTypes.DATE,
        }
    },
      {
        freezeTableName: true,
        tableName: "group_members",
        timestamps: true,
        paranoid: true,
      }
    );

    return GroupMembers;
  };
  