import React from 'react';
import Container from '@/components/Container';
import { groq } from 'next-sanity';
import { client, urlFor } from '@/lib/sanityClient';
import OnSale from '@/components/OnSale';
import Image from 'next/image';
import { ProductProps } from '../../../../../type';
import ProductInfo from '@/components/ProductInfo';

interface Props {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  const query = groq`*[type == 'product'] {
        slug
    }`;

  const slugs: any = await client.fetch(query);
  const slugRoutes = slugs.map((slug: any) => slug?.slug?.current);
  return slugRoutes?.map((slug: string) => ({
    slug,
  }));
};

const specialOffersQuery = groq`*[_type == 'product' && position == 'on Sale']{
...
} | order(_createdAt asc)`;

const SinglePage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'product' && slug.current == $slug][0]{
  ...
  }`;

  const product: ProductProps = await client.fetch(query, { slug });
  const specialOffersProduct = await client.fetch(specialOffersQuery);

  return (
    <Container className={'my-10 '}>
      <div
        className={
          'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-hull -mt-5 xl:-mt-8 bg-gray-100 p-4'
        }
      >
        <div className={''}>
          <OnSale products={specialOffersProduct} />
        </div>

        <div className={'h-full xl:col-span-2'}>
          <Image
            src={urlFor(product?.image).url()}
            alt={product?.title}
            width={500}
            height={500}
            className={'w-full h-full object-contain'}
          />
        </div>

        <div
          className={
            'w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center'
          }
        >
          <ProductInfo product={product} />
        </div>
      </div>
    </Container>
  );
};

export default SinglePage;
