// src/components/checkout/PaymentConfirmation.jsx
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom'
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';

const PaymentConfirmation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const { cart } = useSelector((state) => state.carts);
    const [loading, setLoading] = useState(false);

    // Detect payment gateway from URL
    const status = searchParams.get("status");
    const isRazorpay = status === "razorpay_success";

    // Stripe params
    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];

    useEffect(() => {
        // Only run Stripe confirmation if it's a Stripe redirect
        if (
            !isRazorpay &&
            paymentIntent &&
            clientSecret &&
            redirectStatus &&
            cart &&
            cart?.length > 0
        ) {
            const sendData = {
                addressId: selectedUserCheckoutAddress.addressId,
                pgName: "Stripe",
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment successful"
            };
            dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
        }
    }, [paymentIntent, clientSecret, redirectStatus, cart]);

    return (
        <div className='min-h-screen flex items-center justify-center'>
            {loading ? (
                <div className='max-w-xl mx-auto'>
                    <Skeleton />
                </div>
            ) : errorMessage ? (
                <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-red-200">
                    <p className="text-red-500 font-semibold text-lg">{errorMessage}</p>
                    <Link to="/checkout" className="mt-4 inline-block text-blue-500 underline">
                        Try again
                    </Link>
                </div>
            ) : (
                <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
                    <div className="text-green-500 mb-4 flex justify-center">
                        <FaCheckCircle size={64} />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your purchase! Your payment was successful, and
                        we&apos;re processing your order.
                    </p>
                    {isRazorpay && (
                        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                            Paid via Razorpay
                        </span>
                    )}
                    <br />
                    <Link
                        to="/"
                        className="mt-4 inline-block bg-custom-blue text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PaymentConfirmation;