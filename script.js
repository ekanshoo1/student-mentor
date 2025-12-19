// ===== script.js =====

// Multi-language Quotes
const quotesData = {
    hi: [
        "Consistency chhoti cheez hai, par asli magic wahi karti hai.",
        "Aaj ka thoda sa effort, kal ka bada fark.",
        "Focus content nahi, process pe rakho.",
        "Progress slow ho sakta hai — par small progress daily hona jaruri hai.",
        "Sahi strategy + regularity = result."
    ],
    en: [
        "Consistency is small, but it creates real magic.",
        "Today's small effort creates tomorrow's big difference.",
        "Focus on process, not content.",
        "Progress might be slow — but daily small progress is essential.",
        "Right strategy + regularity = result."
    ]
};

// Multi-language Tips
const tipsData = {
    hi: [
        "Active recall lagao — khud se poochho instead of rereading.",
        "Micro-goals set karo: 25 minute focus + 5 minute break.",
        "Ek topic ke 3 key points likhkar roz revise karo.",
        "Night before: ek short summary banao; next day revise.",
        "Mock test schedule banao — realistic conditions mein time karna sikho."
    ],
    en: [
        "Use active recall — test yourself instead of rereading.",
        "Set micro-goals: 25 minutes focus + 5 minute break.",
        "Write 3 key points per topic and revise daily.",
        "The night before: create a short summary; next day revise.",
        "Schedule mock tests — practice in realistic conditions."
    ]
};

let qIndex = 0;
const qEl = document.getElementById('quote');

function getQuotes() {
    const lang = getCurrentLanguage();
    return quotesData[lang] || quotesData['en'];
}

function getTips() {
    const lang = getCurrentLanguage();
    return tipsData[lang] || tipsData['en'];
}

// Rotate quotes every 6 seconds
setInterval(() => {
    const quotes = getQuotes();
    qIndex = (qIndex + 1) % quotes.length;
    qEl.innerText = quotes[qIndex];
}, 6000);

