from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def index():
    return "Method used: %s" % request.method


@app.route('/bacon', methods=['Get', 'POST'])
def bacon():
    return "Method used: %s" % request.method


@app.route('/signup')
def signup():
    return "<form action=/bacon method=\"POST\"><button type='submit'>Submit</button></form> "


if __name__ == '__main__':
    app.run()
