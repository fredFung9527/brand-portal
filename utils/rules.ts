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

export function isEmail(v: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(v)
}

export function checkEmail(helperText: string) {
  return v => {
    return isEmail(v) ? null : helperText
  }
}

export function checkDate(helperText: string) {
  return v => {
    return moment(v).isValid() ? null : helperText
  }
}

export function comparePassword(helperText: string) {
  return (_, input) => {
    return input.password && input.cPassword && input.password === input.cPassword ? null : helperText
  }
}

export function checkPriceHistoy(helperText: string) {
  return v => {
    if (v?.length) {
      for (const it of v) {
        if (!it.before || !it.price || !moment(it.before).isValid() || !(it.price > 0)) {
          return helperText
        }
      }
    }
    return null
  }
}