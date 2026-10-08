"use client";

import { Task } from "@/db/databaseTypes";
import { useState } from "react";

interface ListStatComponentProps {
	tasks: Record<number, Task>;
}

export default function ListStatsComponent({ tasks }: ListStatComponentProps) {
	const [publicAccess, setPublicAccess] = useState<boolean>(false);

	const items = Object.values(tasks);

	const totalTasks = items.length;
	const pendingTasks = items.filter(
		(item) => item.status === "pending",
	).length;
	const completedTasks = totalTasks - pendingTasks;

	const tagCounts = items.reduce<Record<string, number>>((acc, item) => {
		item.tags.forEach((tag) => {
			acc[tag] = (acc[tag] || 0) + 1;
		});

		return acc;
	}, {});

	return (
		<>
			{/* List Statistics */}
			<div className="shrink-0">
				<span className="text-xs font-bold tracking-wider text-gray-400">
					LIST STATISTICS
				</span>

				<div className="mt-4 space-y-1 rounded-lg border border-gray-200 bg-white p-3 text-sm">
					<div className="flex items-center justify-between px-2 py-2">
						<p className="text-gray-500">Total Tasks</p>
						<p className="font-semibold text-gray-900">
							{totalTasks}
						</p>
					</div>

					<div className="flex items-center justify-between px-2 py-2">
						<p className="text-gray-500">Pending</p>
						<p className="font-semibold text-red-500">
							{pendingTasks}
						</p>
					</div>

					<div className="flex items-center justify-between px-2 py-2">
						<p className="text-gray-500">Completed</p>
						<p className="font-semibold text-green-500">
							{completedTasks}
						</p>
					</div>
				</div>
			</div>

			{/* horizontal ruling */}
			<div className="my-5 w-full border-t border-gray-200"></div>

			{/* Tags */}
			<div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
				<span className="mb-2 text-xs font-bold tracking-wider text-gray-400">
					TAGS
				</span>

				{Object.entries(tagCounts).map(([tag, count]) => (
					<div
						className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-100"
						key={tag}
					>
						<p className="truncate text-gray-500">#{tag}</p>
						<p className="ml-3 shrink-0 font-medium text-gray-900">
							{count}
						</p>
					</div>
				))}

				<div className="flex items-center justify-between rounded-md px-2 py-2 text-sm">
					<p className="text-gray-500">No Tag</p>
					<p className="font-medium text-gray-900">
						{items.filter((item) => item.tags.length === 0).length}
					</p>
				</div>
			</div>

			<div className="mt-5 flex shrink-0 flex-col items-center gap-5">
				<ins
					className="adsbyadgeist"
					style={{
						display: "inline-block",
						width: 400,
						height: 400,
						fontFamily: "Arial",
						color: "#63aa75",
					}}
					data-ad-slot="6ac63a423741c8e66ba98ed3"
				/>

				<div className="flex w-full flex-col gap-3 border-t border-gray-200 pt-5">
					<span className="text-xs font-bold tracking-wider text-gray-400">
						PUBLIC ACCESS
					</span>

					{publicAccess && (
						<>
							<div className="max-h-20 overflow-y-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-relaxed text-gray-500">
								Lorem ipsum dolor, sit amet consectetur
								adipisicing elit. Sit natus atque amet,
								explicabo aspernatur eius temporibus odio
								mollitia omnis, velit, vel nostrum. Impedit
								magni dolores autem, veniam laudantium neque
								accusamus.
							</div>

							<button
								className="w-full cursor-pointer rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
								onClick={() => {
									navigator.clipboard.writeText(
										"Copying the data to clipboard",
									);
								}}
							>
								Copy Public Link
							</button>
						</>
					)}

					<button
						className={`w-full cursor-pointer rounded-md border py-2 text-sm font-medium transition-colors ${
							publicAccess
								? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
								: "border-green-200 bg-green-50 text-green-500 hover:bg-green-100"
						}`}
						onClick={() => {
							setPublicAccess(!publicAccess);
						}}
					>
						{publicAccess ? "Revoke Access" : "Give Public Access"}
					</button>
				</div>
			</div>
		</>
	);
}
