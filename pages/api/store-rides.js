import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  let client;

  if (req.method === 'POST') {
    try {
      console.log('Received request:', req.body);

      client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();

      const db = client.db('HarmanDb');
      const collection = db.collection('CoRide');

      const { pickup, dropoff, selectedAmount } = req.body;

      console.log('Data to be stored:', { pickup, dropoff, selectedAmount });

      const result = await collection.insertOne({
        pickup,
        dropoff,
        selectedAmount,
        timestamp: new Date(),
      });

      console.log('Ride information stored successfully:', result);

      res.status(201).json({ message: 'Ride information stored successfully!', result });
    } catch (error) {
      console.error('Error during database operation:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
