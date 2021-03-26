from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return 'index'


@app.route('/shopping')
def shopping():
    food = ['Cheese', 'Fries', 'Coke']
    return render_template('shopping.html', food=food)


if __name__ == '__main__':
    app.run()
