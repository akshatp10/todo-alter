"use client";

import SideBarHome from "@/components/homepage/sidebar";
import ListStatsComponent from "@/components/homepage/statisticsComponent";
import WokringListComponent from "@/components/homepage/workingList";


export default function HomePage() {

    return (
        <>
            <div className="w-screen h-screen flex">
                <div className="flex-1 min-w-0 flex flex-col gap-4 border-r border-gray-200 bg-gray-100 p-4">
                    <SideBarHome />
                </div>

                <div className="flex-2 min-w-0 flex flex-col p-4 overflow-y-auto">
                    <WokringListComponent />
                </div>

                <div className="flex-1 min-w-0 flex flex-col border-l border-gray-200 p-4">
                    <ListStatsComponent />
                </div>
            </div>
        </>
    );
}