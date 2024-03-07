import { fetchGroupBalances, fetchGroupMembers } from "@/app/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/ui/components/ui/card";
import BalanceAvatar from "../components/ui/balance_avatar";

export default async function Balances({ groupID }: { groupID: string }) {
    // fetch group members
    const memRes = await fetchGroupMembers(groupID);
    const members = memRes?.group_members;

    // fetch balances
    const balRes = await fetchGroupBalances(groupID);
    
    return (
        <Card className="m-2 p-3 bg-gray-900">
            <CardHeader className="border-b-2 border-gray-800 p-3">
                <CardTitle className="text-gray-300">Group Balances</CardTitle>
                <CardDescription className="text-gray-400">Who owes what</CardDescription>
            </CardHeader>
            <CardContent className="p-3">
                { members?.map((member) => (
                    <BalanceAvatar key={member.user_id} member={member} balances={balRes} />
                ))}
            </CardContent>
        </Card>
    );
}