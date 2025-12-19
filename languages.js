// ===== Multi-Language Support (Hindi & English Only) =====

const languages = {
    hi: {
        name: 'हिंदी',
        flag: '🇮🇳',
        translations: {
            tagline: 'Awareness • Motivation • Simple Tips',
            navAwareness: 'Awareness',
            navTips: 'Tips',
            navPlan: 'Plan',
            navStories: 'Stories',
            heroTitle: 'Roz thoda padho — bada farq aayega',
            heroDesc: 'Small daily habits build big results. Yahan tumhe milega awareness, motivation, aur practical tips jo daily follow kar sakte ho.',
            btnTip: 'Aaj ka Tip lo',
            btnLearn: 'Study Awareness',
            weeklyCommitment: 'Weekly Commitment',
            hoursPerWeek: '0 घंटे/week',
            setHours: 'Set hours/day',
            btnPlan: 'Plan Banao',
            btnReset: 'Reset',
            motivation: 'Motivation',
            quoteRotate: 'Quote rotate hota hai — roz naye quotes dekho!',
            btnSubscribe: 'SUBSCRIBE (Demo)',
            awareness: 'Study Awareness',
            sleepTitle: 'Sleep aur Learning',
            sleepDesc: 'Neend consistent ho to memory consolidation strong hota hai. Raat ko 7-9 ghante generally recommended.',
            recallTitle: 'Active Recall',
            recallDesc: 'Passive reading kam effective hota; khud se poochho aur likho — isse retention kaafi improve hota hai.',
            breaksTitle: 'Breaks zaroori',
            breaksDesc: 'Pomodoro: 25 min padhai + 5 min break. Long sessions mein short breaks dimaag ko refresh karte hain.',
            tips: 'Quick Tips',
            tip1: 'Start small',
            tip1Desc: 'Agar boring lage to 10 min se shuru karo.',
            tip2: 'One topic at a time',
            tip2Desc: 'Switching cost high hota — single topic deep karo.',
            tip3: 'Practice tests',
            tip3Desc: 'Old papers aur mock tests se speed aur accuracy badhti hai.',
            tip4: 'Teach someone',
            tip4Desc: 'Agar tum kisi ko padha doge to tum khud aur ache se samjh paoge.',
            tip5: 'Minimal notes',
            tip5Desc: 'Short handwritten notes ya flashcards banao.',
            tip6: 'Health first',
            tip6Desc: 'Hydration aur light exercise focus badhate hain.',
            planner: 'Simple Study Planner',
            daysPerWeek: 'Din/Week padhne wale din (e.g., 6)',
            hoursPerDay: 'Hours per day',
            calcWeekly: 'Calculated weekly hours',
            btnGenerate: 'Generate',
            stories: 'Success Stories',
            anitaName: 'Anita — Rank 2 in college',
            anitaStory: '"Roz 2 ghante consistent padhai ne mujhe focus sikhaya. Pomodoro aur revision plan mera secret tha."',
            rohitName: 'Rohit — Competitive exam clear',
            rohitStory: '"Practice tests se speed aur accuracy improve hui. Breaks lena mat bhoolna."',
            copyright: 'Copyright © StudyBoost — Built for students',
            emailPlaceholder: 'Email (demo)',
            anek: 'Anek',
            anekSubtitle: 'Always here to help!',
            chatPlaceholder: 'Ask Anek anything...',
        }
    },
    en: {
        name: 'English',
        flag: '🇬🇧',
        translations: {
            tagline: 'Awareness • Motivation • Simple Tips',
            navAwareness: 'Awareness',
            navTips: 'Tips',
            navPlan: 'Plan',
            navStories: 'Stories',
            heroTitle: 'Study a little daily — big difference tomorrow',
            heroDesc: 'Small daily habits build big results. Get awareness, motivation, and practical tips you can follow daily.',
            btnTip: 'Today\'s Tip',
            btnLearn: 'Study Awareness',
            weeklyCommitment: 'Weekly Commitment',
            hoursPerWeek: '0 hours/week',
            setHours: 'Set hours/day',
            btnPlan: 'Create Plan',
            btnReset: 'Reset',
            motivation: 'Motivation',
            quoteRotate: 'Quotes rotate — discover new ones daily!',
            btnSubscribe: 'SUBSCRIBE (Demo)',
            awareness: 'Study Awareness',
            sleepTitle: 'Sleep & Learning',
            sleepDesc: 'Consistent sleep strengthens memory consolidation. 7-9 hours per night is generally recommended.',
            recallTitle: 'Active Recall',
            recallDesc: 'Passive reading is less effective; test yourself and write answers — this greatly improves retention.',
            breaksTitle: 'Breaks Are Essential',
            breaksDesc: 'Pomodoro: 25 min study + 5 min break. Short breaks refresh your mind during long sessions.',
            tips: 'Quick Tips',
            tip1: 'Start small',
            tip1Desc: 'If it feels boring, start with just 10 minutes.',
            tip2: 'One topic at a time',
            tip2Desc: 'Switching costs too much — dive deep into one topic.',
            tip3: 'Practice tests',
            tip3Desc: 'Old papers and mock tests improve speed and accuracy.',
            tip4: 'Teach someone',
            tip4Desc: 'Teaching others helps you understand better yourself.',
            tip5: 'Minimal notes',
            tip5Desc: 'Keep short handwritten notes or create flashcards.',
            tip6: 'Health first',
            tip6Desc: 'Hydration and light exercise boost focus.',
            planner: 'Simple Study Planner',
            daysPerWeek: 'Days per week you study (e.g., 6)',
            hoursPerDay: 'Hours per day',
            calcWeekly: 'Calculated weekly hours',
            btnGenerate: 'Generate',
            stories: 'Success Stories',
            anitaName: 'Anita — Rank 2 in college',
            anitaStory: '"Consistent 2-hour daily study taught me focus. Pomodoro and revision plans were my secrets."',
            rohitName: 'Rohit — Cleared competitive exam',
            rohitStory: '"Practice tests improved my speed and accuracy. Don\'t forget to take breaks."',
            copyright: 'Copyright © StudyBoost — Built for students',
            emailPlaceholder: 'Email (demo)',
            anek: 'Anek',
            anekSubtitle: 'Always here to help!',
            chatPlaceholder: 'Ask Anek anything...',
        }
    }
};


