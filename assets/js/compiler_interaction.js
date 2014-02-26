$(document).ready(function() {

  	function update() {
  		var grammar = $("#peg-grammar").text(); // grammar saved in html, because not possible to load local file and js has no multiline strings
  		var source = $("#src-text").val();

  		$("#compiler-output").text(compile(grammar, source));
	}

	$("#compile-btn").click(function() {
		update();
	});

	$("#execute-btn").click(function() {
		alert(eval($("#compiler-output").text()));
	});

});