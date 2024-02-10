import Breadcrumbs from "@/app/ui/breadcrumbs";
import CreateGroupForm from "@/app/ui/groups/create-form";

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: 'Create Group',
                        href: '/groups/create',
                        active: true,
                    },
                ]}
            />
            <CreateGroupForm members={[]}/>
        </main>
    )
}