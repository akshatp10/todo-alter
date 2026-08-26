"use client";

import SideBarHome from "@/components/homepage/sidebar";
import ListStatsComponent from "@/components/homepage/statisticsComponent";
import WokringListComponent from "@/components/homepage/workingList";

import { List, Task } from "@/db/databaseTypes";
import { getAllUserList } from "@/services/db/listOperations";
import { getAllTasksByList } from "@/services/db/tasksOperations";

import useTodoStore from "@/store/todoStore";
import useUserStore from "@/store/userStore";

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function HomePage() {
    const userId = useUserStore(
        useShallow((state) => state.userId)
    );

    const activeListId = useTodoStore(
        useShallow((state) => state.activeListId)
    );

    const [lists, setLists] = useState<Record<number, List>>({});
    const [tasks, setTasks] = useState<Record<number, Task>>({});

    useEffect(() => {
        if (userId === null) {
            return;
        }

        const fetchLists = async () => {
            const response = await getAllUserList(userId);

            if (response.success && response.data) {
                const listsById: Record<number, List> = {};

                for (const list of response.data) {
                    if (list.id !== undefined) {
                        listsById[list.id] = list;
                    }
                }

                setLists(listsById);
            }
        };

        fetchLists();
    }, [userId]);

    useEffect(() => {
        if (activeListId === null) {
            return;
        }

        const fetchAllTasks = async () => {
            const response = await getAllTasksByList(activeListId);

            if (response.success && response.data) {
                const taskById: Record<number, Task> = {};

                for (const task of response.data) {
                    if (task.id !== undefined) {
                        taskById[task.id] = task;
                    }
                }

                console.log(taskById);


                setTasks(taskById);
            }
        }

        fetchAllTasks();
    }, [activeListId]);

    const currentList =
        activeListId !== null
            ? lists[activeListId]
            : undefined;

    return (
        <div className="w-screen h-screen flex">
            {/* Sidebar */}
            <div className="flex-1 min-w-0 flex flex-col gap-4 border-r border-gray-200 bg-gray-100 p-4">
                <SideBarHome
                    lists={lists}
                    setLists={setLists}
                    activeListId={activeListId}
                    userId={userId}
                />
            </div>

            {/* Working list */}
            <div className="flex-2 min-w-0 flex flex-col p-4 overflow-y-auto">
                <WokringListComponent
                    curList={currentList}
                    setLists={setLists}
                    userId={userId}
                    tasks={tasks}
                    setTasks={setTasks}
                />
            </div>

            {/* Statistics */}
            <div className="flex-1 min-w-0 flex flex-col border-l border-gray-200 p-4">
                <ListStatsComponent />
            </div>
        </div>
    );
}