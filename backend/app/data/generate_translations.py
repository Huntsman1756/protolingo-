"""Script to generate translations.py from vocabulary/phrasebook/curriculum files.

Run: python3 backend/app/data/generate_translations.py

This extracts English definitions from source files and provides
monolingual German and French translations for the learner UI.
"""

import os
import sys
import re
import ast

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

sys.path.insert(0, ROOT)

# ====================================================================
# 1. Extract all English definitions from source files
# ====================================================================


def extract_strings_from_py_file(filepath, pattern):
    """Extract strings matching `definition=`, `context=`, or `situation=` patterns."""
    results = []
    if not os.path.isfile(filepath):
        print(f"  WARNING: {filepath} not found", file=sys.stderr)
        return results
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    for match in re.finditer(pattern, content):
        s = match.group(1)
        if s not in results and s.strip():
            results.append(s)
    return results


def extract_competencies(filepath):
    """Extract competency checklist strings (wrap-string in lists)."""
    results = []
    if not os.path.isfile(filepath):
        print(f"  WARNING: {filepath} not found", file=sys.stderr)
        return results
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    # Lines starting with space(s) + double-quote string + newline
    for match in re.finditer(r'^\s{8,}("[^"]+"),?', content, re.MULTILINE):
        s = match.group(1)
        if s.strip():
            results.append(s)
    return results


# --- Vocabulary definitions ---
vocab_pattern = re.compile(r'definition="([^"]*)"')

vocab_files_de = [
    "de/vocabulary_a1.py",
    "de/vocabulary_a2.py",
    "de/vocabulary_b1.py",
    "de/vocabulary_b2.py",
    "de/vocabulary_c1.py",
    "de/vocabulary_c2.py",
]

vocab_files_fr = [
    "fr/vocabulary_a1.py",
    "fr/vocabulary_a2.py",
]

# --- Phrasebook contexts and situations ---
context_pattern = re.compile(r'context="([^"]*)"')
situation_pattern = re.compile(r'situation="([^"]*)"')

pb_files_de = [
    "de/phrasebook_a1.py",
    "de/phrasebook_a2.py",
    "de/phrasebook_b1.py",
    "de/phrasebook_b2.py",
    "de/phrasebook_c1.py",
    "de/phrasebook_c2.py",
]

pb_files_fr = [
    "fr/phrasebook_a1.py",
    "fr/phrasebook_b1.py",
]

# --- Curriculum competencies ---
curriculum_files_de = [
    "de/curriculum_a1.py",
    "de/curriculum_a2.py",
    "de/curriculum_b1.py",
    "de/curriculum_b2.py",
    "de/curriculum_c1.py",
    "de/curriculum_c2.py",
]

print("Extracting DE vocab definitions...")
de_vocab_defs = []
for f in vocab_files_de:
    fp = os.path.join(HERE, f)
    de_vocab_defs.extend(extract_strings_from_py_file(fp, vocab_pattern))
de_vocab_defs = sorted(set(de_vocab_defs))
print(f"  Found {len(de_vocab_defs)} unique DE vocab definitions")

print("Extracting FR vocab definitions...")
fr_vocab_defs = []
for f in vocab_files_fr:
    fp = os.path.join(HERE, f)
    fr_vocab_defs.extend(extract_strings_from_py_file(fp, vocab_pattern))
fr_vocab_defs = sorted(set(fr_vocab_defs))
print(f"  Found {len(fr_vocab_defs)} unique FR vocab definitions")

print("Extracting DE phrasebook contexts...")
de_pb_contexts = []
for f in pb_files_de:
    fp = os.path.join(HERE, f)
    de_pb_contexts.extend(extract_strings_from_py_file(fp, context_pattern))
de_pb_contexts = sorted(set(de_pb_contexts))
print(f"  Found {len(de_pb_contexts)} unique DE phrasebook contexts")

