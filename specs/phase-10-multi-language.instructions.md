---
description: "Phase 10 spec — Soporte multi-idioma: el usuario puede aprender varios idiomas, cada uno con su propio plan de estudios, progreso, flashcards, conversaciones y recuerdos independientes."
applyTo: "backend/**, frontend/**, messages/**, specs/**"
---

# Phase 10 — Soporte Multi-Idioma

## Visión general

FreeLingo pasa de "un usuario = un idioma = un plan de estudios" a una arquitectura donde **cada usuario puede tener múltiples planes de estudio activos, uno por idioma**, con progreso, flashcards, conversaciones, recuerdos y competencias completamente aislados por idioma.

### Flujo de usuario

1. **Registro**: el usuario elige su idioma objetivo (`target_language`) durante el onboarding (igual que ahora).
2. **Uso normal**: toda la interfaz (dashboard, plan, lecciones, flashcards, chat, ejercicios, etc) corresponde al plan activo.
3. **Cambiar de idioma**: un selector rápido en el sidebar (bandera + nombre del idioma) permite cambiar entre los idiomas que el usuario está aprendiendo con un solo clic. Al cambiar, toda la experiencia pivota al plan de ese idioma. Si solo tiene un idioma, no se muestra el selector.
4. **Añadir nuevo idioma**: desde Ajustes → "Mis Idiomas", el usuario ve una página dedicada con tarjetas por idioma (progreso resumido) y un botón "Añadir nuevo idioma" que inicia el flujo de selección de idioma para crear un nuevo plan de estudios, si acepta ese nuevo idioma el flujo continúa con el assessment para ese idioma como se hace ahora. Si cancela la selección, no se crea el nuevo plan y vuelve a la página de idiomas.
5. **Gestión en ajustes**: la página "Mis Idiomas" muestra todos los idiomas del usuario con su nivel CEFR, racha, % completado, y permite cambiar el idioma activo. También permite eliminar un idioma (con confirmación) lo que borra todo el progreso asociado a ese idioma. No se puede eliminar el idioma activo actual (primero hay que cambiar a otro). No se puede eliminar el último idioma (si solo tiene uno, no muestra botón de eliminar).
6. **Confirmación al cambiar**: toast "Cambiando a Italiano (A2)..." porque toda la UI cambia y el usuario debe saber qué ha pasado.
7. **Datos independientes por idioma**: cada idioma tiene su propio progreso, flashcards, conversaciones, recuerdos, competencias, etc. No hay solapamiento entre idiomas.
8. **Currículum específico por idioma**: el currículum de cada idioma es diferente y adaptado a ese idioma (no solo traducción literal del inglés).
9. **Prompts adaptados**: los prompts del sistema (generación de lecciones, flashcards, conversaciones, ejercicios) se adaptan al idioma objetivo usando su nombre en inglés y en su propio idioma.
10. **Idiomas soportados**: inicialmente se añaden 3 idiomas nuevos (español, italiano, portugués de Portugal) además de las variantes de inglés ya existentes.

### Idiomas soportados inicialmente

Se añaden **3 idiomas nuevos** y se muestran ordenados alfabéticamente en el selector según el idioma de la interfaz:

| Código BCP-47 | Idioma |
|---------------|--------|
| `en-US` | Inglés (americano) — ya existe |
| `en-GB` | Inglés (británico) — ya existe |
| `es-ES` | Español (España) — **nuevo** |
| `it-IT` | Italiano — **nuevo** |
| `pt-PT` | Portugués (Portugal) — **nuevo** |

Total de códigos BCP-47 soportados: 5 (`en-US`, `en-GB`, `es-ES`, `it-IT`, `pt-PT`).

---

## Fase 10.1 — Base de datos: migraciones y nuevos modelos

### 10.1.1 Nueva tabla: `user_languages`

Relaciona usuarios con los idiomas que están aprendiendo. Cada fila representa "el usuario X está aprendiendo el idioma Y".

| Columna | Tipo | Notas |
|---------|------|-------|
| id | integer | PK, autoincrement |
| user_id | integer | FK → users (CASCADE), NOT NULL |
| target_language | string(10) | BCP-47, NOT NULL |
| is_active | boolean | `true` = idioma activo actual. Solo uno `true` por usuario. Default `true`. |
| created_at | datetime | Auto-set |

**Constraints:**
- `UNIQUE(user_id, target_language)` — un usuario no puede tener duplicado el mismo idioma.
- Índice en `(user_id, is_active)` para consultas rápidas del idioma activo.
- Al insertar un nuevo `user_language` con `is_active=true`, se debe desactivar (`is_active=false`) cualquier otro idioma activo del mismo usuario (lógica en el servicio).

### 10.1.2 Migración en modelos existentes

La migración `00XX_multi_language.py` modifica las siguientes tablas existentes añadiendo la columna `target_language` (o `study_plan_id`):

#### Tabla `study_plans`

**Ya tiene** `target_language` (añadida en Phase 4). Sin cambios estructurales.

**Nueva constraint:** `UNIQUE(user_id, target_language, is_active)` parcial — solo un plan activo por usuario por idioma. Implementado como índice único parcial en PostgreSQL:

```sql
CREATE UNIQUE INDEX uq_active_plan_per_lang
ON study_plans (user_id, target_language)
WHERE is_active = true;
```

Esto reemplaza la lógica actual de "un plan activo por usuario" por "un plan activo por usuario por idioma".

#### Tabla `progress`

| Cambio | Detalle |
|--------|---------|
| Añadir `study_plan_id` | integer, FK → study_plans (CASCADE), nullable inicialmente, con índice |
| Backfill | Asignar `study_plan_id` a partir del plan activo de cada usuario (el que tenga `is_active=true`) |
| Hacer NOT NULL | Tras el backfill |

