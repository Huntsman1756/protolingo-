import type { CEFRLevel } from '@/data/grammar'

export type LessonType =
  | 'grammar'
  | 'vocabulary'
  | 'reading'
  | 'writing'
  | 'review'

export type Intensity = 'intensive' | 'standard' | 'relaxed' | 'very_relaxed'

export interface IntensityConfig {
  label: string
  description: string
  weeks: number
  days_per_week: number
  recommended?: boolean
}

export interface CurriculumUnit {
  id: string
  level: CEFRLevel
  unit_number: number
  title: string
  default_weeks: [number, number]
  grammar_points: string[]
  vocabulary_set_ids: string[]
  lesson_types: LessonType[]
  prerequisite_unit?: string
  competency_checklist: string[]
}

export interface LevelCurriculum {
  level: CEFRLevel
  title: string
  description: string
  default_duration_weeks: number
  units: CurriculumUnit[]
}

export const CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const INTENSITY_OPTIONS: Record<Intensity, IntensityConfig> = {
  intensive: {
    label: 'Intensive',
    description: '~20 lessons · 5 days/week',
    weeks: 4,
    days_per_week: 5,
  },
  standard: {
    label: 'Standard',
    description: '~40 lessons · 5 days/week',
    weeks: 8,
    days_per_week: 5,
  },
  relaxed: {
    label: 'Relaxed',
    description: '~48 lessons · 4 days/week',
    weeks: 12,
    days_per_week: 4,
    recommended: true,
  },
  very_relaxed: {
    label: 'Very relaxed',
    description: '~48 lessons · 3 days/week',
    weeks: 16,
    days_per_week: 3,
  },
}

