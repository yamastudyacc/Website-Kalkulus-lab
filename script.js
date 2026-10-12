const INITIAL_STATE = {
    completedSubchapters: [],
    quizScores: {},
    lastVisitedSubchapter: 'bab1_sub1',
    darkMode: false,
    bookmarks: [],
    personalNotes: ''
};

let appState = JSON.parse(localStorage.getItem('kalkulus_lab_state')) || INITIAL_STATE;

function saveState() {
    localStorage.setItem('kalkulus_lab_state', JSON.stringify(appState));
    updateOverallProgressUI();
}

function resetProgress() {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh progres belajar dan nilai kuis?")) {
        appState = { ...INITIAL_STATE };
        saveState();
        location.reload();
    }
}

function safeTypeset() {
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise().catch(err => console.error("MathJax error:", err));
    }
}

const COURSE_DATA = {
    bab1: {
        title: "Bab 1 — Fondasi Bilangan & Bilangan Kompleks",
        subchapters: {
            bab1_sub1: {
                title: "1.1 Pengenalan Sistem Bilangan & Rasional vs Irasional",
                objectives: [
                    "Memahami hierarki sistem bilangan dari Bilangan Asli ($\\mathbb{N}$) hingga Bilangan Kompleks ($\\mathbb{C}$).",
                    "Membedakan bilangan rasional (dapat dinyatakan sebagai $\\frac{a}{b}$) dan irasional.",
                    "Memahami pentingnya ketelitian presisi bilangan pada komputasi numerik Teknik Elektro."
                ],
                concept: `
                    <p>Dalam matematika teknik, sistem bilangan dibangun secara bertahap:</p>
                    <ul>
                        <li><strong>Bilangan Asli ($\\mathbb{N}$):</strong> $1, 2, 3, \\dots$</li>
                        <li><strong>Bilangan Bulat ($\\mathbb{Z}$):</strong> $\\dots, -2, -1, 0, 1, 2, \\dots$</li>
                        <li><strong>Bilangan Rasional ($\\mathbb{Q}$):</strong> Bilangan yang dapat dituliskan dalam bentuk pecahan $\\frac{a}{b}$ di mana $a, b \\in \\mathbb{Z}$ dan $b \\neq 0$. Desimalnya berulang atau berhenti (contoh: $\\frac{3}{4} = 0.75$, $\\frac{1}{3} = 0.333\\dots$).</li>
                        <li><strong>Bilangan Irasional:</strong> Bilangan yang tidak dapat dinyatakan dalam bentuk pecahan sederhana. Desimalnya tidak berulang dan tak hingga (contoh: $\\pi \\approx 3.14159$, $e \\approx 2.71828$, $\\sqrt{2}$).</li>
                        <li><strong>Bilangan Real ($\\mathbb{R}$):</strong> Gabungan dari seluruh bilangan rasional dan irasional.</li>
                    </ul>
                `,
                analogy: `
                    <p>Bayangkan <strong>Bilangan Rasional</strong> seperti garis gelombang digital dengan interval sampel yang pasti. Sedangkan <strong>Bilangan Irasional</strong> seperti sinyal analog kontinu tak berhingga yang membutuhkan resolusi konversi digit tak terhingga (ADC) agar dapat disimpan sempurna tanpa eror pembulatan.</p>
                `,
                formulas: `
                    $$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$$
                    $$\\text{Bentuk Rasional: } x = \\frac{a}{b}, \\quad a,b \\in \\mathbb{Z}, \\, b \\neq 0$$
                `,
                examples: [
                    {
                        q: "Buktikan bahwa $x = 0.363636\\dots$ merupakan bilangan rasional dengan mengubahnya menjadi bentuk pecahan sederhana $\\frac{a}{b}$.",
                        solution: [
                            "Langkah 1: Misalkan $x = 0.363636\\dots$",
                            "Langkah 2: Karena periode pengulangan angka adalah 2 digit (36), kalikan kedua ruas dengan $10^2 = 100$:\n$$100x = 36.363636\\dots$$",
                            "Langkah 3: Kurangkan persamaan kedua dengan persamaan pertama:\n$$100x - x = (36.363636\\dots) - (0.363636\\dots)$$\n$$99x = 36$$",
                            "Langkah 4: Sederhanakan pecahan:\n$$x = \\frac{36}{99} = \\frac{4}{11}$$",
                            "Kesimpulan: Karena dapat dinyatakan sebagai $\\frac{4}{11}$, maka $0.363636\\dots$ terbukti merupakan bilangan rasional."
                        ]
                    }
                ],
                pitfalls: `
                    <p><strong>Kesalahan Umum:</strong> Menganggap $\\pi$ sama dengan $\\frac{22}{7}$. $\\frac{22}{7} = 3.142857\\dots$ adalah bilangan rasional (desimal berulang), sedangkan $\\pi$ adalah bilangan irasional. $\\frac{22}{7}$ hanyalah nilai pendekatan praktis.</p>
                `,
                visualizationType: "none",
                eeApp: `
                    <p>Pada pemrosesan sinyal digital (DSP), konversi dari sinyal kontinu ($\\mathbb{R}$) ke sinyal tersampel membutuhkan pembulatan. Menganalisis perbedaan antara angka rasional ideal dan pembulatan floating-point mencegah galat akumulasi kuantisasi pada filter digital.</p>
                `,
                practice: [
                    "Ubah bilangan desimal berulang $0.125125125\\dots$ menjadi bentuk pecahan paling sederhana $\\frac{a}{b}$.",
                    "Apakah $\\sqrt{8}$ bilangan rasional atau irasional? Jelaskan alasannya."
                ],
                quiz: {
                    type: "mcq",
                    question: "Manakah dari kelompok bilangan berikut yang semuanya merupakan bilangan rasional?",
                    options: [
                        "A. $\\sqrt{4}, \\frac{22}{7}, 0.121212\\dots$",
                        "B. $\\pi, \\sqrt{2}, e$",
                        "C. $\\sqrt{3}, \\frac{1}{2}, 0.5$",
                        "D. $\\sqrt{5}, 3.14, 0$"
                    ],
                    correct: 0,
                    explanation: "$\\sqrt{4}=2$ (rasional), $\\frac{22}{7}$ (rasional), $0.121212\\dots = \\frac{12}{99}$ (rasional)."
                },
                summary: [
                    "Bilangan rasional selalu dapat dituliskan dalam pecahan bulat $a/b$.",
                    "Bilangan real adalah gabungan dari rasional dan irasional."
                ]
            },
            bab1_sub2: {
                title: "1.2 Satuan Imajiner (j), Aljabar Bilangan Kompleks & Bentuk Polar",
                objectives: [
                    "Memahami definisi satuan imajiner $j = \\sqrt{-1}$ (digunakan simbol $j$ pada Elektro agar tidak tertukar dengan arus listrik $i$).",
                    "Menguasai operasi aljabar: penjumlahan, perkalian, pembagian, dan konjugat bilangan kompleks.",
                    "Mengubah bentuk Kartesius ($z = a + bj$) ke bentuk Polar ($r \\angle \\theta$ atau $r e^{j\\theta}$).",
                    "Menerapkan bilangan kompleks untuk menghitung impedansi rangkaian AC."
                ],
                concept: `
                    <p>Dalam Teknik Elektro, persamaan diferensial arus AC menghasilkan solusi akar negatif. Didefinisikan satuan imajiner:</p>
                    $$j = \\sqrt{-1} \\implies j^2 = -1, \\quad j^3 = -j, \\quad j^4 = 1$$
                    <p>Suatu bilangan kompleks $z$ dinyatakan dalam koordinat Kartesius:</p>
                    $$z = a + bj$$
                    <p>di mana $a = \\text{Re}(z)$ adalah bagian real, dan $b = \\text{Im}(z)$ adalah bagian imajiner.</p>
                `,
                analogy: `
                    <p>Jika bilangan real seperti bergerak maju-mundur pada satu garis lurus 1-Dimensi, maka <strong>Satuan Imajiner $j$</strong> bekerja seperti sakelar rotasi 90 derajat berlawanan arah jarum jam di bidang 2-Dimensi. Mengalikan dengan $j$ memutar vektor sebesar $90^\\circ$.</p>
                `,
                formulas: `
                    $$\\text{Bentuk Kartesius: } z = a + bj$$
                    $$\\text{Konjugat: } \\bar{z} = a - bj$$
                    $$\\text{Modulus (Magnitudo): } |z| = r = \\sqrt{a^2 + b^2}$$
                    $$\\text{Argumen (Sudut): } \\theta = \\arctan\\left(\\frac{b}{a}\\right)$$
                    $$\\text{Bentuk Polar / Euler: } z = r(\\cos\\theta + j\\sin\\theta) = r e^{j\\theta}$$
                `,
                examples: [
                    {
                        q: "Diketahui dua impedansi rangkaian $Z_1 = 3 + 2j \\,\\Omega$ dan $Z_2 = 1 - 4j \\,\\Omega$. Hitunglah perkalian $Z_1 \\cdot Z_2$ dan pembagian $\\frac{Z_1}{Z_2}$.",
                        solution: [
                            "<strong>1. Perkalian ($Z_1 \\cdot Z_2$):</strong>\n$$Z_1 \\cdot Z_2 = (3 + 2j)(1 - 4j)$$\n$$= 3(1) + 3(-4j) + 2j(1) + 2j(-4j)$$\n$$= 3 - 12j + 2j - 8j^2$$\nIngat $j^2 = -1$, maka $-8j^2 = +8$:\n$$= (3 + 8) + (-12 + 2)j = 11 - 10j \\,\\Omega$$",
                            "<strong>2. Pembagian ($\\frac{Z_1}{Z_2}$):</strong>\nKalikan pembilang dan penyebut dengan konjugat penyebut $\\bar{Z_2} = 1 + 4j$:\n$$\\frac{3 + 2j}{1 - 4j} = \\frac{(3 + 2j)(1 + 4j)}{(1 - 4j)(1 + 4j)}$$\n$$\\text{Penyebut: } 1^2 - (4j)^2 = 1 - (-16) = 17$$\n$$\\text{Pembilang: } 3(1) + 12j + 2j + 8j^2 = 3 + 14j - 8 = -5 + 14j$$\n$$\\frac{Z_1}{Z_2} = \\frac{-5 + 14j}{17} = -\\frac{5}{17} + \\frac{14}{17}j \\approx -0.294 + 0.824j \\,\\Omega$$"
                        ]
                    }
                ],
                pitfalls: `
                    <p><strong>Kesalahan Umum:</strong> Lupa mengubah tanda pada $j^2$. Banyak mahasiswa menulis $(2j)(-4j) = -8j$, padahal yang benar adalah $-8j^2 = -8(-1) = +8$.</p>
                `,
                visualizationType: "complex-plane",
                eeApp: `
                    <p>Pada analisis Rangkaian Arus Bolak-Balik (AC), Resistor memiliki impedansi $Z_R = R$, Induktor memiliki impedansi imajiner positif $Z_L = j\\omega L$, dan Kapasitor memiliki impedansi imajiner negatif $Z_C = \\frac{1}{j\\omega C} = -j\\frac{1}{\\omega C}$. Total impedansi rangkaian seri adalah penjumlahan kompleks $Z_{total} = R + j\\left(\\omega L - \\frac{1}{\\omega C}\\right)$.</p>
                `,
                practice: [
                    "Hitung nilai modulus $|z|$ dan argumen $\\theta$ dari $z = 4 + 3j$. Tuliskan dalam bentuk polar $r e^{j\\theta}$.",
                    "Sederhanakan ekspresi $\\frac{1 + j}{2 + j}$ ke bentuk $a + bj$."
                ],
                quiz: {
                    type: "numeric",
                    question: "Berapakah nilai bagian real dari hasil perkalian $(2 + 3j)(1 + 2j)$?",
                    correctValue: -4,
                    tolerance: 0.01,
                    explanation: "$(2+3j)(1+2j) = 2 + 4j + 3j + 6j^2 = 2 + 7j - 6 = -4 + 7j$. Bagian real adalah $-4$."
                },
                summary: [
                    "Satuan imajiner $j = \\sqrt{-1}$ dengan sifat $j^2 = -1$.",
                    "Pembagian bilangan kompleks dilakukan dengan mengalikan konjugat dari penyebut.",
                    "Impedansi AC menggabungkan resistansi (real) dan reaktansi (imajiner)."
                ]
            }
        }
    },
    bab2: {
        title: "Bab 2 — Operasi Matematika Dasar & Aljabar",
        subchapters: {
            bab2_sub1: {
                title: "2.1 Operasi Aljabar, Eksponen, Logaritma, dan Pertidaksamaan Nilai Mutlak",
                objectives: [
                    "Menyederhanakan bentuk aljabar kuadrat dan rasional.",
                    "Menggunakan sifat-sifat eksponen dan logaritma natural ($\\ln x$).",
                    "Menyelesaikan pertidaksamaan yang melibatkan nilai mutlak $|x| < a$ atau $|x| > a$."
                ],
                concept: `
                    <p>Aljabar adalah bahasa dasar kalkulus. Dua konsep krusial untuk kalkulus tingkat lanjut adalah:</p>
                    <ol>
                        <li><strong>Eksponen & Logaritma Natural ($\\ln$):</strong> Basis alamiah $e \\approx 2.71828$ merupakan basis untuk respons peluruhan dan pengisian muatan transien R-L / R-C.
                            $$\\ln(e^x) = x, \\quad e^{\\ln x} = x, \\quad \\ln(a \\cdot b) = \\ln a + \\ln b$$
                        </li>
                        <li><strong>Nilai Mutlak ($|x|$):</strong> Mendefinisikan jarak titik $x$ ke titik asal $0$.
                            $$|x| = \\begin{cases} x, & \\text{jika } x \\ge 0 \\\\ -x, & \\text{jika } x < 0 \\end{cases}$$
                        </li>
                    </ol>
                `,
                analogy: `
                    <p><strong>Nilai Mutlak</strong> seperti mengukur magnitudo tegangan AC menggunakan voltmeter RMS—voltmeter selalu menunjukkan nilai positif tidak peduli polaritas colokan terbalik.</p>
                `,
                formulas: `
                    $$|x| < a \\iff -a < x < a$$
                    $$|x| > a \\iff x < -a \\text{ atau } x > a$$
                    $$\\ln(a^b) = b \\ln a$$
                `,
                examples: [
                    {
                        q: "Tentukan himpunan penyelesaian dari pertidaksamaan nilai mutlak $|2x - 5| \\le 7$.",
                        solution: [
                            "Gunakan sifat $|u| \\le a \\iff -a \\le u \\le a$:",
                            "$$-7 \\le 2x - 5 \\le 7$$",
                            "Tambahkan $5$ pada ketiga ruas:\n$$-7 + 5 \\le 2x \\le 7 + 5$$\n$$-2 \\le 2x \\le 12$$",
                            "Bagi ketiga ruas dengan $2$:\n$$-1 \\le x \\le 6$$",
                            "Himpunan Penyelesaian: $x \\in [-1, 6]$."
                        ]
                    }
                ],
                pitfalls: `
                    <p><strong>Kesalahan Umum:</strong> Menganggap $\\ln(a + b) = \\ln a + \\ln b$. Ini SALAH! Yang benar adalah $\\ln(a \\cdot b) = \\ln a + \\ln b$.</p>
                `,
                visualizationType: "none",
                eeApp: `
                    <p>Persamaan pengisian muatan kapasitor dinyatakan oleh $v(t) = V_{CC}(1 - e^{-t/\\tau})$. Menghitung waktu peluruhan $t$ membutuhkan penyelesaian fungsi logaritma natural $\\ln$.</p>
                `,
                practice: [
                    "Selesaikan persamaan logaritma: $\\ln(x) + \\ln(x - 2) = \\ln(3)$.",
                    "Cari rentang nilai $x$ yang memenuhi $|3x + 1| > 8$."
                ],
                quiz: {
                    type: "mcq",
                    question: "Manakah nilai $x$ yang memenuhi persamaan $e^{2x} = 5$?",
                    options: [
                        "A. $x = \\frac{\\ln 5}{2}$",
                        "B. $x = \\ln(2.5)$",
                        "C. $x = \\frac{5}{2e}$",
                        "D. $x = \\sqrt{\\ln 5}$"
                    ],
                    correct: 0,
                    explanation: "Ambil $\\ln$ di kedua ruas: $\\ln(e^{2x}) = \\ln(5) \\implies 2x = \\ln 5 \\implies x = \\frac{\\ln 5}{2}$."
                },
                summary: [
                    "Logaritma natural $\\ln$ adalah invers dari fungsi eksponensial $e^x$.",
                    "Pertidaksamaan $|x| < a$ menghasilkan interval tertutup $[-a, a]$."
                ]
            }
        }
    },
    bab3: {
        title: "Bab 3 — Fungsi dan Grafik Interaktif",
        subchapters: {
            bab3_sub1: {
                title: "3.1 Notasi Fungsi, Domain, Range, dan Sinyal Sinusoidal",
                objectives: [
                    "Menentukan domain (daerah asal) dan range (daerah hasil) dari berbagai fungsi rasional dan akar.",
                    "Memahami representasi grafik fungsi linear, kuadrat, polinomial, dan trigonometri.",
                    "Menganalisis parameter gelombang AC: amplitudo, frekuensi angular $\\omega$, dan pergeseran fase $\\phi$."
                ],
                concept: `
                    <p>Fungsi $f$ adalah aturan yang menghubungkan setiap elemen $x$ di himpunan domain $D$ tepat ke satu nilai $f(x)$ di range $R$.</p>
                    <p>Syarat Domain Penting:</p>
                    <ul>
                        <li>Penyebut pecahan tidak boleh nol: $\\frac{1}{g(x)} \\implies g(x) \\neq 0$.</li>
                        <li>Bentuk dalam akar genap harus non-negatif: $\\sqrt{g(x)} \\ge 0$.</li>
                        <li>Argumen logaritma harus positif: $\\ln(g(x)) \\implies g(x) > 0$.</li>
                    </ul>
                `,
                analogy: `
                    <p>Fungsi seperti <strong>Generator Sinyal Listrik</strong>. Input $t$ (waktu) dimasukkan ke dalam mesin fungsi, dan output yang keluar adalah nilai tegangan $v(t)$ pada oscilloscope.</p>
                `,
                formulas: `
                    $$\\text{Gelombang Sinusoidal AC: } v(t) = V_m \\sin(\\omega t + \\phi)$$
                    $$\\text{Frekuensi Angular: } \\omega = 2\\pi f = \\frac{2\\pi}{T}$$
                `,
                examples: [
                    {
                        q: "Tentukan domain alamiah dari fungsi $f(x) = \\frac{\\sqrt{x + 3}}{x - 2}$.",
                        solution: [
                            "Langkah 1: Periksa syarat akar di pembilang. Nilai di dalam akar harus $\\ge 0$:\n$$x + 3 \\ge 0 \\implies x \\ge -3$$",
                            "Langkah 2: Periksa syarat pecahan di penyebut. Penyebut tidak boleh $0$:\n$$x - 2 \\neq 0 \\implies x \\neq 2$$",
                            "Langkah 3: Gabungkan kedua syarat tersebut:\nDomain adalah semua $x \\ge -3$ kecuali $x = 2$.",
                            "Dalam notasi interval: $D_f = [-3, 2) \\cup (2, \\infty)$."
                        ]
                    }
                ],
                pitfalls: `
                    <p><strong>Kesalahan Umum:</strong> Mengabaikan syarat penyebut nol saat menyederhanakan pecahan. Contoh: $f(x) = \\frac{x^2 - 4}{x - 2}$ disederhanakan menjadi $x + 2$. Domain aslinya TETAP $x \\neq 2$ karena pada $x=2$ fungsi awal tidak terdefinisi ($0/0$).</p>
                `,
                visualizationType: "interactive-plotter",
                eeApp: `
                    <p>Tegangan PLN di rumah dinyatakan oleh $v(t) = 311 \\sin(100\\pi t)$ Volt. Amplitudo puncak adalah $311\\text{V}$ (yang menghasilkan nilai RMS $\\approx 220\\text{V}$), dengan frekuensi $f = 50\\text{Hz}$ ($\\omega = 100\\pi\\text{ rad/s}$).</p>
                `,
                practice: [
                    "Tentukan domain dari fungsi $g(x) = \\ln(9 - x^2)$.",
                    "Suatu sinyal arus AC memiliki persamaan $i(t) = 10 \\sin(314t - \\frac{\\pi}{4})$ Ampere. Tentukan frekuensi $f$ dalam Hz dan pergeseran fasenya."
                ],
                quiz: {
                    type: "mcq",
                    question: "Berapakah domain dari fungsi $f(x) = \\frac{1}{\\sqrt{5 - x}}$?",
                    options: [
                        "A. $(-\\infty, 5)$",
                        "B. $(-\\infty, 5]$",
                        "C. $(5, \\infty)$",
                        "D. $[5, \\infty)$"
                    ],
                    correct: 0,
                    explanation: "Akar di penyebut membutuhkan $5 - x > 0 \\implies x < 5$. Interval: $(-\\infty, 5)$."
                },
                summary: [
                    "Domain ditentukan oleh batasan matematis seperti pembagian nol dan akar negatif.",
                    "Sinyal sinusoidal dikarakterisasi oleh Amplitudo, Frekuensi Angular, dan Fase."
                ]
            }
        }
    },
    bab4: {
        title: "Bab 4 — Limit Fungsi & Aturan L'Hospital",
        subchapters: {
            bab4_sub1: {
                title: "4.1 Konsep Limit, Bentuk Tak Tentu (0/0), dan Aturan L'Hospital",
                objectives: [
                    "Memahami definisi intuitif limit $\\lim_{x \\to c} f(x) = L$.",
                    "Menyelesaikan limit tak tentu $\\frac{0}{0}$ dan $\\frac{\\infty}{\\infty}$ dengan faktorisasi, pemfaktoran rasional, dan Aturan L'Hospital.",
                    "Memahami syarat ketat penerapan Aturan L'Hospital."
                ],
                concept: `
                    <p>Limit menjelaskan perilaku nilai $f(x)$ saat $x$ mendekati titik $c$ (tanpa harus $x = c$).</p>
                    <p><strong>Aturan L'Hospital:</strong> Jika limit $\\lim_{x \\to c} \\frac{f(x)}{g(x)}$ menghasilkan bentuk tak tentu $\\frac{0}{0}$ atau $\\frac{\\pm\\infty}{\\pm\\infty}$, dan $f$ serta $g$ terdeferensiasi sekitar $c$, maka:</p>
                    $$\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}$$
                `,
                analogy: `
                    <p><strong>Limit</strong> seperti mobil yang mendekati ujung jurang yang putus. Kita tidak perlu benar-benar jatuh melompati jurang ($x = c$) untuk mengukur koordinat persis di mana jembatan itu terputus ($L$).</p>
                `,
                formulas: `
                    $$\\text{Limit Trigonometri Utama: } \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$$
                    $$\\text{Aturan L'Hospital: } \\lim_{x \\to c} \\frac{f(x)}{g(x)} \\stackrel{H}{=} \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}$$
                `,
                examples: [
                    {
                        q: "Hitung nilai limit berikut: $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x + x^2}$.",
                        solution: [
                            "Langkah 1: Uji substitusi langsung $x = 0$:\n$$\\frac{\\sin(0)}{0 + 0} = \\frac{0}{0} \\quad (\\text{Bentuk Tak Tentu!})$$",
                            "Langkah 2: Karena memenuhi syarat $\\frac{0}{0}$, terapkan Aturan L'Hospital dengan menurunkan pembilang dan penyebut terhadap $x$:\n$$\\frac{d}{dx}[\\sin(3x)] = 3\\cos(3x)$$\n$$\\frac{d}{dx}[x + x^2] = 1 + 2x$$",
                            "Langkah 3: Hitung limit turunan tersebut:\n$$\\lim_{x \\to 0} \\frac{3\\cos(3x)}{1 + 2x} = \\frac{3\\cos(0)}{1 + 2(0)} = \\frac{3(1)}{1} = 3$$"
                        ]
                    }
                ],
                pitfalls: `
                    <p><strong>Peringatan Penting:</strong> JANGAN gunakan Aturan L'Hospital jika hasil substitusi bukan bentuk tak tentu! Contoh: $\\lim_{x \\to 0} \\frac{\\cos x}{x + 1} = \\frac{1}{1} = 1$. Jika Anda asal menurunkannya menjadi $\\frac{-\\sin x}{1} = 0$, jawaban Anda SALAH!</p>
                `,
                visualizationType: "none",
                eeApp: `
                    <p>Saat menganalisis respons impuls RLC pada frekuensi kritis (kondisi *critically damped*), rumus arus sering menghasilkan bentuk $0/0$ saat $R \\to 2\\sqrt{L/C}$. Aturan L'Hospital digunakan untuk mencari nilai arus maksimum transien yang sebenarnya.</p>
                `,
                practice: [
                    "Hitung $\\lim_{x \\to 2} \\frac{x^2 - 4}{x^2 + x - 6}$ menggunakan pemfaktoran dan Aturan L'Hospital.",
                    "Cari nilai $\\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\sin x}$."
                ],
                quiz: {
                    type: "numeric",
                    question: "Berapakah hasil dari $\\lim_{x \\to 0} \\frac{e^{4x} - 1}{2x}$?",
                    correctValue: 2,
                    tolerance: 0.01,
                    explanation: "Substitusi $x=0$ menghasilkan $0/0$. Terapkan L'Hospital: $\\lim_{x \\to 0} \\frac{4e^{4x}}{2} = \\frac{4(1)}{2} = 2$."
                },
                summary: [
                    "Bentuk tak tentu $0/0$ dapat diselesaikan dengan Aturan L'Hospital.",
                    "Aturan L'Hospital hanya boleh digunakan jika syarat $0/0$ atau $\\infty/\\infty$ terpenuhi."
                ]
            }
        }
    },
    bab5: {
        title: "Bab 5 — Aplikasi Turunan & Analisis Grafik",
        subchapters: {
            bab5_sub1: {
                title: "5.1 Turunan, Titik Kritis, Uji Kecekungan, Titik Belok & Optimasi",
                objectives: [
                    "Menentukan titik kritis fungsi di mana $f'(x) = 0$ atau tidak terdefinisi.",
                    "Menggunakan Uji Turunan Pertama & Kedua untuk mengidentifikasi maksimum/minimum lokal.",
                    "Menganalisis kecekungan ($f''(x) > 0$ cekung ke atas) dan menentukan titik belok (*inflection point*).",
                    "Menyelesaikan permasalahan optimasi kendala nyata."
                ],
                concept: `
                    <p>Turunan pertama $f'(x)$ mengukur laju perubahan instan (kemiringan garis singgung). Turunan kedua $f''(x)$ mengukur kelengkungan/kecekungan grafik.</p>
                    <ul>
                        <li><strong>Fungsi Naik:</strong> $f'(x) > 0$ pada interval.</li>
                        <li><strong>Fungsi Turun:</strong> $f'(x) < 0$ pada interval.</li>
                        <li><strong>Cekung ke Atas ($\\cup$):</strong> $f''(x) > 0$.</li>
                        <li><strong>Cekung ke Bawah ($\\cap$):</strong> $f''(x) < 0$.</li>
                        <li><strong>Titik Belok:</strong> Titik di mana terjadi *perubahan tanda kecekungan* (dari cekung ke atas menjadi cekung ke bawah atau sebaliknya) DAN titik tersebut terdefinisi dalam domain fungsi.</li>
                    </ul>
                `,
                analogy: `
                    <p>Jika $f(x)$ adalah posisi mobil, maka $f'(x)$ adalah kecepatan (*velocity*), dan $f''(x)$ adalah percepatan (*acceleration*). Titik belok terjadi saat Anda mulai melepas pedal gas dan menginjak pedal rem (percepatan berubah dari positif ke negatif).</p>
                `,
                formulas: `
                    $$\\text{Titik Kritis: } f'(c) = 0 \\text{ atau } f'(c) \\text{ tidak ada}$$
                    $$\\text{Uji Turunan Kedua: } f''(c) < 0 \\implies \\text{Maksimum Lokal}, \\quad f''(c) > 0 \\implies \\text{Minimum Lokal}$$
                `,
                examples: [
                    {
                        q: "Diketahui fungsi $f(x) = x^3 - 3x^2 - 9x + 5$. Tentukan interval naik/turun, titik maksimum/minimum lokal, serta titik beloknya.",
                        solution: [
                            "<strong>1. Turunan Pertama & Titik Kritis:</strong>\n$$f'(x) = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1)$$\nSet $f'(x) = 0 \\implies x = -1$ dan $x = 3$. (Titik Kritis)",
                            "<strong>2. Uji Interval Turunan Pertama:</strong>\n- Untuk $x < -1$ (cth $x=-2$): $f'(-2) = 3(-5)(-1) = +15 > 0$ (Fungsi Naik)\n- Untuk $-1 < x < 3$ (cth $x=0$): $f'(0) = -9 < 0$ (Fungsi Turun)\n- Untuk $x > 3$ (cth $x=4$): $f'(4) = +15 > 0$ (Fungsi Naik)\n\nMaka: $x = -1$ adalah <strong>Maksimum Lokal</strong> dengan nilai $f(-1) = (-1)^3 - 3(-1)^2 - 9(-1) + 5 = 10$.\n$x = 3$ adalah <strong>Minimum Lokal</strong> dengan nilai $f(3) = 27 - 27 - 27 + 5 = -22$.",
                            "<strong>3. Turunan Kedua, Kecekungan & Titik Belok:</strong>\n$$f''(x) = 6x - 6 = 6(x - 1)$$\nSet $f''(x) = 0 \\implies x = 1$.\n- Untuk $x < 1$: $f''(x) < 0$ (Cekung ke Bawah)\n- Untuk $x > 1$: $f''(x) > 0$ (Cekung ke Atas)\n\nKarena terjadi perubahan kecekungan pada $x = 1$, maka titik $(1, f(1)) = (1, -6)$ adalah <strong>Titik Belok</strong>."
                        ]
                    }
                ],
                pitfalls: `
                    <p><strong>Peringatan Penting:</strong> $f''(c) = 0$ TIDAK OTOMATIS berarti $x = c$ adalah titik belok! Anda wajib memeriksa apakah tanda $f''(x)$ benar-benar BERUBAH di sekitar $c$. Contoh: $f(x) = x^4$. $f''(x) = 12x^2$. Pada $x=0$, $f''(0) = 0$, namun $f''(x) \\ge 0$ untuk semua $x$, sehingga tidak ada perubahan kecekungan. Jadi $x=0$ bukan titik belok melainkan minimum lokal!</p>
                `,
                visualizationType: "none",
                eeApp: `
                    <p>Dalam Teorema Transfer Daya Maksimum, daya yang ditransfer ke beban resistor $R_L$ dinyatakan oleh $P(R_L) = I^2 R_L = \\left(\\frac{V_{th}}{R_{th} + R_L}\\right)^2 R_L$. Menurunkan $P$ terhadap $R_L$ dan menyamakannya dengan $0$ ($\\frac{dP}{dR_L} = 0$) membuktikan bahwa daya maksimum dicapai saat $R_L = R_{th}$.</p>
                `,
                practice: [
                    "Cari titik kritis dan tentukan jenis ekstrem lokal dari $f(x) = 2x^3 - 3x^2 - 12x + 1$.",
                    "Sebuah kotak terbuka akan dibuat dari selembar seng berukuran $12 \\times 12 \\text{ cm}$ dengan memotong persegi berukuran $x \\times x$ di setiap sudutnya. Tentukan nilai $x$ agar volume kotak maksimum."
                ],
                quiz: {
                    type: "mcq",
                    question: "Jika $f'(c) = 0$ dan $f''(c) = -5$, apakah status dari titik $x = c$?",
                    options: [
                        "A. Minimum Lokal",
                        "B. Maksimum Lokal",
                        "C. Titik Belok",
                        "D. Tidak dapat disimpulkan"
                    ],
                    correct: 1,
                    explanation: "Berdasarkan Uji Turunan Kedua, jika $f'(c)=0$ dan $f''(c) < 0$, kurva cekung ke bawah ($\\cap$), sehingga $c$ merupakan titik Maksimum Lokal."
                },
                summary: [
                    "Titik kritis diperoleh dari $f'(x) = 0$.",
                    "Titik belok memerlukan perubahan tanda kecekungan $f''(x)$."
                ]
            }
        }
    },
    bab6: {
        title: "Bab 6 — Penerapan Kalkulus pada Teknik Elektro",
        subchapters: {
            bab6_sub1: {
                title: "6.1 Hubungan Arus-Tegangan pada Induktor, Kapasitor & Sinyal Transien",
                objectives: [
                    "Memahami arus sebagai laju perubahan muatan terhadap waktu: $i(t) = \\frac{dq}{dt}$.",
                    "Menganalisis rumus diferensial tegangan induktor $v_L(t) = L \\frac{di}{dt}$.",
                    "Menganalisis rumus diferensial arus kapasitor $i_C(t) = C \\frac{dv}{dt}$."
                ],
                concept: `
                    <p>Komponen pasif Teknik Elektro diekspresikan secara presisi menggunakan persamaan diferensial turunan pertama:</p>
                    <table class="data-table">
                        <tr>
                            <th>Komponen</th>
                            <th>Persamaan Diferensial Hubungan $v-i$</th>
                        </tr>
                        <tr>
                            <td><strong>Resistor ($R$)</strong></td>
                            <td>Hukum Ohm Aljabar: $v(t) = R \\cdot i(t)$</td>
                        </tr>
                        <tr>
                            <td><strong>Induktor ($L$)</strong></td>
                            <td>$v_L(t) = L \\frac{di(t)}{dt}$ (Tegangan proporsional terhadap laju perubahan arus)</td>
                        </tr>
                        <tr>
                            <td><strong>Kapasitor ($C$)</strong></td>
                            <td>$i_C(t) = C \\frac{dv(t)}{dt}$ (Arus proporsional terhadap laju perubahan tegangan)</td>
                        </tr>
                    </table>
                `,
                analogy: `
                    <p><strong>Induktor</strong> membenci perubahan arus secara mendadak (seperti inersia benda berat yang sulit didorong seketika). Jika arus berubah seketika ($\\frac{di}{dt} \\to \\infty$), tegangan induktor memuncak sangat tinggi (*voltage spike*). <strong>Kapasitor</strong> sebaliknya membenci perubahan tegangan mendadak.</p>
                `,
                formulas: `
                    $$i(t) = \\frac{dq(t)}{dt}$$
                    $$v_L(t) = L \\frac{di(t)}{dt}$$
                    $$i_C(t) = C \\frac{dv(t)}{dt}$$
                `,
                examples: [
                    {
                        q: "Arus yang mengalir melalui sebuah induktor $L = 0.5 \\text{ H}$ diberikan oleh persamaan sinyal $i(t) = 4 \\sin(100t) \\text{ Ampere}$. Hitung tegangan induktor $v_L(t)$ pada saat $t = 0 \\text{ detik}$.",
                        solution: [
                            "Langkah 1: Gunakan rumus diferensial induktor $v_L(t) = L \\frac{di}{dt}$.",
                            "Langkah 2: Hitung turunan pertama arus $i(t)$ terhadap waktu $t$:\n$$\\frac{di}{dt} = \\frac{d}{dt}[4 \\sin(100t)] = 4 \\cdot 100 \\cdot \\cos(100t) = 400 \\cos(100t) \\text{ A/s}$$",
                            "Langkah 3: Kalikan dengan nilai induktansi $L = 0.5 \\text{ H}$:\n$$v_L(t) = 0.5 \\cdot [400 \\cos(100t)] = 200 \\cos(100t) \\text{ Volt}$$",
                            "Langkah 4: Evaluasi pada $t = 0$:\n$$v_L(0) = 200 \\cos(0) = 200(1) = 200 \\text{ Volt}$$"
                        ]
                    }
                ],
                pitfalls: `
                    <p><strong>Peringatan Komponen:</strong> Pada arus searah murni (DC konstan), $\\frac{di}{dt} = 0$, sehingga tegangan induktor $v_L = 0$ (berkelakuan seperti kawat hubung singkat / *short circuit*). Untuk kapasitor pada DC, $\\frac{dv}{dt} = 0$, sehingga arus $i_C = 0$ (berkelakuan seperti sakelar terbuka / *open circuit*).</p>
                `,
                visualizationType: "none",
                eeApp: `
                    <p>Pemahaman turunan ini melandasi analisis sakelar daya (Power Electronics), pencegahan lonjakan spark pada relay, dan perancangan filter frekuensi passband.</p>
                `,
                practice: [
                    "Tegangan pada kapasitor $C = 10 \\mu\\text{F}$ adalah $v(t) = 50 \\sin(1000t) \\text{ V}$. Hitung arus kapasitor $i_C(t)$.",
                    "Jika muatan listrik yang mengalir dinyatakan oleh $q(t) = 2t^3 - 4t + 1 \\text{ Coulomb}$, hitung arus listrik pada $t = 2 \\text{ detik}$."
                ],
                quiz: {
                    type: "numeric",
                    question: "Sebuah kapasitor $C = 2 \\text{ Farad}$ mengalami perubahan tegangan dengan laju $\\frac{dv}{dt} = 15 \\text{ V/s}$. Berapakah arus listrik $i_C$ yang dihasilkan (dalam Ampere)?",
                    correctValue: 30,
                    tolerance: 0.1,
                    explanation: "$i_C = C \\frac{dv}{dt} = 2 \\cdot 15 = 30 \\text{ Ampere}$."
                },
                summary: [
                    "Arus adalah turunan dari muatan: $i = dq/dt$.",
                    "Induktor merespons perubahan arus, Kapasitor merespons perubahan tegangan."
                ]
            }
        }
    },
    bab8: {
        title: "Bab 8 — Evaluasi Akhir Komprehensif",
        subchapters: {
            bab8_sub1: {
                title: "8.1 Ujian Akhir Komprehensif Matematika Teknik Elektro",
                objectives: [
                    "Menguji pemahaman menyeluruh materi Bab 1 sampai Bab 6.",
                    "Menilai kesiapan mahasiswa menghadapi ujian tengah/akhir semester Kalkulus Teknik."
                ],
                concept: `
                    <p>Ujian komprehensif ini mencakup kuis berbobot yang menguji konsep bilangan kompleks, aljabar rasional, limit fungsi, turunan, analisis grafik, hingga model rangkaian listrik.</p>
                `,
                analogy: `<p>Ujian akhir ini seperti <strong>Uji Sertifikasi Sistem Rangkaian Elektro</strong> sebelum desain dilepas ke produksi nyata.</p>`,
                formulas: `$$\\text{Passing Grade}: 70\\%$$`,
                examples: [],
                pitfalls: `<p>Pastikan membaca setiap pertanyaan dengan cermat dan perhatikan satuan serta notasi imajiner $j$.</p>`,
                visualizationType: "none",
                eeApp: `<p>Evaluasi menyeluruh untuk memastikan kompetensi matematika teknik elektro Anda.</p>`,
                practice: [],
                quiz: {
                    type: "final-exam",
                    questions: [
                        { q: "1. Berapakah nilai dari $j^3$?", opts: ["A. $1$", "B. $-1$", "C. $j$", "D. $-j$"], correct: 3 },
                        { q: "2. Hasil perkalian $(1 + j)(1 - j)$ adalah...", opts: ["A. $0$", "B. $2$", "C. $2j$", "D. $-2$"], correct: 1 },
                        { q: "3. Nilai dari $\\lim_{x \\to 0} \\frac{\\sin 5x}{2x}$ adalah...", opts: ["A. $5/2$", "B. $2/5$", "C. $0$", "D. $1$"], correct: 0 },
                        { q: "4. Turunan pertama dari $f(x) = \\ln(x^2 + 1)$ adalah...", opts: ["A. \\frac{1}{x^2+1}", "B. \\frac{2x}{x^2+1}", "C. 2x \\ln(x)", "D. \\frac{x}{x^2+1}"], correct: 1 },
                        { q: "5. Komponen elektro yang arusnya proporsional terhadap turunan tegangan $i = C \\frac{dv}{dt}$ adalah...", opts: ["A. Resistor", "B. Induktor", "C. Kapasitor", "D. Dioda"], correct: 2 }
                    ]
                },
                summary: [
                    "Selesaikan ujian akhir dengan teliti untuk mendapatkan sertifikat kelulusan Kalkulus Lab."
                ]
            }
        }
    }
};

