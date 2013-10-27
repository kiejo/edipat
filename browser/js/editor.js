function update_ast(ast, keycode) { 

return (function() { 
	var el_to_match = keycode;
	var kc = el_to_match;
	return insert_ast(ast, kc);
})();
};
function gen_arg() { 

return {t: "arg", name: {t: "atom", name: ""}};
};
function gen_def_var() { 

return {t: "def_var", name: {t: "atom", name: "", active: "t"}, body: {}};
};
function gen_def_fn() { 

return {t: "def_fn", name: {t: "atom", name: "", active: "t"}, args: [], body: {}};
};
function gen_call_fn() { 

return {t: "call_fn", name: {t: "atom", name: "", active: "t"}, args: [gen_arg()], active: "f"};
};
function gen_body(t) { 

return (function() { 
	var el_to_match = t;
	if ("def_var" == el_to_match) {
		return {t: "", active: "t"};

	}

	if ("call_fn" == el_to_match) {
		return {};

	}})();
};
function to_char(keycode) { 

return String.fromCharCode(keycode);
};
function activate(ast) { 

return merge(ast, {active: "t"});
};
function deactivate(ast) { 

return merge(ast, {active: "f"});
};
function gen_space(type, ast) { 

return merge(merge(ast, {name: {active: "f"}}), (function() { 
	var el_to_match = type;
	if ("def_var" == el_to_match) {
		return {body: {active: "t"}};

	}

	if ("def_fn" == el_to_match) {
		return (function() { 
	var el_to_match = ast;
	if (get_type(el_to_match) == 'Object') {
		if ('args' in el_to_match) {
			if (get_type(el_to_match.args) == 'Array') {
				var first = el_to_match.args[0];
				var rest = el_to_match.args.splice(1);
				return {args: cons(activate(first), rest)};

			}
		}
	}})();

	}

	if ("call_fn" == el_to_match) {
		return (function() { 
	var el_to_match = ast;
	if (get_type(el_to_match) == 'Object') {
		if ('args' in el_to_match) {
			if (get_type(el_to_match.args) == 'Array') {
				var first = el_to_match.args[0];
				var rest = el_to_match.args.splice(1);
				return {args: cons(activate(first), rest)};

			}
		}
	}})();

	}})());
};
function insert_ast(ast, keycode) { 

return (function() { 
	var el_to_match = ast;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("program" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							var elements = el_to_match.els;
							return (function() { 
	var el_to_match = keycode;
	if (65 == el_to_match) {
		return merge(ast, {active: "f", els: cons(gen_def_var(), elements)});

	}})();

						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("program" == el_to_match.t) {
				if ('els' in el_to_match) {
					var elements = el_to_match.els;
					return (function() { 
	var el_to_match = keycode;
	return merge(ast, {active: "f", els: map(function (el) { 

return insert_ast(el, keycode);
}, elements)});
})();

				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			var type = el_to_match.t;
			if ('name' in el_to_match) {
				if (get_type(el_to_match.name) == 'Object') {
					if ('t' in el_to_match.name) {
						if ("atom" == el_to_match.name.t) {
							if ('name' in el_to_match.name) {
								var name = el_to_match.name.name;
								if ('active' in el_to_match.name) {
									if ("t" == el_to_match.name.active) {
										return (function() { 
	var el_to_match = keycode;
	if (8 == el_to_match) {
		return (function() { 
if ((function(a,b) { return a == b; })(name.length, 1)) { 
return {};} else { 
return merge(ast, {name: {name: init(name)}});}})();

	}

	if (32 == el_to_match) {
		return merge(ast, gen_space(type, ast));

	}

	var kc = el_to_match;
	return merge(ast, {name: {name: (function(a,b) { return a + b; })(name, to_char(kc))}});
})();

									}
								}
							}
						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			var type = el_to_match.t;
			if ('body' in el_to_match) {
				if (get_type(el_to_match.body) == 'Object') {
					if ('active' in el_to_match.body) {
						if ("t" == el_to_match.body.active) {
							return (function() { 
	var el_to_match = keycode;
	if (65 == el_to_match) {
		return merge(ast, {body: gen_call_fn()});

	}})();

						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			var type = el_to_match.t;
			if ('body' in el_to_match) {
				var body = el_to_match.body;
				return merge(ast, {body: insert_ast(body, keycode)});

			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("call_fn" == el_to_match.t) {
				if ('args' in el_to_match) {
					var args = el_to_match.args;
					return merge(ast, {args: map(function (el) { 

return (function() { 
if ((function(a,b) { return a && b; })((function(a,b) { return a == b; })(el.active, "t"), (function(a,b) { return a == b; })(el.t, undefined))) { 
return (function() { 
	var el_to_match = keycode;
	if (65 == el_to_match) {
		return gen_arg();

	}})();} else { 
return insert_ast(ast, keycode);}})();
}, args)});

				}
			}
		}
	}

	return ast;
})();
};
function update_view(ast) { 

return $("#ast").text(jsDump.parse(ast));
};
$(document).ready(function () { 
var ast = {t: "program", els: [], active: "t"}
update_view(ast)
return $("#input").keyup(function (e) { 
ast = update_ast(ast, e.which)
return update_view(ast);
});
});