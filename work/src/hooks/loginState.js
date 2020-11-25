import { useState, useEffect, useCallback } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(true);
  const [login, setProducts] = useState(false);

  const getLogin = useCallback(async () => {
    const response = await fetch("/me");
    const products = await response.json();
    console.log(products)
    setProducts(products);
    setLoading(false);
  }, []);

  useEffect(() => {
    getLogin();
  }, [getLogin]);
  return { loading, login };
};
