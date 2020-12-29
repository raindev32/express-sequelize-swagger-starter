import sequelize from '../native/sequelize'
import Sequelize from 'sequelize'

const { Op } = Sequelize

exports.count = ({
  table,
  query,
  where,
  include = [],
  fields
}) => {
  const { q, type, relationship, paranoid = 1, field, order, ...other } = query
  for (let key in other) {
    if (key === 'createdAt'
      || key === 'updatedAt'
      || key === 'deletedAt'
    ) {
      query[key] = { [Op.between]: query[key] }
    } else if (type !== 'all' && query.q) {
      query[key] = { [Op.like]: `%${query[key]}%` }
    }
  }
  let querying = []
  if (query.q) {
    for (let key in fields) {
      const id = Object.assign(fields)[key]
      if (!(id === 'createdBy' || id === 'updatedBy' || id === 'deletedBy' || id === 'createdAt' || id === 'updatedAt' || id === 'deletedAt')) {
        let obj = {}
        obj[id] = { [Op.like]: `%${query.q}%` }
        querying.push(obj)
      }
    }
  }
  if (querying.length > 0) {
    return table.count({
      where: {
        [Op.or]: querying,
        ...where
      },
      paranoid: Number(paranoid) ? Boolean(paranoid) : false,
      include
    })
  }
  return table.count({
    where: {
      ...other,
      ...where
    },
    paranoid: Number(paranoid) ? Boolean(paranoid) : false,
    include
  })
}

exports.paginate = ({
  table,
  fields,
  query = {},
  where,
  include = [],
  pagination
}) => {
  const { q, type, field, paranoid = 1, relationship, order, ...other } = query
  for (let key in query) {
    if (key === 'createdAt' || key === 'updatedAt') {
      query[key] = query[key]
    }
  }
  const { pageSize, page } = pagination
  let querying = []
  if (query.q) {
    for (let key in fields) {
      const id = Object.assign(fields)[key]
      if (!(id === 'createdBy'
        || id === 'updatedBy'
        || id === 'createdAt'
        || id === 'updatedAt'
        || id === 'deletedBy'
        || id === 'deletedAt'
      )) {
        let obj = {}
        obj[id] = { [Op.like]: `%${query.q}%` }
        querying.push(obj)
      }
    }
  }

  if (querying.length > 0) {
    return table.findAndCountAll({
      attributes: fields,
      where: {
        [Op.or]: querying,
        ...other,
        ...where
      },
      include,
      paranoid: Number(paranoid) ? Boolean(paranoid) : false,
      order: order ? sequelize.literal(order) : null,
      limit: parseInt(pageSize || 10, 10),
      offset: parseInt(page - 1 || 0, 0) * parseInt(pageSize || 10, 10)
    })
  }
  return table.findAndCountAll({
    attributes: query.field ? query.field.split(',') : fields,
    where: {
      ...other,
      ...where
    },
    include,
    paranoid: Number(paranoid) ? Boolean(paranoid) : false,
    order: order ? sequelize.literal(order) : null,
    limit: type !== 'all' ? parseInt(pageSize || 10, 10) : null,
    offset: type !== 'all' ? parseInt(page - 1 || 0, 0) * parseInt(pageSize || 10, 10) : null
  })
}
