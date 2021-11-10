# annotation

### How to run Project

##### Run React Project

1. Go to folder **react-anno**
2. Run command: **npm install**
3. Run command: **npm start** it will run on some port

##### Run Flask Project

1. Go to folder **python-anno**
2. Run command: **source ./env/bin/activate** : this is done to run the virtual environment is your machine
3. To make the table run following commands: 
      **python3**
      **from app import db**
      **db.create_all()**
      **exit()**
4. To start the server type: **python3 app.py**
5. Now it will running on some port copy it and paste in **react-anno->src->API->API.js** and paste to **baseURL**

### How to use the app
1. GO to the browser and paste the url generated from react project
2. Signup
3. Login
4. Upload the traffic photos
5. Click on the photo in which you to do annotation
6. On the picture press the mouse down to partiular vehicle and make recatangle by dragging the mouse and leave it
7. then select the type of vechile from dropdown
8. Click on save
9. Then you will be redirected to your annotation
10. Click on image to see the annoted image and csv can be downloaded
11. csv consist of x, y and height and widht of rectangle
