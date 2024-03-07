'use client';

import {
  PowerIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Group } from '../lib/definitions';
import { UserButton, useUser } from "@clerk/nextjs";
import { CreateGroup } from './groups/buttons';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links: {
  name: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
}[] = [];

export default function NavLinks({
  groups,
}: {
  groups?: Group[]
}) {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <li key={link.name}>
            {/**  Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" */}                                                   
            <Link
              href={link.href}
              className={clsx(
                "text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </li>
        );
      })}
      {groups && groups.map((group) => {
        return (
          <Link
            key={group.group_id}
            href={`/dashboard/groups/${group.group_id}`}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === `/groups/${group.group_id}`,
              }
            )}
          >
            <UserGroupIcon className="w-6" />
            <p className="hidden md:block">{group.group_name}</p>
          </Link>
        );
      })}
      <CreateGroup />
      <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      <UserButton />
    </>
  );
}
