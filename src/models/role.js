module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    },
  }, {
    tableName: 'roles',
    paranoid: false,
    timestamp: false,
    underscored: true
  })
  Roles.associate = (models) => {
    Roles.hasMany(models.users, {
      foreignKey: 'role_id'
    })
  }
  return Roles
}