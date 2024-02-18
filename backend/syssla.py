from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# TODO: Probably make this a dict or something for faster get with labels
tasks = []

class Task:
    def __init__(self, title, labels):
        self.title = title
        self.labels = labels

@app.route("/")
def home():
  return "ayo bet"

@app.route("/api/test")
def test():
    return jsonify({
            "tasks": {
                "task-1": { "id": "task-1", "content": "Take out garbage" },
                "task-2": { "id": "task-2", "content": "Do the other thing" },
                "task-3": { "id": "task-3", "content": "Don't do anything!" },
            },
            "columns": {
                "column-1": {
                    "id": "column-1",
                    "title": "Backlog",
                    "taskIds": ["task-1", "task-2", "task-3"],
                },
                "column-2": {
                  "id": "column-2",
                  "title": "Today",
                  "taskIds": []
                },
                "column-3": {
                  "id": "column-3",
                  "title": "Tomorrow",
                  "taskIds": []
                }
            },
            "columnOrder": ["column-1", "column-2", "column-3"],
        })

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
  app.run(debug=True, port=5174)
