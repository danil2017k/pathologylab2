export const replaceAt = function (str, index, character) {
    return str.substr(0, index) + character + str.substr(index + character.length)
  }
  
  export const isNavbarCollapsed = (context) => {
    let rNames = ['case', 'puzzleCase', 'sharedCase', 'sharedPuzzleCase', 'login', 'restore', 'signup', 'webinar']
    return rNames.includes(context.$route.name)
  }
  
  /* eslint-disable handle-callback-err */
  export function errorHandler (error) {
    switch (error.response.status) {
      case 401:
        console.error('UNAUTHORIZED REQUEST. PLEASE, LOG IN FIRST')
        break
      default:
        console.error('SERVER ERROR')
    }
  }
  
  export function extend (to, _from) {
    for (const key in _from) {
      to[key] = _from[key]
    }
    return to
  }
  
  export function deepClone (obj) {
    if (Array.isArray(obj)) {
      return obj.map(deepClone)
    } else if (obj && typeof obj === 'object') {
      var cloned = {}
      var keys = Object.keys(obj)
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i]
        cloned[key] = deepClone(obj[key])
      }
      return cloned
    } else {
      return obj
    }
  }
  
  export function getWithUnit (value, unitSuffix) {
    let suffix
    if (value < 0.000001) {
      value = value * 1000000000
      suffix = ' n' + unitSuffix
    } else if (value < 0.001) {
      value = value * 1000000
      suffix = ' μ' + unitSuffix
    } else if (value < 1) {
      value = value * 1000
      suffix = ' m' + unitSuffix
    } else if (value >= 1000) {
      value = value / 1000
      suffix = ' k' + unitSuffix
    } else {
      suffix = ' ' + unitSuffix
    }
    return value.toFixed(1) + suffix
  }
  
  export function makeStringId () {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
  
    return text
  }
  
  export function cleanPaste (e) {
    e.preventDefault()
    if (e.clipboardData) {
      const content = (e.originalEvent || e).clipboardData.getData('text/plain')
      document.execCommand('insertText', false, content)
    } else if (window.clipboardData) {
      const content = window.clipboardData.getData('Text')
      document.selection.createRange().pasteHTML(content)
    }
  }
  
  export async function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  