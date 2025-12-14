# 13. Gráficos 3D

Los gráficos 3D añaden una dimensión adicional a las visualizaciones, permitiendo representar datos en el espacio tridimensional usando **Three.js** junto con **D3.js**.

## ¿Por Qué Gráficos 3D?

✅ **Más información**: Representar 3 variables simultáneamente
✅ **Impacto visual**: Visualizaciones más llamativas
✅ **Análisis espacial**: Datos con coordenadas 3D naturales
⚠️ **Precaución**: Pueden ser difíciles de interpretar si no se usan bien

## Tecnologías Utilizadas

### Three.js
Biblioteca JavaScript para crear gráficos 3D en el navegador usando WebGL.

### D3.js
Se usa para:
- **Escalar datos** a coordenadas 3D
- **Generar colores** según valores
- **Procesar datos** antes de renderizar

## Conceptos Fundamentales

### 1. Escena, Cámara, Renderer

```javascript
// Escena: Contenedor 3D
const scene = new THREE.Scene();

// Cámara: Punto de vista
const camera = new THREE.PerspectiveCamera(
    75,                              // Campo de visión
    width / height,                  // Aspecto
    0.1,                             // Cerca
    1000                             // Lejos
);

// Renderer: Dibuja en el canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);
```

### 2. Iluminación

```javascript
// Luz ambiental (ilumina todo uniformemente)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Luz direccional (crea sombras y profundidad)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);
```

### 3. Geometrías y Materiales

```javascript
// Geometría: La forma 3D
const geometry = new THREE.BoxGeometry(1, 2, 1);  // Ancho, alto, profundo

// Material: La apariencia
const material = new THREE.MeshPhongMaterial({ 
    color: 0x4a90e2,
    shininess: 100
});

// Mesh: Combinación de geometría + material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

## Integración D3.js + Three.js

### Escalar Datos a 3D

```javascript
// D3 escala datos a coordenadas 3D
const xScale = d3.scaleLinear()
    .domain([0, 100])      // Valores de datos
    .range([-5, 5]);       // Coordenadas 3D

const yScale = d3.scaleLinear()
    .domain([0, 50])
    .range([0, 3]);

const zScale = d3.scaleLinear()
    .domain([0, 200])
    .range([-5, 5]);

// Aplicar a objetos 3D
data.forEach(d => {
    const bar = new THREE.Mesh(geometry, material);
    bar.position.set(
        xScale(d.x),    // Posición X
        yScale(d.y),    // Posición Y (altura)
        zScale(d.z)     // Posición Z
    );
    scene.add(bar);
});
```

### Colores con D3

```javascript
// Escala de colores D3
const colorScale = D3Config.createSequentialScale([0, 100]);

// Aplicar a material
const material = new THREE.MeshPhongMaterial({ 
    color: new THREE.Color(colorScale(d.valor))
});
```

## Tipos de Gráficos 3D

### 1. Barras 3D

```javascript
data.forEach(d => {
    const geometry = new THREE.BoxGeometry(0.8, zScale(d.value), 0.8);
    const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(colorScale(d.value))
    });
    const bar = new THREE.Mesh(geometry, material);
    bar.position.set(xScale(d.x), zScale(d.value) / 2, yScale(d.y));
    scene.add(bar);
});
```

### 2. Superficie 3D

```javascript
// Crear superficie desde matriz de datos
const geometry = new THREE.BufferGeometry();
const positions = [];
const colors = [];

// Triangulación: cada cuadrado = 2 triángulos
for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - 1; j++) {
        // Triángulo 1
        positions.push(x1, y1, z1);
        positions.push(x2, y2, z2);
        positions.push(x3, y3, z3);
        
        // Triángulo 2
        positions.push(x2, y2, z2);
        positions.push(x4, y4, z4);
        positions.push(x3, y3, z3);
    }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### 3. Dispersión 3D

```javascript
data.forEach(point => {
    const geometry = new THREE.SphereGeometry(0.15, 8, 8);
    const material = new THREE.MeshPhongMaterial({ 
        color: point.color
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(point.x, point.y, point.z);
    scene.add(sphere);
});
```

### 4. Líneas 3D

```javascript
const geometry = new THREE.BufferGeometry();
const positions = [];

points.forEach(point => {
    positions.push(point.x, point.y, point.z);
});

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const material = new THREE.LineBasicMaterial({ color: 0x4a90e2 });
const line = new THREE.Line(geometry, material);
scene.add(line);
```

## Animación y Rotación

### Rotación Automática

```javascript
let angle = 0;
function animate() {
    requestAnimationFrame(animate);
    
    // Rotar cámara alrededor del origen
    angle += 0.01;
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
}
animate();
```

### Controles Interactivos

```javascript
// Usar OrbitControls para rotación manual
// (requiere importar desde CDN)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
```

## Gráficos 3D Disponibles en el Proyecto

1. **Barras 3D**: Con controles de rotación
2. **Superficie 3D**: Generada desde función matemática
3. **Líneas 3D**: Múltiples series temporales
4. **Dispersión 3D**: Puntos en espacio 3D
5. **Barras Apiladas 3D**: Composición de datos
6. **Superficie desde Datos Reales**: Matriz de valores
7. **Mapa de Calor 3D**: Superficie con colores
8. **Histograma 3D**: Distribución de frecuencias
9. **Boxplot 3D**: Diagramas de caja
10. **Pareto 3D**: Barras ordenadas con línea acumulativa
11. **Cascada 3D**: Cambios acumulativos
12. **KDE 3D**: Superficie de densidad
13. **Radar 3D**: Polígono tridimensional

## Mejores Prácticas

1. **Usa rotación automática** para mostrar todas las perspectivas
2. **Iluminación adecuada** para ver profundidad
3. **Ejes de referencia** (AxesHelper, GridHelper) para orientación
4. **Colores significativos** que representen valores
5. **Evita sobrecargar** con demasiados elementos

## Consideraciones de Rendimiento

- **BufferGeometry**: Más eficiente para muchos elementos
- **Instancing**: Para elementos repetidos
- **LOD (Level of Detail)**: Simplificar objetos lejanos
- **Frustum culling**: No renderizar objetos fuera de vista

## Ejemplo Completo

Ver `examples/03-3d-charts.html` para:
- 13 tipos diferentes de gráficos 3D
- Código comentado paso a paso
- Explicaciones de conceptos
- Animaciones y controles

## Próximos Pasos

- **[14-PERSONALIZACION.md](14-PERSONALIZACION.md)**: Personalizar colores y estilos
- **[15-INTERACTIVIDAD.md](15-INTERACTIVIDAD.md)**: Agregar interactividad
- **[20-EJEMPLOS-PRACTICOS.md](20-EJEMPLOS-PRACTICOS.md)**: Casos de uso reales

