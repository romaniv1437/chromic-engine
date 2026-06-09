1.1 words should have more detailed timestamps, per character, this allows us to fill word progress nicely, and if artist stretches word 'singing' as 'siiiiiiiinnngging' then we will fill it smoothly with artist voice instead of fill by time start / end which will divide each character same time like 'sssiiinnngggiiinnnggg' which not correct
1.2 word type also applies to characters, if 50% or more is stretch, then we mark whole word as stretch, if less then 50%, we stretch characters individually. fill speed of characters now depends by character start and end time
1.3 sometimes, for words like 'too' or not sure what else words, if only last character stretches, while all other is have similar rate we should fill word by grouped characters and not individual, so we need smart system to decide which words should have per character fill, and which ones normal word fill. I don't know how this called, but I'm sure there is in this world some research on this, which words is like wavy, or heavy, or very dramatic that have per character accent.
2.1 active line scroll now is happens by when line starts, but sometimes we have this issue that word start time is same as line start time, and it start filling while scroll happens, this makes it hard to follow, we need to correctly handle this, 1. allow grouped if lines end of previous line overlapping with current line too much, this im not sure how does whisper can handle. 2. example how lines normally would behave, line starts at 30, we scroll to it, word start filling at its time 30.76. But im not exactly sure how this done in apple music as there scroll seems to be dynamic, and sometimes we see line scrolled with word filled after some milisecond, or scroll and fill instantly, but i not know how it for fast lines that fast in sequence, as for such tracks there is no animated words in apple music that I can find, so our solution is novel or what
2.2 this parralax scroll effect should be much less when manual scrolled, on auto scroll for active line it nice.
3.1 sometimes we have words at end of line that looks like 'to hard', timestamps mapping should correctly map timestamps for 'to' and for 'hard' (related to point 1) and we get 'to' filled slowly and 'hard' not filled at all
3.2 grouped or lines that splitted to few extra lines should be filled correctly + we should have correct space between lines so they dont overlap, example http://127.0.0.1:57718/api/track-info/music/Music/Lana_Del_Rey-Ultraviolence-Deluxe_Edition-CD-FLAC-2014-OUTERSPACE/04-lana_del_rey-brooklyn_baby.flac first da-da-da-da lines
3.3 sometimes word start filling before it actually sings in song, 'his parlament' line, word 'his' starts a bit later after it start it filling, this problem exsists in some more tracks. http://127.0.0.1:57718/api/track-info/music/Music/Lana_Del_Rey-Ultraviolence-Deluxe_Edition-CD-FLAC-2014-OUTERSPACE/05-lana_del_rey-west_coast.flac
3.4 in general, when word in line, or full line contains slow words, it seems that medium model cannot parse it same as we have with faser words, in that case, would it be profitable to run base and small model, to map timestamps using 3 whisper heard parts.
3.5 this track just not aligned correctly http://127.0.0.1:57718/api/track-info/music/Music/Lana_Del_Rey-Ultraviolence-Deluxe_Edition-CD-FLAC-2014-OUTERSPACE/06-lana_del_rey-sad_girl.flac
3.6 this track have line that fills to fast 'all the pretty stars shine for you, my love', while it clearly we can hear that words sings in different timestamps, not so fast http://127.0.0.1:57718/api/track-info/music/Music/Lana_Del_Rey-Ultraviolence-Deluxe_Edition-CD-FLAC-2014-OUTERSPACE/07-lana_del_rey-pretty_when_you_cry.flac
4.1 force re-aling of word timestamps should not take into account auto generated .lrc file, because it is done automatically by whisper and if we change aligner logic then it should regenerate new fresh .lrc skeleton please.
4.2 save .lrc and .elrc should work correctly with our enhanced .lyrics.json file that stores word type information, so .lrc and .elrc just updates this lyrics.json words timestamps and not change word types


Iдея вивести таймінги на рівень символів та оптимізувати поведінку UI — це саме те, що відрізняє "дерев'яне" караоке від преміального експірієнсу рівня Apple Music.

