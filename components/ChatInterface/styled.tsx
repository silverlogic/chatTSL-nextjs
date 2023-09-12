import { Box, OutlinedInput, styled, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { IMessageContainerProps, IStyledOutlinedInputProps } from './types'
import { CircularProgress as MuiCircularProgress, CircularProgressProps } from '@mui/material'
import { FC } from 'react'

export const StyledOutlinedInput = styled(OutlinedInput, {
  shouldForwardProp: (props) => props !== 'isLoading',
})<IStyledOutlinedInputProps>(({ theme, isLoading }) => ({
  ...theme.typography.body2,
  color: theme.palette.surface[50],
  width: '100%',
  background: theme.palette.surface[800],
  borderRadius: '12px',
  '& .Mui-disabled .MuiOutlinedInput-input': {
    '&::placeholder': {
      color: theme.palette.surface[50],
    },
  },
  '& .MuiOutlinedInput-input': {
    '&::placeholder': {
      ...theme.typography.body2,
      opacity: 1,
      color: theme.palette.surface[500],
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${theme.palette.surface[600]}`,
    borderRadius: '12px',
  },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.surface[600],
  },
  '&.Mui-disabled:hover  .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.surface[600],
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary[500],
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: !isLoading ? theme.palette.primary[500] : theme.palette.surface[600],
  },
}))

export const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'end',
  gap: theme.spacing(1),
  background: 'linear-gradient(0deg, #25262E  50%, rgba(37, 38, 46, 0) 100%);',
  width: '100%',
  minHeight: '172px',
  marginTop: theme.spacing(-6.25),
  paddingBottom: theme.spacing(2),
  flexShrink: 0,
}))

export const InputExplanationText = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.surface[50],
  fontWeight: 300,
}))

export const MessageContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '75%',
}))

export const MessageInnerContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  width: '100%',
}))

export const MessageContainer = styled(Box, {
  shouldForwardProp: (props) => props !== 'isUserQuestion',
})<IMessageContainerProps>(({ theme, isUserQuestion }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: isUserQuestion ? 'transparent' : theme.palette.surface[700],
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(4.75),
  wordBreak: 'break-word',
}))

export const LoadingDot = styled(Box)(({ theme }) => ({
  height: theme.spacing(1.5),
  width: theme.spacing(1.5),
  background: theme.palette.surface[50],
  borderRadius: theme.spacing(0.75),
  display: 'inline-block',
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(2.5),
}))

export const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  height: theme.spacing(1.5),
  width: theme.spacing(1.5),
})) as unknown as FC<CircularProgressProps>

export const ChatInterfaceContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.surface[800],
  height: '100vh',
  color: theme.palette.surface[50],
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}))

export const ChatInterfaceContentContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}))

export const ChatInterfaceContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  background: theme.palette.surface[800],
  color: theme.palette.surface[50],
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}))

export const NoDataContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: theme.spacing(1),
  alignItems: 'center',
  justifyContent: 'center',
}))

export const WSConnectionStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: theme.spacing(1),
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
  position: 'absolute',
  right: '0',
}))

export const WSConnectionStateText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.surface[50],
  fontWeight: 300,
}))

export const WSConnectionStateIndicatorDot = styled(CircleIcon)(({ theme }) => ({
  width: theme.spacing(1.5),
  height: theme.spacing(1.5),
}))

export const TettraPagesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}))

export const TettraPage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.spacing(0.5),
  gap: theme.spacing(1),
  background: theme.palette.surface[800],
  padding: theme.spacing(0.5, 1.5, 0.5, 1.5),
}))
