import r from 'ramda';
import products from '../mock-data/products.json';

const getBrands = r.compose(r.uniq, r.map(r.prop('brand')));
const brands = getBrands(products);

console.log(brands);