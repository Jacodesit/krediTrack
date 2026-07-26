import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRef, useEffect } from "react"

function LoginCustomerForm({ close }) {
    const inputRefs = useRef([]);

    useEffect(() => {
        const container = document.querySelector('.otp-container');
        const inputs = container.querySelectorAll('.otp-input');
        inputRefs.current = Array.from(inputs);

        inputs.forEach((input, index) => {
            const handleInput = (e) => {
                const value = e.target.value;
                
                e.target.value = value.toUpperCase();
            
                if (value && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Backspace' && !input.value && index > 0) {
                    inputs[index - 1].focus();
                }
            
                if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    e.preventDefault();
                    inputs[index + 1].focus();
                }
                if (e.key === 'ArrowLeft' && index > 0) {
                    e.preventDefault();
                    inputs[index - 1].focus();
                }
            };

            const handlePaste = (e) => {
                e.preventDefault();
                const pasted = e.clipboardData
                    .getData('text')
                    .replace(/[^A-Za-z0-9]/g, '')
                    .toUpperCase()
                    .slice(0, 12);
                
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
            };

            input.addEventListener('input', handleInput);
            input.addEventListener('keydown', handleKeyDown);
            input.addEventListener('paste', handlePaste);

            return () => {
                input.removeEventListener('input', handleInput);
                input.removeEventListener('keydown', handleKeyDown);
                input.removeEventListener('paste', handlePaste);
            };
        });
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <form>
                <div className="flex flex-col gap-1 px-4 lg:px-6 mb-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="customer_email" className="font-medium">
                            Email
                        </label>

                        <input
                            id="customer_email"
                            type="email"
                            placeholder="johndoe@gmail.com"
                            className="p-3 border rounded-md"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-medium">
                            Access Code <span className="text-xs font-light text-blue-500">(Paste or enter your access code.)</span>
                        </label>

                        <div className="otp-container flex gap-1 items-center">
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <span className="otp-separator">-</span>
                            
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <span className="otp-separator">-</span>
                            
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <span className="otp-separator">-</span>

                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
                            <input type="text" maxLength={1} pattern="[A-Za-z0-9]" className="otp-input w-6 md:flex-1 h-7 md:h-9 border text-center rounded-md" />
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

                        <Button className="p-5 text-xs">
                            Login
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </div>
    )
}

export default LoginCustomerForm