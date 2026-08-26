"use client";

import { List } from "@/db/databaseTypes";
import { getUser } from "@/db/users";
import { createUserList, getAllUserList } from "@/services/db/listOperations";
import useTodoStore from "@/store/todoStore";
import useUserStore from "@/store/userStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function SideBarHome() {

    const router = useRouter();
    const { userId, logout } = useUserStore(useShallow((state) => ({ userId: state.userId, logout: state.logout })));
    const { activeListId } = useTodoStore(
        useShallow((state) => ({
            activeListId: state.activeListId,
        }))
    );

    const setActiveList = useTodoStore((state) => state.setActiveList);

    const [newListName, setNewListName] = useState("");
    const [userName, setUserName] = useState("");
    const [allLists, setAllLists] = useState<List[]>([]);

    //Fetching user name from userID and Fetching all the Lists present in the db on user change
    const fetchUser = async (userId: number) => {
        const user = await getUser(userId);
        setUserName(user?.name ?? "");
    };

    const fetchAllLists = async (userId: number) => {
        const userLists = await getAllUserList(userId);

        if (userLists.success) {
            setAllLists(userLists.data ?? []);
        }
    };


    //useEffect to fetch the user's data ie name and lists from db when component renders and user changes
    useEffect(() => {
        if (userId === null) return;

        const fetchUserData = async () => {
            await Promise.all([
                fetchUser(userId),
                fetchAllLists(userId),
            ]);
        };

        fetchUserData();

        // if (userId === null)
        //     router.push('/')
    }, [userId]);

    //Creating a new list
    const handleNewList = async () => {
        const name = newListName.trim();

        if (!name) return;
        if (userId === null) return;

        const newList: List = { listName: name, userId: userId }

        const createListResponse = await createUserList(newList);

        if (createListResponse.success === true) {
            if (createListResponse.data?.id === undefined) return;
            setNewListName("");
            setActiveList(createListResponse.data?.id)
            // if (createListResponse.data?.id)
            setAllLists((prev) => [...prev, { ...newList, id: createListResponse.data?.id },]);
        }

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

                {allLists.map((list: List) => (
                    <button
                        key={list.id}
                        className={`text-[14px] px-3 cursor-pointer hover:bg-gray-200 w-full py-1 text-start rounded-md ${list.id === activeListId ? "bg-gray-200" : ""
                            }`}
                        onClick={() => setActiveList(list.id!)}
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