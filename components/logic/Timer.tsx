import { useAudioPlayer } from "expo-audio";
import { Button } from "react-native";
import { useTimer } from "react-timer-hook";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { Time } from "./Time";
import { getTimeRest } from "./utils";
const audioSource = require("./alarm.mp3");

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
          <ThemedText>Time&apos;s Up</ThemedText>
        ) : (
          <Time hours={hours} minutes={minutes} seconds={seconds} />
        )}
      </ThemedView>
      <Button onPress={handleExitClick} title="End rest"></Button>
    </ThemedView>
  );
};

export default Timer;
