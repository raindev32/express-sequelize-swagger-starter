/**
 * @typedef ApiMeta
 * @property {string} message
 */
/**
 * @typedef ApiResponse
 * @property {object} success - Success status - eg: true
 * @property {ApiMeta.model} meta - List response property
 * @property {object} data - List data returned
 */
/**
 * @typedef ApiError
 * @property {object} success - Success status - eg: false
 * @property {ApiMeta.model} meta - List response property
 * @property {object} detail - Detail of error returned
 */
