import ProductType from '../../types';
import './styles.css';

const Product = (props: ProductType) => {
  return (
    <div className='item'>
      <div className='image'>
        <img alt={props.title} src={props.thumbnail} />
      </div>
      <div className='content'>
        <h3>{props.title}</h3>
        <i>Giá: ${props.price}</i>
      </div>
    </div>
  );
};
export default Product;