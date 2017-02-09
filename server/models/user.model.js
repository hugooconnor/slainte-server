import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  helpers: [{ type: ObjectId, ref: 'User' }],
  helping: [{ type: ObjectId, ref: 'User' }],
  partners: [{ type: ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics = {
  findByUsername(name, callback) {
    return this.find({ username: new RegExp(name, 'i') }, callback);
  }
};

export default mongoose.model('User', UserSchema);