#### Tabla `flashcards`

| Cambio | Detalle |
|--------|---------|
| Añadir `study_plan_id` | integer, FK → study_plans (CASCADE), nullable inicialmente, con índice |
| Backfill | Asignar `study_plan_id` a partir del plan activo de cada usuario |
| Hacer NOT NULL | Tras el backfill |

#### Tabla `conversations`

| Cambio | Detalle |
|--------|---------|
| Añadir `study_plan_id` | integer, FK → study_plans (SET NULL), nullable (las conversaciones antiguas quedan sin plan) |
| Sin backfill | Las conversaciones existentes quedan con `study_plan_id=NULL` |

#### Tabla `chat_history`

| Cambio | Detalle |
|--------|---------|
| Añadir `study_plan_id` | integer, FK → study_plans (SET NULL), nullable |
| Sin backfill | Las filas existentes quedan con `study_plan_id=NULL` |

#### Tabla `user_competencies`

| Cambio | Detalle |
|--------|---------|
| Añadir `study_plan_id` | integer, FK → study_plans (CASCADE), nullable inicialmente |
| Backfill | Asignar `study_plan_id` a partir del plan activo de cada usuario |
| Hacer NOT NULL | Tras el backfill |

#### Tabla `memories`

| Cambio | Detalle |
|--------|---------|
| Añadir `study_plan_id` | integer, FK → study_plans (SET NULL), nullable |
| Sin backfill | Los recuerdos existentes quedan sin plan asignado (compartidos entre idiomas) |

#### Tabla `llm_usage`

| Cambio | Detalle |
|--------|---------|
| Añadir `study_plan_id` | integer, FK → study_plans (SET NULL), nullable |
| Sin backfill | Los registros de uso quedan sin plan asignado |

### 10.1.3 Columna `target_language` en `User`

**Se mantiene** la columna `target_language` en `users` como **idioma preferido/default**. Su propósito cambia:

- Durante el registro/onboarding: se establece al primer idioma elegido.
- Al cambiar de idioma activo: se actualiza automáticamente al idioma del nuevo plan activo.
- No es la fuente de verdad para el idioma activo — `user_languages.is_active=true` lo es. Existe por retrocompatibilidad y como fallback.

### 10.1.4 Modelo SQLAlchemy: `UserLanguage`

**Archivo:** `backend/app/models/user_language.py`

```python
from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class UserLanguage(Base):
    __tablename__ = "user_languages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    target_language: Mapped[str] = mapped_column(String(10), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )
```

### 10.1.5 Cambios en modelos SQLAlchemy existentes

Cada modelo listado en 10.1.2 recibe la nueva columna correspondiente. Ejemplo para `Progress`:

```python
# Progress — añadir:
study_plan_id: Mapped[int] = mapped_column(
    Integer, ForeignKey("study_plans.id", ondelete="CASCADE"), nullable=False, index=True
)
```

Mismo patrón para `Flashcard`, `Conversation`, `ChatHistory`, `UserCompetency`, `Memory`, `LLMUsage`.

### 10.1.6 Migración Alembic

**Archivo:** `backend/alembic/versions/00XX_multi_language.py`

Revision ID secuencial. Down revision: la última migración existente (actualmente `0028_trial_used`).

La migración:
1. Crea la tabla `user_languages`.
2. Añade columnas `study_plan_id` a las 7 tablas listadas.
3. Backfill de `study_plan_id` usando el plan activo de cada usuario.
4. Añade `NOT NULL` donde corresponda.
5. Crea el índice parcial `uq_active_plan_per_lang`.

---

## Fase 10.2 — Backend: servicios y prompts multi-idioma

### 10.2.1 Refactor de `language_helpers.py`

**Archivo:** `backend/app/services/language_helpers.py`

Se expande para soportar cualquier idioma, no solo inglés:

```python
# Diccionario de idioma BCP-47 → nombre en el propio idioma + nombre en inglés
_LANGUAGE_INFO: dict[str, dict[str, str]] = {
    "en-US": {"name": "English (US)", "self_name": "English (US)", "iso639": "en", "flag": "🇺🇸"},
    "en-GB": {"name": "English (UK)", "self_name": "English (UK)", "iso639": "en", "flag": "🇬🇧"},
    "es-ES": {"name": "Spanish", "self_name": "Español", "iso639": "es", "flag": "🇪🇸"},
    "it-IT": {"name": "Italian", "self_name": "Italiano", "iso639": "it", "flag": "🇮🇹"},
    "pt-PT": {"name": "Portuguese", "self_name": "Português", "iso639": "pt", "flag": "🇵🇹"},
}
```

**Nuevas funciones:**

| Función | Firma | Descripción |
|---------|-------|-------------|
| `get_language_name(target_language)` | `str → str` | Devuelve `"Italian"`, `"Spanish"`, etc. |
| `get_language_self_name(target_language)` | `str → str` | Devuelve `"Italiano"`, `"Español"`, etc. |
| `get_iso639(target_language)` | `str → str` | `"it-IT" → "it"` (sin cambios) |
| `get_language_flag(target_language)` | `str → str` | Emoji bandera |

Se elimina `get_english_variant()` (obsoleto). Los prompts usarán `get_language_name()` y `get_language_self_name()`.

### 10.2.2 Prompts LLM multi-idioma

Todos los prompts del sistema se parametrizan para ser language-agnostic. Se usa `{target_language_name}` (ej: "Italian", "Spanish") y `{target_language_self_name}` (ej: "Italiano", "Español").

#### `lesson_generator.py`

```
ANTES: "You are an expert English teacher..."
AHORA:  "You are an expert {target_language_name} teacher..."
```

La lección se genera completamente en el idioma objetivo. El prompt recibe `target_language_name` y `iso639`.

