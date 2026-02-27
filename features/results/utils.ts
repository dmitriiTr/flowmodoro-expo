import { Task } from "@/shared/types";

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
