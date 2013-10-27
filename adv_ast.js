mylang features:

def_var
def_fn
def_fna
call_fn
atom
list
arr
obj
str
num



(defn tail xs
	(.slice xs 1))

{
	t: 'def_fn',
	name: { t: 'atom', name: 'tail' },
	args: [ { t: 'atom', name: 'xs' } ],
	body: {
		t: 'call_fn',
		name: { t: 'atom', name: '.slice' },
		args: [ { t: 'atom', name: 'xs' }, { t: 'num', val: 1} ]
	}
}


(defn map f xs
	(if (empty xs)
		[]
		(cons (f (head xs)) (map f (tail xs)))))

{
	t: 'def_fn',
	name: { t: 'atom', name: 'map' },
	args: [ { t: 'atom', name: 'f' }, { t: 'atom', name: 'xs' } ],
	body: {
		t: 'call_fn',
		name: { t: 'atom', name: 'if' },
		args: [
			{
				t: 'call_fn'
				name: { t: 'atom' name: 'empty' }
				args: [ { t: 'atom' name: 'xs' } ]
			},
			{ t: 'arr', els: [] }
			{
				t: 'call_fn'
				name: { t: 'atom' name: 'cons' }
				args: [
					{
						t: 'call_fn'
						name: { t: 'atom' name: 'f' }
						args: [
							t: 'call_fn'
							name: { t: 'atom' name: 'head' }
							args: [
								{ t: 'atom' name: 'head' }
							]
						]	
					}
					{
						t: 'call_fn'
						name: { t: 'atom' name: 'map' }
						args: [
							{
								t: 'atom' name: 'f'
							}
							{
								t: 'call_fn'
								name: { t: 'atom' name: 'tail' }
								args: [
									{ t: 'atom' name: 'xs'}
								]
							}
						]
					}

				]
			}
		]
	}
}



atom space key:
def_var name => gen body
def_fn  name => gen args
def_fn  args => add arg
def_fna args => add arg
call_fn name => gen args
call_fn args => add arg
