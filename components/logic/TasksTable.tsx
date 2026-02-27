import { FlatList, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { Task } from "./types";
import { groupTasks, secondsToRoundedMinutes } from "./utils";

export const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  const tasksGrouped = groupTasks(tasks);

  const tasksMapped: Task[] = tasksGrouped.map((tasks) => {
    const firstTask = tasks![0];
    return {
      day: firstTask.day,
      time: tasks!.reduce((a, b) => a + b.time, 0) ?? 0,
      activity: firstTask.activity,
      id: firstTask.id,
    };
  });

  return (
    <ThemedView>
      <FlatList
        data={tasksMapped}
        renderItem={({ item }) => {
          return (
            <ThemedView style={styles.tableRow}>
              <ThemedText>{item.day}</ThemedText>
              <ThemedText>{item.activity}</ThemedText>
              <ThemedText>{secondsToRoundedMinutes(item.time)}</ThemedText>
            </ThemedView>
          );
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
