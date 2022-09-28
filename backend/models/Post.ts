import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  markdown: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  menu: [Schema.Types.Mixed],
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  views: {
    type: Number,
    required: true,
    default: 0
  },
  owner: {
    type: String,
    required: true
  }
});

export default model('Post', PostSchema);