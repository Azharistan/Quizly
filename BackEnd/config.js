import dotenv from 'dotenv';

// Load environment variables based on the NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

// Export the environment variables
export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
