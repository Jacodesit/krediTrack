import { DialogFooter } from "@/components/ui/dialog"
// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSeparator,
//     InputOTPSlot,
// } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

function LoginCustomerForm({ close }) {
    const inputs = document.querySelectorAll('.otp-input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
        
            if (value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                inputs[index - 1].focus();
            }
            
            if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            if (e.key === 'ArrowLeft' && index > 0) {
                inputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData('text').replace(/[^A-Za-z0-9]/g, '').slice(0, 12);
            
            pasted.split('').forEach((char, i) => {
                if (inputs[i]) {
                    inputs[i].value = char;
                }
            });
            
            const nextEmptyIndex = pasted.length;
            if (nextEmptyIndex < inputs.length) {
                inputs[nextEmptyIndex].focus();
            } else {
                inputs[inputs.length - 1].focus();
            }
        });
    });

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
                            Access Code <span className="text-xs font-light text-blue-500">(Paste or enter your access code.)</span>
                        </label>

                        <div class="otp-container flex gap-1 items-center">
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <span class="otp-separator">-</span>
                            
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <span class="otp-separator">-</span>
                            
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <span class="otp-separator">-</span>

                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                            <input type="text" maxlength="1" pattern="[A-Za-z0-9]" class="otp-input" />
                        </div>

                    </div>
                </div>

                <DialogFooter className="px-10 flex items-center justify-between gap-2">
                    <Button
                        variant="secondary"
                        className="p-5 text-xs"
                    >
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