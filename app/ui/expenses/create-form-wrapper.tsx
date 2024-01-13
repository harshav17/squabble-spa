'use client';

import { fetchGroupMembers } from "@/app/lib/data";
import CreateExpenseForm from "./create-form";
import { useEffect, useState } from "react";
import { Group, Member, SplitType } from "@/app/lib/definitions";

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
            <div>
                <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    {groups.map((group) => (
                        <option key={group.group_id} value={group.group_id}>
                            {group.group_name}
                        </option>
                    ))}
                </select>
            </div>
            <CreateExpenseForm group_id={Number(selectedGroup)} members={members} splitTypes={splitTypes} />
        </div>
    )
}