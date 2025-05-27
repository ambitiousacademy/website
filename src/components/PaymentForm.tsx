import { useState } from "react";
import { useSession } from "@clerk/clerk-react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react"; // Assuming you're using Lucide icons
import PaymentButton from "./paymentButton";
import ProceedButton from "./paymentButton";

interface CourseEnrollmentProps {
    finalPrice: number;
    course: string;
}

export default function CourseEnrollment({ finalPrice, course }: CourseEnrollmentProps) {
    const { isSignedIn } = useSession();
    const [showForm, setShowForm] = useState(false);

    const handleEnrollClick = () => {
        if (!isSignedIn) {
            toast.error("Please sign in first.");
            return;
        }
        setShowForm(true);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            {showForm ? (
                <PaymentForm price={finalPrice} course={course} />
            ) : (
                <button
                    onClick={handleEnrollClick}
                    className="w-full bg-academy-teal hover:bg-academy-teal/90 text-white p-2 rounded-md mb-4"
                >
                    Enroll Now
                </button>
            )}
        </div>
    );
}


interface PaymentFormProps {
    price: number;
    course: string;
}

export function PaymentForm({ price, course }: PaymentFormProps) {
    const { session, isSignedIn } = useSession();
    const [userDetails, setUserDetails] = useState({
        email: session?.user?.emailAddresses[0]?.emailAddress || "",
        phone: session?.user?.phoneNumbers[0]?.phoneNumber || "",
        name: session?.user?.fullName || "",
        address: "",
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Validate form fields
    const isFormValid = () => {
        return (
            userDetails.name.trim() !== "" &&
            userDetails.email.trim() !== "" &&
            userDetails.phone.trim() !== "" &&
            userDetails.address.trim() !== ""
        );
    };

    // Show sign-in prompt if not authenticated
    if (!isSignedIn) {
        toast.error("Please sign in first.");
        return <div>Please sign in to continue.</div>;
    }

    return (
        <div className="space-y-4 mb-4">
            <h2 className="text-lg font-semibold">Enter Your Details</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
            />
            {isFormValid() ? (
                <ProceedButton price={price} userDetails={userDetails} course={course} />
            ) : (
                <p className="text-sm text-red-500">Please fill in all fields to proceed with payment.</p>
            )}
        </div>
    );
}