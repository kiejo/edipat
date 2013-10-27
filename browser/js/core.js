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