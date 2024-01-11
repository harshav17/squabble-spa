import { CreateExpense } from "@/app/ui/expenses/buttons";
import ExpensesTable from "@/app/ui/expenses/table";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2">
                <CreateExpense />
            </div>
            <ExpensesTable groupID={id} currentPage={1} />
        </div>
    )
}