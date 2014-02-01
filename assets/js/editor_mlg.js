;
function gen_root() { 

return gen_type_with_els("root", [gen_pending("...")]);
};
function gen_type_with_val(type, value) { 

return {t: type, val: value, state: "n", active: "f", is_defined: "t", in_scope: []};
};
var gen_pending = (function(__partial_arg_1) { return gen_type_with_val("pending", __partial_arg_1)});
var gen_atom = (function(__partial_arg_1) { return gen_type_with_val("Atom", __partial_arg_1)});
var gen_num = (function(__partial_arg_1) { return gen_type_with_val("Num", __partial_arg_1)});
var gen_str = (function(__partial_arg_1) { return gen_type_with_val("Str", __partial_arg_1)});
function gen_type_with_els(type, els) { 

return {t: type, els: els, sel_el: 0, state: "n", active: "f", in_scope: []};
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
function deactivate_all(els) { 

return map((function(__partial_arg_0) { return merge(__partial_arg_0, {active: "f"})}), els);
};
function like_list(el) { 

return any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(el, __partial_arg_1)}), ["root", "List", "Arr", "Obj", "Pair"]);
};
function non_active(els) { 

return all(function (el) { 

return !(is_active(el));
}, els);
};
function contains_active_elem(els) { 

return any(is_active, els);
};
function is_type(types, el) { 

return any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(el.t, __partial_arg_1)}), types);
};
function is_active_type(types, el) { 

return (function(a,b) { return a && b; })(is_active(el), is_type(types, el));
};
function contains_active_type(types, els) { 

return any((function(__partial_arg_1) { return is_active_type(types, __partial_arg_1)}), els);
};
function is_real_active(el) { 

return (function() { 
	var el_to_match = el;
	if (((function(__partial_arg_1) { return is_active_type(["Atom", "Num", "Str", "pending"], __partial_arg_1)}))(el_to_match)) {
		return true;

	}

	if (get_type(el_to_match) == 'Object') {
		if ('active' in el_to_match) {
			if ("t" == el_to_match.active) {
				if ('t' in el_to_match) {
					if (((function(__partial_arg_0) { return like_list(__partial_arg_0)}))(el_to_match.t)) {
						if ('els' in el_to_match) {
							if (non_active(el_to_match.els)) {
								return true;

							}
						}
					}
				}
			}
		}
	}

	return false;
})();
};
function contains_real_active(els) { 

return any((function(__partial_arg_0) { return is_real_active(__partial_arg_0)}), els);
};
function get_triggered_input(node, input) { 

return (function() { 
	var el_to_match = [input, node];
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (" " == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if ("Pair" == el_to_match[1].t) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (get_type(el_to_match[1].els) == 'Array') {
											if (el_to_match[1].els.length == 2) {
												if (((function(__partial_arg_1) { return is_active_type(["Atom"], __partial_arg_1)}))(el_to_match[1].els[0])) {
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
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (" " == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if ("Pair" == el_to_match[1].t) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (get_type(el_to_match[1].els) == 'Array') {
											if (el_to_match[1].els.length == 2) {
												if (((function(__partial_arg_0) { return is_real_active(__partial_arg_0)}))(el_to_match[1].els[1])) {
													return ["uarr", "uarr", " ", ":"];

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

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (")" == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if ("List" == el_to_match[1].t) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_0) { return contains_real_active(__partial_arg_0)}))(el_to_match[1].els)) {
											return ["uarr", "uarr", " "];

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
			if ("ret" == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if (like_list(el_to_match[1].t)) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_1) { return contains_active_type(["Atom", "Num", "Str", "pending", "List"], __partial_arg_1)}))(el_to_match[1].els)) {
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
										if (((function(__partial_arg_0) { return contains_real_active(__partial_arg_0)}))(el_to_match[1].els)) {
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
										if (((function(__partial_arg_0) { return contains_real_active(__partial_arg_0)}))(el_to_match[1].els)) {
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
			if (" " == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if (like_list(el_to_match[1].t)) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_0) { return contains_real_active(__partial_arg_0)}))(el_to_match[1].els)) {
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
										if (get_type(el_to_match[1].els) == 'Array') {
											if (el_to_match[1].els.length == 1) {
												if (((function(__partial_arg_0) { return is_real_active(__partial_arg_0)}))(el_to_match[1].els[0])) {
													return ["uarr", "del"];

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

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if ("del" == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Object') {
					if ('t' in el_to_match[1]) {
						if (like_list(el_to_match[1].t)) {
							if ('active' in el_to_match[1]) {
								if ("t" == el_to_match[1].active) {
									if ('els' in el_to_match[1]) {
										if (((function(__partial_arg_0) { return contains_real_active(__partial_arg_0)}))(el_to_match[1].els)) {
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
		return {sel_el: mod(dec(el_ind), node.els.length)};

	}

	if ("rarr" == el_to_match) {
		return {sel_el: mod(inc(el_ind), node.els.length)};

	}

	if ("uarr" == el_to_match) {
		return (function() { 
if ((function(a,b) { return a == b; })(node.t, "root")) { 
return {};} else { 
return {active: "f"};}})();

	}

	if ("darr" == el_to_match) {
		return {els: (function() { 
if (empty(elems)) { 
return [activate(gen_pending("..."))];} else { 
return activate_nth(el_ind, elems);}})()};

	}

	if ("del" == el_to_match) {
		return {els: remove_nth(el_ind, elems), sel_el: (function() { 
if ((function(a,b) { return a == b; })(elems.length, inc(el_ind))) { 
return max(dec(el_ind), 0);} else { 
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
						if ('val' in el_to_match) {
							var value = el_to_match.val;
							if ('in_scope' in el_to_match) {
								var defs = el_to_match.in_scope;
								return (function() { 
	var el_to_match = input;
	if ("uarr" == el_to_match) {
		return {active: "f"};

	}

	if ("'" == el_to_match) {
		return activate(gen_str(""));

	}

	if ("[" == el_to_match) {
		return activate(gen_arr([activate(gen_pending("..."))]));

	}

	if ("(" == el_to_match) {
		return activate(gen_list([activate(gen_pending("..."))]));

	}

	if ("{" == el_to_match) {
		return activate(gen_obj([activate(gen_pair([make_state_pending(activate(gen_atom("key"))), gen_pending("...")]))]));

	}

	if (":" == el_to_match) {
		return activate(gen_pair([activate(gen_atom("key")), gen_pending("...")]));

	}

	if ("tab" == el_to_match) {
		return activate(gen_atom((function() { 
if (empty(defs)) { 
return value;} else { 
return head(get_completions(node, defs)).name;}})()));

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
							if ('in_scope' in el_to_match) {
								var defs = el_to_match.in_scope;
								return (function() { 
	var el_to_match = input;
	if ("uarr" == el_to_match) {
		return {active: "f"};

	}

	if ("bs" == el_to_match) {
		return (function() { 
if ((function(a,b) { return a == b; })(init(value).length, 0)) { 
return activate(gen_pending("..."));} else { 
return {val: init(value)};}})();

	}

	if ("tab" == el_to_match) {
		return {val: (function() { 
if (empty(defs)) { 
return value;} else { 
return head(get_completions(node, defs)).name;}})()};

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
	}

	return {};
})());
};
function update_node_multi(node, keycodes) { 

return foldl(node, update_node, keycodes);
};
function make_state_pending(el) { 

return merge(el, (function() { 
	var el_to_match = el;
	if (get_type(el_to_match) == 'Object') {
		if ('els' in el_to_match) {
			var elems = el_to_match.els;
			return {state: "pending", els: map((function(__partial_arg_0) { return make_state_pending(__partial_arg_0)}), elems)};

		}
	}

	if (get_type(el_to_match) == 'Object') {
		return {state: "pending"};

	}})());
};
;
function is_state_pending(el) { 

return (function(a,b) { return a == b; })(el.state, "pending");
};
function is_def(el) { 

return (function() { 
	var el_to_match = el;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Atom" == el_to_match.t) {
				if ('val' in el_to_match) {
					if ("def" == el_to_match.val) {
						return true;

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("Atom" == el_to_match.t) {
				if ('val' in el_to_match) {
					if ("defn" == el_to_match.val) {
						return true;

					}
				}
			}
		}
	}

	return false;
})();
};
function get_def(el) { 

return (function() { 
	var el_to_match = el;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("List" == el_to_match.t) {
				if ('els' in el_to_match) {
					if (get_type(el_to_match.els) == 'Array') {
						if (typeof el_to_match.els[0] != 'undefined') {
							if (is_def(el_to_match.els[0])) {
								if (typeof el_to_match.els[1] != 'undefined') {
									if (get_type(el_to_match.els[1]) == 'Object') {
										if ('t' in el_to_match.els[1]) {
											if ("Atom" == el_to_match.els[1].t) {
												if ('val' in el_to_match.els[1]) {
													var name = el_to_match.els[1].val;
													if ('state' in el_to_match.els[1]) {
														if ("n" == el_to_match.els[1].state) {
															var rest = el_to_match.els.slice(2);
															return {name: name, gen: map(function (arg) { 

return gen_pending(arg.val);
}, init(rest))};

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

	return null;
})();
};
function get_defs(els) { 

return filter((function(__partial_arg_1) { return (function(a,b) { return a != b; })(null, __partial_arg_1)}), map(get_def, els));
};
function filter_defs(node, defs) { 

return (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("pending" == el_to_match.t) {
				return defs;

			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('state' in el_to_match) {
			if ("pending" == el_to_match.state) {
				return defs;

			}
		}
	}

	return filter(function (form) { 

return starts_with(node.val, form.name);
}, defs);
})();
};
function get_completions(node) { 

return (function() { 
	var el_to_match = node;
	if (is_real_active(el_to_match)) {
		return filter_defs(node, (function(a,b) { return a || b; })(node.in_scope, []));

	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if (like_list(el_to_match.t)) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							var elems = el_to_match.els;
							if ('sel_el' in el_to_match) {
								var sel_ind = el_to_match.sel_el;
								return get_completions(elems[sel_ind]);

							}
						}
					}
				}
			}
		}
	}

	return [];
})();
};
function check_defs_multi(nodes, defs) { 

return map(function (node) { 

return check_defs(node, concat(defs, get_defs(filter((function(__partial_arg_1) { return (function(a,b) { return a != b; })(node, __partial_arg_1)}), nodes))));
}, nodes);
};
function check_defs(node, defs) { 

return merge(node, (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("root" == el_to_match.t) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					return {els: check_defs_multi(elems, defs)};

				}
			}
		}
	}

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
													var name = el_to_match.els[0].val;
													if ('active' in el_to_match.els[0]) {
														if ("t" == el_to_match.els[0].active) {
															if (((function(__partial_arg_1) { return all((function(__partial_arg_0) { return is_state_pending(__partial_arg_0)}), __partial_arg_1)}))(el_to_match.els.slice(1))) {
																return (function() { 
	var el_to_match = get_form(name, defs);
	if (get_type(el_to_match) == 'Object') {
		if ('gen' in el_to_match) {
			var items = el_to_match.gen;
			return {els: cons(merge(head(node.els), {in_scope: defs, is_defined: "t"}), map((function(__partial_arg_0) { return make_state_pending(__partial_arg_0)}), items))};

		}
	}

	return {els: [merge(head(node.els), {in_scope: defs, is_defined: "f"})]};
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
			if ("List" == el_to_match.t) {
				if ('els' in el_to_match) {
					if (get_type(el_to_match.els) == 'Array') {
						if (typeof el_to_match.els[0] != 'undefined') {
							if (get_type(el_to_match.els[0]) == 'Object') {
								if ('t' in el_to_match.els[0]) {
									if ("Atom" == el_to_match.els[0].t) {
										if ('val' in el_to_match.els[0]) {
											if ("do" == el_to_match.els[0].val) {
												var rest = el_to_match.els.slice(1);
												return {els: cons(head(node.els), check_defs_multi(rest, defs))};

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
			if ("List" == el_to_match.t) {
				if ('els' in el_to_match) {
					if (get_type(el_to_match.els) == 'Array') {
						if (typeof el_to_match.els[0] != 'undefined') {
							if (get_type(el_to_match.els[0]) == 'Object') {
								if ('t' in el_to_match.els[0]) {
									if ("Atom" == el_to_match.els[0].t) {
										if ('val' in el_to_match.els[0]) {
											if ("defn" == el_to_match.els[0].val) {
												var rest = el_to_match.els.slice(1);
												return {els: concat(map((function(__partial_arg_0) { return merge(__partial_arg_0, {is_defined: "t"})}), init(node.els)), [check_defs(last(rest), concat(defs, map(function (el) { 

return {name: el.val, gen: []};
}, init(rest))))])};

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
			if ("List" == el_to_match.t) {
				if ('els' in el_to_match) {
					if (get_type(el_to_match.els) == 'Array') {
						if (el_to_match.els.length == 3) {
							if (get_type(el_to_match.els[0]) == 'Object') {
								if ('t' in el_to_match.els[0]) {
									if ("Atom" == el_to_match.els[0].t) {
										if ('val' in el_to_match.els[0]) {
											if ("def" == el_to_match.els[0].val) {
												if (get_type(el_to_match.els[1]) == 'Object') {
													if ('t' in el_to_match.els[1]) {
														if ("Atom" == el_to_match.els[1].t) {
															if ('val' in el_to_match.els[1]) {
																var name = el_to_match.els[1].val;
																var body = el_to_match.els[2];
																return {els: concat(map((function(__partial_arg_0) { return merge(__partial_arg_0, {is_defined: "t"})}), take(2, node.els)), check_defs(body, defs))};

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
			if ((function (t) { 

return any((function(__partial_arg_1) { return (function(a,b) { return a == b; })(t, __partial_arg_1)}), ["Atom", "pending"]);
})(el_to_match.t)) {
				if ('active' in el_to_match) {
					var act = el_to_match.active;
					if ('val' in el_to_match) {
						var name = el_to_match.val;
						if ('state' in el_to_match) {
							if ("n" == el_to_match.state) {
								return (function() { 
	var el_to_match = get_form(name, defs);
	if (get_type(el_to_match) == 'Object') {
		if ('gen' in el_to_match) {
			return {in_scope: (function() { 
if ((function(a,b) { return a == b; })(act, "t")) { 
return defs;} else { 
return [];}})(), is_defined: "t"};

		}
	}

	return {in_scope: (function() { 
if ((function(a,b) { return a == b; })(act, "t")) { 
return defs;} else { 
return [];}})(), is_defined: "f"};
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
			if ("Pair" == el_to_match.t) {
				if ('els' in el_to_match) {
					if (get_type(el_to_match.els) == 'Array') {
						if (el_to_match.els.length == 2) {
							var key = el_to_match.els[0];
							var value = el_to_match.els[1];
							return {els: [key, check_defs(value, defs)]};

						}
					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if (like_list(el_to_match.t)) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					return {els: map((function(__partial_arg_0) { return check_defs(__partial_arg_0, defs)}), elems)};

				}
			}
		}
	}

	return {};
})());
};
;
var special_forms = [{name: "def", gen: [gen_atom("name"), gen_pending("value")]}, {name: "set", gen: [gen_atom("name"), gen_pending("value")]}, {name: "defn", gen: [gen_atom("name"), gen_atom("arg1"), gen_pending("body")]}, {name: "fn", gen: [gen_atom("arg1"), gen_pending("body")]}, {name: "if", gen: [gen_pending("cond"), gen_pending("else"), gen_pending("else")]}, {name: "nth", gen: [gen_pending("index"), gen_pending("array")]}, {name: "do", gen: [gen_list([gen_pending("...")])]}, {name: "match", gen: [gen_pending("value"), gen_list([gen_pending("patt"), gen_pending("expr")])]}];
var built_in_binops = map(function (op) { 

return {name: op, gen: [gen_pending("a"), gen_pending("b")]};
}, ["+", "-", "*", "/", "%", "==", "!=", ">", ">=", "<", "<=", "&&", "||"]);
function get_form(name, forms) { 

return find(function (form) { 

return (function(a,b) { return a == b; })(form.name, name);
}, forms);
};
;
function gen_active_class(node) { 

return str(["active_", is_real_active(node)]);
};
function prepare_render(node) { 

return merge(node, (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if (like_list(el_to_match.t)) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					return {classes: [gen_active_class(node)], els: map(prepare_node, elems)};

				}
			}
		}
	}

	return {classes: [gen_active_class(node)]};
})());
};
function render(node) { 

return (function() { 
	var el_to_match = node;
	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("root" == el_to_match.t) {
				if ('els' in el_to_match) {
					var elems = el_to_match.els;
					return join("<br/>", map(render, elems));

				}
			}
		}
	}

	if (get_type(el_to_match) == 'Object') {
		if ('t' in el_to_match) {
			if ("List" == el_to_match.t) {
				if ('active' in el_to_match) {
					if ("t" == el_to_match.active) {
						if ('els' in el_to_match) {
							if (non_active(el_to_match.els)) {
								return wrap_span(str(["(", join(" ", map(render, node.els)), ")"]), "act_t");

							}
						}
					}
				}
			}
		}
	}

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
			if ("Str" == el_to_match.t) {
				return str(["'", render_primitive(node), "'"]);

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
		if ('t' in el_to_match) {
			var type = el_to_match.t;
			if ('active' in el_to_match) {
				var act = el_to_match.active;
				if ('state' in el_to_match) {
					var st = el_to_match.state;
					if ('is_defined' in el_to_match) {
						var is_def = el_to_match.is_defined;
						return [str(["type_", type]), str(["act_", act]), str(["st_", st]), str(["is_def_", is_def])];

					}
				}
			}
		}
	}

	return [];
})();
};
function render_primitive(prim) { 

return wrap_span(prim.val, join(" ", get_classes(prim)));
};
function wrap_span(cont, cl) { 

return str(["<span class='", cl, "'>", cont, "</span>"]);
};
;
var root_node = activate(gen_root());
function update_view(node) { 

return (function() { 
$("#src-tree").text(jsDump.parse(node));
return $("#src-text").html(render(node));
})();
};
function update_view_compl(completions) { 

return (function() { 
;
return $("#completions").html(join(", ", map(function (el) { 

return el.name;
}, completions)));
})();
};
function update(node, input) { 

return (function() { 
root_node = check_defs(update_node_multi(node, get_triggered_input(node, input)), foldl([], concat, [special_forms, built_in_binops]));
update_view(root_node);
return update_view_compl(get_completions(root_node));
})();
};
;
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
var special_input = [[8, "bs"], [13, "ret"], [37, "larr"], [38, "uarr"], [39, "rarr"], [9, "tab"], [40, "darr"], [46, "del"]];
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
;
function handle_keydown(handler, key_event) { 

return (function() { 
	var el_to_match = kd_keycode_to_s(special_input, key_event.which);
	if ("not_matched" == el_to_match) {
		return undefined;

	}

	var s = el_to_match;
	return (function() { 
handler(s);
return key_event.preventDefault();
})();
})();
};
;
function handle_keypress(handler, key_event) { 

return (function() { 
handler(String.fromCharCode(key_event.which));
return key_event.preventDefault();
})();
};
$(document).ready(function () { 

return (function() { 
update(root_node, "darr");
;
$("#src-text").keydown((function(__partial_arg_1) { return handle_keydown((function(__partial_arg_1) { return update(root_node, __partial_arg_1)}), __partial_arg_1)}));
;
$("#src-text").keypress((function(__partial_arg_1) { return handle_keypress((function(__partial_arg_1) { return update(root_node, __partial_arg_1)}), __partial_arg_1)}));
;
return $("#src-text").focus();
})();
});