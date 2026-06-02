/* ============================================
   LOVE ARCHETYPE QUIZ - SCRIPT.JS
   Core functionality for the quiz
   ============================================ */

// Quiz Data
const quizData = [
    {
        question: "When you think about love, what draws you in first?",
        choices: [
            { text: "Emotional depth and vulnerability", archetype: "dreamer" },
            { text: "Physical attraction and passion", archetype: "passionate" },
            { text: "Intellectual connection and conversation", archetype: "intellectual" },
            { text: "Stability and loyalty", archetype: "steadfast" },
            { text: "Adventure and spontaneity", archetype: "free-spirit" }
        ]
    },
    {
        question: "Your ideal date would be:",
        choices: [
            { text: "Stargazing with deep conversations", archetype: "dreamer" },
            { text: "Dancing and feeling alive together", archetype: "passionate" },
            { text: "Museums, bookstores, or thought-provoking activities", archetype: "intellectual" },
            { text: "A cozy night in with their favorite person", archetype: "steadfast" },
            { text: "Traveling somewhere new and unexpected", archetype: "free-spirit" }
        ]
    },
    {
        question: "In a relationship, you value most:",
        choices: [
            { text: "Romance and being swept off your feet", archetype: "dreamer" },
            { text: "Intense chemistry and excitement", archetype: "passionate" },
            { text: "Stimulating debates and shared ideas", archetype: "intellectual" },
            { text: "Trust and building a safe foundation", archetype: "steadfast" },
            { text: "Freedom and personal growth", archetype: "free-spirit" }
        ]
    },
    {
        question: "When conflict arises, you tend to:",
        choices: [
            { text: "Hope things will magically work out", archetype: "dreamer" },
            { text: "Express feelings intensely and passionately", archetype: "passionate" },
            { text: "Analyze and communicate rationally", archetype: "intellectual" },
            { text: "Work through it patiently and steadily", archetype: "steadfast" },
            { text: "Give space and trust the process", archetype: "free-spirit" }
        ]
    },
    {
        question: "Your love language is best described as:",
        choices: [
            { text: "Poetry, gestures, and grand romantic acts", archetype: "dreamer" },
            { text: "Touch, presence, and physical affection", archetype: "passionate" },
            { text: "Words of affirmation and meaningful conversation", archetype: "intellectual" },
            { text: "Acts of service and quiet devotion", archetype: "steadfast" },
            { text: "Quality time doing adventurous things", archetype: "free-spirit" }
        ]
    }
];

// Archetype Definitions
const archetypes = {
    dreamer: {
        title: "The Romantic Dreamer",
        emoji: "💭",
        description: "You're a hopeless romantic who believes in soulmates and fairy tales. Love, for you, is poetry in motion. You see the world through rose-tinted glasses and believe that love can conquer all. You express affection through grand gestures, heartfelt letters, and creating magical moments. Your sensitivity makes you deeply empathetic, and you're always ready to support those you care about.",
        traits: ["Romantic", "Empathetic", "Idealistic", "Creative", "Sensitive", "Hopeful"],
        hashtags: "#romanticdreamer #hopelessromantic #fairytale #soulmate #cottagecore"
    },
    passionate: {
        title: "The Passionate Lover",
        emoji: "🔥",
        description: "You're all fire and intensity. Love, for you, is a thrilling adventure filled with chemistry and connection. You feel everything deeply—joy, desire, and emotion burn bright within you. You're spontaneous, adventurous, and aren't afraid to pursue what (or who) sets your heart ablaze. Your energy is contagious, and your enthusiasm for love is inspiring.",
        traits: ["Intense", "Energetic", "Bold", "Adventurous", "Genuine", "Magnetic"],
        hashtags: "#passionatelover #intense #chemistry #fiery #authentic"
    },
    intellectual: {
        title: "The Intellectual Lover",
        emoji: "📚",
        description: "For you, love begins in the mind. Intellectual stimulation is your aphrodisiac—witty banter, deep conversations, and shared perspectives are what make your heart skip a beat. You value a partner who can challenge your thinking and expand your horizons. You express love through thoughtful gestures, meaningful words, and creating spaces where ideas flow freely.",
        traits: ["Intelligent", "Thoughtful", "Communicative", "Analytical", "Curious", "Witty"],
        hashtags: "#intellectuallover #mindconnection #thoughtful #bookish #deeptalks"
    },
    steadfast: {
        title: "The Steadfast Devotee",
        emoji: "🏰",
        description: "You're the anchor in the storm—reliable, loyal, and deeply committed. Love, for you, is about building something lasting and real. You may not express feelings with grand gestures, but your quiet devotion speaks volumes. You're someone's safe harbor, their rock, their home. Your consistency and dependability make you an irreplaceable partner who creates lasting bonds.",
        traits: ["Loyal", "Reliable", "Grounded", "Nurturing", "Patient", "Committed"],
        hashtags: "#steadfastlover #loyal #reliable #homebody #forever"
    },
    "free-spirit": {
        title: "The Free-Spirited Lover",
        emoji: "🦋",
        description: "You believe love should be liberating, not limiting. You're a free spirit who values independence and personal growth within relationships. Routine bores you—you crave novelty, exploration, and growth. You love fiercely but on your own terms. Your partner is your adventure buddy, your co-explorer of life's possibilities. You show love by supporting your partner's dreams and creating shared experiences.",
        traits: ["Independent", "Adventurous", "Flexible", "Open-minded", "Spontaneous", "Free"],
        hashtags: "#freespiritedlover #wanderlust #independent #adventurous #nomadic"
    }
};

