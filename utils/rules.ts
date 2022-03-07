import moment from 'moment'

export function checkRequired(helperText: string) {
  return v => {
    return v?.length ? null : helperText
  }
}

export function checkPrice(helperText: string) {
  return v => {
    return (v && v > 0) ? null : helperText
  }
}

export function checkYesNo(helperText: string) {
  return v => {
    return (v && ['Yes', 'No'].includes(v)) ? null : helperText
  }
}

export function isEmail(v: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(v)
}

export function checkEmail(helperText: string) {
  return v => {
    return isEmail(v) ? null : helperText
  }
}

export function checkDateOptional(helperText: string) {
  return v => {
    if (!v) {
      return null
    }
    return moment(v).isValid() ? null : helperText
  }
}

export function comparePassword(helperText: string) {
  return (_, input) => {
    return input.password && input.cPassword && input.password === input.cPassword ? null : helperText
  }
}