var builtin_bin_ops = [ '+', '-', '*', '/', '%', '==', '!=', '>', '>=', '<', '<=', '&&', '||' ];


String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}

function comp_function(els, name) {
	var args = _.map(_.initial(els), function(e) { return e.name; });

	var fn_exprs;
	if (_.last(els).type != 'List' || _.last(els).elements[0].type != 'List') {
		fn_exprs = [ _.last(els) ];
	} else {
		fn_exprs = _.last(els).elements;
	}

	var fn_stmts = _.map(_.initial(fn_exprs), comp_expr);

	return "function " + name + "(" + args.join(", ") + ") { \n" + fn_stmts.join("\n") + "\nreturn " + comp_expr(_.last(fn_exprs)) + ";\n}";
}

function comp_if(els) {
	return "(function() { \n" + 
			       		"if (" + comp_expr(els[1]) + ") { \n" +
			       			"return " + comp_expr(els[2]) + ";" +
			       		"} else { \n" +
			       			"return " + comp_expr(els[3]) + ";" +
			       		"}" +
			       	"})()";
}

function comp_match(els) {
	var el = _.head(els);
	var patt_expr_pairs = _.tail(els);

	var el_var_name = 'el_to_match';
	var el_declaration = [{type: 'Decl', name: el_var_name, value: comp_expr(el)}]; //evaluate expression to match

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
	patt_infos.push({type: 'Expr', expr: comp_expr(expr)});

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
		case "Number": return [{type: 'Cond', cond: comp_expr(patt) + " == " + comp_el}];
		case "String": return [{type: 'Cond', cond: comp_expr(patt) + " == " + comp_el}];
		case "List":
			if (patt.elements.length > 1) {
				return [{type: 'Cond', cond: comp_expr({ type: "List", elements: [patt, { type: "Atom", name: comp_el }] }) }];
			} else {
				return [{type: 'Cond', cond: comp_expr({ type: "List", elements: patt.elements.concat({ type: "Atom", name: comp_el }) }) }];
			}
		case "Array":
			var res = [{type: 'Cond', cond: 'get_type(' + comp_el + ") == 'Array'"}];

			var match_rest = _.find(patt.elements, function(el) { return el.type == 'Atom' && el.name == '&'; });
			if (!match_rest) { //match length
				res.push({type: 'Cond', cond: comp_el + ".length == " + patt.elements.length});
			} 

			for (var i = 0; i < patt.elements.length; i++) {
				if (patt.elements[i].type == 'Atom' && patt.elements[i].name == '&') {  //match the rest of the array against the next patt in the pattern
					res.push(gen_patt_info(patt.elements[i + 1], el, el_accessor + '.slice(' + i + ')'));
					break;
				}

				var new_accessor = el_accessor + '[' + i + ']';
				if (match_rest) { //array length hasn't been tested
					res.push({type: 'Cond', cond: "typeof " + el + new_accessor + " != 'undefined'"});	
				}
				res.push(gen_patt_info(patt.elements[i], el, new_accessor));
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
	if (els[0].type == 'Atom' || els[0].type == 'List') {
		var op = els[0].name || "";

		if (op == "def")
		{
			return "var " + els[1].name + " = " + comp_expr(els[2])
		}
		if (op == "set")
		{
			return els[1].name + " = " + comp_expr(els[2])
		}
		else if (op == "fn")
		{
			return comp_function(_.tail(els), "");
		}
		else if (op == "defn")
		{
			return comp_function(_.tail(_.tail(els)), comp_expr(els[1]));	
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
				return comp_expr(els[1]) + "." + op.substr(1);
			}
		}
		else if (op.indexOf('.') == 0) //method invocation on object
		{
			var fn_atom = { type: "Atom", name: comp_expr(els[1]) + '.' + op.substr(1) };
			var fn_call = { type: "List", elements: [fn_atom].concat(_.drop(els, 2)) };

			return comp_expr(fn_call);
			
		}
		else if (op == "nth") //array access
		{
			return comp_expr(els[2]) + "[" + comp_expr(els[1]) + "]";
		}
		else if (op == "do") {
			//treat as sequential operations, return last statement
			return "(function() { \n" + 
						_.map(_.initial(_.tail(els)), comp_expr).join(";\n") + ";\n" + "return " + comp_expr(_.last(els)) + ";\n" +
		       		"})()"
		}
		else //treat as function call or partial function call
		{
			var partial_arg_prefix = '__partial_arg_';

			function compile_arg(arg, i) {
				return arg.type == 'Atom' && arg.name == '_' ? partial_arg_prefix + i : comp_expr(arg);
			}

			var fn_name = els[0].type == 'List' ? '(' + comp_expr(els[0]) + ')' : comp_expr(els[0]);
			var compiled_args = _.map(_.tail(els), compile_arg);
			var compiled_fn_call = fn_name + "(" + compiled_args.join(", ") + ")";

			var partial_args = _.filter(compiled_args, function(arg) { return (typeof arg == 'string') && arg.indexOf(partial_arg_prefix) == 0; });

			if (partial_args.length == 0) { //generate normal function call
				return compiled_fn_call;
			}
			else { //generate partial function
				return "(function(" + partial_args.join(", ") + ") { return " + compiled_fn_call + "})";
			}
		}

	}

	throw "expected atom or list. Got " + els[0].type + " instead.";
}

function comp_expr(expr) {
	switch(expr.type) {
		case 'Program':
			return _.map(expr.body, comp_expr).join(";\n") + ";"
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
			return "[" + _.map(expr.elements, comp_expr).join(", ") + "]";
		case 'Object':
			return "{" + _.map(expr.elements, function(pair) { return pair.key + ": " + comp_expr(pair.value); }).join(", ") + "}";
	}
}

function buildParseErrorMessage(e) {
	return e.line !== undefined && e.column !== undefined
	      ? "Line " + e.line + ", column " + e.column + ":\n" + e.message
	      : e.message;
}

function compile(grammar, source) {
	try {
		var parser = PEG.buildParser(grammar);
	} catch (e) {
		return "parser initialization failed: " + e.message;
	}

	try {
		var parsed = parser.parse(source);
	} catch(e) {
		return "parse error: " + buildParseErrorMessage(e);
	}

	try {
		var compiled = comp_expr(parsed);
		return compiled;
	} catch(e) {
		return "compilation error: " + e.message;
	}
}