import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import {
  BASE_FOCUS_DURATION_MINUTES,
  LOCAL_STORAGE_KEY,
} from "../constants/common";
import { Activity, Task } from "../types";
import { nowString } from "../utils";

export interface TasksContextType {
  tasks: Task[];
  activity: Activity;
  handleActivitySelect: (activity: Activity) => void;
  baseFocusTime: number;
  totalTimeForCurrentActivityToday: number;
  handleRest: (time: number, newBaseDuration: number) => void;
}

export const TasksContext = createContext<TasksContextType | null>(null);

interface ChildrenProps {
  children: React.ReactNode;
}

export const TasksContextProvider = ({ children }: ChildrenProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activity, setActivity] = useState<Activity>("work");
  const [baseFocusTime, setBaseFocusTime] = useState(
    BASE_FOCUS_DURATION_MINUTES,
  );

  const handleRest = (time: number, newBaseDuration: number) => {
    setBaseFocusTime(newBaseDuration);
    setTasks((tasks) => {
      const newTaskId = tasks.length + 1;
      const updatedTasks = tasks.concat([
        {
          activity,
          time,
          day: nowString(),
          id: newTaskId,
        },
      ]);

      AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  const handleActivitySelect = (activity: Activity) => setActivity(activity);

  const totalTimeForCurrentActivityToday = tasks
    .filter((t) => t.day === nowString() && t.activity === activity)
    .reduce((a, b) => a + b.time, 0);

  useEffect(() => {
    const getTasksFromStorage = async () => {
      const storedTasks = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
      setTasks(storedTasks ? (JSON.parse(storedTasks) as Task[]) : []);
    };

    getTasksFromStorage();
  }, []);

  return (
    <TasksContext
      value={{
        tasks,
        baseFocusTime,
        handleRest,
        handleActivitySelect,
        totalTimeForCurrentActivityToday,
        activity,
      }}
    >
      {children}
    </TasksContext>
  );
};
