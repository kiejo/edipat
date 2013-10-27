function get_type(el) {
	var toClass = {}.toString;
	var re = /\[object ([A-z]+)\]/;
	return re.exec(toClass.call(el))[1];
}

function merge(obj1,obj2){ // Our merge function
    var result = {}; // return result
    for(i in obj1){      // for every property in obj1 
        if((i in obj2) && (get_type(obj1[i]) === "Object") && (i !== null)){
            result[i] = merge(obj1[i],obj2[i]); // if it's an object, merge   
        }else{
           result[i] = obj1[i]; // add it to result
        }
    }
    for(i in obj2){      // for every property in obj1 
        if((get_type(obj2[i]) === "Object") && (i !== null)){
            result[i] = merge(result[i],obj2[i]); // if it's an object, merge   
        }else{
           result[i] = obj2[i]; // add it to result
        }
    }
    return result;
}