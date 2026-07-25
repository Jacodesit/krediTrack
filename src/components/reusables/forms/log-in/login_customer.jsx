import { DialogFooter } from "@/components/ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

function LoginCustomerForm() {
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
                        <label htmlFor="customer_email" className="font-medium">
                            Access Code
                        </label>

                        <div className="border-2 border-dotted p-6 rounded-lg flex justify-center">
                            <InputOTP maxLength={15}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                    <InputOTPSlot index={6} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={7} />
                                    <InputOTPSlot index={8} />
                                    <InputOTPSlot index={9} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={10} />
                                    <InputOTPSlot index={11} />
                                    <InputOTPSlot index={12} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-10 flex items-center justify-between gap-2">
                    <Button
                        variant="secondary"
                        className="p-5 text-xs"
                    >
                        Forgot Access Code?
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
                            // disabled={!fullName || !storeName || !email || !phoneNumber || !password}
                            // onClick={handleCreation}
                            className="p-5 text-xs"
                        >
                            {/* {register ? 'Creating account...' : 'Create'} */}
                            Login
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </div>
    )
}

export default LoginCustomerForm