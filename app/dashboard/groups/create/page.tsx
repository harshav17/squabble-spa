import Breadcrumbs from "@/app/ui/breadcrumbs";
import CreateGroupForm from "@/app/ui/groups/create-form";

export default async function Page() {
    return (
        <>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: 'Create Group',
                        href: '/dashboard/groups/create',
                        active: true,
                    },
                ]}
            />
            <CreateGroupForm members={[]}/>
        </>
    )
}