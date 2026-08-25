"use client";

import { Pencil, Plus } from "lucide-react";
import NewListItemComponent from "./newList";
import { useState } from "react";
import useTodoStore from "@/store/todoStore";
import { Task } from "@/types/todo";

export default function WokringListComponent() {
    const [newItem, setNewItem] = useState(false)
    const [updateState, setupdateState] = useState(false)
    const handleClickNewItem = () => {
        setNewItem(true)
    }

    const { lists, activeListId, toggleTask, updateListTitle } = useTodoStore();

    const currentList = lists[activeListId!]
    const [newTitle, setNewTitle] = useState<string>("")

    const handleUpdateTitle = () => {
        if (!newTitle.trim() || !currentList) return;

        updateListTitle(newTitle.trim());
        setupdateState(false);
    };

    if (activeListId === null)
        return (
            <>
                <div className="flex items-center justify-center py-16 text-sm text-gray-400 flex-col">
                    <p className="text-2xl text-black">No Lists Present</p>
                    <p>Please create a list</p>
                </div>
            </>
        )

    return (
        <>
            {/* Enter a new item */}
            {newItem && <NewListItemComponent setNewItem={setNewItem} />}


            {/* Top Title and New Item */}
            <div className="flex w-full min-w-0 justify-between p-3">

                <div className="text-3xl font-bold flex flex-1 min-w-0 gap-2 items-center">
                    {!updateState ?
                        <span className="min-w-0 truncate">
                            {currentList?.listName}
                        </span> :
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleUpdateTitle();
                            }
                        }} />
                    }
                    {/* {currentList?.listName} */}
                    <button className="shrink-0" onClick={() => { setupdateState(!updateState) }}>
                        <Pencil width={20} className="mt-1 text-gray-500" />
                    </button>
                </div>
                <button className="shrink-0 bg-black text-white px-4 cursor-pointer flex justify-center items-center gap-2 rounded-md" onClick={handleClickNewItem}>
                    <Plus className="w-3.5" /> New Task
                </button>
            </div >

            {/* Showing the list items */}
            {
                currentList?.items?.length > 0 ? currentList.items.map((item: Task) => (
                    <div className="flex w-full gap-2 py-10 border-b border-gray-200" key={item.id}>
                        <div className="shrink-0">
                            <input type="checkbox" name="checkTask"
                                checked={item.status === "completed"}
                                onChange={() => toggleTask(item.id)}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="block w-full wrap-break-word">
                                {item.item_name}
                            </span>
                            <div className="flex flex-wrap gap-1.5 text-xs">
                                {item.tags.map((tag: string) => (
                                    <span className="bg-gray-100 px-2 mr-2 rounded-xs truncate" key={tag}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )) : <div className="flex items-center justify-center py-16 text-sm text-gray-400 flex-col">
                    <p className="text-2xl text-black">No Tasks added</p>
                    <p>Add tasks to the list</p>
                </div>
            }
        </>
    );
}