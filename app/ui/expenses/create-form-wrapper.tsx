'use client';

import { fetchGroupMembers } from "@/app/lib/data";
import CreateExpenseForm from "./create-form";
import { useEffect, useState } from "react";
import { Group, Member, SplitType } from "@/app/lib/definitions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/ui/components/ui/select";

export default function CreateExpenseFormWrapper({
    groups,
    splitTypes,
}: {
    groups: Group[];
    splitTypes: SplitType[];
}) {
    // TODO - choose between number and string
    const [selectedGroup, setSelectedGroup] = useState(String(groups[0].group_id));
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const membersRes = await fetchGroupMembers(selectedGroup);
            setMembers(membersRes?.group_members);
        };
        fetchMembers();
    }, [selectedGroup]);

    return (
        <div>
            {/* add a picklist for groups */}
            <Select onValueChange={(val) => setSelectedGroup(val)} defaultValue={selectedGroup}>
                <SelectTrigger className="mb-4 w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {groups.map((group) => (
                        <SelectItem key={group.group_id} value={String(group.group_id)}>{group.group_name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <CreateExpenseForm group_id={Number(selectedGroup)} members={members} splitTypes={splitTypes} />
        </div>
    )
}