import { Picker } from "@react-native-picker/picker";
import { TasksContext } from "./TasksContextProvider";

import { useContext } from "react";
import { Button } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { activities } from "./constants";
import { TasksTable } from "./TasksTable";
import { Activity } from "./types";

interface ResultsProps {
  goToClock: VoidFunction;
}

const Results = ({ goToClock }: ResultsProps) => {
  const { tasks, activity, handleActivitySelect } = useContext(TasksContext)!;

  const onChangeActivity = (value: Activity) => {
    handleActivitySelect(value);
  };

  return (
    <ThemedView>
      <Button title="Start" onPress={() => goToClock()} />
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
