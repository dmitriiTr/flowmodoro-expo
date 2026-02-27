import Clock from "@/components/logic/Clock";
import { Page } from "@/components/logic/enums";
import Results from "@/components/logic/Results";
import { TasksContextProvider } from "@/components/logic/TasksContextProvider";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function AppScreen() {
  const [page, setPage] = useState(Page.Clock);

  const goToClock = () => {
    setPage(Page.Clock);
  };

  const goToResults = () => {
    setPage(Page.Results);
  };

  return (
    <TasksContextProvider>
      <ThemedView style={styles.main}>
        {page === Page.Clock ? (
          <Clock goToResults={goToResults} />
        ) : (
          <Results goToClock={goToClock} />
        )}
      </ThemedView>
    </TasksContextProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    margin: "auto",
  },
});
