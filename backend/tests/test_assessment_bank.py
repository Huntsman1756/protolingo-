"""Unit tests for the language-dispatched assessment bank."""

from __future__ import annotations


class TestGetAssessmentBank:
    def test_english_returns_non_empty(self):
        from app.data.assessment_bank import get_assessment_bank

        bank = get_assessment_bank("en-GB")
        assert isinstance(bank, list)
        assert len(bank) > 0

    def test_en_us_returns_non_empty(self):
        from app.data.assessment_bank import get_assessment_bank

        bank = get_assessment_bank("en-US")
        assert isinstance(bank, list)
        assert len(bank) > 0

    def test_spanish_returns_non_empty(self):
        from app.data.assessment_bank import get_assessment_bank

        bank = get_assessment_bank("es-ES")
        assert isinstance(bank, list)
        assert len(bank) > 0

    def test_french_returns_non_empty(self):
        from app.data.assessment_bank import get_assessment_bank

        bank = get_assessment_bank("fr")
        assert isinstance(bank, list)
        assert len(bank) > 0

    def test_german_returns_non_empty(self):
        from app.data.assessment_bank import get_assessment_bank

        bank = get_assessment_bank("de")
        assert isinstance(bank, list)
        assert len(bank) > 0

    def test_italian_returns_non_empty(self):
        from app.data.assessment_bank import get_assessment_bank

        bank = get_assessment_bank("it")
        assert isinstance(bank, list)
        assert len(bank) > 0

    def test_portuguese_returns_non_empty(self):
        from app.data.assessment_bank import get_assessment_bank

        bank = get_assessment_bank("pt")
        assert isinstance(bank, list)
        assert len(bank) > 0

    def test_unknown_language_falls_back_to_en_gb(self):
        from app.data.assessment_bank import get_assessment_bank

        bank_unknown = get_assessment_bank("xx-XX")
        bank_gb = get_assessment_bank("en-GB")
        assert bank_unknown == bank_gb

    def test_empty_language_falls_back_to_en_gb(self):
        from app.data.assessment_bank import get_assessment_bank

        bank_empty = get_assessment_bank("")
        bank_gb = get_assessment_bank("en-GB")
        assert bank_empty == bank_gb

    def test_cache_reuses_imported_module(self):
        from app.data.assessment_bank import _CACHE, get_assessment_bank

        _CACHE.clear()
        b1 = get_assessment_bank("en-GB")
        b2 = get_assessment_bank("en-GB")
        assert b1 is b2
        assert len(_CACHE) == 1

    def test_iso_fallback_de_de(self):
        from app.data.assessment_bank import get_assessment_bank

        bank_de_de = get_assessment_bank("de-DE")
        bank_de = get_assessment_bank("de")
        assert bank_de_de == bank_de

    def test_fr_ca_fallback_to_fr(self):
        from app.data.assessment_bank import get_assessment_bank

        bank_fr_ca = get_assessment_bank("fr-CA")
        bank_fr = get_assessment_bank("fr")
        assert bank_fr_ca == bank_fr
