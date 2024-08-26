export default interface Category {
    id: number,
    title: string,
    isChecked: boolean,
    subCategories?: Category[],
    isIndeterminate?: boolean
}