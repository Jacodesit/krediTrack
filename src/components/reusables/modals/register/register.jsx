import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import OwnerForm from "../../forms/register/register_owner"
import CustomerForm from "../../forms/register/register_customer"
import { useState } from "react"

function Register({register, onClose}) {
    const [showAlert, setShowAlert] = useState(false)
    
    return (
        <Dialog
            open={register}
            onOpenChange={onClose}
        >
            <DialogContent className="max-w-xl! w-full gap-0">
                <DialogHeader className="p-6">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-medium">Create an account</DialogTitle>
                        
                    </div>
                    <DialogDescription>
                        Register your store to start managing your customer's utang digitally.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="owner" className="w-full flex flex-col gap-5">
                    <div className="pl-6">
                        <TabsList>
                            <TabsTrigger value="owner">Store Owner</TabsTrigger>
                            <TabsTrigger value="customer">Customer</TabsTrigger>
                        </TabsList>
                    </div>
                    
                    <TabsContent value="owner">
                        <OwnerForm 
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                            close={onClose} 
                        />
                    </TabsContent>
                    <TabsContent value="customer">
                        <CustomerForm 
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                            close={onClose} 
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default Register