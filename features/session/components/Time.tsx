import { ThemedText } from "@/components/themed-text";
import { useState } from "react";
import { formatTimeWithSeconds } from "../utils";

interface TimeProps {
  hours: number;
  minutes: number;
  seconds: number;
  color?: string;
}

export const Time = (props: TimeProps) => {
  const [showSeconds, setShowSeconds] = useState(true);
  const { hours, minutes, seconds, color } = props;

  const minutesSum = minutes + hours * 60;

  return (
    <ThemedText
      style={{ textAlign: "center", color }}
      type="bigTitle"
      onPress={() => setShowSeconds((show) => !show)}
    >
      {showSeconds ? (
        formatTimeWithSeconds(minutesSum, seconds)
      ) : (
        <>
          {minutesSum}
          <ThemedText>min</ThemedText>
        </>
      )}
    </ThemedText>
  );
};
