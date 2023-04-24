import React, { useCallback } from 'react';

import { NavbarBrand } from 'reactstrap';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import debounce from 'lodash.debounce';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="https://www.expoknews.com/wp-content/uploads/2020/03/1200px-MercadoLibre.svg-1.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
  </NavbarBrand>
);

export const SearchMeli = () => {
  const navigate = useNavigate();

  const searchProductMeli = (e: any) => {
    navigate('items?search=' + e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(searchProductMeli, 400), []);

  return (
    <div className="meli-navbar__search-meli">
      <input type="search" placeholder="Nunca dejes de buscar" onKeyUp={debouncedChangeHandler} />

      <div className="meli-navbar__search-meli--icon ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
    </div>
  );
};
