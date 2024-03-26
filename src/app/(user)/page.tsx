import React, { FC } from 'react';
import Banner from '@/components/Banner';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanityClient';

export const revalidate = 10;
const bannerQuery = groq`*[_type == 'banner']{
  image,
  _id
} | order(_createdAt asc)`;

const newArrivalQuery = groq`*[_type == 'product' && position == 'New Arrivals']{
...
} | order(_createdAt asc)`;

const bestSellersQuery = groq`*[_type == 'product' && position == 'Bestsellers']{
  ...
 } | order(_createdAt asc)`;
const specialOffersQuery = groq`*[_type == 'product' && position == 'Special Offers']{
  ...
 } | order(_createdAt asc)`;

const HomePage: FC = async () => {
  const banners = await client.fetch(bannerQuery);

  return (
    <main className={'text-sm overflow-hidden min-h-screen'}>
      <Banner banners={banners} />
    </main>
  );
};

export default HomePage;
