import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"

function LoginOwnerForm() {
    return (
        <div className="flex flex-col gap-2 ">
            <form>
                <div className="flex flex-col gap-1 px-6 mb-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="customer_email" className="font-medium">
                            Email
                        </label>

                        <input
                            id="customer_email"
                            type="email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@gmail.com"
                            className="p-3 border rounded-md"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="owner_phone_number" id="owner_phone_number" className="font-medium">Password</label>
                        <input 
                            type="password" 
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" 
                            className="p-3 border rounded-md"
                        />
                    </div>
                </div>

                <DialogFooter className="px-10 flex justify-end">
                    <Button 
                        variant="outline" 
                        className="p-5 text-xs"
                        // onClick={handleClose}
                    >
                        Cancel
                    </Button>

                    <Button 
                        // disabled={!fullName || !storeName || !email || !phoneNumber || !password}
                        // onClick={handleCreation}
                        className="p-5 text-xs"
                    >
                        {/* {register ? 'Creating account...' : 'Create'} */}
                        Login
                    </Button>
                </DialogFooter>
            </form>
        </div>
    )
}

export default LoginOwnerForm