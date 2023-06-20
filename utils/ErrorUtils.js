import _ from 'lodash'
import humps from 'humps'

export function getApiErrors(errorObj) {
  return humps.camelizeKeys(_.get(errorObj, 'response.data', {}))
}

export function formatApiErrorMessages(errors, messages = [], prefix = '') {
  if (typeof errors !== 'object') {
    return messages
  }
  _.forOwn(errors, (v, k) => {
    const newPrefix = prefix ? `${prefix}[${formatFieldName(k)}]` : formatFieldName(k)
    if (typeof v === 'string') {
      messages.push(`${newPrefix}: ${v}`)
    }
    if (Array.isArray(v) && v.length) {
      if (typeof v[0] === 'string') {
        messages.push(`${newPrefix}: ` + v.join('; '))
      } else {
        v.forEach((errors, i) => {
          messages = formatApiErrorMessages(errors, messages, `${newPrefix}[${i + 1}]`)
        })
      }
    } else if (typeof v === 'object') {
      messages = formatApiErrorMessages(v, messages, `${newPrefix}`)
    }
  })
  return messages
}

function formatFieldName(name) {
  let result = `${humps.decamelize(name).replace(/_/g, ' ')}`
  result = result.substr(0, 1).toUpperCase() + result.substr(1)
  return result
}

export function createErrorNotificationMessage(err) {
  const status = _.get(err, 'response.status')

  if (status && status !== 401) {
    let errMessages = []
    if (_.get(err, 'response.data')) {
      try {
        errMessages = formatApiErrorMessages(err.response.data)
      } catch (ex) {
        console.error(ex)
      }
    }

    let errMessage = ''
    if (errMessages.length === 1) {
      errMessage = errMessages[0]
    } else {
      errMessage = errMessages.join('\n\n')
    }

    const message =
      errMessage ||
      err.message ||
      (err.responseText ? 'Error: ' + err.responseText : 'Error (see console logs)')

    return message
  }

  return 'Error (see console logs)'
}
