import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    UserCircleIcon,
    BellIcon,
  } from '@heroicons/react/24/outline';
import { HomeModernIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
  
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
    { name: 'Inicio', href: '/dashboard/home', icon: HomeIcon },
    { name: 'Perfil', href: '/dashboard/profile', icon: UserCircleIcon },
    { name: 'Clientes', href: '/dashboard/clientes', icon: UserGroupIcon },
    {
      name: 'Servicios',
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
    },
    
  ];
  
  export default function NavLinks() {
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <LinkIcon className="w-6 text-blue-gray-500" />
              <Typography className="hidden md:block text-blue-gray-700"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{link.name}</Typography>
            </a>
          );
        })}
      </>
    );
  }