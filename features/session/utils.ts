import { REST_RATIO } from "@/shared/constants/common";

export const getTimeRest = (lastFocus: number) => {
  const timeRest = new Date();
  const restSeconds = lastFocus / REST_RATIO;
  timeRest.setSeconds(timeRest.getSeconds() + restSeconds);
  return timeRest;
};

export const formatTime = (time: number) => (time < 10 ? "0" + time : time);

export const formatTimeWithSeconds = (minutes: number, seconds: number) =>
  `${formatTime(minutes)}:${formatTime(seconds)}`;
