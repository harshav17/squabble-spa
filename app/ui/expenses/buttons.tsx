import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteExpense } from '@/app/lib/actions';
import { Button } from "@/app/ui/components/ui/button"
import { Link } from '../components/ui/link';


export function CreateExpense() {
  return (
    <Button
      href="/dashboard/expenses/create"
      className="flex ml-3 h-10"
      color='blue'
    >
      <PlusIcon /><span className="hidden ml-2 md:block text-gray-300">Create Expense</span>
    </Button>
  );
}

export function UpdateExpense({ id }: { id: number }) {
  return (
    <Button
      href={`/dashboard/expenses/${id}/edit`}
      className=""
      outline
    >
      <PencilIcon className="h-4 w-4" />
    </Button>
  );
}

export function DeleteExpense({ id, group_id }: { id: number, group_id: number }) {
  const deleteExpenseWithId = deleteExpense.bind(null, id, group_id);
  return (
    <>
    <form action={deleteExpenseWithId}>
      <Button color="red">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
      </Button>
    </form>
    </>
  );
}
