CREATE TABLE tblperfiles(
    IdPerfil INT PRIMARY KEY NOT NULL,
    NombrePerfil VARCHAR(60) NOT NULL);

CREATE TABLE tblusuarios(
    IdUsuario INT PRIMARY KEY NOT NULL,
    IdPerfilUsuario INT NOT NULL,
    NombreUsuario VARCHAR(250) NOT NULL,
    EmailUsuario VARCHAR(250) NOT NULL,
    TelefonoUsuario VARCHAR(13) NOT NULL,
    PasswordUsuario VARCHAR(16) NOT NULL,
    Sexo VARCHAR(20) NOT NULL,
    FOREIGN KEY (IdPerfilUsuario) REFERENCES tblperfiles(IdPerfil));

INSERT INTO tblperfiles (IdPerfil, NombrePerfil) VALUES (0,"SUPER-ADMIN");
INSERT INTO tblperfiles (IdPerfil, NombrePerfil) VALUES (1,"ADMINISTRADOR");
INSERT INTO tblperfiles (IdPerfil, NombrePerfil) VALUES (2,"USUARIO");

INSERT INTO tblusuarios VALUES (0,0,"SÚPER ADMINISTRADOR","dinamisoft46@gmail.com","3045931833","AyCaramba123","HOMBRE");
INSERT INTO tblusuarios VALUES (1,1,"ADMINISTRADOR DE PRUEBA","correoprueba01@gmail.com","3040000001","AyCaramba123","HOMBRE");
INSERT INTO tblusuarios VALUES (2,2,"USUARIO DE PRUEBA","correoprueba02@gmail.com","3040000002","AyCaramba123","HOMBRE");

CREATE TABLE tblunidades(
    IdUnidad INT PRIMARY KEY NOT NULL,
    NombreUnidad VARCHAR(120) NOT NULL);

CREATE TABLE tblproductos(
    IdProducto INT PRIMARY KEY NOT NULL,
    NomProducto VARCHAR(150) NOT NULL,
    ValorProducto INT NOT NULL,
    IdUnidadProducto INT NOT NULL,
    FOREIGN KEY (IdUnidadProducto) REFERENCES tblUnidades(IdUnidad));

    
CREATE TABLE tblcomentarios(
    IdComentario INT PRIMARY KEY NOT NULL,
    CalifiComentario INT(1) NOT NULL,
    IdProductoComentario INT NOT NULL,
    TextComentario STRING(255) NOT NULL,
    FOREIGN KEY (IdProductoComentario) REFERENCES tblproductos(IdProducto));


SELECT * FROM tblperfiles;
SELECT * FROM tblusuarios;
SELECT * FROM tblunidades;
SELECT * FROM tbl;