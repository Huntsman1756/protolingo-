"""
Sprint 6 — Frontend data cross-reference integrity tests.

Validates that:
  1. Every grammar slug referenced in curriculum.ts exists in grammar.ts.
  2. Every vocabulary set ID referenced in curriculum.ts exists in vocabulary.ts.
  3. Every VocabularySet constant declared in vocabulary.ts appears in the export array.
  4. Grammar `related[]` arrays only reference slugs that exist in grammar.ts.

These tests parse the TypeScript source files with regex — no compilation needed.
They run as part of the normal backend pytest suite.
"""

import re
from pathlib import Path

# Path to frontend data directory (relative to backend/)
FRONTEND_DATA = Path(__file__).resolve().parent.parent.parent / "frontend" / "src" / "data"

GRAMMAR_FILE = FRONTEND_DATA / "grammar.ts"
VOCABULARY_FILE = FRONTEND_DATA / "vocabulary.ts"
CURRICULUM_FILE = FRONTEND_DATA / "curriculum.ts"

# ── Helpers ───────────────────────────────────────────────────────────────────


def _read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _extract_grammar_slugs(src: str) -> set[str]:
    """Extract all `slug: '...'` values from grammar.ts."""
    return set(re.findall(r"slug:\s*'([^']+)'", src))


def _extract_vocabulary_ids(src: str) -> set[str]:
    """Extract vocabulary set IDs (snake_case, underscores only) from vocabulary.ts."""
    # VocabularySet `id` values use snake_case: e.g. 'formal_writing_c1'
    # Curriculum unit ids use hyphens (c1-unit-1) — these won't match.
    return set(re.findall(r"\bid:\s*'([a-z][a-z0-9_]+)'", src))


def _extract_curriculum_grammar_refs(src: str) -> set[str]:
    """Extract all slug strings from grammar_points: [...] arrays in curriculum.ts."""
    refs: set[str] = set()
    for block in re.findall(r"grammar_points:\s*\[([^\]]*)\]", src, re.DOTALL):
        refs.update(re.findall(r"'([^']+)'", block))
    return refs


def _extract_curriculum_vocab_refs(src: str) -> set[str]:
    """Extract all IDs from vocabulary_set_ids: [...] arrays in curriculum.ts."""
    refs: set[str] = set()
    for block in re.findall(r"vocabulary_set_ids:\s*\[([^\]]*)\]", src, re.DOTALL):
        refs.update(re.findall(r"'([^']+)'", block))
    return refs


def _extract_grammar_related_refs(src: str) -> set[str]:
    """Extract all slug strings from related: [...] arrays in grammar.ts."""
    refs: set[str] = set()
    for block in re.findall(r"related:\s*\[([^\]]*)\]", src, re.DOTALL):
        refs.update(re.findall(r"'([^']+)'", block))
    return refs


def _extract_vocabulary_const_names(src: str) -> set[str]:
    """Extract names of all `const <name>: VocabularySet = {` declarations."""
    return set(
        re.findall(
            r"^const\s+([a-z][a-z0-9_]+)\s*:\s*VocabularySet\s*=",
            src,
            re.MULTILINE,
        )
    )


def _extract_vocabulary_export_names(src: str) -> set[str]:
    """Extract identifiers inside the `export const vocabularySets: VocabularySet[] = [...]` array."""
    match = re.search(
        r"export\s+const\s+vocabularySets\s*:\s*VocabularySet\[\]\s*=\s*\[(.*?)\]",
        src,
        re.DOTALL,
    )
    if not match:
        return set()
    return set(re.findall(r"\b([a-z][a-z0-9_]+)\b", match.group(1)))


# ── Tests ──────────────────────────────────────────────────────────────────────


def test_data_files_exist() -> None:
    """Sanity check: all three data files must be present."""
    for path in (GRAMMAR_FILE, VOCABULARY_FILE, CURRICULUM_FILE):
        assert path.exists(), f"Missing data file: {path}"