function getCurrentLanguage() {
    return localStorage.getItem('language') || 'hi';
}

function setLanguage(lang) {
    if (languages[lang]) {
        localStorage.setItem('language', lang);
        location.reload();
    }
}

function t(key) {
    const lang = getCurrentLanguage();
    return languages[lang].translations[key] || key;
}

document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();
});

function updatePageLanguage() {
    document.querySelector('.muted:nth-of-type(1)').textContent = t('tagline');

    const navLinks = document.querySelectorAll('nav a');
    navLinks[0].textContent = t('navAwareness');
    navLinks[1].textContent = t('navTips');
    navLinks[2].textContent = t('navPlan');
    navLinks[3].textContent = t('navStories');

    document.querySelector('.hero h2').textContent = t('heroTitle');
    document.querySelector('.hero-card > p').textContent = t('heroDesc');
    document.getElementById('getTipBtn').textContent = t('btnTip');
    document.getElementById('learnBtn').textContent = t('btnLearn');

    const commitmentLabels = document.querySelectorAll('.card .muted.small');
    if (commitmentLabels[0]) commitmentLabels[0].textContent = t('weeklyCommitment');
    if (commitmentLabels[1]) commitmentLabels[1].textContent = t('setHours');

    document.getElementById('weeklyHours').textContent = t('hoursPerWeek');
    document.getElementById('calcPlan').textContent = t('btnPlan');
    document.getElementById('resetPlan').textContent = t('btnReset');

    document.querySelector('.tip-box h3').textContent = t('motivation');
    document.querySelector('.tip-box .muted').textContent = t('quoteRotate');
    document.getElementById('subscribePseudo').textContent = t('btnSubscribe');

    const awarenessSection = document.querySelector('#awareness h3');
    if (awarenessSection) awarenessSection.textContent = t('awareness');
    const aCards = document.querySelectorAll('#awareness .card');
    if (aCards[0]) {
        aCards[0].querySelector('h4').textContent = t('sleepTitle');
        aCards[0].querySelector('.muted').textContent = t('sleepDesc');
    }
    if (aCards[1]) {
        aCards[1].querySelector('h4').textContent = t('recallTitle');
        aCards[1].querySelector('.muted').textContent = t('recallDesc');
    }
    if (aCards[2]) {
        aCards[2].querySelector('h4').textContent = t('breaksTitle');
        aCards[2].querySelector('.muted').textContent = t('breaksDesc');
    }

    const tipsSection = document.querySelector('#tips h3');
    if (tipsSection) tipsSection.textContent = t('tips');
    const tCards = document.querySelectorAll('#tips .card');
    if (tCards[0]) {
        tCards[0].querySelector('b').textContent = '1. ' + t('tip1');
        tCards[0].querySelector('.muted').textContent = t('tip1Desc');
    }
    if (tCards[1]) {
        tCards[1].querySelector('b').textContent = '2. ' + t('tip2');
        tCards[1].querySelector('.muted').textContent = t('tip2Desc');
    }
    if (tCards[2]) {
        tCards[2].querySelector('b').textContent = '3. ' + t('tip3');
        tCards[2].querySelector('.muted').textContent = t('tip3Desc');
    }
    if (tCards[3]) {
        tCards[3].querySelector('b').textContent = '4. ' + t('tip4');
        tCards[3].querySelector('.muted').textContent = t('tip4Desc');
    }
    if (tCards[4]) {
        tCards[4].querySelector('b').textContent = '5. ' + t('tip5');
        tCards[4].querySelector('.muted').textContent = t('tip5Desc');
    }
    if (tCards[5]) {
        tCards[5].querySelector('b').textContent = '6. ' + t('tip6');
        tCards[5].querySelector('.muted').textContent = t('tip6Desc');
    }

    const plannerSection = document.querySelector('#planner h3');
    if (plannerSection) plannerSection.textContent = t('planner');

    const storiesSection = document.querySelector('#stories h3');
    if (storiesSection) storiesSection.textContent = t('stories');

    const footerText = document.querySelector('footer .muted');
    if (footerText) footerText.textContent = t('copyright');
    const emailInput = document.getElementById('emailSub');
    if (emailInput) emailInput.placeholder = t('emailPlaceholder');
}// Get current language from localStorage or default to Hindi
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'hi';
}

