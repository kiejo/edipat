function gen_atom_name() { 

return {t: "atom", name: "", active: "t"};
};
function gen_arg() { 

return {t: "arg", active: "t"};
};
function gen_def_var() { 

return {t: "def_var", name: gen_atom_name(), body: {}};
};
function gen_def_fn() { 

return {t: "def_fn", name: gen_atom_name(), args: [], body: {}};
};
function gen_call_fn() { 

return {t: "call_fn", name: gen_atom_name(), args: [gen_arg()], active: "f"};
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
				if (typeof el_to_match.args[0] != 'undefined') {
					var first = el_to_match.args[0];
					var rest = el_to_match.args.slice(1);
					return {args: cons(activate(first), rest)};

				}
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
				if (typeof el_to_match.args[0] != 'undefined') {
					var first = el_to_match.args[0];
					var rest = el_to_match.args.slice(1);
					return {args: cons(activate(first), rest)};

				}
			}
		}
	}})();

	}})());
};
function update_ast(ast, keycode) { 

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
	return merge(ast, {active: "f", els: map((function(__partial_arg_0) { return update_ast(__partial_arg_0, keycode)}), elements)});
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
			if ("arg" == el_to_match.t) {
				if ('expr' in el_to_match) {
					if (get_type(el_to_match.expr) == 'Object') {
						if ('t' in el_to_match.expr) {
							if ("atom" == el_to_match.expr.t) {
								if ('name' in el_to_match.expr) {
									var name = el_to_match.expr.name;
									if ('active' in el_to_match.expr) {
										if ("t" == el_to_match.expr.active) {
											return (function() { 
	var el_to_match = keycode;
	if (8 == el_to_match) {
		return (function() { 
if ((function(a,b) { return a == b; })(name.length, 1)) { 
return [];} else { 
return merge(ast, {expr: {name: init(name)}});}})();

	}

	if (32 == el_to_match) {
		return [merge(ast, {expr: {active: "f"}}), activate(gen_arg())];

	}

	var kc = el_to_match;
	return merge(ast, {expr: {name: (function(a,b) { return a + b; })(name, to_char(kc))}});
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
				return merge(ast, {body: update_ast(body, keycode)});

			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("call_fn" == el_to_match.t) {
				if ('args' in el_to_match) {
					var args = el_to_match.args;
					return merge(ast, {args: flatten((function() { 
	var el_to_match = map((function(__partial_arg_0) { return process_arg(__partial_arg_0, keycode)}), args);
	if (get_type(el_to_match) == 'Array') {
		if (0 == el_to_match.length) {
			return [gen_arg()];

		}
	}

	var as = el_to_match;
	return (function() { 
if ((function(a,b) { return a == b; })(last(as), [])) { 
return concat(init(init(as)), activate(last(init(as))));} else { 
return as;}})();
})())});

				}
			}
		}
	}

	return ast;
})();
};
function process_arg(arg, keycode) { 

return (function() { 
	var el_to_match = arg;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("arg" == el_to_match.t) {
				if ('expr' in el_to_match) {
					var expr = el_to_match.expr;
					return (function() { 
	var el_to_match = keycode;
	if (65 == el_to_match) {
		return merge(deactivate(arg), {expr: gen_atom_name()});

	}})();

				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("arg" == el_to_match.t) {
				if ('expr' in el_to_match) {
					if (get_type(el_to_match.expr) == 'Object') {
						if ('t' in el_to_match.expr) {
							return update_ast(arg, keycode);

						}
					}
				}
			}
		}
	}})();
};
;
function update_node(node, kc) { 

return merge(node, (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("List" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							var els = el_to_match.els;
							if ('sel_el' in el_to_match) {
								var el_ind = el_to_match.sel_el;
								return (function() { 
if (any(is_active, els)) { 
return {els: map((function(__partial_arg_0) { return update_node(__partial_arg_0, kc)}), els)};} else { 
return (function() { 
	var el_to_match = kc;
	if (37 == el_to_match) {
		return {sel_el: dec(el_ind)};

	}

	if (39 == el_to_match) {
		return {sel_el: inc(el_ind)};

	}

	if (38 == el_to_match) {
		return {active: "f"};

	}

	if (40 == el_to_match) {
		return {els: activate_nth(el_ind, els)};

	}

	if (32 == el_to_match) {
		return {els: concat(deactivate_all(els), activate(gen_new()))};

	}

	return {};
})();}})();

							}
						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("pending" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						return (function() { 
	var el_to_match = String.fromCharCode(kc);
	if ("q" == el_to_match) {
		return {t: "Str", val: ""};

	}

	if ("[" == el_to_match) {
		return {t: "Arr", els: [activate(gen_new())], sel_el: 0};

	}

	if ("L" == el_to_match) {
		return {t: "List", els: [activate(gen_new())], sel_el: 0};

	}

	if ("{" == el_to_match) {
		return {t: "Obj", els: [activate(gen_new())], sel_el: 0};

	}

	var num = el_to_match;
	return {t: "Num", val: num};


	var c = el_to_match;
	return {t: "Atom", val: c};
})();

					}
				}
			}
		}
	}

	return (function() { 
	var el_to_match = kc;
	if (38 == el_to_match) {
		return {active: "f"};

	}

	return {};
})();
})());
};
function gen_new() { 

return {t: "pending"};
};
function is_active(el) { 

return (function(a,b) { return a == b; })(el.active, "t");
};
function activate_nth(n, els) { 

return (function() { 
	var el_to_match = [n, els];
	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			if (0 == el_to_match[0]) {
				if (typeof el_to_match[1] != 'undefined') {
					if (get_type(el_to_match[1]) == 'Array') {
						if (0 == el_to_match[1].length) {
							return [];

						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			if (0 == el_to_match[0]) {
				if (typeof el_to_match[1] != 'undefined') {
					if (get_type(el_to_match[1]) == 'Array') {
						if (typeof el_to_match[1][0] != 'undefined') {
							var el = el_to_match[1][0];
							var rest = el_to_match[1].slice(1);
							return cons(activate(el), rest);

						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var i = el_to_match[0];
			if (typeof el_to_match[1] != 'undefined') {
				if (get_type(el_to_match[1]) == 'Array') {
					if (typeof el_to_match[1][0] != 'undefined') {
						var el = el_to_match[1][0];
						var rest = el_to_match[1].slice(1);
						return cons(el, activate_nth(dec(i), rest));

					}
				}
			}
		}
	}})();
};
function activate_first(els) { 

return (function() { 
	var el_to_match = els;
	if (get_type(el_to_match) == 'Array') {
		if (0 == el_to_match.length) {
			return els;

		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var el = el_to_match[0];
			var rest = el_to_match.slice(1);
			return cons(merge(el, {active: "t"}), rest);

		}
	}})();
};
function deactivate_all(els) { 

return map((function(__partial_arg_0) { return merge(__partial_arg_0, {active: "f"})}), els);
};
function activate_next(els) { 

return (function() { 
	var el_to_match = els;
	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var x = el_to_match[0];
			if (typeof el_to_match[1] != 'undefined') {
				var y = el_to_match[1];
				var rest = el_to_match.slice(2);
				return (function() { 
if (is_active(y)) { 
return cons(activate(x), cons(deactivate(y), rest));} else { 
return cons(x, cons(y, activate_next(rest)));}})();

			}
		}
	}

	return els;
})();
};
function activate_prev(els) {

return (function() { 
	var el_to_match = els;
	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var x = el_to_match[0];
			if (typeof el_to_match[1] != 'undefined') {
				var y = el_to_match[1];
				var rest = el_to_match.slice(2);
				return (function() { 
if (is_active(x)) { 
return cons(deactivate(x), cons(activate(y), rest));} else { 
return cons(x, cons(y, activate_next(rest)));}})();

			}
		}
	}

	return els;
})();
};
function update_view(ast) { 

return $("#ast").text(jsDump.parse(ast));
};
$(document).ready(function () { 
var ast = {t: "program", els: [], active: "t"}
var nodes = {t: "List", els: [activate(gen_new())], active: "t", sel_el: 0}
update_view(nodes)
return $("#input").keydown(function (e) { 
nodes = update_node(nodes, e.which)
return update_view(nodes);
});
});