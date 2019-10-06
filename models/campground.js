const mongoose = require("../config/connection");
const Comment = require("./comment");
const Review = require("./reviews");
//SCHEMA SETUP
var campgroundSchema = mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviews"
  }],
  rating: {
    type: Number,
    default: 0
  }
});
//pre function for campgroundSchema called before we remove a campground
campgroundSchema.pre('remove', async (next)=> {
  try {
    await Comment.deleteOne({
      "_id": {
        $in: this.comments
      }
    });
    next();
  } catch (error) {
    next(error)
  }
});

// Export module
module.exports = mongoose.model('Campground', campgroundSchema);