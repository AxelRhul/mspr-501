import User from "./userInterface";
import Comment from "./commentInterface";
import Image from "./imageInterface";

export default interface Plant {
    id: string;
    name: string;
    images: Image[];
    comments: Comment[];
    user: User;
    userId: string;
  }