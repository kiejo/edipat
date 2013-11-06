function cons(x, xs) { 

return [x].concat(xs);
};
function concat(xs, ys) { 

return xs.concat(ys);
};
function empty(xs) { 

return (function(a,b) { return a == b; })(xs.length, 0);
};
function head(xs) { 

return xs[0];
};
function last(xs) { 

return xs[(function(a,b) { return a - b; })(xs.length, 1)];
};
function tail(xs) { 

return xs.slice(1);
};
function init(xs) { 

return xs.slice(0, -1);
};
function id(a) { 

return a;
};
function each(f, xs) { 

return (function() { 
if (empty(xs)) { 
return undefined;} else { 
return (function() { 
f(head(xs));
return each(f, tail(xs));
})();}})();
};
function map(f, xs) { 

return (function() { 
if (empty(xs)) { 
return [];} else { 
return cons(f(head(xs)), map(f, tail(xs)));}})();
};
function filter(f, xs) { 

return (function() { 
	var el_to_match = xs;
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 0) {
			return [];

		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var x = el_to_match[0];
			var rest = el_to_match.slice(1);
			return (function() { 
if (f(x)) { 
return cons(x, filter(f, rest));} else { 
return filter(f, rest);}})();

		}
	}})();
};
function foldl(acc, f, xs) { 

return (function() { 
if (empty(xs)) { 
return acc;} else { 
return foldl(f(acc, head(xs)), f, tail(xs));}})();
};
function sum(xs) { 

return foldl(0, (function(a,b) { return a + b; }), xs);
};
function str(xs) { 

return foldl("", (function(a,b) { return a + b; }), xs);
};
function flatten(xs) { 

return foldl([], concat, xs);
};
function any(f, xs) { 

return (function() { 
	var el_to_match = xs;
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 0) {
			return false;

		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var x = el_to_match[0];
			var rest = el_to_match.slice(1);
			return (function() { 
if (f(x)) { 
return true;} else { 
return any(f, rest);}})();

		}
	}})();
};
function all(f, xs) { 

return (function() { 
	var el_to_match = xs;
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 0) {
			return true;

		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var x = el_to_match[0];
			var rest = el_to_match.slice(1);
			return (function() { 
if (f(x)) { 
return all(f, rest);} else { 
return false;}})();

		}
	}})();
};
function and(bools) { 

return all(id, bools);
};
function or(bools) { 

return any(id, bools);
};
function find(f, xs) { 

return (function() { 
	var el_to_match = xs;
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 0) {
			return null;

		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var x = el_to_match[0];
			var rest = el_to_match.slice(1);
			return (function() { 
if (f(x)) { 
return x;} else { 
return find(f, rest);}})();

		}
	}})();
};
function join(s, xs) { 

return (function() { 
	var el_to_match = xs;
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 0) {
			return "";

		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 1) {
			var x = el_to_match[0];
			return (function(a,b) { return a + b; })("", x);

		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (typeof el_to_match[0] != 'undefined') {
			var x = el_to_match[0];
			var rest = el_to_match.slice(1);
			return str([x, s, join(s, rest)]);

		}
	}})();
};
function inc(a) { 

return (function(a,b) { return a + b; })(a, 1);
};
function dec(a) { 

return (function(a,b) { return a - b; })(a, 1);
};
function min(a, b) { 

return (function() { 
if ((function(a,b) { return a <= b; })(a, b)) { 
return a;} else { 
return b;}})();
};
function max(a, b) { 

return (function() { 
if ((function(a,b) { return a >= b; })(a, b)) { 
return a;} else { 
return b;}})();
};
function range(start, end) { 

return (function() { 
if ((function(a,b) { return a == b; })(start, end)) { 
return [end];} else { 
return cons(start, range(inc(start), end));}})();
};
function insert_at(n, el, xs) { 

return (function() { 
	var el_to_match = [n, xs];
	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (get_type(el_to_match[1]) == 'Array') {
				if (el_to_match[1].length == 0) {
					return [el];

				}
			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (0 == el_to_match[0]) {
				if (get_type(el_to_match[1]) == 'Array') {
					if (typeof el_to_match[1][0] != 'undefined') {
						var x = el_to_match[1][0];
						var rest = el_to_match[1].slice(1);
						return concat([el, x], rest);

					}
				}
			}
		}
	}

	if (get_type(el_to_match) == 'Array') {
		if (el_to_match.length == 2) {
			if (get_type(el_to_match[1]) == 'Array') {
				if (typeof el_to_match[1][0] != 'undefined') {
					var x = el_to_match[1][0];
					var rest = el_to_match[1].slice(1);
					return cons(x, insert_at(dec(n), el, rest));

				}
			}
		}
	}})();
};
function starts_with(s, input) { 

return (function(a,b) { return a == b; })(input.indexOf(s), 0);
};