# 임시입니다

from flask import Flask, jsonify, request
from tensorflow.python.keras.models import load_model
from tensorflow.python.keras.layers import BatchNormalization
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)

# custom_objects 인자를 사용하여 모델 로드
model = load_model(r'C:\Users\gjaischool\Desktop\kekeke\kekeke\Flask\kekekeproject02.h5', custom_objects={'BatchNormalization': BatchNormalization})

@app.route('/predict', methods=['POST'])


def process_image(image_encoded):
    image_data = base64.b64decode(image_encoded)
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((150, 150))
    image_array = np.array(image).astype(np.float32) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

def predict():
    message = request.get_json(force=True)
    image = process_image(message['image'])
    prediction = model.predict(image)
    response = {
        'prediction': prediction.tolist()
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
