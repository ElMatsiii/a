# Sistema de Retención Estudiantil UCN

Proyecto Integrador Software - Frontend
Diciembre 2025

## Cómo ejecutar el proyecto

1. Instalar las dependencias:
```
npm install
```

2. Poner el archivo `output.json` dentro de la carpeta `public/data/`

3. Iniciar la aplicación:
```
npm start
```

4. Se abre automáticamente en el navegador en http://localhost:3000

## Cómo se define y calcula la retención

La retención año 1 se calcula así:

**Paso 1 - Identificar primera matrícula:**
Un estudiante cuenta como "primera matrícula" en una carrera cuando:
- Tiene cod_estado = "M" (Matriculado)
- year_estado = year_admision (se matriculó el mismo año que entró)

**Paso 2 - Verificar retención:**
Ese estudiante está "retenido" si además:
- Tiene cod_estado = "M" en el año siguiente (year_admision + 1)

**Cálculo del porcentaje:**
```
% retención = (estudiantes retenidos / estudiantes cohorte) * 100
```

Ejemplo: Si en 2020 entraron 100 estudiantes a una carrera, y de esos 75 se volvieron a matricular en 2021, entonces la retención es 75%.

## Vistas incluidas y cómo usarlas

### Vista 1: Resumen por Año
- Muestra una tabla con todos los años de cohorte
- Por cada año muestra: cantidad de estudiantes que entraron, cuántos se retuvieron, y el porcentaje
- No tiene filtros, muestra todo

### Vista 2: Por Carrera  
- Muestra el detalle de retención por cada carrera
- Tiene 2 filtros:
  - **Año de Cohorte**: Para ver solo un año específico
  - **Carrera**: Para ver solo una carrera específica
- Se pueden usar los filtros juntos o por separado
- La tabla muestra código de carrera, nombre, año, cohorte, retenidos y porcentaje

## Arquitectura del código

El proyecto está organizado en capas para que sea fácil conectarlo a un backend real después:

- **api/** - Aquí está el mock que lee el JSON (retentionApi.js)
- **services/** - La lógica de negocio, llama a la API
- **utils/** - Las funciones que hacen los cálculos de retención  
- **components/** - Los componentes React de las vistas
- **models/** - Los tipos de datos que se usan

Para conectar un backend real solo hay que cambiar `retentionApi.js` para que haga fetch a los endpoints HTTP en vez de leer el JSON. El resto del código no necesita cambios.