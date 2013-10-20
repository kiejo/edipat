var builtin_arithmetics = [ '+', '-', '*', '/', '%', '==', '!=', '>', '>=', '<', '<=' ];

function comp_function(els, name) {
	var args = _.map(_.initial(els), function(e) { return e.name; });
			
	if (_.last(els).type != 'List')
		throw "compiler error: expected List as functions body.";

	var fn_exprs = _.last(els).elements;
	if (fn_exprs[0].type != 'List') { //only a single statement
		fn_exprs = [ _.last(els) ];
	}

	var fn_stmts = _.map(_.initial(fn_exprs), compile);

	return "function " + name + "(" + args.join(", ") + ") { \n" + fn_stmts.join("\n") + "\nreturn " + compile(_.last(fn_exprs)) + "; \n}";
}

function comp_list(els) {
	if (els[0].type == 'Atom') {
		var op = els[0].name;

		if (op == "def")
		{
			return "var " + els[1].name + " = " + compile(els[2])
		}
		else if (op == "fn")
		{
			return comp_function(_.tail(els), "");
		}
		else if (op == "defn")
		{
			return comp_function(_.tail(_.tail(els)), compile(els[1]));	
		}
		else if (builtin_arithmetics.indexOf(op) > -1)
		{
			return "(" + compile(els[1]) + " " + op + " " + compile(els[2]) + ")";
		}
		else if (op == "if")
		{
			return "(function() { " + 
			       		"if (" + compile(els[1]) + ") { " +
			       			"return " + compile(els[2]) + ";" +
			       		"} else { " +
			       			"return " + compile(els[3]) + ";" + 
			       		"}" +
			       	"})()"
		}
		else if (op.indexOf(':') == 0) //attribute accessor
		{
			if (els.length == 1) {
				return "(function(a) { return a." + op.substr(1) + ";})"
			} else {
				return compile(els[1]) + "." + op.substr(1);
			}
			
		}
		else if (op.indexOf('.') == 0) //method invocation on object
		{
			return compile(els[1]) + "." + op.substr(1) + "(" + _.map(_.drop(els, 2), compile).join(", ") + ")";
			
		} else if (op == "nth") {
			return compile(els[2]) + "[" + compile(els[1]) + "]";
		}

	} else if (els[0].type != 'List') {
		throw "expected atom or list. Got " + els[0].type + " instead.";
	}

	//treat as function call
	return compile(els[0]) + "(" + _.map(_.tail(els), compile).join(", ") + ")";
}

function compile(expr) {
	switch(expr.type) {
		case 'Program':
			return _.map(expr.body, compile).join(";\n") + ";"
		case 'List':
			return comp_list(expr.elements);
		case 'Number':
			return expr.value;
		case 'String':
			return '"' + expr.value + '"';
		case 'Atom':
			return expr.name;
		case 'Comment':
			return "";
		case 'Array':
			return "[" + _.map(expr.elements, compile).join(", ") + "]";
		case 'Object':
			return "{" + _.map(expr.elements, function(pair) { return pair.key + ": " + compile(pair.value); }).join(", ") + "}";
	}
}