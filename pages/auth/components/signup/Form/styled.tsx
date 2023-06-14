import { ButtonWithLoading, PasswordField, TextField } from '@baseapp-frontend/design-system-mui'
import { Box, styled, CircularProgress as MUICircularProgress, Typography } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  padding: 0,
  background: theme.palette.surface[800],
  display: 'flex',
}))

export const FormContainer = styled(Box)({
  maxWidth: '80%',
})

export const Input = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  width: '100%',
  label: {
    color: theme.palette.surface[600],
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.surface[50],
    '& fieldset': {
      borderRadius: 8,
      borderColor: theme.palette.surface[600],
    },
    '&.Mui-focused fieldset, &:hover fieldset': {
      borderColor: theme.palette.primary[500],
    },
  },
}))

export const PasswordInput = styled(PasswordField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  width: '100%',
  label: {
    color: theme.palette.surface[600],
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.surface[50],
    '& fieldset': {
      borderRadius: 8,
      borderColor: theme.palette.surface[600],
    },
    '&.Mui-focused fieldset, &:hover fieldset': {
      borderColor: theme.palette.primary[500],
    },
  },
  '& .MuiButtonBase-root svg': {
    color: theme.palette.surface[600],
  },
}))

export const Button = styled(ButtonWithLoading)(({ theme }) => ({
  letterSpacing: 0,
  textTransform: 'none',
  backgroundColor: theme.palette.primary['600'],
  color: theme.palette.surface['50'],
  width: '100%',
  padding: theme.spacing(2, 2.5),
  borderRadius: 8,
  boxShadow: 'none',
  margin: theme.spacing(2, 0),
  '&:hover': {
    backgroundColor: theme.palette.primary['600'],
    filter: 'brightness(1.1)',
  },
}))

export const CircularProgress = styled(MUICircularProgress)(({ theme }) => ({
  color: theme.palette.surface['50'],
}))

export const AlternativeAuthLink = styled(Typography)(({ theme }) => ({
  display: 'inline',
  color: theme.palette.surface['50'],
  '& a': {
    color: theme.palette.surface['50'],
    textDecoration: 'none',
  },
}))

export const Text = styled(Typography)(({ theme }) => ({
  display: 'inline',
  color: theme.palette.surface[600],
  marginRight: theme.spacing(1),
}))

export const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.surface['50'],
  marginBottom: theme.spacing(2),
}))

export const RightContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  background: theme.palette.surface[600],
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}))

export const LeftContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  [theme.breakpoints.up('md')]: {
    width: '600px',
  },
}))
