import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { ConfirmCancel } from "../../alerts-dialog/register/confirm_cancel";

function OwnerForm({close, showAlert, setShowAlert}) {
    const [storeName, setStoreName] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")

    const [register, setRegister] = useState(false)

    async function handleCreation(e) {
        e.preventDefault()

        const owner = {
            store_name: storeName,
            full_name: fullName,
            email: email,
            phone_number: phoneNumber,
            password: password
        }

        try {
            setRegister(true)

            if (!storeName || !fullName || !email || !phoneNumber || !password) {
                toast.add({
                    type: "warning",
                    title: "Error",
                    description: "Please fill out all fields."
                })
                return
            }

            const response = await fetch(
                "http://127.0.0.1:8000/register-owner",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(owner)
                },
            )

            if (response.ok) {
                toast.add({
                    type: "success",
                    title: "Success",
                    description: "Store owner registered successfully! You can now log in."
                })

                setStoreName("")
                setFullName("")
                setEmail("")
                setPhoneNumber("")
                setPassword("")

                close()
            } else {
                alert('Theres a problem creating account for owner!')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Somethings wrong')
        } finally {
            setRegister(false)
        }
    }

    function handleClose() {
        if (fullName || email || phoneNumber || storeName || password) {
            setShowAlert(true)
        } else {
            close()
        }
    }
    
    return (
        <section className={`relative transition-all duration-200 ${showAlert ? "blur-sm brightness-90 pointer-events-none h-full" : ""}`}>
            <section className="flex flex-col gap-2 px-6 mb-6">
                <div className="flex flex-col gap-1">
                    <label htmlFor="store_name" id="store_name" className="font-medium">Store Name</label>
                    <input 
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="John Doe's Store" 
                        className="p-3 border rounded-md"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="owner_name" id="owner_name" className="font-medium">Full Name</label>
                    <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe" 
                        className="p-3 border rounded-md"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="owner_email" id="owner_email" className="font-medium">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johndoe@gmail.com" 
                        className="p-3 border rounded-md"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="owner_phone_number" id="owner_phone_number" className="font-medium">Phone Number</label>
                    <input 
                        type="tel" 
                        value={phoneNumber}
                        maxLength={11}
                        pattern="[0-9]{11}"
                        onChange={(e) =>
                            setPhoneNumber(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="09123456789" 
                        className="p-3 border rounded-md"
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
                    />
                </div>
            </section>
            <DialogFooter className="px-10 flex justify-end">
                <Button 
                    variant="outline" 
                    className="p-5 text-xs"
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                <Button 
                    disabled={!fullName || !storeName || !email || !phoneNumber || !password}
                    onClick={handleCreation}
                    className="p-5 text-xs"
                >
                    {register ? 'Creating account...' : 'Create'}
                </Button>
            </DialogFooter>
            <ConfirmCancel 
                showAlert={showAlert}
                onConfirm={close}
                onCancel={() => setShowAlert(false)}
            />
        </section>
    )
}

export default OwnerForm