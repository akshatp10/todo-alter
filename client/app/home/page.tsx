"use client";

import SideBarHome from "@/components/homepage/sidebar";
import ListStatsComponent from "@/components/homepage/statisticsComponent";
import WokringListComponent from "@/components/homepage/workingList";
import { useState } from "react";

const sampleList = [
    {
        "id": 1,
        "listName": "Groceries",
        "items": [
            {
                "id": 1,
                "item_name": "Snacks",
                "status": "pending",
                "tags": ["important", "time-sensitive"]
            },
            {
                "id": 2,
                "item_name": "Vegetables",
                "status": "pending",
                "tags": ["healthy", "time-sensitive"]
            }
        ]
    },
    {
        "id": 2,
        "listName": "My Second List",
        "items": [
            {
                "id": 1,
                "item_name": "List Item 1",
                "status": "pending",
                "tags": ["important", "time-sensitive"]
            },
            {
                "id": 2,
                "item_name": "List Item 2",
                "status": "pending",
                "tags": ["healthy", "time-sensitive"]
            }, {
                "id": 3,
                "item_name": "List Item 3",
                "status": "completed",
                "tags": ["healthy"]
            }
        ]
    }
]


export default function HomePage() {

    const [currentList, setCurrentList] = useState(1)

    return (
        <>
            <div className="w-screen h-screen flex">
                <div className="flex flex-col gap-4 border-r border-gray-200 bg-gray-100 w-1/3 p-4">
                    <SideBarHome activeList={currentList} setList={setCurrentList} data={sampleList} />
                </div>
                <div className="flex flex-col w-2/3 p-4">
                    <WokringListComponent listDetails={sampleList[currentList - 1]} />
                </div>
                <div className="flex flex-col w-1/3 border-l border-gray-200 p-4">
                    <ListStatsComponent listDetails={sampleList[currentList - 1]} />
                </div>
            </div>
        </>
    );
}