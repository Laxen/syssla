from flask import Flask, request, jsonify
from flask_cors import CORS
import json, sys

app = Flask(__name__)
CORS(app)

state = {}

class Task:
    def __init__(self, id, content, labels, column):
        self.id = id
        self.content = content
        self.labels = labels
        self.column = column

    def to_json(self):
        return {"id": self.id, "content": self.content}

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

    with open("state.json", "w") as f:
        json.dump(state, f, indent=4)

    return "OK"

@app.route("/addtask")
def addtask():
    title = request.args.get("title", "")
    labels = request.args.get("labels", "").split(",")

    if not title:
        return "ERROR: Provide title"

    tasks.append(Task(title, labels))

    return "OK"

@app.route("/gettasks")
def gettasks():
    label = request.args.get("label", "")

    ret = ""
    for task in tasks:
        if not label or label in task.labels:
            ret += f"{task.title} ({','.join(task.labels)})\n"

    return ret

@app.route("/getlabels")
def getlabels():
    labels = set().union(*[task.labels for task in tasks])

    return str(labels)

if __name__ == "__main__":
    try:
        with open("state.json", "r") as f:
            state = json.load(f)
    except FileNotFoundError:
        print("ERROR: Missing state.json")
        sys.exit()
    app.run(debug=True)
