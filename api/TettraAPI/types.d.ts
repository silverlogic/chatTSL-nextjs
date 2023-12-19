interface ITettraPageCategory {
  id: number
  categoryId: number
  categoryName: string
}

interface ITettraPageSubcategory {
  id: number
  subcategoryId: number
  subcategoryName: string
  subcategoryIcon: string | null
}

interface ITettraPageSubcategoryFilter {
  categoryId?: number
}
