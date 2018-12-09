import boto3
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model, Model

def cat_or_dog(user_image):

    s3 = boto3.resource('s3')

    s3.Bucket('model-api').download_file('models/catvsdog-vgg16.h5', '/tmp/catvsdog-vgg16.h5')
    s3.Bucket('model-api').download_file('models/catvsdog-classifier.h5', '/tmp/catvsdog-classifier.h5')

    vgg16 = load_model('/tmp/catvsdog-vgg16.h5')
    classifier = load_model('/tmp/catvsdog.py')

    img = image.load_img(user_image)
    processed_image = img.resize((150, 150))

    input_features = vgg16.predict(processed_image)
    prediction = classifier.predict(input_features)

    return 'dog' if prediction == 1 else 'cat'




