import { ThemedView } from "@/components/themed-view";
import Session from "@/features/session";
import { StyleSheet } from "react-native";

export default function SessionScreen() {
  return (
    <ThemedView style={styles.container}>
      <Session />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
