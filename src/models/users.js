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
      age: {
        type: DataTypes.INTEGER(4),
        allowNull: false
      },
      role_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    },
    {
      tableName: 'users',
      paranoid: false,
      timestamp: false
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.roles, {
      foreignKey: 'role_id'
    });
  };
  return User
}
