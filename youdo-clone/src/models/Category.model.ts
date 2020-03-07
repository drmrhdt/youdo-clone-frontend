export interface Category {
  title_en: string;
  title_ru: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  title_ru: string;
  title_en: string;
}
