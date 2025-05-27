import { API_BASE_URL, RAZORPAY_ID } from "@/lib/credentials";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { toast } from "sonner";

interface ProceedButtonProps {
    price: number;
    userDetails: {
        email: string;
        phone: string;
        name: string;
        address: string;
    };
    course: string;
}

export default function ProceedButton({ price, userDetails, course }: ProceedButtonProps) {
    const { isLoading, Razorpay } = useRazorpay();

    const handlePayment = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: price * 100, course }), // Include course
            });

            const order = await response.json();
            console.log(order);

            const options: RazorpayOrderOptions = {
                key: RAZORPAY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Ambitious Academy",
                description: `Payment for course ${course}`,
                order_id: order.id,
                handler: async (response) => {
                    try {
                        const verifyResponse = await fetch(`${API_BASE_URL}/payment/verify-payment`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });
                        const verifyResult = await verifyResponse.json();
                        if (verifyResult.message === "success") {
                            toast("Payment successful!");
                            const saveUser = await fetch(`${API_BASE_URL}/payment/user`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    username: userDetails.name,
                                    phone: userDetails.phone,
                                    email: userDetails.email,
                                    address: userDetails.address,
                                    course: course,
                                    order_id: response.razorpay_order_id,
                                    payment_id: response.razorpay_payment_id
                                }),
                            });
                            toast("Thanks for purchasing this course. we will contact you shortly")
                        } else {
                            alert("Payment verification failed!");
                        }
                    } catch (err) {
                        alert("Payment failed: " + err.message);
                    }
                },
                prefill: {
                    name: userDetails.name,
                    email: userDetails.email,
                    contact: userDetails.phone,
                },
                notes: JSON.stringify({
                    address: userDetails.address,
                    course,
                }),
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
        } catch (err) {
            alert("Error creating order: " + err.message);
        }
    };

    return (
        <button
            className="w-full bg-academy-teal hover:bg-academy-teal/90 text-white p-2 rounded-md"
            onClick={handlePayment}
            disabled={isLoading}
        >
            Proceed to Payment
        </button>
    );
}