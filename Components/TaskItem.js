
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={styles.taskTextWrapper}
        activeOpacity={0.7}
      >
        <Text style={styles.checkbox}>{task.done ? "✅" : "⬜️"}</Text>
        <Text
          style={[styles.taskText, task.done && styles.taskTextDone]}
          numberOfLines={2}
        >
          {task.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: "#fcd1f5ff", 
    borderRadius: 8,
    marginBottom: 8,
  },
  taskTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: { fontSize: 22, marginRight: 10 },
  taskText: { flex: 1, fontSize: 16, color: "#333" },
  taskTextDone: { textDecorationLine: "line-through", color: "#999" },
  deleteButton: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 6,
  },
  deleteText: { fontSize: 20 },
});
