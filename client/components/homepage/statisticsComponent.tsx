"use client";

export default function ListStatsComponent({ listDetails }: any) {
    return (
        <>
            <div className="h-[90%]">
                {/* List Statistics */}
                <span className="font-bold text-gray-500 text-md">LIST STATISTICS</span>

                <div className="flex flex-col gap-2 p-3 font-semibold">
                    <div className="flex justify-between">
                        <p>Total Tasks</p>
                        <p>{listDetails.items.length}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Pending</p>
                        <p className="text-red-500">{listDetails.items.filter((item: { status: string; }) => item.status === "pending").length}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Completed</p>
                        <p className="text-green-500">{listDetails.items.filter((item: { status: string; }) => item.status === "completed").length}</p>
                    </div>
                </div>

                {/* horizontal ruling */}
                <div className="w-full border border-gray-200"></div>

                {/* Tags */}
                <div className="flex flex-col gap-2 p-3 font-semibold text-gray-400">
                    <div className="flex justify-between">
                        <p>#important</p>
                        <p className="text-black">0</p>
                    </div>
                    <div className="flex justify-between">
                        <p>#time-sensitive</p>
                        <p className="text-black">0</p>
                    </div>
                    <div className="flex justify-between">
                        <p>#healthy</p>
                        <p className="text-black">0</p>
                    </div>
                    <div className="flex justify-between">
                        <p>No Tag</p>
                        <p className="text-black">0</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col py-4 border-t border-gray-200 gap-2">
                <span className="font-bold text-gray-500 text-md">PUBLIC ACCESS</span>
                <div className="bg-gray-200 text-xs p-2 max-h-20 rounded-md">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit natus atque amet, explicabo aspernatur eius temporibus odio mollitia omnis, velit, vel nostrum. Impedit magni dolores autem, veniam laudantium neque accusamus.</div>
                <button className="mx-auto w-full border py-1 rounded-md border-gray-200 cursor-pointer">Copy Public Link</button>
                <button className="mx-auto w-full text-red-500 border py-1 rounded-md border-gray-200 cursor-pointer">Revoke Access</button>
            </div>
        </>
    );
}