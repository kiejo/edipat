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
		if (0 == el_to_match.length) {
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