// Set language and save to localStorage
function setLanguage(lang) {
    if (languages[lang]) {
        localStorage.setItem('language', lang);
        location.reload();
    }
}

// Get translation for a key
function t(key) {
    const lang = getCurrentLanguage();
    return languages[lang].translations[key] || key;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();
});

// Update all text on the page based on current language
function updatePageLanguage() {
    // Update header
    document.querySelector('.muted:nth-of-type(1)').textContent = t('tagline');

    // Update navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks[0].textContent = t('navAwareness');
    navLinks[1].textContent = t('navTips');
    navLinks[2].textContent = t('navPlan');
    navLinks[3].textContent = t('navStories');

    // Update hero section
    document.querySelector('.hero h2').textContent = t('heroTitle');
    document.querySelector('.hero-card > p').textContent = t('heroDesc');
    document.getElementById('getTipBtn').textContent = t('btnTip');
    document.getElementById('learnBtn').textContent = t('btnLearn');

    // Update weekly commitment section
    const commitmentLabels = document.querySelectorAll('.card .muted.small');
    if (commitmentLabels[0]) commitmentLabels[0].textContent = t('weeklyCommitment');
    if (commitmentLabels[1]) commitmentLabels[1].textContent = t('setHours');

    document.getElementById('weeklyHours').textContent = t('hoursPerWeek');
    document.getElementById('calcPlan').textContent = t('btnPlan');
    document.getElementById('resetPlan').textContent = t('btnReset');

    // Update motivation section
    document.querySelector('.tip-box h3').textContent = t('motivation');
    document.querySelector('.tip-box .muted').textContent = t('quoteRotate');
    document.getElementById('subscribePseudo').textContent = t('btnSubscribe');

    // Update awareness section
    const awarenessSection = document.querySelector('#awareness h3');
    if (awarenessSection) awarenessSection.textContent = t('awareness');
    const aCards = document.querySelectorAll('#awareness .card');
    if (aCards[0]) {
        aCards[0].querySelector('h4').textContent = t('sleepTitle');
        aCards[0].querySelector('.muted').textContent = t('sleepDesc');
    }
    if (aCards[1]) {
        aCards[1].querySelector('h4').textContent = t('recallTitle');
        aCards[1].querySelector('.muted').textContent = t('recallDesc');
    }
    if (aCards[2]) {
        aCards[2].querySelector('h4').textContent = t('breaksTitle');
        aCards[2].querySelector('.muted').textContent = t('breaksDesc');
    }

    // Update tips section
    const tipsSection = document.querySelector('#tips h3');
    if (tipsSection) tipsSection.textContent = t('tips');
    const tCards = document.querySelectorAll('#tips .card');
    if (tCards[0]) {
        tCards[0].querySelector('b').textContent = '1. ' + t('tip1');
        tCards[0].querySelector('.muted').textContent = t('tip1Desc');
    }
    if (tCards[1]) {
        tCards[1].querySelector('b').textContent = '2. ' + t('tip2');
        tCards[1].querySelector('.muted').textContent = t('tip2Desc');
    }
    if (tCards[2]) {
        tCards[2].querySelector('b').textContent = '3. ' + t('tip3');
        tCards[2].querySelector('.muted').textContent = t('tip3Desc');
    }
    if (tCards[3]) {
        tCards[3].querySelector('b').textContent = '4. ' + t('tip4');
        tCards[3].querySelector('.muted').textContent = t('tip4Desc');
    }
    if (tCards[4]) {
        tCards[4].querySelector('b').textContent = '5. ' + t('tip5');
        tCards[4].querySelector('.muted').textContent = t('tip5Desc');
    }
    if (tCards[5]) {
        tCards[5].querySelector('b').textContent = '6. ' + t('tip6');
        tCards[5].querySelector('.muted').textContent = t('tip6Desc');
    }

    // Update planner section
    const plannerSection = document.querySelector('#planner h3');
    if (plannerSection) plannerSection.textContent = t('planner');

    // Update stories section
    const storiesSection = document.querySelector('#stories h3');
    if (storiesSection) storiesSection.textContent = t('stories');

    // Update footer
    const footerText = document.querySelector('footer .muted');
    if (footerText) footerText.textContent = t('copyright');
    const emailInput = document.getElementById('emailSub');
    if (emailInput) emailInput.placeholder = t('emailPlaceholder');
}
