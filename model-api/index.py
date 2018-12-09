from flask import Flask, request
from predictors.catvsdog import cat_or_dog

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def root():
  return "I'm up"

@app.route("/catvsdog", methods=['GET', 'POST'])
def catvsdog():
  print('IM HERE')
  image = request.files.get('image', '')
  response = cat_or_dog(image)
  return response

if __name__ == "__main__":
  app.run(debug=True, host='127.0.0.1')
