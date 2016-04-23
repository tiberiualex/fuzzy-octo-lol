'use strict';

import r from 'ramda';
import products from '../mock-data/products.json';

const template = product =>
  `<p>${product.brand} ${product.model} ${product.type}</p>`;

const render = (cont, el) => {
  const container = document.querySelector(cont);
  container.innerHTML = '';

  return el => {
    container.innerHTML = el;
  };
};

const getBrands = r.compose(r.uniq, r.map(r.prop('brand')));

const sortByPriceAsc = r.sortBy(r.prop('price'));
const getSortedAscMarkup = r.compose(r.join('\n'), r.map(template), sortByPriceAsc);
const renderSortedAsc = r.compose(render('#products'), getSortedAscMarkup);

const sortByPriceDesc = r.compose(r.reverse, sortByPriceAsc);
const getSortedDescMarkup = r.compose(r.join('\n'), r.map(template), sortByPriceDesc);
const renderSortedDesc = r.compose(render('#products'), getSortedDescMarkup);

const isFeatured = r.propEq('featured', true);
const getFeatured = r.filter(isFeatured);
const getFeaturedMarkup = r.compose(r.join('\n'), r.map(template), getFeatured);
const renderFeatured = r.compose(render('#products'), getFeaturedMarkup);

const btnAsc = document.querySelector('.ascending');
const btnDesc = document.querySelector('.descending');
const btnFeatured = document.querySelector('.featured');

// btnAsc.addEventListener('click', () => { renderSortedAsc(products); });
// btnDesc.addEventListener('click', () => { renderSortedDesc(products); });
// btnFeatured.addEventListener('click', () => { renderFeatured(products); });
