import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { recoilBeforeRouteData } from '../../recoil/common'
import { recoilUser } from '../../recoil/user'
import { renewToken } from '../../utils/authenticate'

export default function UserHandler({needLogin}) {
  const user = useRecoilValue(recoilUser)
  const setBeforeRouteData = useSetRecoilState(recoilBeforeRouteData)
  const router = useRouter()

  useEffect(() => {
    if (needLogin && !user) {
      setBeforeRouteData({
        pathname: router.pathname,
        query: router.query
      })
      router.replace('/login')
    }
  }, [needLogin, user])

  useEffect(() => {
    if (user) {
      renewToken()
    }
  }, [user])

  return null
}