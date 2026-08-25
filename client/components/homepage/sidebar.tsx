"use client";

import { getUser } from "@/db/users";
import useTodoStore from "@/store/todoStore";
import useUserStore from "@/store/userStore";
import { TodoList } from "@/types/todo";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function SideBarHome() {

    const router = useRouter();
    const { userId, logout } = useUserStore();
    const { lists, activeListId } = useTodoStore(
        useShallow((state) => ({
            lists: state.lists,
            activeListId: state.activeListId,
        }))
    );

    const setActiveList = useTodoStore((state) => state.setActiveList);
    const addList = useTodoStore((state) => state.addList);

    const [newListName, setNewListName] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            if (userId !== null) {
                const user = await getUser(userId);
                setUserName(user?.name ?? "");
            }
        };

        fetchUser();

        // if (userId === null)
        //     router.push('/')
    }, [userId]);

    const handleNewList = () => {
        const name = newListName.trim();

        if (!name) return;

        addList(name);
        setNewListName("");
    };

    const handleLogOut = () => {
        logout();
        router.push('/')
    }

    return (
        <>
            {/* Username and signout */}
            <div className="w-full flex justify-between">
                <span className="font-bold text-xl">{userName}</span>
                <button className="scale-[0.75] cursor-pointer" onClick={() => {
                    handleLogOut()
                }}>
                    <LogOut />
                </button>
            </div>

            {/* horizontal ruling */}
            <div className="w-full border border-gray-200"></div>

            {/* List navigation and components */}
            <span className="font-bold text-gray-500">MY LISTS</span>
            <div className="text-md flex flex-col items-start gap-2 -mt-2 overflow-y-auto">

                {Object.values(lists).map((list: TodoList) => (
                    <button
                        key={list.id}
                        className={`text-[14px] px-3 cursor-pointer hover:bg-gray-200 w-full py-1 text-start rounded-md ${list.id === activeListId ? "bg-gray-200" : ""
                            }`}
                        onClick={() => setActiveList(list.id)}
                    >
                        <span className="block w-full truncate">
                            {list.listName}
                        </span>
                    </button>
                ))}

                <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
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