const A1_UNITS: CurriculumUnit[] = [
  {
    id: 'a1-unit-1',
    level: 'A1',
    unit_number: 1,
    title: 'Saludos y presentaciones',
    default_weeks: [1, 2],
    grammar_points: ['ser', 'pronombres-sujeto', 'articulos-definidos'],
    vocabulary_set_ids: ['saludos_es_a1', 'presentaciones_es_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Se presenta usando ser: nombre, edad y nacionalidad (Soy María, tengo 25 años, soy española)',
      'Saluda y se despide con el registro adecuado: hola, buenos días, buenas tardes, hasta luego',
      'Usa los artículos definidos el/la/los/las con sustantivos conocidos y verifica la concordancia de género',
      'Pregunta y responde a ¿Cómo te llamas? / ¿De dónde eres? en un breve intercambio oral',
    ],
  },
  {
    id: 'a1-unit-2',
    level: 'A1',
    unit_number: 2,
    title: 'Nacionalidades y profesiones',
    default_weeks: [2, 3],
    grammar_points: [
      'ser-nacionalidad',
      'genero-sustantivos',
      'articulos-indefinidos',
    ],
    vocabulary_set_ids: ['nacionalidades_es_a1', 'profesiones_es_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-1',
    competency_checklist: [
      'Indica nacionalidad y profesión usando ser con la forma masculina/femenina correcta: soy inglés/inglesa, soy médico/médica',
      'Aplica la concordancia de género entre sustantivo y adjetivo: una profesora española, un alumno inglés',
      'Usa un/una/unos/unas correctamente con profesiones y objetos en oraciones simples',
      'Distingue ser (identidad, nacionalidad, profesión) de estar (no enseñado aún) en contextos A1',
    ],
  },
  {
    id: 'a1-unit-3',
    level: 'A1',
    unit_number: 3,
    title: 'La familia y descripciones',
    default_weeks: [3, 4],
    grammar_points: [
      'tener',
      'adjetivos-posesivos',
      'adjetivos-descriptivos',
      'demostrativos',
    ],
    vocabulary_set_ids: ['familia_es_a1', 'descripciones_es_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-2',
    competency_checklist: [
      'Nombra a los miembros de la familia y usa tener para edad y parentesco: Tengo dos hermanos, Mi madre tiene 50 años',
      'Usa los adjetivos posesivos mi/tu/su/nuestro con sustantivos en singular y plural correctamente',
      'Describe el aspecto físico y la personalidad con adjetivos con concordancia de género y número: alto/alta, simpático/simpática',
      'Escribe un párrafo corto (40–50 palabras) describiendo a un familiar usando ser, tener y adjetivos',
    ],
  },
  {
    id: 'a1-unit-4',
    level: 'A1',
    unit_number: 4,
    title: 'Rutina diaria y verbos presente',
    default_weeks: [4, 5],
    grammar_points: ['presente-regular', 'verbos-reflexivos', 'horas'],
    vocabulary_set_ids: ['rutina_es_a1', 'horas_es_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-3',
    competency_checklist: [
      'Conjuga los verbos regulares -ar (hablar), -er (comer) e -ir (vivir) en presente para las seis personas',
      'Usa los verbos reflexivos correctamente: me levanto, me ducho, me acuesto con el pronombre correspondiente',
      'Dice la hora usando Es la una, Son las tres y media, a las ocho menos cuarto',
      'Describe su rutina diaria en una secuencia conectada de 5–6 oraciones',
    ],
  },
  {
    id: 'a1-unit-5',
    level: 'A1',
    unit_number: 5,
    title: 'Gustos y preferencias',
    default_weeks: [5, 6],
    grammar_points: ['gustar', 'tambien-tampoco', 'muy-mucho'],
    vocabulary_set_ids: ['comida_es_a1', 'actividades_es_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-4',
    competency_checklist: [
      'Usa gustar correctamente con sustantivos singulares/plurales e infinitivos: me gusta el café, me gustan los libros, me gusta leer',
      'Aplica los pronombres de objeto indirecto me/te/le/nos/os/les antes de gusta/gustan',
      'Expresa grado con mucho, bastante, un poco, nada: Me gusta mucho el fútbol, No me gusta nada el ruido',
      'Expresa acuerdo y desacuerdo usando a mí también/a mí tampoco y a mí sí/a mí no',
    ],
  },
  {
    id: 'a1-unit-6',
    level: 'A1',
    unit_number: 6,
    title: 'Lugares y direcciones',
    default_weeks: [6, 7],
    grammar_points: ['estar', 'hay', 'preposiciones-lugar'],
    vocabulary_set_ids: ['lugares_es_a1', 'direcciones_es_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-5',
    competency_checklist: [
      'Distingue estar (ubicación de cosas/personas específicas) de hay (existencia de cosas no especificadas): La farmacia está en la calle Mayor vs Hay una farmacia cerca',
      'Ubica lugares y objetos usando: en, al lado de, enfrente de, cerca de, lejos de, entre',
      'Da indicaciones sencillas usando: gira a la derecha/izquierda, sigue todo recto, cruza la calle',
      'Nombra lugares esenciales de la ciudad y comprende una descripción escrita simple de un mapa',
    ],
  },
  {
    id: 'a1-unit-7',
    level: 'A1',
    unit_number: 7,
    title: 'Planes y futuro próximo',
    default_weeks: [7, 8],
    grammar_points: ['ir-a-futuro', 'querer-poder', 'dias-semana'],
    vocabulary_set_ids: ['transporte_es_a1', 'clima_es_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-6',
    competency_checklist: [
      'Forma ir a + infinitivo correctamente para todas las personas para expresar acciones planeadas: Voy a estudiar el lunes, ¿Qué vas a hacer mañana?',
      'Usa querer + infinitivo para deseos y poder + infinitivo para capacidad o permiso: Quiero ir al cine, No puedo venir',
      'Nombra los días de la semana y usa el + día (habitual) vs este + día (específico): los lunes trabajo, este viernes salgo',
      'Habla del tiempo usando: hace sol/frío/calor/viento, llueve, nieva, está nublado',
    ],
  },
  {
    id: 'a1-unit-8',
    level: 'A1',
    unit_number: 8,
    title: 'A1 consolidación',
    default_weeks: [8, 8],
    grammar_points: [
      'ser',
      'estar',
      'tener',
      'presente-regular',
      'verbos-reflexivos',
      'gustar',
      'ir-a-futuro',
      'articulos-definidos',
      'pronombres-sujeto',
    ],
    vocabulary_set_ids: ['repaso_es_a1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a1-unit-7',
    competency_checklist: [
      'Mantiene un intercambio oral o escrito sencillo sobre temas familiares sin interrupciones importantes',
      'Distingue los usos principales de ser (identidad, profesión, nacionalidad) y estar (ubicación, estado) en contexto',
      'Alterna entre presente, ir a + infinitivo y hay/estar según sea necesario en un texto breve',
      'Lee y comprende un texto cotidiano sencillo de 60–80 palabras y responde preguntas factuales',
    ],
  },
]

const A2_UNITS: CurriculumUnit[] = [
  {
    id: 'a2-unit-1',
    level: 'A2',
    unit_number: 1,
    title: 'Pasado simple: pretérito indefinido',
    default_weeks: [1, 2],
    grammar_points: [
      'preterito-indefinido-regular',
      'marcadores-temporales',
      'preterito-irregular',
    ],
    vocabulary_set_ids: ['viajes_es_a2', 'experiencias_es_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Conjuga los verbos regulares -ar/-er/-ir en pretérito indefinido para las seis personas (hablé, comiste, vivió)',
      'Usa los pretéritos irregulares más comunes: ser/ir (fui/fuiste), estar (estuve), tener (tuve), hacer (hice), venir (vine), poder (pude)',
      'Sitúa acciones pasadas en el tiempo usando ayer, el lunes pasado, en 2020, hace tres días, el año pasado',
      'Narra una secuencia breve de eventos pasados completados en orden lógico en un párrafo de 60–80 palabras',
    ],
  },
  {
    id: 'a2-unit-2',
    level: 'A2',
    unit_number: 2,
    title: 'Describir el pasado: pretérito imperfecto',
    default_weeks: [2, 3],
    grammar_points: ['imperfecto', 'preterito-vs-imperfecto', 'solia'],
    vocabulary_set_ids: ['infancia_es_a2', 'descripciones_es_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-1',
    competency_checklist: [
      'Conjuga el imperfecto para todas las personas: patrón regular -aba/-ía y los tres irregulares ser (era), ir (iba), ver (veía)',
      'Usa el imperfecto para estados pasados en curso, descripciones de escenas y acciones habituales pasadas (de niño, siempre comía...)',
      'Distingue pretérito indefinido (evento completado en primer plano) del imperfecto (trasfondo, estado, hábito): Cuando llegué, llovía',
      'Escribe un breve recuerdo de infancia (60–80 palabras) combinando ambos tiempos de forma natural',
    ],
  },
  {
    id: 'a2-unit-3',
    level: 'A2',
    unit_number: 3,
    title: 'Pronombres de objeto directo e indirecto',
    default_weeks: [3, 4],
    grammar_points: [
      'pronombres-objeto-directo',
      'pronombres-objeto-indirecto',
      'doble-objeto',
    ],
    vocabulary_set_ids: ['compras_es_a2', 'regalos_es_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-2',
    competency_checklist: [
      'Sustituye un sustantivo de objeto directo por lo/la/los/las en la posición correcta: ¿El libro? Lo tengo en casa',
      'Usa los pronombres de objeto indirecto le/les y entiende que le sustituye tanto a "a él" como "a ella"',
      'Combina pronombres de objeto directo e indirecto aplicando la regla le → se antes de lo/la: Se lo di',
      'Coloca los pronombres de objeto correctamente: antes del verbo conjugado o unidos al infinitivo/gerundio',
    ],
  },
  {
    id: 'a2-unit-4',
    level: 'A2',
    unit_number: 4,
    title: 'Comparaciones y superlativos',
    default_weeks: [4, 5],
    grammar_points: ['comparativos', 'superlativos', 'tan-como'],
    vocabulary_set_ids: ['ciudades_es_a2', 'cultura_es_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-3',
    competency_checklist: [
      'Compara usando más/menos + adjetivo/adverbio + que y distingue de más de + número: Es más caro que el otro, Cuesta más de 10 euros',
      'Expresa igualdad con tan + adjetivo/adverbio + como y tanto/a/os/as + sustantivo + como',
      'Forma superlativos con el/la/los/las + más/menos + adjetivo + de: Es el más caro de la ciudad',
      'Usa comparativos y superlativos irregulares: mejor/peor, mayor/menor, superior/inferior sin añadir más',
    ],
  },
  {
    id: 'a2-unit-5',
    level: 'A2',
    unit_number: 5,
    title: 'Imperativo y consejos',
    default_weeks: [5, 6],
    grammar_points: [
      'imperativo-afirmativo',
      'imperativo-negativo',
      'imperativo-irregular',
    ],
    vocabulary_set_ids: ['salud_es_a2', 'consejos_es_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-4',
    competency_checklist: [
      'Forma mandatos afirmativos de tú para verbos regulares (¡Habla! ¡Come! ¡Escribe!) y las ocho formas irregulares: ten, pon, ven, sal, haz, di, ve, sé',
      'Forma mandatos negativos de tú usando la raíz del presente de subjuntivo: ¡No hables! ¡No comas! ¡No salgas!',
      'Forma mandatos de usted/ustedes (formal) para verbos regulares e irregulares comunes',
      'Une pronombres reflexivos y de objeto a mandatos afirmativos: ¡Siéntate! ¡Dámelo! y los coloca antes de los negativos: ¡No te sientes! ¡No me lo des!',
    ],
  },
  {
    id: 'a2-unit-6',
    level: 'A2',
    unit_number: 6,
    title: 'Futuro simple y condicional',
    default_weeks: [6, 7],
    grammar_points: [
      'futuro-simple',
      'condicional-simple',
      'si-presente-futuro',
    ],
    vocabulary_set_ids: ['trabajo_es_a2', 'planes_es_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-5',
    competency_checklist: [
      'Conjuga el futuro simple para todas las personas usando el infinitivo como raíz (hablaré, comerás, vivirá) y raíces irregulares: habr-, querr-, podr-, tendr-, vendr-, saldr-, pondr-, dir-, har-',
      'Usa el futuro para predicciones y para expresar probabilidad en presente (¿Dónde estará Juan? = Me pregunto dónde está Juan)',
      'Conjuga el condicional para todas las personas (hablaría, comerías) y lo usa para peticiones corteses (¿Podría ayudarme?) y situaciones hipotéticas',
      'Forma una condicional real usando si + presente de indicativo + futuro: Si estudias, aprobarás el examen',
    ],
  },
  {
    id: 'a2-unit-7',
    level: 'A2',
    unit_number: 7,
    title: 'Historias y narraciones',
    default_weeks: [7, 8],
    grammar_points: [
      'conectores-narrativos',
      'secuencia-temporal',
      'estilo-indirecto',
    ],
    vocabulary_set_ids: ['historias_es_a2', 'anecdotas_es_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-6',
    competency_checklist: [
      'Enlaza eventos en secuencia usando: primero, luego, después, más tarde, entonces, finalmente, al final',
      'Combina pretérito indefinido (acciones de primer plano completadas) e imperfecto (descripciones de fondo) en un párrafo narrativo sostenido',
      'Reporta lo que alguien dijo usando decir que + oración con el tiempo correcto: Dijo que tenía hambre (no *Dijo que tiene hambre)',
      'Escribe una anécdota personal de 80–100 palabras usando conectores narrativos y ambos tiempos pasados',
    ],
  },
  {
    id: 'a2-unit-8',
    level: 'A2',
    unit_number: 8,
    title: 'A2 consolidación',
    default_weeks: [8, 8],
    grammar_points: [
      'preterito-indefinido-regular',
      'imperfecto',
      'pronombres-objeto-directo',
      'pronombres-objeto-indirecto',
      'imperativo-afirmativo',
      'futuro-simple',
      'condicional-simple',
    ],
    vocabulary_set_ids: ['repaso_es_a2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'a2-unit-7',
    competency_checklist: [
      'Maneja situaciones sociales rutinarias (compras, pedir cita, dar indicaciones) usando los tiempos correctos',
      'Usa pronombres de objeto y formas imperativas con precisión en intercambios funcionales breves',
      'Produce un texto conectado de 80–100 palabras usando pretérito indefinido, imperfecto y futuro',
      'Lee y comprende un texto factual de 150–200 palabras sobre un tema familiar y responde preguntas de comprensión',
    ],
  },
]

const B1_UNITS: CurriculumUnit[] = [
  {
    id: 'b1-unit-1',
    level: 'B1',
    unit_number: 1,
    title: 'Presente de subjuntivo',
    default_weeks: [1, 2],
    grammar_points: ['subjuntivo-presente', 'expresiones-deseo', 'ojala'],
    vocabulary_set_ids: ['emociones_es_b1', 'deseos_es_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Forma el presente de subjuntivo para verbos regulares y los irregulares más comunes: sea, esté, tenga, haya, vaya, quiera, pueda, sepa',
      'Usa el subjuntivo tras verbos de deseo con cambio de sujeto: quiero que vengas, espero que llegue a tiempo (no *quiero que viene)',
      'Usa el subjuntivo tras expresiones emocionales: me alegra que estés aquí, tengo miedo de que llueva, es una pena que no puedas venir',
      'Usa ojala + presente de subjuntivo para deseos sobre el presente o futuro: ojala llegue pronto, ojala tengas suerte',
      'Distingue cuándo se requiere subjuntivo (cambio de sujeto, verbo emocional o volitivo) de cuándo no (mismo sujeto → infinitivo: quiero ir)',
    ],
  },
  {
    id: 'b1-unit-2',
    level: 'B1',
    unit_number: 2,
    title: 'Subjuntivo en contexto',
    default_weeks: [2, 3],
    grammar_points: [
      'subjuntivo-recomendacion',
      'subjuntivo-duda',
      'subjuntivo-valoracion',
    ],
    vocabulary_set_ids: ['trabajo_es_b1', 'estudios_es_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-1',
    competency_checklist: [
      'Usa el subjuntivo tras verbos de recomendación: te recomiendo que pruebes, te aconsejo que estudies, sugiero que vayas',
      'Usa el subjuntivo tras expresiones de duda e incertidumbre: no creo que sea verdad, dudo que lleguen a tiempo, no estoy seguro de que pueda',
      'Usa el subjuntivo tras juicios de valor impersonales: es importante que estudies, es mejor que descanses, es posible que llueva',
      'Contrasta: creo que tiene razón (certeza → indicativo) vs no creo que tenga razón (duda → subjuntivo)',
      'Escribe un párrafo dando consejos y expresando opiniones sobre una situación laboral o de estudios usando indicativo y subjuntivo correctamente',
    ],
  },
  {
    id: 'b1-unit-3',
    level: 'B1',
    unit_number: 3,
    title: 'Pretérito perfecto y pluscuamperfecto',
    default_weeks: [3, 4],
    grammar_points: [
      'preterito-perfecto',
      'pluscuamperfecto',
      'marcadores-perfecto',
    ],
    vocabulary_set_ids: ['experiencias_es_b1', 'logros_es_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-2',
    competency_checklist: [
      'Forma el pretérito perfecto con haber + participio y lo usa para eventos conectados al momento presente: hoy he comido, esta semana he estudiado, nunca he estado en Japón',
      'Usa el pretérito perfecto con sus marcadores clave: hoy, esta semana/mañana/tarde, este mes/año, ya, todavía no, alguna vez, nunca, últimamente',
      'Forma el pluscuamperfecto (había + participio) para expresar una acción completada antes de un momento pasado específico: Cuando llegué, ya habían salido',
      'Aplica el contraste español entre perfecto (hoy/conexión con el presente) e indefinido (pasado completado sin conexión presente): Esta mañana he ido vs Ayer fui',
      'Narra una experiencia vital usando pretérito perfecto y secuencia eventos usando el pluscuamperfecto',
    ],
  },
  {
    id: 'b1-unit-4',
    level: 'B1',
    unit_number: 4,
    title: 'Voz pasiva y construcciones impersonales',
    default_weeks: [4, 5],
    grammar_points: ['voz-pasiva', 'se-impersonal', 'se-pasivo'],
    vocabulary_set_ids: ['noticias_es_b1', 'sociedad_es_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-3',
    competency_checklist: [
      'Forma la voz pasiva con ser + participio en presente y pasado, ajustando el participio en género y número: La novela fue escrita por Cervantes',
      'Usa se pasivo (pasiva refleja) para describir procesos o dar información sobre normas y servicios: Se venden pisos, Se hablan cinco idiomas, Se prohíbe fumar',
      'Usa se impersonal para acciones con agente humano no especificado: Se come muy bien en esta ciudad, Se trabaja mucho en España',
      'Distingue la pasiva verdadera con ser (énfasis en la acción/agente) del se pasivo (sin agente, más natural en español cotidiano)',
      'Lee un artículo de noticias e identifica construcciones pasivas e impersonales; escribe un breve informe usándolas',
    ],
  },
  {
    id: 'b1-unit-5',
    level: 'B1',
    unit_number: 5,
    title: 'Oraciones de relativo',
    default_weeks: [5, 6],
    grammar_points: ['que-relativo', 'donde-cuando-relativo', 'cuyo'],
    vocabulary_set_ids: ['descripciones_es_b1', 'gente_es_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-4',
    competency_checklist: [
      'Forma oraciones de relativo especificativas con que para personas y cosas: el libro que leí, la persona que vino ayer',
      'Usa donde para lugares y cuando para tiempo en oraciones de relativo: el café donde nos conocimos, el día cuando llegaste',
      'Usa cuyo/cuya/cuyos/cuyas para posesión en oraciones de relativo, concordando con el sustantivo que sigue: el autor cuya novela leí, la empresa cuyos empleados protestaron',
      'Comprende la diferencia entre oración de relativo especificativa (sin comas, restringe el significado) y explicativa (con comas, añade información)',
    ],
  },
  {
    id: 'b1-unit-6',
    level: 'B1',
    unit_number: 6,
    title: 'Condicionales y suposiciones',
    default_weeks: [6, 7],
    grammar_points: [
      'condicional-compuesto',
      'si-imperfecto-subjuntivo',
      'suposiciones-futuro',
    ],
    vocabulary_set_ids: ['viajes_es_b1', 'situaciones_es_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-5',
    competency_checklist: [
      'Forma y usa la condicional tipo 1: si + presente de indicativo + futuro para condiciones reales y probables: Si tienes tiempo, llámame',
      'Forma y usa la condicional tipo 2: si + imperfecto de subjuntivo + condicional para situaciones irreales o improbables en presente: Si tuviera dinero, viajaría por el mundo',
      'Usa el futuro para expresar probabilidad sobre una situación presente: ¿Qué hora será? Serán las tres (= supongo que son las tres)',
      'Usa el condicional para expresar probabilidad sobre una situación pasada: ¿Dónde estaba? Estaría en casa (= probablemente estaba en casa)',
    ],
  },
  {
    id: 'b1-unit-7',
    level: 'B1',
    unit_number: 7,
    title: 'Discurso indirecto y conectores',
    default_weeks: [7, 8],
    grammar_points: [
      'estilo-indirecto-pasado',
      'conectores-argumentativos',
      'cambios-temporales',
      'por-para',
    ],
    vocabulary_set_ids: ['opiniones_es_b1', 'debates_es_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-6',
    competency_checklist: [
      'Reporta lo dicho aplicando el cambio temporal requerido: dijo que + imperfecto para presente original (Dijo que tenía hambre), dijo que + pluscuamperfecto para pasado original (Dijo que había salido)',
      'Reporta preguntas correctamente usando preguntó si para preguntas sí/no y preguntó + palabra interrogativa para preguntas qu- con orden no invertido',
      'Usa conectores argumentativos correctamente: sin embargo (contraste), además (adición), por lo tanto (consecuencia), aunque + indicativo (hecho), es decir (aclaración)',
      'Expresa y defiende una opinión usando: en mi opinión, creo que, desde mi punto de vista, a mi juicio, y responde a un contraargumento',
    ],
  },
  {
    id: 'b1-unit-8',
    level: 'B1',
    unit_number: 8,
    title: 'B1 consolidación',
    default_weeks: [8, 8],
    grammar_points: [
      'subjuntivo-presente',
      'preterito-perfecto',
      'pluscuamperfecto',
      'voz-pasiva',
      'se-impersonal',
      'si-imperfecto-subjuntivo',
      'estilo-indirecto-pasado',
      'por-para',
    ],
    vocabulary_set_ids: ['repaso_es_b1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b1-unit-7',
    competency_checklist: [
      'Maneja la mayoría de situaciones cotidianas (viajes, trabajo, eventos sociales) con confianza, expresando opiniones y reaccionando a las de otros',
      'Usa el presente de subjuntivo correctamente en sus contextos B1 principales: deseo, emoción, duda, recomendación y juicios de valor impersonales',
      'Produce un texto conectado (100–150 palabras) integrando toda la gramática B1: tiempos pasados, subjuntivo, estilo indirecto y conectores',
      'Lee y extrae las ideas principales y detalles clave de un texto de 200–250 palabras sobre un tema familiar no especializado',
    ],
  },
]

const B2_UNITS: CurriculumUnit[] = [
  {
    id: 'b2-unit-1',
    level: 'B2',
    unit_number: 1,
    title: 'Subjuntivo avanzado',
    default_weeks: [1, 2],
    grammar_points: [
      'subjuntivo-imperfecto',
      'subjuntivo-pluscuamperfecto',
      'concordancia-temporal',
    ],
    vocabulary_set_ids: ['sentimientos_es_b2', 'hipótesis_es_b2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Forma el imperfecto de subjuntivo en sus dos variantes -ra y -se para verbos regulares e irregulares (hablara/hablase, tuviera/tuviese, fuera/fuese) y usa ambas formas indistintamente',
      'Aplica el imperfecto de subjuntivo en oraciones condicionales tipo 2 (Si tuviera tiempo, lo haría) y tras verbos en pasado en la oración principal (Me pidió que viniera, Quería que lo supiera)',
      'Forma el pluscuamperfecto de subjuntivo (hubiera/hubiese + participio) y lo usa en condicionales tipo 3: Si hubiera estudiado más, habría aprobado',
      'Aplica la concordancia de tiempos correctamente: presente/futuro en oración principal → presente de subjuntivo; pasado/condicional en oración principal → imperfecto de subjuntivo',
      'Expresa reproche y pesar usando ojala + imperfecto/pluscuamperfecto de subjuntivo: ojala estuviera aquí, ojala hubiera dicho la verdad',
    ],
  },
  {
    id: 'b2-unit-2',
    level: 'B2',
    unit_number: 2,
    title: 'Perífrasis verbales',
    default_weeks: [2, 3],
    grammar_points: [
      'perifrasis-aspectuales',
      'perifrasis-modales',
      'dejar-de-seguir',
    ],
    vocabulary_set_ids: ['hábitos_es_b2', 'cambios_es_b2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b2-unit-1',
    competency_checklist: [
      'Usa estar + gerundio para una acción en progreso en un momento específico y llevar + expresión temporal + gerundio para duración: Llevo tres horas estudiando',
      'Usa ir + gerundio para cambio progresivo gradual (El proyecto va mejorando) y acabar de + infinitivo para una acción muy reciente (Acabo de llegar)',
      'Usa dejar de + infinitivo (cesar de hacer) vs seguir/continuar + gerundio (continuar haciendo) para describir cambios o continuidad en hábitos',
      'Distingue grados de obligación: tener que (obligación personal), deber (obligación moral), haber de (formal/escrito), hay que (obligación general impersonal)',
      'Selecciona la perífrasis más adecuada para transmitir aspecto (inceptivo, progresivo, terminativo) o modalidad (obligación, probabilidad) en un contexto dado',
    ],
  },
  {
    id: 'b2-unit-3',
    level: 'B2',
    unit_number: 3,
    title: 'Conectores y coherencia textual',
    default_weeks: [3, 4],
    grammar_points: [
      'conectores-avanzados',
      'cohesion-textual',
      'registro-formal',
    ],
    vocabulary_set_ids: ['ensayos_es_b2', 'académico_es_b2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b2-unit-2',
    competency_checklist: [
      'Usa aunque + indicativo para hechos reconocidos (Aunque llueve, salgo) vs aunque + subjuntivo para hipótesis (Aunque llueva, saldré)',
      'Usa conectores causales y consecutivos apropiadamente: ya que/puesto que/dado que (causa, formal) vs porque (causa directa); por lo tanto/de ahí que (consecuencia, este último requiere subjuntivo)',
      'Mantiene la cohesión textual mediante referencia pronominal, elipsis y sustitución léxica para evitar repeticiones innecesarias en un texto de varios párrafos',
      'Adapta el registro entre la escritura académica formal (estructuras nominalizadas, construcciones impersonales) y la prosa expositiva semiformal',
      'Produce un ensayo estructurado de 200+ palabras con introducción, párrafos de desarrollo y conclusión usando una variedad de conectores discursivos',
    ],
  },
  {
    id: 'b2-unit-4',
    level: 'B2',
    unit_number: 4,
    title: 'Expresiones idiomáticas',
    default_weeks: [4, 5],
    grammar_points: ['modismos-comunes', 'expresiones-coloquiales', 'refranes'],
    vocabulary_set_ids: ['modismos_es_b2', 'cultura_es_b2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b2-unit-3',
    competency_checklist: [
      'Comprende y usa 20+ expresiones idiomáticas de alta frecuencia en contexto: no hay mal que por bien no venga, a las duras y a las maduras, no dar pie con bola, ponerse las pilas, no tener pelos en la lengua',
      'Interpreta expresiones figuradas en textos españoles auténticos sin recurrir a la traducción literal: estar en las nubes, meter la pata, costar un ojo de la cara',
      'Reconoce que muchos modismos españoles no pueden traducirse literalmente y explica el significado implícito y el trasfondo cultural de refranes comunes',
      'Identifica cuándo el lenguaje idiomático es inapropiado en contextos escritos formales y elige un equivalente neutro',
      'Distingue entre expresiones idiomáticas peninsulares y las usadas en el español latinoamericano donde las diferencias son significativas',
    ],
  },
  {
    id: 'b2-unit-5',
    level: 'B2',
    unit_number: 5,
    title: 'Argumentación y debate',
    default_weeks: [5, 6],
    grammar_points: [
      'estructura-argumentativa',
      'contraargumentacion',
      'matizadores',
    ],
    vocabulary_set_ids: ['debates_es_b2', 'temas-sociales_es_b2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b2-unit-4',
    competency_checklist: [
      'Presenta una tesis clara y la desarrolla con puntos de apoyo, ejemplos y evidencia usando expresiones de conexión: en primer lugar, cabe destacar que, a modo de ejemplo',
      'Introduce un contraargumento y lo refuta: es cierto que..., pero / si bien es verdad que..., no obstante / aunque reconozco que..., considero que',
      'Usa expresiones de atenuación y matización para calibrar la fuerza de la afirmación: es posible que + subjuntivo, puede que, cabría preguntarse si, según algunos expertos',
      'Participa en un debate estructurado usando frases de toma de turno: si me permite, retomando lo que ha dicho, me gustaría añadir que, discrepo en que',
      'Escribe un texto argumentativo de 200 palabras con una posición clara, una concesión a la opinión contraria y una conclusión',
    ],
  },
  {
    id: 'b2-unit-6',
    level: 'B2',
    unit_number: 6,
    title: 'Literatura y textos narrativos',
    default_weeks: [6, 7],
    grammar_points: [
      'tiempos-narrativos',
      'descripcion-literaria',
      'metaforas',
    ],
    vocabulary_set_ids: ['literatura_es_b2', 'lectura_es_b2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b2-unit-5',
    competency_checklist: [
      'Usa pretérito indefinido, imperfecto y pluscuamperfecto juntos en una narración literaria para distinguir acciones en primer plano, descripciones de fondo y eventos anteriores al tiempo del relato',
      'Identifica y nombra los recursos literarios más comunes en español: metáfora, símil, hipérbole, metonimia, ironia, y los reconoce en pasajes breves',
      'Lee un breve fragmento literario (representativo de la literatura española contemporánea) e identifica el punto de vista del narrador, el registro y el tono',
      'Escribe un párrafo literario descriptivo (80–100 palabras) usando tiempos narrativos, al menos un recurso literario y estructuras oracionales variadas',
      'Comenta el estilo y contenido de un texto breve usando el metalenguaje español apropiado: el narrador, el protagonista, el desenlace, el punto de vista',
    ],
  },
  {
    id: 'b2-unit-7',
    level: 'B2',
    unit_number: 7,
    title: 'Medios y actualidad',
    default_weeks: [7, 8],
    grammar_points: [
      'lenguaje-periodistico',
      'titulares',
      'discurso-reportado',
    ],
    vocabulary_set_ids: ['noticias_es_b2', 'actualidad_es_b2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b2-unit-6',
    competency_checklist: [
      'Identifica rasgos del lenguaje periodístico español: estructuras nominalizadas, voz pasiva, construcciones impersonales y conectores formales usados en la prensa',
      'Interpreta la gramática de los titulares: formas verbales truncadas, infinitivos para futuro inmediato, elipsis de artículos y presente para eventos pasados recientes',
      'Resume un artículo de noticias de 250 palabras con precisión usando estilo indirecto con cambios temporales correctos y verbos de atribución neutros: afirmar, señalar, indicar, subrayar',
      'Expresa acuerdo, acuerdo parcial y desacuerdo con un artículo de opinión usando matices de nivel B2: comparto la opinión de que..., no me convence del todo el argumento de que...',
      'Escribe un comentario estructurado de 150 palabras sobre un tema de actualidad incorporando rasgos del lenguaje periodístico',
    ],
  },
  {
    id: 'b2-unit-8',
    level: 'B2',
    unit_number: 8,
    title: 'B2 consolidación',
    default_weeks: [8, 8],
    grammar_points: [
      'subjuntivo-imperfecto',
      'subjuntivo-pluscuamperfecto',
      'perifrasis-aspectuales',
      'conectores-avanzados',
      'estructura-argumentativa',
      'tiempos-narrativos',
      'discurso-reportado',
    ],
    vocabulary_set_ids: ['repaso_es_b2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'b2-unit-7',
    competency_checklist: [
      'Escribe un ensayo formal de 200 palabras integrando imperfecto de subjuntivo, conectores avanzados y una estructura argumentativa clara',
      'Produce un texto narrativo (150 palabras) con uso correcto de pretérito indefinido, imperfecto y pluscuamperfecto, y al menos un recurso literario',
      'Reporta una conversación o artículo usando estilo indirecto con concordancia temporal correcta y verbos de atribución variados',
      'Lee un texto de 300 palabras sobre un tema social o cultural complejo y responde correctamente preguntas de comprensión inferencial',
      'Conversa espontáneamente sobre temas abstractos o controvertidos con dominio evidente del vocabulario, las estructuras y las estrategias discursivas de nivel B2',
    ],
  },
]

const C1_UNITS: CurriculumUnit[] = [
  {
    id: 'c1-unit-1',
    level: 'C1',
    unit_number: 1,
    title: 'Matices del subjuntivo',
    default_weeks: [1, 2],
    grammar_points: [
      'subjuntivo-concesivo',
      'subjuntivo-final',
      'subjuntivo-relativo',
    ],
    vocabulary_set_ids: ['matices_es_c1', 'formalidad_es_c1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Usa aunque + subjuntivo vs aunque + indicativo con plena conciencia de la diferencia semántica: aunque llueva (si llueve, aunque sea el caso) vs aunque llueve (aunque es un hecho que llueve)',
      'Usa conjunciones finales correctamente: para que + subjuntivo con cambio de sujeto (Te lo explico para que lo entiendas) vs para + infinitivo con mismo sujeto (Estudio para aprender)',
      'Aplica el subjuntivo en oraciones de relativo restrictivas con antecedentes indefinidos o negados: No conozco a nadie que hable chino, Busco un apartamento que tenga terraza',
      'Usa conjunciones temporales con referencia futura + subjuntivo: cuando llegues, en cuanto lo sepa, después de que terminen, antes de que empiece',
      'Controla la secuencia completa de tiempos en oraciones complejas con subjuntivo (Si me pide que lo haga, lo haré / Si me hubiera pedido que lo hiciera, lo habría hecho)',
    ],
  },
  {
    id: 'c1-unit-2',
    level: 'C1',
    unit_number: 2,
    title: 'Registro formal y académico',
    default_weeks: [2, 3],
    grammar_points: ['pasiva-refleja', 'nominalizacion', 'impersonalidad'],
    vocabulary_set_ids: ['académico_es_c1', 'investigación_es_c1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c1-unit-1',
    competency_checklist: [
      'Usa la pasiva refleja (se + tercera persona) con fluidez en la escritura formal y técnica como alternativa natural a la voz pasiva con ser',
      'Convierte frases verbales y adjetivales en frases nominales mediante nominalización (aumentar → el aumento, desarrollar → el desarrollo, eficaz → la eficacia) para lograr el estilo denso e impersonal del español académico',
      'Construye oraciones académicas impersonales usando: se considera que, se ha demostrado que, cabe señalar que, es preciso destacar que, conviene subrayar que',
      'Mantiene un registro formal consistente a lo largo de un texto académico de 400+ palabras, evitando vocabulario coloquial y contracciones informales',
      'Identifica y corrige violaciones de registro en textos académicos de estudiantes (vocabulario coloquial, uso excesivo de primera persona, conectores informales)',
    ],
  },
  {
    id: 'c1-unit-3',
    level: 'C1',
    unit_number: 3,
    title: 'Léxico especializado',
    default_weeks: [3, 4],
    grammar_points: ['campos-semanticos', 'derivacion', 'precision-lexica'],
    vocabulary_set_ids: ['profesional_es_c1', 'técnico_es_c1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c1-unit-2',
    competency_checklist: [
      'Deriva nuevas palabras sistemáticamente usando sufijos productivos del español (-ción/-sión, -dad/-tad, -eza, -ura, -oso, -able, -mente) y prefijos (des-, re-, ante-, post-, sub-)',
      'Identifica relaciones de campo semántico y colocaciones comunes en registros especializados: cometer un error (no *hacer), tomar una decisión (no *hacer), plantear un problema (no *decir)',
      'Elige el sinónimo preciso sobre el equivalente aproximado en la escritura profesional (indicar vs decir, emplear vs usar, obtener vs conseguir en contextos formales)',
      'Explica el significado de términos especializados en español llano sin recurrir a la lengua meta (paráfrasis como estrategia de comunicación)',
      'Demuestra conciencia de falsos cognados dentro del español (actualmente = en el momento presente, no realmente; realizar = llevar a cabo, no darse cuenta)',
    ],
  },
  {
    id: 'c1-unit-4',
    level: 'C1',
    unit_number: 4,
    title: 'Ironía, humor y doble sentido',
    default_weeks: [4, 5],
    grammar_points: ['ironia', 'sarcasmo', 'doble-sentido'],
    vocabulary_set_ids: ['humor_es_c1', 'cultura_es_c1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c1-unit-3',
    competency_checklist: [
      'Reconoce la ironia verbal y el sarcasmo en español prestando atención a la entonación, el contexto y la incongruencia léxica: ¡Qué lista eres! (dicho a alguien que ha hecho algo poco inteligente)',
      'Comprende juegos de palabras, calambures y dobles sentidos habituales en la publicidad, los titulares y el habla cotidiana española',
      'Interpreta el humor basado en referencias culturales españolas (Las rebajas, la siesta, la sobremesa, Semana Santa) sin necesidad de explicación',
      'Produce un breve texto satírico o irónico sobre un tema social usando el tono, registro y recursos apropiados sin causar ofensa involuntaria',
      'Distingue la ironia de la mentira y el sarcasmo del insulto en términos de conocimiento pragmático compartido entre los interlocutores',
    ],
  },
  {
    id: 'c1-unit-5',
    level: 'C1',
    unit_number: 5,
    title: 'Discurso persuasivo y retórica',
    default_weeks: [5, 6],
    grammar_points: ['recursos-retoricos', 'persuasion', 'figuras-literarias'],
    vocabulary_set_ids: ['oratoria_es_c1', 'presentaciones_es_c1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c1-unit-4',
    competency_checklist: [
      'Usa la repetición retórica (anáfora, epífora), el tricolon y las preguntas retóricas (¿Acaso no tenemos derecho a...?) para aumentar la fuerza persuasiva de un discurso o ensayo',
      'Usa patrones concesivos para argumentación sofisticada: por más que + subjuntivo (Por más que lo intentes, no lo conseguirás), a pesar de que + subjuntivo/indicativo, aun cuando + subjuntivo',
      'Abre y cierra discursos formales con las convenciones apropiadas: Señoras y señores..., querido público...; En definitiva..., En conclusión..., Para terminar...',
      'Integra datos, citas y opiniones de expertos en un argumento escrito con atribución correcta y frases de indicación de fuente: según un estudio de..., como afirma..., tal como señala...',
      'Pronuncia un argumento oral de 3 minutos sobre un tema social o ético complejo con estructura coherente, recursos retóricos y mínima vacilación',
    ],
  },
  {
    id: 'c1-unit-6',
    level: 'C1',
    unit_number: 6,
    title: 'Variedades del español',
    default_weeks: [6, 7],
    grammar_points: [
      'espanol-latinoamerica',
      'diferencias-regionales',
      'voseo',
    ],
    vocabulary_set_ids: ['variedades_es_c1', 'dialectos_es_c1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c1-unit-5',
    competency_checklist: [
      'Identifica las diferencias fonológicas clave entre el español peninsular (distinción s/z, leísmo) y las principales variedades latinoamericanas (seseo, yeísmo), y reconoce que el ceceo y el seseo también están presentes en dialectos del sur de España (Andalucía, Canarias)',
      'Comprende y responde al voseo (vos + formas verbales específicas: vos tenés, vos querés, vos sos) tal como se usa en Argentina, Uruguay y Centroamérica',
      'Reconoce diferencias léxicas significativas entre el español peninsular y latinoamericano en ámbitos cotidianos: coche/carro, ordenador/computadora, móvil/celular, conducir/manejar',
      'Usa la distinción vosotros/ustedes (peninsular) vs ustedes para todos los contextos (Latinoamérica) correctamente según la variedad que se esté aprendiendo',
      'Discute el estatus sociolingüístico de las variedades del español sin aplicar una jerarquía de valor, entendiendo que todas son igualmente válidas y regidas por reglas',
    ],
  },
  {
    id: 'c1-unit-7',
    level: 'C1',
    unit_number: 7,
    title: 'Análisis crítico y síntesis',
    default_weeks: [7, 8],
    grammar_points: [
      'sintesis-textual',
      'critica-constructiva',
      'reformulacion',
    ],
    vocabulary_set_ids: ['análisis_es_c1', 'síntesis_es_c1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c1-unit-6',
    competency_checklist: [
      'Sintetiza información de dos o tres fuentes en un resumen coherente y atribuido sin distorsionar el significado original: Según X..., Por su parte, Y afirma que...',
      'Evalúa la fiabilidad, consistencia interna y posibles sesgos de un argumento encontrado en un texto en español',
      'Reformula una idea compleja con otras palabras (paráfrasis) sin perder precisión, usando expresiones de reformulación españolas: es decir, o sea, en otras palabras, dicho de otra manera',
      'Escribe un análisis crítico estructurado (300–400 palabras) con tesis claramente señalada, evidencia, contraevidencia y una conclusión que sintetiza el argumento',
      'Distingue entre resumir (informar lo que dice el autor) y evaluar (valorar la calidad del argumento)',
    ],
  },
  {
    id: 'c1-unit-8',
    level: 'C1',
    unit_number: 8,
    title: 'C1 consolidación',
    default_weeks: [8, 8],
    grammar_points: [
      'subjuntivo-concesivo',
      'subjuntivo-final',
      'subjuntivo-relativo',
      'pasiva-refleja',
      'nominalizacion',
      'recursos-retoricos',
      'espanol-latinoamerica',
      'sintesis-textual',
    ],
    vocabulary_set_ids: ['repaso_es_c1'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c1-unit-7',
    competency_checklist: [
      'Produce un texto formal de 400 palabras integrando todas las estructuras gramaticales de C1 con control evidente y fluidez natural',
      'Expresa ideas complejas y matizadas espontáneamente sin buscar visiblemente palabras o estructuras',
      'Demuestra control completo del subjuntivo en todos sus contextos C1: concesivo, final, relativo restrictivo y temporal',
      'Lee y evalúa críticamente un texto de 400 palabras sobre un tema abstracto o especializado, identificando la estructura argumental y las suposiciones implícitas',
      'Rinde a un nivel consistente con el DELE C1 en una tarea de examen simulada que cubre las cuatro destrezas',
    ],
  },
]

const C2_UNITS: CurriculumUnit[] = [
  {
    id: 'c2-unit-1',
    level: 'C2',
    unit_number: 1,
    title: 'Dominio de la gramática avanzada',
    default_weeks: [1, 2],
    grammar_points: [
      'repaso-subjuntivo',
      'repaso-condicional',
      'concordancia-de-tiempos',
    ],
    vocabulary_set_ids: ['excelencia_es_c2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    competency_checklist: [
      'Controla todos los tiempos de subjuntivo y su secuencia sin error sistemático: presente, imperfecto, perfecto y pluscuamperfecto de subjuntivo en todas las categorías de activación',
      'Forma e interpreta estructuras condicionales mixtas que combinan diferentes marcos temporales: Si hubiera estudiado más, tendría ahora un mejor trabajo (hipótesis pasada → consecuencia presente)',
      'Aplica la concordancia de tiempos completa correctamente en oraciones complejas extensas con subjuntivo, manteniendo la coherencia lógica y temporal',
      'Identifica y corrige errores gramaticales sutiles característicos de hablantes no nativos avanzados: secuencia temporal incorrecta, uso excesivo del indicativo, pronombres de objeto mal colocados',
      'Demuestra un rango y precisión gramatical comparables a los de un hablante nativo culto en registros escritos y orales formales',
    ],
  },
  {
    id: 'c2-unit-2',
    level: 'C2',
    unit_number: 2,
    title: 'Estilística y registro literario',
    default_weeks: [2, 3],
    grammar_points: [
      'estilo-literario',
      'voz-narrativa',
      'recursos-estilisticos',
    ],
    vocabulary_set_ids: ['literatura_es_c2', 'estilo_es_c2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c2-unit-1',
    competency_checklist: [
      'Controla el punto de vista narrativo (primera, tercera omnisciente, tercera limitada) en la escritura creativa original, tomando decisiones conscientes y consistentes',
      'Usa el asíndeton, polisíndeton y otros recursos sintácticos para lograr efectos estilísticos deliberados: acumulación rítmica, pausa abrupta, contraste enfático',
      'Despliega anáfora, epífora, quiasmo y otras figuras retóricas como herramientas estilísticas en ensayos, discursos y prosa literaria',
      'Lee un pasaje literario de la literatura española contemporánea o clásica (Cervantes, Galdós, Borges, García Márquez) y analiza estilo, tono, técnica narrativa y lenguaje',
      'Escribe un texto literario o ensayo de 300 palabras demostrando control consciente del registro estilístico, la voz narrativa y los recursos literarios',
    ],
  },
  {
    id: 'c2-unit-3',
    level: 'C2',
    unit_number: 3,
    title: 'Traducción y mediación lingüística',
    default_weeks: [3, 4],
    grammar_points: ['equivalencia', 'matices-traduccion', 'falsos-amigos'],
    vocabulary_set_ids: ['traducción_es_c2', 'mediación_es_c2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c2-unit-2',
    competency_checklist: [
      'Identifica y evita los falsos cognados español-inglés que confunden a los aprendices avanzados: actualmente (currently, no actually), embarazada (pregnant, no embarrassed), realizar (to carry out, no to realise), sensible (sensitive, no sensible)',
      'Media entre dos interlocutores con diferentes antecedentes lingüísticos reformulando, resumiendo y aclarando sin distorsionar el significado',
      'Produce una paráfrasis fluida de un texto complejo en español en un español más sencillo, manteniendo el registro y la intención del original',
      'Explica las dimensiones culturales y pragmáticas de expresiones españolas que se resisten a la traducción directa: el madrugón, la sobremesa, la vergüenza ajena, la confianza',
      'Traduce un párrafo complejo del español a la L1 del aprendiz y viceversa, resolviendo expresiones idiomáticas mediante equivalentes funcionales en lugar de traducciones literales',
    ],
  },
  {
    id: 'c2-unit-4',
    level: 'C2',
    unit_number: 4,
    title: 'Cultura e historia del español',
    default_weeks: [4, 5],
    grammar_points: ['lexicon-historico', 'arabismos', 'indigenismos'],
    vocabulary_set_ids: ['historia_es_c2', 'cultura_es_c2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c2-unit-3',
    competency_checklist: [
      'Reconoce los arabismos integrados en el vocabulario español cotidiano — ojala, almohada, alcohol, azúcar, aceite, cifra, alcalde — y explica su origen y contexto histórico',
      'Identifica los indigenismos del náhuatl, quechua y taíno que entraron al español mediante la colonización: chocolate, tomate, patata, canoa, cacao, aguacate, maíz',
      'Traza las grandes etapas del desarrollo histórico del español desde el latín vulgar hasta el estándar moderno, identificando formas arcaicas aún presentes en la lengua',
      'Lee un texto del siglo XVI (un fragmento del Quijote o del Lazarillo de Tormes) e identifica arcaísmos, reconociendo la continuidad con el español moderno',
      'Discute el papel de las instituciones lingüísticas (Real Academia Española, Instituto Cervantes) y los debates en torno a la prescripción lingüística y el estatus global del español',
    ],
  },
  {
    id: 'c2-unit-5',
    level: 'C2',
    unit_number: 5,
    title: 'Creación de contenido avanzado',
    default_weeks: [5, 6],
    grammar_points: ['generos-textuales', 'creatividad-linguistica', 'edicion'],
    vocabulary_set_ids: ['creación_es_c2', 'publicación_es_c2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c2-unit-4',
    competency_checklist: [
      'Produce un texto de 500 palabras en diferentes géneros textuales — columna de opinión, ensayo personal, relato breve, informe formal — adaptando vocabulario, tono y estructura a las convenciones de cada género',
      'Edita un borrador al nivel de un corrector de estilo experto: reestructura para mayor claridad, elimina redundancias, eleva el registro y corrige defectos gramaticales y estilísticos sutiles',
      'Emplea conciencia metalingüística para explicar y justificar decisiones estilísticas en su propia escritura, demostrando autorreflexión crítica sobre el oficio de escribir en español',
      'Crea textos concisos e impactantes para el discurso público (apertura de un discurso político, un eslogan de marketing, un texto de campaña en redes sociales) usando economía lingüística y precisión retórica',
      'Demuestra creatividad lingüística mediante juegos de palabras, neologismos, mezcla deliberada de registros y metáforas originales, manteniendo la claridad comunicativa',
    ],
  },
  {
    id: 'c2-unit-6',
    level: 'C2',
    unit_number: 6,
    title: 'C2 consolidación y maestría',
    default_weeks: [6, 6],
    grammar_points: [
      'expresion-matizada',
      'integracion-gramatical',
      'fluidez-nativa',
    ],
    vocabulary_set_ids: ['maestría_es_c2'],
    lesson_types: ['grammar', 'vocabulary', 'reading', 'writing', 'review'],
    prerequisite_unit: 'c2-unit-5',
    competency_checklist: [
      'Expresa matices sutiles de significado — duda, ironia, provisionalidad, énfasis — mediante la selección precisa de estructura gramatical y vocabulario en lugar de atenuadores explícitos',
      'Reconstruye un argumento complejo desde una perspectiva ideológica o cultural diferente, demostrando control flexible del punto de vista y el registro',
      'Demuestra precisión gramatical casi nativa en la escritura y el habla extensas espontáneas, con solo errores no sistemáticos ocasionales que no impiden la comunicación',
      'Diferencia matices finos de significado entre palabras casi sinónimas y variantes de registro: propósito/objetivo/finalidad/meta, aunque/a pesar de que/no obstante, señalar/indicar/apuntar/subrayar',
      'Alcanza una puntuación consistente con el DELE C2 / Certificado de Maestría en tareas de comprensión lectora, expresión escrita, comprensión auditiva e interacción oral',
    ],
  },
]

export const curriculum: Record<CEFRLevel, LevelCurriculum> = {
  A1: {
    level: 'A1',
    title: 'Beginner Spanish',
    description:
      'Greetings, introductions, basic grammar and everyday vocabulary.',
    default_duration_weeks: 8,
    units: A1_UNITS,
  },
  A2: {
    level: 'A2',
    title: 'Elementary Spanish',
    description:
      'Past tenses, object pronouns, comparisons and basic conversation.',
    default_duration_weeks: 8,
    units: A2_UNITS,
  },
  B1: {
    level: 'B1',
    title: 'Intermediate Spanish',
    description:
      'Subjunctive mood, compound tenses, relative clauses and opinion expression.',
    default_duration_weeks: 8,
    units: B1_UNITS,
  },
  B2: {
    level: 'B2',
    title: 'Upper Intermediate Spanish',
    description:
      'Advanced subjunctive, idiomatic expressions, argumentation and media.',
    default_duration_weeks: 8,
    units: B2_UNITS,
  },
  C1: {
    level: 'C1',
    title: 'Advanced Spanish',
    description:
      'Specialised vocabulary, formal register, regional varieties and rhetoric.',
    default_duration_weeks: 8,
    units: C1_UNITS,
  },
  C2: {
    level: 'C2',
    title: 'Proficient Spanish',
    description: 'Mastery, literary style, translation and cultural depth.',
    default_duration_weeks: 6,
    units: C2_UNITS,
  },
}

export function getCurriculumUnits(level: CEFRLevel): CurriculumUnit[] {
  return curriculum[level].units
}

export function distributeLessonsAcrossWeeks(
  level: CEFRLevel,
  durationWeeks: number,
  daysPerWeek: number
): Array<{
  week: number
  day: number
  unit_id: string
  lesson_type: LessonType
  title: string
}> {
  const units = getCurriculumUnits(level)
  const slots: Array<{
    week: number
    day: number
    unit_id: string
    lesson_type: LessonType
    title: string
  }> = []

  const totalDays = durationWeeks * daysPerWeek
  // Last day is reserved for the level completion test
  const lessonDays = totalDays - 1

  // Expand all unit lessons in order
  const allLessons = units.flatMap((unit) =>
    unit.lesson_types.map((lt) => ({
      unit_id: unit.id,
      lesson_type: lt,
      unit_title: unit.title,
    }))
  )

  // Distribute evenly; repeat review lessons if there is spare capacity
  const base = allLessons.slice(0, lessonDays)

  let dayCounter = 0
  for (const lesson of base) {
    const weekNum = Math.floor(dayCounter / daysPerWeek) + 1
    const dayNum = (dayCounter % daysPerWeek) + 1
    slots.push({
      week: weekNum,
      day: dayNum,
      unit_id: lesson.unit_id,
      lesson_type: lesson.lesson_type,
      title: `${lesson.unit_title} — ${lesson.lesson_type.charAt(0).toUpperCase() + lesson.lesson_type.slice(1)}`,
    })
    dayCounter++
  }

  // Final slot: level completion test
  const testWeek = durationWeeks
  const testDay = daysPerWeek + 1
  slots.push({
    week: testWeek,
    day: testDay,
    unit_id: `${level.toLowerCase()}-test`,
    lesson_type: 'review',
    title: `${level} Level Completion Test`,
  })

  return slots
}
