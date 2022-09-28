import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  login: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String,
    default: Date.now
  }
}, {
  timestamps: true
});

export default model('User', UserSchema);