function compile(parsed) {
	switch(parsed.type) {
		case 'Program':
			return compile(parsed.body[0]);
		case 'List':
			return compile(parsed.elements);
		case 'Atom':
			return parsed.name;
	}
}