"use client";

import { X } from "lucide-react";
import { useState } from "react";
import useTodoStore from "@/store/todoStore";
import { createNewTask } from "@/services/db/tasksOperations";
import { Task } from "@/db/databaseTypes";

type NewListItemProps = {
    listId: number | undefined
    setNewItem: (value: boolean) => void;
    setTasks: React.Dispatch<React.SetStateAction<Record<number, Task>>>;
};

export default function NewListItemComponent({
    setNewItem, listId, setTasks
}: NewListItemProps) {
    const [itemName, setItemName] = useState("");
    const [tagsInput, setTagsInput] = useState("");

    const handleAddItem = async () => {

        if (listId === undefined) return;

        const trimmedItem = itemName.trim();

        if (!trimmedItem) return;

        const tags = tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        const task: Task = {
            listId: listId,
            status: "pending",
            taskName: trimmedItem,
            tags: tags
        }

        const response = await createNewTask(task)

        if (response.success && response.data) {
            setTasks((prev) => ({ ...prev, [response.data!]: { ...task, id: response.data! }, }));
            setNewItem(false);
        }

    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-10 backdrop-blur-xs"
                onClick={() => setNewItem(false)}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 z-20 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-2xl p-10 flex flex-col gap-5">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl">
                        New Item
                    </p>

                    <button
                        type="button"
                        className="cursor-pointer hover:rotate-45 transition"
                        onClick={() => setNewItem(false)}
                    >
                        <X />
                    </button>
                </div>

                {/* Task */}
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

                {/* Tags */}
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

                {/* Add */}
                <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={!itemName.trim()}
                    className="bg-white w-fit mx-auto text-black px-5 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add Item
                </button>
            </div>
        </>
    );
}