import fs from 'fs'
import path from 'path'
import util from 'util'
import filter from 'lodash.filter'
import * as babel from 'babel-core'

import * as sfc from '../vue/src/compiler/parser'
import { parseComponent } from '../vue/src/sfc/parser'

const PARSE_TPL_OPTIONS = {}

const PARSE_JS_OPTIONS = {}

for (const fileName of fs.readdirSync('./sample/components')) {
  const com = parseComponent(fs.readFileSync(path.resolve('sample/components', fileName), 'utf-8'))

  const jsResult = babel.transform(com.script.content, PARSE_JS_OPTIONS)
  const tplAst = sfc.parse(com.template.content, PARSE_TPL_OPTIONS)

  const deps = getDependencies(jsResult)

  console.log(util.inspect({ jsResult, tplAst, deps }, { depth: null }))
}

function getDependencies(jsResult) {
  const exportDefaultDecl = filter(jsResult.ast.program.body, { type: 'ExportDefaultDeclaration' })[0]

  if (!exportDefaultDecl || exportDefaultDecl.declaration.type !== 'ObjectExpression') {
    return {}
  }

  const componentsProp = exportDefaultDecl.declaration.properties.find(prop =>
    prop.type === 'ObjectProperty' && prop.key.name === 'components'
  )

  if (!componentsProp) {
    return {}
  }

  const deps = {}

  for (const dep of componentsProp.value.properties) {
    if (dep.key.type !== 'Identifier' || dep.value.type !== 'Identifier') {
      continue
    }
    const decl = jsResult.metadata.modules.imports.find(decl => decl.specifiers.some(spec =>
      spec.imported === 'default' && spec.local === dep.value.name
    ))
    deps[dep.key.name] = decl.source
  }

  return deps
}
