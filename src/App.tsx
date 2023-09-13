import { useEffect, useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Input from "./components/Input";

const PAGE_SIZE = 20;
const API_PRODUCTS = 'https://dummyjson.com/products';
const API_SEARCH = 'https://dummyjson.com/products/search';

type DataType = {
  total: number;
  skip: number;
  products: [];
};

const App = () => {
  const [data, setData] = useState<DataType>({
    total: 0,
    skip: 0,
    products: [],
  });
  const [isLoading, setLoading] = useState(true);
  const [listProduct, setListProduct] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = (skip: number, q = "" as string) => {
    const url = q
      ? `${API_SEARCH}?q=${q}&limit=${PAGE_SIZE}&skip=${skip}`
      : `${API_PRODUCTS}?limit=${PAGE_SIZE}&skip=${skip}&select=title,price,thumbnail`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLoading(false);
        setData(response);
        setListProduct(
          skip === 0
            ? response.products
            : [...listProduct, ...response.products]
        );
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    const { skip, total } = data;
    if (skip + PAGE_SIZE < total) {
      if (search) {
        fetchData(skip + 20, search);
      } else {
        fetchData(skip + 20);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchData(0);
  }, []);

  const onSearch = (e: any) => {
    const { value } = e.target;
    setSearch(value);
    fetchData(0, value);
  };

  return (
    <div className="App">
      <h2>Pham Dang - Coding Project</h2>
      <div className="search">
        <Input
          onChange={onSearch}
          className="search-input"
          placeholder="Search name"
        />
      </div>
      <ProductList data={listProduct} />
    </div>
  );
};

export default App;
