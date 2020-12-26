import db from '../../models'

const Role = db.roles
const User = db.users

Role.hasMany(User, {
   as: 'user',
   foreignKey: 'role_id',
   sourceKey: 'id'
})

export const getRole = () => {
   return Role.findAll({
      include: {
         model: User,
         attributes: ['id', 'name']
      }
   })
}
export const getRoleById = (id) => {
   return Role.findOne({
      where: {
         id
      }
   })
}
export const dataExists = async (id) => {
   const exists = await getRoleById(id)
   return exists === null ? false : true

}
export const createData = (data) => {
   return Role.create({
      name: data.name,
      code: data.code
   })
}
export const updateData = (id, data) => {
   return Role.update(
      {
         name: data.name,
         code: data.code
      },
      {
         where: {
            id
         }
      }
   )
}
export const deleteData = (id) => {
   return Role.destroy({
      where: {
         id
      }
   })
}