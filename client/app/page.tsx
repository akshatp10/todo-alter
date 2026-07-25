import Authenticate from "@/components/authComponent";

export default function Home() {
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <p>TODO APP</p>

                {/* Login/Signup columm */}
                <Authenticate></Authenticate>
            </div>
        </>
    );
}