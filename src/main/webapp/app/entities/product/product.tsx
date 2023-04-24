import './product.scss';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProduct } from 'app/shared/model/product.model';
import { getEntities } from './product.reducer';
import Loading from 'app/shared/layout/loading/loading';
import { currencyFormat } from 'app/shared/util/currency';

export const Product = () => {
  const dispatch = useAppDispatch();

  const productList = useAppSelector(state => state.product.entities.results);
  const [searchParams] = useSearchParams();

  const loading = useAppSelector(state => state.product.loading);

  useEffect(() => {
    const value = searchParams.get('search');

    dispatch(getEntities({ query: value }));
  }, [searchParams]);

  return (
    <div className="product-meli">
      {loading && <Loading></Loading>}

      {productList?.map((product: IProduct) => (
        <Link className="card-meli p-4" to={product.id} key={product.id}>
          <div className="card-meli__product row py-3">
            <div className="card-meli__product__image col text-center">
              <img src={product.thumbnail} alt="" />
            </div>
            <div className="card-meli__product__info mt-4 col-7">
              <div className="card-meli__product__info--price">
                <p className="fs-4 mb-2">{currencyFormat(product.price)}</p>
              </div>
              <div className="card-meli__product__info--title">
                <p className="fs-5 lh-1">{product.title}</p>
              </div>
            </div>
            <div className="card-meli__product__info--country col mt-4">
              <p className="fs-6 text-muted">{product.address.state_name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Product;
