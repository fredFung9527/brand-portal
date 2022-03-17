import moment from 'moment'

export function checkRequired(helperText: string) {
  return v => {
    return v?.length ? null : helperText
  }
}

export function isEmail(v: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(v)
}

export function comparePassword(helperText: string) {
  return (_, input) => {
    return input.password && input.cPassword && input.password === input.cPassword ? null : helperText
  }
}