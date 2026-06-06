import type { CEFRLevel } from '@/data/grammar'

export type Register = 'formal' | 'neutral' | 'informal'

export interface Phrase {
  english: string
  context: string
  register: Register
  unit_ref?: string
}

export interface PhrasebookCategory {
  id: string
  level: CEFRLevel
  situation: string
  icon: string
  phrases: Phrase[]
}

// ─── A1 ────────────────────────────────────────────────────────────────────────

const greetings: PhrasebookCategory = {
  id: 'greetings',
  level: 'A1',
  situation: 'Saludos y presentaciones',
  icon: '👋',
  phrases: [
    { english: '¡Hola!', context: 'Saludo informal', register: 'informal' },
    {
      english: 'Buenos días.',
      context: 'Saludo por la mañana',
      register: 'formal',
    },
    {
      english: 'Buenas tardes.',
      context: 'Saludo desde el mediodía hasta el anochecer',
      register: 'formal',
    },
    {
      english: 'Buenas noches.',
      context: 'Saludo por la noche',
      register: 'formal',
    },
    {
      english: '¿Qué tal?',
      context: 'Preguntar cómo está alguien',
      register: 'neutral',
    },
    {
      english: '¿Cómo estás?',
      context: 'Preguntar por el estado de alguien (informal)',
      register: 'informal',
    },
    {
      english: '¿Cómo está?',
      context: 'Preguntar por el estado de alguien (formal)',
      register: 'formal',
    },
    {
      english: 'Bien, gracias. ¿Y tú?',
      context: 'Responder y devolver la pregunta (informal)',
      register: 'neutral',
    },
    {
      english: 'Muy bien, ¿y usted?',
      context: 'Responder y devolver la pregunta (formal)',
      register: 'formal',
    },
    {
      english: 'Mucho gusto.',
      context: 'Al conocer a alguien',
      register: 'neutral',
    },
    {
      english: 'Encantado/a.',
      context: 'Al conocer a alguien (más formal)',
      register: 'formal',
    },
    {
      english: 'Me llamo [nombre].',
      context: 'Presentarse',
      register: 'neutral',
    },
    {
      english: 'Soy de [país/ciudad].',
      context: 'Decir de dónde eres',
      register: 'neutral',
    },
    {
      english: '¡Hasta luego!',
      context: 'Despedida informal',
      register: 'neutral',
    },
    { english: 'Adiós.', context: 'Despedida formal', register: 'formal' },
    {
      english: '¡Chao! / ¡Nos vemos!',
      context: 'Despedida muy informal',
      register: 'informal',
    },
    {
      english: 'Cuídate.',
      context: 'Despedida afectuosa',
      register: 'neutral',
    },
    {
      english: 'Que tengas buen día.',
      context: 'Despedida cordial',
      register: 'neutral',
    },
    {
      english: 'Perdona, ¿cómo te llamas?',
      context: 'Preguntar el nombre a alguien',
      register: 'neutral',
    },
  ],
}

const basic_requests: PhrasebookCategory = {
  id: 'basic_requests',
  level: 'A1',
  situation: 'Peticiones básicas y cortesía',
  icon: '🙏',
  phrases: [
    {
      english: '¿Me puedes ayudar, por favor?',
      context: 'Pedir ayuda',
      register: 'neutral',
    },
    {
      english: '¿Puedes repetir, por favor?',
      context: 'Cuando no has entendido',
      register: 'neutral',
    },
    {
      english: 'No entiendo.',
      context: 'Decir que no entiendes',
      register: 'neutral',
    },
    {
      english: '¿Puedes hablar más despacio?',
      context: 'Cuando alguien habla muy rápido',
      register: 'neutral',
    },
    {
      english: '¿Cómo se dice [palabra] en español?',
      context: 'Preguntar por una traducción',
      register: 'neutral',
    },
    {
      english: '¿Qué significa [palabra]?',
      context: 'Preguntar por una definición',
      register: 'neutral',
    },
    {
      english: 'Perdona, no lo sé.',
      context: 'Decir que no sabes algo',
      register: 'neutral',
    },
    {
      english: 'Disculpa / Disculpe.',
      context: 'Llamar la atención de alguien',
      register: 'neutral',
    },
    { english: 'Lo siento.', context: 'Disculparse', register: 'neutral' },
    {
      english: 'No pasa nada.',
      context: 'Aceptar una disculpa',
      register: 'neutral',
    },
    {
      english: 'Muchas gracias.',
      context: 'Expresar gratitud',
      register: 'neutral',
    },
    {
      english: 'De nada.',
      context: 'Responder a las gracias',
      register: 'neutral',
    },
    {
      english: 'No hay de qué.',
      context: 'Responder a las gracias (más cordial)',
      register: 'neutral',
    },
    {
      english: 'Por favor.',
      context: 'Añadir cortesía a una petición',
      register: 'neutral',
    },
    {
      english: 'Gracias de antemano.',
      context: 'Agradecer por adelantado',
      register: 'neutral',
    },
  ],
}

const numbers_time_a1: PhrasebookCategory = {
  id: 'numbers_time_a1',
  level: 'A1',
  situation: 'Números y la hora',
  icon: '🕒',
  phrases: [
    {
      english: '¿Qué hora es?',
      context: 'Preguntar la hora',
      register: 'neutral',
    },
    {
      english: 'Es la una.',
      context: 'Decir la hora en punto (1)',
      register: 'neutral',
    },
    {
      english: 'Son las [hora].',
      context: 'Decir la hora en punto',
      register: 'neutral',
    },
    {
      english: 'Son las [hora] y media.',
      context: 'Decir la hora y media',
      register: 'neutral',
    },
    {
      english: 'Son las [hora] y cuarto.',
      context: 'Decir la hora y cuarto',
      register: 'neutral',
    },
    {
      english: 'Son las [hora] menos cuarto.',
      context: 'Decir la hora menos cuarto',
      register: 'neutral',
    },
    {
      english: 'La reunión es a las [hora].',
      context: 'Indicar una hora programada',
      register: 'neutral',
    },
    {
      english: '¿Cuánto cuesta?',
      context: 'Preguntar el precio',
      register: 'neutral',
    },
    {
      english: 'Cuesta [cantidad] euros.',
      context: 'Decir un precio',
      register: 'neutral',
    },
    {
      english: '¿Me trae la cuenta, por favor?',
      context: 'Pedir la cuenta en un bar o restaurante',
      register: 'neutral',
    },
    {
      english: 'Son [cantidad] euros con [céntimos].',
      context: 'Dar un precio exacto',
      register: 'neutral',
    },
    {
      english: '¿Aceptan tarjeta?',
      context: 'Preguntar si se puede pagar con tarjeta',
      register: 'neutral',
    },
  ],
}

