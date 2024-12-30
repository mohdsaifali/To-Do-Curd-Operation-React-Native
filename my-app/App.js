import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Function to add a task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: task }]);
      setTask("");
    } else {
      Alert.alert("Error", "Please enter a valid task");
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to edit a task
  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.title);
      setEditMode(true);
      setCurrentTaskId(id);
    }
  };

  // Function to update the task after editing

  const updateTask = () => {
    setTasks(
      tasks.map((t) => (t.id === currentTaskId ? { id: t.id, title: task } : t))
    );
    setTask("");
    setEditMode(false);
    setCurrentTaskId(null);
  };

  // Render each task
  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style ={{width:"70%"}}>{item.title}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => editTask(item.id)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={editMode ? updateTask : addTask}
      >
        <Text style={styles.buttonText}>
          {editMode ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        style={styles.taskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "purple",
  },
  input: {
    borderColor: "purple",
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskList: {
    marginTop: 20,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  editButton: {
    marginRight: 10,
    fontSize: 15,
    color: "blue",
  },
  deleteButton: {
    color: "red",
    fontSize: 15,
  },
});
