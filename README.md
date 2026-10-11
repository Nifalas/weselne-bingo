# Weselne Bingo — generator plansz PDF

Aplikacja webowa w React + TypeScript, która generuje zestaw **unikalnych plansz „Weselnego Bingo”** (5×5) i składa je w jeden plik PDF gotowy do druku i cięcia na karty A5.

Projekt powstał na potrzeby prawdziwego wesela — goście dostawali karty z zadaniami do wykonania w trakcie imprezy, a na rewersie każdej karty były zasady gry, menu i informacje organizacyjne.

## Funkcje

- **Generowanie N unikalnych plansz** (domyślnie 50) z puli zadań
- **Pytania obowiązkowe** — trafiają na każdą planszę, w losowym miejscu
- **Limity wystąpień** — dla każdego zadania można ustawić, na ilu maksymalnie kartach może się pojawić (np. „Napij się z kimś o imieniu Kamil | 4”)
- **Pole środkowe** (FREE SPACE) z grafiką
- **Podgląd PDF na żywo** w przeglądarce + pobieranie pliku
- **Ręczna edycja** dowolnej komórki dowolnej planszy po wygenerowaniu
- Edycja puli zadań, tytułu i grafiki nagłówka z poziomu panelu
- **Układ do druku**: 2 plansze na stronie A4 (cięcie na pół → A5), ostatnia strona to 2× zasady do druku dwustronnego
- Polskie dzielenie wyrazów w komórkach (`hyphen`), własne fonty z polskimi znakami

## Jak to działa

Silnik losujący ([`src/lib/generateBingoData.ts`](src/lib/generateBingoData.ts)):

1. Normalizuje pulę zadań (usuwa duplikaty i puste wpisy, parsuje limity `maxCards`).
2. Dla każdej planszy tasuje wolne pola algorytmem **Fisher–Yates** i rozmieszcza najpierw pytania obowiązkowe.
3. Pozostałe pola wypełnia zadaniami, pilnując, by nic nie powtórzyło się na jednej karcie i by globalny licznik wystąpień nie przekroczył limitu.
4. Gdy pula jest za mała względem limitów — zwraca czytelny komunikat błędu.

PDF jest renderowany w całości po stronie klienta przy pomocy `@react-pdf/renderer` — komponenty React opisują strony, plansze i zasady.

## Stack

- **React 19** + **TypeScript**
- **Vite**
- **@react-pdf/renderer** — generowanie PDF
- **Tailwind CSS 4** — interfejs
- **Lucide React** — ikony
- ESLint (typescript-eslint, react-hooks)

## Uruchomienie

Wymagany Node.js 20+.

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem z terminala (domyślnie `http://localhost:5173`).

Pozostałe skrypty:

```bash
npm run build    # typecheck + build produkcyjny do dist/
npm run preview  # podgląd buildu
npm run lint     # ESLint
```

## Druk

1. Wydrukuj strony z planszami i przetnij każdą kartkę A4 poziomo na pół → karty A5.
2. Ostatnią stronę (2× zasady) wydrukuj na rewersie i również przetnij na pół.

## Struktura

```
src/
  data/
    questions.ts          # pula zadań (+ opcjonalne limity maxCards)
    must_questions.ts     # zadania obowiązkowe na każdej planszy
    rules.ts              # zasady gry i informacje na rewersie
  lib/
    generateBingoData.ts  # silnik losujący
    downloadPdf.ts        # pobieranie PDF jako blob
  pdf/
    BingoDocument.tsx     # dokument PDF
    A4TwoUpPage.tsx       # układ 2× A5 na stronie A4
    BingoBoard.tsx        # pojedyncza plansza
    RulesHalf.tsx         # połówka ze zasadami
    fonts.ts              # rejestracja fontów i dzielenie wyrazów
  components/             # panel sterowania, edytor plansz, przycisk pobierania
```
