"use client";

import { Delete, Pencil, Plus, SquarePen } from "lucide-react";
import NewListItemComponent from "./newList";
import { useState } from "react";
import { updateUserList } from "@/services/db/listOperations";
import { List, Task } from "@/db/databaseTypes";
import { deleteTask, updateTask } from "@/services/db/tasksOperations";

interface WokringListComponentProps {
    curList: List | undefined;
    setLists: React.Dispatch<React.SetStateAction<Record<number, List>>>;
    userId: number | null;
    tasks: Record<number, Task>;
    setTasks: React.Dispatch<React.SetStateAction<Record<number, Task>>>;
}

export default function WokringListComponent(
    props: WokringListComponentProps
) {
    const { curList, setLists, userId, tasks, setTasks } = { ...props };

    const [updateState, setUpdateState] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const [editTaskOpen, seteditTaskOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(
        undefined
    );

    const mappedTasks = Object.values(tasks);

    const handleClickNewItem = () => {
        setEditingTask(undefined);
        seteditTaskOpen(true);
    };

    const handleUpdateTitle = async () => {
        if (userId === null || curList === undefined) return;

        if (!newTitle.trim()) return;

        const updatedList: List = {
            ...curList,
            listName: newTitle.trim(),
        };

        const updateListResponse = await updateUserList(updatedList);

        if (updateListResponse.success === true) {
            setLists((prev) => ({
                ...prev,
                [curList.id!]: updatedList,
            }));

            setUpdateState(false);
        }
    };

    const handleToggleTask = async (taskId: number) => {
        const task = tasks[taskId];

        if (!task) {
            return;
        }

        const newUpdatedTask: Task = {
            ...task,
            status:
                task.status === "completed"
                    ? "pending"
                    : "completed",
        };

        const response = await updateTask(newUpdatedTask);

        if (!response.success || response.data === null) {
            return;
        }

        const updatedTaskFromDb = response.data;

        setTasks((prev) => ({
            ...prev,
            [taskId]: updatedTaskFromDb,
        }));
    };

    const handleTaskDelete = async (taskId: number | undefined) => {
        if (taskId === undefined) return;

        const response = await deleteTask(taskId);

        if (response.success) {
            setTasks((prev) => {
                const { [taskId]: _, ...remainingTasks } = prev;
                return remainingTasks;
            });
        }
    };

    const handleUpdateTask = (taskId: number | undefined) => {
        if (taskId === undefined) return;

        const task = tasks[taskId];

        if (!task) return;

        setEditingTask(task);
        seteditTaskOpen(true);
    };

    if (curList === undefined)
        return (
            <>
                <div className="flex items-center justify-center py-16 text-sm text-gray-400 flex-col">
                    <p className="text-2xl text-black">
                        No Lists Selected
                    </p>
                    <p>Please create/select a list</p>
                </div>
            </>
        );

    return (
        <>
            {editTaskOpen && (
                <NewListItemComponent
                    setNewItem={seteditTaskOpen}
                    listId={curList.id}
                    setTasks={setTasks}
                    task={editingTask}
                />
            )}

            <div className="flex w-full min-w-0 justify-between p-3">
                <div className="text-3xl font-bold flex flex-1 min-w-0 gap-2 items-center">
                    {!updateState ? (
                        <span className="min-w-0 truncate">
                            {curList.listName}
                        </span>
                    ) : (
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) =>
                                setNewTitle(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleUpdateTitle();
                                }

                                if (e.key === "Escape") {
                                    setUpdateState(false);
                                }
                            }}
                            autoFocus
                        />
                    )}

                    <button
                        className="shrink-0 cursor-pointer"
                        onClick={() => {
                            setNewTitle(curList.listName ?? "");
                            setUpdateState(!updateState);
                        }}
                    >
                        <Pencil
                            width={20}
                            className="mt-1 text-gray-500"
                        />
                    </button>
                </div>

                <button
                    className="shrink-0 bg-black text-white px-4 cursor-pointer flex justify-center items-center gap-2 rounded-md"
                    onClick={handleClickNewItem}
                >
                    <Plus className="w-3.5" />
                    New Task
                </button>
            </div>

            {mappedTasks.length > 0 ? (
                mappedTasks.map((task: Task) => (
                    <div
                        className="flex w-full gap-3 py-6 border-b border-gray-200"
                        key={task?.id}
                    >
                        <div className="shrink-0 pt-1">
                            <input
                                type="checkbox"
                                name="checkTask"
                                checked={
                                    task.status === "completed"
                                }
                                onChange={() =>
                                    handleToggleTask(task.id!)
                                }
                                className="h-4 w-4 cursor-pointer accent-black"
                            />
                        </div>

                        <div className="flex-1 flex justify-between gap-4 min-w-0">
                            <div className="min-w-0 flex-1">
                                <div className="flex items-start gap-2">
                                    <span
                                        className={`block wrap-break-word text-sm font-medium ${task.status === "completed"
                                            ? "line-through text-gray-400"
                                            : "text-gray-800"
                                            }`}
                                    >
                                        {task?.taskName}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleUpdateTask(task.id)
                                        }
                                        className="shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        <SquarePen size={15} />
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-2 text-xs">
                                    {task.tags.map((tag: string) => (
                                        <span
                                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                                            key={tag}
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="shrink-0 p-1.5 rounded-md text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors cursor-pointer"
                                onClick={() =>
                                    handleTaskDelete(task.id)
                                }
                            >
                                <Delete size={17} />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex items-center justify-center py-16 text-sm text-gray-400 flex-col">
                    <p className="text-2xl text-black">
                        No Tasks added
                    </p>
                    <p>Add tasks to the list</p>
                </div>
            )}
        </>
    );
}