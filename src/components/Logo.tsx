import Image from 'next/image';
import React from 'react';

function Logo() {
  return (
    <div className="bg-gray-800 text-white w-16 flex items-center">
        <Image
          src="https://1851-dev.s3.amazonaws.com/static/logo.png" 
          alt="brand_logo" 
          width={200} 
          height={60}
          className='object-cover'
        />
    </div>
  );
}

export default Logo;