const shopping_basic_a1: PhrasebookCategory = {
  id: 'shopping_basic_a1',
  level: 'A1',
  situation: 'De compras (básico)',
  icon: '🛍️',
  phrases: [
    {
      english: 'Quería [producto], por favor.',
      context: 'Pedir algo en una tienda',
      register: 'neutral',
    },
    {
      english: '¿Cuánto cuesta esto?',
      context: 'Preguntar el precio',
      register: 'neutral',
    },
    {
      english: '¿Tienen esto en [color/talla]?',
      context: 'Preguntar por disponibilidad',
      register: 'neutral',
    },
    {
      english: 'Me lo llevo.',
      context: 'Decidir comprar algo',
      register: 'neutral',
    },
    {
      english: 'Solo estoy mirando, gracias.',
      context: 'Decir al dependiente que solo miras',
      register: 'neutral',
    },
    {
      english: '¿Me lo puedo probar?',
      context: 'Preguntar para probarse ropa',
      register: 'neutral',
    },
    {
      english: 'Me queda grande / pequeño.',
      context: 'Explicar un problema de talla',
      register: 'neutral',
    },
    {
      english: 'Es demasiado caro.',
      context: 'Decir que algo es caro',
      register: 'neutral',
    },
    {
      english: '¿Puedo pagar con tarjeta?',
      context: 'Preguntar por métodos de pago',
      register: 'neutral',
    },
    {
      english: '¿Me da una bolsa, por favor?',
      context: 'Pedir una bolsa',
      register: 'neutral',
    },
    {
      english: '¿Me puede dar un recibo?',
      context: 'Pedir un recibo',
      register: 'neutral',
    },
    {
      english: '¿Tienen más modelos?',
      context: 'Preguntar por más opciones',
      register: 'neutral',
    },
    {
      english: 'Prefiero el azul.',
      context: 'Indicar preferencia de color',
      register: 'neutral',
    },
  ],
}

const asking_directions_a1: PhrasebookCategory = {
  id: 'asking_directions_a1',
  level: 'A1',
  situation: 'Pedir y dar direcciones',
  icon: '🗺️',
  phrases: [
    {
      english: 'Disculpe, ¿dónde está [lugar]?',
      context: 'Preguntar por una ubicación',
      register: 'formal',
    },
    {
      english: '¿Cómo se va a [lugar]?',
      context: 'Preguntar por una dirección',
      register: 'neutral',
    },
    {
      english: '¿Está lejos de aquí?',
      context: 'Preguntar por la distancia',
      register: 'neutral',
    },
    {
      english: 'Gira a la derecha.',
      context: 'Dar una indicación',
      register: 'neutral',
    },
    {
      english: 'Gira a la izquierda.',
      context: 'Dar una indicación',
      register: 'neutral',
    },
    {
      english: 'Sigue todo recto.',
      context: 'Dar una indicación',
      register: 'neutral',
    },
    {
      english: 'Está a la derecha.',
      context: 'Describir una ubicación',
      register: 'neutral',
    },
    {
      english: 'Está a la izquierda.',
      context: 'Describir una ubicación',
      register: 'neutral',
    },
    {
      english: 'Está al lado de [lugar].',
      context: 'Describir ubicación relativa',
      register: 'neutral',
    },
    {
      english: 'Está enfrente de [lugar].',
      context: 'Describir ubicación relativa',
      register: 'neutral',
    },
    {
      english: 'Está cerca de [lugar].',
      context: 'Describir proximidad',
      register: 'neutral',
    },
    {
      english: 'Cruza la calle.',
      context: 'Dar una indicación',
      register: 'neutral',
    },
    {
      english: 'Toma la primera a la derecha.',
      context: 'Dar una indicación precisa',
      register: 'neutral',
    },
    {
      english: 'Está a cinco minutos andando.',
      context: 'Indicar distancia en tiempo',
      register: 'neutral',
    },
  ],
}

// ─── A2 ────────────────────────────────────────────────────────────────────────

const restaurant_a2: PhrasebookCategory = {
  id: 'restaurant_a2',
  level: 'A2',
  situation: 'En el restaurante',
  icon: '🍽️',
  phrases: [
    {
      english: 'Una mesa para [número] personas, por favor.',
      context: 'Pedir mesa al llegar',
      register: 'neutral',
    },
    {
      english: '¿Tienen mesa libre?',
      context: 'Preguntar si hay sitio',
      register: 'neutral',
    },
    {
      english: 'Tenemos reserva a nombre de [nombre].',
      context: 'Al llegar con reserva',
      register: 'formal',
    },
    {
      english: '¿Cuál es el plato del día?',
      context: 'Preguntar por el menú del día',
      register: 'neutral',
    },
    {
      english: 'De primero quiero [plato].',
      context: 'Pedir el primer plato',
      register: 'neutral',
    },
    {
      english: 'De segundo voy a tomar [plato].',
      context: 'Pedir el segundo plato',
      register: 'neutral',
    },
    {
      english: 'La cuenta, por favor.',
      context: 'Pedir la cuenta',
      register: 'neutral',
    },
    {
      english: '¿Tienen opciones vegetarianas?',
      context: 'Preguntar por comida vegetariana',
      register: 'neutral',
    },
    {
      english: '¿Qué me recomienda?',
      context: 'Pedir recomendación al camarero',
      register: 'neutral',
    },
    {
      english: 'Está muy bueno.',
      context: 'Elogiar la comida',
      register: 'neutral',
    },
    {
      english: 'Sin cebolla, por favor.',
      context: 'Pedir que quiten un ingrediente',
      register: 'neutral',
    },
    {
      english: 'Para beber, agua con gas.',
      context: 'Pedir una bebida',
      register: 'neutral',
    },
    {
      english: '¿Está incluida la propina?',
      context: 'Preguntar por el servicio',
      register: 'neutral',
    },
  ],
}

