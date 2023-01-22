const {RuleTester}  = require('eslint')

const stringSpaceRule = require('./rules/no-whitespace-string')
const typeImportCheck = require('./rules/type-import-check')

const ruleTester = new RuleTester()

ruleTester.run('string-space-rule', stringSpaceRule, {
    valid: [{
        code: "x = 'Hello'"
    }],
    invalid: [{
        code: "x = 'Hello Hi'",
        errors: [{messageId: 'noWhiteSpace'}]
    }]
})

ruleTester.run('type-import-check', typeImportCheck, {
    valid: [
        { code: "import defaultExport from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import * as name from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { export1 } from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { export1 as alias1 } from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { default as alias } from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { export1, export2 } from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { export1, export2 as alias2, /* … */ } from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import defaultExport, { export1, /* … */ } from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import defaultExport, * as name from 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import 'module-name'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import type defaultExport from './types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import type * as name from '../types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { type export1 } from 'web/core/types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { type export1 as alias1 } from 'core/types.ts'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import type { default as alias } from 'types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { type export1, type export2 } from 'types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import { type export1, type export2 as alias2, /* … */ } from 'types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import type defaultExport, { export1, /* … */ } from 'types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import type defaultExport, * as name from 'types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
        { code: "import 'types'", parserOptions: { sourceType: "module", ecmaVersion: "latest" } },
    ],
    invalid: [
        { 
            code: "import defaultExport from './types'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
        { 
            code: "import * as name from '../types'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
        { 
            code: "import { export1 } from 'web/core/types'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
        { 
            code: "import { export1 as alias1 } from 'core/types.ts'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
        { 
            code: "import { default as alias } from 'types'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
        { 
            code: "import { type export1, export2 } from 'types'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
        { 
            code: "import { type export1, export2 as alias2, /* … */ } from 'types'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
        { 
            code: "import defaultExport, { type export1, /* … */ } from 'types'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
        { 
            code: "import defaultExport, * as name from 'types'",
			parserOptions: { sourceType: "module", ecmaVersion: "latest" },
            errors: [{messageId: 'addTypeImport'}]
        },
    ]
})