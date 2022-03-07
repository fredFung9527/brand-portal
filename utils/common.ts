import { forEach } from 'lodash'
import { User } from '../@types/user'
import { v4 as uuidv4 } from 'uuid'

export function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function list2Object(list: any[], keyKey: string, valueKey: string) {
  let result = {}
  forEach(list, it => {
    const key = keyKey ? it[keyKey] : it
    if (typeof key === 'string') {
      result[key] = valueKey ? it[valueKey] : it
    }
  })
  return result
}

export function getUserShowName(user: User) {
  if (!user) {
    return ''
  }
  return `${user.firstName}, ${user.lastName}`
}

export function numberWithCommas(v) {
  return v && v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''
}

export function addTempId(v) {
  return {...v, tempId: uuidv4()}
}