const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out garbage" },
    "task-2": { id: "task-2", content: "Do the other thing" },
    "task-3": { id: "task-3", content: "Don't do anything!" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Todo",
      taskIds: ["task-1", "task-2", "task-3"],
    }
  },
  columnOrder: ["column-1"],
}

export default initialData
