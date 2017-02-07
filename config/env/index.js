import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`); // eslint-disable-line import/no-dynamic-require
const dotenv = require('dotenv').config(); // eslint-disable-line 
config.db = dotenv.parsed.MONGOURL;

const defaults = {
  root: path.join(__dirname, '/..')
};

export default Object.assign(defaults, config);