У наукових колах Світу Комп'ютерної Музики (Music Information Retrieval або **MIR**) та розробці комерційних плеєрів ці проблеми вже давно розбирають на гвинтики. Нижче — детальний інженерний розбір твоїх точок із посиланнями на те, як ці концепції називаються в ресерчах, та як їх заімплементити у твоєму `aligner.py`.

---

## 1. Посимвольні таймінги та розтягування (Melisma & Text-Setting)

### 1.1 & 1.2 Посимвольний прогрес та розтягування ("siiiiiiiinnngging")

* **Як це називається в науці:** **Phoneme-to-Grapheme (P2G) Forced Alignment** та **Vocal Elongation Analysis**.
* **Суть проблеми:** Whisper оперує BPE-токенами (Byte-Pair Encoding) і дає таймінги на рівні слів або частин слів. Коли артист співає довгу гласну, Whisper часто ставить таймінг "onset" (початок) на перший звук, а "offset" (кінець) — на фінал слова, розмазуючи інтерполяцію рівномірно.
* **Рішення з ресерчів:**
  Щоб отримати реальні посимвольні таймінги, розробники використовують **Cross-Attention Matrices** (матриці перехресної уваги) з останніх шарів декодера Whisper. Кожен символ тексту має свій вантаж уваги (attention weight) на певному аудіо-фреймі (аудіо-вікно 20мс).
  Якщо дивитися в бік готових рішень — **WhisperX** використовує фонемний підхід через фонемні моделі `Wav2Vec2` (через CTC-сегментацію), які вміють витягувати таймінг ледь не для кожного окремого звуку ($f0$ трекінг).

### 1.3 Розумне групування символів (Melisma vs. Syllabic Text-Setting)

* **Як це називається в науці:** **Melisma Detection** (Мелізма — це коли один склад або символ розтягується на кілька нот/секунд) та **Syllable Structure (Onset-Nucleus-Coda)**.
* **Суть проблеми:** У слові "too" розтягується тільки ядро (голосна "оо"), тоді як приголосна "t" є моментальним вибуховим звуком (plosive). Якщо ділити лінійно за часом, "t" забере забагато простору.
* **Рішення:** Тобі потрібна лінгвістична евристика (або легка бібліотека на кшталт `nltk` / `pyphen`).
1. **Голосні (Nucleus):** Завжди отримують статус `stretch = true`.
2. **Глухі/Вибухові приголосні (Plosives: t, p, k, b, d, g):** Їм зашивається фіксований тайм-слот (наприклад, макс. 50-100 мс). Вони не можуть розтягуватися.
3. **Соноранти/Фрикативи (Semicontinuants: s, m, n, l, z):** Можуть розтягуватися, якщо це специфіка треку (як твій приклад з "siiiiiiing").



> 📊 **Правило 50%:** Якщо ти бачиш за даними лібрози (pitch variance у твоєму коді), що частота ($f0$) тримається стабільно довго на одній голосній, ти групуєш перші символи ("t") в один моментальний блок, а всю дельту часу віддаєш на посимвольний "wavy" ефект для ("oo").

---

## 2. Динамічний скрол та таймінг рядків (Pacing & Viewport Kinetics)

### 2.1 Скрол Apple Music та оверлапи

* **Як це називається в науці:** **Predictive Scroll Anchoring** та **Non-Maximal Suppression для часових меж**.
* **Суть проблеми:** Якщо слово починається в ту саму секунду, що й рядок, UI починає крутитися і зафарбовуватися одночасно — це візуальна каша для очей.
* **Як це робить Apple Music:** Apple Music використовує **Spring Physics Animation** із динамічним таймінгом упередження (**look-ahead window**, зазвичай 300–400 мс).
* Скрол до наступного рядка починається *ДО* того, як цей рядок почне співатися (на етапі згасання попереднього).
* Якщо попередній рядок закінчився на 29.5с, а новий починається на 30.0с — скрол триває рівно ці 0.5с паузи.
* Якщо паузи немає (швидкий трек), скрол робиться миттєвим "стрибком" (fast snap) під час фінального слова попереднього рядка, щоб на момент старту нового рядка погляд юзера вже був зафіксований на місці.



