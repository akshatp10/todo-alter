import Authenticate from "@/components/authComponent";

export default function Home() {
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-evenly items-center">
                <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-4xl">TODO APP</p>
                    <p className="font-semibold text-gray-400">Manage Your Tasks</p>
                </div>

                {/* Login/Signup columm */}
                <Authenticate />
            </div>
        </>
    );
}