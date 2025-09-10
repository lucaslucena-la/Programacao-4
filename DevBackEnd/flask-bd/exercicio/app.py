import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///produtos.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    marca = db.Column(db.String(80), nullable=False)
    valor = db.Column(db.Float, nullable=False)


#Rotas de aplicação

#Rota para página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para a página de cadastro (GET para exibir, POST para processar o formulário)
@app.route('/cadastro', methods= ['GET', 'POST'])
def cadastrar():
    if request.method == 'POST':
        #pega os dados do fomulário 
        nome = request.form['nome_produto']
        marca = request.form['marca_produto']
        valor = request.form['valor_produto']

        # Cria um novo objeto Produto e adiciona ao banco de dados
        novo_produto = Produto(nome=nome, marca=marca, valor = valor)
        db.session.add(novo_produto)
        db.session.commit()

        return redirect(url_for('listar'))
    return render_template('cadastrar.html')

#Rota para a página de listagem de produtos
@app.route('/listar')
def listar():
    produtos = Produto.query.all()
    return render_template('listar.html', produtos = produtos)

if __name__ == '__main__':
    # Cria a tabela no banco de dados se ela ainda não existir
    with app.app_context():
        db.create_all()
    app.run(debug=True)