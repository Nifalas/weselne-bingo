export type RulesSection = {
  heading: string
  items: string[]
}

export const bingoRules = {
  title: 'Weselne Questy',
  intro:
    'Zasady na rewersie planszy. Wykonuj weselne zadania i odznaczaj je na karcie.',
  leftColumn: [
    {
      heading: 'Zasady gry',
      items: [
        'Zapoznaj się z powierzonymi Ci zadaniami. Zanim zostanie podany tort masz możliwość jednorazowej wymiany karty na inny zestaw – zapytaj Świadka, czy dostępne są jeszcze wolne wersje.',
        'Zadania mają sprawiać radość i zachęcać do wspólnej zabawy. Nie rób nic wbrew sobie ani wbrew innym uczestnikom wesela.',
        'Środkowe pole jest wolne od startu - traktuj je jak od razu zaznaczone.',
        'Jeżeli ktoś mówi „nie” – poszukaj innej osoby/osób do wykonania zadania.',
        'Zadania związane ze spożywaniem alkoholu możesz zamienić na: „wznieś toast (napojem bezalkoholowym)”.',
        'Czas na wykonanie questów jest ograniczony – zabawa trwa aż Panna Młoda pójdzie spać.',
        'Wykonane zadania odznaczaj, korzystając z przyborów do pisania dostępnych przy księdze gości lub w inny kreatywny sposób.',
        'Osoby, które wykonają zadania w jednym wierszu lub kolumnie lub po skosie, otrzymują nagrody – zgłoś się po nie do Świadka.',
        'Osoby, które wykonają wszystkie powierzone misje, otrzymują specjalne nagrody po zakończeniu wesela.',
      ],
    },
  ] as RulesSection[],
  rightColumn: [
    {
      heading: 'Menu — 04.06.2026',
      items: [
        '16:00 – Obiad',
        '17:30 – Tort',
        '19:00 – I danie gorące',
        '19:00 - 23:00 – Fotobudka',
        '20:30 – Deser',
        '22:00 – II danie gorące',
        '00:00 – Sesja zdjęciowa z zimnymi ogniami',
        '00:30 – III danie gorące',
        '02:30 – IV danie gorące',
      ],
    },
    {
      heading: 'Informacje dodatkowe',
      items: [
        'Dla osób, które wcześniej zgłosiły potrzebę, przygotowano menu bezmięsne.',
        'Kawa i herbata dostępne w formie samoobsługi.',
        'Poza głównymi stołami przygotowano stolik z dodatkowymi alkoholami.',
        'Piwo z nalewaka przy barze (również w wersji bezalkoholowej).',
      ],
    },
    {
      heading: 'Numery kontaktowe i transport',
      items: [
        'Oprawa muzyczna - 000 000 000',
        'Fotograf - 000 000 000',
        'Jeśli przyjechałeś/aś samochodem, to jest możliwość odstawienia samochodu i przywiezienie przez kierowcę - zgłoś się do Świadka.',
        'Jest kierowca, który będzie odwoził do domu, kursy wykonywane będą do pobliskich miejscowości',
        'W przypadku jakichkolwiek pytań lub problemów z transportem, zgłoś się do Świadka.'
      ],
    }
  ] as RulesSection[],
}
