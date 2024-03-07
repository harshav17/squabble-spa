import { fetchGroups } from '../lib/data';
import DesktopSidenav from './sidenav/desktop';
import MobileSidenav from './sidenav/mobile';

export default async function SideNav() {
  const groupsRes = await fetchGroups("");
  const groups = groupsRes?.expenseGroups;

  return (
    <>
    <DesktopSidenav groups={groups} />
    <MobileSidenav groups={groups} />
    </>
  );
}
