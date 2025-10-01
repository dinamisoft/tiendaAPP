from flask import g
import sqlite3

#--- Conexión a SQLite ---
def conexion():
    try:
        if 'conexion' not in g:
            g.conexion = sqlite3.connect("..//db//tiendapp.db")
        return g.conexion
    except Exception:
        return "No hay conexión con la base de datos"

def cerrar_bd():
    conexion = g.pop('conexion', None)
    if conexion is not None:
        conexion.close()

#--- Fin conexión a SQLite ---