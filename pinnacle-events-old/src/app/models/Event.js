import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  src: {
    type : String,
    required : true
  },
  type : {
    type : String,
    default : 'normal'
  },
  public_id : {
    type : String,
    required : true
  }
});

const EventSchema = new mongoose.Schema({
  title: {
    type : String,
    required : true
  },
  description: {
    type : String,
    required : true
  },
  type: {
    type : String,
    required : true
  },
  client: {
    type : String,
    required : true
  },
  location: {
    type : String,
    required : true
  },
  date: {
    type : Date,
    required : true
  },
  gallery: [ImageSchema]
}, {
  timestamps : true
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;