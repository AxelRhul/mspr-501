import User from "./userInterface";

export default interface Session {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
  }