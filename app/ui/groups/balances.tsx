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
        <Card className="mt-3">
            <CardHeader className="border-gray-200 border-b-2">
                <CardTitle>Group Balances</CardTitle>
                <CardDescription>Who owes what</CardDescription>
            </CardHeader>
            <CardContent>
                { members?.map((member) => (
                    <BalanceAvatar key={member.user_id} member={member} balances={balRes} />
                ))}
            </CardContent>
        </Card>
    );
}