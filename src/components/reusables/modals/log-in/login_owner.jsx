import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import LoginOwnerForm from "../../forms/log-in/login_owner"

function LoginOwner({ open, close }) {
    return (
        <Dialog
            open={open}
            onOpenChange={close}
        >
            <DialogContent className="max-w-xl! w-full gap-0">
                <DialogHeader className="p-6">
                    <img src="/images/kreditracker.png" alt="Kreditracker" className="h-8 w-30 mb-8" />
                    <DialogTitle className="text-2xl font-medium">Hello, Welcome Back!</DialogTitle>
                    <DialogDescription>
                        Sign in to manage customer accounts, transactions, and store records.
                    </DialogDescription>
                </DialogHeader>
                <LoginOwnerForm close={close} />
            </DialogContent>
        </Dialog>
    )
    
}

export default LoginOwner