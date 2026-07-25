import SideBarHome from "@/components/homepage/sidebar";
import ListStatsComponent from "@/components/homepage/statisticsComponent";
import WokringListComponent from "@/components/homepage/workingList";

export default function HomePage() {
    return (
        <>
            <div className="w-screen h-screen flex">
                <div className="flex flex-col gap-4 border-r border-gray-200 bg-gray-100 w-1/3 p-4">
                    <SideBarHome />
                </div>
                <div className="flex flex-col w-2/3 p-4">
                    <WokringListComponent />
                </div>
                <div className="flex flex-col w-1/3 border-l border-gray-200 p-4">
                    <ListStatsComponent />
                </div>
            </div>
        </>
    );
}