def test_curriculum_grammar_refs_all_defined() -> None:
    """Every slug in grammar_points[] must exist as a slug in grammar.ts."""
    defined = _extract_grammar_slugs(_read(GRAMMAR_FILE))
    referenced = _extract_curriculum_grammar_refs(_read(CURRICULUM_FILE))

    missing = referenced - defined
    assert (
        not missing
    ), f"curriculum.ts references {len(missing)} undefined grammar slug(s):\n" + "\n".join(
        f"  - {s}" for s in sorted(missing)
    )


def test_curriculum_vocab_refs_all_defined() -> None:
    """Every ID in vocabulary_set_ids[] must exist as an id in vocabulary.ts."""
    defined = _extract_vocabulary_ids(_read(VOCABULARY_FILE))
    referenced = _extract_curriculum_vocab_refs(_read(CURRICULUM_FILE))

    missing = referenced - defined
    assert (
        not missing
    ), f"curriculum.ts references {len(missing)} undefined vocabulary set ID(s):\n" + "\n".join(
        f"  - {s}" for s in sorted(missing)
    )


def test_grammar_related_refs_all_defined() -> None:
    """Every slug in a grammar topic's related[] array must exist in grammar.ts."""
    src = _read(GRAMMAR_FILE)
    defined = _extract_grammar_slugs(src)
    related = _extract_grammar_related_refs(src)

    missing = related - defined
    assert not missing, (
        f"grammar.ts has {len(missing)} related[] slug(s) that point to non-existent topics:\n"
        + "\n".join(f"  - {s}" for s in sorted(missing))
    )


def test_vocabulary_export_completeness() -> None:
    """Every VocabularySet constant declared in vocabulary.ts must appear in the export array."""
    src = _read(VOCABULARY_FILE)
    declared = _extract_vocabulary_const_names(src)
    exported = _extract_vocabulary_export_names(src)

    missing = declared - exported
    assert not missing, (
        f"{len(missing)} VocabularySet constant(s) declared but missing from the export array:\n"
        + "\n".join(f"  - {n}" for n in sorted(missing))
    )


def test_grammar_slug_uniqueness() -> None:
    """No two grammar topics should share the same slug."""
    src = _read(GRAMMAR_FILE)
    all_slugs = re.findall(r"slug:\s*'([^']+)'", src)
    seen: set[str] = set()
    duplicates: list[str] = []
    for slug in all_slugs:
        if slug in seen:
            duplicates.append(slug)
        seen.add(slug)
    assert not duplicates, "Duplicate grammar slug(s) found:\n" + "\n".join(
        f"  - {s}" for s in sorted(set(duplicates))
    )


def test_vocabulary_id_uniqueness() -> None:
    """No two vocabulary sets should share the same id."""
    src = _read(VOCABULARY_FILE)
    all_ids = re.findall(r"\bid:\s*'([a-z][a-z0-9_]+)'", src)
    seen: set[str] = set()
    duplicates: list[str] = []
    for vid in all_ids:
        if vid in seen:
            duplicates.append(vid)
        seen.add(vid)
    assert not duplicates, "Duplicate vocabulary set ID(s) found:\n" + "\n".join(
        f"  - {s}" for s in sorted(set(duplicates))
    )


def test_curriculum_unit_id_uniqueness() -> None:
    """No two curriculum units across all levels should share the same id."""
    src = _read(CURRICULUM_FILE)
    # Unit ids follow the pattern: id: 'a1-unit-1' (hyphen-separated)
    all_unit_ids = re.findall(r"\bid:\s*'([a-z][a-z0-9-]+)'", src)
    # Filter out vocabulary set ids (those have underscores not hyphens)
    unit_ids = [uid for uid in all_unit_ids if "-unit-" in uid]
    seen: set[str] = set()
    duplicates: list[str] = []
    for uid in unit_ids:
        if uid in seen:
            duplicates.append(uid)
        seen.add(uid)
    assert not duplicates, "Duplicate curriculum unit ID(s) found:\n" + "\n".join(
        f"  - {s}" for s in sorted(set(duplicates))
    )
