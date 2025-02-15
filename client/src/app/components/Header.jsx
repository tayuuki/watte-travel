import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 p-6">
      <nav className="flex justify-between items-center">
        <Link href={"/"} className="text-white text-2xl font-bold ml-4">
          Watte travel
        </Link>
      </nav>
    </header>
  );
}

export default Header;
