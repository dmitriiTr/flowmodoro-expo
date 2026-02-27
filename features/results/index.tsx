import { TasksContext } from "@/shared/providers/TasksContextProvider";
import { Picker } from "@react-native-picker/picker";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { activities } from "@/shared/constants/common";
import { Activity } from "@/shared/types";
import { useContext } from "react";
import { TasksTable } from "./components/TasksTable";

const Results = () => {
  const { tasks, activity, handleActivitySelect } = useContext(TasksContext)!;

  const onChangeActivity = (value: Activity) => {
    handleActivitySelect(value);
  };

  return (
    <ThemedView>
      <ThemedText>Activity:</ThemedText>
      <Picker selectedValue={activity} onValueChange={onChangeActivity}>
        {activities.map((a) => (
          <Picker.Item label={a} key={a} value={a} />
        ))}
      </Picker>
      <TasksTable tasks={tasks.toReversed()} />
    </ThemedView>
  );
};

export default Results;
