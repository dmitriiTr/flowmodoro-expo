import { ThemedView } from "@/components/themed-view";
import Results from "@/features/results";
import { StyleSheet } from "react-native";

export default function ResultsScreen() {
  return (
    <ThemedView style={styles.container}>
      <Results />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
