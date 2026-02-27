import { useContext, useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TasksContext } from "@/shared/providers/TasksContextProvider";
import { secondsToRoundedMinutes } from "@/shared/utils";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";

const Clock = () => {
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
            <ThemedText centered type="subtitle">
              Task: Rest
            </ThemedText>
            <ThemedText centered>
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
            <ThemedText centered type="subtitle">
              Task: {activity}
            </ThemedText>
          </ThemedView>
          <Stopwatch handleRest={onRest} />
        </>
      )}
    </>
  );
};

export default Clock;