const transport_booking_a2: PhrasebookCategory = {
  id: 'transport_booking_a2',
  level: 'A2',
  situation: 'Viajes y transporte',
  icon: '🚌',
  phrases: [
    {
      english: 'Quiero un billete para [destino].',
      context: 'Comprar un billete',
      register: 'neutral',
    },
    {
      english: '¿A qué hora sale el tren/avión?',
      context: 'Preguntar la hora de salida',
      register: 'neutral',
    },
    {
      english: '¿Cuánto tarda en llegar?',
      context: 'Preguntar por la duración',
      register: 'neutral',
    },
    {
      english: 'Ida y vuelta, por favor.',
      context: 'Comprar billete de ida y vuelta',
      register: 'neutral',
    },
    {
      english: 'Solo ida.',
      context: 'Comprar billete solo de ida',
      register: 'neutral',
    },
    {
      english: '¿De qué andén sale?',
      context: 'Preguntar el andén del tren',
      register: 'neutral',
    },
    {
      english: '¿Dónde está la parada del autobús?',
      context: 'Preguntar por la parada',
      register: 'neutral',
    },
    {
      english: 'Querría reservar un hotel.',
      context: 'Reservar alojamiento',
      register: 'formal',
    },
    {
      english: '¿Tienen habitaciones libres para esta noche?',
      context: 'Buscar alojamiento de última hora',
      register: 'neutral',
    },
    {
      english: 'Quería alquilar un coche.',
      context: 'Alquilar un vehículo',
      register: 'formal',
    },
    {
      english: '¿A qué hora es el check-in?',
      context: 'Preguntar el horario de entrada',
      register: 'neutral',
    },
    {
      english: '¿Está incluido el desayuno?',
      context: 'Preguntar por servicios incluidos',
      register: 'neutral',
    },
  ],
}

const weather_talk_a2: PhrasebookCategory = {
  id: 'weather_talk_a2',
  level: 'A2',
  situation: 'Hablar del tiempo',
  icon: '🌤️',
  phrases: [
    {
      english: 'Hace buen tiempo.',
      context: 'Comentar que el tiempo es bueno',
      register: 'neutral',
    },
    {
      english: 'Hace mal tiempo.',
      context: 'Comentar que el tiempo es malo',
      register: 'neutral',
    },
    { english: 'Hace sol.', context: 'Decir que hay sol', register: 'neutral' },
    {
      english: 'Está nublado.',
      context: 'Decir que está el cielo cubierto',
      register: 'neutral',
    },
    {
      english: 'Hace mucho calor.',
      context: 'Quejarse del calor',
      register: 'neutral',
    },
    {
      english: 'Hace bastante frío.',
      context: 'Comentar el frío',
      register: 'neutral',
    },
    {
      english: 'Está lloviendo.',
      context: 'Decir que llueve',
      register: 'neutral',
    },
    {
      english: 'Hace viento.',
      context: 'Decir que hay viento',
      register: 'neutral',
    },
    {
      english: 'Va a llover.',
      context: 'Predecir lluvia',
      register: 'neutral',
    },
    {
      english: '¿Qué tiempo hace?',
      context: 'Preguntar por el tiempo',
      register: 'neutral',
    },
    {
      english: 'La temperatura es de [número] grados.',
      context: 'Dar la temperatura',
      register: 'neutral',
    },
    {
      english: 'Está nevando.',
      context: 'Decir que nieva',
      register: 'neutral',
    },
    {
      english: 'Mañana hará sol.',
      context: 'Hablar de la previsión del tiempo',
      register: 'neutral',
    },
  ],
}

const making_plans_a2: PhrasebookCategory = {
  id: 'making_plans_a2',
  level: 'A2',
  situation: 'Hacer planes y quedar',
  icon: '📅',
  phrases: [
    {
      english: '¿Quedamos el [día]?',
      context: 'Proponer un encuentro',
      register: 'neutral',
    },
    {
      english: '¿Te apetece tomar algo?',
      context: 'Invitar a tomar algo',
      register: 'informal',
    },
    {
      english: '¿Qué te parece el sábado?',
      context: 'Sugerir un día',
      register: 'neutral',
    },
    {
      english: 'Me viene bien a las [hora].',
      context: 'Confirmar disponibilidad',
      register: 'neutral',
    },
    {
      english: 'Lo siento, no puedo.',
      context: 'Rechazar una invitación',
      register: 'neutral',
    },
    {
      english: '¿A qué hora quedamos?',
      context: 'Preguntar la hora de encuentro',
      register: 'neutral',
    },
    {
      english: 'Quedamos en [lugar].',
      context: 'Acordar un punto de encuentro',
      register: 'neutral',
    },
    {
      english: 'Me encantaría ir.',
      context: 'Aceptar con entusiasmo',
      register: 'neutral',
    },
    {
      english: '¿Te recojo o quedamos allí?',
      context: 'Coordinar la logística',
      register: 'neutral',
    },
    {
      english: 'Otro día, ¿vale?',
      context: 'Posponer una cita',
      register: 'informal',
    },
    {
      english: 'He quedado con [persona] a las [hora].',
      context: 'Explicar un plan ya acordado',
      register: 'neutral',
    },
    {
      english: '¿El viernes te va bien?',
      context: 'Preguntar por disponibilidad',
      register: 'neutral',
    },
  ],
}

