"use client";

import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

interface propDetails {
    activeList: any,
    setList: any,
    data: any
}

export default function SideBarHome({ activeList, setList, data }: propDetails) {

    const handleNewList = () => {
        console.log('====================================');
        console.log("Handle New List Clicked");
        console.log('====================================');
    }

    return (
        <>
            {/* Username and signout */}
            <div className="w-full flex justify-between">
                <span className="font-bold text-xl">Akshat Pratyush</span>
                <button className="scale-[0.75] cursor-pointer" onClick={() => {
                    redirect("/")
                }}>
                    <LogOut />
                </button>
            </div>

            {/* horizontal ruling */}
            <div className="w-full border border-gray-200"></div>

            {/* List navigation and components */}
            <div className="text-md flex flex-col items-start gap-2">
                <span className="font-bold text-gray-500">MY LISTS</span>

                {data.map((list: any) => (
                    <button key={list.id} className={`text-[14px] px-3 cursor-pointer hover:bg-gray-200 w-full py-1 text-start rounded-md ${list.id === activeList ? "bg-gray-200" : ""}`}
                        onClick={() => { setList(list.id) }}>
                        {list.listName}
                    </button>
                ))}

                <button className="text-gray-400 text-[14px] px-3 cursor-pointer hover:bg-gray-200 hover:text-gray-500 w-full py-1 text-start rounded-md" onClick={handleNewList}>+ New List</button>
            </div>
        </>
    );
}