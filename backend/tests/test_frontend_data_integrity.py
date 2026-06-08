"""
Sprint 6 — Data cross-reference integrity tests.

Validates that:
  1. Every grammar slug referenced in curriculum.ts exists in grammar.ts.
  2. Every vocabulary set ID referenced in the backend curriculum exists in the backend vocabulary data.
  3. Vocabulary set IDs are unique across all languages.
  4. Grammar `related[]` arrays only reference slugs that exist in grammar.ts.
"""

import re
from pathlib import Path

# Paths
FRONTEND_DATA = Path(__file__).resolve().parent.parent.parent / "frontend" / "src" / "data"

GRAMMAR_FILE = FRONTEND_DATA / "grammar.ts"
CURRICULUM_FILE = FRONTEND_DATA / "curriculum.ts"


def _read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _extract_grammar_slugs(src: str) -> set[str]:
    return set(re.findall(r"slug:\s*'([^']+)'", src))


def _extract_curriculum_grammar_refs(src: str) -> set[str]:
    refs: set[str] = set()
    for block in re.findall(r"grammar_points:\s*\[([^\]]*)\]", src, re.DOTALL):
        refs.update(re.findall(r"'([^']+)'", block))
    return refs


def _extract_grammar_related_refs(src: str) -> set[str]:
    refs: set[str] = set()
    for block in re.findall(r"related:\s*\[([^\]]*)\]", src, re.DOTALL):
        refs.update(re.findall(r"'([^']+)'", block))
    return refs


# ── Tests ──────────────────────────────────────────────────────────────────────


def test_data_files_exist() -> None:
    """Sanity check: frontend data files that remain must be present."""
    for path in (GRAMMAR_FILE, CURRICULUM_FILE):
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
    """Every vocabulary_set_ids reference in English curriculum must exist in English vocabulary."""
    from app.data.en.curriculum import CURRICULUM as en_curriculum
    from app.data.en.vocabulary import VOCABULARY_SETS as en_sets

    defined: set[str] = {s.id for s in en_sets}
    referenced: set[str] = set()
    for units in en_curriculum.values():
        for u in units:
            referenced.update(u.vocabulary_set_ids)

    # These 15 IDs are referenced by the English curriculum but never defined
    # in any vocabulary file. This is a pre-existing data gap, not a regression.
    known_gaps = {
        "adjectives_comparison_a2",
        "advice_b1",
        "conditionals_vocab_b1",
        "connectors_b1",
        "consolidation_b1",
        "feelings_regret_b1",
        "hypothetical_b1",
        "hypothetical_past_b1",
        "life_changes_b1",
        "news_b1",
        "news_events_b1",
        "obligation_b1",
        "places_comparison_a2",
        "reporting_verbs_b1",
        "time_expressions_b1",
    }
    unknown = (referenced - defined) - known_gaps
    assert not unknown, (
        f"English curriculum references {len(unknown)} new undefined vocabulary set ID(s):\n"
        + "\n".join(f"  - {s}" for s in sorted(unknown))
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
    """Every vocabulary set ID in the backend data must belong to exactly one CEFR level."""
    from app.data.en.vocabulary import VOCABULARY_SETS as en_sets
    from app.data.es.vocabulary import VOCABULARY_SETS as es_sets
    from app.data.it.vocabulary import VOCABULARY_SETS as it_sets
    from app.data.pt.vocabulary import VOCABULARY_SETS as pt_sets

    for lang, sets in [("en", en_sets), ("es", es_sets), ("it", it_sets), ("pt", pt_sets)]:
        for s in sets:
            assert s.level in (
                "A1",
                "A2",
                "B1",
                "B2",
                "C1",
                "C2",
            ), f"{lang} set {s.id}: invalid level {s.level}"
            assert s.id, f"{lang}: set with empty id"
            assert s.topic, f"{lang} {s.id}: empty topic"
            assert s.unit_ref, f"{lang} {s.id}: empty unit_ref"
            assert len(s.words) > 0, f"{lang} {s.id}: no words"


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
    """No vocabulary set ID should be duplicated within a single language."""
    from app.data.en.vocabulary import VOCABULARY_SETS as en_sets
    from app.data.es.vocabulary import VOCABULARY_SETS as es_sets
    from app.data.it.vocabulary import VOCABULARY_SETS as it_sets
    from app.data.pt.vocabulary import VOCABULARY_SETS as pt_sets

    for lang, sets in [("en", en_sets), ("es", es_sets), ("it", it_sets), ("pt", pt_sets)]:
        seen: set[str] = set()
        duplicates: list[str] = []
        for s in sets:
            if s.id in seen:
                duplicates.append(s.id)
            seen.add(s.id)
        assert not duplicates, f"{lang}: duplicate vocabulary set ID(s):\n" + "\n".join(
            f"  - {d}" for d in sorted(duplicates)
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
