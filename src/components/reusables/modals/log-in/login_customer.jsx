import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import LoginCustomerForm from "../../forms/log-in/login_customer"

function LoginCustomer({ open, close }) {
    return (
        <Dialog
            open={open}
            onOpenChange={close}
        >
            <DialogContent className="max-w-xl! w-full gap-0">
                <DialogHeader className="p-6">
                    <img src="/images/kreditracker.png" alt="Kreditracker" className="h-8 w-30 mb-8" />
                    <DialogTitle className="text-2xl font-medium">No fluff. Just your balance and history.</DialogTitle>
                    <DialogDescription>
                        Enter your email and access code to view your account details.                    
                    </DialogDescription>
                </DialogHeader>
                <LoginCustomerForm close={close}/>
            </DialogContent>
        </Dialog>
    )
    
}

export default LoginCustomer