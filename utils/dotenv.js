const fs = require('fs')
const path = require('path')
const os = require('os')

const LINE =
  /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm

function parse(src) {
  const obj = {}

  let lines = src.toString()

  lines = lines.replace(/\r\n?/gm, '\n')

  let match
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1]

    let value = match[2] || ''

    value = value.trim()

    const maybeQuote = value[0]

    value = value.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')

    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n')
      value = value.replace(/\\r/g, '\r')
    }

    obj[key] = value
  }

  return obj
}

function _log(message) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

// Populates process.env from .env file
function config(options) {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding = 'utf8'
  const debug = Boolean(options && options.debug)
  const override = Boolean(options && options.override)

  if (options) {
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.mode !== null) {
      dotenvPath = path.resolve(process.cwd(), `.env.${options.mode}`)
    }
  }

  try {
    // Specifying an encoding returns a string instead of a buffer
    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }))

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else {
        if (override === true) {
          process.env[key] = parsed[key]
        }

        if (debug) {
          if (override === true) {
            _log(
              `"${key}" is already defined in \`process.env\` and WAS overwritten`,
            )
          } else {
            _log(
              `"${key}" is already defined in \`process.env\` and was NOT overwritten`,
            )
          }
        }
      }
    })

    return { parsed }
  } catch (e) {
    if (debug) {
      _log(`Failed to load ${dotenvPath} ${e.message}`)
    }

    return { error: e }
  }
}

const DotenvModule = {
  config,
  parse,
}

module.exports.config = DotenvModule.config
module.exports.parse = DotenvModule.parse
module.exports = DotenvModule
