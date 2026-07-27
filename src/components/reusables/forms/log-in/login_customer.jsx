import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { toast } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

function LoginCustomerForm({ close }) {
    const inputRefs = useRef([]);
    const [email, setEmail] = useState("")
    const [accessCode, setAccessCode] = useState(
        Array(12).fill("")
    )
    const [login, setLogin] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        
        const customer = {
            email: email,
            access_code: accessCode.join("")
        }

        try {
            setLogin(true)

            const response = await fetch (
                "http://127.0.0.1:8000/login-customer",
                {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(customer)
                },
            )

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem(
                    "customer",
                    JSON.stringify(data.customer)
                )

                toast.add({
                    type: "success",
                    title: "Success",
                    description: "Login successfully!"
                })

                setEmail("")
                setAccessCode(Array(12).fill(""));

                navigate("/customer/dashboard")

            } else {
                toast.add({
                    type: "error",
                    title: "Login failed!",
                    description: data.detail
                })
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

    function handleCodeChange(index, value) {
        value = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

        const updated = [...accessCode];
        updated[index] = value;

        setAccessCode(updated);

        if (value && index < 11) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index, e) {
        if (e.key === "Backspace") {
            if (accessCode[index]) {
                const updated = [...accessCode];
                updated[index] = "";
                setAccessCode(updated);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < 11) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handlePaste(e) {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/[^A-Za-z0-9]/g, "")
            .toUpperCase()
            .slice(0, 12);

        const updated = Array(12).fill("");

        pasted.split("").forEach((char, index) => {
            updated[index] = char;
        });

        setAccessCode(updated);

        inputRefs.current[
            Math.min(pasted.length, 11)
        ]?.focus();
    }

    return (
        <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 px-4 lg:px-6 mb-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="customer_email" className="font-medium">
                            Email
                        </label>

                        <input
                            value={email}
                            id="customer_email"
                            type="email"
                            placeholder="johndoe@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 border rounded-md"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium">
                            Access Code <span className="text-xs font-light text-blue-500">(Paste or enter your access code.)</span>
                        </label>

                        <div
                            className="flex gap-1 items-center"
                            onPaste={handlePaste}
                        >
                            {accessCode.map((char, index) => (
                                <div
                                    key={index}
                                    className="flex items-center flex-1"
                                >
                                    <input
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        value={char}
                                        maxLength={1}
                                        onChange={(e) =>
                                            handleCodeChange(index, e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(index, e)
                                        }
                                        className="w-6 h-7 md:w-8 md:h-10 border rounded text-center uppercase "
                                    />

                                    {(index === 2 ||
                                        index === 5 ||
                                        index === 8) && (
                                        <span className="mx-1 font-bold">
                                            -
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-10 flex items-center justify-between gap-2">
                    <Button variant="secondary" className="p-5 text-xs">
                        Recover Account
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
                            disabled={
                                !email ||
                                accessCode.some(char => char === "")
                            }
                            className="p-5 text-xs"
                        >
                            {login ? 'Logging in...' : 'Log in'}
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </div>
    )
}

export default LoginCustomerForm