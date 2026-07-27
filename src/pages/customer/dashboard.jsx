import { Button } from "@/components/ui/button"
import {  Navigate, useNavigate } from "react-router-dom";

function CustomerDashboard() {
    const navigate = useNavigate();
    const customer = JSON.parse(localStorage.getItem("customer"));

    if (!customer) {
        return <Navigate to="/" replace />
    }
    
    function handleLogout() {
        localStorage.removeItem("owner")
        navigate("/");
    }
    return (
        <main>
            <p>Hello, you're successfully redirected and logged in as customer!</p>
            <Button
                onClick={handleLogout}
            >
                Logout Customer
            </Button>
        </main>
    )
}

export default CustomerDashboard