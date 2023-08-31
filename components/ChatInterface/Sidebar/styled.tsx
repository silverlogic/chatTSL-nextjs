import { Box, styled, Typography, Button } from '@mui/material'
import { fontSize } from '@baseapp-frontend/design-system-mui'
import { ICategoryLabelProps, ISubcategoryLabelProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.surface[900],
  minWidth: '337px',
  height: 'calc(100% - 28px)',
  borderWidth: '0px 1px 0px 0px',
  borderColor: theme.palette.surface[400],
  borderStyle: 'solid',
  gap: theme.spacing(1),
  overflowY: 'scroll',
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
}))

export const Separator = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.surface[700],
  minHeight: '1px',
  height: '1px',
  maxHeight: '1px',
  margin: theme.spacing(1),
}))

export const CategoriesHeaderLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Source Serif Pro, sans-serif',
  fontWeight: 700,
  fontSize: fontSize(11),
  lineHeight: '14.3px',
  letterSpacing: '0.5px',
  color: theme.palette.surface[50],
}))

export const CategoriesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1)
}))

export const CategoryContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
}))

export const CategoryButton = styled(Button)(({ theme }) => ({
  flex: 1,
  borderRadius: 0,
  borderColor: 'transparent',
  justifyContent: 'flex-start',
  textTransform: 'none'
}))

export const CategoryLabel = styled(Typography, {
  shouldForwardProp: (props) => props !== 'isSelected',
})<ICategoryLabelProps>(({ theme, isSelected }) => ({
  fontFamily: 'Source Serif Pro, sans-serif',
  fontWeight: isSelected ? 700 : 400,
  fontSize: fontSize(14),
  lineHeight: '19.6px',
  color: isSelected ? theme.palette.surface[50] : theme.palette.surface[500],
  flex: 1,
  textAlign: 'left'
}))

export const SubcategoriesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}))

export const SubcategoryContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
}))

export const SubcategoryButton = styled(Button)(({ theme }) => ({
  flex: 1,
  borderRadius: 0,
  borderColor: 'transparent',
  justifyContent: 'flex-start',
  textTransform: 'none'
}))

export const SubcategoryLabel = styled(Typography, {
  shouldForwardProp: (props) => props !== 'isSelected',
})<ISubcategoryLabelProps>(({ theme, isSelected }) => ({
  fontFamily: 'Source Serif Pro, sans-serif',
  fontWeight: isSelected ? 700 : 600,
  fontSize: fontSize(18),
  lineHeight: '40.5px',
  color: isSelected ? theme.palette.surface[50] : theme.palette.surface[500],
  flex: 1,
  textAlign: 'left'
}))

export const CloseIcon = styled(FontAwesomeIcon)(({ theme }) => ({
  color: theme.palette.surface[50],
}))
