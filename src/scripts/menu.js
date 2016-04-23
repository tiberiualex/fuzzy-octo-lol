'use strict';

const Menu = function Menu(selector) {
  this.element = document.querySelector(selector);
  if (this.element) this.init();
};

Menu.prototype.init = function() {
  this.menuLinks = this.element.querySelector('.js-menu__links');
  this.addListeners();
};

Menu.prototype.addListeners = function() {
  const menuButton = this.element.querySelector('.js-menu__trigger');
  menuButton.addEventListener('click', this.toggleMenu.bind(this));
};

Menu.prototype.toggleMenu = function() {
  this.menuLinks.classList.toggle('menu--active');
};

export default Menu;
