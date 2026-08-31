"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { createNewTask, updateTask } from "@/services/db/tasksOperations";
import { Task } from "@/db/databaseTypes";

type NewListItemProps = {
    listId: number | undefined;
    setNewItem: (value: boolean) => void;
    setTasks: React.Dispatch<React.SetStateAction<Record<number, Task>>>;
    task?: Task;
};

export default function NewListItemComponent({
    setNewItem,
    listId,
    setTasks,
    task,
}: NewListItemProps) {
    const [itemName, setItemName] = useState(task?.taskName ?? "");
    const [tagsInput, setTagsInput] = useState(task?.tags?.join(", ") ?? "");

    const isEditing = task !== undefined;

    const handleSubmit = async () => {
        if (listId === undefined) return;

        const trimmedItem = itemName.trim();

        if (!trimmedItem) return;

        const tags = tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        if (isEditing && task.id !== undefined) {
            const updatedTask: Task = {
                ...task,
                taskName: trimmedItem,
                tags: tags,
            };

            const response = await updateTask(updatedTask);

            if (!response.success || response.data === null) {
                return;
            }

            setTasks((prev) => ({
                ...prev,
                [task.id!]: response.data!,
            }));

            setNewItem(false);
            return;
        }

        const newTask: Task = {
            listId: listId,
            status: "pending",
            taskName: trimmedItem,
            tags: tags,
        };

        const response = await createNewTask(newTask);

        if (response.success && response.data) {
            setTasks((prev) => ({
                ...prev,
                [response.data!]: {
                    ...newTask,
                    id: response.data!,
                },
            }));

            setNewItem(false);
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 z-10 backdrop-blur-xs"
                onClick={() => setNewItem(false)}
            />

            <div className="fixed left-1/2 top-1/2 z-20 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-2xl p-10 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl">
                        {isEditing ? "Edit Task" : "New Item"}
                    </p>

                    <button
                        type="button"
                        className="cursor-pointer hover:rotate-45 transition"
                        onClick={() => setNewItem(false)}
                    >
                        <X />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-300">
                        Task
                    </label>

                    <textarea
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="What needs to be done?"
                        autoFocus
                        className="bg-white/20 rounded-xl min-h-20 max-h-40 px-3 py-2 outline-none resize-none placeholder:text-gray-400"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-300">
                        Tags
                    </label>

                    <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="work, important, frontend"
                        className="bg-white/20 rounded-xl px-3 py-2 outline-none placeholder:text-gray-400"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!itemName.trim()}
                    className="bg-white w-fit mx-auto text-black px-5 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isEditing ? "Update Task" : "Add Item"}
                </button>
            </div>
        </>
    );
}