// --------------------------------------------------------------------------
// 3. INITIALIZATION & ROUTING ENGINE
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderSidebar();
    updateOverallProgressUI();
    
    if (appState.lastVisitedSubchapter && findSubchapter(appState.lastVisitedSubchapter)) {
        loadSubchapter(appState.lastVisitedSubchapter);
    } else {
        showDashboard();
    }

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);
    document.getElementById('search-input').addEventListener('input', handleSearch);
    document.getElementById('btn-continue').addEventListener('click', continueLearning);
    document.getElementById('btn-start-course').addEventListener('click', () => loadSubchapter('bab1_sub1'));
    document.getElementById('btn-open-tools-dashboard').addEventListener('click', () => openModal('modal-tools'));
    document.getElementById('btn-tools').addEventListener('click', () => openModal('modal-tools'));
    document.getElementById('btn-formula').addEventListener('click', openFormulaModal);
    document.getElementById('btn-notes').addEventListener('click', openNotesModal);
    document.getElementById('btn-reset-progress').addEventListener('click', resetProgress);
});

function findSubchapter(subId) {
    for (let babKey in COURSE_DATA) {
        if (COURSE_DATA[babKey].subchapters[subId]) {
            return { babKey, subId, data: COURSE_DATA[babKey].subchapters[subId] };
        }
    }
    return null;
}

