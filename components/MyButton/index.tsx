import React from 'react'
import { Button } from '@mui/material'
import { IMyButton } from './types'

// TODO: remove "My" prefix for real components. This one is just for example and documentation.
export const MyButton = ({
  backgroundColor,
  label,
  variant = 'outlined',
  onClick,
  size,
}: IMyButton) => {
  return (
    <Button
      variant={variant}
      sx={{ backgroundColor: backgroundColor }}
      size={size}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
