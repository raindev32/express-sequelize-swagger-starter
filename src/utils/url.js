import project from '../../config/project.config'

const getImageUrl = (route) => {
  return {
    url: route ? `${project.image_url}${route || ''}` : null,
    raw: route
  }
}

const getImageUrlMultiple = (data) => {
  if (data && typeof data === 'object') {
    return data.map(item => getImageUrl(item))
  }
  if (data && typeof data === 'string') {
    return [getImageUrl(data)]
  }
  return []
}

export {
  getImageUrl,
  getImageUrlMultiple
}
