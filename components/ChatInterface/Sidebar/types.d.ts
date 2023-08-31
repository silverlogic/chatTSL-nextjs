import {TypographyProps } from '@mui/material'

interface ISidebarProps {
  selectedCategory: ITettraPageCategory | null
  onCategoryChanged: (category: ITettraPageCategory | null) => void
  selectedSubcategory: ITettraPageSubcategory | null
  onSubcategoryChanged: (subcategory: ITettraPageSubcategory | null) => void
}

interface ICategoryLabelProps extends TypographyProps {
  isSelected: boolean
}

interface ISubcategoryLabelProps extends TypographyProps {
  isSelected: boolean
}