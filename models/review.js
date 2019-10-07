const mongoose = require("../config/connection");
const reviewSchema = new mongoose.Schema({
    rating: {
        // Setting the field type
        type: Number,
        required: "Please provide a rating between 1 to 5 stars.",
        min: 1,
        max: 5,
        // Adding validation to see if the entry is an integer
        validate: {
            // validator accepts, a function definition which it uses for validation
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value."
        }
    },
    // review text
    text: {
        type: String
    },
    // author id and username fields
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    campground: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campground"
    }
});
// the following will add createdAt and updatedAt timestamps, check SOF https://stackoverflow.com/questions/12669615/add-created-at-and-updated-at-fields-to-mongoose-schemas
reviewSchema.set('timestamps', true);
module.exports = mongoose.model("Review", reviewSchema);