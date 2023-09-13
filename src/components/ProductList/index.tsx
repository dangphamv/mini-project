import Product from '../Product';
import ProductType from '../../types';
import './styles.css';

type ListProductType = {
  data: Array<ProductType>;
};

const ProductList = ({ data }: ListProductType) => {
  return (
    <div className='list-product'>
      {data.map((item) => (
        <Product
          key={item.id}
          id={item.id}
          thumbnail={item.thumbnail}
          title={item.title}
          price={item.price}
        />
      ))}
    </div>
  );
};
export default ProductList;
