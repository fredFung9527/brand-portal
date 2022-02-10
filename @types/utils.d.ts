export type MyApiMethod = 'get' | 'post' | 'patch' | 'delete'
export interface MyApiOptions {
  headers?: { [key as string]: any },
  params?: { [key as string]: any },
  data?: { [key as string]: any }
}