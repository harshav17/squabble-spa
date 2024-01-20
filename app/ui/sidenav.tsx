import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { fetchGroups } from '../lib/data';

export default async function SideNav() {
  const groupsRes = await fetchGroups("");
  const groups = groupsRes.expenseGroups;

  return (
    <div id="sidenav" className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks groups={groups}/>
      </div>
    </div>
  );
}
