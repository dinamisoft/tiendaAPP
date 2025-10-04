from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Permite peticiones desde el frontend (cliente.html)

# -----------------------
# Datos simulados
# -----------------------
productos = [
    {"id": 1, "nombre": "Fresa", "precio": 12490},
    {"id": 2, "nombre": "Banano Maduro", "precio": 3290},
    {"id": 3, "nombre": "Manzana Verde", "precio": 13980},
    {"id": 4, "nombre": "Naranja", "precio": 7990},
    {"id": 5, "nombre": "Uvas", "precio": 16980},
    {"id": 6, "nombre": "Kiwi", "precio": 25990}
]

carrito = []
calificaciones = []

# -----------------------
# Endpoints principales
# -----------------------

# 1️⃣ Página principal
@app.route('/')
def home():
    return send_from_directory('.', 'cliente.html')

# 2️⃣ Obtener productos
@app.route('/productos', methods=['GET'])
def obtener_productos():
    return jsonify(productos)

# 3️⃣ Obtener carrito
@app.route('/carrito', methods=['GET'])
def obtener_carrito():
    return jsonify(carrito)

# 4️⃣ Agregar al carrito
@app.route('/carrito', methods=['POST'])
def agregar_carrito():
    data = request.get_json()
    producto_id = data.get('id')
    cantidad = data.get('cantidad', 1)
    producto = next((p for p in productos if p['id'] == producto_id), None)

    if not producto:
        return jsonify({'error': 'Producto no encontrado'}), 404

    existente = next((c for c in carrito if c['id'] == producto_id), None)
    if existente:
        existente['cantidad'] += cantidad
    else:
        carrito.append({'id': producto['id'], 'nombre': producto['nombre'], 'precio': producto['precio'], 'cantidad': cantidad})
    return jsonify({'mensaje': 'Producto agregado', 'carrito': carrito})

# 5️⃣ Vaciar carrito
@app.route('/carrito', methods=['DELETE'])
def vaciar_carrito():
    carrito.clear()
    return jsonify({'mensaje': 'Carrito vaciado'})

# 6️⃣ Enviar calificación
@app.route('/calificacion', methods=['POST'])
def guardar_calificacion():
    data = request.get_json()
    calificaciones.append(data)
    return jsonify({'mensaje': 'Calificación recibida', 'total_calificaciones': len(calificaciones)})

# -----------------------
# Ejecutar servidorll
# -----------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)