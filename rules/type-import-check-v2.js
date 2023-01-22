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
        const fullImportStatements = []
        
        const idenToImportNode = new Map()
        const typeIdentifiers = new Set()
        const nonTypeIdentifiers = new Set()

        const validParentForTypes = ['ImportDefaultSpecifier', 'ImportSpecifier', 'TSTypeReference']

        function getImportIden(node) {
          return node.local.name
        }

        function getTypeIden(node) {
          return node.typeName.name
        }

        return {
            ImportDeclaration: function(node) {
              if(node.importKind == 'type') return

              let defaultSpecifier = undefined
              const namedSpecifiers = []

              for(const specifier of node.specifiers) {
                switch(specifier.type) {
                  case "ImportDefaultSpecifier": {
                    defaultSpecifier = specifier
                    break
                  }
                  case "ImportNamespaceSpecifier": {
                    return
                  }
                  case "ImportSpecifier":{
                    namedSpecifiers.push(specifier)
                    break
                  }
                }
              }

              if(defaultSpecifier && !namedSpecifiers.length) {
                idenToImportNode.set(getImportIden(defaultSpecifier), {
                  node: defaultSpecifier,
                  parent: node
                })
              }
              namedSpecifiers.forEach((specifier) => idenToImportNode.set(getImportIden(specifier), {
                node: specifier,
                parent: node
              }))

              if(defaultSpecifier ^ namedSpecifiers.length) {
                fullImportStatements.push(node)
              }                
            },
            TSTypeReference: function(node) {
              const idenName = getTypeIden(node)
              if(idenToImportNode.has(idenName)) typeIdentifiers.add(idenName)
            },
            Identifier: function(node) {
              const ancestors = context.getAncestors()
              if(!ancestors.length) return

              const parentNode = ancestors[ancestors.length - 1]
              if(!validParentForTypes.includes(parentNode.type) && idenToImportNode.has(node.name)) {
                nonTypeIdentifiers.add(node.name)
              }
            },
            JSXIdentifier: function(node) {
              if(idenToImportNode.has(node.name))
                nonTypeIdentifiers.add(node.name)
            },
            'Program:exit': function(node) {
              nonTypeIdentifiers.forEach((iden) => typeIdentifiers.delete(iden))
              for(const iden of typeIdentifiers) {
                const importNode = idenToImportNode.get(iden).node
                if(importNode.importKind == 'type') return

                context.report({
                  node: importNode,
                  messageId: 'addTypeImport',
                  fix: function(fixer) {
                    return fixer.insertTextBefore(importNode, 'type ')
                  }
                })
              }
            }
        }
    }
}
