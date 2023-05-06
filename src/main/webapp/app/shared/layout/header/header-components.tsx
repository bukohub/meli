import React, { useCallback } from 'react';

import { NavLink as Link, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

export const Searchbattle = () => {
  const navigate = useNavigate();

  const searchProductbattle = (e: any) => {
    navigate('items?search=' + e.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(searchProductbattle, 400), []);

  return <div className="battle-navbar__search-battle"></div>;
};
