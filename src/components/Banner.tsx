'use client';
import Slider from 'react-slick';

import React, { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanityClient';

const Banner: FC = ({ banners }: any) => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev: any, next: any) => {
      setDotActive(next);
    },
    appendDots: (dots: any) => (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '7%',
          transform: 'translateY(-50%)',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div
        style={
          i === dotActive
            ? {
                width: '30px',
                color: '#262626',
                borderRight: '3px #262626 solid',
                padding: '8px 0',
                cursor: 'pointer',
              }
            : {
                width: '30px',
                color: 'transparent',
                borderRight: '3px white solid',
                padding: '8px 0',
                cursor: 'pointer',
              }
        }
      >
        <p
          style={
            i === dotActive
              ? { color: 'black', fontWeight: '600' }
              : { color: 'white', fontWeight: '600' }
          }
        >
          {' '}
          0{i + 1}
        </p>
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots: any) => (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '2%',
                transform: 'translateY(-50%)',
              }}
            >
              <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
          ),
          customPaging: (i: any) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: '25px',
                      color: '#262626',
                      borderRight: '3px #262626 solid',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }
                  : {
                      width: '25px',
                      color: 'transparent',
                      borderRight: '3px white solid',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {banners?.map((item: any) => (
          <Link href={'/shop'} key={item.key} className={'relative'}>
            <Image
              src={urlFor(item.image).url()}
              alt={'banner image'}
              width={2000}
              height={2000}
              className={'w-full max-h-[650px] object-cover '}
            />
            <div
              className={
                'w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20'
              }
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
