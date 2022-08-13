module.exports = (sequelize,DataTypes)=>{
    const Conversation = sequelize.define("conversation",
    {
        ConversationId : {
            type : DataTypes.UUID,
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
    
    Conversation.associate = function (models){
      console.log(models);
      Conversation.hasMany(models.message,{foreignKey: "ConversationId", as : "conversationDetails"});
      Conversation.belongsToMany(models.users,{through: models.group_members,foreignKey: 'ConversationId'});

    }


    return Conversation;
  };
  