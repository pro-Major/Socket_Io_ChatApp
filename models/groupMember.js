module.exports = (sequelize,DataTypes)=>{
    const GroupMembers = sequelize.define("group_members",
    {
        ContactId  : {
            type : DataTypes.INTEGER,
        },
        ConversationId : {
            type : DataTypes.INTEGER,
        },
        JoinedDateTime : {
            type : DataTypes.DATE,
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
  