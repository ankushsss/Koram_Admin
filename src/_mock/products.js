
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',

];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const products = [...Array(2)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id:"1",
    cover: `/static/mock-images/products/product_1.jpg`,
    name: "yash",
    price: "200",

    colors:
      (setIndex === 0 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 1 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', 'Open', 'close']),
  };
});

export default products;
