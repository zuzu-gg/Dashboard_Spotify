import csv
import json
import ast
from datetime import datetime

INPUT_CSV = "data/tracks.csv"
OUTPUT_JSON = "data/tracks.json"


def clean_genres(raw_genres):
    if not raw_genres or raw_genres.strip() in ("", "[]", "nan", "None"):
        return ["Sin género"]
    try:
        parsed = ast.literal_eval(raw_genres.strip())
        if isinstance(parsed, list):
            cleaned = [str(g).strip() for g in parsed if str(g).strip()]
            return cleaned if cleaned else ["Sin género"]
    except (ValueError, SyntaxError):
        pass
    return [raw_genres.strip()]


def clean_date(raw_date):
    if not raw_date or not raw_date.strip():
        return None
    val = raw_date.strip()[:10]  # Toma YYYY-MM-DD si trae timestamp
    for fmt in ("%Y-%m-%d", "%Y-%m", "%Y"):
        try:
            dt = datetime.strptime(val, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None


def parse_number(raw_val, as_int=False):
    if not raw_val or raw_val.strip() in ("", "nan", "None"):
        return 0
    try:
        num = float(raw_val.strip())
        return int(round(num)) if as_int else round(num, 2)
    except ValueError:
        return 0


def transform_csv_to_json():
    total_leidos = 0
    descartados = 0
    registros_limpios = []

    with open(INPUT_CSV, mode="r", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)

        for row in reader:
            total_leidos += 1

            # 1. Extrae y limpia cadenas de texto
            track_id = (row.get("track_id") or "").strip()
            name = (row.get("name") or "").strip()
            artist = (row.get("track_artists") or "").strip()
            album = (row.get("album_name") or "").strip()

            # Descarta registros sin nombre de canción o artista
            if not name or not artist:
                descartados += 1
                continue

            # 2. Convierte variables numéricas
            popularity = parse_number(row.get("popularity"), as_int=True)
            streams = parse_number(row.get("streams"), as_int=True)

            # Filtra registros sin relevancia (opcional: mantiene los que tienen popularidad > 0 o streams > 0)
            if popularity == 0 and streams == 0:
                descartados += 1
                continue

            # 3. Limpia categóricas (géneros) y fecha
            genres = clean_genres(row.get("genres"))
            release_date = clean_date(row.get("album_release_date"))

            registros_limpios.append({
                "id": track_id,
                "name": name,
                "artist": artist,
                "album": album if album else "Desconocido",
                "genres": genres,
                "primaryGenre": genres[0],
                "popularity": popularity,
                "streams": streams,
                "releaseDate": release_date
            })

    # Ordena por popularidad y reproducciones descendente
    registros_limpios.sort(key=lambda x: (x["streams"], x["popularity"]), reverse=True)

    # Guarda JSON compacto (separators elimina espacios innecesarios para que pese menos en GitHub/React)
    with open(OUTPUT_JSON, mode="w", encoding="utf-8") as out:
        json.dump(registros_limpios, out, ensure_ascii=False, separators=(",", ":"))

    print("=== RESUMEN DE VALIDACIÓN Y TRANSFORMACIÓN ===")
    print(f"Total de registros leídos del CSV : {total_leidos}")
    print(f"Registros descartados (incompletos): {descartados}")
    print(f"Registros válidos en tracks.json   : {len(registros_limpios)}")


if __name__ == "__main__":
    transform_csv_to_json()