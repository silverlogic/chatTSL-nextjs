import { Box, styled } from '@mui/material'
import { ButtonWithLoading, IButtonWitthLoadingProps } from '@baseapp-frontend/design-system-mui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ButtonContainer = styled(Box)(() => ({
  flexShrink: 0,
}))

export const Button = styled(ButtonWithLoading, {
  shouldForwardProp: (props) => props !== 'loading',
})<IButtonWitthLoadingProps>(() => ({
  minWidth: 'unset',
  borderColor: 'transparent',
}))

export const Icon = styled(FontAwesomeIcon)(({ theme }) => ({
  color: theme.palette.surface[50],
}))
