import Sequelize from 'sequelize'
import project from '../../config/project.config'

const sequelize = new Sequelize(project.db_name, project.db_user, project.db_pass, {
   host: project.db_host,
   port: project.db_port,
   dialect: project.db_dialect,
   dialectOption: {
      collage: 'utf8mb4_generate',
      useUTC: false,
      decimalNumbers: true,
      multipleStatement: true
   },
   timeZone: '+07:00',
   logging: project.db_logging ? JSON.parse(project.db_logging) : false
})

module.exports = sequelize