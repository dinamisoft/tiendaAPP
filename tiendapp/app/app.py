from flask import Flask, flash, redirect, render_template, request, url_for
from flask import g 
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from werkzeug.security import check_password_hash, generate_password_hash
from flask_wtf.csrf import CSRFProtect


import db
# Debemos importar la función cerrar_bd para que Flask la ejecute al final de cada request
from db import cerrar_bd 
import sqlite3

from config import config, Config

app = Flask(__name__)
app.config.from_object(Config)
app.config.from_object(config['development'])
csfr = CSRFProtect(app)
login_manager_app = LoginManager(app)

# Añadimos este decorador para asegurar que la conexión a la BD se cierra
# al final de cada contexto de aplicación, previniendo errores de SQLite.
@app.teardown_appcontext
def teardown_db(exception):
    db.cerrar_bd()


@login_manager_app.user_loader
def load_user(id):
    return ModeloUsuario.get_by_id(id)


#-- Endpoints --

@app.route('/')
def index():
    # Redirige al usuario inmediatamente a la página de login
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Obtener datos del formulario
        id_ingresado = request.form['idusuario']
        password_ingresado = request.form['passwordusuario']
        usuario_ingresado = Usuario(id_ingresado, None, password_ingresado)
        
        # Obtener el objeto usuario de la base de datos (incluye el hash almacenado)
        usuario_db = ModeloUsuario.login(usuario_ingresado)
        
        if usuario_db != None:
            # Realizar la verificación del hash (USANDO EL HASH ALMACENADO)
            if Usuario.check_password(usuario_db.password, password_ingresado):
                # Éxito: Contraseña válida
                login_user(usuario_db)
                return redirect(url_for('cliente'))
            else:
                # Error: Contraseña inválida
                flash('Usuario y/o contraseña incorrectos')
                return render_template('login.html')
        else:
            # Error: Usuario no encontrado
            flash('Usuario no encontrado')
            return render_template('login.html')
    else:
        return render_template('login.html')


@app.route('/registro', methods=['GET', 'POST'])
def registro():
    return render_template('registro.html')

@app.route('/olvidaste')
def olvidaste():
    return render_template('olvidaste.html')

@app.route('/cliente')
@login_required
def cliente():
    return render_template('cliente.html')

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    flash('Has cerrado la sesión')
    return render_template('login.html')


#-- Entidades
class Usuario(UserMixin):
    def __init__(self, IdUsuario, NombreUsuario, PasswordUsuario=None) -> None:
        self.id = IdUsuario
        self.nombre = NombreUsuario
        self.password = PasswordUsuario

    def get_id(self):
        return str(self.id)

    @classmethod
    def check_password(self, hashed_password, PasswordUsuario_plana):
        return check_password_hash(hashed_password, PasswordUsuario_plana)

# El print de generate_password_hash para generar el hash inicial.
#print(generate_password_hash("AyCaramba123"))

#-- Modelos
class ModeloUsuario():
    @classmethod
    def login(self, usuario) -> 'Usuario | None':
        try:
            con = db.conexion()
            cursor = con.cursor()
            id_usuario = usuario.id
            sql = """SELECT IdUsuario, NombreUsuario, PasswordUsuario FROM tblusuarios WHERE IdUsuario = ?"""
            cursor.execute(sql, (id_usuario,)) 
            row = cursor.fetchone()
            if row != None:
                return Usuario(row[0], row[1], row[2]) 
            else:
                return None
        except Exception as ex:
            print(f"Error en ModeloUsuario.login: {ex}")
            return None
    
    @classmethod
    def get_by_id(self, id) -> 'Usuario | None':
        try:
            con = db.conexion()
            cursor = con.cursor()
            sql = "SELECT IdUsuario, NombreUsuario FROM tblusuarios WHERE IdUsuario = ?"
            cursor.execute(sql, (id,))
            row = cursor.fetchone()
            if row != None:
                # Construimos el objeto Usuario con IdUsuario y NombreUsuario
                return Usuario(row[0], row[1]) 
            else:
                return None
        except Exception as ex:
            print(f"Error en ModeloUsuario.get_by_id: {ex}")
            return None