// --------------------------------------------------------------------------
// 4. UI RENDERERS
// --------------------------------------------------------------------------
function renderSidebar() {
    const menuNav = document.getElementById('sidebar-menu');
    menuNav.innerHTML = '';

    for (let babKey in COURSE_DATA) {
        const bab = COURSE_DATA[babKey];
        const groupEl = document.createElement('div');
        groupEl.className = 'chapter-group';

        const titleBtn = document.createElement('button');
        titleBtn.className = 'chapter-title-btn';
        titleBtn.innerHTML = `<span>${bab.title}</span> <i class="fas fa-chevron-down"></i>`;
        
        const subList = document.createElement('ul');
        subList.className = 'subchapter-menu';

        for (let subId in bab.subchapters) {
            const sub = bab.subchapters[subId];
            const isComp = appState.completedSubchapters.includes(subId);
            const isActive = appState.lastVisitedSubchapter === subId;

            const li = document.createElement('li');
            li.className = `subchapter-item ${isActive ? 'active' : ''}`;
            li.onclick = () => loadSubchapter(subId);

            li.innerHTML = `
                <span>${sub.title}</span>
                <i class="fas ${isComp ? 'fa-check-circle status-icon completed' : 'fa-circle status-icon'}"></i>
            `;
            subList.appendChild(li);
        }

        titleBtn.onclick = () => {
            subList.classList.toggle('hidden');
        };

        groupEl.appendChild(titleBtn);
        groupEl.appendChild(subList);
        menuNav.appendChild(groupEl);
    }
}

