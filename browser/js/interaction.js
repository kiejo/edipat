$(document).ready(function() {

	function buildErrorMessage(e) {
		return e.line !== undefined && e.column !== undefined
		      ? "Line " + e.line + ", column " + e.column + ": " + e.message
		      : e.message;
  	}

	function compile_and_update_view(grammar, source) {
		var parser = PEG.buildParser(grammar);

		try {
			var parsed = parser.parse(source);
			$("#parsed").text(jsDump.parse(parsed));

		} catch(e) {
			$("#parsed").text(buildErrorMessage(e));
		}

		try {
			var compiled = compile(parsed);
			$("#compiled").text(compiled);
		} catch(e) {
			$("#compiled").text(e.message);
		}
		
	}

  	function update() {
		compile_and_update_view($("#grammar").val(), $("#source").val());
	}

	$("#compile").click(function() {
		update();
	});


});