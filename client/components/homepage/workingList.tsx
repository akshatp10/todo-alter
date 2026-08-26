"use client";

import { Pencil, Plus } from "lucide-react";
import NewListItemComponent from "./newList";
import { useState } from "react";
import useTodoStore from "@/store/todoStore";
import { updateUserList } from "@/services/db/listOperations";
import { List, Task } from "@/db/databaseTypes";

interface WokringListComponentProps {
    curList: List | undefined;
    setLists: React.Dispatch<React.SetStateAction<Record<number, List>>>;
    userId: number | null;
}

export default function WokringListComponent(props: WokringListComponentProps) {

    const { curList, setLists, userId } = { ...props }

    const [newItem, setNewItem] = useState(false)
    const [updateState, setupdateState] = useState(false)
    const handleClickNewItem = () => {
        setNewItem(true)

    }
    const toggleTask = useTodoStore(
        (state) => state.toggleTask
    );

    const [tasks, setTasks] = useState<Task[]>([])

    const [newTitle, setNewTitle] = useState<string>("")

    //Updating the list title and implementing it to the parent local state along with saving in db
    const handleUpdateTitle = async () => {
        if (userId === null || curList === undefined) return

        if (!newTitle.trim()) return;

        const updatedList: List = {
            ...curList,
            listName: newTitle.trim(),
        }

        const updateListResponse = await updateUserList(updatedList)

        if (updateListResponse.success === true) {
            setLists((prev) => ({ ...prev, [curList.id!]: updatedList, }));
            setupdateState(false);
        }
    };

    if (curList === undefined)
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
                            {curList.listName}
                        </span> :
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleUpdateTitle();
                            }
                        }} />
                    }
                    {/* {currentList?.listName} */}
                    <button className="shrink-0" onClick={() => {
                        setNewTitle(curList.listName ?? "")
                        setupdateState(!updateState)
                    }}>
                        <Pencil width={20} className="mt-1 text-gray-500" />
                    </button>
                </div>
                <button className="shrink-0 bg-black text-white px-4 cursor-pointer flex justify-center items-center gap-2 rounded-md" onClick={handleClickNewItem}>
                    <Plus className="w-3.5" /> New Task
                </button>
            </div >

            {/* Showing the list items */}
            {
                tasks.length > 0 ? tasks.map((item: Task) => (
                    <div className="flex w-full gap-2 py-10 border-b border-gray-200" key={item.id}>
                        <div className="shrink-0">
                            <input type="checkbox" name="checkTask"
                                checked={item.status === "completed"}
                                onChange={() => toggleTask(item.id!)}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="block w-full wrap-break-word">
                                {item.taskName}
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