const feelings_a2: PhrasebookCategory = {
  id: 'feelings_a2',
  level: 'A2',
  situation: 'Expresar sentimientos',
  icon: '😊',
  phrases: [
    {
      english: 'Estoy contento/a.',
      context: 'Expresar alegría',
      register: 'neutral',
    },
    {
      english: 'Estoy triste.',
      context: 'Expresar tristeza',
      register: 'neutral',
    },
    {
      english: 'Estoy cansado/a.',
      context: 'Decir que tienes sueño o fatiga',
      register: 'neutral',
    },
    {
      english: 'Tengo hambre.',
      context: 'Decir que tienes hambre',
      register: 'neutral',
    },
    {
      english: 'Tengo sed.',
      context: 'Decir que tienes sed',
      register: 'neutral',
    },
    {
      english: 'Tengo sueño.',
      context: 'Decir que tienes sueño',
      register: 'neutral',
    },
    {
      english: 'Estoy un poco preocupado/a.',
      context: 'Expresar preocupación',
      register: 'neutral',
    },
    {
      english: 'Me da igual.',
      context: 'Expresar indiferencia',
      register: 'neutral',
    },
    {
      english: '¡Qué alegría!',
      context: 'Expresar alegría intensa',
      register: 'neutral',
    },
    {
      english: '¡Qué pena!',
      context: 'Expresar decepción o lástima',
      register: 'neutral',
    },
    {
      english: 'Me da mucha vergüenza.',
      context: 'Expresar vergüenza',
      register: 'neutral',
    },
    {
      english: 'Estoy aburrido/a.',
      context: 'Expresar aburrimiento',
      register: 'neutral',
    },
    {
      english: 'Estoy nervioso/a.',
      context: 'Expresar nerviosismo',
      register: 'neutral',
    },
    {
      english: '¡Estoy ilusionado/a!',
      context: 'Expresar ilusión',
      register: 'neutral',
    },
  ],
}

// ─── B1 ────────────────────────────────────────────────────────────────────────

const phone_calls_b1: PhrasebookCategory = {
  id: 'phone_calls_b1',
  level: 'B1',
  situation: 'Llamadas telefónicas',
  icon: '📞',
  phrases: [
    {
      english: '¿Diga? / ¿Sí?',
      context: 'Contestar el teléfono',
      register: 'neutral',
    },
    {
      english: 'Buenos días, le llamo para...',
      context: 'Iniciar una llamada formal',
      register: 'formal',
    },
    {
      english: '¿Está [nombre]?',
      context: 'Preguntar por una persona',
      register: 'neutral',
    },
    { english: 'Soy [nombre].', context: 'Identificarse', register: 'neutral' },
    {
      english: 'Le paso con él/ella.',
      context: 'Transferir una llamada',
      register: 'neutral',
    },
    {
      english: 'No se oye bien.',
      context: 'Decir que hay mala cobertura',
      register: 'neutral',
    },
    {
      english: '¿Puede llamar más tarde?',
      context: 'Sugerir llamar después',
      register: 'neutral',
    },
    {
      english: 'Le devuelvo la llamada enseguida.',
      context: 'Prometer devolver la llamada',
      register: 'formal',
    },
    {
      english: '¿De parte de quién?',
      context: 'Preguntar quién llama',
      register: 'neutral',
    },
    {
      english: 'Un momento, ahora se pone.',
      context: 'Pedir que espere',
      register: 'neutral',
    },
  ],
}

const job_interview_b1: PhrasebookCategory = {
  id: 'job_interview_b1',
  level: 'B1',
  situation: 'Entrevistas de trabajo',
  icon: '💼',
  phrases: [
    {
      english: 'Estoy muy interesado/a en el puesto.',
      context: 'Mostrar interés en la oferta',
      register: 'formal',
    },
    {
      english: 'Tengo experiencia en [campo].',
      context: 'Hablar de experiencia previa',
      register: 'formal',
    },
    {
      english: 'Trabajé en [empresa] durante [tiempo].',
      context: 'Mencionar un trabajo anterior',
      register: 'formal',
    },
    {
      english: '¿Cómo describiría la cultura de la empresa?',
      context: 'Preguntar sobre el ambiente laboral',
      register: 'formal',
    },
    {
      english: 'Domino [idiomas/programas].',
      context: 'Mencionar habilidades',
      register: 'formal',
    },
    {
      english: 'Me gusta trabajar en equipo.',
      context: 'Describir tu forma de trabajar',
      register: 'neutral',
    },
    {
      english: '¿Cuándo sabré algo de la selección?',
      context: 'Preguntar sobre siguientes pasos',
      register: 'formal',
    },
    {
      english: 'Gracias por la oportunidad.',
      context: 'Agradecer la entrevista',
      register: 'formal',
    },
    {
      english: 'Estoy buscando nuevos retos profesionales.',
      context: 'Explicar motivo de cambio',
      register: 'formal',
    },
    {
      english: '¿Qué formación ofrecen?',
      context: 'Preguntar sobre formación',
      register: 'formal',
    },
    {
      english: '¿Cuál sería mi día a día en este puesto?',
      context: 'Preguntar sobre las tareas diarias del puesto',
      register: 'formal',
    },
  ],
}

