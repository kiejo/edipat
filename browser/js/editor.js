;
function gen_root() { 

return {t: "List", els: [gen_pending()], active: "t", sel_el: 0};
};
function gen_pending() { 

return {t: "pending"};
};
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
function is_active_list(el) { 

return (function(a,b) { return a && b; })(like_list(el), is_active(el));
};
function like_list(el) { 

return any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(el, __partial_arg_1)}), ["List", "Arr", "Obj", "Pair"]);
};
function is_num(el) { 

return any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(el, __partial_arg_1)}), map(function (n) { 

return n.toString();
}, range(0, 9)));
};
function contains_active_elem(els) { 

return any(is_active, els);
};
function contains_active_atom(els) { 

return any(function (el) { 

return (function(a,b) { return a && b; })((function(a,b) { return a == b; })(el.t, "Atom"), (function(a,b) { return a == b; })(el.active, "t"));
}, els);
};
function update_node(node, kc) { 

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
									return {els: map((function(__partial_arg_0) { return update_node(__partial_arg_0, kc)}), node.els)};

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
		return {els: activate_nth(el_ind, elems)};

	}

	if (46 == el_to_match) {
		return {els: remove_nth(el_ind, elems), sel_el: (function() { 
if ((function(a,b) { return a == b; })(elems.length, inc(el_ind))) { 
return dec(el_ind);} else { 
return el_ind;}})()};

	}

	if (32 == el_to_match) {
		return {els: concat(deactivate_all(elems), activate(gen_pending())), sel_el: inc(el_ind)};

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
	var el_to_match = String.fromCharCode(kc);
	if ("'" == el_to_match) {
		return {t: "Str", val: ""};

	}

	if ("[" == el_to_match) {
		return {t: "Arr", els: [activate(gen_pending())], sel_el: 0};

	}

	if ("(" == el_to_match) {
		return {t: "List", els: [activate(gen_pending())], sel_el: 0};

	}

	if ("{" == el_to_match) {
		return {t: "Obj", els: [activate(gen_pending())], sel_el: 0};

	}

	if (":" == el_to_match) {
		return {t: "Pair", els: [activate({t: "Atom", val: ""}), gen_pending()], sel_el: 0};

	}

	if (is_num(el_to_match)) {
		return {t: "Num", val: String.fromCharCode(kc)};

	}

	var c = el_to_match;
	return {t: "Atom", val: c};
})();

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
	var el_to_match = [String.fromCharCode(kc), kc];
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (38 == el_to_match[1]) {
				return {active: "f"};

			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if ("'" == el_to_match[0]) {
				return {active: "f"};

			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (8 == el_to_match[1]) {
				return {val: init(value)};

			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			var c = el_to_match[0];
			return {val: (function(a,b) { return a + b; })(value, c)};

		}
	}})();

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
	var el_to_match = [String.fromCharCode(kc), kc];
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (38 == el_to_match[1]) {
				return {active: "f"};

			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (8 == el_to_match[1]) {
				return {val: init(value)};

			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (is_num(el_to_match[0])) {
				return {val: (function(a,b) { return a + b; })(value, String.fromCharCode(kc))};

			}
		}
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
						if ('val' in el_to_match) {
							var value = el_to_match.val;
							return (function() { 
	var el_to_match = [String.fromCharCode(kc), kc];
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (38 == el_to_match[1]) {
				return {active: "f"};

			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (8 == el_to_match[1]) {
				return {val: init(value)};

			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			var c = el_to_match[0];
			return {val: (function(a,b) { return a + b; })(value, c)};

		}
	}})();

						}
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
function update_node_multi(node, keycodes) { 

return foldl(node, update_node, keycodes);
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
					if ('sel_el' in el_to_match) {
						var sel_ind = el_to_match.sel_el;
						if ('active' in el_to_match) {
							var act = el_to_match.active;
							return str(["(", join(" ", map(render, elems)), ")"]);

						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Arr" == el_to_match.t) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					if ('sel_el' in el_to_match) {
						var sel_ind = el_to_match.sel_el;
						return str(["[", join(" ", map(render, elems)), "]"]);

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Obj" == el_to_match.t) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					if ('sel_el' in el_to_match) {
						var sel_ind = el_to_match.sel_el;
						return str(["{ ", join(" ", map(render, elems)), " }"]);

					}
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

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Num" == el_to_match.t) {
				if ('val' in el_to_match) {
					var value = el_to_match.val;
					if ('active' in el_to_match) {
						var act = el_to_match.active;
						return render_active(value, act);

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Str" == el_to_match.t) {
				if ('val' in el_to_match) {
					var value = el_to_match.val;
					if ('active' in el_to_match) {
						var act = el_to_match.active;
						return str(["'", render_active(value, act), "'"]);

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Atom" == el_to_match.t) {
				if ('val' in el_to_match) {
					var value = el_to_match.val;
					if ('active' in el_to_match) {
						var act = el_to_match.active;
						return render_active(value, act);

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("pending" == el_to_match.t) {
				if ('active' in el_to_match) {
					var act = el_to_match.active;
					return render_active("...", act);

				}
			}
		}
	}})();
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
$("#ast").text(jsDump.parse(node))
return $("#rendered").html(render(node));
};
function handle_keydown(handler, key_event) { 

return (function() { 
if (any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(key_event.which, __partial_arg_1)}), [8, 37, 39, 38, 40, 46])) { 
return handler(key_event.which);} else { 
return undefined;}})();
};
function handle_keypress(handler, key_event) { 

return handler(key_event.which);
};
function update(nodes, keycode) { 
root_node = update_node_multi(nodes, [40, 68, 69, 38, 32, 68])
return update_view(root_node);
};
$(document).ready(function () { 
update(root_node, 40)

$("#input").keydown((function(__partial_arg_1) { return handle_keydown((function(__partial_arg_1) { return update(root_node, __partial_arg_1)}), __partial_arg_1)}))
return $("#input").keypress((function(__partial_arg_1) { return handle_keypress((function(__partial_arg_1) { return update(root_node, __partial_arg_1)}), __partial_arg_1)}));
});