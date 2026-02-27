import { REST_RATIO, activities } from "./constants";
import { Task } from "./types";

export const nowString = () => new Date().toLocaleDateString();

export const emptyTodayTask = () => ({
  day: nowString(),
  tasks: activities.map((activity) => ({ activity, time: 0 })),
});

export const getTimeRest = (lastFocus: number) => {
  const timeRest = new Date();
  const restSeconds = lastFocus / REST_RATIO;
  timeRest.setSeconds(timeRest.getSeconds() + restSeconds);
  return timeRest;
};

export const formatTime = (time: number) => (time < 10 ? "0" + time : time);

export const formatTimeWithSeconds = (minutes: number, seconds: number) =>
  `${formatTime(minutes)}:${formatTime(seconds)}`;

export const secondsToRoundedMinutes = (seconds: number) =>
  Math.floor(seconds / 60);

export const groupTasks = (arr: Task[]) => {
  const res: Record<string, Task[]> = {};
  for (let task of arr) {
    const groupKey = `${task.day} ${task.activity}`;
    if (res[groupKey] === undefined) {
      res[groupKey] = [];
    }
    res[groupKey].push(task);
  }
  return Object.values(res);
};
