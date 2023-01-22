const typeWordLength = "type".length 
const importWordLength = "import".length

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: "Add 'type' attribute to type import statement",
            recommended: true
        },
        messages: {
            addTypeImport: "Add 'type' keyword to type identifier import",
            refactorTypeKeyword: "Move individual 'type' keyword to type identifier import"
        },
        fixable: "code"
    },
    create: function(context) {
        return {
            ImportDeclaration: function(node) {
                const importSource = node.source.value
                if(importSource.includes("types")) {
                    if(node.importKind == 'type') return

                    const numSpecifiers = node.specifiers.length
                    if(numSpecifiers === 0) return

                    const specifierDefineType = []

                    for(const specifier of node.specifiers) {
                        if(specifier.importKind == 'type') {
                            specifierDefineType.push(specifier)
                        }
                    }

                    context.report({
                        node: node,
                        messageId: (numSpecifiers === specifierDefineType.length) ? 'refactorTypeKeyword' : 'addTypeImport',
                        fix: function(fixer) {
                            const fixers = []
                            for(const specifier of specifierDefineType){
                                const rangeStart = specifier.range[0]
                                const rangeEnd = rangeStart + typeWordLength + 1
                                
                                console.log(rangeStart, rangeEnd)
                                fixers.push(fixer.removeRange([rangeStart, rangeEnd]))
                            }

                            const rangeStart = node.range[0]
                            const rangeEnd = rangeStart + importWordLength

                            console.log(rangeStart, rangeEnd)
                            fixers.push(fixer.insertTextAfterRange([rangeStart, rangeEnd], ' type'))

                           return fixers
                        }
                    })
                }
            }
        }
    }
}