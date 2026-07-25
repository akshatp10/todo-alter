"use client";

import { X } from "lucide-react";

export default function NewListItemComponent({ setNewItem }) {
    return (
        <>
            <div className="absolute w-full h-full backdrop-blur-xs left-0 top-0" />
            <div className="absolute w-1/2 min-h-40 bg-black z-10 translate-y-44 text-white rounded-2xl p-10 flex flex-col gap-5">
                <div className="flex justify-between">
                    <p className="font-bold text-2xl">New Item</p>
                    <button className="cursor-pointer hover:rotate-45 transition" onClick={() => { setNewItem(false) }}>
                        <X />
                    </button>
                </div>
                <textarea name="newItem" id="" className="bg-white/20 rounded-2xl min-h-20 max-h-40 px-2.5 py-1.5"></textarea>
                <button
                    className="bg-white w-fit items-center justify-center mx-auto text-black px-4 py-2 rounded-md cursor-pointer"
                    onClick={() => { setNewItem(false) }}
                >Add Item</button>
            </div>
        </>
    );
}