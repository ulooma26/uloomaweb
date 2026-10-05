export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { transactionId, type, propertyId } = req.body;
    
    if (!transactionId) {
        return res.status(400).json({ message: 'Transaction ID is required' });
    }

    try {
        // 1. Verify with Flutterwave
        const flwSecret = process.env.FLUTTERWAVE_SECRET_KEY;
        if (!flwSecret) {
            console.error("FLUTTERWAVE_SECRET_KEY missing");
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const flwRes = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
            headers: {
                Authorization: `Bearer ${flwSecret}`
            }
        });
        
        const flwData = await flwRes.json();
        
        if (flwData.status !== 'success' || flwData.data.status !== 'successful') {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        // Check currency (and amount if needed)
        if (flwData.data.currency !== 'NGN') {
            return res.status(400).json({ message: 'Invalid currency' });
        }

        // 2. Here you would use Supabase admin to insert records
        // const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        
        // Mock successful DB insertion
        
        res.status(200).json({ 
            message: 'Payment verified successfully',
            data: flwData.data
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
