import { Box, styled, Typography } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  padding: 0,
  background: theme.palette.surface[800],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const Text = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.surface[50],
  textAlign: 'center',
  maxWidth: '90%',
  [theme.breakpoints.up('sm')]: {
    ...theme.typography.h3,
  },
}))
