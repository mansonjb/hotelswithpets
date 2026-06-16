#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PT completeness GUARD for city-guide JSON files.

This used to be a regex ES->PT auto-translator. It produced "Spanglish"
(Spanish words leaking into Portuguese, wrong contractions) AND, via its
digit-restore pass, actively corrupted existing native PT (e.g. turning
"1.5 miles" into "2.5 miles"). It has been replaced by this guard.

New policy: Portuguese is authored NATIVELY at ship time (the city-guide ship
workflow writes EN/FR/ES/PT directly). This script no longer generates or
mutates any text. It only VERIFIES that every field which has an ES (or EN)
sibling also has a non-empty PT sibling, and FAILS the build if any PT is
missing, so a city can never ship with auto-generated Spanglish again.

Exit 0 = all PT present. Exit 1 = missing PT (lists the gaps).

    python3 scripts/translate-to-pt.py            # check all city-guides
    python3 scripts/translate-to-pt.py heraklion  # check specific cities
"""
import json
import sys
import glob
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def is_empty(v):
    if v is None:
        return True
    if isinstance(v, str):
        return v.strip() == ""
    if isinstance(v, (list, dict)):
        return len(v) == 0
    return False


def walk(obj, path, gaps):
    """For every dict, any key ending in 'Es' whose sibling 'Pt' is missing or
    empty (while the Es value is non-empty) is a gap. Recurse into lists/dicts."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(k, str) and k.endswith("Es") and not is_empty(v):
                base = k[:-2]
                pt_key = base + "Pt"
                if pt_key not in obj or is_empty(obj.get(pt_key)):
                    gaps.append(f"{path}.{pt_key}")
        for k, v in obj.items():
            walk(v, f"{path}.{k}", gaps)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk(v, f"{path}[{i}]", gaps)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    if args:
        files = [str(ROOT / f"data/city-guides/{a}.json") for a in args]
    else:
        files = sorted(glob.glob(str(ROOT / "data/city-guides/*.json")))

    total_gaps = 0
    villes_with_gaps = 0
    for fp in files:
        if "_evidence" in fp or not Path(fp).exists():
            continue
        slug = Path(fp).stem
        data = json.load(open(fp, encoding="utf-8"))
        gaps = []
        walk(data.get("guides", {}), "guides", gaps)
        if gaps:
            villes_with_gaps += 1
            total_gaps += len(gaps)
            print(f"  ❌ {slug}: {len(gaps)} missing PT field(s)")
            for g in gaps[:8]:
                print(f"       {g}")
            if len(gaps) > 8:
                print(f"       ... and {len(gaps) - 8} more")

    if total_gaps:
        print(
            f"\n❌ PT GUARD FAILED: {total_gaps} missing PT field(s) across "
            f"{villes_with_gaps} city-guide(s).\n"
            "   Portuguese must be authored natively (pt-PT) at ship time, "
            "NOT machine-generated.\n"
            "   Fill the missing *Pt fields by translating the EN sibling into "
            "fluent European Portuguese, then rebuild."
        )
        sys.exit(1)

    print("✅ PT guard: every ES/EN field has a native PT sibling.")


if __name__ == "__main__":
    main()
