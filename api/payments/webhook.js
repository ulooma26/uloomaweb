export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_HASH;
    const signature = req.headers['verif-hash'];

    if (!signature || signature !== secretHash) {
        // This request isn't from Flutterwave; discard
        return res.status(401).end();
    }

    const payload = req.body;
    
    // Process the webhook payload
    console.log('Webhook payload received:', payload);
    
    // Typically, you update the DB status here based on payload.event and payload.data.status

    res.status(200).end();
}
