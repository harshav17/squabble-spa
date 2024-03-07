import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export function CreateGroup() {
    return (
        <Link
            href="/groups/create"
            className="flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <PlusIcon className="h-5 mr-2"/><span className="hidden md:block">Create Group</span>
        </Link>
    )
}