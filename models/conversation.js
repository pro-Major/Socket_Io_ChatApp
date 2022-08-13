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
        },
        Private : {
          type : DataTypes.BOOLEAN,
          defaultValue : false          
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
      Conversation.belongsToMany(models.users,{through: 'group_members',as : 'GroupMembers',foreignKey: "ConversationId"});

    }


    return Conversation;
  };
  