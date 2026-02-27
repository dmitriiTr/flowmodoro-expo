import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAudioPlayer } from "expo-audio";
import { Button } from "react-native";
import { useTimer } from "react-timer-hook";
import { getTimeRest } from "../utils";
import { Time } from "./Time";
const audioSource = require("@/assets/audio/alarm.mp3");

interface TimerProps {
  handleExit: () => void;
  lastFocus: number;
}

const Timer = (props: TimerProps) => {
  const { handleExit, lastFocus } = props;
  const player = useAudioPlayer(audioSource);

  const onExpire = () => {
    player.seekTo(0);
    player.play();
  };

  const { seconds, minutes, hours } = useTimer({
    autoStart: true,
    expiryTimestamp: getTimeRest(lastFocus),
    onExpire,
  });

  const handleExitClick = () => {
    handleExit();
  };

  const isTimeUp = hours === 0 && minutes === 0 && seconds === 0;

  return (
    <ThemedView>
      <ThemedView>
        {isTimeUp ? (
          <ThemedText centered type="bigTitle">
            Time&apos;s Up
          </ThemedText>
        ) : (
          <Time hours={hours} minutes={minutes} seconds={seconds} />
        )}
      </ThemedView>
      <ThemedView style={{ margin: "auto" }}>
        <Button onPress={handleExitClick} title="End rest"></Button>
      </ThemedView>
    </ThemedView>
  );
};

export default Timer;
