"use client";

import { Pencil, Plus } from "lucide-react";

export default function WokringListComponent() {

    const handleClickNewItem = () => {
        console.log('====================================');
        console.log("Handle New Item Clicked");
        console.log('====================================');
    }

    return (
        <>
            {/* Top Title and New Item */}
            <div className="flex w-full justify-between p-3">
                <div className="text-3xl font-bold flex gap-4 items-center">Groceries <Pencil width={20} className="mt-1 text-gray-500" /></div>
                <button className="bg-black text-white px-4 cursor-pointer flex justify-center items-center gap-2 rounded-md" onClick={handleClickNewItem}>
                    <Plus className="w-3.5" /> New Task
                </button>
            </div>

            {/* Showing the list items */}
            <div className="flex w-full gap-2 py-10 border-b border-gray-200">
                <div className="w-[5%] flex justify-end">
                    <input type="checkbox" name="checkTask" id="" />
                </div>
                <div className="flex flex-col w-[95%]">
                    Snacks
                    <div className="flex text-xs">
                        <span className="bg-gray-100 px-2 mr-2 rounded-xs">
                            #important
                        </span>
                        <span className="bg-gray-100 px-2 mr-2 rounded-xs">
                            #time-sensitive
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}