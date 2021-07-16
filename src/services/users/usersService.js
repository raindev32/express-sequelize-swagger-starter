import passport from 'passport'
import db from '../../models'

const User = db.users
const Role = db.roles

User.belongsTo(Role, {
  as: 'roles',
  foreignKey: 'role_id',
  sourceKey: 'role_id'
})

export const requireAuth = passport.authenticate('jwt', { session: false })

export const getDataAllUser = () => {
  return User.findAll()
}

export const getUserById = (id) => {
  return User.findOne({
    include: ['roles'],
    where: {
      id
    }
  })
}

export const createData = (data) => {
  return User.create({
    name: data.name,
    age: data.age,
    role_id: data.role_id,
    photo: data.file.path
  })
}

export const dataExists = async (id) => {
  const exists = await getUserById(id)
  if (exists === null) {
    return false
  }
  return true
}

exports.updateData = (id, data) => {
  return User.update({
    name: data.name,
    age: data.age,
    role_id: data.role_id
  }, {
    where: {
      id
    }
  })
}

exports.deleteData = (id) => {
  return User.destroy({
    where: {
      id
    }
  })
}
