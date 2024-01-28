import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  createdOn: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const cardMessage = mongoose.model("card", cardSchema);

export default cardMessage;
