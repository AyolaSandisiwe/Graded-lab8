
import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TaskItem from "./Components/TaskItem"; 

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [sortOrder, setSortOrder] = useState("newest"); 

  const addTask = () => {
    const trimmed = taskText.trim();
    if (!trimmed) {
      Alert.alert("Empty task", "Please enter a task before adding.");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: trimmed,
      done: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };


  const filteredAndSortedTasks = useMemo(() => {
    let data = tasks;
    if (filter === "done") data = data.filter((t) => t.done);
    if (filter === "active") data = data.filter((t) => !t.done);

    data = [...data].sort((a, b) =>
      sortOrder === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );
    return data;
  }, [tasks, filter, sortOrder]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Volunteer Task Tracker</Text>
          
        </View>

        
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter new task"
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={addTask}
            style={styles.addButton}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.filterRow}>
          {["all", "active", "done"].map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() =>
              setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
            }
          >
            <Text style={styles.sortText}>
              Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}
            </Text>
          </TouchableOpacity>
        </View>

        
        <FlatList
          data={filteredAndSortedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No tasks found</Text>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf5", padding: 16 },
  header: { marginBottom: 8 },
  title: { fontSize: 33, fontWeight: "700", marginBottom: 15, color: "#e1701a" },
  

  inputRow: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#f1a661",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#06c951ff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#6383ebff",
    marginRight: 6,
  },
  filterButtonActive: { backgroundColor: "#236896ff", borderColor: "#5a759cff" },
  filterText: { color: "#20438fff", fontWeight: "500" },
  filterTextActive: { color: "#fff" },
  sortButton: { marginLeft: "auto" },
  sortText: { color: "#5270c2ff", fontWeight: "600" },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: { color: "#999" },
});
