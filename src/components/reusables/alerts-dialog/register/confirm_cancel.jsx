import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ConfirmCancel({ showAlert, onConfirm, onCancel }) {

    return (
        <AlertDialog
            open={showAlert}
        >
            <AlertDialogContent className="backdrop-blur-sm bg-background/80">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your data cannot be saved when you close.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onCancel}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
                
            </AlertDialogContent>
        </AlertDialog>
    )
}
