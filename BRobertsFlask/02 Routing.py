from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "This is the homepage"


@app.route('/waleed')
def waleed():
    return "<h2>This is Waleed<h2>"


@app.route('/<name>')
def _name(name):
    return "<h2>This is " + name + "<h2>"


@app.route('/number/<int:num>')
def _num(num):
    return "<h2>Number is " + str(num) + "<h2>"


if __name__ == '__main__':
    app.run()
