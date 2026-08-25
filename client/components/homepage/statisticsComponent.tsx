"use client";

import useTodoStore from "@/store/todoStore";
import { useEffect, useState } from "react";

export default function ListStatsComponent() {

    const { lists, activeListId } = useTodoStore();

    const [publicAccess, setPublicAccess] = useState<boolean>(false)
    const activeList = lists.find((list) => list.id === activeListId);

    const items = activeList?.items ?? [];

    const totalTasks = items.length;
    const pendingTasks = items.filter(
        (item) => item.status === "pending"
    ).length;
    const completedTasks = totalTasks - pendingTasks;

    useEffect(() => {
        setPublicAccess(false);
    }, [activeListId]);

    const tagCounts = items.reduce<Record<string, number>>(
        (acc, item) => {
            item.tags.forEach((tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
            });

            return acc;
        },
        {}
    );

    return (
        <>
            <div className="h-[90%]">
                {/* List Statistics */}
                <span className="font-bold text-gray-500 text-md">LIST STATISTICS</span>

                <div className="flex flex-col gap-2 p-3 font-semibold">
                    <div className="flex justify-between">
                        <p>Total Tasks</p>
                        <p>{totalTasks}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Pending</p>
                        <p className="text-red-500">{pendingTasks}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Completed</p>
                        <p className="text-green-500">{completedTasks}</p>
                    </div>
                </div>

                {/* horizontal ruling */}
                <div className="w-full border border-gray-200"></div>

                {/* Tags */}
                <div className="flex flex-col gap-2 p-3 font-semibold text-gray-400">
                    {Object.entries(tagCounts).map(([tag, count]) => (
                        <div className="flex justify-between" key={tag}>
                            <p>#{tag}</p>
                            <p className="text-black">{count}</p>
                        </div>))}

                    <div className="flex justify-between">
                        <p>No Tag</p>
                        <p className="text-black">
                            {items.filter((item) => item.tags.length === 0).length}
                        </p>
                    </div>
                </div>
            </div>

            {publicAccess ?
                <div className="flex flex-col py-4 border-t border-gray-200 gap-2">
                    <span className="font-bold text-gray-500 text-md">PUBLIC ACCESS</span>
                    <div className="bg-gray-200 text-xs p-2 max-h-20 rounded-md">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit natus atque amet, explicabo aspernatur eius temporibus odio mollitia omnis, velit, vel nostrum. Impedit magni dolores autem, veniam laudantium neque accusamus.</div>
                    <button className="mx-auto w-full border py-1 rounded-md border-gray-200 cursor-pointer" onClick={() => {
                        navigator.clipboard.writeText("Copying the data to clipboard")
                    }}>Copy Public Link</button>
                    <button className="mx-auto w-full text-red-500 bg-red-50 border py-1 rounded-md border-gray-200 cursor-pointer" onClick={() => { setPublicAccess(false) }}>Revoke Access</button>
                </div>
                :
                <div className="flex flex-col py-4 border-t border-gray-200 gap-2">
                    <span className="font-bold text-gray-500 text-md">PUBLIC ACCESS</span>
                    <button className="mx-auto w-full text-green-500 bg-green-50 border py-1 rounded-md border-gray-200 cursor-pointer" onClick={() => { setPublicAccess(true) }}>Give Public Access</button>
                </div>
            }
        </>
    );
}