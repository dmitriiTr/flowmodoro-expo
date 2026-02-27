import { activities } from "./constants/common";

export type Activity = (typeof activities)[number];
export interface Task {
  activity: Activity;
  time: number;
  day: string;
  id: number;
}
