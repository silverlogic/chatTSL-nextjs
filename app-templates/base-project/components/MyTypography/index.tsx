import React from 'react'
import { Typography } from '@mui/material'
import { IMyTypography } from './types'

// TODO: remove "My" prefix for real components. This one is just for example and documentation.
export const MyTypography = ({ label, variant, color, align }: IMyTypography) => {
  return (
    <Typography variant={variant} color={color} align={align}>
      {label}
    </Typography>
  )
}
