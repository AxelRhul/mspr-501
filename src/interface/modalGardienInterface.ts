import { ModalProps } from "./modalInterface";
import Plant from "./plantInterface";

export interface ModalGardienProps extends ModalProps {
  plant: Plant;
}