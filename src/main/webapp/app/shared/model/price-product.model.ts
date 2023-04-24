import { IProduct } from 'app/shared/model/product.model';

export interface IPriceProduct {
  id?: number;
  currency?: string | null;
  amount?: number | null;
  decimals?: number | null;
  product?: IProduct | null;
}

export const defaultValue: Readonly<IPriceProduct> = {};
