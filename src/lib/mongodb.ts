import { MongoClient, type Collection, type Db } from "mongodb";

export type SubscriberStatus = "subscribed" | "unsubscribed";
export type SubscriberSource = "homepage" | "blog" | "unknown";

export type Subscriber = {
  email: string;
  status: SubscriberStatus;
  source: SubscriberSource;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  updatedAt: Date;
  unsubscribeToken: string;
  welcomeEmailSentAt?: Date;
};

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "calebareeveso";

// Cache the client (and connection promise) across HMR reloads in dev so we
// don't open a new connection on every request / module re-evaluation.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
  _subscribersIndexReady?: Promise<void>;
};

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri);
    globalForMongo._mongoClientPromise = client.connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

export async function getSubscribers(): Promise<Collection<Subscriber>> {
  const db = await getDb();
  const collection = db.collection<Subscriber>("subscribers");

  // Ensure the unique email index exists exactly once per process.
  if (!globalForMongo._subscribersIndexReady) {
    globalForMongo._subscribersIndexReady = collection
      .createIndex({ email: 1 }, { unique: true })
      .then(() => undefined);
  }
  await globalForMongo._subscribersIndexReady;

  return collection;
}
