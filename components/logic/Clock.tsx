import { useContext, useState } from "react";

import { Button } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import Stopwatch from "./Stopwatch";
import { TasksContext } from "./TasksContextProvider";
import Timer from "./Timer";
import { secondsToRoundedMinutes } from "./utils";

interface ClockProps {
  goToResults: VoidFunction;
}

const Clock = ({ goToResults }: ClockProps) => {
  const { activity, totalTimeForCurrentActivityToday, handleRest } =
    useContext(TasksContext)!;

  const [lastFocusTime, setLastFocus] = useState<null | number>(null);

  const onRest = (seconds: number, newBaseDuration: number) => {
    setLastFocus(seconds);
    handleRest(seconds, newBaseDuration);
  };

  const isShowTimer = Boolean(lastFocusTime);

  return (
    <>
      {isShowTimer ? (
        <>
          <ThemedView>
            <ThemedText type="subtitle">Task: Rest</ThemedText>
            <ThemedText>
              focused for{" "}
              {secondsToRoundedMinutes(totalTimeForCurrentActivityToday)} min
            </ThemedText>
          </ThemedView>
          <Timer
            lastFocus={lastFocusTime ?? 0}
            handleExit={() => setLastFocus(null)}
          />
        </>
      ) : (
        <>
          <ThemedView>
            <ThemedText type="subtitle">Task: {activity}</ThemedText>
          </ThemedView>
          <Stopwatch handleRest={onRest} />
        </>
      )}
      <Button title="Exit" onPress={() => goToResults()} />
    </>
  );
};

export default Clock;
