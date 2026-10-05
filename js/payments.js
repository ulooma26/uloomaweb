// js/payments.js
import { supabase } from './supabase.js';
import { getCurrentUser, getUserProfile } from './auth.js';

// Requires Flutterwave script: <script src="https://checkout.flutterwave.com/v3.js"></script>
const FLW_PUBLIC_KEY = window.__FLW_CONFIG?.publicKey || '';

export async function initAccessPayment(userEmail, userName) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Authentication required");

    const txRef = 'acss_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    
    return new Promise((resolve, reject) => {
        FlutterwaveCheckout({
            public_key: FLW_PUBLIC_KEY,
            tx_ref: txRef,
            amount: 2000,
            currency: "NGN",
            payment_options: "card, mobilemoneyghana, ussd",
            redirect_url: "",
            customer: {
                email: userEmail,
                phone_number: "",
                name: userName,
            },
            customizations: {
                title: "Ulo Oma Access",
                description: "Payment for platform access (20 properties)",
                logo: "https://your-domain.com/logo.png",
            },
            callback: async function (data) {
                if (data.status === "successful") {
                    try {
                        const res = await verifyPayment(data.transaction_id);
                        resolve(res);
                    } catch(err) {
                        reject(err);
                    }
                } else {
                    reject(new Error("Payment failed or cancelled"));
                }
            },
            onclose: function() {
                reject(new Error("Payment window closed"));
            }
        });
    });
}

export async function initRentalPayment(propertyId, amount, userEmail, userName) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Authentication required");

    const txRef = 'rent_' + propertyId + '_' + Date.now();
    
    return new Promise((resolve, reject) => {
        FlutterwaveCheckout({
            public_key: FLW_PUBLIC_KEY,
            tx_ref: txRef,
            amount: amount,
            currency: "NGN",
            payment_options: "card, banktransfer",
            customer: {
                email: userEmail,
                name: userName,
            },
            customizations: {
                title: "Ulo Oma Rental",
                description: "Rental payment for property",
            },
            callback: async function (data) {
                if (data.status === "successful") {
                    try {
                        const res = await verifyPayment(data.transaction_id, 'rental', propertyId);
                        resolve(res);
                    } catch(err) {
                        reject(err);
                    }
                } else {
                    reject(new Error("Payment failed"));
                }
            },
            onclose: function() {
                reject(new Error("Payment window closed"));
            }
        });
    });
}

export async function verifyPayment(transactionId, type = 'access', propertyId = null) {
    const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId, type, propertyId })
    });
    
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Verification failed');
    }
    
    return await response.json();
}

export async function getPaymentHistory(userId) {
    const { data: accessPayments, error: err1 } = await supabase
        .from('access_payments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
    const { data: rentalPayments, error: err2 } = await supabase
        .from('rental_payments')
        .select('*, properties(title)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (err1) console.error(err1);
    if (err2) console.error(err2);

    return {
        access: accessPayments || [],
        rentals: rentalPayments || []
    };
}

export async function checkAccessEntitlement(userId) {
    const { data, error } = await supabase
        .from('access_payments')
        .select('properties_remaining')
        .eq('user_id', userId)
        .eq('status', 'successful')
        .gt('properties_remaining', 0)
        .order('created_at', { ascending: false })
        .limit(1);

    if (error || !data || data.length === 0) return 0;
    return data[0].properties_remaining;
}

export async function decrementPropertyView(userId, propertyId) {
    // Requires a secure RPC or server-side endpoint if doing logic
    // We'll call a hypothetical RPC to prevent client-side manipulation
    const { data, error } = await supabase.rpc('decrement_property_view', {
        p_user_id: userId,
        p_property_id: propertyId
    });
    
    if (error) throw error;
    return data;
}
