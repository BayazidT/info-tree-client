export interface Category{
    id: string;
    name: string;
    description?: string;
    domain?: string;
    parentCategoryId?: number;
}