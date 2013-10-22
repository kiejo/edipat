{
  function makeNumber(n) {
    return parseInt(n.join(""), 10);
  }

  function map(fn, arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(fn(arr[i]));
    }
    return result;
  }

  function makeStr(n) {
    return map(function(i) {
      return i[1];
    }, n).join("");
  }
}

program
  = s:sexp+ "\n"*  { return {
      type: 'Program',
      body: s
  };}

sexp
	= _ n:number _ { return n; }
	/ _ s:string _ { return s; }
	/ _ c:comment _ { return c; }
	/ _ a:atom _ { return a; }
	/ _ l:list _ { return l; }
  / _ v:vector _ { return v; }
  / _ o:object _ { return o; }


number
	= d:[0-9]+ _ { return {type: 'Number', value: makeNumber(d)}; }

string
  = '"' c:(!'"' .)* '"' { return {type: 'String', value: makeStr(c) }}

comment
	= "//" c:(!'\n' .)* { return {type: 'Comment', value: makeStr(c) }}

atom
  = c:[-+/\*_<>=a-zA-Z\.#&!]+ _ { return {type: 'Atom', name: c.join("")};}

list
  = _ "(" _ s:sexp* _ ")" _ { return {type: 'List', elements: s};}

vector
  = _ "[" _ s:sexp* _ "]" _ { return {type: 'Array', elements: s};}

o_pair
	= _ a:atom ":" _ s:sexp _ { return { key: a.name, value: s } }

object
  = _ "{" p:o_pair* "}" _ { return { type: 'Object', elements: p }}


_ = [\n, \t, ]*




