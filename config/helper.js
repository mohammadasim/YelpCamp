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
module.exports = {
    removeComment: removeComment,
    calculateAverage: calculateAverage
}