import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@baseapp-frontend/core'
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Link as MuiLink,
} from '@mui/material'

function Header() {
  const { user } = useUser()

  return (
    <AppBar position="static" component="header" sx={{ marginBottom: 2 }}>
      <Toolbar>
        <Link href="/" passHref>
          <Button>
            <Image src="/logo.png" alt="BaseApp Logo" width={40} height={40} />
          </Button>
        </Link>

        <Typography
          variant="h1"
          component="h1"
          sx={{ flexGrow: 1, marginLeft: 1 }}
        >
          <Link href="/" passHref>
            <MuiLink underline="hover" color="inherit">
              BaseApp
            </MuiLink>
          </Link>
        </Typography>

        <Link href="/" passHref>
          <Button color="inherit" sx={{marginRight: 1}}>Home</Button>
        </Link>
        {!user && (
          <>
            <Link href="/auth/login" passHref>
              <Button color="inherit" sx={{marginRight: 1}}>Login</Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button color="inherit">Sign Up</Button>
            </Link>
          </>
        )}

        {user && (
          <>
            <Box component="span" sx={{marginRight: 1}}>Welcome {user.email} </Box>
            <Link href="/auth/logout" passHref>
              <Button color="inherit">Logout</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