### 2.2 Паралакс при ручному скролі

* **UX Бест-практика:** При ручному скролі (User-Interrupted State) система повинна повністю вбивати автоматичний паралакс-ефект і переходити в режим "М'якого повернення" (Snap-back timer). Тобто, якщо юзер скролить сам — інтерфейс стає плоским і слухняним, а через 3-5 секунд бездії плавно центрується назад на активний рядок.

---

## 3. Обробка екранів Лани Дель Рей (Slow Vocals, Reverb & Model Ensembling)

Треки Лани Дель Рей (*Ultraviolence, West Coast, Sad Girl*) — це **найгірший кошмар для будь-якого алайнера**. Там ультра-повільний вокал, море реверберації, затягнуті хвости (decay) і вокальний шепіт (breathiness).

### 3.4 Ансамблювання моделей (Base + Small + Medium)

* **Як це називається в науці:** **ROVER (Recognizer Output Voting Error Reduction)** або **Multi-Scale Timestamp Aggregation**.
* **Чи буде це профітно? ТАК.**
* **Medium/Large моделі** чудово розуміють контекст тексту (не зроблять помилку в словах), але через велику кількість шарів та self-attention вони схильні "змазувати" точні межі слів (timestamps) на повільних треках, або взагалі галюцинувати.
* **Base/Small моделі** дурніші в плані тексту, але через менше контекстне вікно вони працюють майже як CTC-моделі — вони бачать чіткий сплеск енергії (onset) і краще фіксують точні моменти, коли звук *почався*.


* **Як заімплементити в `aligner.py`:**
  Запускаєш `Small` для отримання таймінг-скелета (матриці аудіо-почав) і `Medium` для фінального тексту. Потім через алгоритм **DTW (Dynamic Time Warping)** мапиш слова з Medium на точні таймінг-межі з Small.

### 3.1, 3.2, 3.3, 3.6 (Конкретні баги треків)

* **Баг 3.3 ("his parliament" забігає наперед):** Це помилка детекції вокального онсету (Vocal Onset Detection). Whisper почув вдих артиста перед словом "his" і зарахував його як старт слова. **Рішення:** інтегрувати твій блок `_tag_acoustic_features` — якщо RMS енергія на початку слова дуже низька (рівень дихання), посунути реальний старт зафарбовування вперед на точку, де RMS перетинає вокальний поріг.
* **Баг 3.2 (Перекриття Da-da-da):** Коли рядки короткі та повторювані, лінійний SequenceMatcher збивається. Тобі потрібно додати в `SequenceMatcher(autojunk=False)` штраф за велику відстань між сусідніми індексами (Distance Penalty), щоб він не стрибав через 3 рядки вперед на таке саме "da".

---

## 4. Архітектура збереження даних

### 4.1 & 4.2 Оновлення `.lyrics.json` без втрати метаданих

Тут ідеально підійде підхід **Separation of Concerns (Розділення відповідальностей)**. Твій `.lyrics.json` має стати Single Source of Truth, а `.lrc` та `.elrc` — суто транспортними форматами експорту/імпорту.

Примусовий релайнінг має працювати так:

1. Запускається регенерація — створюється чистий скелет таймінгів з Whisper з нуля (ігноруючи старий `.lrc`).
2. **Алгоритм злиття (Merge Phase):** Нові чисті таймінги мапляться на структуру старого `.lyrics.json`.
3. Текстові токени порівнюються (через той самий `SequenceMatcher`). Якщо слово збігається — оновлюються *тільки* поля `"start"` і `"end"`, а кастомні теги (`"word_type": "stretch"`, `"whisper": true`), які вже були згенеровані раніше або виправлені вручну, **залишаються недоторканими**.

