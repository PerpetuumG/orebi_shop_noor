import React from 'react';

interface Props {
  amount?: number;
  className?: string;
}

const Price = ({ amount, className }: Props) => {
  const priceFormat = Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });

  return <span className={`${className}`}>{priceFormat}</span>;
};

export default Price;