// State Management
let currentQuestion = 0;
let scores = {
    dreamer: 0,
    passionate: 0,
    intellectual: 0,
    steadfast: 0,
    "free-spirit": 0
};
let userAnswers = [];

// DOM Elements
const introScreen = document.getElementById("introScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const shareBtn = document.getElementById("shareBtn");
const pinBtn = document.getElementById("pinBtn");

// ============================================
// EVENT LISTENERS
// ============================================

startBtn.addEventListener("click", startQuiz);
retryBtn.addEventListener("click", resetQuiz);
shareBtn.addEventListener("click", shareResult);
pinBtn.addEventListener("click", pinResult);

// ============================================
// MAIN FUNCTIONS
// ============================================

function startQuiz() {
    introScreen.classList.remove("active");
    quizScreen.classList.add("active");
    displayQuestion();
    createSakuraPetals();
}

function displayQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById("questionText").textContent = question.question;
    document.getElementById("questionNumber").textContent = currentQuestion + 1;
    
    const choicesContainer = document.getElementById("choicesContainer");
    choicesContainer.innerHTML = "";
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.className = "choice-btn";
        button.textContent = choice.text;
        button.addEventListener("click", () => selectAnswer(choice, button));
        choicesContainer.appendChild(button);
    });
    
    updateProgressBar();
}

function selectAnswer(choice, buttonElement) {
    // Disable all buttons
    document.querySelectorAll(".choice-btn").forEach(btn => {
        btn.disabled = true;
    });
    
    // Mark selected
    buttonElement.classList.add("selected");
    
    // Update scores
    scores[choice.archetype]++;
    userAnswers.push(choice.archetype);
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 800);
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById("progressFill").style.width = progress + "%";
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    
    // Find the archetype with highest score
    const resultArchetype = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
    );
    
    const result = archetypes[resultArchetype];
    const maxScore = Math.max(...Object.values(scores));
    const scorePercentage = Math.round((maxScore / quizData.length) * 100);
    
    // Update result screen
    document.getElementById("resultEmoji").textContent = result.emoji;
    document.getElementById("resultTitle").textContent = result.title;
    document.getElementById("resultDescription").textContent = result.description;
    document.getElementById("resultHashtags").textContent = result.hashtags;
    document.getElementById("scorePercentage").textContent = scorePercentage + "%";
    
    // Animate score bar
    setTimeout(() => {
        document.getElementById("scoreBarFill").style.width = scorePercentage + "%";
    }, 300);
    
    // Display traits
    const traitsContainer = document.getElementById("traitsContainer");
    traitsContainer.innerHTML = "";
    result.traits.forEach(trait => {
        const tag = document.createElement("div");
        tag.className = "trait-tag";
        tag.textContent = trait;
        traitsContainer.appendChild(tag);
    });
}

function resetQuiz() {
    currentQuestion = 0;
    scores = {
        dreamer: 0,
        passionate: 0,
        intellectual: 0,
        steadfast: 0,
        "free-spirit": 0
    };
    userAnswers = [];
    
    resultScreen.classList.remove("active");
    introScreen.classList.add("active");
}

// ============================================
// SHARING & SAVING FUNCTIONS
// ============================================

function shareResult() {
    const resultArchetype = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
    );
    const result = archetypes[resultArchetype];
    
    const text = `I'm ${result.title}! Discover your love archetype: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: "Love Archetype Quiz",
            text: text
        }).catch(err => console.log("Error sharing:", err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text);
        alert("Result copied to clipboard! Share it with your friends.");
    }
}

function pinResult() {
    const resultArchetype = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
    );
    const result = archetypes[resultArchetype];
    
    // Create a Pinterest-friendly image description
    const description = `${result.title} - ${result.emoji} Discover your love archetype quiz result!`;
    
    // Pinterest URL (would need actual image URL in production)
    const pinterestUrl = `https://pinterest.com/pin/create/button/?description=${encodeURIComponent(description)}&url=${encodeURIComponent(window.location.href)}`;
    
    window.open(pinterestUrl, "pinterest", "width=750,height=600");
}

// ============================================
// SAKURA PETALS ANIMATION
// ============================================

function createSakuraPetals() {
    const container = document.querySelector(".sakura-container");
    container.innerHTML = ""; // Clear existing petals
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";
        
        // Random positioning and animation
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 6 + Math.random() * 4;
        
        petal.style.left = left + "%";
        petal.style.top = "-10px";
        petal.style.animationDelay = delay + "s";
        petal.style.animationDuration = duration + "s";
        
        container.appendChild(petal);
    }
    
    // Create new petals periodically
    setInterval(() => {
        if (document.querySelector(".sakura-container")) {
            const petal = document.createElement("div");
            petal.className = "petal";
            
            const left = Math.random() * 100;
            const duration = 6 + Math.random() * 4;
            
            petal.style.left = left + "%";
            petal.style.top = "-10px";
            petal.style.animationDuration = duration + "s";
            
            document.querySelector(".sakura-container").appendChild(petal);
            
            // Remove petal after animation
            setTimeout(() => petal.remove(), duration * 1000);
        }
    }, 500);
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    createSakuraPetals();
});