const giving_opinions_b1: PhrasebookCategory = {
  id: 'giving_opinions_b1',
  level: 'B1',
  situation: 'Dar opiniones y debatir',
  icon: '💬',
  phrases: [
    {
      english: 'En mi opinión...',
      context: 'Introducir una opinión personal',
      register: 'neutral',
    },
    {
      english: 'Yo creo que...',
      context: 'Expresar una creencia',
      register: 'neutral',
    },
    {
      english: 'A mí me parece que...',
      context: 'Dar una impresión personal',
      register: 'neutral',
    },
    {
      english: 'No estoy de acuerdo.',
      context: 'Expresar desacuerdo',
      register: 'neutral',
    },
    {
      english: 'Tienes toda la razón.',
      context: 'Mostrar acuerdo total',
      register: 'neutral',
    },
    {
      english: 'Desde mi punto de vista...',
      context: 'Introducir una perspectiva',
      register: 'formal',
    },
    {
      english: 'No lo había pensado así.',
      context: 'Reconocer otro punto de vista',
      register: 'neutral',
    },
    {
      english: 'Entiendo lo que dices, pero...',
      context: 'Mostrar acuerdo parcial y contraargumentar',
      register: 'neutral',
    },
    {
      english: 'En eso coincido contigo.',
      context: 'Mostrar acuerdo en un punto',
      register: 'neutral',
    },
    {
      english: 'A mi juicio, lo mejor sería...',
      context: 'Dar una opinión razonada',
      register: 'formal',
    },
    {
      english: 'Creo que tienes parte de razón.',
      context: 'Reconocer mérito en el argumento ajeno',
      register: 'neutral',
    },
    {
      english: 'Personalmente, opino que...',
      context: 'Expresar opinión dejando claro que es subjetiva',
      register: 'neutral',
    },
  ],
}

const health_appointments_b1: PhrasebookCategory = {
  id: 'health_appointments_b1',
  level: 'B1',
  situation: 'Salud y citas médicas',
  icon: '🏥',
  phrases: [
    {
      english: 'Quería pedir cita con el médico.',
      context: 'Solicitar una cita',
      register: 'formal',
    },
    {
      english: 'Me duele [parte del cuerpo].',
      context: 'Describir un dolor',
      register: 'neutral',
    },
    {
      english: 'Tengo fiebre.',
      context: 'Decir que tienes fiebre',
      register: 'neutral',
    },
    {
      english: 'No me encuentro bien.',
      context: 'Decir que estás enfermo',
      register: 'neutral',
    },
    {
      english: '¿Tiene cita?',
      context: 'Preguntar si hay cita previa',
      register: 'neutral',
    },
    {
      english: '¿Es grave?',
      context: 'Preguntar por la gravedad',
      register: 'neutral',
    },
    {
      english: 'Tengo que hacerme un análisis de sangre.',
      context: 'Hablar de una prueba médica',
      register: 'neutral',
    },
    {
      english: '¿Cada cuánto tengo que tomar la medicina?',
      context: 'Preguntar por la posología',
      register: 'neutral',
    },
    {
      english: 'Soy alérgico/a a [medicamento/sustancia].',
      context: 'Informar de alergias',
      register: 'formal',
    },
    {
      english: '¿Me puede recetar algo?',
      context: 'Pedir una receta',
      register: 'neutral',
    },
    {
      english: 'Necesito un volante para el especialista.',
      context: 'Pedir derivación a especialista',
      register: 'neutral',
    },
  ],
}

// ─── B2 ────────────────────────────────────────────────────────────────────────

const formal_emails_b2: PhrasebookCategory = {
  id: 'formal_emails_b2',
  level: 'B2',
  situation: 'Correos electrónicos formales',
  icon: '✉️',
  phrases: [
    {
      english: 'Estimado/a Sr./Sra. [apellido]:',
      context: 'Saludo formal de un correo',
      register: 'formal',
    },
    {
      english: 'Me pongo en contacto con usted para...',
      context: 'Iniciar un correo formal',
      register: 'formal',
    },
    {
      english: 'En relación con su correo del [fecha]...',
      context: 'Hacer referencia a una comunicación anterior',
      register: 'formal',
    },
    {
      english: 'Le escribo para solicitar información sobre...',
      context: 'Pedir información formalmente',
      register: 'formal',
    },
    {
      english: 'Adjunto le envío [documento].',
      context: 'Indicar que se envía un archivo adjunto',
      register: 'formal',
    },
    {
      english: 'Quedo a la espera de su respuesta.',
      context: 'Cerrar un correo formal',
      register: 'formal',
    },
    {
      english: 'Atentamente,',
      context: 'Despedida formal',
      register: 'formal',
    },
    {
      english: 'Le agradezco de antemano su atención.',
      context: 'Agradecer por adelantado',
      register: 'formal',
    },
    {
      english: 'Lamento las molestias ocasionadas.',
      context: 'Disculparse formalmente',
      register: 'formal',
    },
    {
      english: 'Aprovecho la ocasión para enviarle un cordial saludo.',
      context: 'Despedida muy formal',
      register: 'formal',
    },
    {
      english: 'Le ruego que me confirme la recepción.',
      context: 'Pedir confirmación de recepción',
      register: 'formal',
    },
  ],
}

const negotiations_b2: PhrasebookCategory = {
  id: 'negotiations_b2',
  level: 'B2',
  situation: 'Negociaciones y reuniones',
  icon: '🤝',
  phrases: [
    {
      english: 'Vamos a tratar de llegar a un acuerdo.',
      context: 'Proponer buscar un entendimiento',
      register: 'formal',
    },
    {
      english: 'Nuestra propuesta es la siguiente...',
      context: 'Presentar una propuesta',
      register: 'formal',
    },
    {
      english: 'Entendemos su postura, pero nos gustaría...',
      context: 'Reconocer la posición ajena y contraargumentar',
      register: 'formal',
    },
    {
      english: '¿Qué margen de negociación tienen?',
      context: 'Preguntar por flexibilidad',
      register: 'formal',
    },
    {
      english: 'Creo que podemos llegar a un punto intermedio.',
      context: 'Sugerir un compromiso',
      register: 'neutral',
    },
    {
      english: 'Me temo que eso no es viable.',
      context: 'Rechazar una propuesta educadamente',
      register: 'formal',
    },
    {
      english: 'Déjeme consultarlo con el equipo.',
      context: 'Posponer una decisión',
      register: 'formal',
    },
    {
      english: '¿Le parece bien si lo cerramos así?',
      context: 'Confirmar un acuerdo',
      register: 'formal',
    },
    {
      english: 'Ambas partes salimos ganando.',
      context: 'Destacar el beneficio mutuo',
      register: 'neutral',
    },
    {
      english: 'Le damos una semana para estudiarlo.',
      context: 'Dar un plazo',
      register: 'formal',
    },
  ],
}

