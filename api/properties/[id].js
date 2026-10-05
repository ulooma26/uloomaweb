export default async function handler(req, res) {
    const { query: { id }, method } = req;

    if (method === 'GET') {
        res.status(200).json({ message: `Property ${id} GET endpoint` });
    } else if (method === 'PUT') {
        res.status(200).json({ message: `Property ${id} PUT endpoint` });
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
