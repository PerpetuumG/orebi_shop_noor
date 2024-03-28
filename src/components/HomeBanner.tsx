import React, { FC } from 'react';
import bannerImg from '@/assets/banner1.jpg';
import Image from 'next/image';

const HomeBanner: FC = () => {
  return (
    <div>
      <Image src={bannerImg} alt={'Banner'} className={'w-full h-full'} />
    </div>
  );
};

export default HomeBanner;
