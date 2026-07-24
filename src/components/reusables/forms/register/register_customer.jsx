import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Info, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { jsPDF } from "jspdf";
import { logoBase64 } from "@/assets/krediTrack";
import { ConfirmCancel } from "../../alerts-dialog/register/confirm_cancel";

function CustomerForm({ close, showAlert, setShowAlert }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accessCode, setAccessCode] = useState("");

    const [generating, setGenerating] = useState(false);
    const [creating, setCreating] = useState(false)
    const [isDownload, setIsDownload] = useState(false)
    // const [haveData, setHaveData] = useState(false)
    
    async function handleGenerate() {
        try {
            setGenerating(true);

            const response = await fetch(
                "http://127.0.0.1:8000/generate-access-code",
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to generate access code.");
            }

            const data = await response.json();
            const formattedCode = data.access_code.match(/.{1,3}/g).join("-")
            setAccessCode(formattedCode);

        } catch (error) {
            console.error(error);
            alert("Unable to generate access code.");
        } finally {
            setGenerating(false);
        }
    }

    async function handleCreation(e) {
        e.preventDefault();

        const customer = {
            full_name: fullName,
            email: email,
            phone_number: phoneNumber,
            access_code: accessCode
        }

        try {
            setCreating(true);

            if (!fullName || !email || !phoneNumber || !accessCode) {
                toast.add({
                    type: "warning",
                    title: "Error",
                    description: "Please fill out all fields."
                })
                return
            }

            const response = await fetch(
                "http://127.0.0.1:8000/register-customer",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(customer),
                }
            );

            // const data = await response.json()

            if (response.ok) {
                toast.add({
                    type: "success",
                    title: "Success",
                    description: "Customer registered successfully! You can now log in."
                })

                setFullName("");
                setEmail("");
                setPhoneNumber("");
                setAccessCode("");

                close()
            } else {
                alert('Error in creating accoun!')
            }
        }  catch (error) {
            console.error('Error:', error);
            alert('Somethings wrong')
        } finally {
            setCreating(false)
        }
    }

    function handleDownload() {
        if (!fullName || !email || !phoneNumber || !accessCode) {
            toast.add({
                type: "warning",
                title: "Error",
                description: "Please fill out all fields."
            })
            return
        }

        setIsDownload(true)
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const today = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        const safeName = fullName ? fullName.trim().replace(/\s+/g, "_") : "User";

        doc.setFillColor(41, 128, 185); 
        doc.rect(0, 0, 210, 35, "F");

        doc.addImage(logoBase64, "PNG", 20, 8, 45, 18);

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Generated on: ${today}`, 190, 20, { align: "right" });

        doc.setTextColor(44, 62, 80);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Account Details", 20, 50);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text(`Name:`, 20, 60);
        doc.text(`${fullName || "N/A"}`, 55, 60);

        doc.text(`Email:`, 20, 68);
        doc.text(`${email || "N/A"}`, 55, 68);

        doc.text(`Phone Number:`, 20, 76);
        doc.text(`${phoneNumber || "N/A"}`, 55, 76);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(20, 86, 190, 86);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Your Access Code", 20, 102);

        doc.setFillColor(245, 247, 250);
        doc.setDrawColor(218, 225, 233);
        doc.roundedRect(20, 110, 170, 25, 3, 3, "FD");

        doc.setTextColor(39, 174, 96);
        doc.setFont("courier", "bold");
        doc.setFontSize(20);
        doc.text(accessCode || "XXXX-XXXX", 28, 126);

        doc.setTextColor(127, 140, 141);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text("Keep this access code in a safe place. Do not share it with anyone.", 20, 148);

        doc.save(`${safeName}-access-code.pdf`);
    }

    function handleClose() {
        if (fullName || email || phoneNumber || accessCode) {
            setShowAlert(true)
        } else {
            close()
        }
    }

    return (
        <section className={`relative transition-all duration-200 ${showAlert ? "blur-sm brightness-90 pointer-events-none h-full" : ""}`}>
            <section className="flex flex-col gap-2 px-6 mb-6">

                <div className="flex flex-col gap-1">
                    <label htmlFor="full_name" className="font-medium">
                        Full Name
                    </label>

                    <input
                        id="full_name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="p-3 border rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="customer_email" className="font-medium">
                        Email
                    </label>

                    <input
                        id="customer_email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        className="p-3 border rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="customer_phone_number" className="font-medium">
                        Phone Number
                    </label>

                    <input
                        id="customer_phone_number"
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

                    <label htmlFor="access_code" className="font-medium">
                        Access Code
                    </label>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="p-5 text-xs"
                        >
                            {generating ? "Generating..." : "Generate Access Code"}
                        </Button>

                        <input
                            id="access_code"
                            type="text"
                            value={accessCode}
                            readOnly
                            placeholder="Access Code"
                            className="px-3 border rounded-md flex-1"
                        />

                    </div>

                    <div className="border border-green-500 rounded-lg flex gap-2 p-2 mt-2 bg-green-100">
                        <Info
                            size={14}
                            className="text-green-700 mt-0.5 shrink-0"
                        />

                        <p className="text-xs text-green-700">
                            Your access code is your key to accessing your account.
                            You must download the code in PDF format and
                            saving it in a safe place so you can recover it whenever
                            you need it.
                        </p>
                    </div>
                </div>
            </section>

            <DialogFooter className="px-10 flex justify-between">
                <Button
                    onClick={handleDownload}
                    variant="secondary"
                    className="p-5 text-xs"
                    disabled={!accessCode || !fullName || !email || !phoneNumber}
                >
                    <Download size={16} />
                    Download Code
                </Button>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="p-5 text-xs"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleCreation}
                        className="p-5 text-xs"
                        disabled={!isDownload || !fullName || !email || !phoneNumber}
                    >
                        {creating ? 'Creating...' : 'Proceed'}
                    </Button>
                </div>
            </DialogFooter>
            <ConfirmCancel 
                showAlert={showAlert}
                onConfirm={close}
                onCancel={() => setShowAlert(false)}
            />
        </section>
    );
}

export default CustomerForm;