import { Button } from "@/components/ui/button"
import {  Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const owner = JSON.parse(localStorage.getItem("owner"));

    if (!owner) {
        return <Navigate to="/" replace />
    }
    
    function handleLogout() {
        localStorage.removeItem("owner")
        navigate("/");
    }
    return (
        <main>
            <p>Hello, you're successfully redirected and logged in!</p>
            <Button
                onClick={handleLogout}
            >
                Logout
            </Button>
        </main>
    )
}

export default Dashboard