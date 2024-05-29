import Plant from './plantInterface';
import Account from './accountInterface';
import Session from './sessionInterface';

export default interface User {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    accounts: Account[];
    sessions: Session[];
    plants: Plant[];
    comments: Comment[];
  }