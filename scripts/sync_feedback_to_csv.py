#!/usr/bin/env python3
"""Build data/feedback.csv from feedback files written into _data/feedback/.

Expected source files are created by Staticman according to staticman.yml.
"""

import csv
import datetime as dt
import glob
import os
from pathlib import Path

import yaml

INPUT_GLOB = "_data/feedback/**/*.*"
OUTPUT_PATH = "data/feedback.csv"


def to_iso_from_timestamp_name(stem: str):
    # Handles names like entry1700000000000 or entry1700000000
    digits = "".join(ch for ch in stem if ch.isdigit())
    if not digits:
        return ""

    try:
        ts = int(digits)
        if ts > 10_000_000_000:  # likely milliseconds
            ts = ts / 1000.0
        return dt.datetime.utcfromtimestamp(ts).isoformat() + "Z"
    except Exception:
        return ""


def normalize_text(value):
    if value is None:
        return ""
    return " ".join(str(value).split())


def main():
    files = sorted(glob.glob(INPUT_GLOB, recursive=True))
    rows = []

    for file_path in files:
        ext = Path(file_path).suffix.lower()
        if ext not in {".yml", ".yaml", ".json"}:
            continue

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                payload = yaml.safe_load(f) or {}
        except Exception:
            continue

        stem = Path(file_path).stem
        created_at = to_iso_from_timestamp_name(stem)
        if not created_at:
            created_at = dt.datetime.utcfromtimestamp(os.path.getmtime(file_path)).isoformat() + "Z"

        rel = Path(file_path).as_posix()
        page_folder = Path(rel).parent.name

        rows.append(
            {
                "source": normalize_text(payload.get("source") or "website-form"),
                "entry_id": normalize_text(stem),
                "created_at": created_at,
                "page": normalize_text(payload.get("page") or page_folder),
                "email": normalize_text(payload.get("email")),
                "message": normalize_text(payload.get("message")),
                "file_path": rel,
            }
        )

    rows.sort(key=lambda x: (x["created_at"], x["entry_id"]))

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    fieldnames = [
        "source",
        "entry_id",
        "created_at",
        "page",
        "email",
        "message",
        "file_path",
    ]

    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote {len(rows)} feedback row(s) to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