const academic_discussion_b2: PhrasebookCategory = {
  id: 'academic_discussion_b2',
  level: 'B2',
  situation: 'Discusiones académicas',
  icon: '📚',
  phrases: [
    {
      english: 'En este trabajo se analiza [tema].',
      context: 'Introducir el tema de un trabajo',
      register: 'formal',
    },
    {
      english: 'Según el estudio de [autor]...',
      context: 'Citar una fuente',
      register: 'formal',
    },
    {
      english: 'Cabe destacar que...',
      context: 'Señalar algo importante',
      register: 'formal',
    },
    {
      english: 'Por un lado... por otro lado...',
      context: 'Presentar dos perspectivas',
      register: 'neutral',
    },
    {
      english: 'No obstante, los datos sugieren que...',
      context: 'Introducir una objeción',
      register: 'formal',
    },
    {
      english: 'En conclusión, se puede afirmar que...',
      context: 'Empezar la conclusión',
      register: 'formal',
    },
    {
      english: 'Se trata de un tema complejo.',
      context: 'Reconocer la complejidad',
      register: 'neutral',
    },
    {
      english: 'Este aspecto merece un análisis más profundo.',
      context: 'Sugerir más investigación',
      register: 'formal',
    },
    {
      english: 'Hay que tener en cuenta el contexto.',
      context: 'Pedir que se considere el contexto',
      register: 'neutral',
    },
    {
      english: 'Desde una perspectiva académica...',
      context: 'Enmarcar el argumento',
      register: 'formal',
    },
    {
      english: '¿Hay algún estudio que respalde esa afirmación?',
      context: 'Pedir evidencia o fuentes',
      register: 'neutral',
    },
  ],
}

// ─── C1 ────────────────────────────────────────────────────────────────────────

const presentations_c1: PhrasebookCategory = {
  id: 'presentations_c1',
  level: 'C1',
  situation: 'Presentaciones y oratoria',
  icon: '🎤',
  phrases: [
    {
      english: 'Señoras y señores, gracias por su asistencia.',
      context: 'Abrir una presentación formal',
      register: 'formal',
    },
    {
      english: 'El objetivo de esta presentación es...',
      context: 'Exponer el propósito de la charla',
      register: 'formal',
    },
    {
      english: 'A continuación, pasaré a analizar...',
      context: 'Transición entre secciones',
      register: 'formal',
    },
    {
      english: 'Como pueden observar en esta diapositiva...',
      context: 'Referirse a un soporte visual',
      register: 'formal',
    },
    {
      english: 'Me gustaría hacer hincapié en...',
      context: 'Enfatizar un punto',
      register: 'formal',
    },
    {
      english: 'No quisiera extenderme demasiado en este punto.',
      context: 'Gestionar el tiempo',
      register: 'formal',
    },
    {
      english: 'A modo de conclusión...',
      context: 'Empezar el cierre',
      register: 'formal',
    },
    {
      english: 'Estoy a su disposición para cualquier pregunta.',
      context: 'Abrir turno de preguntas',
      register: 'formal',
    },
    {
      english: 'Si me permiten, quisiera añadir que...',
      context: 'Añadir información',
      register: 'formal',
    },
    {
      english: 'Para resumir lo expuesto...',
      context: 'Resumir antes de concluir',
      register: 'formal',
    },
    {
      english: 'Ante todo, quisiera agradecer la oportunidad de estar aquí.',
      context: 'Agradecer al inicio',
      register: 'formal',
    },
  ],
}

const complex_arguments_c1: PhrasebookCategory = {
  id: 'complex_arguments_c1',
  level: 'C1',
  situation: 'Argumentación compleja',
  icon: '🧠',
  phrases: [
    {
      english: 'Cabría preguntarse si realmente...',
      context: 'Plantear una duda retórica',
      register: 'formal',
    },
    {
      english: 'Sin ánimo de polemizar, considero que...',
      context: 'Suavizar una opinión controvertida',
      register: 'formal',
    },
    {
      english: 'Por más que se intente justificar, no cabe duda de que...',
      context: 'Argumentar concesivamente',
      register: 'formal',
    },
    {
      english: 'Resulta cuanto menos sorprendente que...',
      context: 'Expresar escepticismo educado',
      register: 'formal',
    },
    {
      english: 'A este respecto, conviene matizar que...',
      context: 'Introducir un matiz importante',
      register: 'formal',
    },
    {
      english: 'No se trata tanto de... como de...',
      context: 'Reformular el enfoque',
      register: 'formal',
    },
    {
      english: 'Aunque pueda parecer lo contrario, los datos avalan...',
      context: 'Contraargumentar con datos',
      register: 'formal',
    },
    {
      english: 'Subyace a este planteamiento la idea de que...',
      context: 'Identificar una premisa implícita',
      register: 'formal',
    },
    {
      english: 'Con ello no pretendo insinuar que...',
      context: 'Prevenir un malentendido',
      register: 'formal',
    },
    {
      english: 'En última instancia, lo que está en juego es...',
      context: 'Señalar lo fundamental del debate',
      register: 'formal',
    },
    {
      english: 'Cabe señalar, sin embargo, que...',
      context: 'Introducir una objeción con matiz',
      register: 'formal',
    },
  ],
}

