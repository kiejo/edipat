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
function deactivate_all(els) { 

return map((function(__partial_arg_0) { return merge(__partial_arg_0, {active: "f"})}), els);
};
function update_node(node, kc) { 

return merge(node, (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("List" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							var elems = el_to_match.els;
							if ('sel_el' in el_to_match) {
								var el_ind = el_to_match.sel_el;
								return (function() { 
if (any(is_active, elems)) { 
return {els: map((function(__partial_arg_0) { return update_node(__partial_arg_0, kc)}), elems)};} else { 
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

	if (32 == el_to_match) {
		return {els: concat(deactivate_all(elems), activate(gen_pending())), sel_el: inc(el_ind)};

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
;
var root_node = gen_root();
function update_view(ast) { 

return $("#ast").text(jsDump.parse(ast));
};
function handle_keydown(handler, key_event) { 

return (function() { 
if (any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(key_event.which, __partial_arg_1)}), [37, 39, 38, 40])) { 
return handler(key_event.which);} else { 
return undefined;}})();
};
function handle_keypress(handler, key_event) { 

return handler(key_event.which);
};
function update(nodes, keycode) { 
root_node = update_node(nodes, keycode)
return update_view(root_node);
};
$(document).ready(function () { 
update(root_node, 40)

$("#input").keydown((function(__partial_arg_1) { return handle_keydown((function(__partial_arg_1) { return update(root_node, __partial_arg_1)}), __partial_arg_1)}))
return $("#input").keypress((function(__partial_arg_1) { return handle_keypress((function(__partial_arg_1) { return update(root_node, __partial_arg_1)}), __partial_arg_1)}));
});