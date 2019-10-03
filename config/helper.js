function removeComment(arr, id){
    const newArray = [];
    for(const element of arr){
        if(!element._id.equals(id)){
            newArray.push(element);
        }
    }
    return newArray;
}
module.exports = removeComment;