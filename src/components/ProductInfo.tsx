'use client';

import React from 'react';
import { ProductProps } from '../../type';
import Price from '@/components/Price';

interface Props {
  product: ProductProps;
}

const ProductInfo = ({ product }: Props) => {
  return (
    <div className={'flex flex-col gap-5'}>
      <h2 className={'text-4xl font-semibold'}>{product?.title}</h2>

      <div className={'flex items-center gap-4'}>
        <p className={'text-lg font-normal text-gray-500 line-through'}>
          <Price amount={product?.rowprice} />
        </p>

        <Price amount={product?.price} className={'text-lg font-bold'} />

        <p className={'text-sm'}>
          you saved{' '}
          <Price
            amount={product?.rowprice - product?.price}
            className={'bg-green-700 text-white px-2 rounded-md'}
          />{' '}
          from this item
        </p>
      </div>

      <p className={'text-sm tracking-wide text-gray-600'}>{product?.description}</p>
      <p className={'text-sm text-gray-500'}>Be the first to leave a review.</p>

      <button
        className={
          'w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg rounded-md'
        }
      >
        Add to Cart
      </button>

      <p className={'font-normal text-sm'}>
        <span className={'text-base font-medium'}>Categories: </span>
        {/*{product?.category}*/}
      </p>
    </div>
  );
};

export default ProductInfo;
