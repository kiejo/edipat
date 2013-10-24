var builtin_bin_ops = [ '+', '-', '*', '/', '%', '==', '!=', '>', '>=', '<', '<=' ];


String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}

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

function comp_if(els) {
	return "(function() { \n" + 
			       		"if (" + compile(els[1]) + ") { \n" +
			       			"return " + compile(els[2]) + ";" +
			       		"} else { \n" +
			       			"return " + compile(els[3]) + ";" +
			       		"}" +
			       	"})()";
}

function comp_match(els) {
	var el = _.head(els);
	var patt_expr_pairs = _.tail(els);

	var el_var_name = 'el_to_match';
	var el_declaration = [{type: 'Decl', name: el_var_name, value: compile(el)}]; //evaluate expression to match

	var comp_patt_matchers = [];
	for (var i = 0; i < patt_expr_pairs.length; i++) {
		//each pair contains a pattern and a corresponding expr to execute if matched successfully
		comp_patt_matchers.push(comp_patt_expr(patt_expr_pairs[i].elements[0], patt_expr_pairs[i].elements[1], el_var_name));
	};

	return "(function() { \n" +
				comp_patt_infos(el_declaration, 1) +
				comp_patt_matchers.join("\n\n") +
	       	"})()";
}

function comp_patt_expr(patt, expr, el_var_name) {
	var patt_infos = gen_patt_info(patt, el_var_name, '');
	patt_infos.push({type: 'Expr', expr: compile(expr)});

	return comp_patt_infos(patt_infos, 1);
}

function comp_patt_infos(patt_infos, lv) {
	if (patt_infos.length == 0) {
		return "";
	}

	var ind = "\t".repeat(lv);
	var patt_i = _.head(patt_infos);
	switch(patt_i.type) {
		case 'Cond': return ind + "if (" + patt_i.cond + ") {\n" + comp_patt_infos(_.tail(patt_infos), lv + 1) + "\n" + ind + "}";
		case 'Decl': return ind + "var " + patt_i.name + " = " + patt_i.value + ";\n" + comp_patt_infos(_.tail(patt_infos), lv);
		case 'Expr': return ind + "return " + patt_i.expr + ";\n" + comp_patt_infos(_.tail(patt_infos), lv + 1);
		case 'Ignore': return comp_patt_infos(_.tail(patt_infos), lv);
	}
}

function gen_patt_info(patt, el, el_accessor) {
	var comp_el = el + el_accessor;

	switch(patt.type) {
		case "Atom":
			if (patt.name == '_') {
				return [{type: 'Ignore'}];
			} else {
				return [{type: 'Decl', name: patt.name, value: comp_el}];
			} 
		case "Number": return [{type: 'Cond', cond: compile(patt) + " == " + comp_el}];
		case "String": return [{type: 'Cond', cond: compile(patt) + " == " + comp_el}];
		case "Array":
			var res = [{type: 'Cond', cond: 'get_type(' + comp_el + ") == 'Array'"}];
			if (patt.elements.length < 1) {
				res.push({type: 'Cond', cond: "0 == " + comp_el + ".length"});
			} else {
				for (var i = 0; i < patt.elements.length; i++) {
					if (patt.elements[i].type == 'Atom' && patt.elements[i].name == '&') {  //bind the rest of the array to the next element in the pattern
						res.push({type: 'Decl', name: patt.elements[i + 1].name, value: comp_el + '.splice(' + i + ')'})
						break;
					}

					res.push(gen_patt_info(patt.elements[i], el, el_accessor + '[' + i + ']'));
				};
			}
			
			return _.flatten(res);
		case 'Object':
			var res = [{type: 'Cond', cond: 'get_type(' + comp_el + ") == 'Object'"}];
			for (var i = 0; i < patt.elements.length; i++) {
				res.push({type: 'Cond', cond: "'" + patt.elements[i].key + "'" + " in " + comp_el});
				res.push(gen_patt_info(patt.elements[i].value, el, el_accessor + '.' + patt.elements[i].key));
			};

			return _.flatten(res);

		default: throw "can't match against type " + patt.type;
	}
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
		else if (op == "if")
		{
			return comp_if(els);
		}
		else if (op == "match")
		{
			return comp_match(_.tail(els));
		}
		else if (op.indexOf('#') == 0) //attribute accessor
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
			
		}
		else if (op == "nth") //array access
		{
			return compile(els[2]) + "[" + compile(els[1]) + "]";
		}
		else //treat as function call
		{
			return compile(els[0]) + "(" + _.map(_.tail(els), compile).join(", ") + ")";
		}

	} else if (els[0].type == 'List') {
		//treat as sequential operations, return last statement
		return "(function() { \n" + 
					_.map(_.initial(els), compile).join(";\n") + ";\n" + "return " + compile(_.last(els)) + ";\n" +
		       "})()"
	}

	throw "expected atom or list. Got " + els[0].type + " instead.";
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
			if (builtin_bin_ops.indexOf(expr.name) > -1) { //translate binop to anonymous function
				return "(" + "function(a,b) { return a " + expr.name + " b; })";
			} else {
				return expr.name;
			}
		case 'Comment':
			return "";
		case 'Array':
			return "[" + _.map(expr.elements, compile).join(", ") + "]";
		case 'Object':
			return "{" + _.map(expr.elements, function(pair) { return pair.key + ": " + compile(pair.value); }).join(", ") + "}";
	}
}