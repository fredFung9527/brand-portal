import axios from 'axios'
import { MyApiMethod, MyApiOptions } from '../@types/utils'
import { getRecoil, setRecoil } from '../components/providers/RecoilNexusProvider'
import { recoilAlert, recoilLoading } from '../recoil/common'
import { recoilToken } from '../recoil/user'

export async function callApi(method: MyApiMethod, url: string, options?: MyApiOptions, noLoading?: boolean, noCatch?: boolean) {
  try {
    if (!noLoading) {
      setRecoil(recoilLoading, true)
    }

    const token = getRecoil(recoilToken)
    const config: any = {
      method,
      url: `${process.env.apiURL}${url}`,
      headers: {
        authorization: `jwt ${token}`
      }
    }
    if (options?.headers) {
      config.headers = {...config.headers, ...options?.headers}
    }
    if (options?.params) {
      config.params = options?.params
    }
    if (options?.data) {
      config.data = options?.data
    }
    return (await axios(config)).data
  } catch (e) {
    const message = e.response?.data?.message || e.message
    if (noCatch) {
      throw new Error(message)
    } else {
      setRecoil(recoilAlert, `error:${message}`)
      return null
    }
  } finally {
    if (!noLoading) {
      setRecoil(recoilLoading, false)
    }
  }
}

export async function get(url: string, params: any, noLoading: boolean, noCatch: boolean) {
  return await callApi('get', url, { params }, noLoading, noCatch)
}

export async function post(url: string, data: any, noLoading: boolean, noCatch: boolean) {
  return await callApi('post', url, { data }, noLoading, noCatch)
}

export async function patch(url: string, data: any, noLoading: boolean, noCatch: boolean) {
  const { id, objectId, ...otherData } = data
  let finalUrl = url || ''
  if (id) {
    finalUrl += `/${id}`
  } else if (objectId) {
    finalUrl += `/${objectId}`
  }
  return await callApi('patch', finalUrl, { data: otherData }, noLoading, noCatch)
}

export async function remove(url: string, id: string, noLoading: boolean, noCatch: boolean) {
  let finalUrl = url || ''
  if (id) {
    finalUrl += `/${id}`
  }
  return await callApi('delete', finalUrl, null, noLoading, noCatch)
}