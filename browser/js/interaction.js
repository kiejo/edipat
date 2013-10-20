$(document).ready(function() {

	function update() {
		var grammar = $("#grammar").val();
		var parser = PEG.buildParser(grammar);

		try {
			var parsed = parser.parse($("#source").val());
			$("#parsed").text(jsDump.parse(parsed));

		} catch (e) {
			$("#parsed").text(buildErrorMessage(e));
		}

		var compiled = compile(parsed);
		$("#compiled").text(compiled);
	}
	
	function buildErrorMessage(e) {
		return e.line !== undefined && e.column !== undefined
		      ? "Line " + e.line + ", column " + e.column + ": " + e.message
		      : e.message;
  }

	$("#compile").click(function() {
		update();
	});


});