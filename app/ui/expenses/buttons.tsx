import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteExpense } from '@/app/lib/actions';
import { Button, buttonVariants } from "@/app/ui/components/ui/button"


export function CreateExpense() {
  return (
    <Link
      href="/expenses/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <PlusIcon className="h-5 mr-2"/><span className="hidden md:block">Create Expense</span>
    </Link>
  );
}

export function UpdateExpense({ id }: { id: number }) {
  return (
    <Link
      href={`/expenses/${id}/edit`}
      className={buttonVariants({ variant: "outline" })}
    >
      <PencilIcon className="h-4 w-4" />
    </Link>
  );
}

export function DeleteExpense({ id, group_id }: { id: number, group_id: number }) {
  const deleteExpenseWithId = deleteExpense.bind(null, id, group_id);
  return (
    <>
    <form action={deleteExpenseWithId}>
      <Button variant="destructive">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
      </Button>
    </form>
    </>
  );
}
