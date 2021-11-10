from flask import Flask, jsonify, request, json, make_response, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from base64 import b64encode
import base64
import csv
from io import StringIO

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'password'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///work.db'

db = SQLAlchemy(app)

#  ------------------------------Class for user model start-----------------------   

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))
    project = db.Column(db.String(50))

    def __str__(self):
        return 'self.id'


#  ------------------------------Class for annotation model end-----------------------   

#  ------------------------------Class for annotation model start-----------------------   

class Annotation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer)
    imageSrc = db.Column(db.LargeBinary)
    coordinates = db.Column(db.String(128))
    renderedData = db.Column(db.Text)
    name = db.Column(db.String(50))

    def __str__(self):
        return 'self.id'

#  ------------------------------Class for annotation model end-----------------------   

#  ------------------------------Function to annotation user start-----------------------   

def user_serializer(usr):
    return {
        'id': usr.id,
        'username': usr.username,
        'password': usr.password,
        
    }

#  ------------------------------Function to annotation serilaize end-----------------------   


#  ------------------------------Function to annotation serilaize start-----------------------   

def anno_serializer(anno):
    return {
        'id': anno.id,
        'userid': anno.userid,
        'coordinates': anno.coordinates,
        'renderedData': anno.renderedData,
        'name': anno.name
    }

#  ------------------------------Function to annotation serilaize end-----------------------   

#  ------------------------------Function to encode image start-----------------------   

def render_picture(data):

    render_pic = base64.b64encode(data).decode('ascii')
    return render_pic

#  ------------------------------Function to encode image end-----------------------   


#  ------------------------------Route for upload signup starts-----------------------   

@app.route('/signup', methods=['POST'])
def signup():
    request_data = json.loads(request.data)
    sign = User(
        username=request_data['username'],
        email=request_data['email'],
        password=request_data['password'],
        project=request_data['project'],
    )

    db.session.add(sign)
    db.session.commit()
    return {'result': "success"}

#  ------------------------------Route for upload annoated ends-----------------------   

#  ------------------------------Route for upload annoated starts-----------------------   

@app.route('/upload', methods=['POST'])
def upload():

    file = request.files['imageSrc']
    data = file.read()
    render_file = render_picture(data)
    userid = request.form['userid']
    coordinates = request.form['coordinates']

    newFile = Annotation(name=file.filename,
                         imageSrc=data,
                         renderedData=render_file,
                         userid=userid,
                         coordinates=coordinates)
    db.session.add(newFile)
    db.session.commit()

    return {'result': "success"}

#  ------------------------------Route for upload annoated ends-----------------------   


#  ------------------------------Route for get all Image starts-----------------------   


@app.route('/getImages', methods=['GET'])
def pic():

    usr_id = request.args.get('userid')

    return jsonify(
        [*map(anno_serializer, Annotation.query.filter_by(userid=usr_id))])


#  ------------------------------Route for get all Image ends-----------------------   


#  ------------------------------Route for get single Image starts-----------------------             


@app.route('/getSingleImage', methods=['GET'])
def getSingleImage():

    id = request.args.get('id')

    return jsonify([*map(anno_serializer, Annotation.query.filter_by(id=id))])

#  ------------------------------Route for get single Image ends-----------------------   


#  ------------------------------Route for download csv starts-----------------------     


@app.route('/download', methods=['POST'])
def download():

    request_data = json.loads(request.data)
    id = request_data["id"]
    si = StringIO()
    cw = csv.writer(si)

    filterdData = Annotation.query.filter_by(id=id)

    for anno in filterdData:
        final_dictionary = json.loads(anno.coordinates)
        for res in final_dictionary:
            cw.writerow([
                anno.name,
                str(res['x']),
                str(res['y']),
                str(res['h']),
                str(res['w'])
            ])

    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    output.headers["Content-type"] = "text/csv"
    return output


#  ------------------------------Route for download csv ends-----------------------     


#  ------------------------------Route for login starts-----------------------
@app.route('/login', methods=['POST'])
def login():
    request_data = json.loads(request.data)
    return jsonify([
        *map(
            user_serializer,
            User.query.filter_by(username=request_data['username'],
                                 password=request_data['password']))
    ])

#  ------------------------------Route for login ends-----------------------


if __name__ == '__main__':
    app.run(debug=True)