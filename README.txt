Pasos para correr el proyecto

1.- clonar proyecto del repositorio de git

2.- restaurar los paquetes nugget de la solucion



-----------------------------------------------3. Lado del servidor---------------------------------------

>Debido a que se utilizo code firts primero ejecutar el comando
	configurar el archivo : appsettings.json
		Modificar la cadena de conexion con su server y su inicio de sesion (con el nombre de la base de datos que prefieran)

>Abrir la consola de administrador de paquetes paquetes 
	Seleccionar el proyecto predeterminado: Test.Jugueteria.DataAccess.Contracts  
	Ejecutar el comando: update-database


>Para levantar ejecutar normal ya que esta como proyecto predeterminado

-----------------------------------------------4. Lado del cliente-----------------------------------------


El lado del cliente esta hecho con react js por lo que se necesitaran los siguientes pasos para continuar

***Es necesario tener instalado Node js

>Abrir la consola de administrador de paquetes paquetes 
	Ejecutar el comando: cd Test.Jugueteria.Client/ClientApp
	Ejecutar el comando: npm install


> Para levantar ejecutar el comando: npm start





