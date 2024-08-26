import React from "react"
import Checkbox from "./Checkbox"
import Category from "../interfaces/Category.interface"

interface CategoryListProps {
    categories: Category[]
    onCheckedHandler: (id: number) => void
}

const CategoryList: React.FC<CategoryListProps> = ({categories, onCheckedHandler}) => {
    return (
        <>
            {categories.map((cat) => (
            <div key={cat.id} className="category">
                <Checkbox 
                    labelText={cat.title}
                    isChecked={cat.isChecked}
                    isIndeterminate={cat.isIndeterminate}
                    onCheckedHandler={() => onCheckedHandler(cat.id)}
                />
                {cat.subCategories && (
                <div className="category">
                    {cat.subCategories.map((subCat) => (
                        <div key={subCat.id} className="category">
                            <Checkbox 
                                labelText={subCat.title}
                                isChecked={subCat.isChecked}
                                onCheckedHandler={() => onCheckedHandler(subCat.id)}
                            />
                        </div>
                    ))}
                </div>
                )}
            </div>
            ))}
        </>
    )
}

export default CategoryList