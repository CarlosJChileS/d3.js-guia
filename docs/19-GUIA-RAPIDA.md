# 19. Guía Rápida

Esta guía te ayudará a empezar rápidamente con el proyecto D3.js.

## Requisitos Previos

- **Navegador moderno** (Chrome, Firefox, Edge, Safari)
- **Editor de código** (opcional, para modificar)
- **Python 3** (para servidor local) o cualquier servidor HTTP

## Instalación

### Opción 1: Sin Instalación (CDN)

El proyecto usa CDN para todas las dependencias, **no requiere instalación**:

- D3.js v7 desde `d3js.org`
- Three.js r128 desde `cdnjs.cloudflare.com`

### Opción 2: Clonar/Descargar

```bash
# Si tienes git
git clone <url-del-repositorio>
cd D32

# O simplemente descarga y descomprime el proyecto
```

## Ejecutar el Proyecto

### Paso 1: Iniciar Servidor Local

**Windows (PowerShell):**
```powershell
cd C:\Users\carlo\Videos\D32
python -m http.server 8080
```

**Mac/Linux:**
```bash
cd /ruta/al/proyecto
python3 -m http.server 8080
```

**Alternativa con Node.js:**
```bash
npx http-server -p 8080
```

### Paso 2: Abrir en el Navegador

Abre tu navegador y ve a:
```
http://localhost:8080
```

### Paso 3: Navegar

1. Verás la página principal (`index.html`)
2. Haz clic en cualquier ejemplo para verlo
3. Explora los diferentes tipos de gráficos

## Estructura Rápida

```
D32/
├── index.html              ← Empieza aquí
├── examples/               ← 14 ejemplos de gráficos
│   ├── 01-introduction.html
│   ├── 02-advanced-customization.html
│   ├── 03-3d-charts.html
│   └── ...
├── js/                     ← Funciones auxiliares
│   ├── config.js          ← Configuración
│   ├── utils.js           ← Utilidades
│   └── axes.js            ← Ejes avanzados
├── css/
│   └── styles.css         ← Estilos
└── data/
    └── sample-data.json   ← Datos de ejemplo
```

## Primeros Pasos

### 1. Ver la Introducción

Abre `examples/01-introduction.html` para:
- Conceptos básicos de D3.js
- Primer ejemplo interactivo
- Explicaciones paso a paso

### 2. Explorar Gráficos Comunes

Ve a `examples/05-common-charts.html` para ver:
- Gráfico de línea
- Gráfico de barras
- Gráfico de área
- Gráfico de dispersión
- Gráfico circular (pie/donut)

### 3. Probar Gráficos 3D

Abre `examples/03-3d-charts.html` para:
- 13 tipos de gráficos 3D
- Rotación automática
- Código comentado

## Modificar un Gráfico

### Ejemplo: Cambiar Colores

1. Abre `js/config.js`
2. Busca `colors.categorical`
3. Modifica los colores:
```javascript
colors: {
    categorical: ['#4a90e2', '#50c878', '#f39c12', ...]
}
```

### Ejemplo: Agregar Datos

1. Abre `data/sample-data.json`
2. Agrega tus datos en el formato correspondiente
3. Recarga la página

## Solución de Problemas

### Los gráficos no se ven

1. **Verifica el servidor**: Debe estar en `http://localhost:8080`
2. **Abre la consola**: F12 → Console, busca errores
3. **Verifica CORS**: Los datos JSON requieren servidor local

### Error: "createSVG is not defined"

- Verifica que `js/utils.js` esté cargado
- Revisa la ruta: `../js/utils.js` (relativa desde examples/)

### Los datos no cargan

- Verifica que `data/sample-data.json` exista
- Revisa la ruta en el código: `../data/sample-data.json`
- Asegúrate de usar servidor HTTP (no `file://`)

## Próximos Pasos

1. **[01-INTRODUCCION.md](01-INTRODUCCION.md)**: Aprende conceptos básicos
2. **[03-GRAFICOS-COMUNES.md](03-GRAFICOS-COMUNES.md)**: Entiende los gráficos comunes
3. **[14-PERSONALIZACION.md](14-PERSONALIZACION.md)**: Personaliza tus gráficos
4. **[15-INTERACTIVIDAD.md](15-INTERACTIVIDAD.md)**: Agrega interactividad

## Recursos Adicionales

- **Documentación D3.js**: https://d3js.org/
- **Observable Gallery**: https://observablehq.com/@d3/gallery
- **Three.js Docs**: https://threejs.org/docs/

## Preguntas Frecuentes

**P: ¿Puedo usar esto en producción?**
R: Sí, pero considera optimizar y minificar el código.

**P: ¿Funciona en móviles?**
R: Sí, pero los gráficos 3D pueden ser lentos en dispositivos antiguos.

**P: ¿Cómo agrego mis propios datos?**
R: Modifica `data/sample-data.json` o carga datos desde una API.

**P: ¿Puedo usar TypeScript?**
R: Sí, pero necesitarías configurar TypeScript y tipos de D3.

---

**¿Listo para empezar?** Abre `index.html` y explora los ejemplos.

