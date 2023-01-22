module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow whitespace space in string',
			recommended: true
		},
		messages: {
			noWhiteSpace: 'whitespace not allowed in string'
		},
	},
	create: function(context) {
		return {
			Literal: function(node) {
				if(typeof node.value == 'string') {
					const row = node.loc.start.line
					const column = node.loc.start.column

					for(let i=0;i<node.value.length; i++){
						if(node.value[i] === ' '){
							context.report({
								messageId: 'noWhiteSpace', 
								loc: {
									start: {
										line: row,
										column: column + i + 1
									},
									end: {
										line: node.loc.end.line,
										column: column + i + 2
									}
								}
							})
						}
					}
				}
			}
		}
	}
}