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

export function checkSeasonOrYear(v) {
  if (!v) {
    return false
  }
  const isSeason = isNaN(Number(v))
  if (isSeason) {
    if (v.length === 3) {
      return isNaN(Number(v[0])) && !isNaN(Number(`${v[1]}${v[2]}`))
    } else {
      return isNaN(Number(v[0])) && isNaN(Number(v[1])) && !isNaN(Number(`${v[2]}${v[3]}`))
    }
  } else {
    return v.length === 4
  }
}