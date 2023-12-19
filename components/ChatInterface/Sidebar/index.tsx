import { useQuery } from 'react-query'
import { Typography } from '@mui/material'
import { useUser } from '@baseapp-frontend/core'
import {
  Container,
  Separator,
  CategoriesContainer,
  CategoryContainer,
  CategoryButton,
  CategoryLabel,
  SubcategoriesContainer,
  SubcategoryContainer,
  SubcategoryButton,
  SubcategoryLabel,
} from './styled'
import { TettraCategoriesAPI, TettraSubcategoriesAPI } from '../../../api/TettraAPI'
import { ISidebarProps } from './types'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { CloseIcon } from './styled'

const Sidebar = ({
  selectedCategory,
  onCategoryChanged,
  selectedSubcategory,
  onSubcategoryChanged,
  ...props
}: ISidebarProps) => {
  const { user } = useUser({})

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => TettraCategoriesAPI.list(),
    enabled: !!user,
  })

  const subcategories = useQuery({
    queryKey: ['subcategories', selectedCategory],
    queryFn: () => {
      const filter: ITettraPageSubcategoryFilter = {}
      if (selectedCategory) {
        filter.categoryId = selectedCategory.categoryId
      }
      return TettraSubcategoriesAPI.list({ ...filter })
    },
    enabled: !!user,
  })

  return (
    <Container {...props}>
      <CategoriesContainer>
        {categories.data?.map((category, index: number) => {
          const isSelected = selectedCategory?.id == category.id
          return (
            <CategoryContainer key={index}>
              <CategoryButton
                onClick={() => {
                  onCategoryChanged(isSelected ? null : category)
                }}
                endIcon={isSelected && <CloseIcon icon={faCircleXmark} />}
              >
                <CategoryLabel isSelected={isSelected}>{category.categoryName}</CategoryLabel>
              </CategoryButton>
            </CategoryContainer>
          )
        })}
      </CategoriesContainer>
      <Separator component={'div'} />

      {selectedCategory && (
        <SubcategoriesContainer>
          {subcategories.data
            ?.slice()
            .sort((a, b) => a.subcategoryName.localeCompare(b.subcategoryName))
            .map((subcategory, index: number) => {
              const isSelected = selectedSubcategory?.id == subcategory.id
              return (
                <SubcategoryContainer key={index}>
                  <SubcategoryButton
                    startIcon={subcategory?.subcategoryIcon}
                    onClick={() => {
                      onSubcategoryChanged(isSelected ? null : subcategory)
                    }}
                    endIcon={isSelected && <CloseIcon icon={faCircleXmark} />}
                  >
                    <SubcategoryLabel isSelected={isSelected}>
                      {subcategory.subcategoryName}
                    </SubcategoryLabel>
                  </SubcategoryButton>
                </SubcategoryContainer>
              )
            })}
        </SubcategoriesContainer>
      )}
    </Container>
  )
}

export default Sidebar
