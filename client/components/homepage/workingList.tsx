"use client";

import { Pencil, Plus } from "lucide-react";
import NewListItemComponent from "./newList";
import { useState } from "react";

export default function WokringListComponent({ listDetails }: any) {
    const [newItem, setNewItem] = useState(false)
    const handleClickNewItem = () => {
        setNewItem(true)
    }

    const listDetail = listDetails

    return (
        <>
            {/* Enter a new item */}
            {newItem && <NewListItemComponent setNewItem={setNewItem} />}


            {/* Top Title and New Item */}
            <div className="flex w-full justify-between p-3">
                <div className="text-3xl font-bold flex gap-4 items-center"> {listDetail.listName} <Pencil width={20} className="mt-1 text-gray-500" /></div>
                <button className="bg-black text-white px-4 cursor-pointer flex justify-center items-center gap-2 rounded-md" onClick={handleClickNewItem}>
                    <Plus className="w-3.5" /> New Task
                </button>
            </div>

            {/* Showing the list items */}
            {listDetail.items.map((item: any) => (
                <div className="flex w-full gap-2 py-10 border-b border-gray-200" key={item.id}>
                    <div className="w-[5%] flex justify-end">
                        <input type="checkbox" name="checkTask" defaultChecked={item.status === "completed"} />
                    </div>
                    <div className="flex flex-col w-[95%]">
                        {item.item_name}
                        <div className="flex text-xs">
                            {item.tags.map((tag: any) => (
                                <span className="bg-gray-100 px-2 mr-2 rounded-xs" key={tag}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}