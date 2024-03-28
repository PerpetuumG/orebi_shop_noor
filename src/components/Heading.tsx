import React from 'react';

interface Props {
  heading?: string;
  className?: string;
}

const Heading = ({ heading, className }: Props) => {
  return <p className={`text-3xl font-semibold pb-6 ${className}`}>{heading}</p>;
};

export default Heading;
