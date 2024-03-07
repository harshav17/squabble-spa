'use client';

import { Group } from "@/app/lib/definitions";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function GroupLinks({
    groups,
}: {
    groups?: Group[];
}) {
    const pathname = usePathname();
    return (
        <ul role="list" className="-mx-2 mt-2 space-y-1">
            {groups && groups.map((group) => (
                <li key={group.group_id}>
                    <a
                        href={`/dashboard/groups/${group.group_id}`}
                        className={clsx(
                            pathname === `/dashboard/groups/${group.group_id}`
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                    >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            EX
                        </span>
                        <span className="truncate">{group.group_name}</span>
                    </a>
                </li>
            ))}
        </ul>
    )
}