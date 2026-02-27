import { useAudioPlayer } from "expo-audio";
import { useContext, useEffect, useMemo, useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TasksContext } from "@/shared/providers/TasksContextProvider";
import { Button, StyleSheet, TextInput } from "react-native";
import { useStopwatch } from "react-timer-hook";
import { Time } from "./Time";
const audioSource = require("@/assets/audio/alarm.mp3");

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
        <ThemedView style={{ margin: "auto" }}>
          <ThemedText lightColor="grey" disabled>
            Duration, min
          </ThemedText>
          <TextInput
            style={styles.input}
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

const styles = StyleSheet.create({
  input: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default Stopwatch;
