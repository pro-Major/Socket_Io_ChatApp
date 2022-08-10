module.exports = (sequelize,DataTypes)=>{
    const Conversation = sequelize.define("conversation",
    {
        ConversationId : {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true,
        },
        ConversationName : {
            type : DataTypes.STRING,
            allownull : false,
        }

    },
      {
        freezeTableName: true,
        tableName: "conversation",
        timestamps: true,
        paranoid: true,
      }
    );
    return Conversation;
  };
  