// "Aaj ka Tip lo" behavior — compute a deterministic tip for the day and display it
function dayOfYear(d) {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d - start + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getTodayTip() {
    const tips = getTips();
    const today = new Date();
    const keyDate = today.toISOString().slice(0, 10);
    const storedDate = localStorage.getItem('todays_tip_date');
    const storedTip = localStorage.getItem('todays_tip_text');
    if (storedDate === keyDate && storedTip) return storedTip;

    // Choose tip deterministically using day of year
    const idx = dayOfYear(today) % tips.length;
    const tip = tips[idx];
    localStorage.setItem('todays_tip_date', keyDate);
    localStorage.setItem('todays_tip_text', tip);
    return tip;
}

function displayTodayTip() {
    const tip = getTodayTip();
    const lang = getCurrentLanguage();
    const title = lang === 'hi' ? 'Aaj ka Tip' : 'Today\'s Tip';
    const el = document.getElementById('todaysTip');
    if (el) el.innerText = `${title}: ${tip}`;
}

document.getElementById('getTipBtn').addEventListener('click', () => {
    displayTodayTip();
});

document.getElementById('saveTipBtn').addEventListener('click', () => {
    const el = document.getElementById('todaysTip');
    if (!el) return;
    const text = el.innerText || '';
    if (!text) { alert('No tip to save (demo).'); return; }
    localStorage.setItem('saved_tip', text);
    alert('Tip saved (demo).');
});

document.getElementById('clearSavedTipBtn').addEventListener('click', () => {
    localStorage.removeItem('saved_tip');
    alert('Saved tip cleared (demo).');
});

// Toggle detailed study awareness when Learn button clicked
document.getElementById('learnBtn').addEventListener('click', () => {
    const details = document.getElementById('studyAwarenessDetails');
    if (!details) return;
    details.style.display = (details.style.display === 'none' || !details.style.display) ? 'block' : 'none';
    if (details.style.display === 'block') {
        details.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Show today's tip on initial load
displayTodayTip();

// Study Planner calculation
const daysInput = document.getElementById('daysPerWeek');
const hoursInput = document.getElementById('hoursPerDay2');
const result = document.getElementById('calcResult');

document.getElementById('generatePlan').addEventListener('click', () => {
    const days = Number(daysInput.value) || 0;
    const hours = Number(hoursInput.value) || 0;
    const weekly = days * hours;
    result.innerText = weekly + " hours / week";
});

// Weekly commitment widget
const hoursPerDay = document.getElementById('hoursPerDay');
const weeklyHours = document.getElementById('weeklyHours');

document.getElementById('calcPlan').addEventListener('click', () => {
    const h = Number(hoursPerDay.value) || 0;
    const approx = Math.round(h * 6); // assume 6 study days
    weeklyHours.innerText = approx + " hours/week";
});

document.getElementById('resetPlan').addEventListener('click', () => {
    hoursPerDay.value = 2;
    weeklyHours.innerText = "0 hours/week";
});

// Subscribe (demo only)
document.getElementById('subBtn').addEventListener('click', () => {
    const em = document.getElementById('emailSub').value.trim();
    if (!em || !em.includes('@')) {
        alert('Sahi email daalo (demo).');
        return;
    }
    alert('Thanks! (Demo) — ' + em + ' added to demo list.');
    document.getElementById('emailSub').value = '';
});

// Pseudo subscribe link in tip box
document.getElementById('subscribePseudo').addEventListener('click', () => {
    alert('Subscribe demo. Main real email service integrate karke de dunga agar chaho.');
});

// ===== Success Stories Management =====

// Load and display user-submitted stories
function loadUserStories() {
    const stories = JSON.parse(localStorage.getItem('userStories')) || [];
    const container = document.getElementById('submittedStories');

    if (!container) return;

    container.innerHTML = '';

    if (stories.length === 0) {
        container.innerHTML = '<p class="muted small" style="grid-column: 1/-1; text-align: center; padding: 20px;">Koi story nahi hai abhi. Tum pehle ho! 🚀</p>';
        return;
    }

    stories.forEach((story, idx) => {
        const storyCard = document.createElement('div');
        storyCard.className = 'card test';

        const avatar = story.name.charAt(0).toUpperCase();

        storyCard.innerHTML = `
            <div class="avatar">${avatar}</div>
            <div>
                <div style="font-weight:700">${story.name} — ${story.achievement}</div>
                <div class="muted small">"${story.content}" ✨</div>
                <div class="muted" style="font-size:11px; margin-top:8px; opacity:0.6">Shared by ${story.date}</div>
            </div>
        `;

        container.appendChild(storyCard);
    });
}

// Submit new success story
document.getElementById('submitStoryBtn')?.addEventListener('click', () => {
    const name = document.getElementById('storyName')?.value.trim();
    const achievement = document.getElementById('storyAchievement')?.value.trim();
    const content = document.getElementById('storyContent')?.value.trim();

    if (!name || !achievement || !content) {
        alert('Please fill all fields! 📝');
        return;
    }

    if (content.split(' ').length < 20) {
        alert('Story should be at least 20 words! 📖');
        return;
    }

    // Get existing stories
    const stories = JSON.parse(localStorage.getItem('userStories')) || [];

    // Add new story with date
    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    stories.unshift({
        name: name,
        achievement: achievement,
        content: content,
        date: dateStr
    });

    // Limit to 50 recent stories
    if (stories.length > 50) {
        stories.pop();
    }

    // Save to localStorage
    localStorage.setItem('userStories', JSON.stringify(stories));

    // Clear form
    document.getElementById('storyName').value = '';
    document.getElementById('storyAchievement').value = '';
    document.getElementById('storyContent').value = '';

    // Show success message
    alert('🎉 Story shared! Thanks for inspiring others!');

    // Reload stories display
    loadUserStories();

    // Scroll to community stories section
    document.getElementById('userStoriesContainer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Clear story form
document.getElementById('clearStoryBtn')?.addEventListener('click', () => {
    document.getElementById('storyName').value = '';
    document.getElementById('storyAchievement').value = '';
    document.getElementById('storyContent').value = '';
});

// ===== Feedback Management =====

function loadFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('userFeedbacks')) || [];
    const container = document.getElementById('feedbackList');
    if (!container) return;
    container.innerHTML = '';
    if (feedbacks.length === 0) {
        container.innerHTML = '<p class="muted small" style="text-align:center;padding:16px">Koi feedback nahi mila abhi. Tum pahla feedback do!</p>';
        return;
    }

    feedbacks.forEach(fb => {
        const card = document.createElement('div');
        card.className = 'card test';
        const avatar = (fb.name && fb.name.length) ? fb.name.charAt(0).toUpperCase() : 'U';
        const ratingStars = '⭐'.repeat(Math.max(1, Math.min(5, Number(fb.rating || 0))));
        card.innerHTML = `
            <div class="avatar">${avatar}</div>
            <div>
                <div style="font-weight:700">${fb.name || 'Anonymous'} <span style="font-weight:600;color:var(--muted);font-size:12px">${ratingStars}</span></div>
                <div class="muted small">${fb.comments}</div>
                <div class="muted" style="font-size:11px;margin-top:8px;opacity:0.6">${fb.date}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Submit feedback
document.getElementById('submitFeedbackBtn')?.addEventListener('click', () => {
    const name = document.getElementById('fbName')?.value.trim();
    const email = document.getElementById('fbEmail')?.value.trim();
    const rating = document.getElementById('fbRating')?.value;
    const comments = document.getElementById('fbComments')?.value.trim();

    if (!rating) { alert('Please select a rating.'); return; }
    if (!comments || comments.length < 10) { alert('Please write a short comment (10+ chars).'); return; }

    const feedbacks = JSON.parse(localStorage.getItem('userFeedbacks')) || [];
    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    feedbacks.unshift({ name: name || 'Anonymous', email: email || '', rating: rating, comments: comments, date: dateStr });
    if (feedbacks.length > 100) feedbacks.pop();
    localStorage.setItem('userFeedbacks', JSON.stringify(feedbacks));

    document.getElementById('fbName').value = '';
    document.getElementById('fbEmail').value = '';
    document.getElementById('fbRating').value = '';
    document.getElementById('fbComments').value = '';

    alert('Thank you — feedback received.');
    loadFeedbacks();
    document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.getElementById('clearFeedbackBtn')?.addEventListener('click', () => {
    document.getElementById('fbName').value = '';
    document.getElementById('fbEmail').value = '';
    document.getElementById('fbRating').value = '';
    document.getElementById('fbComments').value = '';
});

// Load stories and feedbacks on page load
window.addEventListener('load', () => {
    loadUserStories();
    loadFeedbacks();
});

// Chatbot initialization
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.getElementById('closeChatbot');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

let chatStarted = false;

// Anek's multi-language responses
const anekResponsesMulti = {
    hi: {
        greeting: [
            "नमस्ते! 🙏 Main Anek hoon. Padhai mein tumhara motivational buddy. Kaise ho?",
            "Hey there! 👋 Main Anek hoon, tumhara study companion. Kuch sikhna hai ya motivation chahiye?",
            "Shukriya mere paas aane ke liye! 😊 Main tumhe tips aur motivation dunga. Shuru karein?"
        ],
        tips: [
            "💡 Active Recall: Rereading se better hai khud se poochho aur jawab likho.",
            "💡 Pomodoro Technique: 25 min padho, fir 5 min break lo. Dimaag refresh ho jayega!",
            "💡 Teaching others: Agar kisi ko padha do to tum khud better samjh paoge.",
            "💡 Mock tests: Practice tests se speed aur confidence badh jaata hai.",
            "💡 Sleep zaroori: 7-9 ghante sleep consistent memory ko strong banate hain.",
            "💡 Minimal notes: Detailed notes mat likho — key points par focus karo."
        ],
        motivation: [
            "🌟 Har din thoda padho to big results aate hain. Consistency hi key hai!",
            "💪 Progress slow ho sakta hai, lekin daily effort guaranteed result deta hai.",
            "🎯 Focus content par nahi, process par rakho. Baaki sab thik ho jayega.",
            "✨ Tum kar sakte ho! Bas regularly padho aur apne aap par believe karo.",
            "🚀 Aaj ki mehnat = Kal ki safalta. Chaliye!",
            "📚 Yaad rakho: Chhote kadam, bade sapne. Har sawaal important hai tumhare journey mein."
        ],
        help: "Main help kar sakta hoon! Ye lo options:\n✅ 'Tip' likho tips ke liye\n✅ 'Motivation' likho for motivation\n✅ 'Hello' likho greeting ke liye\n✅ Kuch bhi poochho aur dekho! 😊",
        default: "Mujhe laga tum kuch poochh rahe ho! 😊 Main tips, motivation ya greeting de sakta hoon. 'Help' likho janne ke liye!"
    },
    en: {
        greeting: [
            "Hello! 👋 I'm Anek, your study buddy. How are you today?",
            "Hey there! 😊 I'm Anek, your motivational companion. What can I help you with?",
            "Thanks for stopping by! 🙌 I'm here to give you tips and motivation. Let's begin!"
        ],
        tips: [
            "💡 Active Recall: Instead of rereading, test yourself by answering questions.",
            "💡 Pomodoro Technique: Study for 25 minutes, then take a 5-minute break. Your mind will feel refreshed!",
            "💡 Teaching Others: Explaining to someone helps you understand better.",
            "💡 Mock Tests: Practice tests boost your speed and confidence.",
            "💡 Sleep Matters: 7-9 hours of consistent sleep strengthens memory.",
            "💡 Minimal Notes: Avoid detailed notes — focus on key points instead."
        ],
        motivation: [
            "🌟 Study a little daily and see big results. Consistency is the key!",
            "💪 Progress might be slow, but daily effort guarantees results.",
            "🎯 Focus on the process, not just the content. Everything else will follow.",
            "✨ You can do this! Study regularly and believe in yourself.",
            "🚀 Today's effort = Tomorrow's success. Let's make it happen!",
            "📚 Remember: Small steps, big dreams. Every question matters in your journey."
        ],
        help: "I can help! Here are my options:\n✅ Type 'Tip' for study tips\n✅ Type 'Motivation' for motivation\n✅ Type 'Hello' for a greeting\n✅ Type 'Career' for career guidance\n✅ Ask me anything! 😊",
        default: "Looks like you're asking something! 😊 I can give you tips, motivation, or greetings. Type 'Help' to see what I can do!"
    }
};

// Career Guidance Data
const careerGuidanceData = {
    hi: {
        startMessage: "Hi 👋\nMain yahan hoon tumhari career confusion clear karne ke liye.\nTension mat lo — pehle thoda tumhe samajhte hain 🙂\n\nBatao:\nTum abhi kis class me ho? (9 / 10 / 11 / 12 / College)",
        classQuestion: "Theek hai! Aur batao — tum padhte waqt kis subject mein zyada interested ho?\n\n(Math / Science / Commerce / Humanities / Abhi nahi pata)",
        strengthQuestion: "Bilkul! Ab batao — tumhara kya strength hai?\n\n(Creativity / Logical thinking / Communication / Sports / Dusra kuch)",
        followupQuestions: [
            "Tumhe kis type ka subject zyada pasand hai?\n\n(Bio / Maths / Theory / Practical)",
            "Tumhara approx marks range kya hai?\n\n(80+ / 60-80 / 40-60 / Thoda low)",
            "Tum government job chahte ho ya private / skill-based?\n\n(Government / Private / Skill-based / Nahi pata)"
        ],
        streamSuggestion: (streams) => `\nSuno, tumhare liye ye paths fit ho sakte hain:\n1️⃣ ${streams[0]}\n2️⃣ ${streams[1]}\n3️⃣ ${streams[2]}\n\nCompetition tough hai, par agar regular padho aur mehnat karo — definitely kar paoge! 💪`,
        nextStep: "Ab ye karo:\n✅ YouTube pe career videos dekho\n✅ Apne seniors se baat karo\n✅ Internship explore karo\n\nKya aur kuch help chahiye? 😊",
        default: "Samajh nahi aaya. Ek dum simple answer de, OK?"
    },
    en: {
        startMessage: "Hi 👋\nI'm here to clear your career confusion.\nDon't stress — let's understand you first 🙂\n\nTell me:\nWhich class are you in? (9 / 10 / 11 / 12 / College)",
        classQuestion: "Great! Now tell me — which subject interests you most while studying?\n\n(Math / Science / Commerce / Humanities / Not sure yet)",
        strengthQuestion: "Perfect! What's your strength?\n\n(Creativity / Logical thinking / Communication / Sports / Something else)",
        followupQuestions: [
            "What type of subject do you prefer?\n\n(Bio / Maths / Theory / Practical)",
            "What's your approximate marks range?\n\n(80+ / 60-80 / 40-60 / Below 40)",
            "Do you want a government job or private/skill-based career?\n\n(Government / Private / Skill-based / Not sure)"
        ],
        streamSuggestion: (streams) => `\nListen, these paths could fit you:\n1️⃣ ${streams[0]}\n2️⃣ ${streams[1]}\n3️⃣ ${streams[2]}\n\nCompetition is tough, but if you study regularly and work hard — you can definitely do it! 💪`,
        nextStep: "Now do this:\n✅ Watch some career videos on YouTube\n✅ Talk to your seniors\n✅ Explore internships\n\nNeed any more help? 😊",
        default: "Didn't understand. Give me a simple answer, OK?"
    }
};

// Career path details - realistic explanations
const careerPathDetails = {
    hi: {
        "Engineering": "Engineering mein practical + math dono chahiye. Companies to hire karte hain, but competition fierce hai. 3-4 saal hard focus karega to placement decent mil jayega.",
        "Commerce (CA/CS)": "CA/CS mein consistency aur regularity key hai. Harder than school padhai, par once qualified, earning potential very good. 5-6 years long term plan hai.",
        "Data Science": "Tech skills + logic dono zaruri hain. High demand hai aaj, but coding sikhna padega. YouTube se shuru kar aur projects karna padenge.",
        "Medicine": "Competition bohot extreme hai, par agar doctor ban gaya to respect + earning dono mil jayega. Medical school mein grind kaafi hardcore hota hai.",
        "Research": "Research mein curiosity important hai, marks se jyada. PhD/Research field mein passion dilcha to interesting life ban jayega, par paisa pehle ke saal kam hota hai.",
        "Biotechnology": "Science + innovation dono chahiye. New field hai, opportunities increase ho rahe hain. Core interest hona chahiye, sirf marks ke liye karna nahi.",
        "Banking": "Competitive exams tough hain, par once clear karega to govt job security + good salary. 1-2 saal dedicated preparation chahiye.",
        "Finance": "Numbers samjhne chahiye + market sense chahiye. Certification (CFA/CFP) lena padega, but return on investment excellent hai.",
        "Entrepreneurship": "Risk-taking + persistence chahiye. Zyada marks se jyada practical skills matter. Failures expected hain, but learning milti rahi.",
        "Civil Services": "Extremely competitive exam hai, but agar clear karo to ultimate respect + power. 1-2 saal focused prep + mentors se guidance zaroori hai.",
        "Journalism": "Writing + curiosity zaroori hai. Marks kam important hain, portfolio important hai. Salary initially low par network strong banegi.",
        "Psychology": "Human behavior samjhne ka interest hona chahiye. Practical internships zaroori hain. Counselor/HR/Research mein avenues hain.",
        "Skill Development": "Certifications se 6-12 months mein job-ready ban sakta hai. Practical skills market mein bohot valued hain aaj.",
        "Online Courses": "Flexible aur affordable. YouTube/Udemy/Coursera se start kar aur real projects karna — ye resume banata hai.",
        "Internships": "Early experience se confidence aur clarity dono mil jayega. Ek intern ban jao aur dekh ki tujhe actually pasand hai ya nahi."
    },
    en: {
        "Engineering": "Engineering needs both practical and math. Companies hire, but competition is fierce. Focus hard for 3-4 years and placement should be decent.",
        "Commerce (CA/CS)": "CA/CS needs consistency and regularity. Harder than school, but once qualified, earning potential is very good. It's a 5-6 year plan.",
        "Data Science": "You need tech skills + logic. High demand now, but you'll have to learn coding. Start from YouTube and build projects.",
        "Medicine": "Extreme competition, but if you become a doctor, you get respect + money. Medical school grind is hardcore.",
        "Research": "Curiosity matters more than marks. If you have passion, research gives an interesting life, but early years have low pay.",
        "Biotechnology": "Science + innovation both needed. It's a newer field with growing opportunities. You need real interest, not just marks.",
        "Banking": "Competitive exams are tough, but once you clear, you get government job security + good salary. Needs 1-2 years of prep.",
        "Finance": "You need to understand numbers + market sense. Certifications (CFA/CFP) required, but ROI is excellent.",
        "Entrepreneurship": "Needs risk-taking + persistence. Practical skills matter more than marks. Expect failures, but learning is constant.",
        "Civil Services": "Extremely competitive exam, but if you clear it, you get ultimate respect + power. Needs 1-2 years focused prep + mentors.",
        "Journalism": "Needs writing + curiosity. Marks matter less, portfolio matters more. Initial salary is low but network grows strong.",
        "Psychology": "You need interest in human behavior. Practical internships are crucial. Paths: counselor, HR, research.",
        "Skill Development": "You can become job-ready in 6-12 months with certifications. Practical skills are highly valued now.",
        "Online Courses": "Flexible and affordable. Start with YouTube/Udemy/Coursera and build real projects — that's what builds resume.",
        "Internships": "Early experience gives both confidence and clarity. Intern and see if you actually like it or not."
    }
};

// Myth-busting responses
const mythBustingData = {
    hi: {
        "weak": "Arey weak to padhai ke baad ban jaate hain, pehle to sab same hote hain! Ek student ne JEE rank 500 se 50 tak 1 saal mein le aaya sirf consistent padhai se. Marks matter nahi, improvement matters.",
        "arts scope": "Arts bohot underrated hai! IAS/IPS/Journalist/Psychology — ye sab arts se hi ata hai. Government jobs mein arts students ka bahut scope hai. Sirf engineering/medicine nahi hai duniya.",
        "average marks": "Average marks se pehle to engineer ban chuka hoon + banker bhi! College cutoff clear hone ke baad potential same rahi. Consistent padhai se rank badhi, marks badhe. First year marks = potential nahi.",
        "late start": "10th mein shuru kiya aur state rank aaya. 11th start mein pressure hota hai, par pehle 2-3 mahine rocky hote hain sab ke liye. Ab se consistent raho to puri course recover kar sakte ho."
    },
    en: {
        "weak": "You become weak after studies, not before! Everyone starts the same. One student improved from JEE rank 500 to 50 in 1 year with consistent study. Marks don't matter, improvement does.",
        "arts scope": "Arts is very underrated! IAS/IPS/Journalist/Psychology — these are all from arts. Government jobs have huge scope for arts. The world isn't just engineering/medicine.",
        "average marks": "I became an engineer and banker with average marks! Once you clear college cutoff, potential is the same. Consistent study improved my ranks and marks. First year marks ≠ potential.",
        "late start": "I started in 10th and got state rank. Starting in 11th feels pressuring, but first 2-3 months are rocky for everyone. Stay consistent now and you can recover the entire course."
    }
};

// Demotivation handling
const demotivationResponses = {
    hi: {
        acknowledgement: "Haan, frustration hona normal hai. Bohot students ko ye feeling aata hai.",
        normalize: "Failure sirf feedback deta hai — ye likho where you went wrong.",
        step: "Ek chhota target set kar aaj ka: ek chapter khatam kar aur next exam mein improve hone dekh."
    },
    en: {
        acknowledgement: "Yeah, frustration is normal. Many students feel this way.",
        normalize: "Failure is just feedback — write down what went wrong.",
        step: "Set one small goal today: finish one chapter and see improvement in next exam."
    }
};

// Specific action items
const actionItems = {
    hi: {
        govt_job: "UPSC/SSC cutoff paper dekh aur decide kar — competitive exam practice ab se start kar.",
        private: "Top companies ki internship search kar aur apply kar — connection + experience dono mil jayega.",
        skill: "1 in-demand skill choose kar (AI/Design/Marketing) aur Udemy pe course kar.",
        marks_low: "Mock tests dedicate time de — practice se speed aur confidence dono badhta hai.",
        science: "Biology/Physics mein conceptual clarity chahiye — one NCERT topic properly samajh aur test ho.",
        math: "Problem-solving practice kar — formula sirf start hai, application aata nahi to fail hoga.",
        revision: "1 topic ke 3 key points roj revise kar — spaced repetition sabse effective hai."
    },
    en: {
        govt_job: "Check UPSC/SSC cutoff papers and decide — start competitive exam practice now.",
        private: "Search for top company internships and apply — you'll get both connection and experience.",
        skill: "Choose 1 in-demand skill (AI/Design/Marketing) and do a Udemy course.",
        marks_low: "Dedicate time to mock tests — practice builds both speed and confidence.",
        science: "Get conceptual clarity in Bio/Physics — properly understand one NCERT topic and test it.",
        math: "Practice problem-solving — formula is just the start, application is what matters.",
        revision: "Revise 3 key points from one topic daily — spaced repetition is most effective."
    }
};

let careerGuidanceMode = false;
let careerStep = 0;
let careerData = {};

// Career paths mapping
const careerPaths = {
    math: {
        hi: ["Engineering", "Commerce (CA/CS)", "Data Science"],
        en: ["Engineering", "Commerce (CA/CS)", "Data Science"]
    },
    science: {
        hi: ["Medicine", "Research", "Biotechnology"],
        en: ["Medicine", "Research", "Biotechnology"]
    },
    commerce: {
        hi: ["Banking", "Finance", "Entrepreneurship"],
        en: ["Banking", "Finance", "Entrepreneurship"]
    },
    humanities: {
        hi: ["Civil Services", "Journalism", "Psychology"],
        en: ["Civil Services", "Journalism", "Psychology"]
    },
    notsure: {
        hi: ["Skill Development", "Online Courses", "Internships"],
        en: ["Skill Development", "Online Courses", "Internships"]
    }
};

function getAnekResponse(category) {
    const lang = getCurrentLanguage();
    const responses = anekResponsesMulti[lang] || anekResponsesMulti['en'];
    const categoryResponses = responses[category];

    if (Array.isArray(categoryResponses)) {
        return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }
    return categoryResponses;
}

function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'chatbot-message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserMessage(userText) {
    addMessage(userText, true);

    const lower = userText.toLowerCase().trim();
    const lang = getCurrentLanguage();
    let response;

    // Career Guidance Mode
    if (careerGuidanceMode) {
        if (careerStep === 0) {
            // Get class info
            careerData.class = lower;
            response = careerGuidanceData[lang].classQuestion;
            careerStep = 1;
        } else if (careerStep === 1) {
            // Get subject interest
            let subjectMap = {
                'math': 'math',
                '9': 'math',
                '10': 'math',
                '11': 'math',
                '12': 'math',
                'science': 'science',
                'commerce': 'commerce',
                'humanities': 'humanities',
                'humanities': 'humanities',
                'nahi pata': 'notsure',
                'not sure': 'notsure',
                'sure': 'notsure'
            };

            let subject = 'notsure';
            for (let key in subjectMap) {
                if (lower.includes(key)) {
                    subject = subjectMap[key];
                    break;
                }
            }

            careerData.subject = subject;
            response = careerGuidanceData[lang].strengthQuestion;
            careerStep = 2;
        } else if (careerStep === 2) {
            // Get strength and ask follow-up question
            careerData.strength = lower;

            // Pick a random follow-up question
            const followupQuestions = careerGuidanceData[lang].followupQuestions;
            careerData.followupIndex = Math.floor(Math.random() * followupQuestions.length);
            response = followupQuestions[careerData.followupIndex];
            careerStep = 3;
        } else if (careerStep === 3) {
            // Get follow-up answer
            careerData.followup = lower;

            // Check for demotivation signals
            const demotivationKeywords = ['weak', 'nahi kar sakta', 'impossible', 'fail', 'hopeless', 'frustration', 'depressed', 'cant do', 'difficult'];
            const mythKeywords = ['scope nahi', 'no scope', 'weak student', 'average marks', 'late start', 'arts me scope'];

            let isDemotivated = demotivationKeywords.some(kw => lower.includes(kw));
            let isMyth = mythKeywords.some(m => lower.includes(m));

            let response = "";

            if (isDemotivated) {
                // Handle demotivation
                const dem = demotivationResponses[lang];
                response = `${dem.acknowledgement}\n\n${dem.normalize}\n\n${dem.step}`;
            } else if (isMyth) {
                // Handle myths
                let mythKey = 'weak';
                if (lower.includes('scope')) mythKey = 'arts scope';
                if (lower.includes('average')) mythKey = 'average marks';
                if (lower.includes('late')) mythKey = 'late start';

                response = mythBustingData[lang][mythKey] || mythBustingData[lang]['weak'];

                setTimeout(() => {
                    addMessage(careerGuidanceData[lang].classQuestion, false);
                    careerStep = 1;
                }, 1200);
                return;
            } else {
                // Generate detailed career suggestions
                const paths = careerPaths[careerData.subject][lang];

                response = lang === 'hi' ?
                    `Theek hai, suno tumhare liye ye 3 paths fit ho sakte hain:\n\n` :
                    `Alright, here are 3 paths that could fit you:\n\n`;

                paths.forEach((path, idx) => {
                    const detail = careerPathDetails[lang][path] || "Good path for your skills.";
                    response += `${idx + 1}️⃣ **${path}**\n${detail}\n\n`;
                });

                // Add action item
                let actionKey = 'revision';
                if (lower.includes('government')) actionKey = 'govt_job';
                else if (lower.includes('private')) actionKey = 'private';
                else if (lower.includes('skill')) actionKey = 'skill';

                const actionText = lang === 'hi' ?
                    'Ab ek choti si cheez aaj kar:\n' :
                    'Now do this one small thing today:\n';
                response += actionText + actionItems[lang][actionKey];
            }

            setTimeout(() => {
                addMessage(response, false);
            }, 800);

            careerGuidanceMode = false;
            careerStep = 0;
            careerData = {};
            return;
        }
    }
    // Check if user wants to start career guidance
    else if (lower.includes('career')) {
        careerGuidanceMode = true;
        careerStep = 0;
        response = careerGuidanceData[lang].startMessage;
    }
    else if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste')) {
        response = getAnekResponse('greeting');
    }
    else if (lower.includes('tip')) {
        response = getAnekResponse('tips');
    }
    else if (lower.includes('motiv')) {
        response = getAnekResponse('motivation');
    }
    else if (lower.includes('help')) {
        response = getAnekResponse('help');
    }
    else {
        response = getAnekResponse('default');
    }

    setTimeout(() => {
        addMessage(response, false);
    }, 500);
}

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');

    if (chatbotContainer.classList.contains('active') && !chatStarted) {
        chatStarted = true;
        addMessage(getAnekResponse('greeting'), false);
    }

    chatInput.focus();
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text) {
        handleUserMessage(text);
        chatInput.value = '';
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = chatInput.value.trim();
        if (text) {
            handleUserMessage(text);
            chatInput.value = '';
        }
    }
});
// Enhanced chatbot features: moods, jokes, quick-replies, typing indicator

// Simple jokes database (Hindi + English)
const anekJokes = {
    hi: [
        "Ek ladka teacher se: Sir mere answers table pe hain. Teacher: Kaunse table? Ladka: Periodic table! 😄",
        "Padhai aur pizza mein difference? Pizza me extra cheese hota hai; exam me extra stress! 😂",
        "Student: Sir main late kyun aata hoon class me? Teacher: Tum har subtopic par \"thoda zyada\" time spend karte ho! 😅"
    ],
    en: [
        "Why did the student eat his homework? Because the teacher told him it was a piece of cake! 😄",
        "I told my study notes a joke — they laughed so hard they fell into the 'read later' pile. 😂",
        "Why don't calculators get invited to parties? They can't stop counting the fun out! 😅"
    ]
};

// Typing indicator helpers
const chatTyping = document.getElementById('chatTyping');
function showTyping(duration = 700) {
    if (!chatTyping) return Promise.resolve();
    chatTyping.style.display = 'block';
    return new Promise(res => setTimeout(() => { chatTyping.style.display = 'none'; res(); }, duration));
}

// Mood handling and quick-replies
function tellJoke() {
    const lang = getCurrentLanguage();
    const jokes = anekJokes[lang] || anekJokes['en'];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    return showTyping(900).then(() => addMessage(joke, false));
}

function setMood(mood) {
    // mood: 'happy' | 'sad' | 'bored' | 'joke' | 'motivated'
    if (mood === 'joke') {
        tellJoke();
        return;
    }

    const lang = getCurrentLanguage();
    let replies = {
        happy: {
            hi: ["Wah! Bahut accha — positivity ko banaye rakho! 😊", "Great! Rakhte hain energy high!"],
            en: ["Nice! Keep that positive energy up! 😊", "Awesome — stay cheerful and study smart!"]
        },
        sad: {
            hi: ["Koi baat nahi — break lo aur chhota sa walk karo. Fir fresh padho.", "Take it slow, ek chhota sa break lo."],
            en: ["It's okay — take a short break and come back refreshed.", "Take care — little breaks help a lot."]
        },
        bored: {
            hi: ["Bored? Try Pomodoro: 25 min intense + 5 min break. Surprise yourself!", "Switch topic for 25 mins; variety helps!"],
            en: ["Bored? Try a 25min Pomodoro and switch topic after.", "Mix subjects — change keeps the brain engaged."]
        },
        motivated: {
            hi: ["Great! Channel this energy into a focused 25-minute session.", "Accha laga sunke! Ab ek small goal set karo aur chalu ho jao."],
            en: ["Awesome — channel this energy into a focused 25-minute session.", "Love it! Set a small goal and go for it."]
        }
    };

    const pick = replies[mood] ? (replies[mood][lang] || replies[mood]['en']) : null;
    const msg = pick ? pick[Math.floor(Math.random() * pick.length)] : (lang === 'hi' ? 'Main yahan hoon agar help chahiye.' : "I'm here if you need help.");
    showTyping(600).then(() => addMessage(msg, false));
}

// Quick reply pills rendering
const quickRepliesEl = document.getElementById('quickReplies');
function showQuickReplies(list = ['Tip', 'Motivation', 'Plan', 'Joke']) {
    if (!quickRepliesEl) return;
    quickRepliesEl.innerHTML = '';
    list.forEach(label => {
        const b = document.createElement('button');
        b.className = 'quick-reply';
        b.textContent = label;
        b.addEventListener('click', () => handleQuickReply(label));
        quickRepliesEl.appendChild(b);
    });
}

function handleQuickReply(label) {
    // Treat as user message
    addMessage(label, true);
    const lower = label.toLowerCase();
    if (lower.includes('tip')) return showTyping(500).then(() => addMessage(getAnekResponse('tips'), false));
    if (lower.includes('motivat')) return showTyping(500).then(() => addMessage(getAnekResponse('motivation'), false));
    if (lower.includes('plan')) return showTyping(500).then(() => addMessage("Share your goal and hours, I'll help plan!", false));
    if (lower.includes('joke')) return tellJoke();
    // default echo
    return showTyping(500).then(() => addMessage(getAnekResponse('default'), false));
}

// ===== SENTIMENT DETECTION & EMPATHETIC RESPONSES =====
const sentimentKeywords = {
    positive: {
        hi: ['accha', 'badhiya', 'maza', 'happy', 'khush', 'passionate', 'energetic', 'motivated', 'excited', 'shukriya', 'thanks', 'awesome', 'great', 'fantastic', 'excellent', 'perfect', 'love', 'best'],
        en: ['good', 'great', 'awesome', 'excellent', 'happy', 'excited', 'love', 'amazing', 'fantastic', 'perfect', 'best', 'wonderful', 'brilliant', 'superb', 'motivated', 'energetic']
    },
    negative: {
        hi: ['sad', 'bura', 'ghatiya', 'stressed', 'tension', 'worried', 'upset', 'angry', 'mad', 'frustrated', 'scared', 'confused', 'helpless', 'tired', 'fail', 'down'],
        en: ['sad', 'bad', 'terrible', 'awful', 'stressed', 'depressed', 'angry', 'frustrated', 'worried', 'anxious', 'confused', 'tired', 'exhausted', 'fail', 'lost', 'upset']
    },
    bored: {
        hi: ['bored', 'samajh nahi aata', 'difficult', 'hard', 'struggling', 'dull', 'monotonous', 'padhai nahi ho rahi'],
        en: ['bored', 'boring', 'difficult', 'hard', 'struggling', 'dull', 'confusing', 'tired', 'can\'t focus']
    },
    joke: {
        hi: ['hasa', 'hasna', 'joke', 'funny', 'hasne', 'haso', 'maza lo', 'break'],
        en: ['joke', 'funny', 'laugh', 'haha', 'lol', 'fun', 'break', 'relax']
    }
};

function detectSentiment(userText) {
    const lower = userText.toLowerCase();

    // Check for joke requests first
    if (sentimentKeywords.joke.hi.some(k => lower.includes(k)) ||
        sentimentKeywords.joke.en.some(k => lower.includes(k))) {
        return 'joke';
    }

    // Check for positive
    if (sentimentKeywords.positive.hi.some(k => lower.includes(k)) ||
        sentimentKeywords.positive.en.some(k => lower.includes(k))) {
        return 'positive';
    }

    // Check for negative
    if (sentimentKeywords.negative.hi.some(k => lower.includes(k)) ||
        sentimentKeywords.negative.en.some(k => lower.includes(k))) {
        return 'negative';
    }

    // Check for bored
    if (sentimentKeywords.bored.hi.some(k => lower.includes(k)) ||
        sentimentKeywords.bored.en.some(k => lower.includes(k))) {
        return 'bored';
    }

    return null; // neutral
}

const empathyResponses = {
    positive: {
        hi: [
            "Wah! Bahut accha energy dikh rahi hai! Isi tarah aage badho. 🚀",
            "Fantastic! Isi enthusiasm ko maintain rakho aur study mein channel kar. 💪",
            "That's the spirit! Keep riding this wave of positivity!"
        ],
        en: [
            "That's amazing! Keep that energy flowing into your studies! 🔥",
            "I love the enthusiasm! Channel it into focused study sessions. 💯",
            "Keep shining with that positivity — it's your superpower!"
        ]
    },
    negative: {
        hi: [
            "Samajh aata hoon, kai baar stress hota hai. Lekin yaad rakho — har mushkil temporary hoti hai. Chhota break lo. 💙",
            "Tension mat lo bhai/behen. Ek din ka rest lo, fir shuruaat karenge thoda aasan se. You got this! 🌟",
            "Padhai stressful lag rahi hai? Try 10 min walk ya some music. Dimaag ko relax karne do. 🎵"
        ],
        en: [
            "I understand — stress happens. But remember, every difficulty is temporary. Take a breather. 💙",
            "Don't worry! Sometimes we need to slow down to speed up later. Rest well and come back stronger. 🌟",
            "Feeling overwhelmed? Step back, take a walk, listen to music. Your mind needs rest too. 🎵"
        ]
    },
    bored: {
        hi: [
            "Bored lag raha hai? Pomodoro try kar: 25 min intense padhai + 5 min fun break. Dimaag refresh ho jayega! 🎯",
            "Monotonous padhai? Subject change kar ya study location badal. Novelty attention ko boost karta hai! 🔄",
            "Topic thoda heavy lag raha? Use examples, visuals, ya teach someone. Padhai interesting ban jayegi! 📖"
        ],
        en: [
            "Bored? Try the Pomodoro Technique: 25 min solid focus + 5 min break. Works like magic! 🎯",
            "Mix it up! Change your study location, topic, or method. Novelty keeps the brain engaged. 🔄",
            "Make it interactive — use examples, videos, or teach a friend. Learning becomes fun! 📖"
        ]
    }
};

function respondToSentiment(sentiment) {
    if (sentiment === 'joke') {
        return tellJoke();
    }

    if (!sentiment) {
        return showTyping(600).then(() => addMessage(getAnekResponse('default'), false));
    }

    const lang = getCurrentLanguage();
    const responses = empathyResponses[sentiment];
    const pick = responses && responses[lang] ? responses[lang] : [];

    if (pick.length > 0) {
        const msg = pick[Math.floor(Math.random() * pick.length)];
        return showTyping(700).then(() => addMessage(msg, false));
    }

    return showTyping(600).then(() => addMessage(getAnekResponse('default'), false));
}

// Wire send button to use typing indicator
sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, true);
    chatInput.value = '';

    const lower = text.toLowerCase();
    // mood quick command: "mood: joke" or simple keywords
    if (lower.startsWith('mood:')) {
        const mood = lower.split(':')[1].trim();
        setTimeout(() => setMood(mood), 200);
        return;
    }

    // interpret simple requests
    if (lower.includes('joke') || lower.includes('hasna') || lower.includes('hasne')) {
        tellJoke();
        return;
    }
    if (lower.includes('tip')) {
        showTyping(500).then(() => addMessage(getAnekResponse('tips'), false));
        return;
    }
    if (lower.includes('motivat')) {
        showTyping(500).then(() => addMessage(getAnekResponse('motivation'), false));
        return;
    }

    // Detect sentiment and respond empathetically
    const sentiment = detectSentiment(userText);
    respondToSentiment(sentiment);
});

// Expose function for testing
window.anekTellJoke = tellJoke;

// ===== Professional Study Schedule Generator =====
const ScheduleManager = {
    weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    minHours: 1,
    maxHours: 60,
    minDays: 1,
    maxDays: 7,

    validate: function (subjects, hours, days) {
        if (!subjects || subjects.trim().length === 0) return { valid: false, error: 'Please enter at least one subject.' };
        if (hours < this.minHours || hours > this.maxHours) return { valid: false, error: 'Hours must be between 1 and 60.' };
        if (days < this.minDays || days > this.maxDays) return { valid: false, error: 'Study days must be between 1 and 7.' };
        return { valid: true };
    },

    generateSchedule: function (subjects, hours, days, goal) {
        const subjectList = subjects.split(',').map(s => s.trim()).filter(s => s.length > 0);
        const hoursPerDay = Math.floor(hours / days);
        const hoursRemaining = hours % days;
        let dailyPlan = [];
        const weekDays = this.weekDays;

        for (let i = 0; i < days && i < 7; i++) {
            const subject = subjectList[i % subjectList.length];
            const extraHour = i < hoursRemaining ? 1 : 0;
            const dailyHours = hoursPerDay + extraHour;
            dailyPlan.push({ day: weekDays[i], subject: subject, hours: dailyHours });
        }

        for (let i = days; i < 7; i++) {
            dailyPlan.push({ day: weekDays[i], subject: 'Rest & Review', hours: 0, isRestDay: true });
        }

        return { goal: goal, hours: hours, days: days, dailyPlan: dailyPlan, subjects: subjectList };
    },

    renderHTML: function (schedule) {
        let html = '<div style="background:rgba(255,255,255,0.02);padding:20px;border-radius:12px;border-left:4px solid var(--accent)">';
        html += '<h4 style="margin-bottom:12px;color:var(--accent-light)">📅 ' + schedule.goal + '</h4>';
        html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:20px">';
        html += '<div style="background:rgba(34,211,238,0.1);padding:12px;border-radius:8px"><div style="font-size:12px;color:var(--muted)">Total Hours</div><div style="font-size:18px;font-weight:700;color:var(--accent-light)">' + schedule.hours + 'h</div></div>';
        html += '<div style="background:rgba(34,211,238,0.1);padding:12px;border-radius:8px"><div style="font-size:12px;color:var(--muted)">Study Days</div><div style="font-size:18px;font-weight:700;color:var(--accent-light)">' + schedule.days + '/7</div></div>';
        html += '<div style="background:rgba(34,211,238,0.1);padding:12px;border-radius:8px"><div style="font-size:12px;color:var(--muted)">Subjects</div><div style="font-size:18px;font-weight:700;color:var(--accent-light)">' + schedule.subjects.length + '</div></div>';
        html += '</div>';
        html += '<h4 style="margin:16px 0 12px;color:var(--accent-light)">Daily Breakdown</h4>';
        html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">';
        schedule.dailyPlan.forEach(function (day) {
            const bgColor = day.isRestDay ? 'rgba(16,185,129,0.1)' : 'rgba(6,182,212,0.1)';
            html += '<div style="background:' + bgColor + ';padding:12px;border-radius:8px">';
            html += '<div style="font-weight:600;color:var(--accent-light);margin-bottom:6px">' + day.day + '</div>';
            if (!day.isRestDay) {
                html += '<div style="font-size:13px;color:var(--muted);"><strong>' + day.subject + '</strong></div>';
                html += '<div style="font-size:12px;color:var(--muted);">⏱️ ' + day.hours + 'h</div>';
            } else {
                html += '<div style="font-size:13px;color:var(--success);font-style:italic">' + day.subject + '</div>';
            }
            html += '</div>';
        });
        html += '</div>';
        html += '</div>';
        return html;
    },

    save: function (schedule) {
        try {
            localStorage.setItem('study_schedule', JSON.stringify(schedule));
            return true;
        } catch (e) {
            return false;
        }
    },

    load: function () {
        try {
            return JSON.parse(localStorage.getItem('study_schedule'));
        } catch (e) {
            return null;
        }
    }
};

function generateStudySchedule() {
    const subjectsInput = document.getElementById('schedulerSubjects').value;
    const hoursInput = Number(document.getElementById('schedulerHours').value);
    const daysInput = Number(document.getElementById('schedulerDays').value);
    const goalInput = document.getElementById('schedulerGoal').value.trim() || 'Personal Study Plan';

    const validation = ScheduleManager.validate(subjectsInput, hoursInput, daysInput);
    if (!validation.valid) {
        alert('⚠️ ' + validation.error);
        return;
    }

    const schedule = ScheduleManager.generateSchedule(subjectsInput, hoursInput, daysInput, goalInput);
    const html = ScheduleManager.renderHTML(schedule);

    const output = document.getElementById('scheduleOutput');
    const content = document.getElementById('scheduleContent');
    if (content) content.innerHTML = html;
    if (output) {
        output.style.display = 'block';
        setTimeout(() => output.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }

    ScheduleManager.save(schedule);
    window.currentSchedule = schedule;
}

function clearSchedule() {
    document.getElementById('schedulerSubjects').value = '';
    document.getElementById('schedulerHours').value = 10;
    document.getElementById('schedulerDays').value = 5;
    document.getElementById('schedulerGoal').value = '';
    const output = document.getElementById('scheduleOutput');
    if (output) output.style.display = 'none';
    localStorage.removeItem('study_schedule');
    window.currentSchedule = null;
}

function downloadSchedule() {
    if (!window.currentSchedule) {
        alert('Generate a schedule first!');
        return;
    }
    const format = prompt('Format: 1=Text, 2=JSON, 3=CSV (default 1):') || '1';
    let content, filename, type;
    switch (format) {
        case '2':
            content = JSON.stringify(window.currentSchedule, null, 2);
            filename = 'Schedule_' + new Date().toISOString().slice(0, 10) + '.json';
            type = 'application/json';
            break;
        case '3':
            content = 'Day,Subject,Hours\n' + window.currentSchedule.dailyPlan.map(d => d.day + ',' + d.subject + ',' + d.hours).join('\n');
            filename = 'Schedule_' + new Date().toISOString().slice(0, 10) + '.csv';
            type = 'text/csv';
            break;
        default:
            content = document.getElementById('scheduleContent').innerText;
            filename = 'Schedule_' + new Date().toISOString().slice(0, 10) + '.txt';
            type = 'text/plain';
    }
    const el = document.createElement('a');
    el.setAttribute('href', 'data:' + type + ';charset=utf-8,' + encodeURIComponent(content));
    el.setAttribute('download', filename);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

if (document.getElementById('generateScheduleBtn')) {
    document.getElementById('generateScheduleBtn').addEventListener('click', generateStudySchedule);
}

if (document.getElementById('clearScheduleBtn')) {
    document.getElementById('clearScheduleBtn').addEventListener('click', clearSchedule);
}

if (document.getElementById('downloadScheduleBtn')) {
    document.getElementById('downloadScheduleBtn').addEventListener('click', downloadSchedule);
}

window.addEventListener('load', () => {
    const saved = ScheduleManager.load();
    if (saved && saved.goal) {
        document.getElementById('schedulerSubjects').value = saved.subjects.join(', ');
        document.getElementById('schedulerHours').value = saved.hours;
        document.getElementById('schedulerDays').value = saved.days;
        document.getElementById('schedulerGoal').value = saved.goal;
        window.currentSchedule = saved;
    }
});

