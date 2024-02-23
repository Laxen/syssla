from flask import Flask, request, jsonify
from flask_cors import CORS
import json, sys

app = Flask(__name__)
CORS(app)

state_file = "src/state.json"
state = {}

class Task:
    def __init__(self, id, content, labels, column):
        self.id = id
        self.content = content
        self.labels = labels
        self.column = column

    def to_json(self):
        return {"id": self.id, "content": self.content}

def _write_state():
    global state

    with open(state_file, "w") as f:
        json.dump(state, f, indent=4)

@app.route("/")
def home():
  return "Welcome to Syssla!"

@app.route("/getstate")
def getstate():
    return state

@app.route("/updatestate", methods=["POST"])
def updatestate():
    global state

    state = request.get_json()
    _write_state()

    return "OK"

@app.route("/addtask")
def addtask():
    state["taskCounter"] += 1
    task_id = f"task-{state['taskCounter']}"
    state["tasks"][task_id] = {"content": "New", "id": task_id}
    state["columns"]["Backlog"]["taskIds"].insert(0, task_id)

    _write_state()

    return "OK"

@app.route("/updatetask", methods=["POST"])
def updatetask():
    task = request.get_json()
    state["tasks"][task["id"]] = task

    _write_state()

    return "OK"

def main():
    global state

    try:
        with open(state_file, "r") as f:
            state = json.load(f)
    except FileNotFoundError:
        print("ERROR: Missing state.json")
        sys.exit()
    app.run(debug=True)

if __name__ == "__main__":
    main()