const professional_networking_c1: PhrasebookCategory = {
  id: 'professional_networking_c1',
  level: 'C1',
  situation: 'Networking profesional',
  icon: '🔗',
  phrases: [
    {
      english: '¿Puedo presentarme? Soy [nombre], de [empresa].',
      context: 'Presentarse en un evento',
      register: 'formal',
    },
    {
      english: 'He oído hablar muy bien de su empresa.',
      context: 'Romper el hielo con un cumplido',
      register: 'formal',
    },
    {
      english: 'Me dedico a [sector/especialidad].',
      context: 'Explicar la actividad profesional',
      register: 'neutral',
    },
    {
      english: '¿Me permite que le dé mi tarjeta?',
      context: 'Ofrecer la tarjeta de visita',
      register: 'formal',
    },
    {
      english: 'Creo que podríamos colaborar en el futuro.',
      context: 'Sugerir una futura colaboración',
      register: 'formal',
    },
    {
      english: '¿Le importaría ponerme en contacto con [persona]?',
      context: 'Pedir una presentación',
      register: 'formal',
    },
    {
      english: 'Ha sido un placer conocerte.',
      context: 'Despedirse cordialmente (informal)',
      register: 'neutral',
    },
    {
      english: 'Estaremos en contacto.',
      context: 'Prometer seguimiento',
      register: 'neutral',
    },
    {
      english: '¿Estáis en LinkedIn?',
      context: 'Preguntar por la presencia en redes',
      register: 'neutral',
    },
    {
      english: 'Me interesa mucho lo que estáis haciendo en [área].',
      context: 'Mostrar interés genuino',
      register: 'neutral',
    },
    {
      english: '¿Os importaría si os envío un correo para seguir en contacto?',
      context: 'Proponer mantener el contacto',
      register: 'formal',
    },
  ],
}

const conflict_resolution_c1: PhrasebookCategory = {
  id: 'conflict_resolution_c1',
  level: 'C1',
  situation: 'Resolución de conflictos',
  icon: '🕊️',
  phrases: [
    {
      english: 'Creo que ha habido un malentendido.',
      context: 'Detectar un malentendido',
      register: 'neutral',
    },
    {
      english: 'Lamento si mis palabras han podido ofender.',
      context: 'Disculparse sin admitir culpa necesariamente',
      register: 'formal',
    },
    {
      english: 'Entiendo perfectamente su postura.',
      context: 'Validar la posición del otro',
      register: 'formal',
    },
    {
      english: 'Quizá podamos buscar una solución intermedia.',
      context: 'Proponer buscar un compromiso',
      register: 'neutral',
    },
    {
      english: 'No era esa mi intención.',
      context: 'Aclarar intenciones',
      register: 'neutral',
    },
    {
      english: 'Ambas partes tenemos parte de razón.',
      context: 'Reconocer legitimidad en ambas posturas',
      register: 'neutral',
    },
    {
      english: 'Le propongo que aparquemos este asunto por ahora.',
      context: 'Sugerir posponer la discusión',
      register: 'formal',
    },
    {
      english: 'Para resolverlo, necesito que me aclare...',
      context: 'Pedir información para resolver',
      register: 'neutral',
    },
    {
      english: 'No quisiera que esto afectara nuestra relación profesional.',
      context: 'Expresar interés en mantener la relación',
      register: 'formal',
    },
    {
      english: 'Cuente con mi disposición para solucionarlo.',
      context: 'Ofrecer colaboración',
      register: 'formal',
    },
  ],
}

// ─── C2 ────────────────────────────────────────────────────────────────────────

const rhetoric_c2: PhrasebookCategory = {
  id: 'rhetoric_c2',
  level: 'C2',
  situation: 'Retórica y persuasión',
  icon: '🏛️',
  phrases: [
    {
      english: '¿Acaso no es evidente que...?',
      context: 'Lanzar una pregunta retórica contundente',
      register: 'formal',
    },
    {
      english: 'Permítanme esbozar a grandes rasgos...',
      context: 'Anunciar un resumen preliminar',
      register: 'formal',
    },
    {
      english: 'No es baladí señalar que...',
      context: 'Dar importancia a un punto',
      register: 'formal',
    },
    {
      english: 'A fuer de ser sincero, he de reconocer que...',
      context: 'Mostrar sinceridad estratégica',
      register: 'formal',
    },
    {
      english: 'Con ello no hago sino constatar lo que ya muchos advirtieron.',
      context: 'Reforzar un argumento con precedentes',
      register: 'formal',
    },
    {
      english: 'Este argumento, siendo sólido, adolece de...',
      context: 'Conceder y matizar a la vez',
      register: 'formal',
    },
    {
      english: 'Conviene no perder de vista el trasfondo de la cuestión.',
      context: 'Recordar el contexto esencial',
      register: 'formal',
    },
    {
      english: 'Dicho de otro modo, estamos ante un callejón sin salida.',
      context: 'Reformular concluyentemente',
      register: 'formal',
    },
    {
      english: 'La clave no reside tanto en... como en...',
      context: 'Redefinir el eje del debate',
      register: 'formal',
    },
    {
      english: 'En conciencia, no puedo sino disentir.',
      context: 'Expresar desacuerdo con solemnidad',
      register: 'formal',
    },
    {
      english: 'De seguir así, las consecuencias serán irreversibles.',
      context: 'Advertir con contundencia',
      register: 'formal',
    },
  ],
}

