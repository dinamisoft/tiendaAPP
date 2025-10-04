from flask import g
import sqlite3

#--- Conexión a SQLite ---
def conexion():
    try:
        if 'conexion' not in g:
            g.conexion = sqlite3.connect("tiendapp.db")
        return g.conexion
    except Exception as e:
        print(f"Error de conexión a la BD: {e}")
        return None
        """ return "No hay conexión con la base de datos" """

def cerrar_bd():
    conexion = g.pop('conexion', None)
    if conexion is not None:
        conexion.close()

#--- Fin conexión a SQLite ---