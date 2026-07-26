import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/toast"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function LoginOwnerForm({ close }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(false)
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault()
        
        const owner = {
            email: email,
            password: password
        }

        try {
            setLogin(true)

            const response = await fetch(
                "http://127.0.0.1:8000/login-owner",
                {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(owner)
                },
            )

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem(
                    "owner",
                    JSON.stringify(data.owner)
                );


                toast.add({
                    type: "success",
                    title: "Success",
                    description: "Login successfully!"
                })

                setEmail("")
                setPassword("")
                close()

                navigate("/owner/dashboard")

            } else {
                toast.add({
                    type: "error",
                    title: "Login Failed",
                    description: data.detail,
                });
            }
        } catch (error) {
            console.error(error);

            toast.add({
                type: "error",
                title: "Server Error",
                description: "Unable to connect to the server.",
            });
        } finally {
            setLogin(false)
        }
    }

    return (
        <div className="flex flex-col gap-2 ">
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-1 px-4 lg:px-6 mb-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="customer_email" className="font-medium">
                            Email
                        </label>

                        <input
                            id="customer_email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@gmail.com"
                            className="p-3 border rounded-md"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="owner_phone_number" id="owner_phone_number" className="font-medium">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" 
                            className="p-3 border rounded-md"
                            required
                        />
                    </div>
                </div>

                <DialogFooter className="px-7 lg:px-10 flex items-center justify-between gap-2">
                    <Button
                        variant="secondary"
                        className="p-5 text-xs"
                    >
                        Forgot Password?
                    </Button>
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            className="p-5 text-xs"
                            onClick={close}
                        >
                            Cancel
                        </Button>

                        <Button 
                            type="submit"
                            disabled={!email || !password}
                            className="p-5 text-xs"
                        >
                            {login ? 'Logging In...' : 'Log in'}
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </div>
    )
}

export default LoginOwnerForm