const { randomBytes } = require('crypto');

module.exports = () => randomBytes(4).toString('HEX');
