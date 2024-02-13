from flask import Flask, request

app = Flask(__name__)

# TODO: Probably make this a dict or something for faster get with labels
tasks = []

class Task:
    def __init__(self, title, labels):
        self.title = title
        self.labels = labels

@app.route("/")
def home():
  return "ayo bet"

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
  app.run(debug=True)
