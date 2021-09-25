import { MongoClient } from 'mongodb';
import Transport, { TransportStreamOptions } from 'winston-transport';

interface Opts extends TransportStreamOptions {
  url?: string;
  collection?: string;
}

class MongoTransport extends Transport {
  client: any;

  url: string;

  collection: string;

  constructor(opts: Opts) {
    super(opts);
    const { url = 'mongodb://localhost:27017/test_log', collection = 'error_log' } = opts;
    this.url = url;
    this.collection = collection;
    this.client = new MongoClient(url);
  }

  async log(info: any, next: () => void) {
    try {
      await this.client.connect();
      await this.client
        .db()
        .collection(this.collection)
        .insertOne({ ...info, date: new Date() });
    } finally {
      await this.client.close();
    }
    next();
  }
}

export default MongoTransport;
