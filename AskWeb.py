from werkzeug.exceptions import BadRequestKeyError
from flask import Flask
from flask import request
import flask
from flask.ext.sqlalchemy import SQLAlchemy

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:edereder@localhost/Test'
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'T_USER'
    id = db.Column(db.Text, primary_key=True)
    fullname = db.Column(db.Text)


ass_table_openquestion_2_decider = db.Table('T_ASKWEBITEM_2_DECIDER',
                                            db.Column('askwebitem', db.Text, db.ForeignKey('T_CLOSEDQUESTION.id')),
                                            db.Column('decider', db.Text, db.ForeignKey('T_USER.id')))


class ClosedQuestion(db.Model):
    __tablename__ = "T_CLOSEDQUESTION"
    id = db.Column(db.Text, primary_key=True)
    question = db.Column(db.Text)
    decider = db.relationship("User",
                              secondary=ass_table_openquestion_2_decider,
                              primaryjoin=(ass_table_openquestion_2_decider.c.askwebitem == id),
                              secondaryjoin=(ass_table_openquestion_2_decider.c.decider == User.id))

    def __init__(self, id, question):
        self.id = id
        self.question = question


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/ClosedQuestionService/ById/<int:id>', methods=['GET'])
def get_closedquestion_byid(id):
    cq = ClosedQuestion.query.filter_by(id=id).first()
    deciders = cq.decider
    resp_deciders = []
    if len(deciders) > 0:
        for d in deciders:
            resp_deciders.append(d.id)
    resp = {"deciders": resp_deciders, "question": cq.question, "id": id}

    return flask.json.dumps(resp)


@app.route("/ClosedQuestionService", methods=["POST"])
def closed_question_service():
    try:
        closed_question_json = request.form['closedQuestion']
        closed_question = flask.json.loads(closed_question_json)
        action = request.form['action']
        closed_question_id = ""
        question = ""
        deciders = []
        try:
            closed_question_id = closed_question["id"]
        except:
            pass
        if action == "add":
            try:
                question = closed_question["question"]
                deciders = closed_question["deciders"]
            except:
                pass
            if closed_question_id != "" and question != "" and deciders != []:
                new_closed_question = ClosedQuestion(closed_question_id, question)
                db.session.add(new_closed_question)
                for decider in deciders:
                    db.session.execute(ass_table_openquestion_2_decider.insert().values(askwebitem=closed_question_id,
                                                                                        decider=decider))
                db.session.commit()
                resp = flask.json.dumps({"status": "ok"})
            else:
                resp = flask.json.dumps({"status": "nok"})
            return resp
        elif action == "delete":
            pass
        # TODO Implement delete function

# Eine kleine Anpassung




    except BadRequestKeyError:
        pass

    pass


@app.route('/login', methods=['POST'])
def login():
    user = User.query.all()
    eder = User.query.filter_by(id='ederg').first()
    eder.fullname = "neuer Name"
    db.session.commit()
    users = []
    for u in user:
        userInResponse = {}
        userInResponse["id"] = u.id
        userInResponse["fullname"] = u.fullname
        users.append(userInResponse)
    resp = flask.json.dumps(users)

    return resp


if __name__ == '__main__':
    app.run()
