export interface ISubcategory {
  id: number;
  category: number;
  code: string;
  name: string;
  parentSubcategoryId: null;
  exampleName: string;
  exampleTitle: null;
  question: string;
  description: string;
  hintText: string;
  price: number;
  zone: string;
  order: number;
  isDefault: false;
  minPrice: number;
  averagePrice: number;
  useBudget: boolean;
  priceRequired: boolean;
  sbrCanCreateNewTasks: boolean;
  pricesByCity: IPriceByCity[];
}

interface IPriceByCity {
  subcategoryId: number;
  offerPrice: number;
  taskPriceMin: number;
  city: number;
  commentsOption: number;
  offerPriceType: number;
  offerPriceTaskPercent: number;
  offerPriceMax: number;
}
