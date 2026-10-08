"use client";

import { Delete, Pencil, Plus, SquarePen } from "lucide-react";
import NewListItemComponent from "./newList";
import { useState } from "react";
import { updateUserList } from "@/services/db/listOperations";
import { List, Task } from "@/db/databaseTypes";
import { deleteTask, updateTask } from "@/services/db/tasksOperations";

interface WokringListComponentProps {
	curList: List | undefined;
	setLists: React.Dispatch<React.SetStateAction<Record<number, List>>>;
	userId: number | null;
	tasks: Record<number, Task>;
	setTasks: React.Dispatch<React.SetStateAction<Record<number, Task>>>;
}

export default function WokringListComponent(props: WokringListComponentProps) {
	const { curList, setLists, userId, tasks, setTasks } = { ...props };

	const [updateState, setUpdateState] = useState(false);
	const [newTitle, setNewTitle] = useState("");

	const [editTaskOpen, seteditTaskOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

	const mappedTasks = Object.values(tasks);

	const handleClickNewItem = () => {
		setEditingTask(undefined);
		seteditTaskOpen(true);
	};

	const handleUpdateTitle = async () => {
		if (userId === null || curList === undefined) return;

		if (!newTitle.trim()) return;

		const updatedList: List = {
			...curList,
			listName: newTitle.trim(),
		};

		const updateListResponse = await updateUserList(updatedList);

		if (updateListResponse.success === true) {
			setLists((prev) => ({
				...prev,
				[curList.id!]: updatedList,
			}));

			setUpdateState(false);
		}
	};

	const handleToggleTask = async (taskId: number) => {
		const task = tasks[taskId];

		if (!task) {
			return;
		}

		const newUpdatedTask: Task = {
			...task,
			status: task.status === "completed" ? "pending" : "completed",
		};

		const response = await updateTask(newUpdatedTask);

		if (!response.success || response.data === null) {
			return;
		}

		const updatedTaskFromDb = response.data;

		setTasks((prev) => ({
			...prev,
			[taskId]: updatedTaskFromDb,
		}));
	};

	const handleTaskDelete = async (taskId: number | undefined) => {
		if (taskId === undefined) return;

		const response = await deleteTask(taskId);

		if (response.success) {
			setTasks((prev) => {
				const { [taskId]: _, ...remainingTasks } = prev;
				return remainingTasks;
			});
		}
	};

	const handleUpdateTask = (taskId: number | undefined) => {
		if (taskId === undefined) return;

		const task = tasks[taskId];

		if (!task) return;

		setEditingTask(task);
		seteditTaskOpen(true);
	};

	if (curList === undefined)
		return (
			<>
				<div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
					<p className="text-2xl font-semibold tracking-tight text-gray-900">
						No Lists Selected
					</p>
					<p className="mt-1 text-sm text-gray-400">
						Please create/select a list
					</p>
				</div>
			</>
		);

	return (
		<>
			{editTaskOpen && (
				<NewListItemComponent
					setNewItem={seteditTaskOpen}
					listId={curList.id}
					setTasks={setTasks}
					task={editingTask}
				/>
			)}

			<div className="flex w-full min-w-0 items-center justify-between border-b border-gray-200 pb-5">
				<div className="flex min-w-0 flex-1 items-center gap-2">
					{!updateState ? (
						<span className="min-w-0 truncate text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{curList.listName}
						</span>
					) : (
						<input
							type="text"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleUpdateTitle();
								}

								if (e.key === "Escape") {
									setUpdateState(false);
								}
							}}
							autoFocus
							className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-2xl font-bold outline-none ring-0 focus:border-gray-500 sm:text-3xl"
						/>
					)}

					<button
						className="shrink-0 cursor-pointer rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
						onClick={() => {
							setNewTitle(curList.listName ?? "");
							setUpdateState(!updateState);
						}}
					>
						<Pencil width={18} className="mt-0.5" />
					</button>
				</div>

				<button
					className="ml-4 flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-black px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
					onClick={handleClickNewItem}
				>
					<Plus className="w-3.5" />
					New Task
				</button>
			</div>

			{mappedTasks.length > 0 ? (
				<div className="divide-y divide-gray-200">
					{mappedTasks.map((task: Task) => (
						<div
							className="group flex w-full gap-3 py-5"
							key={task?.id}
						>
							<div className="shrink-0 pt-0.5">
								<input
									type="checkbox"
									name="checkTask"
									checked={task.status === "completed"}
									onChange={() => handleToggleTask(task.id!)}
									className="h-4 w-4 cursor-pointer accent-black"
								/>
							</div>

							<div className="flex min-w-0 flex-1 justify-between gap-4">
								<div className="min-w-0 flex-1">
									<div className="flex items-start gap-1.5">
										<span
											className={`block wrap-break-word text-sm font-medium leading-5 ${
												task.status === "completed"
													? "text-gray-400 line-through"
													: "text-gray-800"
											}`}
										>
											{task?.taskName}
										</span>

										<button
											type="button"
											onClick={() =>
												handleUpdateTask(task.id)
											}
											className="shrink-0 cursor-pointer rounded-md p-1 text-gray-300 opacity-0 transition-all hover:bg-gray-100 hover:text-gray-700 group-hover:opacity-100"
										>
											<SquarePen size={14} />
										</button>
									</div>

									<div className="mt-2 flex flex-wrap gap-1.5 text-xs">
										{task.tags.map((tag: string) => (
											<span
												className="rounded-md bg-gray-100 px-2 py-1 text-gray-500"
												key={tag}
											>
												#{tag}
											</span>
										))}
									</div>
								</div>

								<button
									type="button"
									className="shrink-0 cursor-pointer rounded-md p-1.5 text-gray-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
									onClick={() => handleTaskDelete(task.id)}
								>
									<Delete size={16} />
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
					<p className="text-2xl font-semibold tracking-tight text-gray-900">
						No Tasks added
					</p>
					<p className="mt-1 text-sm text-gray-400">
						Add tasks to the list
					</p>
				</div>
			)}
		</>
	);
}