**Atención — `VALID_GRAMMAR_SLUGS`**: esta constante se construye en tiempo de importación a partir del currículum inglés y se pasa al prompt como lista de slugs válidos. Con idiomas distintos, los grammar slugs del currículum serán diferentes. Debe calcularse dinámicamente por idioma al invocar la generación: `get_valid_grammar_slugs(target_language)` en lugar de la constante global, usando `get_curriculum(target_language)`.

#### `flashcard_sm2.py`

```
ANTES: "Generate {count} English vocabulary flashcards..."
AHORA:  "Generate {count} {target_language_name} vocabulary flashcards..."
```

Las flashcards tienen la palabra en el idioma objetivo y la traducción al `native_language` del usuario.

#### `conversation_pipeline.py`

```
ANTES: "You are an encouraging and patient English conversation partner named FreeLingo..."
       "ALWAYS respond in English, regardless of the language the student uses..."
AHORA: "You are an encouraging and patient {target_language_name} conversation partner named FreeLingo..."
       "ALWAYS respond in {target_language_name}, regardless of the language the student uses..."
```

La conversación ocurre en el idioma objetivo. **Importante**: la regla `ALWAYS respond in English` que aparece hardcodeada en el prompt debe generalizarse a `ALWAYS respond in {target_language_name}`.

#### `chat.py` (TUTOR_SYSTEM_PROMPT)

```
ANTES: "You are an encouraging and patient English language tutor named FreeLingo..."
       "ALWAYS respond in English, regardless of the language the student writes in..."
AHORA: "You are an encouraging and patient {target_language_name} language tutor named FreeLingo..."
       "ALWAYS respond in {target_language_name}, regardless of the language the student writes in..."
```

El tutor de chat adapta el idioma al plan activo. Sin este cambio, el tutor respondería siempre en inglés aunque el idioma activo fuera español o italiano. El `target_language_name` se obtiene del plan activo vía `get_language_name(plan.target_language)` y se pasa al construir el prompt.

#### `listening_service.py` / `reading_service.py`

```
ANTES: "You are an English language content creator..."
AHORA:  "You are a {target_language_name} language content creator..."
```

El contenido (textos, preguntas) se genera en el idioma objetivo.

### 10.2.3 `study_plan_generator.py`

El título del plan se vuelve dinámico:

```python
# ANTES
title = f"English {cefr_level} — {duration_weeks}-week programme"

# AHORA
title = f"{get_language_name(target_language)} {cefr_level} — {duration_weeks}-week programme"
```

El generador acepta un nuevo parámetro `target_language: str` en `generate_study_plan()`.

### 10.2.4 `progress_service.py`

Todas las funciones aceptan `study_plan_id: int` como parámetro. Se filtra por plan en lugar de por usuario global:

```python
# ANTES
async def update_daily_progress(db: AsyncSession, user_id: int, ...)

# AHORA
async def update_daily_progress(db: AsyncSession, user_id: int, study_plan_id: int, ...)
```

**Atención — `upsert_unit_competency`**: esta función también opera sobre `user_competencies`, que ahora tiene `study_plan_id`. Debe aceptar y usar ese parámetro para evitar mezclar competencias de distintos idiomas:

```python
# ANTES
async def upsert_unit_competency(db, user_id, unit_id, ...)

# AHORA
async def upsert_unit_competency(db, user_id, study_plan_id, unit_id, ...)
```

### 10.2.5 `memory_service.py`

`get_user_memories()` acepta `study_plan_id` opcional. Si es `None`, devuelve todos los recuerdos del usuario (compatibilidad hacia atrás). Si se proporciona, filtra por plan.

`MEMORY_SYSTEM_INSTRUCTION` contiene actualmente la frase `"struggles with English, or anything that would help personalise future lessons"`. Debe actualizarse para ser language-agnostic: `"struggles with {target_language_name}, or anything that would help personalise future lessons"`. El texto de instrucción se convierte en una función que acepta `target_language_name` al construirse el prompt del sistema, en lugar de ser una constante de módulo.

### 10.2.6 Nuevo servicio: `user_language_service.py`

**Archivo:** `backend/app/services/user_language_service.py`

| Función | Descripción |
|---------|-------------|
| `get_active_language(db, user_id) → UserLanguage \| None` | Devuelve el idioma activo del usuario |
| `get_user_languages(db, user_id) → list[UserLanguage]` | Todos los idiomas del usuario |
| `add_language(db, user_id, target_language) → UserLanguage` | Añade un nuevo idioma (crea `UserLanguage` + desactiva los demás) |
| `switch_language(db, user_id, target_language) → UserLanguage` | Cambia el idioma activo |
| `remove_language(db, user_id, target_language) → bool` | Elimina un idioma (y sus planes asociados en cascada) |

### 10.2.7 Nueva dependencia FastAPI: `get_active_study_plan`

**Archivo:** `backend/app/core/deps.py` (añadir junto a las dependencias existentes de ese módulo; **no** crear `dependencies.py` nuevo)

```python
async def get_active_study_plan(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> StudyPlan:
    """Obtiene el plan de estudios activo según el idioma activo del usuario."""
    active_lang = await get_active_language(db, current_user.id)
    if not active_lang:
        raise HTTPException(status_code=404, detail="No active language set")
    plan = await db.execute(
        select(StudyPlan).where(
            StudyPlan.user_id == current_user.id,
            StudyPlan.target_language == active_lang.target_language,
            StudyPlan.is_active == True,
        )
    )
    plan = plan.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="No active study plan found")
    return plan
```

---

## Fase 10.3 — API: nuevos endpoints y refactor de existentes

### 10.3.1 Validación de idiomas

**Archivo:** `backend/app/schemas/auth.py`

Se expande `SUPPORTED_TARGET_LANGUAGES`:

