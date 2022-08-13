module.exports = (sequelize,DataTypes)=>{
  const Message = sequelize.define("message",
    {
      from: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.TEXT,
      },
      sentDateTime: {
        type: DataTypes.DATE,
        defaultValue : DataTypes.NOW
      },
      ConversationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      tableName: "message",
      timestamps: true,
      paranoid: true,
    }
  );
    Message.associate = function(models){
      Message.belongsTo(models.conversation,{foreignKey: "ConversationId", as : "conversationDetails"});
    }


  return Message;
};
