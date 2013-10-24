function get_type(el) {
	var toClass = {}.toString;
	var re = /\[object ([A-z]+)\]/;
	return re.exec(toClass.call(el))[1];
}