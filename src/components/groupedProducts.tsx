import React, { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../services/FetchProducts";
import { Product } from "../types/Product";
import { CategorizedProduct, GroupedProduct } from "../types/groupedProducts";

export const GroupedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetchProducts();
      setProducts(res);
      setLoading(false);
    };
    getProducts();
  }, []);

  const categorizedProducts = useMemo<CategorizedProduct[]>(() => {
    const categoryMap: Record<string, GroupedProduct[]> = products.reduce(
      (acc, curr) => {
        const { id, title, category } = curr;
        if (category in acc) {
          acc[category].push({ id, title, category });
        } else {
          acc[category] = [{ id, title, category }];
        }
        return acc;
      },
      {} as Record<string, GroupedProduct[]>
    );

    return Object.keys(categoryMap).map((category) => ({
      category,
      products: categoryMap[category],
    }));
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div>
      <h1>Grouped Products List By Category</h1>
      {categorizedProducts.map(({ category, products }) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <p><strong>Title: </strong>{product.title}</p>
                <p><strong>Category: </strong>{product.category}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
