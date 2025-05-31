import { User as UserEntity } from '../../../users/entities/user.entity';

declare global {
  namespace Express {
    // Define the structure of the user object attached by JwtStrategy
    interface User {
      userId: number; // Corresponds to the 'sub' claim in JWT, named 'userId' in our strategy payload
      email: string;
      // You can add other properties from your JWT payload here if needed
    }

    interface Request {
      user?: User; // Use the defined User interface
    }
  }
} 