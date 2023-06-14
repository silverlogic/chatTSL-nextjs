import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    function redirect() {
      router.push('/auth/login')
    }
    redirect()
  })

  return <div></div>
}

export default Home
