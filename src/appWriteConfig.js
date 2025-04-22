import { Client, Databases, Account} from 'appwrite';

export const PROJECT_ID='67fb5a36003decd0d3ed';
export const DATABASE_ID='67fb6e7f002a6f9f3d90';
export const COLLECTION_ID_MESSAGES='67fb6e920009bc9a019e';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67fb5a36003decd0d3ed');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;