print("Extracting DE phrasebook situations...")
de_pb_situations = []
for f in pb_files_de:
    fp = os.path.join(HERE, f)
    de_pb_situations.extend(extract_strings_from_py_file(fp, situation_pattern))
de_pb_situations = sorted(set(de_pb_situations))
print(f"  Found {len(de_pb_situations)} unique DE phrasebook situations")

print("Extracting FR phrasebook contexts...")
fr_pb_contexts = []
for f in pb_files_fr:
    fp = os.path.join(HERE, f)
    fr_pb_contexts.extend(extract_strings_from_py_file(fp, context_pattern))
fr_pb_contexts = sorted(set(fr_pb_contexts))
print(f"  Found {len(fr_pb_contexts)} unique FR phrasebook contexts")

print("Extracting DE curriculum competencies...")
de_competencies = []
for f in curriculum_files_de:
    fp = os.path.join(HERE, f)
    de_competencies.extend(extract_competencies(fp))
de_competencies = sorted(set(de_competencies))
print(f"  Found {len(de_competencies)} unique DE competencies")

# ====================================================================
# 2. Comprehensive translation dictionaries
# ====================================================================


def make_safe(s):
    """Escape non-ASCII for Python source compatibility."""
    return s


# German vocab: build a lookup
de_vocab_map = {}

