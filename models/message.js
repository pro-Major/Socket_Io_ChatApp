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
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "message",
      timestamps: true,
      paranoid: true,
    }
  );
  return Message;
};