```python
SUPPORTED_TARGET_LANGUAGES: set[str] = {
    "en-US", "en-GB",
    "es-ES",
    "it-IT",
    "pt-PT",
}
```

### 10.3.2 Nuevo router: `languages.py`

**Archivo:** `backend/app/routers/languages.py`  
**Prefijo:** `/api/languages`  
**Tag:** `languages`  
**Auth:** todos requieren `require_subscription`.

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/languages` | Lista los idiomas que el usuario está aprendiendo, con progreso resumido |
| GET | `/api/languages/active` | Devuelve el idioma activo actual del usuario |
| POST | `/api/languages` | Añade un nuevo idioma (`{ target_language: "it-IT" }`) y crea entrada en `user_languages` |
| PUT | `/api/languages/active` | Cambia el idioma activo (`{ target_language: "it-IT" }`) |
| DELETE | `/api/languages/{target_language}` | Elimina un idioma y sus planes asociados |

**Schema de respuesta `GET /api/languages`:**

```json
{
  "languages": [
    {
      "target_language": "en-US",
      "is_active": true,
      "plan": {
        "id": 1,
        "cefr_level": "B1",
        "progress_day": 42,
        "total_days": 48,
        "completion_pct": 87.5
      },
      "progress": {
        "total_xp": 12500,
        "current_streak": 23,
        "lessons_completed": 38
      }
    },
    {
      "target_language": "it-IT",
      "is_active": false,
      "plan": null
    }
  ],
  "all_supported_languages": ["en-US", "en-GB", "es-ES", "it-IT", "pt-PT"]
}
```

`all_supported_languages` devuelve siempre los 5 idiomas que el sistema soporta, independientemente de cuáles tenga ya el usuario. El frontend filtra los que ya están en `languages[]` para el modal de "Añadir nuevo idioma".

### 10.3.3 Refactor de endpoints existentes

#### `GET /api/study-plan/current`

Ahora usa `get_active_study_plan` en lugar de buscar el primer plan activo. Devuelve el plan del idioma activo.

Acepta query param opcional `?language=it-IT` para obtener el plan de un idioma específico (usado por el frontend para previsualizar antes de cambiar).

#### `POST /api/study-plan/generate`

**Bug fix incluido**: ahora guarda `target_language` correctamente.

Acepta `target_language` en el body. Si no se proporciona, usa el `target_language` del idioma activo.

#### `GET /api/study-plan/today`

Usa `get_active_study_plan` en lugar de leer `current_user.target_language`.

#### `GET /api/flashcards/*`

Filtra por `study_plan_id` del plan activo en lugar de solo `user_id`.

#### `POST /api/flashcards/generate`

Asigna `study_plan_id` del plan activo a las flashcards generadas.

#### `GET /api/progress/*`

Filtra por `study_plan_id` del plan activo. El progreso es por idioma.

#### `GET /api/progress/competencies`

Filtra por `study_plan_id`.

#### `GET/POST /api/chat`, `/ws/conversation`

Usan `study_plan_id` del plan activo para:
- Determinar `target_language` para el prompt del sistema
- Almacenar `study_plan_id` en `conversations` y `chat_history`
- Filtrar `memories` por `study_plan_id`

#### `GET /api/listening/*`, `GET /api/reading/*`

Ya usaban `target_language` del plan. Se actualizan para obtenerlo del plan activo.

#### `PATCH /api/auth/me`

Al actualizar `target_language`, también se actualiza `user_languages`:
- Si el usuario ya tiene ese idioma, se activa (sin crear plan nuevo).
- Si no lo tiene, se añade entrada en `user_languages` pero **no se crea `StudyPlan`** — el usuario debe pasar por el flujo de assessment para ese idioma. Esto evita crear planes vacíos desde edición de perfil.

#### `POST /api/assessment/complete` y `POST /api/study-plan/generate` — deactivación acotada por idioma

Ambos endpoints actualmente desactivan **todos** los planes activos del usuario antes de crear uno nuevo. Con multi-idioma esto destruiría el plan de inglés al crear el plan de español. Debe acotarse al idioma específico:

```python
# CÓDIGO ACTUAL — ROMPE MULTI-IDIOMA
old_result = await db.execute(
    select(StudyPlan).where(StudyPlan.user_id == current_user.id, StudyPlan.is_active.is_(True))
)
for old in old_result.scalars().all():
    old.is_active = False

# CORRECTO — filtrar también por target_language
old_result = await db.execute(
    select(StudyPlan).where(
        StudyPlan.user_id == current_user.id,
        StudyPlan.is_active.is_(True),
        StudyPlan.target_language == target_language,
    )
)
for old in old_result.scalars().all():
    old.is_active = False
```

#### `GET /api/assessment/start` y `POST /api/assessment/submit` — idioma del assessment

Actualmente el assessment genera preguntas en inglés sin importar el idioma objetivo. Con multi-idioma:

- `GET /api/assessment/start` debe aceptar un query param `?language=es-ES` (default `en-US`) para saber en qué idioma evaluar al usuario.
- El LLM prompt debe especificar el idioma: `"Generate an adaptive CEFR quiz with 20 questions for {target_language_name} language proficiency."`.
- La clave Redis debe incluir el idioma para evitar colisiones si el usuario tiene dos assessments en curso simultáneos: `assessment:{user_id}:{target_language}` (en lugar de `assessment:{user_id}`).

#### `GET /api/assessment/level-test/questions/{plan_id}` — currículum por idioma

Este endpoint llama a `get_curriculum_units(plan.cefr_level)` para obtener grammar points y vocabulary sets del plan activo. Debe usar `get_curriculum(plan.target_language)` en su lugar, para obtener el currículum del idioma correcto y no siempre el inglés.

---

## Fase 10.4 — Frontend: infraestructura core

### 10.4.1 Configuración de idiomas soportados

**Archivo:** `frontend/src/lib/target-languages.ts`

```typescript
export interface TargetLanguage {
  code: string        // BCP-47
  name: string        // "Italiano", "Español"
  nameEn: string      // "Italian", "Spanish"
  flag: string        // Emoji flag
  flagPath: string    // Path under /public/flags/
  iso639: string      // "it", "es"
}

export const SUPPORTED_TARGET_LANGUAGES: TargetLanguage[] = [
  { code: 'en-US', name: 'English (US)', nameEn: 'English (US)', flag: '🇺🇸', flagPath: '/flags/usa.jpg', iso639: 'en' },
  { code: 'en-GB', name: 'English (UK)', nameEn: 'English (UK)', flag: '🇬🇧', flagPath: '/flags/uk.jpg', iso639: 'en' },
  { code: 'es-ES', name: 'Español', nameEn: 'Spanish', flag: '🇪🇸', flagPath: '/flags/spain.jpeg', iso639: 'es' },
  { code: 'it-IT', name: 'Italiano', nameEn: 'Italian', flag: '🇮🇹', flagPath: '/flags/italy.jpeg', iso639: 'it' },
  { code: 'pt-PT', name: 'Português', nameEn: 'Portuguese', flag: '🇵🇹', flagPath: '/flags/portugal.jpeg', iso639: 'pt' },
]

export function getLanguageByCode(code: string): TargetLanguage | undefined {
  return SUPPORTED_TARGET_LANGUAGES.find(l => l.code === code)
}
```

### 10.4.2 Auth store y Language store

**Archivo:** `frontend/src/store/auth.ts`

- Se mantiene `target_language?: string` en `User` (idioma activo actual).
- Se añade al store:
  ```typescript
  activeLanguage: TargetLanguage | null
  userLanguages: UserLanguageInfo[]
  setActiveLanguage: (lang: TargetLanguage) => void
  setUserLanguages: (langs: UserLanguageInfo[]) => void
  fetchUserLanguages: () => Promise<void>
  switchLanguage: (code: string) => Promise<void>
  ```

**Archivo:** `frontend/src/store/language.ts` (nuevo)

Alternativamente, store separado para la lógica de idiomas. Contiene:

```typescript
interface LanguageStore {
  activeLanguage: TargetLanguage | null       // Idioma activo actual
  userLanguages: UserLanguageInfo[]           // Idiomas del usuario con progreso
  supportedLanguages: TargetLanguage[]        // Idiomas que el sistema soporta
  isSwitching: boolean                        // Animación de cambio
  fetchLanguages: () => Promise<void>
  switchLanguage: (code: string) => Promise<void>
  addLanguage: (code: string) => Promise<void>
  removeLanguage: (code: string) => Promise<void>
}
```

### 10.4.3 Language Switcher en sidebar

**Archivo:** `frontend/src/app/(app)/layout.tsx`

Se añade un componente `LanguageSwitcher` en la parte superior del sidebar (debajo del logo/nombre de la app, antes de los items de navegación).

**Componente:** `frontend/src/components/LanguageSwitcher.tsx`

```tsx
// Comportamiento:
// - Muestra la bandera (emoji) + nombre del idioma activo
// - Dropdown con todos los idiomas del usuario
// - Al cambiar: llama PUT /api/languages/active → refresca la página actual
// - Toast de confirmación: "Cambiando a Italiano (A2)..."
// - Si solo hay 1 idioma: no muestra dropdown, solo indicador
// - Loading spinner durante el cambio
```

Diseño visual:
- Botón compacto con bandera + código (`🇮🇹 Italiano`) y un chevron.
- Estilo: `text-fl-muted hover:text-fl-fg`, con fondo sutil al hacer hover.
- Dropdown: lista de idiomas con indicador de nivel CEFR y check en el activo.

### 10.4.4 Mappers actualizados

**Archivo:** `frontend/src/lib/mappers.ts`

Se añade mapping de `UserLanguage` de la API al tipo de frontend, incluyendo la información de progreso resumida.

---

## Fase 10.5 — Frontend: páginas

### 10.5.1 Onboarding (actualización)

**Archivo:** `frontend/src/app/(auth)/onboarding/page.tsx`

Se actualiza el `TargetLanguageSelector` para mostrar **todos los idiomas** (no solo variantes de inglés):

```
Selecciona qué idioma quieres aprender
┌──────────┐ ┌──────────┐ ┌──────────┐
│ �🇸       │ │ 🇬🇧       │ │ 🇪🇸       │
│ English  │ │ English  │ │ Español  │
│ (US)     │ │ (UK)     │ │ ...      │
└──────────┘ └──────────┘ └──────────┘
┌──────────┐ ┌──────────┐
│ 🇮🇹       │ │ 🇵🇹       │
│ Italiano │ │ Português│
│ ...      │ │ ...      │
└──────────┘ └──────────┘
```

Grid de tarjetas (3 columnas en desktop, 2 en tablet, 1 en móvil). Cada tarjeta muestra:
- Bandera (imagen JPG del directorio `/flags/`)
- Nombre del idioma (en el propio idioma + en inglés debajo)
- Descripción breve

**Cambio en `TargetLanguageSelector`**: recibe la lista completa de `SUPPORTED_TARGET_LANGUAGES` como prop o la importa directamente.

### 10.5.2 Página "Mis Idiomas" en Ajustes

**Archivo:** `frontend/src/app/(app)/settings/languages/page.tsx`

Nueva subpágina de ajustes accesible desde `/settings/languages`. Misma estructura que `/settings/memories` (breadcrumb a `/settings`).

**Contenido:**

```
← Volver a Ajustes

MIS IDIOMAS                    [+ Añadir nuevo idioma]

┌─────────────────────────────────────────────┐
│ 🇺🇸 English (US)                    [ACTIVO] │
│ Nivel: B1 · 87% completado                  │
│ XP total: 12,500 · Racha: 23 días           │
│ Lecciones: 38/48 · Flashcards: 156          │
│                               [Ver detalles]│
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🇮🇹 Italiano                         A1      │
│ Nivel: A1 · 12% completado                  │
│ XP total: 850 · Racha: 3 días               │
│ Lecciones: 3/40 · Flashcards: 24            │
│                [Cambiar a este] [Eliminar]  │
└─────────────────────────────────────────────┘
```

**Botón "Añadir nuevo idioma"**: abre un modal con el selector de idiomas (mismo componente que el onboarding) mostrando solo los idiomas que el usuario aún no ha añadido. Al seleccionar uno:
1. `POST /api/languages` → crea el `UserLanguage`
2. Redirige al flujo de assessment para ese idioma (`/onboarding?language=it-IT&new=true`)
3. El assessment crea el `StudyPlan` con el `target_language` adecuado.

**Botón "Cambiar a este"**: 
1. `PUT /api/languages/active` con `{ target_language }`
2. Refresca el store y redirige al dashboard del nuevo idioma.
3. Toast: "Cambiado a Italiano (A2)".

**Botón "Eliminar"**: confirmación modal → `DELETE /api/languages/{code}` → elimina en cascada el plan, lecciones, flashcards, progreso, etc.

### 10.5.3 Plan page (actualización)

**Archivo:** `frontend/src/app/(app)/plan/page.tsx`

- Muestra el nombre del idioma y nivel CEFR en el encabezado: "Italiano — B1".
- Todos los endpoints llamados ya filtran por `study_plan_id` del plan activo (transparente).

### 10.5.4 Dashboard (actualización)

**Archivo:** `frontend/src/app/(app)/dashboard/page.tsx`

- El encabezado incluye el idioma activo: "Hola, María — estás aprendiendo Italiano (B1)".
- Las stats (XP, racha, progreso) corresponden al idioma activo.
- Si el usuario tiene varios idiomas y el progreso del actual es 0 (acaba de cambiar), se muestra un estado normal con datos del nuevo idioma.

### 10.5.5 Chat page (actualización)

**Archivo:** `frontend/src/app/(app)/chat/page.tsx`

- Las conversaciones se filtran por `study_plan_id` del plan activo.
- El historial muestra solo conversaciones del idioma activo.
- El prompt del sistema incluye el nombre del idioma.

### 10.5.6 Conversation page (actualización)

**Archivo:** `frontend/src/components/conversation/ConversationMode.tsx`

- Igual que chat: filtrado por idioma activo.

### 10.5.7 Flashcard page (actualización)

**Archivo:** `frontend/src/app/(app)/flashcards/page.tsx`

- Las flashcards mostradas son solo las del `study_plan_id` activo.
- La generación asigna automáticamente el `study_plan_id` correcto.

### 10.5.8 Progress page (actualización)

**Archivo:** `frontend/src/app/(app)/progress/page.tsx`

- Competencias y stats filtradas por `study_plan_id` del idioma activo.
- Muestra el nombre del idioma en el encabezado.

---

## Fase 10.6 — Currículum y datos por idioma

### 10.6.1 Backend: datos de currículum

**Archivo:** `backend/app/data/curriculum.py` (actualización)

```python
# Importa el currículum del idioma según target_language
def get_curriculum(target_language: str) -> list[CurriculumUnit]:
    iso = get_iso639(target_language)
    if iso == "en":
        from app.data.en.curriculum import CURRICULUM
        return CURRICULUM
    elif iso == "es":
        from app.data.es.curriculum import CURRICULUM
        return CURRICULUM
    elif iso == "it":
        from app.data.it.curriculum import CURRICULUM
        return CURRICULUM
    elif iso == "pt":
        from app.data.pt.curriculum import CURRICULUM
        return CURRICULUM
    # fallback
    from app.data.en.curriculum import CURRICULUM
    return CURRICULUM
```

### 10.6.2 Nuevos directorios de currículum

Para cada idioma nuevo se crea un directorio con la misma estructura que `backend/app/data/en/`:

- `backend/app/data/es/` — Currículum de español
- `backend/app/data/it/` — Currículum de italiano
- `backend/app/data/pt/` — Currículum de portugués

Cada directorio contiene exactamente los mismos archivos que `en/`:

| Archivo | Descripción |
|---------|-------------|
| `__init__.py` | Paquete Python |
| `_types.py` | Tipos compartidos (puede re-exportar desde `en/_types.py` si son idénticos) |
| `curriculum.py` | Punto de entrada: importa y re-exporta `CURRICULUM` ensamblado |
| `curriculum_a1.py` | Unidades CEFR A1 en el idioma objetivo |
| `curriculum_a2.py` | Unidades CEFR A2 en el idioma objetivo |
| `curriculum_b1.py` | Unidades CEFR B1 en el idioma objetivo |
| `curriculum_b2.py` | Unidades CEFR B2 en el idioma objetivo |
| `curriculum_c1.py` | Unidades CEFR C1 en el idioma objetivo |
| `curriculum_c2.py` | Unidades CEFR C2 en el idioma objetivo |

El currículum de inglés (`backend/app/data/en/`) ya existe y no se modifica.

### 10.6.3 Frontend: datos estáticos por idioma

**Archivo:** `frontend/src/data/curriculum.ts` (actualización)

Se convierte en un punto de entrada dinámico que carga los datos según el idioma activo:

```typescript
export function getCurriculum(targetLanguage: string): CurriculumData {
  const iso = targetLanguage.split('-')[0]
  switch (iso) {
    case 'en': return enCurriculum
    case 'es': return esCurriculum
    case 'it': return itCurriculum
    case 'pt': return ptCurriculum
    default: return enCurriculum
  }
}
```

Se crean directorios paralelos:
- `frontend/src/data/es/curriculum.ts`
- `frontend/src/data/es/grammar.ts`
- `frontend/src/data/es/vocabulary.ts`
- `frontend/src/data/es/phrasebook.ts`
- `frontend/src/data/es/assessment-bank.ts`

(Ídem para `it/` y `pt/`)

### 10.6.4 Banderas

Ya añadidas a `frontend/public/flags/`:
- `spain.jpeg`
- `italy.jpeg`
- `portugal.jpeg`

(Las de `usa.jpg` y `uk.jpg` ya existían.)

---

## Fase 10.7 — i18n: nuevos keys de traducción

### 10.7.1 Namespace `languages`

Añadir a los 10 archivos de locale (`messages/*.json`):

```json
"languages": {
  "myLanguages": "Mis Idiomas",
  "addLanguage": "Añadir nuevo idioma",
  "selectLanguage": "Selecciona qué idioma quieres aprender",
  "activeLanguage": "Activo",
  "switchTo": "Cambiar a este",
  "switching": "Cambiando a {language}...",
  "switched": "Cambiado a {language} ({level})",
  "removeLanguage": "Eliminar idioma",
  "removeConfirmTitle": "¿Eliminar {language}?",
  "removeConfirmMessage": "Se eliminará todo el progreso, lecciones, flashcards y datos asociados a este idioma. Esta acción no se puede deshacer.",
  "removeConfirmButton": "Eliminar",
  "noLanguages": "No tienes idiomas configurados.",
  "progressLabel": "Progreso",
  "levelLabel": "Nivel",
  "xpLabel": "XP total",
  "streakLabel": "Racha",
  "lessonsLabel": "Lecciones",
  "flashcardsLabel": "Flashcards",
  "viewDetails": "Ver detalles",
  "supportedLanguages": "Idiomas disponibles"
}
```

### 10.7.2 Actualización de `onboarding`

```json
"onboarding": {
  "headline": "¿Qué idioma quieres aprender?",
  "subtitle": "Elige el idioma que quieres estudiar. Podrás añadir más idiomas después desde Ajustes.",
  "cta": "Empezar a aprender",
  "newLanguageHeadline": "¿Qué nuevo idioma quieres aprender?",
  "newLanguageSubtitle": "Se creará un nuevo plan de estudios para este idioma."
}
```

### 10.7.3 Actualización de `nav` / sidebar

```json
"nav": {
  "switchLanguage": "Cambiar idioma"
}
```

### 10.7.4 Actualización de `targetLanguages`

Se añaden entradas para los nuevos idiomas:

```json
"targetLanguages": {
  "en-US": "Inglés (americano)",
  "en-US-description": "Inglés estándar de EE.UU., usado en negocios internacionales y medios.",
  "en-GB": "Inglés (británico)",
  "en-GB-description": "Inglés del Reino Unido, referencia para exámenes internacionales (IELTS, Cambridge).",
  "es-ES": "Español (España)",
  "es-ES-description": "Español de España, hablado por más de 500 millones de personas en el mundo.",
  "it-IT": "Italiano",
  "it-IT-description": "Italiano estándar, lengua de cultura, arte y gastronomía.",
  "pt-PT": "Portugués (Portugal)",
  "pt-PT-description": "Portugués de Portugal, lengua oficial en Portugal y Brasil."
}
```

---

## Fase 10.8 — Schemas Pydantic

**Archivo:** `backend/app/schemas/language.py` (nuevo)

```python
from pydantic import BaseModel, field_validator

from app.schemas.auth import SUPPORTED_TARGET_LANGUAGES


class LanguageAddRequest(BaseModel):
    target_language: str

    @field_validator("target_language")
    @classmethod
    def validate_target_language(cls, v: str) -> str:
        if v not in SUPPORTED_TARGET_LANGUAGES:
            raise ValueError(f"Unsupported target language. Choose from: {SUPPORTED_TARGET_LANGUAGES}")
        return v


class LanguageSwitchRequest(BaseModel):
    target_language: str

    @field_validator("target_language")
    @classmethod
    def validate_target_language(cls, v: str) -> str:
        if v not in SUPPORTED_TARGET_LANGUAGES:
            raise ValueError(f"Unsupported target language. Choose from: {SUPPORTED_TARGET_LANGUAGES}")
        return v


class LanguagePlanInfo(BaseModel):
    id: int
    cefr_level: str | None
    progress_day: int
    total_days: int
    completion_pct: float


class LanguageProgressInfo(BaseModel):
    total_xp: int
    current_streak: int
    lessons_completed: int


class UserLanguageOut(BaseModel):
    target_language: str
    is_active: bool
    plan: LanguagePlanInfo | None
    progress: LanguageProgressInfo | None


class UserLanguageListResponse(BaseModel):
    languages: list[UserLanguageOut]
    all_supported_languages: list[str]
```

### Actualización de `GenerateStudyPlanRequest`

**Archivo:** `backend/app/schemas/study_plan.py`

Se añade campo opcional `target_language`:

```python
class GenerateStudyPlanRequest(BaseModel):
    cefr_level: str
    goals: list[str]
    duration_weeks: int
    days_per_week: int
    target_language: str | None = None  # NUEVO: si no se proporciona, usa el idioma activo
```

---

## Fase 10.9 — Tests

### 10.9.1 Backend tests

**Archivo:** `backend/tests/test_multi_language.py` (nuevo)

Casos de prueba:

| Test | Descripción |
|------|-------------|
| `test_add_new_language` | POST /api/languages crea UserLanguage y lo marca activo |
| `test_add_duplicate_language` | POST con un idioma ya existente → 409 |
| `test_switch_language` | PUT /api/languages/active cambia el idioma activo |
| `test_list_languages` | GET /api/languages devuelve todos los idiomas con progreso |
| `test_remove_language_cascades` | DELETE /api/languages/{code} elimina plan, lecciones, etc. |
| `test_active_plan_per_language` | Dos idiomas activos simultáneos con sus planes independientes |
| `test_progress_isolated_by_language` | XP y racha son independientes por idioma |
| `test_flashcards_isolated_by_language` | Flashcards filtradas por study_plan_id |
| `test_conversations_isolated_by_language` | Conversaciones filtradas por idioma activo |
| `test_memories_isolated_by_language` | Recuerdos filtrados por study_plan_id |
| `test_curriculum_per_language` | get_curriculum() devuelve datos del idioma correcto |
| `test_prompt_language_agnostic` | Los prompts incluyen el nombre correcto del idioma |
| `test_onboarding_creates_user_language` | El registro + onboarding crea automáticamente UserLanguage |
| `test_supported_languages_validation` | POST con idioma no soportado → 422 |
| `test_assessment_language_param` | GET /assessment/start?language=es-ES genera preguntas en español |
| `test_assessment_redis_key_isolation` | Dos assessments en curso (idiomas distintos) no se sobreescriben |
| `test_plan_deactivation_scoped_by_language` | Crear plan de español no desactiva el plan de inglés activo |
| `test_chat_prompt_uses_target_language` | El TUTOR_SYSTEM_PROMPT usa el idioma activo del plan |

### 10.9.2 Actualización de tests existentes

Todos los tests que crean usuarios, planes de estudio, flashcards, progreso, etc. deben actualizarse para incluir `study_plan_id` donde corresponda y crear el `UserLanguage` asociado.

**Archivos afectados:**
- `backend/tests/test_auth.py`
- `backend/tests/test_study_plan.py`
- `backend/tests/test_flashcards.py`
- `backend/tests/test_lessons.py`
- `backend/tests/test_chat.py`
- `backend/tests/test_conversation.py`
- `backend/tests/test_listening.py`
- `backend/tests/test_reading.py`
- `backend/tests/test_progress.py`
- `backend/tests/test_memories.py`
- `backend/tests/test_assessment.py`

---

## Fase 10.10 — Finalización

### 10.10.1 Actualización de documentación

| Archivo | Cambio |
|---------|--------|
| `specs/database-models.instructions.md` | Añadir `user_languages`, documentar nuevas columnas `study_plan_id` |
| `specs/api-endpoints.instructions.md` | Documentar nuevo router `/api/languages` (5 endpoints) y cambios en endpoints existentes |
| `specs/services.instructions.md` | Documentar `user_language_service.py`, cambios en `language_helpers.py` y `progress_service.py` |
| `specs/architecture.instructions.md` | Actualizar flujo de datos: multi-plan, idioma activo, dependencia `get_active_study_plan` |
| `specs/study-plan.instructions.md` | Actualizar: múltiples planes activos (uno por idioma), constraint `uq_active_plan_per_lang` |
| `specs/phase-4-target-language.instructions.md` | Añadir nota: "Phase 10 extiende esto a multi-idioma por usuario" |
| `AGENTS.md` | Actualizar versión, añadir referencia a Phase 10 |

### 10.10.2 CHANGELOG y versión

- **Versión:** `1.7.0` (minor bump — nueva funcionalidad mayor)
- **CHANGELOG:** entrada completa documentando la fase

### 10.10.3 Actualización del roadmap

**Archivo:** `specs/roadmap.instructions.md`

Se añade la sección Phase 10 con milestones y criterios de completado.

---

## Resumen de archivos nuevos

| Archivo | Tipo |
|---------|------|
| `backend/app/models/user_language.py` | Modelo SQLAlchemy |
| `backend/app/services/user_language_service.py` | Servicio |
| `backend/app/routers/languages.py` | Router (5 endpoints) |
| `backend/app/schemas/language.py` | Schemas Pydantic |
| `backend/alembic/versions/00XX_multi_language.py` | Migración Alembic |
| `backend/tests/test_multi_language.py` | Tests |
| `backend/app/data/es/__init__.py` | Paquete Python |
| `backend/app/data/es/_types.py` | Tipos (puede re-exportar desde `en/`) |
| `backend/app/data/es/curriculum.py` | Punto de entrada currículum ES |
| `backend/app/data/es/curriculum_a1.py` … `curriculum_c2.py` | Unidades CEFR A1–C2 en español (6 archivos) |
| `backend/app/data/it/` | Ídem para italiano (8 archivos) |
| `backend/app/data/pt/` | Ídem para portugués (8 archivos) |
| `frontend/src/store/language.ts` | Zustand store |
| `frontend/src/components/LanguageSwitcher.tsx` | Selector sidebar |
| `frontend/src/app/(app)/settings/languages/page.tsx` | Página Mis Idiomas |
| `frontend/src/data/es/curriculum.ts` | Currículum frontend ES |
| `frontend/src/data/es/grammar.ts` | Gramática frontend ES |
| `frontend/src/data/es/vocabulary.ts` | Vocabulario frontend ES |
| `frontend/src/data/es/phrasebook.ts` | Phrasebook frontend ES |
| `frontend/src/data/es/assessment-bank.ts` | Assessment bank frontend ES |
| `frontend/src/data/it/` | Ídem para italiano (5 archivos) |
| `frontend/src/data/pt/` | Ídem para portugués (5 archivos) |
| `frontend/public/flags/spain.jpeg` | Bandera España ✅ |
| `frontend/public/flags/italy.jpeg` | Bandera Italia ✅ |
| `frontend/public/flags/portugal.jpeg` | Bandera Portugal ✅ |