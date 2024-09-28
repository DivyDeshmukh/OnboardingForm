import Link from 'next/link';
import React from 'react';

function page() {
  return (
    <div className='flex items-center justify-center w-full gap-4 text-black h-screen'>
      UserList
      <Link href={"/userlist/create-brand"} className='bg-[#1C9DA6] font-bold text-xl rounded-lg px-3 py-2'>+ Create Brand</Link>
    </div>
  );
}

export default page;
