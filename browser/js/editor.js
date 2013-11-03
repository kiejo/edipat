;
function gen_root() { 

return {t: "List", els: [gen_pending("...")], active: "t", sel_el: 0};
};
function gen_type_with_val(type, value) { 

return {t: type, val: value, state: "n", active: "f"};
};
var gen_pending = (function(__partial_arg_1) { return gen_type_with_val("pending", __partial_arg_1)});
var gen_atom = (function(__partial_arg_1) { return gen_type_with_val("Atom", __partial_arg_1)});
var gen_num = (function(__partial_arg_1) { return gen_type_with_val("Num", __partial_arg_1)});
var gen_str = (function(__partial_arg_1) { return gen_type_with_val("Str", __partial_arg_1)});
function gen_type_with_els(type, els) { 

return {t: type, els: els, sel_el: 0, state: "n", active: "f"};
};
var gen_list = (function(__partial_arg_1) { return gen_type_with_els("List", __partial_arg_1)});
var gen_arr = (function(__partial_arg_1) { return gen_type_with_els("Arr", __partial_arg_1)});
var gen_obj = (function(__partial_arg_1) { return gen_type_with_els("Obj", __partial_arg_1)});
var gen_pair = (function(__partial_arg_1) { return gen_type_with_els("Pair", __partial_arg_1)});
;
function activate(node) { 

return merge(node, {active: "t"});
};
function deactivate(node) { 

return merge(node, {active: "f"});
};
function is_active(el) { 

return (function(a,b) { return a == b; })(el.active, "t");
};
function activate_nth(n, els) { 

return (function() { 
	var el_to_match = [n, els];
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (0 == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Array') {
					if (el_to_match[1].length == 0) {
						return [];

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (0 == el_to_match[0]) {
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

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			var i = el_to_match[0];
			if (get_type(el_to_match[1]) == 'Array') {
				if (typeof el_to_match[1][0] != 'undefined') {
					var el = el_to_match[1][0];
					var rest = el_to_match[1].slice(1);
					return cons(el, activate_nth(dec(i), rest));

				}
			}
		}
	}})();
};
function remove_nth(n, els) { 

return (function() { 
	var el_to_match = [n, els];
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (0 == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Array') {
					if (el_to_match[1].length == 0) {
						return [];

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (0 == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Array') {
					if (typeof el_to_match[1][0] != 'undefined') {
						var el = el_to_match[1][0];
						var rest = el_to_match[1].slice(1);
						return rest;

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			var i = el_to_match[0];
			if (get_type(el_to_match[1]) == 'Array') {
				if (typeof el_to_match[1][0] != 'undefined') {
					var el = el_to_match[1][0];
					var rest = el_to_match[1].slice(1);
					return cons(el, remove_nth(dec(i), rest));

				}
			}
		}
	}})();
};
function deactivate_all(els) { 

return map((function(__partial_arg_0) { return merge(__partial_arg_0, {active: "f"})}), els);
};
function like_list(el) { 

return any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(el, __partial_arg_1)}), ["List", "Arr", "Obj", "Pair"]);
};
function contains_active_elem(els) { 

return any(is_active, els);
};
function contains_active_type(types, els) { 

return any(function (el) { 

return (function(a,b) { return a && b; })(is_active(el), any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(el.t, __partial_arg_1)}), types));
}, els);
};
function get_triggered_input(node, input) { 

return (function() { 
	var el_to_match = [input, node];
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (" " == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if (like_list(el_to_match[1].t)) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_1) { return contains_active_type(["Atom", "Num"], __partial_arg_1)}))(el_to_match[1].els)) {
											return ["uarr", " "];

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

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if ("'" == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if (like_list(el_to_match[1].t)) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_1) { return contains_active_type(["Str"], __partial_arg_1)}))(el_to_match[1].els)) {
											return ["uarr", " "];

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

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if ("larr" == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if (like_list(el_to_match[1].t)) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_1) { return contains_active_type(["Atom", "Num", "Str", "pending"], __partial_arg_1)}))(el_to_match[1].els)) {
											return ["uarr", "larr", "darr"];

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

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if ("rarr" == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if (like_list(el_to_match[1].t)) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_1) { return contains_active_type(["Atom", "Num", "Str", "pending"], __partial_arg_1)}))(el_to_match[1].els)) {
											return ["uarr", "rarr", "darr"];

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

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if ("del" == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if (like_list(el_to_match[1].t)) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_1) { return contains_active_type(["Atom", "Num", "Str", "pending"], __partial_arg_1)}))(el_to_match[1].els)) {
											return ["uarr", "del", "darr"];

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

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (get_type(el_to_match[1]) == 'Object') {
				if ('t' in el_to_match[1]) {
					if (like_list(el_to_match[1].t)) {
						if ('active' in el_to_match[1]) {
							if ("t" == el_to_match[1].active) {
								if ('els' in el_to_match[1]) {
									if (contains_active_elem(el_to_match[1].els)) {
										if ('sel_el' in el_to_match[1]) {
											var el_ind = el_to_match[1].sel_el;
											return get_triggered_input(node.els[el_ind], input);

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

	return [input];
})();
};
function update_node(node, input) { 

return merge(node, (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if (like_list(el_to_match.t)) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							if (contains_active_elem(el_to_match.els)) {
								if ('sel_el' in el_to_match) {
									var el_ind = el_to_match.sel_el;
									return {els: map((function(__partial_arg_0) { return update_node(__partial_arg_0, input)}), node.els)};

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
			if (like_list(el_to_match.t)) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							var elems = el_to_match.els;
							if ('sel_el' in el_to_match) {
								var el_ind = el_to_match.sel_el;
								return (function() { 
	var el_to_match = input;
	if ("larr" == el_to_match) {
		return {sel_el: dec(el_ind)};

	}

	if ("rarr" == el_to_match) {
		return {sel_el: inc(el_ind)};

	}

	if ("uarr" == el_to_match) {
		return {active: "f"};

	}

	if ("darr" == el_to_match) {
		return {els: activate_nth(el_ind, elems)};

	}

	if ("del" == el_to_match) {
		return {els: remove_nth(el_ind, elems), sel_el: (function() { 
if ((function(a,b) { return a == b; })(elems.length, inc(el_ind))) { 
return dec(el_ind);} else { 
return el_ind;}})()};

	}

	if (" " == el_to_match) {
		return {els: insert_at(inc(el_ind), activate(gen_pending("...")), deactivate_all(elems)), sel_el: inc(el_ind)};

	}

	return {};
})();

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
	var el_to_match = input;
	if ("uarr" == el_to_match) {
		return {active: "f"};

	}

	if ("'" == el_to_match) {
		return activate(gen_str(""));

	}

	if ("[" == el_to_match) {
		return activate(gen_arr([activate(gen_pending("el"))]));

	}

	if ("(" == el_to_match) {
		return activate(gen_list([activate(gen_pending("el"))]));

	}

	if ("{" == el_to_match) {
		return activate(gen_obj([activate(gen_pending("el"))]));

	}

	if (":" == el_to_match) {
		return activate(gen_obj([activate(gen_atom("")), gen_pending("el")]));

	}

	if (is_num(el_to_match)) {
		return activate(gen_num(input));

	}

	if (is_atom(el_to_match)) {
		return activate(gen_atom(input));

	}})();

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Str" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('val' in el_to_match) {
							var value = el_to_match.val;
							return (function() { 
	var el_to_match = input;
	if ("uarr" == el_to_match) {
		return {active: "f"};

	}

	if ("'" == el_to_match) {
		return {active: "f"};

	}

	if ("bs" == el_to_match) {
		return {val: init(value)};

	}

	var c = el_to_match;
	return {val: (function(a,b) { return a + b; })(value, c)};
})();

						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Num" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('val' in el_to_match) {
							var value = el_to_match.val;
							return (function() { 
	var el_to_match = input;
	if ("uarr" == el_to_match) {
		return {active: "f"};

	}

	if ("bs" == el_to_match) {
		return {val: init(value)};

	}

	if (is_num(el_to_match)) {
		return {val: (function(a,b) { return a + b; })(value, input)};

	}})();

						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Atom" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('state' in el_to_match) {
							if ("pending" == el_to_match.state) {
								return (function() { 
	var el_to_match = input;
	if ("uarr" == el_to_match) {
		return {active: "f"};

	}

	if (is_atom(el_to_match)) {
		return {val: input, state: "n"};

	}})();

							}
						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Atom" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('val' in el_to_match) {
							var value = el_to_match.val;
							return (function() { 
	var el_to_match = input;
	if ("uarr" == el_to_match) {
		return {active: "f"};

	}

	if ("bs" == el_to_match) {
		return {val: init(value)};

	}

	if (is_atom(el_to_match)) {
		return {val: (function(a,b) { return a + b; })(value, input)};

	}})();

						}
					}
				}
			}
		}
	}

	return {};
})());
};
function update_node_multi(node, keycodes) { 

return foldl(node, update_node, keycodes);
};
function state_pending(el) { 

return merge(el, {state: "pending"});
};
function is_state_pending(el) { 

return (function(a,b) { return a == b; })(el.state, "pending");
};
function post_triggers(node) { 

return merge(node, (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("List" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							if (get_type(el_to_match.els) == 'Array') {
								if (typeof el_to_match.els[0] != 'undefined') {
									if (get_type(el_to_match.els[0]) == 'Object') {
										if ('t' in el_to_match.els[0]) {
											if ("Atom" == el_to_match.els[0].t) {
												if ('val' in el_to_match.els[0]) {
													var fn_name = el_to_match.els[0].val;
													if ('active' in el_to_match.els[0]) {
														if ("t" == el_to_match.els[0].active) {
															if (((function(__partial_arg_1) { return all((function(__partial_arg_0) { return is_state_pending(__partial_arg_0)}), __partial_arg_1)}))(el_to_match.els.slice(1))) {
																return (function() { 
	var el_to_match = get_form(fn_name, special_forms);
	if (get_type(el_to_match) == 'Object') {
		if ('gen' in el_to_match) {
			var items = el_to_match.gen;
			return {els: cons(head(node.els), map((function(__partial_arg_0) { return state_pending(__partial_arg_0)}), items))};

		}
	}

	return {els: [head(node.els)]};
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
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if (like_list(el_to_match.t)) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							if (contains_active_elem(el_to_match.els)) {
								return {els: map((function(__partial_arg_0) { return post_triggers(__partial_arg_0)}), node.els)};

							}
						}
					}
				}
			}
		}
	}

	return {};
})());
};
;
var special_forms = [{name: "def", gen: [gen_atom("name"), gen_pending("value")]}, {name: "set", gen: [gen_atom("name"), gen_pending("value")]}, {name: "defn", gen: [gen_atom("name"), gen_atom("arg1"), gen_pending("body")]}, {name: "fn", gen: [gen_atom("arg1"), gen_pending("body")]}, {name: "if", gen: [gen_pending("cond"), gen_pending("else"), gen_pending("else")]}, {name: "nth", gen: [gen_pending("index"), gen_pending("array")]}, {name: "match", gen: [gen_pending("value"), gen_list([gen_pending("patt"), gen_pending("expr")])]}];
function get_form(name, forms) { 

return find(function (form) { 

return (function() { 
	var el_to_match = form;
	if (get_type(el_to_match) == 'Object') {
		if ('name' in el_to_match) {
			if (((function(__partial_arg_1) { return (function(a,b) { return a == b; })(name, __partial_arg_1)}))(el_to_match.name)) {
				return true;

			}
		}
	}

	return false;
})();
}, forms);
};
;
function render(node) { 

return (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("List" == el_to_match.t) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					return str(["(", join(" ", map(render, elems)), ")"]);

				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Arr" == el_to_match.t) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					return str(["[", join(" ", map(render, elems)), "]"]);

				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Obj" == el_to_match.t) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					return str(["{ ", join(" ", map(render, elems)), " }"]);

				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Pair" == el_to_match.t) {
				if ('els' in el_to_match) {
					if (get_type(el_to_match.els) == 'Array') {
						if (el_to_match.els.length == 2) {
							var k = el_to_match.els[0];
							var v = el_to_match.els[1];
							return str([render(k), ": ", render(v)]);

						}
					}
				}
			}
		}
	}

	var el = el_to_match;
	return render_primitive(el);
})();
};
function get_classes(prim) { 

return (function() { 
	var el_to_match = prim;
	if (get_type(el_to_match) == 'Object') {
		if ('active' in el_to_match) {
			var act = el_to_match.active;
			if ('state' in el_to_match) {
				var st = el_to_match.state;
				return [str(["act_", act]), str(["st_", st])];

			}
		}
	}

	return [];
})();
};
function render_primitive(prim) { 

return wrap_span(prim.val, join(" ", get_classes(prim)));
};
function render_active(s, is_active) { 

return (function() { 
if ((function(a,b) { return a == b; })(is_active, "t")) { 
return wrap_span(s, "active");} else { 
return s;}})();
};
function wrap_span(cont, cl) { 

return str(["<span class='", cl, "'>", cont, "</span>"]);
};
;
var root_node = gen_root();
function update_view(node) { 

return (function() { 
$("#ast").text(jsDump.parse(node));
return $("#rendered").html(render(node));
})();
};
function update(node, input) { 

return (function() { 
root_node = post_triggers(update_node_multi(node, get_triggered_input(node, input)));
return update_view(root_node);
})();
};
;
var special_input = [[8, "bs"], [37, "larr"], [38, "uarr"], [39, "rarr"], [9, "rarr"], [40, "darr"], [46, "del"]];
function is_num(input) { 

return any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(input, __partial_arg_1)}), map(function (n) { 

return n.toString();
}, range(0, 9)));
};
function is_atom(input) { 

return !(any(function (pair) { 

return (function() { 
	var el_to_match = pair;
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			var s = el_to_match[1];
			return (function(a,b) { return a == b; })(s, input);

		}
	}})();
}, special_input));
};
;
function handle_keydown(handler, key_event) { 

return (function() { 
	var el_to_match = kd_keycode_to_s(special_input, key_event.which);
	if ("not_matched" == el_to_match) {
		return undefined;

	}

	var s = el_to_match;
	return handler(s);
})();
};
function kd_keycode_to_s(pairs, kc) { 

return (function() { 
	var el_to_match = find(function (pair) { 

return (function() { 
	var el_to_match = pair;
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			var code = el_to_match[0];
			var s = el_to_match[1];
			return (function(a,b) { return a == b; })(code, kc);

		}
	}})();
}, pairs);
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			var s = el_to_match[1];
			return s;

		}
	}

	return "not_matched";
})();
};
function handle_keypress(handler, key_event) { 

return handler(String.fromCharCode(key_event.which));
};
$(document).ready(function () { 

return (function() { 
update(root_node, "darr");
;
$("#input").keydown((function(__partial_arg_1) { return handle_keydown((function(__partial_arg_1) { return update(root_node, __partial_arg_1)}), __partial_arg_1)}));
return $("#input").keypress((function(__partial_arg_1) { return handle_keypress((function(__partial_arg_1) { return update(root_node, __partial_arg_1)}), __partial_arg_1)}));
})();
});