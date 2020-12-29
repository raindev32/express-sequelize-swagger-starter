import sequelize from '../../native/sequelize'

export const getCurrentTime = async () => {
  const currentTime = await sequelize.query('select current_timestamp() as time', {
    type: sequelize.QueryTypes.SELECT
  })
  if (currentTime[0]) return currentTime[0].time
}
