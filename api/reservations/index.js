export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        res.status(200).json({ message: 'Reservations index GET endpoint' });
    } else if (method === 'POST') {
        res.status(200).json({ message: 'Reservations index POST endpoint' });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
