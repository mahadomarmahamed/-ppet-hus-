
/* =========================
   LBS INTERACTIVE WEBSITE
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const hero = document.querySelector(".hero");
const school = document.querySelector("#skolan");
const programs = document.querySelector("#program");
const statement = document.querySelector(".statement");
const life = document.querySelector("#livet");
const openHouse = document.querySelector("#oppet-hus");
const footer = document.querySelector("#kontakt");

/* =========================
   PAGE SETUP
========================= */

const pages = {
    home: [hero],
    school: [school],
    quiz: [programs],
    life: [statement, life, openHouse, footer]
};

let currentPage = "home";

function showPage(pageName) {
    if (!pages[pageName]) return;

    currentPage = pageName;

    // Hide all sections belonging to other pages
    Object.values(pages).flat().forEach(section => {
        if (section) {
            section.classList.add("step-hidden");
            section.classList.remove("page-enter");
        }
    });

    // Show the requested page
    pages[pageName].forEach(section => {
        if (!section) return;

        section.classList.remove("step-hidden");

        // Restart the transition animation
        void section.offsetWidth;
        section.classList.add("page-enter");
    });

    // Update navigation
    document.querySelectorAll(".nav a").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === pageName
        );
    });

    // Close the mobile menu
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");

    // Go to the top of the page
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Re-run reveal animations on the newly visible page
    observeReveals();
}

/* =========================
   CONNECT NAVIGATION
========================= */

const pageLinks = {
    "#top": "home",
    "#skolan": "school",
    "#program": "quiz",
    "#livet": "life",
    "#oppet-hus": "life",
    "#kontakt": "life"
};

document.querySelectorAll('a[href^="#"]').forEach(link => {
    const destination = link.getAttribute("href");
    const pageName = pageLinks[destination];

    if (!pageName) return;

    link.dataset.page = pageName;

    link.addEventListener("click", event => {
        event.preventDefault();
        showPage(pageName);
    });
});

// Make the main buttons open the correct page
document.querySelectorAll(".hero-actions a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const destination = link.getAttribute("href");

        if (destination === "#program") {
            showPage("quiz");
        } else {
            showPage("school");
        }
    });
});

/* =========================
   NEXT-PAGE BUTTONS
========================= */

function addNextButton(container, text, nextPage) {
    if (!container) return;

    const button = document.createElement("button");
    button.className = "button button-light page-next";
    button.type = "button";
    button.innerHTML = `${text} <span>→</span>`;

    button.addEventListener("click", () => {
        showPage(nextPage);
    });

    container.appendChild(button);
}

addNextButton(
    school?.querySelector(".body-copy"),
    "HITTA DITT PROGRAM",
    "quiz"
);

addNextButton(
    life?.querySelector(".life-grid"),
    "TILLBAKA TILL STARTEN",
    "home"
);

/* =========================
   PROGRAM QUIZ
========================= */

const programData = [
    {
        name: "AI & WEBB",
        keywords: ["webb", "ai", "programmera", "teknik", "digitalt"],
        description:
            "Du verkar gilla teknik, programmering och digitala lösningar."
    },
    {
        name: "FOTO OCH FILM",
        keywords: ["film", "foto", "kamera", "berättelser", "media"],
        description:
            "Du verkar gilla att berätta historier med bilder och rörligt material."
    },
    {
        name: "GRAFISK DESIGN",
        keywords: ["design", "rita", "form", "färger", "illustration"],
        description:
            "Du verkar gilla visuellt skapande, form och grafiska idéer."
    },
    {
        name: "MUSIKPRODUKTION",
        keywords: ["musik", "ljud", "producera", "audio", "beats"],
        description:
            "Du verkar gilla musik, ljud och att skapa egna produktioner."
    },
    {
        name: "SPEL-GRAFIK",
        keywords: ["grafik", "rita", "3d", "karaktärer", "världar"],
        description:
            "Du verkar gilla att skapa karaktärer, miljöer och visuella spelvärldar."
    },
    {
        name: "SPEL-UTVECKLING",
        keywords: ["spel", "programmera", "teknik", "kod", "logik"],
        description:
            "Du verkar gilla spel, problemlösning och hur spel byggs."
    }
];

const quizQuestions = [
    {
        question: "Vad tycker du mest om?",
        answers: [
            { text: "Teknik och programmering", tags: ["webb", "programmera", "teknik"] },
            { text: "Foto, film och media", tags: ["film", "foto", "media"] },
            { text: "Design och visuellt skapande", tags: ["design", "rita", "form"] },
            { text: "Musik och ljud", tags: ["musik", "ljud", "audio"] },
            { text: "Spel och digitala världar", tags: ["spel", "3d", "världar"] }
        ]
    },
    {
        question: "Vad skulle du helst vilja skapa?",
        answers: [
            { text: "En webbplats eller AI-lösning", tags: ["webb", "ai", "digitalt"] },
            { text: "En film eller fotoserie", tags: ["film", "foto", "kamera"] },
            { text: "En logotyp eller illustration", tags: ["design", "illustration", "färger"] },
            { text: "En låt eller egna beats", tags: ["musik", "beats", "producera"] },
            { text: "Ett spel med grafik och kod", tags: ["spel", "kod", "karaktärer"] }
        ]
    },
    {
        question: "Vilket arbetssätt passar dig bäst?",
        answers: [
            { text: "Lösa problem med teknik", tags: ["teknik", "logik", "programmera"] },
            { text: "Planera och berätta en historia", tags: ["berättelser", "film", "media"] },
            { text: "Experimentera med utseende och form", tags: ["form", "design", "3d"] },
            { text: "Testa ljud och skapa musik", tags: ["ljud", "musik", "audio"] },
            { text: "Bygga en egen digital värld", tags: ["spel", "världar", "3d"] }
        ]
    }
];

