;
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
		return {els: concat(deactivate_all(els), activate(gen_pending()))};

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
		return {t: "Arr", els: [activate(gen_pending())], sel_el: 0};

	}

	if ("L" == el_to_match) {
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
function update_view(ast) { 

return $("#ast").text(jsDump.parse(ast));
};
$(document).ready(function () { 
var nodes = {t: "List", els: [activate(gen_pending())], active: "t", sel_el: 0}
update_view(nodes)
return $("#input").keydown(function (e) { 
nodes = update_node(nodes, e.which)
return update_view(nodes);
});
});