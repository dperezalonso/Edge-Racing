# Edge-Racing
Este es el repositorio conjunto para el projecto de M12 en el que crearemos una webApp para la visualizacion y gestión de Edge Racing.


# Descripción

Este proyecto implementa una base de datos para gestionar una organización que administra competiciones con circuitos, carreras, equipos y pilotos. La base de datos está construida utilizando Prisma ORM y se integra en un entorno Next.js.

# Tecnologías Utilizadas

Next.js - Framework para React con soporte para backend

Prisma ORM - Manejo eficiente de la base de datos

MySQL o PostgresSQL- Motor de base de datos relacional

# Estructura de la Base de Datos

La base de datos contiene las siguientes entidades:

Competicion: Contiene información de las distintas competiciones.

Circuito: Representa los diferentes circuitos donde se llevan a cabo las carreras.

Carrera: Almacena información sobre cada carrera en un circuito y su relación con una competición.

Equipo: Representa los equipos que participan en una competición.

Piloto: Contiene la información de los pilotos asociados a equipos.

Resultado: Registra los resultados de cada carrera para cada piloto.


## 🚀 Flujo de trabajo con ramas

Este proyecto sigue una estrategia de ramas para mantener la estabilidad del código en `main` mientras se desarrollan nuevas funcionalidades en `dev`.

---

### 🌱 Ramas principales

- `main`: Rama estable. Solo se mergea código probado y funcional.
- `dev`: Rama de desarrollo. Se trabaja día a día y se testean nuevas funcionalidades.

---


### 🛠️ Pasar cambios de `dev` a `main`

Cuando todo esté listo en la rama `dev`, seguí estos pasos para integrar los cambios en `main`:

```bash
# 1. Ir a la rama main
git checkout main

# 2. Actualizar con lo último desde el remoto
git pull

# 3. Hacer merge desde dev
git merge dev

# 4. Subir la rama main actualizada a GitHub
git push origin main
