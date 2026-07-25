"use client";

import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export default function SideBarHome() {

    const handleNewList = () => {
        console.log('====================================');
        console.log("Handle New List Clicked");
        console.log('====================================');
    }

    return (
        <>
            {/* Username and signout */}
            <div className="w-full flex justify-between">
                <span className="font-bold text-xl">Vignesh Kumar</span>
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

                <button className="text-gray-400 text-[14px] px-3 cursor-pointer hover:bg-gray-200 hover:text-gray-500 w-full py-1 text-start rounded-md" onClick={handleNewList}>+ New List</button>
            </div>
        </>
    );
}