# Spotify Music Analytics Dashboard

Dashboard interactivo desarrollado con React para explorar y analizar tendencias musicales a partir del conjunto de datos **Almost a million Spotify tracks** (Oleg Fostenko, Zenodo, 2024).

## Estructura del Proyecto

```text
├── data/
│   ├── tracks_sample.csv   # Muestra representativa del dataset original (50,000 registros)
│   └── tracks.json         # Dataset completo limpio y transformado (75,093 registros válidos)
├── scripts/
│   └── transform_data.py   # Script en Python para limpieza, validación y conversión CSV a JSON
└── README.md
```

**Nota:** El archivo original `tracks.csv`, que contiene 899,702 registros, supera el límite de 100 MB permitido por GitHub. Por este motivo, se incluye `data/tracks_sample.csv` como muestra para realizar pruebas de ejecución local. El dataset original completo puede descargarse desde [Zenodo](https://zenodo.org/records/11453410).

## Limpieza y Preparación de los Datos
Antes de utilizar los datos en el dashboard, se creó el script `scripts/transform_data.py` con Python. Este permite revisar, limpiar y organizar la información del archivo original para que pueda utilizarse correctamente en el proyecto.

### Cambios realizados en los datos

- **Popularidad y reproducciones:** Se convirtieron los valores a números enteros. Cuando un dato estaba vacío o no era válido, se asignó el valor `0`.
- **Información de las canciones:** Se organizaron los nombres de las canciones, artistas, álbumes y géneros como textos. También se separaron los géneros para facilitar su uso en los filtros y gráficos del dashboard.
- **Fechas de lanzamiento:** Se unificó el formato de las fechas para que todas sigan el mismo orden: año, mes y día (YYYY-MM-DD).
- **Espacios innecesarios:** Se eliminaron los espacios que sobraban al inicio y al final de los textos.
- **Datos incompletos:** Se asignaron nombres como `"Sin género"` cuando no había información del género y `"Desconocido"` cuando faltaba el nombre del álbum.
- **Registros descartados:** Se eliminaron las canciones que no tenían nombre, artista o información útil sobre su popularidad y reproducciones.

### Resultados de la limpieza

Después de procesar el archivo original, se obtuvieron los siguientes resultados:

| Descripción | Cantidad |
|---|---:|
| Registros originales | 899,702 |
| Registros descartados | 824,609 |
| Registros válidos | 75,093 |

Los 75,093 registros válidos se guardaron en `tracks.json`, que es el archivo utilizado para trabajar con la información del dashboard.
