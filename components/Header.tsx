import Link from 'next/link'
import Image from 'next/image'
import { useUser } from 'baseapp-nextjs-core'

function Header() {
  const { user } = useUser()

  return <header>
    <h1><Image src="/logo.png" alt="BaseApp Logo" width={40} height={40} /> BaseApp</h1>

    <nav>
      <Link href="/">Home</Link>
      {!user && <>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/signup">Sign Up</Link>
      </>}

      {user && <>
        <span>Welcome {user.email}</span>
        <Link href="/auth/logout">Logout</Link>
      </>}
    </nav>
  </header>
}

export default Header
