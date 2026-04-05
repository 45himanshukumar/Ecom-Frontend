import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRazorpayOrder, razorpayPaymentConfirmation } from "../../store/actions";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";

const RazorpayPayment = () => {
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.carts);
  const { user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const { razorpayOrderId, razorpayKeyId } = useSelector((state) => state.payment);
  const { isLoading } = useSelector((state) => state.errors);
  const [paying, setPaying] = useState(false);

  // Step 1: Create Razorpay order on backend when component mounts
  useEffect(() => {
    if (!razorpayOrderId) {
      const sendData = {
        amount: Math.round(Number(totalPrice) * 100), // in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };
      dispatch(createRazorpayOrder(sendData));
    }
  }, [razorpayOrderId]);

  // Step 2: Open Razorpay checkout widget
  const handlePayment = () => {
    if (!razorpayOrderId) {
      toast.error("Order not ready. Please wait.");
      return;
    }

    const options = {
      key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: Math.round(Number(totalPrice) * 100),
      currency: "INR",
      name: "E-Shop",
      description: "Order Payment",
      order_id: razorpayOrderId,
      prefill: {
        name: user?.username || "",
        email: user?.email || "",
      },
      theme: {
        color: "#1C64F2",
      },
      handler: async function (response) {
        // Step 3: Confirm payment on backend
        setPaying(true);
        const confirmData = {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          addressId: selectedUserCheckoutAddress?.addressId,
          pgName: "Razorpay",
          pgPaymentId: response.razorpay_payment_id,
          pgStatus: "succeeded",
          pgResponseMessage: "Payment successful",
        };
        dispatch(razorpayPaymentConfirmation(confirmData, toast, setPaying));
      },
      modal: {
        ondismiss: () => {
          toast.error("Payment cancelled.");
          setPaying(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto">
        <Loader text="Creating your order..." />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white text-center">
      {/* Razorpay Logo / Branding */}
      <div className="flex justify-center mb-4">
        <img
          src="https://razorpay.com/favicon.png"
          alt="Razorpay"
          className="w-10 h-10 mr-2"
        />
        <h2 className="text-2xl font-bold text-slate-800 self-center">
          Pay with Razorpay
        </h2>
      </div>

      <p className="text-gray-500 mb-2 text-sm">
        Secure payment powered by Razorpay
      </p>

      {/* Order Summary */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Order Total</span>
          <span className="font-semibold text-slate-800">
            ₹{Number(totalPrice).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Currency</span>
          <span className="font-semibold text-slate-800">INR</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery To</span>
          <span className="font-semibold text-slate-800 text-right max-w-[180px]">
            {selectedUserCheckoutAddress?.city}, {selectedUserCheckoutAddress?.state}
          </span>
        </div>
      </div>

      {/* Status badge */}
      {razorpayOrderId ? (
        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
          Order ready · ID: {razorpayOrderId.slice(0, 18)}...
        </div>
      ) : (
        <div className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block animate-pulse"></span>
          Preparing order...
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={!razorpayOrderId || paying}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white text-base transition-all duration-300
          ${!razorpayOrderId || paying
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-custom-blue hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
      >
        {paying ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Verifying Payment...
          </span>
        ) : (
          `Pay ₹${Number(totalPrice).toFixed(2)}`
        )}
      </button>

      <p className="text-xs text-gray-400 mt-4">
        UPI · Cards · Net Banking · Wallets supported
      </p>
    </div>
  );
};

export default RazorpayPayment;