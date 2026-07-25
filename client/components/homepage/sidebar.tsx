"use client";

import { LogOut } from "lucide-react";

export default function SideBarHome() {
    return (
        <>
            {/* Username and signout */}
            <div className="w-full flex justify-between">
                <span className="font-bold text-xl">Vignesh Kumar</span>
                <button className="scale-[0.75] cursor-pointer">
                    <LogOut />
                </button>
            </div>

            {/* horizontal ruling */}
            <div className="w-full border border-gray-200"></div>

            {/* List navigation and components */}
            <div className="text-md">
                <span className="font-bold text-gray-500">MY LISTS</span>

            </div>
        </>
    );
}