# A1
de_vocab_map.update({
    "Informal hello": "informeller Gru\u00df",
    "Good day (formal greeting)": "formelle Tagesgru\u00dfformel",
    "Bye (informal)": "informelle Verabschiedung",
    "Goodbye (formal)": "formelle Verabschiedung",
    "Good morning": "Gru\u00df am Morgen",
    "Good evening": "Gru\u00df am Abend",
    "Good night": "Abschiedsgru\u00df vor dem Schlafengehen",
    "Thank you": "Ausdruck des Dankes",
    "Please / You're welcome": "h\u00f6fliche Bitte oder Erwiderung auf Dank",
    "Yes": "Zustimmung oder Bejahung",
    "No": "Verneinung oder Ablehnung",
    "Excuse me / Sorry": "h\u00f6fliche Entschuldigung oder Bitte um Aufmerksamkeit",
    "How are you? (informal)": "informelle Frage nach dem Befinden",
    "My name is": "Selbstvorstellung mit dem eigenen Namen",
    "Welcome": "Begr\u00fc\u00dfung oder Empfang von G\u00e4sten",
    "Name": "Bezeichnung einer Person",
    "First name": "pers\u00f6nlicher Vorname",
    "Last name / surname": "Familienname",
    "Age": "Anzahl der Lebensjahre",
    "To be called / named": "mit einem Namen benannt sein",
    "To be": "existieren oder einen Zustand beschreiben",
    "To live / reside": "an einem Ort wohnen",
    "To come from": "Herkunft aus einem Ort oder Land angeben",
    "City / town": "gr\u00f6\u00dfere Siedlung mit st\u00e4dtischer Verwaltung",
    "To speak": "eine Sprache m\u00fcndlich verwenden",
    "Language": "System der verbalen Kommunikation",
    "Pleased to meet you": "erfreut \u00fcber das Kennenlernen",
    "German": "aus Deutschland stammend",
    "Austrian": "aus \u00d6sterreich stammend",
    "Swiss": "aus der Schweiz stammend",
    "English": "aus England stammend",
    "French": "aus Frankreich stammend",
    "Spanish": "aus Spanien stammend",
    "Italian": "aus Italien stammend",
    "Turkish": "aus der T\u00fcrkei stammend",
    "Polish": "aus Polen stammend",
    "Russian": "aus Russland stammend",
    "Country": "geografisches Territorium mit eigener Regierung",
    "Nationality": "Zugeh\u00f6rigkeit zu einem Staat",
    "Origin": "geografische oder kulturelle Herkunft",
    "From": "Ursprungsort angebend",
    "Doctor (male)": "m\u00e4nnliche medizinische Fachkraft",
    "Doctor (female)": "weibliche medizinische Fachkraft",
    "Teacher (male)": "m\u00e4nnliche Lehrperson",
    "Teacher (female)": "weibliche Lehrperson",
    "Student (male)": "m\u00e4nnliche Person, die studiert",
    "Student (female)": "weibliche Person, die studiert",
    "Engineer (male)": "m\u00e4nnlicher technischer Fachmann",
    "Engineer (female)": "weibliche technische Fachfrau",
    "Cook / chef (male)": "m\u00e4nnlicher Speisenzubereiter",
    "Cook / chef (female)": "weibliche Speisenzubereiterin",
    "Salesperson (male)": "m\u00e4nnlicher Verk\u00e4ufer",
    "Salesperson (female)": "weibliche Verk\u00e4uferin",
    "Waiter (male)": "m\u00e4nnlicher Bediener im Restaurant",
    "Waitress (female)": "weibliche Bedienerin im Restaurant",
    "Police officer (male)": "m\u00e4nnlicher Ordnungsh\u00fcter",
    "Police officer (female)": "weibliche Ordnungsh\u00fcterin",
    "Driver (male)": "m\u00e4nnlicher Fahrzeuglenker",
    "Driver (female)": "weibliche Fahrzeuglenkerin",
    "Mother": "weibliches Elternteil",
    "Father": "m\u00e4nnliches Elternteil",
    "Sister": "weibliches Geschwisterkind",
    "Brother": "m\u00e4nnliches Geschwisterkind",
    "Daughter": "weiblicher Nachkomme",
    "Son": "m\u00e4nnlicher Nachkomme",
    "Woman / wife": "erwachsene weibliche Person oder Ehefrau",
    "Man / husband": "erwachsene m\u00e4nnliche Person oder Ehemann",
    "Child": "junge Person oder Nachkomme",
    "Parents": "Vater und Mutter",
    "Grandparents": "Eltern der Eltern",
    "Grandma": "Gro\u00dfmutter, famili\u00e4r",
    "Grandpa": "Gro\u00dfvater, famili\u00e4r",
    "Uncle": "Bruder eines Elternteils",
    "Aunt": "Schwester eines Elternteils",
    "Cousin (male)": "m\u00e4nnliches Kind von Onkel oder Tante",
    "Big / tall": "von gro\u00dfer Gr\u00f6\u00dfe oder H\u00f6he",
    "Small / short": "von geringer Gr\u00f6\u00dfe oder H\u00f6he",
    "Young": "von geringem Alter",
    "Old": "von hohem Alter",
    "Beautiful / nice": "angenehm f\u00fcr das Auge oder angenehm",
    "Ugly": "unangenehm f\u00fcr das Auge",
    "Nice / kind": "freundlich und sympathisch",
    "Friendly": "wohlwollend und h\u00f6flich",
    "Thick / fat": "von gro\u00dfer Breite oder K\u00f6rpermasse",
    "Thin": "von geringer Breite oder K\u00f6rpermasse",
    "Strong": "k\u00f6rperlich oder geistig kr\u00e4ftig",
    "Weak": "von geringer Kraft",
    "Sad": "traurig oder ungl\u00fccklich gestimmt",
    "Happy": "freudig und zufrieden gestimmt",
    "Tired": "ersch\u00f6pft und schl\u00e4frig",
    "To get up": "das Bett morgens verlassen",
    "To have breakfast": "die erste Mahlzeit des Tages essen",
    "To work": "beruflich t\u00e4tig sein",
    "To learn / study": "sich Wissen aneignen oder \u00fcben",
    "To go shopping": "Waren in Gesch\u00e4ften kaufen",
    "To cook": "Speisen zubereiten",
    "To eat": "Nahrung zu sich nehmen",
    "To drink": "Fl\u00fcssigkeit zu sich nehmen",
    "To sleep": "im Schlafzustand ruhen",
    "To watch TV": "Fernsehprogramme ansehen",
    "To read": "geschriebenen Text erfassen",
    "To shower": "sich unter flie\u00dfendem Wasser waschen",
    "To get dressed": "Kleidung anlegen",
    "To clean": "Schmutz entfernen und Ordnung schaffen",
    "Clock / watch / o'clock": "Zeitmessger\u00e4t oder Uhrzeitangabe",
    "Hour": "Zeiteinheit von 60 Minuten",
    "Minute": "Zeiteinheit von 60 Sekunden",
    "Second": "kleinste Basiseinheit der Zeit",
    "In the morning": "am Morgen, in den Vormittagsstunden",
    "In the late morning": "am sp\u00e4ten Vormittag",
    "At midday / noon": "um die Mittagszeit",
    "In the afternoon": "in den Nachmittagsstunden",
    "In the evening": "in den Abendstunden",
    "At night": "in der Nacht",
    "Today": "am heutigen Tag",
    "Tomorrow": "am n\u00e4chsten Tag",
    "Yesterday": "am vorherigen Tag",
    "Late": "nach der erwarteten Zeit",
    "Early": "vor der erwarteten Zeit",
    "Bread": "gebackenes Getreideprodukt",
    "Butter": "fetthaltiges Milchprodukt als Brotaufstrich",
    "Cheese": "Milchprodukt in fester Form",
    "Milk": "wei\u00dfe, n\u00e4hrstoffreiche Fl\u00fcssigkeit von Tieren",
    "Water": "klare, farblose Fl\u00fcssigkeit zum Trinken",
    "Coffee": "hei\u00dfes Getr\u00e4nk aus ger\u00f6steten Bohnen",
    "Tea": "hei\u00dfes Getr\u00e4nk aus Bl\u00e4ttern oder Kr\u00e4utern",
    "Beer": "alkoholisches Getr\u00e4nk aus Hopfen und Malz",
    "Wine": "alkoholisches Getr\u00e4nk aus vergorenen Trauben",
    "Juice": "fl\u00fcssiger Extrakt aus Obst oder Gem\u00fcse",
    "Pasta / noodles": "Teigwaren aus Mehl und Wasser",
    "Rice": "gekochtes Getreidekorn als Grundnahrungsmittel",
    "Meat": "Fleisch von Tieren als Nahrungsmittel",
    "Fish": "Wassertier als Nahrungsmittel",
    "Vegetables": "essbare Pflanzenteile",
    "Fruit": "essbare Fr\u00fcchte von Pflanzen",
    "Cinema / movie theater": "Geb\u00e4ude zum Ansehen von Filmen",
    "Music": "Kunstform der Kl\u00e4nge und Melodien",
    "Sport": "k\u00f6rperliche Bet\u00e4tigung und Wettkampf",
    "Reading": "T\u00e4tigkeit des Lesens von Texten",
    "Dancing": "rhythmische Bewegung zu Musik",
    "Traveling": "unterwegs sein zu anderen Orten",
    "Cooking": "Zubereitung von Speisen",
    "Football / soccer": "Ballsportart mit elf Spielern pro Team",
    "Swimming": "Fortbewegung im Wasser",
    "Hiking": "Wandern in der Natur",
    "Bicycle": "zweir\u00e4driges Fahrzeug mit Pedalantrieb",
    "Jogging": "Ausdauerlauf in gem\u00e4\u00dfigtem Tempo",
    "Bakery": "Gesch\u00e4ft f\u00fcr Brot und Geb\u00e4ck",
    "Pharmacy": "Gesch\u00e4ft f\u00fcr Medikamente",
    "Supermarket": "gro\u00dfes Lebensmittelgesch\u00e4ft",
    "Post office": "Dienststelle f\u00fcr Brief- und Paketversand",
    "Bank": "Finanzinstitut f\u00fcr Geldgesch\u00e4fte",
    "School": "Bildungseinrichtung f\u00fcr Kinder",
    "Restaurant": "Betrieb zum Essen und Trinken",
    "Caf\u00e9": "Lokal f\u00fcr Kaffee und kleine Speisen",
    "Hotel": "Beherbergungsbetrieb f\u00fcr G\u00e4ste",
    "Hospital": "medizinische Einrichtung f\u00fcr Kranke",
    "Train station": "Ort f\u00fcr Ankunft und Abfahrt von Z\u00fcgen",
    "Airport": "Flughafen f\u00fcr Passagier- und Frachtfl\u00fcge",
    "Park": "gr\u00fcne, \u00f6ffentliche Erholungsfl\u00e4che",
    "Church": "Geb\u00e4ude f\u00fcr religi\u00f6se Andachten",
    "Straight ahead": "direkt nach vorne",
    "Right": "rechte Richtung oder Seite",
    "Left": "linke Richtung oder Seite",
    "Next to": "unmittelbar neben",
    "Opposite": "gegen\u00fcber liegend",
    "Nearby / close by": "in der N\u00e4he befindlich",
    "Far away": "weit entfernt",
    "In front of / before": "vor oder r\u00e4umlich davor",
    "Behind": "r\u00fcckseitig gelegen",
    "Between": "im Raum zwischen zwei Dingen",
    "Here": "an diesem Ort",
    "There": "an jenem Ort",
    "Car": "Kraftfahrzeug mit vier R\u00e4dern",
    "Bus": "\u00f6ffentliches Verkehrsmittel f\u00fcr mehrere Personen",
    "Train": "Schienenfahrzeug f\u00fcr Personen- und G\u00fctertransport",
    "Airplane": "Flugger\u00e4t f\u00fcr den Luftverkehr",
    "Subway / metro": "unterirdische Stadtschnellbahn",
    "Taxi": "Mietauto mit Fahrer",
    "On foot": "zu Fu\u00df gehend",
    "Ticket (transport)": "Fahrschein f\u00fcr Bus oder Bahn",
    "Bus/tram stop": "Haltestelle f\u00fcr Bus oder Stra\u00dfenbahn",
    "Tram": "Stra\u00dfenbahn auf Schienen",
    "Driver's license": "amtliche Fahrerlaubnis",
    "Nice / beautiful (weather)": "angenehmes und sch\u00f6nes Wetter",
    "Bad": "von schlechter Qualit\u00e4t oder Zustand",
    "Warm": "von h\u00f6herer Temperatur",
    "Cold": "von niedriger Temperatur",
    "Cloudy": "von Wolken bedeckt",
    "Sunny": "von der Sonne beschienen",
    "Rainy": "von Regen gekennzeichnet",
    "Windy": "von Wind gepr\u00e4gt",
    "Sun": "leuchtender Himmelsk\u00f6rper",
    "Rain": "Niederschlag in Form von Wassertropfen",
    "Wind": "bewegte Luft in der Atmosph\u00e4re",
    "Snow": "Niederschlag in Form von Eiskristallen",
    "Thunderstorm": "Gewitter mit Blitz und Donner",
    "Cloud": "Ansammlung von Wassertropfen am Himmel",
    "Hello": "informeller Gru\u00df",
    "Family": "Gruppe aus Eltern und Kindern",
    "House": "Geb\u00e4ude zum Wohnen",
    "To go / walk": "sich zu Fu\u00df fortbewegen",
    "To come": "sich zu einem Ort begeben",
    "To do / make": "eine Handlung ausf\u00fchren",
    "To have": "besitzen oder verf\u00fcgen \u00fcber",
    "Good": "von positiver Qualit\u00e4t",
    "Much / many": "gro\u00dfe Menge oder Anzahl",
})

print("")
print(f"WARNING: Only {len(de_vocab_map)} of {len(de_vocab_defs)} DE vocab entries mapped!")
print("Missing German vocab entries:")
for d in de_vocab_defs:
    if d not in de_vocab_map:
        print(f"  - \u201c{d}\u201d")