const nuanced_discourse_c2: PhrasebookCategory = {
  id: 'nuanced_discourse_c2',
  level: 'C2',
  situation: 'Discurso matizado y diplomacia',
  icon: '🎭',
  phrases: [
    {
      english: 'Sin querer restar mérito a su propuesta...',
      context: 'Suavizar una crítica',
      register: 'formal',
    },
    {
      english: 'Me atrevería a aventurar que...',
      context: 'Proponer una hipótesis con cautela',
      register: 'formal',
    },
    {
      english: 'No me corresponde a mí juzgar, pero...',
      context: 'Opinar sorteando la responsabilidad',
      register: 'formal',
    },
    {
      english: 'Todo apunta a que, en efecto...',
      context: 'Confirmar con evidencia circunstancial',
      register: 'formal',
    },
    {
      english: 'Salvando las distancias, la situación recuerda a...',
      context: 'Hacer una analogía con reservas',
      register: 'formal',
    },
    {
      english: 'Como bien ha apuntado el Sr. [apellido]...',
      context: 'Reconocer mérito ajeno en un debate',
      register: 'formal',
    },
    {
      english: 'Soy consciente de que mi postura puede resultar controvertida.',
      context: 'Admitir el posible rechazo de tu postura',
      register: 'formal',
    },
    {
      english: 'Me limitaré a señalar que...',
      context: 'Restringir el alcance de la intervención',
      register: 'formal',
    },
    {
      english: 'No sería del todo exacto afirmar que...',
      context: 'Corregir con diplomacia',
      register: 'formal',
    },
    {
      english: 'En honor a la verdad, debo reconocer que...',
      context: 'Admitir algo que contradice tu postura',
      register: 'formal',
    },
    {
      english: 'Conviene ser cauto antes de extraer conclusiones precipitadas.',
      context: 'Pedir prudencia',
      register: 'formal',
    },
  ],
}

const legal_contractual_c2: PhrasebookCategory = {
  id: 'legal_contractual_c2',
  level: 'C2',
  situation: 'Lenguaje jurídico y contractual',
  icon: '⚖️',
  phrases: [
    {
      english: 'Las partes acuerdan lo dispuesto en las siguientes cláusulas.',
      context: 'Inicio de un contrato',
      register: 'formal',
    },
    {
      english: 'En virtud de lo establecido en el artículo...',
      context: 'Referirse a legislación',
      register: 'formal',
    },
    {
      english: 'El presente documento surtirá efecto a partir de...',
      context: 'Indicar entrada en vigor',
      register: 'formal',
    },
    {
      english: 'Queda expresamente prohibido...',
      context: 'Establecer una prohibición formal',
      register: 'formal',
    },
    {
      english: 'A tenor de lo expuesto, se resuelve...',
      context: 'Emitir una resolución',
      register: 'formal',
    },
    {
      english: 'En caso de litigio, las partes se someterán a...',
      context: 'Cláusula de resolución de conflictos',
      register: 'formal',
    },
    {
      english: 'Se procederá conforme a derecho.',
      context: 'Indicar cumplimiento legal',
      register: 'formal',
    },
    {
      english: 'Sin perjuicio de lo anterior...',
      context: 'Salvaguardar derechos previos',
      register: 'formal',
    },
    {
      english: 'En cumplimiento de la normativa vigente...',
      context: 'Justificar una acción por ley',
      register: 'formal',
    },
    {
      english: 'El incumplimiento de lo aquí estipulado dará lugar a...',
      context: 'Establecer consecuencias de incumplimiento',
      register: 'formal',
    },
    {
      english: 'A los efectos del presente acuerdo, se entenderá por...',
      context: 'Definir un término en un contrato',
      register: 'formal',
    },
  ],
}

const social_commentary_c2: PhrasebookCategory = {
  id: 'social_commentary_c2',
  level: 'C2',
  situation: 'Comentario social y cultural',
  icon: '🌍',
  phrases: [
    {
      english: 'Asistimos a un cambio de paradigma sin precedentes.',
      context: 'Comentar una transformación social',
      register: 'formal',
    },
    {
      english: 'Esta tendencia, lejos de ser coyuntural, refleja...',
      context: 'Analizar una tendencia social',
      register: 'formal',
    },
    {
      english: 'Con la debida cautela, podría afirmarse que...',
      context: 'Hacer una afirmación con reservas',
      register: 'formal',
    },
    {
      english: 'La ciudadanía demanda, cada vez con más fuerza...',
      context: 'Hablar de demandas sociales',
      register: 'formal',
    },
    {
      english: 'Se ha generado un debate en torno a la pertinencia de...',
      context: 'Introducir una polémica social',
      register: 'formal',
    },
    {
      english: 'Nos encontramos ante una encrucijada histórica.',
      context: 'Subrayar la importancia del momento',
      register: 'formal',
    },
    {
      english: 'Convendría replantearse ciertas inercias arraigadas.',
      context: 'Sugerir un cambio cultural',
      register: 'formal',
    },
    {
      english:
        'La sociedad española ha experimentado una evolución notable en...',
      context: 'Contextualizar un cambio social',
      register: 'formal',
    },
    {
      english: 'Es menester que reflexionemos sobre...',
      context: 'Llamar a la reflexión colectiva',
      register: 'formal',
    },
    {
      english: 'No se trata de un fenómeno aislado, sino sistémico.',
      context: 'Enmarcar un problema como estructural',
      register: 'formal',
    },
    {
      english: 'El tejido social se ha visto profundamente transformado por...',
      context: 'Describir cambios sociales profundos',
      register: 'formal',
    },
  ],
}

// ─── Export ────────────────────────────────────────────────────────────────────

export const phrasebookCategories: PhrasebookCategory[] = [
  greetings,
  basic_requests,
  numbers_time_a1,
  shopping_basic_a1,
  asking_directions_a1,
  restaurant_a2,
  transport_booking_a2,
  weather_talk_a2,
  making_plans_a2,
  feelings_a2,
  phone_calls_b1,
  job_interview_b1,
  giving_opinions_b1,
  health_appointments_b1,
  formal_emails_b2,
  negotiations_b2,
  academic_discussion_b2,
  presentations_c1,
  complex_arguments_c1,
  professional_networking_c1,
  conflict_resolution_c1,
  rhetoric_c2,
  nuanced_discourse_c2,
  legal_contractual_c2,
  social_commentary_c2,
]

export function getPhrasebookByLevel(level: CEFRLevel): PhrasebookCategory[] {
  return phrasebookCategories.filter((c) => c.level === level)
}

export function getPhrasebookByRegister(
  register: Register
): PhrasebookCategory[] {
  return phrasebookCategories.filter((c) =>
    c.phrases.some((p) => p.register === register)
  )
}

export function getAllSituations(): string[] {
  return phrasebookCategories.map((c) => c.situation)
}
