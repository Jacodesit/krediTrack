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
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-medium">Hello, Welcome Back!</DialogTitle>
                        
                    </div>
                    <DialogDescription>
                        Sign in to securely access your account.
                    </DialogDescription>
                </DialogHeader>

                <LoginOwnerForm />
            </DialogContent>
        </Dialog>
    )
    
}

export default LoginOwner