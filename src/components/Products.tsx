import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/FetchProducts";
import { Product } from "../types/Product";

export const Products: React.FC = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>; 
  }

  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};
