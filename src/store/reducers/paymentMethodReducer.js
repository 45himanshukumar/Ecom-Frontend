// src/store/reducers/paymentMethodReducer.js
const initialState = {
    paymentMethod: null,
    razorpayOrderId: null,
    razorpayKeyId: null,
    razorpayAmount: null,
};

export const paymentMethodReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PAYMENT_METHOD":
            return {
                ...state,
                paymentMethod: action.payload,
            };

        // ── Razorpay ────────────────────────────────────────────────────────────
        case "SET_RAZORPAY_ORDER":
            return {
                ...state,
                razorpayOrderId: action.payload.orderId,
                razorpayKeyId: action.payload.keyId,
                razorpayAmount: action.payload.amount,
            };
        case "CLEAR_RAZORPAY_ORDER":
            return {
                ...state,
                razorpayOrderId: null,
                razorpayKeyId: null,
                razorpayAmount: null,
            };
        // ────────────────────────────────────────────────────────────────────────

        default:
            return state;
    }
};