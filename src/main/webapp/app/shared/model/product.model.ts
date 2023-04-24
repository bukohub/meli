import dayjs from 'dayjs';
import { ICountry } from 'app/shared/model/country.model';
import { ICategory } from 'app/shared/model/category.model';
import { IPriceProduct } from 'app/shared/model/price-product.model';

export interface IProduct {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  dateCreated?: string;
  picture?: string;
  condition?: string | null;
  freeShipping?: boolean;
  soldQuantity?: number;
  country?: ICountry | null;
  category?: ICategory | null;
  priceProducts?: IPriceProduct[] | null;
  thumbnail?: string;
  address?: any;
}

export const defaultValue: Readonly<IProduct> = {
  freeShipping: false,
};
