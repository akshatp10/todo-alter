"use client";

import { List } from "@/db/databaseTypes";
import { getUser } from "@/db/users";
import { createUserList } from "@/services/db/listOperations";

import useTodoStore from "@/store/todoStore";
import useUserStore from "@/store/userStore";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

interface SideBarHomeProps {
    lists: Record<number, List>;
    setLists: React.Dispatch<React.SetStateAction<Record<number, List>>>;
    userId: number | null;
    activeListId: number | null;
}

export default function SideBarHome({ lists, setLists, userId, activeListId }: SideBarHomeProps) {
    const router = useRouter();

    const { logout } = useUserStore(
        useShallow((state) => ({
            logout: state.logout,
        }))
    );

    const setActiveList = useTodoStore(
        (state) => state.setActiveList
    );

    const [newListName, setNewListName] = useState("");
    const [userName, setUserName] = useState("");

    //Function fetches username and show it on the UI
    useEffect(() => {
        if (userId === null) {
            return;
        }

        const fetchUserData = async () => {
            const user = await getUser(userId);
            setUserName(user?.name ?? "");
        };

        fetchUserData();
    }, [userId]);

    //New list is created here
    const handleNewList = async () => {
        const name = newListName.trim();

        if (!name || userId === null) {
            return;
        }

        const newList: List = {
            listName: name,
            userId,
        };

        const response = await createUserList(newList);

        if (!response.success || response.data?.id === undefined) {
            return;
        }

        const createdList: List = {
            ...newList,
            id: response.data.id,
        };

        setLists((prev) => ({ ...prev, [createdList.id!]: createdList, }));

        setNewListName("");
        setActiveList(createdList.id!);
    };


    const handleLogOut = () => {
        logout();
        setActiveList(null);
        router.push("/");
    };

    return (
        <>
            {/* Username and signout */}
            <div className="w-full flex justify-between">
                <span className="font-bold text-xl">
                    {userName}
                </span>

                <button
                    className="scale-[0.75] cursor-pointer"
                    onClick={handleLogOut}
                >
                    <LogOut />
                </button>
            </div>

            {/* Horizontal ruling */}
            <div className="w-full border border-gray-200" />

            {/* List navigation */}
            <span className="font-bold text-gray-500">
                MY LISTS
            </span>

            <div className="text-md flex flex-col items-start gap-2 -mt-2 overflow-y-auto">
                {Object.values(lists).map((list) => (
                    <button
                        key={list.id}
                        className={`text-[14px] px-3 cursor-pointer hover:bg-gray-200 w-full py-1 text-start rounded-md ${list.id === activeListId
                            ? "bg-gray-200"
                            : ""
                            }`}
                        onClick={() => {
                            setActiveList(list.id!);
                        }}
                    >
                        <span className="block w-full truncate">
                            {list.listName}
                        </span>
                    </button>
                ))}

                {/* New List */}
                <input
                    type="text"
                    value={newListName}
                    onChange={(e) =>
                        setNewListName(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleNewList();
                        }
                    }}
                    placeholder="+ New List"
                    className="text-gray-400 text-[14px] px-3 cursor-text hover:bg-gray-200 hover:text-gray-500 w-full py-1 text-start rounded-md outline-none"
                />
            </div>
        </>
    );
}