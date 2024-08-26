import { useState } from 'react'
import './App.css'
import CategoryList from './components/CategoryList';
import Category from './interfaces/Category.interface';

function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([
    { id: 1, title: 'Fruits', isChecked: false, isIndeterminate: true, subCategories: [
        { id: 11, title: 'Apple', isChecked: false },
        { id: 12, title: 'Orange', isChecked: true }
      ] 
    },
    { id: 2, title: 'Vegetables', isChecked: true, subCategories: [
        { id: 21, title: 'Carrot', isChecked: true },
        { id: 22, title: 'Lettuce', isChecked: true }
      ] 
    }
  ])

  const onCheckedHandler = (id: number) => {
    setCategoryList((prevCategoryList) => (
      prevCategoryList.map((parentCat) => {
        // if the parent category is the one that was checked
        // then update its isChecked and all its children's isChecked to be true
        if(parentCat.id === id) return {
          ...parentCat,
          isChecked: !parentCat.isChecked,
          isIndeterminate: false,
          subCategories: (parentCat.subCategories) 
            ? parentCat.subCategories.map((subCat) => ({...subCat, isChecked: !parentCat.isChecked}))
            : []
        }

        // if there are subcategories to check and the subcategory was checked
        // then update its isChecked to true
        // also set parent's isChecked to true if all children are checked
        // also set parent's isIndeterminate to true if only some children are checked
        if(parentCat.subCategories) {
          const updatedSubCategories = parentCat.subCategories.map((subCat) => {
            if(subCat.id === id) return {...subCat, isChecked: !subCat.isChecked}

            return subCat
          })

          const totalCategoriesChecked = updatedSubCategories.filter((subCat) => subCat.isChecked).length
          const isAllCategoriesChecked = totalCategoriesChecked === updatedSubCategories.length
          const isSomeCategoriesChecked = totalCategoriesChecked > 0 && totalCategoriesChecked < updatedSubCategories.length

          return {
            ...parentCat,
            subCategories: updatedSubCategories,
            isChecked: isAllCategoriesChecked,
            isIndeterminate: isSomeCategoriesChecked
          }
        }

        return parentCat
      })
    ))
  }

  return (
    <>
      <CategoryList categories={categoryList} onCheckedHandler={onCheckedHandler}/>
    </>
  )
}

export default App
