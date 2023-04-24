import './product.scss';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product.reducer';
import { currencyFormat } from 'app/shared/util/currency';

export const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productEntity = useAppSelector(state => {
    return state.product.entity;
  });

  return (
    <div className="product-detail-meli p-4">
      <div className="product-detail-meli__data row">
        <div className="product-detail-meli__image col-8 text-center">
          {productEntity.pictures?.length && <img src={productEntity?.pictures[0]?.url} alt="" />}
        </div>
        <div className="product-detail-meli__title col">
          <p className="fs-6 mb-2">{productEntity.warranty}</p>
          <p className="fs-4 mb-2 fw-bold lh-1">{productEntity.title}</p>
          <p className="fs-1 mb-2">{currencyFormat(productEntity.price)}</p>
          <button className="button-meli"> Comprar </button>
        </div>
      </div>

      <div className="product-detail-meli__description">
        <p className="fs-4  lh-1">Descripción del producto</p>
        <p className="text-black-50 lh-sm">{productEntity.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
