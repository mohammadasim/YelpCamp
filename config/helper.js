function removeComment(arr, id){
    const newArray = [];
    for(const element of arr){
        if(!element._id.equals(id)){
            newArray.push(element);
        }
    }
    return newArray;
}
function calculateAverage(reviews){
    var sum = 0;
    if(reviews.length === 0){
        return sum;
    }
    reviews.forEach(function(element){
       sum +=  element.rating;
    })
    return sum/reviews.length
}
function updateCampgroundRatings(campground){
    return new Promise((resolve,reject)=>{
        campground.populate({
            path: "reviews",
            model: "Review"
        }).executePopulate().then((populatedCampground)=>{
            populatedCampground.rating = calculateAverage(populatedCampground.reviews);
            populatedCampground.save().then((campgroundWithNewRating)=>{
                resolve(campgroundWithNewRating);
            }).catch((err)=>{
                reject(err);
            })
        }).catch((err)=>{
            reject(err);
        })
    });
}
module.exports = {
    removeComment: removeComment,
    calculateAverage: calculateAverage, // This should be removed later
    updateCampgroundRatings: updateCampgroundRatings
}