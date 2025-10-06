export const testBeck = {
    category: 'Beck',
    title1: 'Test de Inventario de Depresión de Beck (BDI-2)',
    instructions: `Este cuestionario consta de 21 grupos de afirmaciones. Por favor, lea con atención cada uno de ellos cuidadosamente. Luego elija uno de cada grupo, 
    el que mejor describa el modo como se ha sentido las últimas dos semanas, incluyendo el día de hoy. Marque con un círculo el número correspondiente 
    al enunciado elegido Si varios enunciados de un mismo grupo le parecen igualmente apropiados, marque el número más alto. Verifique que no haya elegido 
    más de uno por grupo, incluyendo el ítem 16 (cambios en los hábitos de Sueño) y el ítem 18 (cambios en el apetito)
    `,
    text2: 'RECUERDA QUE NO HAY RESPUESTAS CORRECTAS O INCORRECTAS.',
    questions: [
      {
        id: 1,
        question: 'Tristeza',
        answers: [
            '0 No me siento triste.',
            '1 Me siento triste gran parte del tiempo',
            '2 Me siento triste todo el tiempo.',
            '3 Me siento tan triste o soy tan infeliz que no puedo soportarlo.'
        ]
      },
      {
        id: 2,
        question: 'Pesimismo',
        answers: [
            '0 No estoy desalentado respecto del mi futuro.',
            '1 Me siento más desalentado respecto de mi futuro que lo que solía estarlo.',
            '2 No espero que las cosas funcionen para mi.',
            '3 Siento que no hay esperanza para mi futuro y que sólo puede empeorar. '
        ]
      },
      {
        id: 3,
        question: ' Fracaso',
        answers: [
            '0 No me siento como un fracaso.',
            '1 He fracasado más de lo que hubiera debido.',
            '2 Cuando miro hacia atrás, veo muchos fracasos.',
            '3 Siento que como persona soy un fracaso total.'
        ]
      },
      {
        id: 4,
        question: 'Pérdida de Placer',
        answers: [
            '0 Obtengo tanto placer como siempre por las cosas de las que disfruto.',
            '1 No disfruto tanto de las cosas como solía hacerlo.',
            '2 Obtengo muy poco placer de las cosas que solía disfrutar.',
            '3 No obtengo ningún placer de las cosas que solía disfrutar.'
        ]
      },
      {
        id: 5,
        question: 'Sentimientos de Culpa',
        answers: [
            '0 No me siento particularmente culpable.',
            '1 Me siento culpable respecto de varias cosas que he hecho o que debería haber',
            '2 Me siento bastante culpable la mayor parte del tiempo.',
            '3 Me siento culpable todo el tiempo.'
        ]
      },
      {
        id: 6,
        question: 'Sentimientos de Castigo',
        answers: [
            '0 No siento que esté siendo castigado.',
            '1 Siento que tal vez pueda ser castigado.',
            '2 Espero ser castigado.',
            '3 Siento que estoy siendo castigado.'
        ]
      },
      {
        id: 7,
        question: 'Disconformidad con uno mismo.',
        answers: [
            '0 Siento acerca de mi lo mismo que siempre.',
            '1 He perdido la confianza en mí mismo. ',
            '2 Estoy decepcionado conmigo mismo. ',
            '3 No me gusto a mí mismo'
        ]
      },
      {
        id: 8,
        question: 'Autocrítica ',
        answers: [
            '0 No me critico ni me culpo más de lo habitual.',
            '1 Estoy más crítico conmigo mismo de lo que solía estarlo',
            '2 Me critico a mí mismo por todos mis errores',
            '3 Me culpo a mí mismo por todo lo malo que sucede.'
        ]
      },
      {
        id: 9,
        question: 'Pensamientos o Deseos Suicidas.',
        answers: [
            '0 No tengo ningún pensamiento de matarme.',
            '1 He tenido pensamientos de matarme, pero no lo haría',
            '2 Querría matarme',
            '3 MMe mataría si tuviera la oportunidad de hacerlo. '
        ]
      },
      {
        id: 10,
        question: 'Llanto',
        answers: [
            '0 No lloro más de lo que solía hacerlo.',
            '1 Lloro más de lo que solía hacerlo.',
            '2 Lloro por cualquier pequeñez.',
            '3 Siento ganas de llorar pero no puedo.'
        ]
      },
      {
        id: 11,
        question: 'Agitación',
        answers: [
            '0 No estoy más inquieto o tenso que lo habitual.',
            '1 Me siento más inquieto o tenso que lo habitual.',
            '2 Estoy tan inquieto o agitado que me es difícil quedarme quieto.',
            '3 Estoy tan inquieto o agitado que tengo que estar en movimiento o haciendo algo.'
        ]
      },
      {
        id: 12,
        question: ' Pérdida de Interés',
        answers: [
            '0 No he perdido el interés en otras actividades o personas.',
            '1 Estoy menos interesado que antes en otras personas o cosas.',
            '2 He perdido casi todo el interés en otras personas o cosas.',
            '3 Me es difícil interesarme por algo.'
        ]
      },
      {
        id: 13,
        question: 'Indecisión',
        answers: [
            '0 Tomo mis propias decisiones tan bien como siempre.',
            '1 Me resulta más difícil que de costumbre tomar decisiones',
            '2 Encuentro mucha más dificultad que antes para tomar decisiones.',
            '3 Tengo problemas para tomar cualquier decisión.'
        ]
      },
      {
        id: 14,
        question: 'Desvalorización',
        answers: [
            '0 No siento que yo no sea valioso.',
            '1 No me considero a mi mismo tan valioso y útil como solía considerarme.',
            '2 Me siento menos valioso cuando me comparo con otros.',
            '3 Siento que no valgo nada.'
        ]
    },
      {
        id: 15,
        question: 'Pérdida de Energía',
        answers: [
            '0 Tengo tanta energía como siempre.',
            '1 Tengo menos energía que la que solía tener.',
            '2 No tengo suficiente energía para hacer demasiado.',
            '3 No tengo energía suficiente para hacer nada.'
        ]
      },
      {
        id: 16,
        question: 'Cambios en los Hábitos de Sueño.',
        answers: [
            '0 No he experimentado ningún cambio en mis hábitos de sueño.',
            '1a Duermo un poco más que lo habitual.',
            '1b Duermo un poco menos que lo habitual.',
            '2a Duermo mucho más que lo habitual.',
            '2b Duermo mucho menos que lo habitual.',
            '3a Duermo la mayor parte del día.',
            '3b Me despierto 1-2 horas más temprano y no puedo volver a dormirme.',
        ]
      },
      {
        id: 17,
        question: 'Irritabilidad',
        answers: [
            '0 No me siento más irritable que lo habitual.',
            '1 Estoy más irritable que lo habitual.',
            '2 Estoy mucho más irritable que lo habitual.',
            '3 Estoy irritable todo el tiempo'
        ]
      },
      {
        id: 18,
        question: 'Cambios en el Apetito',
        answers: [
            '0 No he experimentado ningún cambio en mi apetito.',
            '1a Mi apetito es un poco menor que lo habitual.',
            '1b Mi apetito es un poco mayor que lo habitual.',
            '2a Mi apetito es mucho menor que antes.',
            '2b Mi apetito es mucho mayor que lo habitual.',
            '3a No tengo apetito en absoluto.',
            '3b Cambios en el apetito.'
        ]
      },
      {
        id: 19,
        question: 'Dificultad de Concentración',
        answers: [
            '0 Puedo concentrarme tan bien como siempre.',
            '1 No puedo concentrarme tan bien como habitualmente.',
            '2 Me es difícil mantener la mente en algo por mucho tiempo.',
            '3 Encuentro que no puedo concentrarme en nada.' 
        ]
      },
      {
        id: 20,
        question: 'Cansancio o Fatiga',
        answers: [
            '0 No estoy más cansado o fatigado que lo habitual.',
            '1 Me fatigo o me canso más fácilmente que lo habitual.',
            '2 Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer.',
            '3 Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer.'
        ]
      },
      {
        id: 21,
        question: 'Pérdida de Interés en el Sexo',
        answers: [
            '0 No he notado ningún cambio reciente en mi interés por el sexo.',
            '1 Estoy menos interesado en el sexo que lo que solía estarlo.',
            '2 Estoy mucho menos interesado en el sexo.',
            '3 He perdido totalmente el interés en el sexo.'
        ]
      },
    ]
  };