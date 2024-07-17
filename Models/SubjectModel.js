const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subTopicSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
});

const progressSchema = new Schema({
  date: {
    type: Date,
    
  },
  duration: {
    type: Number,
    
  },
  subTopics: {
    type: [String],
    default: [],
  },
});

const topicSchema = new Schema({
    topic: {
      type: String,
      required: true,
    },
    progress: {
      type: [progressSchema],
      default: [],
    },
  });

const subjectSchema = new Schema({
  subject: {
    type: String,
    required: true,
    unique: true,
  },
  topics: {
    type: [topicSchema],
    default: [],
  },
});

module.exports = mongoose.model('Subject', subjectSchema);
