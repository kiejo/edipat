/*
The compiler generates Javascript which depends on some of these functions.
*/

// used by pattern matching
function get_type(el) {
	var toClass = {}.toString;
	var re = /\[object ([A-z]+)\]/;
	return re.exec(toClass.call(el))[1];
}

// used by editor
// returns merge result of two objects, supports nested objects
function merge(obj1, obj2) {
    var result = {};

    for(i in obj1) {
        if((i in obj2) && (get_type(obj1[i]) === "Object") && (i !== null)) {
            result[i] = merge(obj1[i], obj2[i]); // if it's an object, merge   
        } else {
           result[i] = obj1[i]; // add it to result
        }
    }

    for(i in obj2) {
        if((get_type(obj2[i]) === "Object") && (i !== null)) {
            result[i] = merge(result[i], obj2[i]); // if it's an object, merge   
        }else{
           result[i] = obj2[i]; // add it to result
        }
    }

    return result;
}