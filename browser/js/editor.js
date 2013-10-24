function update_ast(ast, keycode) { 

return (function() { 
	var el_to_match = keycode;
	if (65 == el_to_match) {
		return gen_def_var();

	}})();
};
function gen_def_var() { 

return {t: "def_var", name: {t: "atom", name: "name", active: "t"}, body: {}};
};
function update_view(ast) { 

return $("#ast").text(jsDump.parse(ast));
};
$(document).ready(function () { 
var ast = {}
return $("#input").keyup(function (e) { 
ast = update_ast(ast, e.which)
return update_view(ast);
});
});