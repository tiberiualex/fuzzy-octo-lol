import r from 'ramda';
import products from '../mock-data/products.json';

const getBrands = r.compose(r.uniq, r.map(r.prop('brand')));
const sortByPriceAsc = r.sortBy(r.prop('price'));
const sortByPriceDesc = r.compose(r.reverse, sortByPriceAsc);
const isFeatured = r.propEq('featured', true);
const getFeatured = r.filter(isFeatured);

const featured = getFeatured(products);

console.log(featured);