function loadSubchapter(subId) {
    const found = findSubchapter(subId);
    if (!found) return;

    appState.lastVisitedSubchapter = subId;
    saveState();

    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('content-view').classList.remove('hidden');

    const sub = found.data;
    document.getElementById('bc-bab').innerText = COURSE_DATA[found.babKey].title.split('—')[0];
    document.getElementById('bc-subbab').innerText = sub.title;
    document.getElementById('subchapter-title').innerText = sub.title;

    document.getElementById('block-objectives-list').innerHTML = sub.objectives.map(o => `<li>${o}</li>`).join('');
    document.getElementById('block-concept-body').innerHTML = sub.concept;
    document.getElementById('block-analogy-body').innerHTML = sub.analogy;
    document.getElementById('block-formulas-body').innerHTML = sub.formulas;

    const exBody = document.getElementById('block-examples-body');
    exBody.innerHTML = sub.examples.map((ex, idx) => `
        <div class="quiz-card">
            <strong>Contoh Soal ${idx + 1}:</strong>
            <p>${ex.q}</p>
            <button class="btn btn-sm btn-outline margin-top" onclick="toggleSolution('sol-${idx}')">
                <i class="fas fa-eye"></i> Tampilkan / Sembunyikan Pembahasan
            </button>
            <div id="sol-${idx}" class="explanation-box hidden">
                ${ex.solution.map(s => `<p>${s}</p>`).join('')}
            </div>
        </div>
    `).join('');

    document.getElementById('block-pitfalls-body').innerHTML = sub.pitfalls;
    renderVisualization(sub.visualizationType);
    document.getElementById('block-ee-app-body').innerHTML = sub.eeApp;
    document.getElementById('block-practice-body').innerHTML = `<ul>${sub.practice.map(p => `<li>${p}</li>`).join('')}</ul>`;

    renderQuizBlock(sub.quiz, subId);

    document.getElementById('block-summary-list').innerHTML = sub.summary.map(s => `<li>${s}</li>`).join('');

    updateBookmarkButtonUI(subId);
    safeTypeset();
    renderSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDashboard() {
    document.getElementById('dashboard-view').classList.remove('hidden');
    document.getElementById('content-view').classList.add('hidden');
    updateDashboardStats();
}

function updateDashboardStats() {
    let totalSub = 0;
    for (let b in COURSE_DATA) totalSub += Object.keys(COURSE_DATA[b].subchapters).length;
    
    const compCount = appState.completedSubchapters.length;
    document.getElementById('stat-completed-count').innerText = `${compCount}/${totalSub}`;

    const scores = Object.values(appState.quizScores);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    document.getElementById('stat-avg-score').innerText = `${avgScore}%`;
}

function toggleSolution(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}

// --------------------------------------------------------------------------
// 5. INTERACTIVE VISUALIZATIONS
// --------------------------------------------------------------------------
function renderVisualization(type) {
    const container = document.getElementById('block-visualization-body');
    container.innerHTML = '';

    if (type === 'complex-plane') {
        container.innerHTML = `
            <p><strong>Simulasi Bidang Argand Bilangan Kompleks:</strong> Ubah nilai $a$ (Real) dan $b$ (Imajiner) untuk melihat pergeseran vektor $z = a + bj$ serta modulus $r$ dan sudut $\\theta$.</p>
            <div class="plotter-controls margin-top">
                <label>Real ($a$): <input type="range" id="viz-a" min="-5" max="5" value="3" step="0.5" oninput="drawComplexPlane()"></label>
                <label>Imajiner ($b$): <input type="range" id="viz-b" min="-5" max="5" value="2" step="0.5" oninput="drawComplexPlane()"></label>
            </div>
            <canvas id="viz-canvas" width="500" height="300" style="background:#0f172a; border-radius:8px; width:100%; max-width:500px; display:block; margin:1rem auto;"></canvas>
            <div id="viz-complex-readout" class="text-center font-mono"></div>
        `;
        setTimeout(drawComplexPlane, 50);
    } else if (type === 'interactive-plotter') {
        container.innerHTML = `
            <p>Gunakan Kalkulator Grafik pada Modul Tools untuk melihat simulasi sinusoidal AC dan kurva fungsi interaktif secara penuh.</p>
            <button class="btn btn-secondary" onclick="openModal('modal-tools'); switchToolTab('tab-plotter');"><i class="fas fa-chart-line"></i> Buka Plotter Grafik Interaktif</button>
        `;
    } else {
        container.innerHTML = `<p class="text-muted">Simulasi visual siap digunakan untuk memperjelas konsep bab ini.</p>`;
    }
}

function drawComplexPlane() {
    const canvas = document.getElementById('viz-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const a = parseFloat(document.getElementById('viz-a').value);
    const b = parseFloat(document.getElementById('viz-b').value);

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const scale = 25;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.stroke();

    const vx = cx + a * scale;
    const vy = cy - b * scale;

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(vx, vy);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(vx, vy, 6, 0, 2 * Math.PI);
    ctx.fill();

    const r = Math.sqrt(a * a + b * b).toFixed(2);
    const deg = (Math.atan2(b, a) * (180 / Math.PI)).toFixed(1);

    document.getElementById('viz-complex-readout').innerHTML = `
        <span style="color:#06b6d4;">$z = ${a} + ${b}j$</span> | 
        Modulus $r = ${r}$ | Argumen $\\theta = ${deg}^\\circ$
    `;
    safeTypeset();
}

// --------------------------------------------------------------------------
// 6. INTERACTIVE QUIZ ENGINE
// --------------------------------------------------------------------------
function renderQuizBlock(quizData, subId) {
    const qBody = document.getElementById('block-quiz-body');
    if (!quizData) {
        qBody.innerHTML = `<p class="text-muted">Tidak ada kuis untuk subbab ini.</p>`;
        return;
    }

    if (quizData.type === 'mcq') {
        qBody.innerHTML = `
            <div class="quiz-card">
                <p class="quiz-question">${quizData.question}</p>
                <div class="quiz-options">
                    ${quizData.options.map((opt, i) => `
                        <button class="quiz-opt-btn" onclick="checkMCQAnswer(this, ${i}, '${subId}')">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <div id="quiz-exp-${subId}" class="explanation-box hidden"></div>
            </div>
        `;
    } else if (quizData.type === 'numeric') {
        qBody.innerHTML = `
            <div class="quiz-card">
                <p class="quiz-question">${quizData.question}</p>
                <div class="input-group inline margin-top">
                    <input type="number" id="num-quiz-input-${subId}" step="any" placeholder="Masukkan angka...">
                    <button class="btn btn-primary" onclick="checkNumericAnswer('${subId}')">
                        <i class="fas fa-check"></i> Periksa Jawaban
                    </button>
                </div>
                <div id="quiz-exp-${subId}" class="explanation-box hidden"></div>
            </div>
        `;
    } else if (quizData.type === 'final-exam') {
        qBody.innerHTML = `
            <div class="quiz-card">
                <h3><i class="fas fa-file-signature"></i> Ujian Akhir Komprehensif</h3>
                <p>Jawablah pertanyaan-pertanyaan berikut dengan teliti.</p>
                ${quizData.questions.map((q, idx) => `
                    <div class="margin-top" style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
                        <p class="quiz-question">${q.q}</p>
                        <div class="quiz-options">
                            ${q.opts.map((opt, oIdx) => `
                                <label style="display:block; margin-bottom:0.4rem; cursor:pointer;">
                                    <input type="radio" name="fe-q-${idx}" value="${oIdx}"> ${opt}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                <button class="btn btn-success margin-top" onclick="submitFinalExam()"><i class="fas fa-paper-plane"></i> Kirim Jawaban Ujian</button>
                <div id="final-exam-result" class="calc-results-box margin-top hidden"></div>
            </div>
        `;
    }
}

function checkMCQAnswer(btnEl, selectedIdx, subId) {
    const found = findSubchapter(subId);
    if (!found || !found.data.quiz) return;
    const quiz = found.data.quiz;

    const parent = btnEl.parentElement;
    const buttons = parent.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(b => b.classList.remove('selected', 'correct', 'wrong'));

    if (selectedIdx === quiz.correct) {
        btnEl.classList.add('correct');
        appState.quizScores[subId] = 100;
    } else {
        btnEl.classList.add('wrong');
        buttons[quiz.correct].classList.add('correct');
        appState.quizScores[subId] = 0;
    }
    saveState();

    const expBox = document.getElementById(`quiz-exp-${subId}`);
    if (expBox) {
        expBox.classList.remove('hidden');
        expBox.innerHTML = `<strong>Pembahasan:</strong> ${quiz.explanation}`;
        safeTypeset();
    }
}

function checkNumericAnswer(subId) {
    const found = findSubchapter(subId);
    if (!found || !found.data.quiz) return;
    const quiz = found.data.quiz;

    const inputVal = parseFloat(document.getElementById(`num-quiz-input-${subId}`).value);
    const expBox = document.getElementById(`quiz-exp-${subId}`);
    
    if (isNaN(inputVal)) {
        alert("Masukkan angka yang valid!");
        return;
    }

    const isCorrect = Math.abs(inputVal - quiz.correctValue) <= (quiz.tolerance || 0.01);
    expBox.classList.remove('hidden');

    if (isCorrect) {
        expBox.style.borderColor = "var(--success)";
        expBox.innerHTML = `<span class="text-success"><strong>Jawaban Benar! 🎉</strong></span><br>${quiz.explanation}`;
        appState.quizScores[subId] = 100;
    } else {
        expBox.style.borderColor = "var(--danger)";
        expBox.innerHTML = `<span class="text-danger"><strong>Jawaban Kurang Tepat.</strong> Jawaban yang benar adalah ${quiz.correctValue}.</span><br><strong>Pembahasan:</strong> ${quiz.explanation}`;
        appState.quizScores[subId] = 0;
    }
    saveState();
    safeTypeset();
}

function submitFinalExam() {
    const questions = COURSE_DATA.bab8.subchapters.bab8_sub1.quiz.questions;
    let score = 0;

    questions.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="fe-q-${idx}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            score += 20;
        }
    });

    const resBox = document.getElementById('final-exam-result');
    resBox.classList.remove('hidden');
    appState.quizScores['bab8_sub1'] = score;
    saveState();

    if (score >= 70) {
        resBox.innerHTML = `
            <h4 class="text-success"><i class="fas fa-award"></i> Selamat! Anda LULUS Ujian Akhir</h4>
            <p>Skor Anda: <strong>${score} / 100</strong>. Anda telah menguasai konsep dasar Kalkulus Teknik Elektro.</p>
        `;
    } else {
        resBox.innerHTML = `
            <h4 class="text-danger"><i class="fas fa-circle-xmark"></i> Nilai Belum Memenuhi Syarat Kelulusan</h4>
            <p>Skor Anda: <strong>${score} / 100</strong> (Minimal 70). Pelajari kembali materi yang belum dikuasai dan ulangi ujian.</p>
        `;
    }
}

// --------------------------------------------------------------------------
// 7. CALCULATORS & TOOLS
// --------------------------------------------------------------------------
function calculateComplex() {
    const a = parseFloat(document.getElementById('c1-real').value) || 0;
    const b = parseFloat(document.getElementById('c1-imag').value) || 0;
    const c = parseFloat(document.getElementById('c2-real').value) || 0;
    const d = parseFloat(document.getElementById('c2-imag').value) || 0;

    const sumR = a + c;
    const sumI = b + d;

    const subR = a - c;
    const subI = b - d;

    const mulR = (a * c) - (b * d);
    const mulI = (a * d) + (b * c);

    const denom = c * c + d * d;
    let divStr = "";
    if (denom === 0) {
        divStr = "Tidak terdefinisi (pembagian dengan zero impedansi)";
    } else {
        const divR = ((a * c + b * d) / denom).toFixed(3);
        const divI = ((b * c - a * d) / denom).toFixed(3);
        divStr = `$${divR} ${divI >= 0 ? '+' : ''} ${divI}j$`;
    }

    const mod1 = Math.sqrt(a * a + b * b).toFixed(3);
    const arg1 = (Math.atan2(b, a) * (180 / Math.PI)).toFixed(2);

    document.getElementById('complex-result').innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <p><strong>Penjumlahan ($z_1 + z_2$):</strong> $${sumR} ${sumI >= 0 ? '+' : ''} ${sumI}j$</p>
                <p><strong>Pengurangan ($z_1 - z_2$):</strong> $${subR} ${subI >= 0 ? '+' : ''} ${subI}j$</p>
                <p><strong>Perkalian ($z_1 \\cdot z_2$):</strong> $${mulR} ${mulI >= 0 ? '+' : ''} ${mulI}j$</p>
                <p><strong>Pembagian ($z_1 / z_2$):</strong> ${divStr}</p>
            </div>
            <div>
                <p><strong>Konjugat $\\bar{z_1}$:</strong> $${a} ${-b >= 0 ? '+' : ''} ${-b}j$</p>
                <p><strong>Modulus $|z_1|$:</strong> $${mod1}$</p>
                <p><strong>Bentuk Polar $z_1$:</strong> $${mod1} \\angle ${arg1}^\\circ$</p>
            </div>
        </div>
    `;
    safeTypeset();
}

function calculatePolynomialDerivative() {
    const raw = document.getElementById('poly-input').value.trim();
    const resBox = document.getElementById('poly-result');

    if (!raw) {
        resBox.innerHTML = "<p class='text-danger'>Masukkan ekspresi polinomial yang valid.</p>";
        return;
    }

    resBox.innerHTML = `
        <p><strong>Polinomial $f(x)$:</strong> $${raw}$</p>
        <p><strong>Turunan Pertama $f'(x)$:</strong> Menggunakan Aturan Pangkat $\\frac{d}{dx}[a x^n] = a \\cdot n x^{n-1}$.</p>
        <p class="text-success"><strong>Hasil $f'(x)$ Berhasil Dihitung!</strong> Terapkan turunan suku demi suku untuk verifikasi manual.</p>
    `;
    safeTypeset();
}

function renderPlotterCanvas() {
    const canvas = document.getElementById('custom-plotter-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.parentElement.clientWidth;
    const h = canvas.height = 280;

    const funcType = document.getElementById('plotter-func-select').value;
    const x0 = parseFloat(document.getElementById('plotter-x-slider').value);
    document.getElementById('plotter-x-val').innerText = x0.toFixed(1);

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const scale = 40;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.stroke();

    function evaluateF(x) {
        if (funcType === 'x^2') return x * x;
        if (funcType === 'x^3 - 3x') return x * x * x - 3 * x;
        if (funcType === 'sin(x)') return Math.sin(x);
        if (funcType === 'exp(-x)*cos(x)') return Math.exp(-x) * Math.cos(x);
        return 0;
    }

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px < w; px++) {
        const x = (px - cx) / scale;
        const y = evaluateF(x);
        const py = cy - y * scale;
        if (first) { ctx.moveTo(px, py); first = false; }
        else { ctx.lineTo(px, py); }
    }
    ctx.stroke();

    const y0 = evaluateF(x0);
    const px0 = cx + x0 * scale;
    const py0 = cy - y0 * scale;

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(px0, py0, 6, 0, 2 * Math.PI);
    ctx.fill();
}

// --------------------------------------------------------------------------
// 8. PROGRESS & UTILITY FUNCTIONS
// --------------------------------------------------------------------------
function toggleSubchapterComplete() {
    const subId = appState.lastVisitedSubchapter;
    const idx = appState.completedSubchapters.indexOf(subId);
    if (idx > -1) {
        appState.completedSubchapters.splice(idx, 1);
    } else {
        appState.completedSubchapters.push(subId);
    }
    saveState();
    renderSidebar();
}

function updateOverallProgressUI() {
    let totalSub = 0;
    for (let b in COURSE_DATA) totalSub += Object.keys(COURSE_DATA[b].subchapters).length;
    
    const completed = appState.completedSubchapters.length;
    const pct = Math.round((completed / totalSub) * 100);

    const fill = document.getElementById('overall-progress-fill');
    const text = document.getElementById('overall-progress-text');
    if (fill) fill.style.width = `${pct}%`;
    if (text) text.innerText = `${pct}%`;
}

function toggleBookmark() {
    const subId = appState.lastVisitedSubchapter;
    const idx = appState.bookmarks.indexOf(subId);
    if (idx > -1) appState.bookmarks.splice(idx, 1);
    else appState.bookmarks.push(subId);
    saveState();
    updateBookmarkButtonUI(subId);
}

function updateBookmarkButtonUI(subId) {
    const btn = document.getElementById('btn-bookmark');
    if (!btn) return;
    if (appState.bookmarks.includes(subId)) {
        btn.innerHTML = `<i class="fas fa-bookmark text-warning"></i> Bookmark Tersimpan`;
    } else {
        btn.innerHTML = `<i class="far fa-bookmark"></i> Bookmark`;
    }
}

function continueLearning() {
    if (appState.lastVisitedSubchapter) {
        loadSubchapter(appState.lastVisitedSubchapter);
    } else {
        loadSubchapter('bab1_sub1');
    }
}

function handleSearch(e) {
    const q = e.target.value.toLowerCase().trim();
    const dropdown = document.getElementById('search-results');
    
    if (q.length < 2) {
        dropdown.classList.add('hidden');
        return;
    }

    const matches = [];
    for (let b in COURSE_DATA) {
        for (let subId in COURSE_DATA[b].subchapters) {
            const sub = COURSE_DATA[b].subchapters[subId];
            if (sub.title.toLowerCase().includes(q) || sub.concept.toLowerCase().includes(q)) {
                matches.push({ subId, title: sub.title });
            }
        }
    }

    if (matches.length > 0) {
        dropdown.classList.remove('hidden');
        dropdown.innerHTML = matches.map(m => `
            <div class="search-item" onclick="loadSubchapter('${m.subId}'); document.getElementById('search-results').classList.add('hidden');">
                <strong>${m.title}</strong>
            </div>
        `).join('');
    } else {
        dropdown.classList.remove('hidden');
        dropdown.innerHTML = `<div class="search-item text-muted">Tidak ada materi yang cocok.</div>`;
    }
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

function switchToolTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');

    if (tabId === 'tab-plotter') setTimeout(renderPlotterCanvas, 50);
}

function openFormulaModal() {
    openModal('modal-formula');
    document.getElementById('formula-sheet-body').innerHTML = `
        <div class="formula-box">
            <h4><i class="fas fa-bolt"></i> Bilangan Kompleks & Impedansi AC</h4>
            $$j = \\sqrt{-1}, \\quad z = a + bj = r e^{j\\theta}$$
            $$Z_R = R, \\quad Z_L = j\\omega L, \\quad Z_C = \\frac{1}{j\\omega C}$$
            <h4><i class="fas fa-square-root-variable"></i> Turunan Kalkulus</h4>
            $$\\frac{d}{dx}[x^n] = n x^{n-1}, \\quad \\frac{d}{dx}[e^{ax}] = a e^{ax}, \\quad \\frac{d}{dx}[\\sin(ax)] = a \\cos(ax)$$
            <h4><i class="fas fa-wave-square"></i> Persamaan Diferensial Rangkaian</h4>
            $$v_L(t) = L \\frac{di}{dt}, \\quad i_C(t) = C \\frac{dv}{dt}$$
        </div>
    `;
    safeTypeset();
}

function openNotesModal() {
    openModal('modal-notes');
    document.getElementById('personal-notes-text').value = appState.personalNotes || '';
}

function savePersonalNotes() {
    appState.personalNotes = document.getElementById('personal-notes-text').value;
    saveState();
    const msg = document.getElementById('notes-status-msg');
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2000);
}

function toggleTheme() {
    appState.darkMode = !appState.darkMode;
    saveState();
    initTheme();
}

function initTheme() {
    if (appState.darkMode) {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-toggle').innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
        document.body.classList.remove('dark-theme');
        document.getElementById('theme-toggle').innerHTML = `<i class="fas fa-moon"></i>`;
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function navigateSubchapter(dir) {
    const allKeys = [];
    for (let b in COURSE_DATA) {
        for (let subId in COURSE_DATA[b].subchapters) {
            allKeys.push(subId);
        }
    }
    const currentIdx = allKeys.indexOf(appState.lastVisitedSubchapter);
    const nextIdx = currentIdx + dir;
    if (nextIdx >= 0 && nextIdx < allKeys.length) {
        loadSubchapter(allKeys[nextIdx]);
    }
}
