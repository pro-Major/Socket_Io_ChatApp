module.exports = (sequelize, DataTypes) => {
    const UserOtp = sequelize.define('userOtp', {
        // attributes
        MobileNumber: {
            type: DataTypes.STRING,
        },
        Email : { 
            type : DataTypes.STRING,
        },
        Otp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CreatedTime: {
            type: DataTypes.DATE,
        },
        ExpiryTime :{
            type: DataTypes.DATE,
        },
        IsEmailValidated : {
            type : DataTypes.BOOLEAN,
            defaultValue: false,
        },
        IsMobileValidated : {
            type : DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'user_otp',
        timestamps: false
    });

    return UserOtp;
}