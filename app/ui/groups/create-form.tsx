'use client';

import { createGroup } from "@/app/lib/actions";
import { Member } from "@/app/lib/definitions";
import { useFormState } from "react-dom";

export default function CreateGroupForm({
    members
}: {
    members: Member[];
}) {
    const initialState = { message: "", errors: {}};
    const [state, dispatch] = useFormState(createGroup, initialState);
    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-900 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Group Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="block w-full rounded-md border border-gray-200 py-2 text-sm pl-4"
                        placeholder="Group Name"
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name && 
                        state.errors.name.map((error: string) => (
                            <p key={error} className="text-red-600 text-sm">{error}</p>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Group Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="block w-full rounded-md border border-gray-200 py-2 text-sm pl-4"
                        placeholder="Group Description"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    className="flex items-center justify-center rounded-lg bg-blue-600 px-4 h-10 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Create Group
                </button>
            </div>
        </form>
    )
}