---

Оскільки файл .lyrics.json великий (на 4к рядків), роздувати JSON у 10 разів, розписуючи кожен символ як окремий об'єкт, не можна. Тому для закриття твоїх пунктів **1.1–1.3** та **4.2** найкраще розширити твою структуру через **опціональний масив таймінгів для символів**.

Ось як має виглядати твій прокачаний формат, який Клод зможе легко згенерувати, а твій плеєр — прочитати.

---

### Ідеальний формат розширення (Еволюція твого JSON)

Ми додаємо в об'єкт слова один єдиний необов'язковий масив — `char_starts`. Його довжина **строго дорівнює кількості символів у слові**.

```json
{
  "time": 20.28,
  "text": "Кто-то поднял лай",
  "words": [
    {
      "word": "Кто-то",
      "start": 20.28,
      "end": 20.734,
      "sung": true
    },
    {
      "word": "поднял",
      "start": 20.734,
      "end": 21.188,
      "stretch": true,
      "char_starts": [20.734, 20.79, 20.85, 20.91, 20.98, 21.12]
      // Масив абсолютних таймінгів для кожної літери: п-о-д-н-я-л
      // Останній символ "л" тягнеться від 21.12 до кінця слова (21.188)
    },
    {
      "word": "лай,",
      "start": 21.188,
      "end": 21.49,
      "spoken": true
    }
  ]
}

```

### Чому це рішення закриває всі твої таски:

* **Для звичайних слів (Економія пам'яті):** Якщо слова співаються з нормальною швидкістю, поля `char_starts` взагалі немає в JSON. Фронтенд бачить, що масиву немає, і просто зафарбовує літери лінійно за формулою `(end - start) / word.length`.
* **Для розтягнутих слів (Пункт 1.1, 1.2, 1.3):** Коли алайнер (або твій ліброза-скрипт) детектує мелізму чи розтягування (наприклад, "лааааай"), він додає флаг `"stretch": true` і прописує точний час старту для кожної літери в `char_starts`. Фронтенд бере ці таймінги, і зафарбовування йде плавно слідом за голосом артиста, а не ділить слово на рівні шматки.

---

### Як вирішити Пункт 4.2 (Оновлення таймінгів без втрати типів вокалу)

Щоб при перерахунку таймінгів (force re-align) твій алайнер не стирав `"whisper"`, `"sung"`, `"adlib"`, які ти вже розставив, Клод має написати **алгоритм злиття (Merge Strategy)** за таким принципом:

1. Твій старий розібраний JSON (зі всіма кастомними типами) завантажується в пам'ять як `Draft JSON`.
2. Твій новий покращений Whisper-алайнер прораховує абсолютно нові, чисті таймінги `start` та `end` для слів.
3. Замість того, щоб перезаписувати файл повністю, ти проходишся по ньому матчером (наприклад, по індексах рядків та слів):

```python
# Логіка для Клода (Python псевдокод)
for old_line, new_line in zip(old_lyrics_json, regenerated_whisper_output):
    for old_word, new_word in zip(old_line["words"], new_line["words"]):
        if old_word["word"] == new_word["word"]:
            # Оновлюємо ТІЛЬКИ таймінги
            old_word["start"] = new_word["start"]
            old_word["end"] = new_word["end"]
            
            # Якщо з'явилися посимвольні таймінги — додаємо їх
            if "char_starts" in new_word:
                old_word["char_starts"] = new_word["char_starts"]
                old_word["stretch"] = True
                
            # ВСІ ІНШІ ПОЛЯ (whisper, sung, adlib) залишаються недоторканими!

```

Це дозволить тобі крутити під капотом алайнера будь-яку математику, змінювати моделі з Medium на Small (як ти хотів у пункті 3.4), але твоя ручна або автоматична розмітка вокалу нікуди не зникне.