let questionIndex = 0;
let answersSelected = [];
let scores = {};

function createQuiz() {
    const quiz = document.createElement("div");
    quiz.id = "program-quiz";
    quiz.className = "program-quiz reveal";

    quiz.innerHTML = `
        <div class="quiz-label">[ HITTA DIN RIKTNING ]</div>
        <h3>VILKET PROGRAM<br><span>PASSAR DIG?</span></h3>
        <p class="quiz-intro">
            Svara på tre snabba frågor och få ett förslag
            på vilket program som kan passa dina intressen.
        </p>
        <div class="quiz-progress"></div>
        <div class="quiz-content"></div>
        <div class="quiz-controls">
            <button class="button button-outline quiz-back" type="button">
                ← TILLBAKA
            </button>
        </div>
    `;

    // Place the quiz above the program cards
    const grid = programs?.querySelector(".program-grid");

    if (grid) {
        grid.before(quiz);
    } else if (programs) {
        programs.appendChild(quiz);
    }

    quiz.querySelector(".quiz-back").addEventListener("click", () => {
        if (questionIndex > 0) {
            questionIndex--;
            renderQuestion();
        } else {
            showPage("school");
        }
    });

    renderQuestion();
}

function renderQuestion() {
    const quiz = document.querySelector("#program-quiz");
    if (!quiz) return;

    const content = quiz.querySelector(".quiz-content");
    const progress = quiz.querySelector(".quiz-progress");
    const backButton = quiz.querySelector(".quiz-back");

    backButton.style.visibility =
        questionIndex === 0 ? "hidden" : "visible";

    if (questionIndex >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const question = quizQuestions[questionIndex];

    progress.textContent =
        `FRÅGA ${questionIndex + 1} / ${quizQuestions.length}`;

    content.innerHTML = `
        <h4>${question.question}</h4>
        <div class="quiz-answers">
            ${question.answers.map((answer, index) => `
                <button
                    class="quiz-answer"
                    type="button"
                    data-answer="${index}"
                >
                    <span>0${index + 1}</span>
                    ${answer.text}
                    <strong>↗</strong>
                </button>
            `).join("")}
        </div>
    `;

    content.querySelectorAll(".quiz-answer").forEach(button => {
        button.addEventListener("click", () => {
            const selected =
                question.answers[Number(button.dataset.answer)];

            answersSelected[questionIndex] = selected.tags;

            questionIndex++;

            renderQuestion();
        });
    });
}

function showQuizResult() {
    const quiz = document.querySelector("#program-quiz");
    const content = quiz.querySelector(".quiz-content");
    const progress = quiz.querySelector(".quiz-progress");

    scores = {};

    programData.forEach(program => {
        scores[program.name] = 0;
    });

    answersSelected.forEach(tags => {
        programData.forEach(program => {
            tags.forEach(tag => {
                if (program.keywords.includes(tag)) {
                    scores[program.name]++;
                }
            });
        });
    });

    const sortedPrograms = [...programData].sort(
        (a, b) => scores[b.name] - scores[a.name]
    );

    const result = sortedPrograms[0];

    progress.textContent = "DITT RESULTAT";

    content.innerHTML = `
        <div class="quiz-result">
            <span class="result-label">DITT FÖRSLAG</span>
            <h4>${result.name}</h4>
            <p>${result.description}</p>
            <p class="result-note">
                Det här är bara ett förslag utifrån dina svar.
                Utforska gärna alla program och se vad som känns rätt för dig.
            </p>
            <button class="button button-light" id="restart-quiz" type="button">
                GÖR QUIZET IGEN ↻
            </button>
        </div>
    `;

    content.querySelector("#restart-quiz").addEventListener("click", () => {
        questionIndex = 0;
        answersSelected = [];
        renderQuestion();
    });

    // Highlight the suggested program card
    const cards = programs.querySelectorAll(".program-card");

    cards.forEach(card => {
        card.classList.remove("recommended");

        const heading = card.querySelector("h3");
        const headingText = heading?.innerText
            .replace(/\s+/g, " ")
            .replace(/-/g, "")
            .trim()
            .toUpperCase();

        const resultText = result.name
            .replace(/\s+/g, " ")
            .replace(/-/g, "")
            .trim()
            .toUpperCase();

        if (headingText === resultText) {
            card.classList.add("recommended");
        }
    });

    // Make all six programs visible underneath the result
    const grid = programs.querySelector(".program-grid");

    if (grid) {
        grid.classList.remove("step-hidden");
    }
}

/* =========================
   MOBILE MENU
========================= */

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
    });
}

/* =========================
   REVEAL ANIMATIONS
========================= */

let revealObserver;

function observeReveals() {
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal").forEach(element => {
            element.classList.add("visible");
        });
        return;
    }

    if (revealObserver) {
        revealObserver.disconnect();
    }

    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal:not(.step-hidden)").forEach(element => {
        revealObserver.observe(element);
    });
}

/* =========================
   START WEBSITE
========================= */

createQuiz();
showPage("home");
observeReveals();