export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        res.status(200).json({ message: 'Admin dashboard stats endpoint' });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
