import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { activities } from "@/shared/constants/common";
import { TasksContext } from "@/shared/providers/TasksContextProvider";
import { Activity } from "@/shared/types";
import { Picker } from "@react-native-picker/picker";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { TasksTable } from "./components/TasksTable";

const Results = () => {
  const { tasks, activity, handleActivitySelect } = useContext(TasksContext)!;

  const onChangeActivity = (value: Activity) => {
    handleActivitySelect(value);
  };

  return (
    <ThemedView style={{ padding: 20 }}>
      <ThemedText type="subtitle">Activity:</ThemedText>
      <Picker
        style={styles.select}
        selectedValue={activity}
        onValueChange={onChangeActivity}
      >
        {activities.map((a) => (
          <Picker.Item label={a} key={a} value={a} />
        ))}
      </Picker>
      <TasksTable tasks={tasks.toReversed()} />
    </ThemedView>
  );
};

export default Results;

const styles = StyleSheet.create({
  select: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});
