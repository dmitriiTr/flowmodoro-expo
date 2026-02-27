import { useAudioPlayer } from "expo-audio";
import { useContext, useEffect, useMemo, useState } from "react";

import { Button, TextInput } from "react-native";
import { useStopwatch } from "react-timer-hook";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { TasksContext } from "./TasksContextProvider";
import { Time } from "./Time";
const audioSource = require("./alarm.mp3");

interface StopwatchProps {
  handleRest: (seconds: number, newBaseDuration: number) => void;
}

const Stopwatch = ({ handleRest }: StopwatchProps) => {
  const { baseFocusTime } = useContext(TasksContext)!;
  const player = useAudioPlayer(audioSource);

  const [focusTime, setFocusTime] = useState(baseFocusTime);
  const focusSeconds = useMemo(() => focusTime * 60, [focusTime]);

  const { totalSeconds, seconds, minutes, hours, start, isRunning } =
    useStopwatch({
      autoStart: false,
    });

  const isTimeCompleted = totalSeconds >= focusSeconds;

  useEffect(() => {
    let interval: number | null = null;
    if (isTimeCompleted) {
      interval = setInterval(() => {
        player.seekTo(0);
        player.play();
      }, 30 * 60 * 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimeCompleted]);

  const handleStartClick = () => {
    start();
  };

  const handleRestClick = () => {
    handleRest(totalSeconds, focusTime);
  };

  const getColorForTime = () => {
    const isOvertime = totalSeconds >= focusSeconds * 2;

    if (isOvertime) {
      return "red";
    }

    if (isTimeCompleted) {
      return "blue";
    }

    return undefined;
  };

  return (
    <ThemedView>
      <ThemedView>
        <Time
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          color={getColorForTime()}
        />
      </ThemedView>
      <ThemedView>
        <ThemedView>
          <ThemedText>Duration, min</ThemedText>
          <TextInput
            value={(isNaN(focusTime) ? "" : focusTime).toString()}
            autoFocus
            onChangeText={(e) => setFocusTime(parseInt(e))}
            editable={!isRunning}
          />
          {isRunning ? (
            <Button onPress={handleRestClick} title="Rest"></Button>
          ) : (
            <Button
              onPress={handleStartClick}
              disabled={isRunning}
              title="Start"
            ></Button>
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default Stopwatch;
