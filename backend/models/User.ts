import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  login: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
}, {
  timestamps: true
});

export default model('User', UserSchema);