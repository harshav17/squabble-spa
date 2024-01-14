'use client';

import { Balance, Member } from "@/app/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/ui/components/ui/avatar";
import clsx from "clsx";

export default function BalanceAvatar({ member, balances }: { member: Member, balances: Balance[] }) {
    const balance = balances?.find((bal) => bal.user_id === member.user_id);
    const amount = balance?.amount;
    return (
        <div className="flex space-x-3 p-3">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
                <a href="#" className="focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">{member.user?.name}</p>
                    <p className={clsx('"truncate text-sm text-gray-500"', {
                        'text-green-500': amount && amount >= 0,
                        'text-orange-500': amount && amount < 0,
                    })}>{ amount }</p>
                </a>
            </div>
        </div>
    )
}