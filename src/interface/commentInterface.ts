import User from "./userInterface";
import Plant from "./plantInterface";

export default interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: string;
    plant: Plant;
    plantId: string;
  }