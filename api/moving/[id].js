export default async function handler(req, res) {
    const { query: { id }, method } = req;

    if (method === 'PUT') {
        res.status(200).json({ message: `Moving ${id} PUT endpoint` });
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
