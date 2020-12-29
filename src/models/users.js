module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users',
    {

      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(44),
        allowNull: false
      },
      phone_number: {
        type: DataTypes.STRING(12),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(44),
        allowNull: false
      },
      birth: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.INTEGER(2),
        allowNull: false
      },
      role_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      paranoid: false,
      timestamp: true,
      underscored: true
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.roles, {
      foreignKey: 'role_id'
    });
  };
  return User
}
