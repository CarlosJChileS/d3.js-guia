# 📚 Índice de Documentación del Proyecto D3.js

Este proyecto es una guía completa para aprender y usar D3.js (Data-Driven Documents) con ejemplos prácticos y explicaciones detalladas.

## 📋 Estructura de la Documentación

### 1. Introducción y Conceptos Básicos
- **[01-INTRODUCCION.md](01-INTRODUCCION.md)**: ¿Qué es D3.js? Conceptos fundamentales, estructura del proyecto
- **[02-CONCEPTOS-BASICOS.md](02-CONCEPTOS-BASICOS.md)**: Escalas, ejes, selecciones, data-join pattern

### 2. Gráficos Comunes
- **[03-GRAFICOS-COMUNES.md](03-GRAFICOS-COMUNES.md)**: Línea, barra, área, dispersión, circular (pie/donut)
- **[04-HISTOGRAMAS.md](04-HISTOGRAMAS.md)**: Distribución de frecuencias, normalización, acumulativos
- **[05-BOXPLOT.md](05-BOXPLOT.md)**: Diagramas de caja y bigotes, cuartiles, outliers

### 3. Gráficos Avanzados
- **[06-PARETO.md](06-PARETO.md)**: Gráficos de Pareto, regla 80/20
- **[07-RADAR.md](07-RADAR.md)**: Gráficos de radar/polígono, múltiples dimensiones
- **[08-CASCADA.md](08-CASCADA.md)**: Gráficos de cascada, cambios acumulativos
- **[09-ENJAMBRE.md](09-ENJAMBRE.md)**: Gráficos de enjambre, force simulation
- **[10-KDE.md](10-KDE.md)**: Kernel Density Estimation, estimación de densidad
- **[11-SANKEY.md](11-SANKEY.md)**: Diagramas de Sankey, flujos y relaciones

### 4. Visualizaciones Especiales
- **[12-HEATMAP.md](12-HEATMAP.md)**: Mapas de calor, matrices de correlación
- **[13-GRAFICOS-3D.md](13-GRAFICOS-3D.md)**: Visualizaciones 3D con Three.js

### 5. Personalización e Interactividad
- **[14-PERSONALIZACION.md](14-PERSONALIZACION.md)**: Control de ejes, etiquetas, colores
- **[15-INTERACTIVIDAD.md](15-INTERACTIVIDAD.md)**: Tooltips, zoom, pan, brush, animaciones

### 6. Guías Técnicas
- **[16-ESTRUCTURA-PROYECTO.md](16-ESTRUCTURA-PROYECTO.md)**: Organización de archivos, carpetas, dependencias
- **[17-UTILIDADES.md](17-UTILIDADES.md)**: Funciones auxiliares, config.js, utils.js, axes.js
- **[18-DATOS.md](18-DATOS.md)**: Formato de datos, sample-data.json, carga de datos

### 7. Guías de Uso
- **[19-GUIA-RAPIDA.md](19-GUIA-RAPIDA.md)**: Inicio rápido, instalación, ejecución
- **[20-EJEMPLOS-PRACTICOS.md](20-EJEMPLOS-PRACTICOS.md)**: Casos de uso, mejores prácticas
- **[21-TROUBLESHOOTING.md](21-TROUBLESHOOTING.md)**: Solución de problemas comunes

## 🎯 Cómo Usar Esta Documentación

1. **Para principiantes**: Empieza con `01-INTRODUCCION.md` y `02-CONCEPTOS-BASICOS.md`
2. **Para aprender gráficos específicos**: Ve directamente a la sección correspondiente (ej: `03-GRAFICOS-COMUNES.md`)
3. **Para personalizar**: Consulta `14-PERSONALIZACION.md` y `15-INTERACTIVIDAD.md`
4. **Para problemas técnicos**: Revisa `21-TROUBLESHOOTING.md`

## 📁 Archivos del Proyecto

```
D32/
├── index.html              # Página principal con navegación
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   ├── config.js          # Configuración global (colores, dimensiones)
│   ├── utils.js           # Funciones auxiliares (tooltips, SVG, estadísticas)
│   └── axes.js            # Funciones avanzadas de ejes
├── data/
│   └── sample-data.json   # Datos de ejemplo para todos los gráficos
├── examples/
│   ├── 01-introduction.html
│   ├── 02-advanced-customization.html
│   ├── 03-3d-charts.html
│   ├── 04-interactive-charts.html
│   ├── 05-common-charts.html
│   ├── 06-heatmap.html
│   ├── 07-histogram.html
│   ├── 08-boxplot.html
│   ├── 09-pareto.html
│   ├── 10-radar.html
│   ├── 11-waterfall.html
│   ├── 12-swarm.html
│   ├── 13-kde.html
│   └── 14-sankey.html
└── docs/                   # Esta documentación
```

## 🚀 Inicio Rápido

1. **Instalar dependencias**: No requiere instalación, usa CDN
2. **Ejecutar servidor local**: `python -m http.server 8080`
3. **Abrir navegador**: `http://localhost:8080`
4. **Explorar ejemplos**: Navega desde `index.html`

## 📖 Convenciones de la Documentación

- **Código**: Se muestra con sintaxis destacada
- **Conceptos importantes**: En negrita
- **Ejemplos**: Incluyen código completo y explicaciones
- **Referencias cruzadas**: Enlaces entre documentos relacionados

## 🔗 Recursos Adicionales

- [Documentación oficial de D3.js](https://d3js.org/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Observable D3 Gallery](https://observablehq.com/@d3/gallery)

---

**Última actualización**: 2024
**Versión D3.js**: v7
**Versión Three.js**: r128

