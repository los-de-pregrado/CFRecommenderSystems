# MINE4201 - Sistemas de Recomendación: CF Recommender Systems
Primer Taller del curso de Sistemas de Recomendación, de la Universidad de los Andes
Rogelio García Escallon
Nicolás Hernández Rojas
Santiago Cortés Fernández

## Overview/Descripcion

En este repositorio se encuentran todos los elementos relacionados al primer taller del curso _Sistemas de Recomendación_. En detalle, se encuentran los archivos para el preprocesamiento del _dataset_, los archivos de experimentación referentes a los puntos de la guía, y el código de la página web desarrollada para la visualización del funcionamiento del sistema de recomendación.


## Prerequisites

Para poder correr este proyecto es necesario contar con lo siguiente: 
* [NodeJs](https://nodejs.org/es/)
* [npm](https://www.npmjs.com/)
* [Python v3.XX](https://www.python.org/downloads/)

## Instalación y Eecución

Primero, es necesaro correr el siguiente comando (en la raíz del proyecto) en python para descargar las dependencias del proyecto
```
pip install -r requierments.txt
cd webpage/artistfm/src/public/batch
batch.py
```

Para la página web, ejecute los siguientes comandos (en "./webpage/artistfm"): 
repository (Tenga en cuenta las **Especificaciones de Ejecución**)
```
npm install
npm start
```

### Especificaciones de Ejecución
* La página web puede ser accedida mediante el llamado a _http://<localhost o ip del servidor>:8082_
* Los archivos de Python que ejecutan los sistemas de recomendación son accedidos mediatne el llamado a _http://<localhost o ip del servidor>:8081_


## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE.md](LICENSE) file for details
