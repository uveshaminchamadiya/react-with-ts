export interface GroupedProduct {
  id: number;
  title: string;
  category: string;
}

export interface CategorizedProduct {
  category: string;
  products: GroupedProduct[];
}
