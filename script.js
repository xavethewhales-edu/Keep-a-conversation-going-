// === Origin gate — blocks unauthorized mirrors ===
const GH_USERS = ["xavethewhales-edu"];   // your GH Pages host: xavethewhales-edu.github.io
const CUSTOM_DOMAINS = [];                // add custom domains here if you get one

(function originGate(){
  const h = location.host.toLowerCase();
  const okLocal = /^localhost(:\d+)?$/.test(h) || /^127\.0\.0\.1(:\d+)?$/.test(h);
  const okGh = GH_USERS.some(u => h === (u.toLowerCase() + ".github.io"));
  const okCustom = CUSTOM_DOMAINS.includes(h);

  if (!(okLocal || okGh || okCustom)) {
    document.documentElement.innerHTML =
      "<style>body{font-family:system-ui;background:#000;color:#0ff;padding:2rem}</style>" +
      "<h1>Unauthorized mirror</h1><p>This build is locked to the author’s domains.</p>";
    throw new Error("Unauthorized origin: " + h);
  }
})();

// === Runtime signature (brand/evidence) ===
const __XAVETHEWHALES_SIGNATURE__ = Object.freeze({
  brand: "xavethewhales-games",
  build: "2025-09-05",
  site: "https://xavethewhales-edu.github.io"
});
(function showSigOnce(){
  if (!window.__XTW_SIG_SHOWN__) {
    window.__XTW_SIG_SHOWN__ = true;
    try {
      console.info(
        "%c" + __XAVETHEWHALES_SIGNATURE__.brand + " — " + __XAVETHEWHALES_SIGNATURE__.build,
        "color:#0ff;font-weight:700"
      );
    } catch {}
  }
})();


const scenes = {
  /* ============================
     BOOTCAMP: VEGAS BREAKFAST
     Starts at scene1
     ============================ */

  // Bootcamp Title / Intro (must have image per engine rule)
  "scene1": {
    type: "text",
    image: "images/4.png",
    text: "Bootcamp — Keep a Conversation Going:\n\nYou wake up in your Las Vegas hotel after a long flight. Your group is still sleeping off their jet lag. You head down to the breakfast hall for the buffet. The room is quiet, except for a friendly-looking couple (early sixties) by a large window with a clear view of the Eiffel Tower replica and the Strip in bright morning sun.\n\nPress Continue to take a seat nearby.",
    choices: [{ text: "Continue", next: "scene1_sit" }]
  },

  // Sit near the couple (Vegas breakfast hall visual)
  "scene1_sit": {
    type: "text",
    image: "images/1.png",
    text: "You say “Good morning” as you pass and take a seat a couple of tables away. After a moment, you feel like making conversation.",
    choices: [{ text: "Continue", next: "scene_opener_scramble" }]
  },

  /* --------------------------------
     Rule 1 — Conversation Opener
     -------------------------------- */
  "scene_opener_scramble": {
    type: "scramble",
    text: "Scramble the opener you’d say to the couple:\n(Use a shared detail; keep it light and indirect.)",
    image: "images/1.png",
    scramble: ["it?", "Great", "isn't", "view,"],
    correct: ["Great", "view,", "isn't", "it?"],
    next: "scene_rule1_explain"
  },

  "scene_rule1_explain": {
    type: "text",
    text: "Rule 1 — Conversation Opener!\n\nYour move: “Great view, isn’t it?”\nWhy it works: You noticed something you both share (the view) and phrased it indirectly, which makes it easy and polite to answer.\nTakeaway: Open with shared context to invite a natural reply.",
    choices: [{ text: "Continue", next: "scene_listening_mc" }]
  },

  /* --------------------------------
     Rule 2 — Listening (MC)
     -------------------------------- */
  "scene_listening_mc": {
    type: "text",
    text: "The man smiles: “Sure is—perfect Vegas morning.”\n\nChoose your reply:",
    choices: [
      { text: "A) Do you come here often?", next: "scene_listening_wrongA" },
      { text: "B) I take it is not your first time here.", next: "scene_rule2_explain" },
      { text: "C) The Strip is long—lots of hotels, right?", next: "scene_listening_wrongC" }
    ]
  },
  "scene_listening_wrongA": {
    type: "text",
    text: "Wrong. Try a response that builds on his words rather than switching topics or repeating yes/no patterns.",
    choices: [{ text: "Try again", next: "scene_listening_mc" }]
  },
  "scene_listening_wrongC": {
    type: "text",
    text: "Wrong. That diverts away from what he said. Reflect his comment to show you listened.",
    choices: [{ text: "Try again", next: "scene_listening_mc" }]
  },

  "scene_rule2_explain": {
    type: "text",
    image: "images/2.png",
    text: "Rule 2 — Listening!\n\nYour move: “I take it is not your first time here.”\nWhy it works: You built directly on his comment (“perfect Vegas morning”). You showed you heard him and disguised your question as a statement—natural and inviting.\nTakeaway: Reflect what you hear; people feel valued when you build from their words.",
    choices: [{ text: "Continue", next: "scene_variety_scramble" }]
  },

  /* --------------------------------
     Rule 3 — Variety (Scramble)
     -------------------------------- */
  "scene_variety_scramble": {
    type: "text",
    text: "The man says: “We come here every year for our anniversary.”\n\nRephrase with variety (scramble):",
    choices: [{ text: "Start scramble", next: "scene_variety_scramble_do" }]
  },

  "scene_variety_scramble_do": {
    type: "scramble",
    text: "Build a polite, specific follow-up (avoid another yes/no):",
    scramble: ["I", "ask", "how", "have", "long", "you", "for?", "been", "married", "Can", "Congratulations!"],
    correct: ["Congratulations!", "Can", "I", "ask", "how", "long", "you", "have", "been", "married", "for?"],
    next: "scene_rule3_explain"
  },

  "scene_rule3_explain": {
    type: "text",
    image: "images/3.png",
    text: "Rule 3 — Variety!\n\nYour move: “Congratulations! Can I ask how long you have been married for?”\nWhy it works: You shifted form—polite and specific rather than another yes/no. Variety keeps the rhythm fresh and avoids interrogation vibes.\nTakeaway: Mix question types (modal, object-based, negative, hypothetical).",
    choices: [{ text: "Continue", next: "scene_reciprocity_fib" }]
  },

  /* --------------------------------
     Rule 5 — Reciprocity (FIB)
     -------------------------------- */
  "scene_reciprocity_fib": {
    type: "text",
    text: "The woman beams: “Thirty-two long ones and still going strong! Where are you from, honey?”\n\nFill in the blanks:",
    choices: [{ text: "Begin", next: "scene_reciprocity_fib_do" }]
  },

  "scene_reciprocity_fib_do": {
    type: "fill-in-the-blank",
    text: "Complete your reply:",
    sentence: ["I am from ", "__________", ". My group and I flew in ", "__________", " and it is our first day in Vegas."],
    blanks: [1, 3],
    options: ["Madrid", "last night", "on last night", "of Madrid", "the last night"],
    correct: ["Madrid", "last night"],
    next: "scene_rule5_explain"
  },

  "scene_rule5_explain": {
    type: "text",
    text: "Rule 4 — Reciprocity!\n\nYour move: “I am from Madrid. My group and I flew in last night and it is our first day in Vegas.”\nWhy it works: You shared something about yourself before asking more. Balanced exchanges feel fair and human.\nTakeaway: Give a little, then ask.",
    choices: [{ text: "Continue", next: "scene_usefulness_scramble" }]
  },

  /* --------------------------------
     Rule 4 — Usefulness (Scramble)
     -------------------------------- */
  "scene_usefulness_scramble": {
    type: "text",
    text: "The man laughs: “First day in Vegas then! You’re in for a treat!”\n\nAsk for useful advice (scramble):",
    choices: [{ text: "Start scramble", next: "scene_usefulness_scramble_do" }]
  },

  "scene_usefulness_scramble_do": {
    type: "scramble",
    text: "Build a request that lets them be helpful:",
    scramble: ["good", "casinos", "Could", "to", "recommend", "hit", "tonight?", "any", "you", "up"],
    correct: ["Could", "you", "recommend", "any", "good", "casinos", "to", "hit", "up", "tonight?"],
    next: "scene_rule4_explain"
  },

  "scene_rule4_explain": {
    type: "text",
    text: "Rule 5 — Usefulness\n\nYour move: “Could you recommend any good casinos to hit up tonight?”\nWhy it works: People like being helpful. Inviting advice gives them an easy role and keeps the talk alive.\nTakeaway: Ask for tips, recommendations, or opinions.",
    choices: [{ text: "Continue", next: "scene_bridge_variety" }]
  },

  /* --------------------------------
     Bridge → Rephrasing Drills
     -------------------------------- */
  "scene_bridge_variety": {
    type: "text",
    image: "images/4.png",
    text: "As you may have noticed, it is questions that keep a conversation alive. But a long chain of the same kind can feel like an interrogation.\n\nNext: rephrase some flat or awkward questions into versions that feel natural, varied, and polite.",
    choices: [{ text: "I’m ready", next: "scene_rephrase_1" }]
  },

  /* --------------------------------
     Rephrase Scrambles (7 drills)
     -------------------------------- */

  // 1) Closed → Open/Varied
  "scene_rephrase_1": {
    type: "scramble",
    text: "Base: “Do you do any sports?”\nRephrase (scramble) to make it open and natural:",
    scramble: ["stay", "you", "How", "to", "active?","do","like"],
    correct: ["How", "do", "you", "like", "to", "stay", "active?"],
    next: "scene_rephrase_1_explain"
  },
  "scene_rephrase_1_explain": {
    type: "text",
    text: "Better: “How do you like to stay active?”\nWhy: Avoids yes/no dead-ends; invites a longer answer.",
    choices: [{ text: "Continue", next: "scene_rephrase_2" }]
  },

  // 2) Where/Why → How (broaden the scope)
  "scene_rephrase_2": {
    type: "scramble",
    text: "Base: “Why did you go there?”\nRephrase (scramble) to invite a story:",
    scramble: ["holiday?", "How", "for", "your", "place", "that", "you", "choose", "did"],
    correct: ["How", "did", "you", "choose", "that", "place", "for", "your", "holiday?"],
    next: "scene_rephrase_2_explain"
  },
  "scene_rephrase_2_explain": {
    type: "text",
    text: "Better: “How did you choose that place for your holiday?”\nWhy: “How” invites a narrative, not a judgment.",
    choices: [{ text: "Continue", next: "scene_rephrase_3" }]
  },

  // 3) Statement → Question tag
  "scene_rephrase_3": {
    type: "scramble",
    text: "Base: “The lesson was at six.”\nRephrase (scramble) as a question tag:",
    scramble: ["The", "six,", "lesson", "it?", "was", "wasn't", "at"],
    correct: ["The", "lesson", "was", "at", "six,", "wasn't", "it?"],
    next: "scene_rephrase_3_explain"
  },
  "scene_rephrase_3_explain": {
    type: "text",
    text: "Better: “The lesson was at six, wasn’t it?”\nWhy: Tags turn a statement into an invitation to confirm or expand.",
    choices: [{ text: "Continue", next: "scene_rephrase_4" }]
  },

  // 4) Direct opinion → Softer negative question
  "scene_rephrase_4": {
    type: "scramble",
    text: "Base: “The weather has been awful this summer.”\nRephrase (scramble) as a softer negative question:",
    scramble: ["summer?", "this", "awful", "been", "weather", "Hasn't", "the"],
    correct: ["Hasn't", "the", "weather", "been", "awful", "this", "summer?"],
    next: "scene_rephrase_4_explain"
  },
  "scene_rephrase_4_explain": {
    type: "text",
    text: "Better: “Hasn’t the weather been awful this summer?”\nWhy: Softer, less pushy — easier to join in.",
    choices: [{ text: "Continue", next: "scene_rephrase_5" }]
  },

  // 5) Plain → Hypothetical
  "scene_rephrase_5": {
    type: "scramble",
    text: "Base: “What is your dream job?”\nRephrase (scramble) as a hypothetical:",
    scramble: ["job", "were", "dream", "your", "object,", "If", "money", "no", "be?", "would", "what"],
    correct: ["If", "money", "were", "no", "object,", "what", "would", "your", "dream", "job", "be?"],
    next: "scene_rephrase_5_explain"
  },
  "scene_rephrase_5_explain": {
    type: "text",
    text: "Better: “If money were no object, what would your dream job be?”\nWhy: Adds creativity and keeps the talk flowing.",
    choices: [{ text: "Continue", next: "scene_rephrase_6" }]
  },

  // 6) Statement with rising intonation
  "scene_rephrase_6": {
    type: "scramble",
    text: "Base: “You work in pharmaceuticals.”\nRephrase (scramble) with questioning intonation:",
    scramble: ["pharmaceuticals?", "in", "work", "You"],
    correct: ["You", "work", "in", "pharmaceuticals?"],
    next: "scene_rephrase_6_explain"
  },
  "scene_rephrase_6_explain": {
    type: "text",
    text: "Better: “You work in pharmaceuticals?”\nWhy: A light check that invites expansion without a heavy question.",
    choices: [{ text: "Continue", next: "scene_rephrase_7" }]
  },

  // 7) Politeness with modals
  "scene_rephrase_7": {
    type: "scramble",
    text: "Base: “Tell me about your work.”\nRephrase (scramble) to make it more polite:",
    scramble: ["you", "a", "me", "Could", "bit", "your", "tell", "about", "work?"],
    correct: ["Could", "you", "tell", "me", "a", "bit", "about", "your", "work?"],
    next: "scene_rephrase_7_explain"
  },
  "scene_rephrase_7_explain": {
    type: "text",
    image: "images/5.png",
    text: "Bootcamp Recap — Question Styles\n\n• Open: “How did you choose that place for your holiday?”\n• Closed: “Do you do any sports?”\n• Negative: “Hasn’t the weather been awful this summer?”\n• Hypothetical: “If money were no object, what would your dream job be?”\n• Tag: “The lesson was at six, wasn’t it?”\n• Intonation: “You work in pharmaceuticals?”\n\nYou’ve practiced opening, listening, variety, usefulness, and reciprocity.\nReady to put it into action?",
    choices: [{ text: "Continue", next: "sceneB1_intro" }]
  },

  "sceneB1_intro": {
    type: "text",
    image: "images/6.png",
    text: "Coffee corner — mid-morning. You (Mateo) approach the espresso machine. Sofía (senior, a bit aloof) is finishing a pull. You want to keep things light and professional.",
    choices: [{ text: "Continue", next: "sceneB1_1" }]
  },

  // B1_1 — Scramble (competence recognition opener)
  "sceneB1_1": {
    type: "scramble",
    text: "Build a friendly opener that recognizes competence (avoid labels or flat comments):",
    scramble: ["know", "You", "your", "machine.", "the", "way", "around", "really"],
    correct: ["You", "really", "know", "your", "way", "around", "the", "machine."],
    next: "sceneB1_1_after"
  },

  "sceneB1_1_after": {
    type: "text",
    text: "Nice. Recognition opens doors without prying. Sofía glances up, half a smile.",
    choices: [{ text: "Continue", next: "sceneB1_2" }]
  },

  // B1_2 — Text MC (follow-up type)
  "sceneB1_2": {
    type: "text",
    text: "Sofía: “I’ve been here a while — my answer is keep steady, observe, and make the best of it.”\n\nWhat’s the best follow-up?",
    choices: [
      { text: "A) So… where do you usually have breakfast?", next: "sceneB1_2_wrong" },
      { text: "B) Do you think that advice works for everyone?", next: "sceneB1_2_wrong" },
      { text: "C) Sounds like you’ve seen a lot of changes here, haven’t you?", next: "sceneB1_2_right" }
    ]
  },

  "sceneB1_2_wrong": {
    type: "text",
    text: "Not ideal. Either too personal or a bit confrontational. Try to validate her perspective and invite more.",
    choices: [{ text: "Continue", next: "sceneB1_3" }]
  },

  "sceneB1_2_right": {
    type: "text",
    text: "Good call — a soft negative question that validates her experience and keeps her talking.",
    choices: [{ text: "Continue", next: "sceneB1_3" }]
  },

  // B1_3 — Audio → text MC (single timer); on wrong, polite exit back to start of Batch 1
  "sceneB1_3": {
    type: "interaction-audio-mc",
    text: "Listen, then choose.",
    audio: "audio/1.mp3", // Sofía prompt
    options: [
      "So you’ve seen a lot of changes here, haven’t you?",      // Correct
      "Do you think that advice works for everyone?",
      "So… where do you usually have breakfast?"
    ],
    correct: 0,
    shuffleOptions: true,
    timer: 15,
    next: "sceneB1_success",
    endings: { wrong: "sceneB1_fail" }
  },

  "sceneB1_fail": {
    type: "text",
    text: "Sofía checks her watch: “I’ve got a meeting to run to.”\n\n(You’ll get another shot later.)",
    choices: [{ text: "Return to coffee corner", next: "sceneB1_intro" }]
  },

  "sceneB1_success": {
    type: "text",
    text: "Sofía warms a touch and keeps talking. (Soft skills: ✔ rapport, ✔ listening.)",
    choices: [{ text: "Continue", next: "sceneB2_intro" }]
  },

  /* ============================
     TRIALS: BATCH 2 (Grace ↔ Tom)
     Interview context; ALL audio→audio MC.
     Replay on wrong until correct.
     Uses images/7.png, audio/2–17.mp3
     ============================ */

// Intro copy stays the same except it now implies wrong sends you back to the HR start.
/* ------- INTRO (reminder of timer + gating) ------- */
"sceneB2_intro": {
  type: "text",
  image: "images/7.png",
  text: "Interview waiting moment — HR meeting room. You are Grace (candidate). Tom (recruiter) is sorting notes. Showing conversational soft skills here is a plus.\n\nHow it works:\n• You’ll hear Tom’s audio first.\n• When the clip ends, a 25-second timer starts.\n• Pick the best audio reply to keep the conversation alive.\n\nYou must clear all four prompts in a row. A wrong choice or a timeout returns you to the start of this module.",
  choices: [{ text: "Got it — begin", next: "sceneB2_1" }]
},

/* ------- B2_1 ------- */
"sceneB2_1": {
  type: "interaction-audio-mc",
  text: "Tom speaks; pick the best opener (25s after audio).",
  audio: "audio/2.mp3",
  options: ["audio/3.mp3","audio/4.mp3","audio/5.mp3"],
  correct: 2,
  shuffleOptions: true,
  timer: 25,
  next: "sceneB2_2",
  endings: { wrong: "sceneB2_1_wrong", timeout: "sceneB2_1_timeout" }
},
"sceneB2_1_wrong": {
  type: "text",
  text: "That opener was either flat or labeling. Use a polite comment about shared context.\n\nTry the HR module again.",
  choices: [{ text: "Return to HR start", next: "sceneB2_intro" }]
},
"sceneB2_1_timeout": {
  type: "text",
  text: "Time’s up. In this module you have 25 seconds to choose after the audio ends.\n\nTry the HR module again.",
  choices: [{ text: "Return to HR start", next: "sceneB2_intro" }]
},

/* ------- B2_2 ------- */
"sceneB2_2": {
  type: "interaction-audio-mc",
  text: "Tom replies; show you listened (25s after audio).",
  audio: "audio/6.mp3",
  options: ["audio/7.mp3","audio/8.mp3","audio/9.mp3"],
  correct: 1,
  shuffleOptions: true,
  timer: 25,
  next: "sceneB2_3",
  endings: { wrong: "sceneB2_2_wrong", timeout: "sceneB2_2_timeout" }
},
"sceneB2_2_wrong": {
  type: "text",
  text: "That came off strong or off-topic. Reflect his point and ask specifically.\n\nBack to the HR start.",
  choices: [{ text: "Return to HR start", next: "sceneB2_intro" }]
},
"sceneB2_2_timeout": {
  type: "text",
  text: "Time’s up. Keep your ears open, then choose within 25 seconds.\n\nBack to the HR start.",
  choices: [{ text: "Return to HR start", next: "sceneB2_intro" }]
},

/* ------- B2_3 ------- */
"sceneB2_3": {
  type: "interaction-audio-mc",
  text: "Tom elaborates; keep him talking (25s after audio).",
  audio: "audio/10.mp3",
  options: ["audio/11.mp3","audio/12.mp3","audio/13.mp3"],
  correct: 0,
  shuffleOptions: true,
  timer: 25,
  next: "sceneB2_4",
  endings: { wrong: "sceneB2_3_wrong", timeout: "sceneB2_3_timeout" }
},
"sceneB2_3_wrong": {
  type: "text",
  text: "Either too self-focused or too personal. Keep the spotlight on his point and broaden appropriately.\n\nRestart the HR module.",
  choices: [{ text: "Return to HR start", next: "sceneB2_intro" }]
},
"sceneB2_3_timeout": {
  type: "text",
  text: "Time’s up. Listen for the cue, then pick within 25 seconds.\n\nRestart the HR module.",
  choices: [{ text: "Return to HR start", next: "sceneB2_intro" }]
},

/* ------- B2_4 ------- */
"sceneB2_4": {
  type: "interaction-audio-mc",
  text: "Bridge small talk into professional content (25s after audio).",
  audio: "audio/14.mp3",
  options: ["audio/15.mp3","audio/16.mp3","audio/17.mp3"],
  correct: 0,
  shuffleOptions: true,
  timer: 25,
  next: "sceneU",
  endings: { wrong: "sceneB2_4_wrong", timeout: "sceneB2_4_timeout" }
},
"sceneB2_4_wrong": {
  type: "text",
  text: "Shallow or dismissive won’t help here. Aim for a professional bridge that respects his flow.\n\nBack to the beginning.",
  choices: [{ text: "Return to HR start", next: "sceneB2_intro" }]
},
"sceneB2_4_timeout": {
  type: "text",
  text: "Time’s up. Use the 25 seconds to choose a precise, professional bridge.\n\nBack to the beginning.",
  choices: [{ text: "Return to HR start", next: "sceneB2_intro" }]
}

,


// ---------------------------
// ENTRY
// ---------------------------
// ---------------------------
// ROUTER & INTRO
// ---------------------------
// =========================
// Party Finale (U → Thank You)
// =========================

/* =========================
   PARTY FLOW (from sceneU)
   ========================= */

"sceneU": {
  type: "text",
  image: "images/10.png",
  text: "Party Finale! \n\nYou are about to test the rooftop BBQ conversation challenges.\n\nPress Start to continue.",
  choices: [{ text: "Start", next: "sceneX" }]
},

// Intro → short video → hub
"sceneX": {
  type: "text",
  image: "images/9.png",
  text: "Your name is Nico. Lucía (a professional you work marketing for and are friends with) has invited you to a barbecue party atop her building's terrace. Though you're good friends with her, you don't really know her inner circle. Time to tease your hair, take a breath mint and be at your most charming! ",
  choices: [{ text: "Continue", next: "sceneX1" }]
},

// Video intro (no overlay), then hub
"sceneX1": {
  type: "video",
  videoSrc: "videos/1.mp4",
  next: "sceneX3"
},

// HUB — now includes a **permanently available** email action
"sceneX3": {
  type: "text",
  image: "images/11.png",
  text: "You’ve been left to fend for yourself. Choose one of three people to mingle with. After each clip ends, you’ll have 15 seconds to pick your line.",
  choices: [
    { text: "A) The tall guy looking at the views", next: "sceneXA" },
    { text: "B) The DJ spinning the grooves",       next: "sceneYA" },
    { text: "C) The barbecue grill master",         next: "sceneZA" },
    { text: "✉️ Email the teacher (comments or questions)", next: "sceneX_email" }
  ]
},

/* ---------------------------
   GUEST A — VIEW-GAZER (Charles)
   --------------------------- */

// A1
"sceneXA": {
  type: "video-choice",
  videoSrc: "videos/2.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "“I guess you're here alone, right?”", next: "sceneXAwrong1" },
    { text: "“Cool view, isn't it?”",              next: "sceneXB" },           // correct path
    { text: "“What may the neighbors make of this noise?”", next: "sceneXAwrong2" }
  ]
},
"sceneXAwrong1": { type: "video", videoSrc: "videos/3.mp4", next: "sceneXAwrong1text" },
"sceneXAwrong1text": {
  type: "text",
  text: "Too intrusive and labeling. You made him feel uncomfortable.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneXAwrong2": { type: "video", videoSrc: "videos/4.mp4", next: "sceneXAwrong2text" },
"sceneXAwrong2text": {
  type: "text",
  text: "Too early to push that kind of opinion. He didn't want the negativity.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

// A2
"sceneXB": {
  type: "video-choice",
  videoSrc: "videos/5.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "A) “Oh yeah? Why would that be?”",                       next: "sceneXC" }, // correct path
    { text: "B) “Do you come up here often?”",                        next: "sceneXBwrong1" },
    { text: "C) “I'm an architecture buff—want me to explain the skyline?”", next: "sceneXBwrong2" }
  ]
},
"sceneXBwrong1": { type: "video", videoSrc: "videos/6.mp4", next: "sceneXBwrong1text" },
"sceneXBwrong1text": {
  type: "text",
  text: "Another yes/no right after a yes/no feels like an interrogation.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneXBwrong2": { type: "video", videoSrc: "videos/7.mp4", next: "sceneXBwrong2text" },
"sceneXBwrong2text": {
  type: "text",
  text: "Lecturing a stranger kills rapport.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

// A3
"sceneXC": {
  type: "video-choice",
  videoSrc: "videos/8.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "A) “You must be here for Lucía's annual sales meeting, right? I'm Nico—I run marketing for her office.”", next: "sceneXCright" }, // correct path
    { text: "B) “I'm Nico—would you like to have a drink with me?”",                                               next: "sceneXCwrong1" },
    { text: "C) “By the way, I'm Nico. So… what brings you to the party?”",                                        next: "sceneXCwrong2" }
  ]
},
"sceneXCwrong1": { type: "video", videoSrc: "videos/9.mp4", next: "sceneXCwrong1text" },
"sceneXCwrong1text": {
  type: "text",
  text: "Too forward, too soon.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneXCwrong2": { type: "video", videoSrc: "videos/10.mp4", next: "sceneXCwrong2text" },
"sceneXCwrong2text": {
  type: "text",
  text: "Jumping to personal details too quickly can stall conversation.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneXCright": { type: "video", videoSrc: "videos/11.mp4", next: "sceneXCrighttext" },
"sceneXCrighttext": {
  type: "text",
  text: "Smooth. You showed interest and made a relevant, low-pressure connection.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

/* ---------------------------
   GUEST B — DJ (Freya)
   --------------------------- */

// B1
"sceneYA": {
  type: "video-choice",
  videoSrc: "videos/12.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "“What's that groove? I think I've heard it before.”", next: "sceneYAwrong1" },
    { text: "“Nice groove—can I ask what it is?”",                 next: "sceneYB" }, // correct path
    { text: "“I recognize that groove—want me to send you a remix of it?”", next: "sceneYAwrong2" }
  ]
},
"sceneYAwrong1": { type: "video", videoSrc: "videos/13.mp4", next: "sceneYAwrong1text" },
"sceneYAwrong1text": {
  type: "text",
  text: "Entitled/intrusive. She shut you down fast.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneYAwrong2": { type: "video", videoSrc: "videos/14.mp4", next: "sceneYAwrong2text" },
"sceneYAwrong2text": {
  type: "text",
  text: "One-upping/pushy is a turn-off here.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

// B2
"sceneYB": {
  type: "video-choice",
  videoSrc: "videos/15.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "A) “How do you keep it airy without losing energy?”", next: "sceneYC" }, // correct path
    { text: "B) “Is this house?”",                                next: "sceneYBwrong1" },
    { text: "C) “Do DJs make good money at gigs like this?”",     next: "sceneYBwrong2" }
  ]
},
"sceneYBwrong1": { type: "video", videoSrc: "videos/16.mp4", next: "sceneYBwrong1text" },
"sceneYBwrong1text": {
  type: "text",
  text: "Too basic/yes-no after the intro; feels like interrogation.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneYBwrong2": { type: "video", videoSrc: "videos/17.mp4", next: "sceneYBwrong2text" },
"sceneYBwrong2text": {
  type: "text",
  text: "Money talk here is off-tone.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

// B3
"sceneYC": {
  type: "video-choice",
  videoSrc: "videos/18.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "i) “You've got great control of the room—I'm Nico. If you get a mellow slot, sunset vibe would be perfect.”", next: "sceneYCright" }, // correct
    { text: "ii) “Nice to meet you, Freya. Could you play my song next?”",                                               next: "sceneYCwrong1" },
    { text: "iii) “I'm Nico. Really enjoy your set! Want to grab a drink?”",                                            next: "sceneYCwrong2" }
  ]
},
"sceneYCwrong1": { type: "video", videoSrc: "videos/19.mp4", next: "sceneYCwrong1text" },
"sceneYCwrong1text": {
  type: "text",
  text: "Entitled request; DJs aren't a jukebox.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneYCwrong2": { type: "video", videoSrc: "videos/20.mp4", next: "sceneYCwrong2text" },
"sceneYCwrong2text": {
  type: "text",
  text: "Pulling talent off duty mid-set ignores context.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneYCright": { type: "video", videoSrc: "videos/21.mp4", next: "sceneYCrighttext" },
"sceneYCrighttext": {
  type: "text",
  text: "Respecting craft + shared vibe built trust and rapport.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

/* ---------------------------
   GUEST C — GRILL MASTER (Sam)
   --------------------------- */

// C1
"sceneZA": {
  type: "video-choice",
  videoSrc: "videos/22.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "“That smells great! Can you make me a plate?”", next: "sceneZAwrong1" },
    { text: "“Those sear marks are pro—what's in the marinade?”", next: "sceneZB" }, // correct path
    { text: "“Aren't those ribs about done?”",               next: "sceneZAwrong2" }
  ]
},
"sceneZAwrong1": { type: "video", videoSrc: "videos/23.mp4", next: "sceneZAwrong1text" },
"sceneZAwrong1text": {
  type: "text",
  text: "Entitled—asking to be served puts pressure on someone working the grill.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneZAwrong2": { type: "video", videoSrc: "videos/24.mp4", next: "sceneZAwrong2text" },
"sceneZAwrong2text": {
  type: "text",
  text: "Opening with criticism is off-tone and one-upping.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

// C2
"sceneZB": {
  type: "video-choice",
  videoSrc: "videos/25.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "A) “Could I steal one tip for doing this at home?”", next: "sceneZC" }, // correct path
    { text: "B) “You must really like meat, right?”",             next: "sceneZBwrong1" },
    { text: "C) “They look great. Add a bit of salt and they'd be off the hook!”", next: "sceneZBwrong2" }
  ]
},
"sceneZBwrong1": { type: "video", videoSrc: "videos/26.mp4", next: "sceneZBwrong1text" },
"sceneZBwrong1text": {
  type: "text",
  text: "Too personal/loaded for a second line. Stay with the task.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneZBwrong2": { type: "video", videoSrc: "videos/27.mp4", next: "sceneZBwrong2text" },
"sceneZBwrong2text": {
  type: "text",
  text: "Prescribing fixes this early feels like a lecture.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

// C3
"sceneZC": {
  type: "video-choice",
  videoSrc: "videos/28.mp4",
  timer: 15,
  timeoutNext: "sceneX3",
  choices: [
    { text: "i) “You're running this like a pro—I'm Nico. If you need a tongs hand-off, I'm right here.”", next: "sceneZCright" }, // correct
    { text: "ii) “I'm Nico, by the way. Want to dance after this batch?”",                              next: "sceneZCwrong1" },
    { text: "iii) “I'm Nico. If you ever need a good butcher, I've got just the guy.”",                  next: "sceneZCwrong2" }
  ]
},
"sceneZCwrong1": { type: "video", videoSrc: "videos/29.mp4", next: "sceneZCwrong1text" },
"sceneZCwrong1text": {
  type: "text",
  text: "Pulling someone off their task mid-flow ignores context. Offer help first.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneZCwrong2": { type: "video", videoSrc: "videos/30.mp4", next: "sceneZCwrong2text" },
"sceneZCwrong2text": {
  type: "text",
  text: "One-upping the vendor/food is negative and status-seeking.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},
"sceneZCright": { type: "video", videoSrc: "videos/31.mp4", next: "sceneZCrighttext" },
"sceneZCrighttext": {
  type: "text",
  text: "You recognized competence, introduced yourself, and offered help—instant trust.",
  choices: [{ text: "Return to the party hub", next: "sceneX3" }]
},

/* ---------------------------
   Email (always available from hub) → Thank you
   --------------------------- */

"sceneX_email": {
  type: "email",
  text: "Share your thoughts with your teacher (what worked, what you’d try next time, and one line you liked).",
  teacherEmail: "teacher@example.com",
  emailSubject: "Party Conversation — Reflection",
  emailBody: "",
  next: "thank_you_scene"
},

"thank_you_scene": {
  type: "text",
  image: "images/9.png",
  text: "Thank you for playing!",
  choices: [{ text: "Play again", next: "sceneU" }]
}







}














// ✅ Step A: make scenes available globally
window.scenes = scenes;

// Make sure text+video scenes have a truthy `text` so the validator passes
(function ensureVideoText(sc){
  Object.values(sc || {}).forEach(s => {
    if (s && s.type === "text" && s.source && (s.text == null || s.text === "")) {
      s.text = " "; // visually empty, satisfies validator
    }
  });
})(window.scenes);


// === GitHub Pages asset fixer ===
// Put AFTER: window.scenes = scenes;
(function fixAssetPathsForPages(){
  const isPages = /github\.io$/.test(location.hostname);
  // If you host at https://user.github.io/repo/, PREFIX becomes "/repo/"
  const prefix = isPages
    ? (location.pathname.replace(/\/index\.html?$/,'').replace(/\/$/,'') + '/')
    : '';

  function add(p){
    if (!p) return p;
    // leave external/relative/data URIs alone
    if (/^(https?:|data:|\.{1,2}\/)/i.test(p)) return p;
    // strip leading slash so "/images/x.png" becomes "images/x.png"
    const clean = p.replace(/^\//,'');
    return prefix + clean;
  }

  const A = (arr, fn) => Array.isArray(arr) ? arr.map(fn) : arr;

  (Object.values(window.scenes || {})).forEach(sc => {
    if (!sc || typeof sc !== 'object') return;
    if (sc.image) sc.image = add(sc.image);
    if (Array.isArray(sc.images)) sc.images = sc.images.map(add);
    if (sc.audio) sc.audio = add(sc.audio);
    if (sc.videoSrc) sc.videoSrc = add(sc.videoSrc);
    if (sc.poster) sc.poster = add(sc.poster);


    if (Array.isArray(sc.options)) {
      sc.options = sc.options.map(o => (typeof o === 'string' && /\.(mp3|wav|ogg|m4a|mp4)$/i.test(o)) ? add(o) : o);
    }
    if (Array.isArray(sc.interactions)) {
      sc.interactions.forEach(it => {
        if (it.audio) it.audio = add(it.audio);
        if (Array.isArray(it.options)) {
          it.options = it.options.map(o => (typeof o === 'string' && /\.(mp3|wav|ogg|m4a)$/i.test(o)) ? add(o) : o);
        }
      });
    }
  });
})();

// Resolve relative assets against <base> reliably
function resolveSrc(p){
  try { return new URL(p, document.baseURI).href; }
  catch { return p || ''; }
}



















// === UNIVERSAL SCENE NORMALIZER (v1) ===
(function normalizeForEngine(){
  function tokensFromText(t){ return String(t||'').trim().split(/\s+/).filter(Boolean); }
  function sentenceFromTextWithBlanks(text){
    const out=[]; const blanks=[];
    const parts = String(text||'').split('___');
    parts.forEach((seg,i)=>{
      if (seg) out.push(...tokensFromText(seg));
      if (i < parts.length-1){ blanks.push(out.length); out.push('___'); }
    });
    return { sentence: out, blanks };
  }

  Object.values(scenes).forEach(sc=>{
    if (!sc || typeof sc !== 'object') return;

    if (sc.type === "dashboard" && Array.isArray(sc.widgets)) {
  sc.widgets = sc.widgets.map((w, i) => {
    const ww = { ...w };
    if (!ww.type && ww.kind) ww.type = ww.kind;   // accept `kind` alias
    if (!ww.id) ww.id = `w_${ww.type || 'widget'}_${i}`;
    return ww;
  });
}

    // SCRAMBLE: accept words/sentence/correct(string)
    if (sc.type === 'scramble'){
      if (!Array.isArray(sc.scramble)) {
        sc.scramble =
          Array.isArray(sc.words)    ? sc.words.slice() :
          Array.isArray(sc.sentence) ? sc.sentence.slice() :
          tokensFromText(sc.text);
      }
      if (typeof sc.correct === 'string') sc.correct = tokensFromText(sc.correct);
      if (!Array.isArray(sc.correct) && Array.isArray(sc.sentence)) sc.correct = sc.sentence.slice();
    }

    // FIB: build sentence/blanks from "___" if missing; normalize correct to array
    if (sc.type === 'fill-in-the-blank'){
      if (!Array.isArray(sc.sentence) || !Array.isArray(sc.blanks)) {
        const { sentence, blanks } = sentenceFromTextWithBlanks(sc.text || '');
        sc.sentence = sentence;
        sc.blanks = blanks.length ? blanks : [Math.max(0, sentence.indexOf('___'))];
      }
      if (typeof sc.correct === 'string') sc.correct = [sc.correct];
      if (!Array.isArray(sc.correct)) sc.correct = [];
      if (!Array.isArray(sc.options)) sc.options = [];
    }

    // AUDIO MC: allow audioSrc + text options + correct as string
    if (sc.type === 'interaction-audio-mc'){
      if (!sc.audio && sc.audioSrc) sc.audio = sc.audioSrc;
      if (typeof sc.correct === 'string' && Array.isArray(sc.options)) {
        const idx = sc.options.findIndex(o =>
          (typeof o === 'string' ? o : o.text).trim().toLowerCase() === sc.correct.trim().toLowerCase()
        );
        if (idx >= 0) sc.__correctIndex = idx;
      } else if (Number.isInteger(sc.correct)) {
        sc.__correctIndex = sc.correct;
      }
    }
    
  });
})();

// --- Scene Normalizer & Validator (global) ---

function normalizeScenes(rawScenes) {
  // Accept either array or object-map; always return array
  const arr = Array.isArray(rawScenes)
    ? rawScenes
    : Object.values(rawScenes || {});

  return arr.map(sc => {
    const s = { ...sc };

    // Normalize casing/aliases
    if ('ken_burns' in s && !('kenBurns' in s)) s.kenBurns = !!s.ken_burns;

    // FIB: normalize correct for single blank
    if (s.type === 'fill-in-the-blank') {
      // never allow empty-token options like "—"
      if (Array.isArray(s.options)) {
        s.options = s.options.map(o =>
          (o === '—' || o === '–' || o === '— (none)') ? 'no preposition' : o
        );
      }
      // if correct provided as array with one entry, flatten to string
      if (Array.isArray(s.correct) && s.correct.length === 1) {
        s.correct = s.correct[0];
      }
    }

    // Scramble: if correct provided as single string, split to tokens
    if (s.type === 'scramble') {
      if (typeof s.correct === 'string') {
        s.correct = s.correct.trim().split(/\s+/);
      }
      if (typeof s.sentence === 'string') {
        s.sentence = s.sentence.trim().split(/\s+/);
      }
    }

    // Hard rule: no custom "timed" type; normalize legacy data
    if (s.type === 'timed') {
      throw new Error(
        `Legacy type "timed" found in ${s.id}. Use a supported type (e.g., fill-in-the-blank) and add "timer".`
      );
    }

    return s;
  });
}

function validateScenesContract(scenesArr) {
  const ids = new Set(scenesArr.map(x => x.id));
  const problems = [];

  const must = (cond, msg) => { if (!cond) problems.push(msg); };

  for (const sc of scenesArr) {
    must(!!sc.id, `Scene missing id.`);
    must(!!sc.type, `${sc.id}: missing type.`);

    // forward links
    if (sc.next) must(ids.has(sc.next), `${sc.id}: next -> "${sc.next}" not found.`);
    if (Array.isArray(sc.choices)) {
      sc.choices.forEach((c, i) => must(ids.has(c.next), `${sc.id}: choices[${i}].next -> "${c.next}" not found.`));
    }

    switch (sc.type) {
      case 'text':
        must((Array.isArray(sc.choices) && sc.choices.length) || !!sc.next,
            `${sc.id}: text scene needs choices[] or next.`);
        break;

      case 'scramble':
        must(Array.isArray(sc.sentence) && sc.sentence.length > 0,
            `${sc.id}: scramble needs sentence[].`);
        must(Array.isArray(sc.correct) && sc.correct.length > 0,
            `${sc.id}: scramble needs correct[].`);
        must(sc.sentence.length === sc.correct.length,
            `${sc.id}: sentence[] and correct[] length mismatch.`);
        break;

      case 'fill-in-the-blank':
        must(typeof sc.text === 'string' && sc.text.includes('___'),
            `${sc.id}: FIB text must include ___ placeholder.`);
        must(Array.isArray(sc.options) && sc.options.length > 0,
            `${sc.id}: FIB requires non-empty options[].`);
        must(sc.correct !== undefined && sc.correct !== null && sc.correct !== '',
            `${sc.id}: FIB missing correct answer.`);
        // if multiple blanks, enforce array
        const blanks = (sc.text.match(/___/g) || []).length;
        if (blanks > 1) {
          must(Array.isArray(sc.correct) && sc.correct.length === blanks,
              `${sc.id}: FIB has ${blanks} blanks; correct must be array of ${blanks}.`);
        } else {
          must(typeof sc.correct === 'string',
              `${sc.id}: FIB (single blank) correct must be a string.`);
        }
        break;

      case 'interaction-audio-mc':
        must(!!sc.audioSrc, `${sc.id}: audioSrc missing.`);
        must(Array.isArray(sc.options) && sc.options.length >= 2,
            `${sc.id}: audio MC needs options[].`);
        must(typeof sc.correct === 'string',
            `${sc.id}: audio MC correct must be a string.`);
        break;

      case 'video-multiple-choice':
        must(!!sc.videoSrc, `${sc.id}: videoSrc missing.`);
        must(Array.isArray(sc.options) && sc.options.length >= 2,
            `${sc.id}: video MC needs options[].`);
        sc.options.forEach((o, i) => {
          must(typeof o.text === 'string', `${sc.id}: options[${i}].text missing.`);
          must(typeof o.correct === 'boolean', `${sc.id}: options[${i}].correct missing.`);
          must(ids.has(o.next), `${sc.id}: options[${i}].next -> "${o.next}" not found.`);
        });
        break;

      case 'email':
        must(!!sc.teacherEmail, `${sc.id}: email needs teacherEmail.`);
        must(!!sc.next, `${sc.id}: email needs next (usually thank_you_scene).`);
        break;

      default:
        problems.push(`${sc.id}: Unsupported type "${sc.type}".`);
    }
  }
  return problems;
}

// ===== Engine Hardening v2 =====
window.ENGINE_VERSION = '2.0.0';

// 0) Make transient registry visible to helpers (prevents ReferenceError)
window.__transients = window.__transients || { nodes:new Set(), timers:new Set(), cleaners:new Set(), listeners:new Set() };
const __transients = window.__transients; // <-- critical alias used by helpers

// 1) Global error overlay so crashes never look like a black screen
(function installErrorOverlay(){
  if (window.__errorOverlayInstalled) return; window.__errorOverlayInstalled=true;
  function showOverlay(title, detail){
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;inset:0;background:#000b;color:#0ff;z-index:999999;display:grid;place-items:center;padding:20px;';
    const card = document.createElement('pre');
    card.style.cssText = 'background:#0a0a0f;border:1px solid #00ffff55;border-radius:12px;max-width:90vw;max-height:80vh;overflow:auto;padding:16px;font:12px/1.5 monospace;white-space:pre-wrap;';
    card.textContent = `[A-State Engine]\n${title}\n\n${detail}`;
    wrap.appendChild(card);
    document.body.appendChild(wrap);
  }
  window.addEventListener('error', e => showOverlay('Runtime Error', (e.error && e.error.stack) || e.message));
  window.addEventListener('unhandledrejection', e => showOverlay('Unhandled Promise Rejection', (e.reason && e.reason.stack) || String(e.reason)));
})();

// 2) Strict validator (lightweight, no external libs)
function validateScenesStrict(all){
  const ids = new Set(Object.keys(all||{}));
  const errors = [];
  const warns  = [];
  function req(cond, id, msg){ if(!cond) errors.push(`[${id}] ${msg}`); }
  function w(cond, id, msg){ if(!cond) warns.push(`[${id}] ${msg}`); }

  for (const [id, sc] of Object.entries(all||{})) {
    req(sc && typeof sc === 'object', id, 'scene must be an object');
    const t = sc.type || 'text';

    // Common forward-refs
    if (sc.next) w(ids.has(sc.next), id, `next → "${sc.next}" not found`);
    if (sc.endings) {
      ['high','medium','low'].forEach(key => { if (sc.endings[key]) w(ids.has(sc.endings[key]), id, `endings.${key} → "${sc.endings[key]}" not found`); });
    }
    if (Array.isArray(sc.choices)) sc.choices.forEach(c => w(ids.has(c.next), id, `choice "${c.text}" → "${c.next}" not found`));

    // Per-type checks (subset; extend as needed)
    switch (t) {
      case 'text':
        req(!!sc.text, id, 'text scene needs "text"');
        break;

      case 'scramble': {
  const src =
    (Array.isArray(sc.scramble) && sc.scramble) ||
    (Array.isArray(sc.words) && sc.words) ||
    (Array.isArray(sc.sentence) && sc.sentence) ||
    null;

  req(Array.isArray(src) && src.length, id, 'scramble needs tokens in scramble[]/words[]/sentence[]');

  const corr = Array.isArray(sc.correct)
    ? sc.correct
    : (typeof sc.correct === 'string' ? sc.correct.trim().split(/\s+/) : null);

  req(Array.isArray(corr) && corr.length, id, 'scramble needs correct[] (or string)');
  req(!!sc.next, id, 'scramble needs next');
  break;
}


      case 'fill-in-the-blank':
      case 'interaction-fill-in-the-blank':
        req(Array.isArray(sc.sentence), id, 'needs sentence[]');
        req(Array.isArray(sc.blanks), id, 'needs blanks[]');
        req(Array.isArray(sc.options), id, 'needs options[]');
        req(Array.isArray(sc.correct), id, 'needs correct[]');
        req(sc.correct.length === sc.blanks.length, id, 'correct length must equal blanks length');
        req(!!sc.next, id, 'needs next');
        break;

      case 'interaction':
        req(Array.isArray(sc.interactions) && sc.interactions.length, id, 'needs interactions[]');
        sc.interactions.forEach((it, i)=>{
          req(typeof it.audio === 'string' && it.audio.length, id, `interactions[${i}] needs audio`);
          req(Array.isArray(it.options) && it.options.length, id, `interactions[${i}] needs options[]`);
          req(typeof it.correct !== 'undefined', id, `interactions[${i}] needs correct (index or scoring)`);
        });
        req(sc.scoring && typeof sc.scoring === 'object', id, 'needs scoring{high,medium}');
        req(sc.endings && typeof sc.endings === 'object', id, 'needs endings{high,medium,low}');
        break;

      case 'interaction-scramble':
        req(Array.isArray(sc.scramble) && sc.scramble.length, id, 'needs scramble[]');
        req(Array.isArray(sc.correct) && sc.correct.length, id, 'needs correct[]');
        req(typeof sc.audio === 'string' && sc.audio.length, id, 'needs audio');
        req(sc.next, id, 'needs next');
        break;

      case 'interaction-audio-mc':
  req( (typeof sc.audio === 'string' && sc.audio.length) ||
       (typeof sc.audioSrc === 'string' && sc.audioSrc.length),
       id, 'needs prompt audio (audio or audioSrc)');
  req(Array.isArray(sc.options) && sc.options.length >= 2,
      id, 'needs options[]');
  // allow either numeric index or string match
  req(Number.isInteger(sc.correct) || typeof sc.correct === 'string' || Number.isInteger(sc.__correctIndex),
      id, 'needs correct (index or matching string)');
  req(sc.next, id, 'needs next');
  break;


      case 'video':
      case 'video-scramble':
      case 'video-fill-in-the-blank':
      case 'video-multi-question':
      case 'video-multi-audio-choice':
        req(typeof sc.videoSrc === 'string' && sc.videoSrc.length, id, `${t} needs videoSrc`);
        // question/fields validated inside loader, but we warn:
        if (t==='video-multi-question') w(Array.isArray(sc.questions) && sc.questions.length, id, 'video-multi-question expects questions[]');
        break;

      case 'email':
        req(typeof sc.teacherEmail === 'string' && sc.teacherEmail.includes('@'), id, 'needs teacherEmail');
        req(typeof sc.emailSubject === 'string', id, 'needs emailSubject');
        break;

      // Mini-games
      case 'hangman':
        req(typeof sc.target === 'string' && sc.target.length, id, 'hangman needs target');
        break;

      case 'survivor-quiz':
      case 'conjugation-race':
      case 'image-hotspots':
      case 'buckets':
      case 'particle-swapper':
      case 'comic-bubbles':
      case 'dashboard':
        // Keep loose; these scenes vary. Rely on loader internals.
        break;

      default:
        w(false, id, `unknown type "${t}" — engine will treat as text`);
    }
  }
  return { errors, warns };
}

// 3) Asset preloader (quietly warms images/audio/video for next scene)
function listAssetsForScene(sc){
  const imgs = new Set(), auds = new Set(), vids = new Set();
  if (!sc || typeof sc !== 'object') return {imgs,auds,vids};
  if (sc.image) imgs.add(sc.image);
  if (sc.poster) imgs.add(sc.poster); // ✅ preload video poster too
  if (Array.isArray(sc.images)) sc.images.forEach(x=>imgs.add(x));
  if (sc.audio) auds.add(sc.audio);
  if (Array.isArray(sc.interactions)) sc.interactions.forEach(it=>{
    if (it.audio) auds.add(it.audio);
    if (Array.isArray(it.options)) it.options.forEach(opt=>{
      if (typeof opt === 'string' && /\.(mp3|wav|ogg|m4a)$/i.test(opt)) auds.add(opt);
    });
  });
  if (typeof sc.videoSrc === 'string') vids.add(sc.videoSrc);
  return {imgs,auds,vids};
}
const __preloaded = new Set();
function preloadAssetsFor(id){
  const sc = (window.scenes||{})[id];
  if (!sc) return;

  const {imgs,auds,vids} = listAssetsForScene(sc);

  imgs.forEach(src => {
    if (!src) return;
    const url = resolveSrc(src);
    if (__preloaded.has(url)) return;
    const i = new Image();
    // small wins for faster decode
    i.decoding = 'async';
    i.loading  = 'eager';
    i.src = url;
    __preloaded.add(url);
  });

  auds.forEach(src => {
    if (!src) return;
    const url = resolveSrc(src);
    if (__preloaded.has(url)) return;
    const a = document.createElement('audio');
    a.preload = 'auto';
    a.src = url;
    try { a.load(); } catch(_) {}
    __preloaded.add(url);
  });

  vids.forEach(src => {
    if (!src) return;
    const url = resolveSrc(src);
    if (__preloaded.has(url)) return;
    const v = document.createElement('video');
    v.preload = 'metadata';
    v.setAttribute('playsinline','');
    v.setAttribute('webkit-playsinline','');
    v.playsInline = true;
    v.src = url;
    try { v.load(); } catch(_) {}
    __preloaded.add(url);
  });
}


// 4) Safe start: clean data → validate → preload → start or show errors
(function safeBootstrap(){
  try {
 // sanitize unicode quirks
if (typeof cleanScenesData === 'function') cleanScenesData(window.scenes);

// 🔧 normalize scene shapes BEFORE validating/using
if (typeof window.normalizeScenesForEngine === 'function') {
  // (not needed because we used an IIFE above)
} // kept for clarity

const {errors, warns} = validateScenesStrict(window.scenes);

    warns.forEach(w => console.warn('[Scene Warning]', w));
    if (errors.length){
      console.error('[Scene Errors]', errors);
      const detail = errors.join('\n');
      const evt = new Error('Scene validation failed:\n' + detail);
      throw evt; // triggers overlay
    }

    // Preload first scene + immediate next(s)
    if (window.scenes && window.scenes.scene1) {
      preloadAssetsFor('scene1');
      if (window.scenes.scene1.next) preloadAssetsFor(window.scenes.scene1.next);
      if (Array.isArray(window.scenes.scene1.choices)) window.scenes.scene1.choices.forEach(c=>preloadAssetsFor(c.next));
    }

    // expose a safeStart you already call from the Play button
    window.safeStartGame = function(){
      try { startGame(); } catch(err) { console.error(err); throw err; }
    };

    // optional: make the homepage button call safeStartGame instead
    const btn = document.querySelector('#overlay-content .button-group button');
    if (btn && !btn.__wired) { btn.onclick = () => window.safeStartGame(); btn.__wired = true; }

  } catch(e) {
    // overlay installs in (1); rethrow for visibility
    console.error('[Bootstrap]', e);
    throw e;
  }
})();



























































// --- Usage (do this once where you load scenes) ---
// const raw = scenes; // your imported scenes (object or array)
// const normalized = normalizeScenes(raw);
// const errs = validateScenesContract(Array.isArray(normalized) ? normalized : Object.values(normalized));
// if (errs.length) { console.error(errs); alert("Scene errors:\n\n" + errs.join("\n")); throw new Error("Invalid scenes."); }
// window.scenes = Array.isArray(normalized) ? normalized : Object.values(normalized);



const ENABLE_TEST_HUB = false; // flip to true only while testing




// --- Transient registry (one-time, keep above loadScene) ---
// --- Transient registry (one-time, keep above loadScene) ---
window.__transients = window.__transients || { nodes:new Set(), timers:new Set(), cleaners:new Set(), listeners:new Set() };


function registerNode(node){
  node.dataset.transient = "1";
  __transients.nodes.add(node);
  return node;
}
function registerTimer(id){
  __transients.timers.add(id);
  return id;
}
function registerCleanup(fn){
  __transients.cleaners.add(fn);
  return fn;
}
function registerListener(target, evt, handler, opts){
  target.addEventListener(evt, handler, opts);
  __transients.listeners.add(() => target.removeEventListener(evt, handler, opts));
  return handler;
}
function cleanupTransients(){
  __transients.timers.forEach(t => { try { clearInterval(t); clearTimeout(t); } catch(_){} });
  __transients.timers.clear();

  __transients.cleaners.forEach(fn => { try { fn(); } catch(_){} });
  __transients.cleaners.clear();

  __transients.listeners.forEach(off => { try { off(); } catch(_){} });
  __transients.listeners.clear();

  document.querySelectorAll('[data-transient="1"]').forEach(n => n.remove());
  __transients.nodes.clear();
}

// --- Scene hero (image-on-top) helper ---
function renderSceneHeader(sc, root) {
  // image (if provided)
  if (sc.image) {
    const wrap = document.createElement('div');
    wrap.className = 'scene-hero';
    const img = document.createElement('img');
    img.src = sc.image;
    img.alt = sc.alt || '';
    img.loading = 'eager';
    wrap.appendChild(img);
    root.appendChild(wrap);
  }
  // title/lead text (optional if your loader already shows sc.text)
  if (sc.text) {
    const p = document.createElement('div');
    p.className = 'scene-lead';
    p.innerHTML = sc.text; // if you already render sc.text elsewhere, remove this
    root.appendChild(p);
  }
}


// ===== Persistence V2 (resume last scene + tallies) =====
// === Robust Resume Game (safe + validated) ===
(function () {
  const SAVE_KEY = 'game_progress_v1';

  const qs  = sel => document.querySelector(sel);
  const $id = id  => document.getElementById(id);

  function readSave() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY)); }
    catch { return null; }
  }
  function writeSave(obj) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(obj)); } catch {}
  }

  function showHome() {
    const overlay = $id('overlay') || qs('#overlay-content')?.parentElement;
    const game    = $id('game-container');
    if (game)    game.style.display = 'none';
    if (overlay) overlay.style.display = ''; // let CSS decide (block/grid)
  }
  function hideHome() {
    const overlay = $id('overlay') || qs('#overlay-content')?.parentElement;
    const game    = $id('game-container');
    if (overlay) overlay.style.display = 'none';
    if (game)    game.style.display = 'block';
  }

  function sceneExists(id) {
    const s = (window.scenes || {});
    // support both object map and array-of-scenes (rare)
    if (Array.isArray(s)) return s.some(x => x && x.id === id);
    return !!s[id];
  }

  function whenLoadSceneReady(run) {
    if (typeof window.loadScene === 'function') { run(); return; }
    let tries = 0;
    (function tick() {
      if (typeof window.loadScene === 'function') { run(); return; }
      if (tries++ > 200) { // ~6s safety
        console.warn('[Resume] loadScene never became available; showing home.');
        showHome();
        return;
      }
      setTimeout(tick, 30);
    })();
  }

  function tryResume() {
    const saved = readSave();
    const last  = saved?.lastScene;

    // Validate saved target
    if (!last || !sceneExists(last)) {
      console.warn('[Resume] No valid lastScene. Showing home.');
      showHome();
      return;
    }

    hideHome();

    // Call loadScene defensively
    whenLoadSceneReady(() => {
      try {
        window.loadScene(last);

        // Post-check: if the scene didn’t mount anything, bail back home
        setTimeout(() => {
          const game = $id('game-container');
          const hasContent =
            game && (
              game.children.length > 0 ||
              ($id('scene-text') && $id('scene-text').textContent.trim().length) ||
              $id('scene-video') || $id('scene-image')
            );
          if (!hasContent) {
            console.warn('[Resume] Scene did not render; falling back to home.');
            showHome();
          }
        }, 100);
      } catch (err) {
        console.error('[Resume] loadScene threw:', err);
        showHome();
      }
    });
  }

  function updateResumeButton() {
    const btn = $id('resume-btn');
    if (!btn) return;
    const saved = readSave();
    const ok    = saved?.lastScene && sceneExists(saved.lastScene);
    btn.disabled = !ok;
    btn.textContent = 'Resume game';
    btn.onclick = ok ? tryResume : null;
  }

  // Always land on homepage initially
  window.addEventListener('DOMContentLoaded', () => {
    showHome();
    updateResumeButton();
  });

  // Hook loadScene to keep lastScene fresh
  (function installLoadSceneHook() {
    const original = window.loadScene;
    if (typeof original !== 'function') {
      // If this runs before loadScene is defined, try again later.
      let tries = 0;
      (function wait() {
        if (typeof window.loadScene === 'function') {
          install(); return;
        }
        if (tries++ > 200) return; // give up silently
        setTimeout(wait, 30);
      })();
      return;
    }
    install();

    function install() {
      const orig = window.loadScene;
      window.loadScene = function (id) {
        const r = orig.apply(this, arguments);
        const saved = readSave() || {};
        saved.lastScene = id;
        if (window.progress) {
          saved.flags    = window.progress.flags || saved.flags || {};
          saved.unlocked = Array.from(window.progress.unlocked || saved.unlocked || []);
        }
        writeSave(saved);
        try { updateResumeButton(); } catch {}
        return r;
      };
    }
  })();

  // Expose a quick dev reset (optional)
  window.resetProgressToHome = function() {
    localStorage.removeItem(SAVE_KEY);
    showHome();
  };
})();



// === Add-ons: persistence + QA overlay + scene validator ===
(function () {
  const STORAGE_KEY = 'game_progress_v1';

  // 1) Ensure a progress object exists (and normalize types)
  if (!window.progress) {
    window.progress = { flags: {}, unlocked: new Set(['scene1']) };
  } else if (!(progress.unlocked instanceof Set)) {
    progress.unlocked = new Set(progress.unlocked || ['scene1']);
  }

  // 2) Load saved progress
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      progress.flags = saved.flags || {};
      progress.unlocked = new Set(saved.unlocked || ['scene1']);
    }
  } catch (e) { console.warn('Progress load failed:', e); }

  function saveProgress() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ flags: progress.flags, unlocked: Array.from(progress.unlocked) })
      );
    } catch (e) { console.warn('Progress save failed:', e); }
  }

  // 3) Ensure/augment helpers (wrap existing to add auto-save)
  if (typeof window.setFlag !== 'function') {
    window.setFlag = function setFlag(name, val = true) {
      progress.flags[name] = !!val;
      saveProgress();
    };
  } else {
    const _setFlag = window.setFlag;
    window.setFlag = function (name, val = true) { _setFlag(name, val); saveProgress(); };
  }

  if (typeof window.unlockScene !== 'function') {
    window.unlockScene = function unlockScene(id) {
      if (id) progress.unlocked.add(id);
      saveProgress();
    };
  } else {
    const _unlockScene = window.unlockScene;
    window.unlockScene = function (id) { _unlockScene(id); saveProgress(); };
  }

  window.hasFlag = window.hasFlag || function hasFlag(name) { return !!progress.flags[name]; };
  window.isUnlocked = window.isUnlocked || function isUnlocked(id) { return progress.unlocked.has(id); };



// 4) QA overlay (Shift+Q to toggle)
(function () {
  let visible = false;
  window.toggleQA = function toggleQA() {
    visible = !visible;
    let el = document.getElementById('qa-overlay');
    if (visible) {
      if (!el) {
        el = document.createElement('pre');
        el.id = 'qa-overlay';
        el.style.cssText =
          'position:fixed;right:8px;bottom:8px;max-width:40vw;max-height:40vh;overflow:auto;' +
          'background:#000a;color:#0ff;padding:8px;border:1px solid #0ff;font:12px/1.4 monospace;z-index:99999;';
        document.body.appendChild(el);
      }
      el.textContent = JSON.stringify({
        currentSceneId: window.currentSceneId,
        flags: progress.flags,
        unlocked: Array.from(progress.unlocked)
      }, null, 2);
    } else if (el) {
      el.remove();
    }
  };
})();

// === Resume Game (drop-in) ===
(function () {
  const SAVE_KEY = 'game_progress_v1';

  function readSave() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY)); }
    catch { return null; }
  }
  function writeSave(obj) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(obj)); }
    catch {}
  }

  function hideHome() {
    const overlay = document.getElementById('overlay') || document.querySelector('#overlay-content')?.parentElement;
    const game = document.getElementById('game-container');
    if (overlay) overlay.style.display = 'none';
    if (game) game.style.display = 'block';
  }
  function showHome() {
    const overlay = document.getElementById('overlay') || document.querySelector('#overlay-content')?.parentElement;
    const game = document.getElementById('game-container');
    if (game) game.style.display = 'none';
    if (overlay) overlay.style.display = 'grid'; // or 'block' depending on your CSS
  }
  window.showHome = window.showHome || showHome; // expose for convenience

  function updateResumeButton() {
    const btn = document.getElementById('resume-btn');
    if (!btn) return;
    const saved = readSave();
    const last = saved?.lastScene;
    if (last) {
      btn.disabled = false;
      btn.textContent = 'Resume game';
      btn.onclick = () => { hideHome(); loadScene(last); };
    } else {
      btn.disabled = true;
      btn.textContent = 'Resume game';
      btn.onclick = null;
    }
  }

  // Always land on homepage on fresh load (no auto-start)
  window.addEventListener('DOMContentLoaded', () => {
    showHome();
    updateResumeButton();
  });

  // Hook loadScene so every scene change updates the save (incl. lastScene)
  (function installLoadSceneHook() {
    const original = window.loadScene;
    if (typeof original !== 'function') return; // will still work once loadScene exists if you move this below its def.

    window.loadScene = function (id) {
      const result = original.apply(this, arguments);

      // Persist lastScene + flags/unlocked if available
      const saved = readSave() || {};
      saved.lastScene = id;
      if (window.progress) {
        saved.flags = window.progress.flags || saved.flags || {};
        saved.unlocked = Array.from(window.progress.unlocked || saved.unlocked || []);
      }
      writeSave(saved);

      // Keep the homepage Resume button fresh if user returns there later
      try { updateResumeButton(); } catch {}
      return result;
    };
  })();

  // Optional: if your Play button isn’t already wired, you can do:
  // document.querySelector('#overlay-content .button-group button.play')
  //   ?.addEventListener('click', () => { hideHome(); window.safeStartGame ? safeStartGame() : startGame(); });

})();

(function addQAShortcut() {
  if (window.__qaShortcutAdded) return;
  window.__qaShortcutAdded = true;
  document.addEventListener('keydown', function (e) {
    if (e.shiftKey && e.key.toLowerCase() === 'q') {
      e.preventDefault();
      window.toggleQA();
    }
  });
})();

// === CRM mini-store (state + persistence + pub/sub) ===
(function initCRM() {
  const KEY = 'crm_state_v1';

  const defaultState = {
    kpis: { revenue: 0, churn: 0, satisfaction: 50 },
    bars: { satisfaction: [ { label: 'Eng', value: 68 }, { label: 'Sales', value: 74 }, { label: 'Ops', value: 62 } ] },
    pies: { satisfactionSplit: [ { label: 'Satisfied', value: 60 }, { label: 'Neutral', value: 25 }, { label: 'Dissatisfied', value: 15 } ] },
    tables: { tickets: [['#812','Resolved','5m'], ['#905','Escalated','24h']] }
  };

  const listeners = new Set();

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      return raw ? deepMerge(structuredClone(defaultState), raw) : structuredClone(defaultState);
    } catch { return structuredClone(defaultState); }
  }

  function save() { try { localStorage.setItem(KEY, JSON.stringify(window.crm.state)); } catch {} }
  function notify() { listeners.forEach(fn => { try { fn(window.crm.state); } catch {} }); }
  function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

  function setByPath(obj, path, val) {
    const parts = path.split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
      cur = cur[p];
    }
    cur[parts[parts.length - 1]] = val;
  }

  function apply(delta) {
    if (!delta) return;
    const st = window.crm.state;

    if (delta.kpis && typeof delta.kpis === 'object') {
      for (const [k, v] of Object.entries(delta.kpis)) {
        st.kpis[k] = (Number(st.kpis[k]) || 0) + Number(v || 0);
      }
    }
    if (delta.set && typeof delta.set === 'object') {
      for (const [path, val] of Object.entries(delta.set)) setByPath(st, path, val);
    }
    if (delta.appendRows && typeof delta.appendRows === 'object') {
      for (const [tableId, rows] of Object.entries(delta.appendRows)) {
        if (!Array.isArray(st.tables[tableId])) st.tables[tableId] = [];
        st.tables[tableId].push(...rows);
      }
    }
    save();
    notify();
  }

  function deepMerge(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) return b.slice();
    if (a && typeof a === 'object' && b && typeof b === 'object') {
      for (const k of Object.keys(b)) a[k] = deepMerge(a[k], b[k]);
      return a;
    }
    return b === undefined ? a : b;
  }

  window.crm = {
    state: load(),
    apply,
    subscribe,
    reset() { window.crm.state = structuredClone(defaultState); save(); notify(); },
    save
  };
})();


  (function addQAShortcut() {
    if (window.__qaShortcutAdded) return;
    window.__qaShortcutAdded = true;
    document.addEventListener('keydown', function (e) {
      if (e.shiftKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        window.toggleQA();
      }
    });
  })();

  // 5) Scene graph validator (warns only)
  window.validateScenes = window.validateScenes || function validateScenes() {
    if (!window.scenes) return;
    const ids = new Set(Object.keys(window.scenes));
    for (const [id, sc] of Object.entries(window.scenes)) {
      (sc.choices || []).forEach(c => {
        if (c.next && !ids.has(c.next)) console.warn(`[validateScenes] Missing choice target: ${id} → ${c.next}`);
      });
      if (sc.next && !ids.has(sc.next)) console.warn(`[validateScenes] Missing next: ${id} → ${sc.next}`);
      if (sc.endings) {
        ['high', 'medium', 'low'].forEach(k => {
          const dest = sc.endings[k];
          if (dest && !ids.has(dest)) console.warn(`[validateScenes] Missing ending target: ${id}.${k} → ${dest}`);
        });
      }
    }
  };

  // Run once after scenes load
  window.validateScenes();
})();


// === Game start setup ===
let currentSceneId = "scene1";

function startGame() {
  const overlay = document.getElementById("overlay-content");
  const gameContainer = document.getElementById("game-container");
  if (overlay) overlay.style.display = "none";
  if (gameContainer) gameContainer.style.display = "block";
  if (window.BGM) window.BGM.pauseForGameStart(); // NEW: stop homepage music when game starts
  loadScene(currentSceneId);
}

// === Utilities ===
function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}
// Helper to clean words of problematic Unicode characters
function cleanWord(word) {
  // Replace non-breaking spaces and remove non-ASCII chars
  return word.replace(/\u00A0/g, ' ').replace(/[^\x00-\x7F]/g, '');
}
// Helper to clean words of problematic Unicode characters
function cleanWord(word) {
  return word.replace(/\u00A0/g, ' ').replace(/[^\x00-\x7F]/g, '');
}

// Clean all relevant arrays in all scenes
function cleanScenesData(scenesObj) {
  for (const key in scenesObj) {
    if (!scenesObj.hasOwnProperty(key)) continue;
    const scene = scenesObj[key];
    if (!scene) continue;

    if (scene.sentence && Array.isArray(scene.sentence)) {
      scene.sentence = scene.sentence.map(word => cleanWord(word));
    }
    if (scene.options && Array.isArray(scene.options)) {
      scene.options = scene.options.map(word => cleanWord(word));
    }
    if (scene.correct && Array.isArray(scene.correct)) {
      scene.correct = scene.correct.map(word => cleanWord(word));
    }
    if (scene.scramble && Array.isArray(scene.scramble)) {
      scene.scramble = scene.scramble.map(word => cleanWord(word));
    }
  }
}




// === Main scene loader ===
function loadScene(id) {
  console.log(`\n>>> loadScene called with ID: "${id}"`);
  const scene = scenes[id];
  if (!scene) {
    console.error(`Scene data not found for ID: ${id}`);
    return;
  }
  currentSceneId = id;
  try { progress.lastSceneId = id; if (typeof saveProgressNow === 'function') saveProgressNow(); } catch(_){}


  if (Array.isArray(scene.onEnterUnlockScenes)) scene.onEnterUnlockScenes.forEach(unlockScene);
  if (Array.isArray(scene.onEnterSetFlags)) scene.onEnterSetFlags.forEach(setFlag);

  // Apply CRM deltas on enter (optional per scene)
  try {
    if (scene.applyCrm) window.crm && window.crm.apply(scene.applyCrm);
  } catch (e) { console.warn('CRM apply (onEnter) failed', e); }

  // === UNIVERSAL CLEANUP AT START ===
  console.log('[onEnter]', {
    sceneId: id,
    setFlags: scene.onEnterSetFlags || [],
    unlockScenes: scene.onEnterUnlockScenes || [],
    flagsNow: { ...progress.flags },
    unlockedNow: Array.from(progress.unlocked || [])
  });

  // Remove and clean audio player if present
  const audioElem = document.getElementById("scene-audio");
  if (audioElem) {
    audioElem.pause();
    audioElem.src = "";
    audioElem.load();
    audioElem.remove();
  }

  // Grab all containers safely
  const sceneImage = document.getElementById("scene-image");
  const sceneText = document.getElementById("scene-text");
  const scrambleDiv = document.getElementById("sentence-scramble");
  const feedbackDiv = document.getElementById("scramble-feedback");
  const fillBlankContainer = document.getElementById("sceneFillInTheBlank");
  const infoDiv = document.getElementById("challenge-info");
  const choicesDiv = document.getElementById("choices-container");
  const scene6UI = document.getElementById("scene6-ui");
  const gameContainer = document.getElementById("game-container");
  const container = document.getElementById('scene-container');
  const emailContainer = document.getElementById("email-challenge-container");

  // Clear and hide all relevant containers to prevent UI seepage
  [
    container,
    sceneImage,
    sceneText,
    infoDiv,
    choicesDiv,
    scrambleDiv,
    feedbackDiv,
    fillBlankContainer,
    scene6UI
  ].forEach(el => {
    if (el) {
      el.style.display = "none";
      el.innerHTML = "";
    }
  });

  // Clear video multi-question UI if present
  const questionUI = document.getElementById("video-question-ui");
  if (questionUI) {
    questionUI.style.display = "none";
    questionUI.innerHTML = "";
  }

  // Remove or hide video player if present
  const videoElem = document.getElementById("scene-video");
  if (videoElem) {
    videoElem.pause();
    videoElem.src = "";
    videoElem.load();
    videoElem.remove(); // completely remove from DOM
  }

  // --- Hangman teardown (prevents elements seeping across scenes) ---
  const hm = document.getElementById('hangman');
  if (hm) hm.remove();
  if (window.__hmKeyHandler) {
    document.removeEventListener('keydown', window.__hmKeyHandler);
    window.__hmKeyHandler = null;
  }

  // --- Survivor teardown (prevents seepage) ---
  if (window.__svCleanup) { window.__svCleanup(); window.__svCleanup = null; }
  const svWrap = document.getElementById('survivor-quiz');
  if (svWrap) svWrap.remove();

  // --- Conjugation Race teardown (prevents seepage) ---
  if (window.__crCleanup) { window.__crCleanup(); window.__crCleanup = null; }
  const crWrap = document.getElementById('conj-race');
  if (crWrap) crWrap.remove();

  // --- Hotspots teardown (prevents seepage) ---
  if (window.__hsCleanup) { window.__hsCleanup(); window.__hsCleanup = null; }
  const hsWrap = document.getElementById('hotspots');
  if (hsWrap) hsWrap.remove();

  // --- Buckets teardown (prevents seepage) ---
  if (window.__bkCleanup) { window.__bkCleanup(); window.__bkCleanup = null; }
  const bkWrap = document.getElementById('buckets');
  if (bkWrap) bkWrap.remove();

  // --- Particle Swapper teardown (prevents seepage) ---
  if (window.__psCleanup) { window.__psCleanup(); window.__psCleanup = null; }
  const psWrap = document.getElementById('particle-swapper');
  if (psWrap) psWrap.remove();

  // --- Comic Bubbles teardown (prevents seepage) ---
  if (window.__cbCleanup) { window.__cbCleanup(); window.__cbCleanup = null; }
  const cbWrap = document.getElementById('comic-bubbles');
  if (cbWrap) cbWrap.remove();

  // --- Dashboard teardown (prevents seepage) ---
  if (window.__dashCleanup) { window.__dashCleanup(); window.__dashCleanup = null; }
  const dashWrap = document.getElementById('dashboard-wrap');
  if (dashWrap) dashWrap.remove();

    // === TRANSIENTS: nuke anything registered by loaders (Step 2) ===
  if (window.cleanupTransients) cleanupTransients();

  // Extra: destroy any global Sortable handle we might have left around
  try {
    if (window.scrambleSortable && typeof window.scrambleSortable.destroy === 'function') {
      window.scrambleSortable.destroy();
    }
  } catch(_) {}
  window.scrambleSortable = null;

  // Extra: kill common stray UI blocks some loaders create
  [
    'video-question',
    'video-multi-audio-question-ui',
    'video-multi-question-options',
    'video-multi-question-timer',
    'video-multi-question-feedback'
  ].forEach(id => { const n = document.getElementById(id); if (n) n.remove(); });

  // HARD SWEEPER: keep only the canonical containers under #game-container
  (function sweepGameContainer(){
    const gc = document.getElementById('game-container');
    if (!gc) return;
    const keep = new Set([
      'scene-image',
      'scene-text',
      'challenge-info',
      'choices-container',
      'scene6-ui',
      'sentence-scramble',
      'scramble-feedback',
      'sceneFillInTheBlank',
      'scene-container',
      'email-challenge-container'
    ]);
    Array.from(gc.children).forEach(child => {
      // remove anything not in the canonical set
      if (!keep.has(child.id)) child.remove();
    });
  })();


  // === TRANSIENTS: nuke anything registered by loaders (Step 2) ===
  if (window.cleanupTransients) cleanupTransients();

  // Special handling for emailContainer:
  // Clear and hide only if scene.type !== 'email'
  if (emailContainer) {
    if (scene.type !== "email") {
      emailContainer.style.display = "none";
      emailContainer.innerHTML = "";
    } else {
      // For email scenes, keep it visible and intact
      emailContainer.style.display = "block";
    }
  }

  if (gameContainer) gameContainer.style.display = "block";

 // === Unified hero image (works for ALL scene types) ===
{
  const imgHost = sceneImage || document.getElementById("scene-image");
  if (imgHost) {
    if (scene.image) {
      imgHost.style.display = "block";
      const cls = scene.imageClass ? ` class="${scene.imageClass}"` : "";
      imgHost.innerHTML = `<img src="${scene.image}" alt="Scene Image"${cls}>`;
    } else {
      imgHost.style.display = "none";
      imgHost.innerHTML = "";
    }
  }
}


  // Dispatch by scene type
  switch (scene.type) {
    case "interaction":
      loadInteractionScene(id);
      return;

    case "interaction-scramble":
      loadInteractionScrambleScene(id);
      return;

    case "interaction-fill-in-the-blank":
      if (fillBlankContainer) {
        fillBlankContainer.style.display = "block";
        loadInteractionFillBlankScene(id);
      }
      return;

    case "interaction-audio-mc":
      loadInteractionAudioMCScene(id);
      return;

    case "fill-in-the-blank":
      if (fillBlankContainer) {
        fillBlankContainer.style.display = "block";
        loadFillInTheBlankScene(id, fillBlankContainer);
      }
      return;

    case "video":
      loadVideoScene(id);
      return;

    case "video-multi-question":
      loadVideoMultiQuestionScene(id);
      return;

    case "video-multi-audio-choice":
      loadVideoMultiAudioChoiceScene(id);
      return;

    case "video-scramble":
      loadVideoScrambleScene(id);
      return;

    case "video-fill-in-the-blank":
      loadVideoFillBlankScene(id);
      return;

    case "hangman":
      loadHangmanScene(id);
      return;

    case "survivor-quiz":
      loadSurvivorQuizScene(id);
      return;

    case "conjugation-race":
      loadConjugationRaceScene(id);
      return;

    case "image-hotspots":
      loadHotspotsScene(id);
      return;

    case "buckets":
      loadBucketsScene(id);
      return;

    case "particle-swapper":
      loadParticleSwapperScene(id);
      return;

    case "comic-bubbles":
      loadComicBubblesScene(id);
      return;

    case "dashboard":
      loadDashboardScene(id);
      return;

    case "classify-buckets":
      loadBucketsScene(id);
      return;

    case "email":
      loadEmailChallengeScene(id);
      return;

    default:
      break;

      case "video-choice":
  loadVideoChoiceScene(id);
  return;

  }

  // Show text or hide
  if (sceneText) {
    if (scene.text) {
      sceneText.style.display = "block";
      sceneText.textContent = scene.text;
    } else if (scene.render) {
      sceneText.style.display = "none";
    } else {
      sceneText.innerHTML = "";
    }
  }

  // Show image or hide
  if (sceneImage) {
    if (scene.image) {
      sceneImage.style.display = "block";
      const cls = scene.imageClass ? ` class="${scene.imageClass}"` : '';
      sceneImage.innerHTML = `<img src="${scene.image}" alt="Scene Image"${cls}>`;
    } else {
      sceneImage.style.display = "none";
      sceneImage.innerHTML = "";
    }
  }

  // Scramble challenge (existing scramble logic)
 // Scramble challenge (universal scramble logic)
// Scramble challenge (robust + back-compat)
if (
  (scene.type === "scramble" ||
    ((scene.scramble || scene.words || scene.sentence) && scene.correct && scene.next)) &&
  scene.type !== "fill-in-the-blank" &&
  scene.type !== "interaction-scramble"
) {
  if (scrambleDiv && feedbackDiv) {
    scrambleDiv.style.display = "block";
    feedbackDiv.style.display = "block";
    scrambleDiv.innerHTML = "";
    feedbackDiv.innerText = "";

    const instruction = document.createElement("p");
    instruction.className = "scramble-instructions";
    instruction.textContent = "🧩 Drag the words into the correct order:";
    scrambleDiv.appendChild(instruction);

    // Accept any of: scramble[] | words[] | sentence[]
    const source =
      (Array.isArray(scene.scramble) && scene.scramble) ||
      (Array.isArray(scene.words) && scene.words) ||
      (Array.isArray(scene.sentence) && scene.sentence) ||
      [];

    // Normalize correct → array of tokens
    const correctArr = Array.isArray(scene.correct)
      ? scene.correct
      : (typeof scene.correct === "string" ? scene.correct.trim().split(/\s+/) : []);

    if (!source.length || !correctArr.length) {
      console.warn("[Scramble] Missing tokens/correct for:", scene.id);
      feedbackDiv.textContent = "⚠️ This scramble is missing data.";
      feedbackDiv.style.color = "orange";
      return;
    }

    const scrambleContainer = document.createElement("div");
    scrambleContainer.id = "scramble-words";

    const shuffled = shuffleArray(source.slice());
    shuffled.forEach((token) => {
      const span = document.createElement("span");
      span.className = "scramble-word";
      span.textContent = token;
      scrambleContainer.appendChild(span);
    });
    scrambleDiv.appendChild(scrambleContainer);

    try { Sortable.create(scrambleContainer, { animation: 150 }); }
    catch (e) { console.warn("Sortable unavailable; drag disabled.", e); }

    const checkBtn = document.createElement("button");
    checkBtn.textContent = "Check Answer";
    checkBtn.onclick = () => checkScrambleAnswer(correctArr, scene.next);
    scrambleDiv.appendChild(checkBtn);
  }
  return;
}



  // Choices buttons (with optional gating + CRM apply)
  if (scene.choices && scene.choices.length > 0 && choicesDiv) {
    choicesDiv.style.display = "block";
    choicesDiv.innerHTML = "";
    scene.choices.forEach((choice) => {
      const reqFlags = choice.requiresFlags || [];
      const reqScenes = choice.requiresScenes || [];
      const okFlags = reqFlags.every(hasFlag);
      const okScenes = reqScenes.every(isUnlocked);
      const available = okFlags && okScenes;

      const btn = document.createElement("button");
      btn.textContent = available ? choice.text : `🔒 ${choice.text}`;
      btn.disabled = !available;
      btn.onclick = () => {
        if (!available) return;
        try {
          if (choice.applyCrm) window.crm && window.crm.apply(choice.applyCrm);
        } catch (e) { console.warn('CRM apply (choice) failed', e); }
        loadScene(choice.next);
      };
      choicesDiv.appendChild(btn);
    });
    return;
  }

  // Render function fallback
  if (scene.render && sceneText) {
    sceneText.innerHTML = "";
    scene.render(sceneText);
    return;
  }

  // Text only fallback
  if (scene.text && sceneText) {
    sceneText.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = scene.text;
    sceneText.appendChild(p);
  }

  // Add Play Again button only on final thank you scene (outside switch, after all rendering)
  if (id === "thank_you_scene" && container) {
    container.style.display = "block"; // ensure container visible
    if (!document.getElementById("play-again")) {
      console.log(">>> Adding Play Again button now!");
      const message = document.createElement('p');
      message.textContent = "Thank you for playing! Please click below to play again.";
      container.appendChild(message);

      const playAgainBtn = document.createElement('button');
      playAgainBtn.id = "play-again";
      playAgainBtn.textContent = "Play Again";
      playAgainBtn.style.cssText = `
        margin-top: 20px;
        font-size: 1.2rem;
        padding: 10px 20px;
        background-color: #0ff;
        color: #000;
        border: none;
        cursor: pointer;
      `;
      playAgainBtn.onclick = () => {
        currentSceneId = "scene1"; // Reset to first scene
        loadScene(currentSceneId);
      };
      container.appendChild(playAgainBtn);
    } else {
      console.log(">>> Play Again button already exists.");
    }
  } else {
    console.log(`>>> No Play Again button added on scene "${id}".`);
  }
}























// === Scramble answer check ===
function checkScrambleAnswer(correctOrder, nextSceneId) {
  const words = Array.from(document.querySelectorAll("#scramble-words .scramble-word"));
  const userOrder = words.map((w) => w.textContent.trim());
  const feedback = document.getElementById("scramble-feedback");
  const container = document.getElementById('scene-container');
  const scene = scenes[currentSceneId];  // get current scene

  if (!feedback) return;

  if (arraysEqual(userOrder, correctOrder)) {
    feedback.textContent = "✅ Correct! Moving on...";
    feedback.style.color = "lightgreen";

       // ✅ award unlocks/flags defined on the current scene
    if (Array.isArray(scene.unlockScenes)) scene.unlockScenes.forEach(unlockScene);
    if (Array.isArray(scene.setFlags)) scene.setFlags.forEach(setFlag);

    setTimeout(() => {
      const nextScene = scenes[nextSceneId];
      if (nextScene && nextScene.type === "interaction") {
        loadInteractionScene(nextSceneId);
      } else {
        loadScene(nextSceneId);
      }
    }, 1000);
  } else {
    feedback.textContent = "❌ Not quite. Try again.";
    feedback.style.color = "salmon";
  }

  if (scene.playAgain && container && !document.getElementById("play-again")) {
    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.id = "play-again";
    playAgainBtn.style.cssText = `
      margin-top: 20px;
      font-size: 1.2rem;
      padding: 10px 20px;
      background-color: #0ff;
      color: #000;
      border: none;
      cursor: pointer;
    `;
    playAgainBtn.addEventListener('click', () => {
      // Reset game variables/state here if needed
      loadScene('scene1');
    });
    container.appendChild(playAgainBtn);
  }
}


// === Drag-and-drop Fill-in-the-Blank ===
function loadFillInTheBlankScene(sceneId, container) {
  const infoDiv = document.getElementById("challenge-info");
  if (infoDiv) {
    infoDiv.style.display = "none";
    infoDiv.innerHTML = "";
  }

  const scene = scenes[sceneId];
  // --- Defensive: build sentence/blanks from "___" if not provided ---
if (!Array.isArray(scene.sentence) || !Array.isArray(scene.blanks)) {
  const parts = String(scene.text || '').split('___');
  const toks = []; const blanks = [];
  const toWords = s => String(s).trim().split(/\s+/).filter(Boolean);
  parts.forEach((seg, i) => {
    if (seg) toks.push(...toWords(seg));
    if (i < parts.length - 1) { blanks.push(toks.length); toks.push('___'); }
  });
  scene.sentence = Array.isArray(scene.sentence) ? scene.sentence : toks;
  scene.blanks   = Array.isArray(scene.blanks)   ? scene.blanks   : blanks;
}
// normalize correct to array
if (typeof scene.correct === 'string') scene.correct = [scene.correct];

  if (!scene) {
    console.error(`Scene ${sceneId} not found.`);
    return;
  }

  // Inject HTML structure into container
  container.innerHTML = `
    <h2>Fill in the Blanks Challenge</h2>
    <p>${scene.text || "Fill in the blanks by dragging the correct options below."}</p>
    <p id="fill-blank-sentence" style="font-size: 1.2rem; line-height: 1.5; margin-bottom: 20px;"></p>
    <div id="fill-blank-options" style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 8px;"></div>
    <button id="check-fill-blank-answer">Check Answer</button>
    <div id="fill-blank-feedback" style="margin-top: 10px; font-weight: bold;"></div>
  `;

  const sentenceEl = container.querySelector("#fill-blank-sentence");
  const optionsEl = container.querySelector("#fill-blank-options");
  const feedbackEl = container.querySelector("#fill-blank-feedback");

  // Destroy any existing Sortable instances before creating new ones
  if (container._sortableBlanks) {
    container._sortableBlanks.forEach(s => s.destroy());
    container._sortableBlanks = null;
  }
  if (container._sortableOptions) {
    container._sortableOptions.destroy();
    container._sortableOptions = null;
  }

  // Render the sentence with blanks as droppable zones
  let html = "";
  for (let i = 0; i < scene.sentence.length; i++) {
    if (scene.blanks.includes(i)) {
      html += `<span class="fill-blank-dropzone" data-index="${i}" style="
        display: inline-block;
        min-width: 80px;
        border-bottom: 2px solid #00ffff;
        margin: 0 4px;
        vertical-align: bottom;
        padding: 4px 6px;
        cursor: pointer;
        background-color: #111;
      "></span> `;
    } else {
      html += `<span style="margin: 0 4px;">${scene.sentence[i]}</span> `;
    }
  }
  sentenceEl.innerHTML = html;

  // Render draggable options
  optionsEl.innerHTML = "";
  scene.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "fill-blank-option";
    btn.style.cssText = `
      padding: 6px 12px;
      border-radius: 6px;
      border: 2px solid #00ffff;
      background: #000;
      color: #0ff;
      font-weight: bold;
      cursor: grab;
      user-select: none;
    `;
    optionsEl.appendChild(btn);
  });

  // Setup SortableJS for blanks (droppable zones)
  const dropzones = sentenceEl.querySelectorAll(".fill-blank-dropzone");
  container._sortableBlanks = Array.from(dropzones).map(zone => {
    return Sortable.create(zone, {
      group: "fillInTheBlank",
      animation: 150,
      sort: false,
      onAdd: evt => {
        const dragged = evt.item;
        // Remove dragged from options pool when dropped into blank
        if (dragged.parentNode === optionsEl) {
          dragged.parentNode.removeChild(dragged);
        }
        // Ensure only one child in each dropzone
        if (evt.to.children.length > 1) {
          Array.from(evt.to.children).forEach(child => {
            if (child !== dragged) {
              evt.to.removeChild(child);
              optionsEl.appendChild(child);
            }
          });
        }
      },
      onRemove: evt => {
        // Append dragged item back to options pool when removed from blank
        optionsEl.appendChild(evt.item);
      }
    });
  });

  // Setup SortableJS for options container
  container._sortableOptions = Sortable.create(optionsEl, {
    group: "fillInTheBlank",
    animation: 150,
  });

  // Check answer button logic
  container.querySelector("#check-fill-blank-answer").onclick = () => {
    const userAnswers = [];
    let allFilled = true;
    dropzones.forEach(zone => {
      if (zone.children.length === 1) {
        userAnswers.push(zone.children[0].textContent.trim());
      } else {
        allFilled = false;
      }
    });

    if (!allFilled) {
      feedbackEl.textContent = "⚠️ Please fill all blanks.";
      feedbackEl.style.color = "orange";
      return;
    }

    // Compare user answers to correct answers case-insensitively
    const allCorrect = userAnswers.every(
      (ans, i) => ans.toLowerCase() === scene.correct[i].toLowerCase()
    );

    if (allCorrect) {
      feedbackEl.textContent = "✅ Correct! Well done.";
      feedbackEl.style.color = "lightgreen";
            // ✅ award unlocks/flags for this scene
      if (Array.isArray(scene.unlockScenes)) scene.unlockScenes.forEach(unlockScene);
      if (Array.isArray(scene.setFlags)) scene.setFlags.forEach(setFlag);
      if (scene.next) {
        setTimeout(() => loadScene(scene.next), 1500);
      }
    } else {
      feedbackEl.textContent = "❌ Not quite. Try again.";
      feedbackEl.style.color = "red";
    }
  };
}



// --- Video helpers ---
function normalizeMediaPath(src) {
  // Avoid leading "/" (breaks on GitHub Pages); return relative path
  return String(src || "").replace(/^\//, "");
}

function attachTapToPlay(videoEl, label = "▶ Tap to play") {
  const btn = document.createElement("button");
  btn.id = "video-tap-overlay";
  btn.textContent = label;
  btn.style.cssText =
    "display:none;margin:6px auto 0;padding:6px 12px;border:none;border-radius:8px;background:#00ffff;color:#000;font-weight:700;cursor:pointer;";
  videoEl.after(btn);

  const tryPlay = () => {
    // try muted autoplay; if blocked, show overlay
    videoEl.muted = true;
    videoEl.play().catch(() => { btn.style.display = "inline-block"; });
  };

  btn.onclick = () => {
    btn.style.display = "none";
    // user gesture now in place; allow audio
    videoEl.muted = false;
    videoEl.play().catch(()=>{ /* best effort */ });
  };

  return { btn, tryPlay };
}





// === Video challenge loader ===
function loadVideoScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // Safe helpers
  const regNode     = window.registerNode     || function(){};
  const regListener = window.registerListener || function(t,e,h){ t.addEventListener(e,h); };
  const regCleanup  = window.registerCleanup  || function(){};

  // Base containers
  const game = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");

  // Clean any stale UI for video scenes
  ["scene-video","video-choices","video-choices-timer","video-choices-feedback"].forEach(id => {
    const n = document.getElementById(id); if (n) n.remove();
  });

  if (game) game.style.display = "block";

  // Hide text overlay for video (keeps it clean)
  if (sceneText) { sceneText.style.display = "none"; sceneText.innerHTML = ""; }
  if (sceneImage) { sceneImage.style.display = "none"; sceneImage.innerHTML = ""; }

  // Build video element
  const video = document.createElement("video");
  video.id = "scene-video";
  video.controls = true;
  video.src = scene.videoSrc || scene.source || ""; // support both keys
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.style.maxWidth = "100%";
  video.style.maxHeight = "420px";
  video.style.display = "block";
  video.style.margin = "0 auto 16px";
  video.style.borderRadius = "12px";
  video.style.backgroundColor = "black";
  if (scene.poster) video.poster = scene.poster;

  regNode(video);
  game.appendChild(video);

  // Choice/timer panel (created lazily after video ends)
  let timerId = null;
  function clearTimer(){ if (timerId) { clearInterval(timerId); timerId = null; } }

  function buildChoicesPanel(fromScene) {
    // Remove old panel if any
    ["video-choices","video-choices-timer","video-choices-feedback"].forEach(id => {
      const n = document.getElementById(id); if (n) n.remove();
    });

    const choicesSrc = Array.isArray(fromScene.choices) ? fromScene : null;
    if (!choicesSrc) {
      // No inline choices -> behave like classic video: go to next
      if (scene.next) return loadScene(scene.next);
      return; // nothing else to do
    }

    // Timer (optional): prefer fromScene.timer, fallback to scene.timer
    const rawSec = (typeof choicesSrc.timer === "number" || choicesSrc.timer === true)
      ? choicesSrc.timer
      : scene.timer;

    const seconds = (rawSec === true) ? 15
                   : (Number.isFinite(rawSec) && rawSec > 0 ? Math.floor(rawSec) : null);

    // Timer row
    let timerDiv = null;
    if (seconds) {
      let timeLeft = seconds;
      timerDiv = document.createElement("div");
      timerDiv.id = "video-choices-timer";
      timerDiv.style.cssText = "font-weight:700;font-size:1.05rem;color:#00ffff;margin:8px 0;";
      timerDiv.textContent = `⏳ Time left: ${timeLeft}s`;
      game.appendChild(timerDiv);

      clearTimer();
      timerId = setInterval(() => {
        timeLeft -= 1;
        if (timerDiv) timerDiv.textContent = `⏳ Time left: ${Math.max(0,timeLeft)}s`;
        if (timeLeft <= 0) {
          clearTimer();
          const timeoutDest =
            (choicesSrc.endings && choicesSrc.endings.timeout) ||
            (scene.endings && scene.endings.timeout) ||
            scene.next;
          if (timeoutDest) return loadScene(timeoutDest);
        }
      }, 1000);
    }

    // Choices wrap
    const wrap = document.createElement("div");
    wrap.id = "video-choices";
    wrap.style.cssText = "display:flex;flex-direction:column;gap:10px;margin:10px 0;";
    game.appendChild(wrap);

    // Feedback (optional)
    const fb = document.createElement("div");
    fb.id = "video-choices-feedback";
    fb.style.cssText = "margin-top:6px;font-weight:700;";
    game.appendChild(fb);

    // Gate helper (matches your main choices gating)
    const hasFlag    = (f) => window.progress && window.progress.flags && !!window.progress.flags[f];
    const isUnlocked = (s) => window.progress && window.progress.unlocked && window.progress.unlocked.has && window.progress.unlocked.has(s);

    (choicesSrc.choices || []).forEach(choice => {
      const reqFlags = choice.requiresFlags || [];
      const reqScenes = choice.requiresScenes || [];
      const okFlags = reqFlags.every(hasFlag);
      const okScenes = reqScenes.every(isUnlocked);
      const available = okFlags && okScenes;

      const btn = document.createElement("button");
      btn.textContent = available ? choice.text : `🔒 ${choice.text}`;
      btn.disabled = !available;
      btn.style.cssText = "text-align:left;padding:10px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;font-weight:700;cursor:pointer";
      btn.onmouseenter = () => (btn.style.background = "#00cccc");
      btn.onmouseleave = () => (btn.style.background = "#00ffff");

      regListener(btn, "click", () => {
        clearTimer();
        if (!available) return;
        if (choice.applyCrm) {
          try { window.crm && window.crm.apply(choice.applyCrm); } catch(_) {}
        }
        loadScene(choice.next);
      });

      wrap.appendChild(btn);
    });

    // Cleanup on leave
    regCleanup(() => { clearTimer(); const n = document.getElementById("video-choices"); if (n) n.remove(); const t = document.getElementById("video-choices-timer"); if (t) t.remove(); const f = document.getElementById("video-choices-feedback"); if (f) f.remove(); });
  }

  function onEnded() {
    // After video ends: show inline choices from self or from a referenced scene
    const refId = scene.inlineChoicesFrom;
    const src = (refId && scenes[refId]) ? scenes[refId] : scene;
    buildChoicesPanel(src);
  }

  regListener(video, "ended", onEnded);
  // If you need a “Skip” (optional): press Enter to skip to choices
  // regListener(document, "keydown", (e)=>{ if(e.key==="Enter"){ try{ video.pause(); }catch(_){} onEnded(); } });

  // Cleanup when leaving this scene
  regCleanup(() => {
    clearTimer();
    try { video.pause(); } catch(_) {}
    const v = document.getElementById("scene-video"); if (v) v.remove();
    ["video-choices","video-choices-timer","video-choices-feedback"].forEach(id => { const n = document.getElementById(id); if (n) n.remove(); });
  });
}









// === Audio negotiation interaction loader ===
function loadInteractionScene(id) {
  const infoDiv = document.getElementById("challenge-info");
if (infoDiv) {
  infoDiv.style.display = "none";
  infoDiv.innerHTML = "";
}

  console.log(`Loading interaction scene: ${id}`);
  const scene = scenes[id];
  if (!scene) {
    console.error(`Scene data not found for ID: ${id}`);
    return;
  }

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const scramble = document.getElementById("sentence-scramble");
  const feedback = document.getElementById("scramble-feedback");
  const interactionUI = document.getElementById("scene6-ui");

  if (gameContainer) gameContainer.style.display = "block";
  if (interactionUI) interactionUI.style.display = "block";

  // Show text if present
  if (sceneText) {
    if (scene.text) {
      sceneText.style.display = "block";
      sceneText.textContent = scene.text;
    } else {
      sceneText.style.display = "none";
    }
  }

  // Show image if present
  if (sceneImage) {
    if (scene.image) {
      sceneImage.style.display = "block";
  const imgClass = scene.imageClass ? ` class="${scene.imageClass}"` : '';
sceneImage.innerHTML = `<img src="${scene.image}" alt="Scene Image"${imgClass}>`;

    } else {
      sceneImage.style.display = "none";
      sceneImage.innerHTML = "";
    }
  }

  // Hide scramble and feedback
  if (scramble) scramble.style.display = "none";
  if (feedback) feedback.style.display = "none";

  if (interactionUI) {
    interactionUI.innerHTML = `
      <h2>Negotiation</h2>
      <p>🎙️ Listen carefully. Press play when ready. Once the audio ends, you’ll have <strong>30 seconds</strong> to choose your reply.</p>
      <div id="interaction"></div>
    `;
  }

  let score = 0;
  let index = 0;

  function showInteraction() {
    
    console.log(`showInteraction called, index = ${index}`);

    if (index >= scene.interactions.length) {
      const ending =
        score >= scene.scoring.high ? scene.endings.high :
        score >= scene.scoring.medium ? scene.endings.medium :
        scene.endings.low;

      console.log("All interactions done, loading ending:", ending);

      // Show back regular UI containers
      if (sceneText) sceneText.style.display = "block";
      if (sceneImage) sceneImage.style.display = "block";
      if (scramble) scramble.style.display = "block";
      if (feedback) feedback.style.display = "block";

      if (interactionUI) {
        interactionUI.style.display = "none";
        interactionUI.innerHTML = "";
      }

      loadScene(ending);
      return;
    }

    const interaction = scene.interactions[index];
    const interactionDiv = document.getElementById("interaction");
    if (!interactionDiv) return;

    interactionDiv.innerHTML = `
      <audio id="interaction-audio" controls>
        <source src="${interaction.audio}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <div id="timer">⏳ Waiting for audio to finish...</div>
      <div id="options" style="margin-top: 10px;"></div>
      <div id="feedback" style="margin-top: 10px;"></div>
    `;

    const audio = document.getElementById("interaction-audio");

    audio.onplay = () => {
      console.log("Audio started playing");
    };

    audio.onerror = (e) => {
      console.error("Audio error:", e);
    };

    audio.onended = () => {
      console.log("Audio ended");

      let timeLeft = 30;
      const timerEl = document.getElementById("timer");
      if (timerEl) timerEl.textContent = `⏳ ${timeLeft} seconds remaining...`;

      const countdown = setInterval(() => {
        timeLeft--;
        if (timerEl) timerEl.textContent = `⏳ ${timeLeft} seconds remaining...`;
        if (timeLeft <= 0) {
          clearInterval(countdown);
          const feedbackDiv = document.getElementById("feedback");
          if (feedbackDiv) feedbackDiv.textContent = "⌛ Time expired. No reply sent.";
          index++;
          setTimeout(showInteraction, 2000);
        }
      }, 1000);

      const optionsDiv = document.getElementById("options");
      if (!optionsDiv) return;
      optionsDiv.innerHTML = "";

      interaction.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = typeof opt === "string" ? opt : opt.text;
        btn.onclick = () => {
          clearInterval(countdown);
          console.log(`Option clicked: ${btn.textContent}`);
          const isCorrect = (typeof opt === "string") ? (i === interaction.correct) : (opt.score === 1);
          const feedbackDiv = document.getElementById("feedback");
          if (feedbackDiv) {
            if (isCorrect) {
              score++;
              feedbackDiv.textContent = "✅ Response recorded.";
              feedbackDiv.style.color = "lightgreen";
            } else {
              feedbackDiv.textContent = "⚠️ Response recorded.";
              feedbackDiv.style.color = "orange";
            }
          }
          index++;
          setTimeout(showInteraction, 1500);
        };
        optionsDiv.appendChild(btn);
      });
    };
  }

  showInteraction();
}

// === Email writing challenge loader ===
function loadEmailChallengeScene(sceneId) {
  const scene = scenes[sceneId];
  if (!scene) {
    console.error(`Scene ${sceneId} not found.`);
    return;
  }

  // Clear and hide the scene image container to prevent lingering images from previous scenes
  const sceneImage = document.getElementById("scene-image");
  if (sceneImage) {
    sceneImage.style.display = "none";
    sceneImage.innerHTML = "";
  }

  const emailContainer = document.getElementById("email-challenge-container");
  if (!emailContainer) {
    console.error("Email challenge container not found");
    return;
  }

  // Use scene.text explicitly, with a console warning if missing
  if (!scene.text || scene.text.trim() === "") {
    console.warn(`Scene ${sceneId} missing 'text' property or it is empty.`);
  }

  emailContainer.innerHTML = `
    <h2>Final Assignment</h2>
    <p style="white-space: pre-wrap; font-weight: 600;">${scene.text || "Please write an email to your teacher below."}</p>
    <form id="email-form" style="margin-top: 20px;">
      <label for="email-to">To:</label><br/>
      <input type="email" id="email-to" name="email-to" value="${scene.teacherEmail || ''}" style="width: 100%;" readonly /><br/><br/>
      
      <label for="email-subject">Subject:</label><br/>
      <input type="text" id="email-subject" name="email-subject" value="${scene.emailSubject || 'Assignment Submission'}" style="width: 100%;" /><br/><br/>
      
      <label for="email-body">Message:</label><br/>
      <textarea id="email-body" name="email-body" rows="8" style="width: 100%;">${scene.emailBody || ''}</textarea><br/><br/>
      
      <button type="button" id="send-email-btn">Send Email</button>
    </form>
    <div id="email-feedback" style="margin-top: 15px; font-weight: bold;"></div>
  `;

  const form = emailContainer.querySelector("#email-form");
  const toInput = emailContainer.querySelector("#email-to");
  const subjectInput = emailContainer.querySelector("#email-subject");
  const bodyInput = emailContainer.querySelector("#email-body");
  const feedback = emailContainer.querySelector("#email-feedback");
  const sendBtn = emailContainer.querySelector("#send-email-btn");

// Inside loadEmailChallengeScene(sceneId) — replace ONLY the click handler
sendBtn.onclick = () => {
  // Resolve the current scene safely (works even if the param name differs)
  const sid = typeof sceneId !== "undefined" ? sceneId : window.currentSceneId;
  const sc  = (window.scenes && window.scenes[sid]) || null;
  if (!sc) { console.error("Email scene not found for", sid); return; }

  const to  = (sc.teacherEmail || "").trim();
  const sub = encodeURIComponent(sc.emailSubject || "");

  // Try to read the body from UI; fall back to scene.emailBody
  const bodyEl =
    document.getElementById("email-body") ||
    document.getElementById("emailBody") ||
    document.querySelector("#email-challenge-container textarea");

  const uiBodyRaw = (bodyEl && bodyEl.value) || sc.emailBody || "";
  const body = encodeURIComponent(uiBodyRaw.replace(/\r?\n/g, "\r\n"));

  const href = `mailto:${to}?subject=${sub}&body=${body}`;

  // Try opening the mail client, but ALWAYS advance to next scene
  try { window.open(href, "_blank"); } catch (_) { location.href = href; }

  const nextId = sc.next;
  if (nextId) {
    try { window.unlockScene && window.unlockScene(nextId); } catch {}
    setTimeout(() => window.loadScene(nextId), 150);
  }
};


}
function loadInteractionScrambleScene(id) {
  console.log(`Loading interaction-scramble scene: ${id}`);
  const scene = scenes[id];
  if (!scene) {
    console.error(`Scene data not found for ID: ${id}`);
    return;
  }

  const scrambleDiv = document.getElementById("sentence-scramble");
  const feedbackDiv = document.getElementById("scramble-feedback");
  const infoDiv = document.getElementById("challenge-info");
  const container = document.getElementById('scene-container');
  const emailContainer = document.getElementById("email-challenge-container");
  const fillBlankContainer = document.getElementById("sceneFillInTheBlank");
  const choicesDiv = document.getElementById("choices-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const scene6UI = document.getElementById("scene6-ui");

  // Clear unrelated UI containers
  [container, emailContainer, fillBlankContainer, choicesDiv, sceneText, sceneImage, scene6UI].forEach(el => {
    if (el) {
      el.style.display = "none";
      el.innerHTML = "";
    }
  });

  // Setup scramble UI
  scrambleDiv.style.display = "block";
  scrambleDiv.innerHTML = "";
  feedbackDiv.style.display = "none";
  feedbackDiv.innerHTML = "";

  // Show info text if present
  if (infoDiv) {
    if (scene.emailFromClient) {
      infoDiv.style.display = "block";
      infoDiv.innerHTML = scene.emailFromClient;
    } else if (scene.contextText) {
      infoDiv.style.display = "block";
      infoDiv.textContent = scene.contextText;
    } else {
      infoDiv.style.display = "none";
      infoDiv.innerHTML = "";
    }
  }

  // Instruction
  const instruction = document.createElement("p");
  instruction.className = "scramble-instructions";
  instruction.textContent = "🧩 Drag the words into the correct order after listening to the audio:";
  scrambleDiv.appendChild(instruction);

  // Scramble words container
  const scrambleContainer = document.createElement("div");
  scrambleContainer.id = "scramble-words";
  const shuffled = shuffleArray(scene.scramble);
  shuffled.forEach(word => {
    const span = document.createElement("span");
    span.className = "scramble-word";
    span.textContent = word;
    scrambleContainer.appendChild(span);
  });
  scrambleDiv.appendChild(scrambleContainer);

  // Destroy old Sortable instance
  if (window.scrambleSortable) {
    window.scrambleSortable.destroy();
  }
  window.scrambleSortable = Sortable.create(scrambleContainer, { animation: 150 });

  // Audio player
  let audioElem = document.getElementById("scene-audio");
  if (audioElem) {
    audioElem.pause();
    audioElem.src = "";
    audioElem.load();
    audioElem.remove();
  }
  audioElem = document.createElement("audio");
  audioElem.id = "scene-audio";
  audioElem.controls = true;
  audioElem.src = scene.audio;
  document.getElementById("game-container").appendChild(audioElem);
  audioElem.load();

  // Submit button
  let submitBtn = document.getElementById("scramble-submit-btn");
  if (submitBtn) {
    submitBtn.removeEventListener('click', submitBtn._listener);
    submitBtn.remove();
  }
  submitBtn = document.createElement("button");
  submitBtn.id = "scramble-submit-btn";
  submitBtn.textContent = "Submit Answer";
  submitBtn.style.marginTop = "15px";
  scrambleDiv.appendChild(document.createElement("br"));
  scrambleDiv.appendChild(submitBtn);

  const onSubmit = () => {
    const arrangedWords = Array.from(scrambleContainer.querySelectorAll('.scramble-word')).map(el => el.textContent);
    if (arraysEqual(arrangedWords, scene.correct)) {
      alert("Correct! Moving to next scene.");
      currentSceneId = scene.next;
      loadScene(currentSceneId);
    } else {
      alert("Not quite right. Try again.");
    }
  };
  submitBtn.addEventListener('click', onSubmit);
  submitBtn._listener = onSubmit;
}

function loadInteractionFillBlankScene(id) {
  console.log(`Loading interaction-fill-in-the-blank scene: ${id}`);
  const scene = scenes[id];
  if (!scene) {
    console.error(`Scene data not found for ID: ${id}`);
    return;
  }

  // Containers
  const scrambleDiv = document.getElementById("sentence-scramble");
  const feedbackDiv = document.getElementById("scramble-feedback");
  const infoDiv = document.getElementById("challenge-info");
  const container = document.getElementById('scene-container');
  const emailContainer = document.getElementById("email-challenge-container");
  const fillBlankContainer = document.getElementById("sceneFillInTheBlank");
  const choicesDiv = document.getElementById("choices-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const scene6UI = document.getElementById("scene6-ui");

  // Clear unrelated UI containers
  [container, emailContainer, scrambleDiv, feedbackDiv, choicesDiv, sceneText, sceneImage, scene6UI].forEach(el => {
    if (el) {
      el.style.display = "none";
      el.innerHTML = "";
    }
  });

  if (fillBlankContainer) {
    fillBlankContainer.style.display = "block";
    fillBlankContainer.innerHTML = "";
  }

  // Show info text if present
  if (infoDiv) {
    if (scene.emailFromClient) {
      infoDiv.style.display = "block";
      infoDiv.innerHTML = scene.emailFromClient;
    } else if (scene.contextText) {
      infoDiv.style.display = "block";
      infoDiv.textContent = scene.contextText;
    } else {
      infoDiv.style.display = "none";
      infoDiv.innerHTML = "";
    }
  }

  // Audio player
  let audioElem = document.getElementById("scene-audio");
  if (audioElem) {
    audioElem.pause();
    audioElem.src = "";
    audioElem.load();
    audioElem.remove();
  }
  audioElem = document.createElement("audio");
  audioElem.id = "scene-audio";
  audioElem.controls = true;
  audioElem.src = scene.audio;
  document.getElementById("game-container").appendChild(audioElem);
  audioElem.load();

  // Build fill-in-the-blank UI
  fillBlankContainer.innerHTML = `
    <h2>Fill in the Blanks Challenge</h2>
    <p>${scene.text || "Fill in the blanks by dragging the correct options below."}</p>
    <p id="fill-blank-sentence" style="font-size: 1.2rem; line-height: 1.5; margin-bottom: 20px;"></p>
    <div id="fill-blank-options" style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 8px;"></div>
    <button id="check-fill-blank-answer">Check Answer</button>
    <div id="fill-blank-feedback" style="margin-top: 10px; font-weight: bold;"></div>
  `;

  const sentenceEl = fillBlankContainer.querySelector("#fill-blank-sentence");
  const optionsEl = fillBlankContainer.querySelector("#fill-blank-options");
  const feedbackEl = fillBlankContainer.querySelector("#fill-blank-feedback");

  // Render sentence with blanks
  let html = "";
  for (let i = 0; i < scene.sentence.length; i++) {
    if (scene.blanks.includes(i)) {
      html += `<span class="fill-blank-dropzone" data-index="${i}" style="
        display: inline-block;
        min-width: 80px;
        border-bottom: 2px solid #00ffff;
        margin: 0 4px;
        vertical-align: bottom;
        padding: 4px 6px;
        cursor: pointer;
        background-color: #111;
      "></span> `;
    } else {
      html += `<span style="margin: 0 4px;">${scene.sentence[i]}</span> `;
    }
  }
  sentenceEl.innerHTML = html;

  // Render draggable options
  optionsEl.innerHTML = "";
  scene.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "fill-blank-option";
    btn.style.cssText = `
      padding: 6px 12px;
      border-radius: 6px;
      border: 2px solid #00ffff;
      background: #000;
      color: #0ff;
      font-weight: bold;
      cursor: grab;
      user-select: none;
    `;
    optionsEl.appendChild(btn);
  });

  // Cleanup Sortable instances if any
  if (fillBlankContainer._sortableBlanks) {
    fillBlankContainer._sortableBlanks.forEach(s => s.destroy());
    fillBlankContainer._sortableBlanks = null;
  }
  if (fillBlankContainer._sortableOptions) {
    fillBlankContainer._sortableOptions.destroy();
    fillBlankContainer._sortableOptions = null;
  }

  // Setup SortableJS droppable blanks
  const dropzones = sentenceEl.querySelectorAll(".fill-blank-dropzone");
  fillBlankContainer._sortableBlanks = Array.from(dropzones).map(zone => {
    return Sortable.create(zone, {
      group: "fillInTheBlank",
      animation: 150,
      sort: false,
      onAdd: evt => {
        const dragged = evt.item;
        if (dragged.parentNode === optionsEl) {
          dragged.parentNode.removeChild(dragged);
        }
        if (evt.to.children.length > 1) {
          Array.from(evt.to.children).forEach(child => {
            if (child !== dragged) {
              evt.to.removeChild(child);
              optionsEl.appendChild(child);
            }
          });
        }
      },
      onRemove: evt => {
        optionsEl.appendChild(evt.item);
      }
    });
  });

  // Setup SortableJS options container
  fillBlankContainer._sortableOptions = Sortable.create(optionsEl, {
    group: "fillInTheBlank",
    animation: 150,
  });

  // Check answer logic
  const checkBtn = fillBlankContainer.querySelector("#check-fill-blank-answer");
  checkBtn.removeEventListener('click', checkBtn._listener);
  const onCheck = () => {
    const userAnswers = [];
    let allFilled = true;
    dropzones.forEach(zone => {
      if (zone.children.length === 1) {
        userAnswers.push(zone.children[0].textContent.trim());
      } else {
        allFilled = false;
      }
    });

    if (!allFilled) {
      feedbackEl.textContent = "⚠️ Please fill all blanks.";
      feedbackEl.style.color = "orange";
      return;
    }

    const allCorrect = userAnswers.every(
      (ans, i) => ans.toLowerCase() === scene.correct[i].toLowerCase()
    );

    if (allCorrect) {
      feedbackEl.textContent = "✅ Correct! Well done.";
      feedbackEl.style.color = "lightgreen";
      if (scene.next) {
        setTimeout(() => loadScene(scene.next), 1500);
      }
    } else {
      feedbackEl.textContent = "❌ Not quite. Try again.";
      feedbackEl.style.color = "red";
    }
  };
  checkBtn.addEventListener('click', onCheck);
  checkBtn._listener = onCheck;
}

function loadInteractionAudioMCScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // Optional: reset a cross-scene tally at the START of a block
  try {
    if (scene.tallyKey && scene.tallyReset && typeof tallyReset === 'function') {
      const max = (scene.tallyMax != null) ? scene.tallyMax : null;
      tallyReset(scene.tallyKey, max);
    }
  } catch(_) {}

  // Shorthands
  const regNode     = window.registerNode     || function(){};
  const regListener = window.registerListener || function(t,e,h){ t.addEventListener(e,h); };
  const regCleanup  = window.registerCleanup  || function(){};

  // Base containers
  const game = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  if (game) game.style.display = "block";
  if (sceneText) { sceneText.style.display = "block"; sceneText.textContent = scene.text || ""; }

  // Clear any prior UI for this loader
  const old = document.getElementById("iamc-ui");
  if (old) old.remove();

  // Build UI shell
  const ui = document.createElement("div");
  ui.id = "iamc-ui";
  ui.style.cssText = "margin-top:10px;";
  regNode(ui);
  game.appendChild(ui);

  // Prompt audio (the clip you listen to before answering)
  let prompt = null;
  if (scene.audio) {
    prompt = document.createElement("audio");
    prompt.id = "iamc-prompt";
    prompt.controls = true;
    prompt.src = scene.audio;
    prompt.style.cssText = "width:100%;max-width:640px;display:block;margin:0 auto 12px;";
    regNode(prompt);
    ui.appendChild(prompt);
  }

  // Timer UI (starts only when the prompt audio ENDS)
  let timerId = null, timeLeft = 0;
  const DEFAULT_SECONDS = 15;
  const timerDiv = document.createElement("div");
  timerDiv.id = "iamc-timer";
  timerDiv.style.cssText = "font-weight:700;font-size:1.05rem;color:#00ffff;margin:6px 0;display:none;";
  ui.appendChild(timerDiv);

  function computeSeconds() {
    return (scene.timer === true) ? DEFAULT_SECONDS
         : (Number.isFinite(scene.timer) ? Number(scene.timer) : null);
  }

  function clearTimer(){ if (timerId) { clearInterval(timerId); timerId = null; } }

  function startTimer(onTimeout) {
    const sec = computeSeconds();
    if (!sec || sec <= 0) return; // no timer configured
    timeLeft = sec;
    timerDiv.style.display = "block";
    timerDiv.textContent = `⏳ Time left: ${timeLeft}s`;
    timerId = setInterval(() => {
      timeLeft--;
      timerDiv.textContent = `⏳ Time left: ${Math.max(0,timeLeft)}s`;
      if (timeLeft <= 0) {
        clearInterval(timerId); timerId = null;
        // route as TIMEOUT
        finish(false, 'timeout');
      }
    }, 1000);
  }

  // Helpers
  const looksLikeAudio = s => typeof s === 'string' && /\.(mp3|wav|ogg|m4a)$/i.test(s);
  const optToLabel = (opt, idx) => looksLikeAudio(opt) ? `▶ Option ${idx+1}` : String(opt);
  function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }

  // Normalize options (preserve original index for correctness)
  const rawOptions = Array.isArray(scene.options) ? scene.options.slice() : [];
  let items = rawOptions.map((opt, i) => ({ opt, i }));
  if (scene.shuffleOptions) shuffle(items);

  // Correctness (index or string)
  const correctIndex = Number.isInteger(scene.correct) ? Number(scene.correct) : null;
  const correctString = (typeof scene.correct === 'string') ? scene.correct.trim().toLowerCase() : null;
  function isCorrectIndex(chosenOriginalIndex){
    if (correctIndex != null) return chosenOriginalIndex === correctIndex;
    if (correctString != null) {
      const raw = rawOptions[chosenOriginalIndex];
      const asLabel = optToLabel(raw, chosenOriginalIndex).trim().toLowerCase();
      const asRaw   = String(raw || '').trim().toLowerCase();
      return (asLabel === correctString) || (asRaw === correctString);
    }
    return false;
  }

  // Feedback area
  const feedback = document.createElement("div");
  feedback.id = "iamc-feedback";
  feedback.style.cssText = "margin-top:10px;font-weight:700;";
  ui.appendChild(feedback);

  // End routing
  function branchByScoreOrNext() {
    if (scene.scoring && scene.endings) {
      let total = 0;
      try { if (scene.tallyKey && typeof tallyGet === 'function') total = Number(tallyGet(scene.tallyKey)) || 0; } catch(_) {}
      const hi = (scene.scoring.high ?? Infinity);
      const md = (scene.scoring.medium ?? -Infinity);
      let dest = scene.endings.low;
      if (total >= hi) dest = scene.endings.high;
      else if (total >= md) dest = scene.endings.medium;
      if (dest) return loadScene(dest);
      console.warn('interaction-audio-mc: endings present but missing a destination.');
    }
    if (scene.next) return loadScene(scene.next);
    console.warn('interaction-audio-mc: no next/endings; staying here.');
  }

  let locked = false;
  function finish(isCorrect, reason) {
    if (locked) return; locked = true;
    clearTimer();

    // tally
    try {
      if (scene.tallyKey && typeof tallyAdd === 'function') {
        tallyAdd(scene.tallyKey, isCorrect ? (scene.tallyWeight || 1) : 0);
      }
    } catch(_) {}

    // route with precedence: timeout → wrong → (score/next)
    let dest = null;
    if (reason === 'timeout' && scene.endings && scene.endings.timeout) {
      dest = scene.endings.timeout;
    } else if (!isCorrect && scene.endings && scene.endings.wrong) {
      dest = scene.endings.wrong;
    }

    feedback.textContent = isCorrect ? "✅ Correct! Moving on..." :
                          (reason === 'timeout' ? "⌛ Time's up. Restarting..." : "❌ Not quite. Restarting...");
    feedback.style.color = isCorrect ? "lightgreen" : (reason === 'timeout' ? "orange" : "salmon");

    setTimeout(() => {
      if (dest) return loadScene(dest);
      return branchByScoreOrNext();
    }, 800);
  }

  // Build options
  const optionsWrap = document.createElement("div");
  optionsWrap.id = "iamc-options";
  optionsWrap.style.cssText = "display:flex;flex-direction:column;gap:10px;margin:10px 0;";
  ui.appendChild(optionsWrap);

  items.forEach(({opt, i: originalIndex}, idxShown) => {
    if (looksLikeAudio(opt)) {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;gap:10px;flex-wrap:wrap;";
      const au = document.createElement("audio");
      au.controls = true;
      au.src = opt;
      au.style.cssText = "flex:1 1 280px;min-width:220px;";
      const btn = document.createElement("button");
      btn.textContent = `Choose ${idxShown+1}`;
      btn.style.cssText = "padding:8px 12px;border:none;border-radius:8px;background:#00ffff;color:#000;font-weight:700;cursor:pointer";
      btn.onmouseenter = () => (btn.style.background = "#00cccc");
      btn.onmouseleave = () => (btn.style.background = "#00ffff");
      regListener(btn, "click", () => finish(isCorrectIndex(originalIndex)));
      row.appendChild(au); row.appendChild(btn);
      optionsWrap.appendChild(row);
    } else {
      const btn = document.createElement("button");
      btn.textContent = optToLabel(opt, idxShown);
      btn.style.cssText = "text-align:left;padding:10px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;font-weight:700;cursor:pointer";
      btn.onmouseenter = () => (btn.style.background = "#00cccc");
      btn.onmouseleave = () => (btn.style.background = "#00ffff");
      regListener(btn, "click", () => finish(isCorrectIndex(originalIndex)));
      optionsWrap.appendChild(btn);
    }
  });

  // Start timer ONLY after the prompt audio ends; if no prompt clip, start now.
  if (prompt) {
    regListener(prompt, 'ended', () => startTimer(() => finish(false, 'timeout')));
  } else {
    startTimer(() => finish(false, 'timeout'));
  }

  // Cleanup on leave
  regCleanup(() => { clearTimer(); const node = document.getElementById("iamc-ui"); if (node) node.remove(); });
}






 
// ─────────────────────────────────────────────────────────────────────────────
// Mobile-safe VIDEO → MULTI QUESTION
// ─────────────────────────────────────────────────────────────────────────────
function loadVideoMultiQuestionScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // Optional cross-scene tally reset
  try {
    if (scene.tallyKey && scene.tallyReset && typeof tallyReset === 'function') {
      tallyReset(scene.tallyKey, scene.tallyMax ?? (scene.questions?.length || null));
    }
  } catch(_) {}

  const VMQ_DEFAULT_SECONDS = 15;

  // Safe shorthands
  const regNode     = window.registerNode     || function(){};
  const regListener = window.registerListener || function(t,e,h){ t.addEventListener(e,h); };
  const regCleanup  = window.registerCleanup  || function(){};

  const game = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  if (game) game.style.display = "block";
  if (sceneText) { sceneText.style.display = "block"; sceneText.textContent = scene.text || ""; }

  // Clear stale UI
  ["vmq-wrap","scene-video","video-multi-question-timer","video-multi-question-options","video-multi-question-feedback"]
    .forEach(x => { const n = document.getElementById(x); if (n) n.remove(); });

  // Wrapper + video (inline-safe)
  const wrap = document.createElement("div");
  wrap.id = "vmq-wrap";
  wrap.style.cssText = "position:relative;max-width:100%;margin:0 auto 16px;";
  game.appendChild(wrap);

const video = document.createElement("video");
video.id = "scene-video";
video.controls = true;
video.preload = "metadata";

// ✅ resolve URLs so GitHub Pages + <base> work
video.src = resolveSrc(scene.videoSrc);
if (scene.poster) video.poster = resolveSrc(scene.poster);

// inline-friendly on iOS/mobile
video.style.cssText = "width:100%;height:auto;max-height:45vh;display:block;border-radius:12px;background:#000;";
video.setAttribute("playsinline", "");
video.setAttribute("webkit-playsinline", "");
video.playsInline = true;

regNode(video);

// (optional while testing)
// video.addEventListener("error", () => console.log("VMQ video error =", video.error && video.error.code), { once:true });

  regNode(video);

  const overlay = document.createElement("button");
  overlay.textContent = "▶ Tap to Play";
  overlay.style.cssText = "position:absolute;inset:auto 0 0 0;margin:auto;top:0;bottom:0;width:180px;height:48px;background:#00ffff;color:#000;border:none;border-radius:10px;font-weight:700;cursor:pointer";
  overlay.onclick = async () => { try { await video.play(); overlay.remove(); } catch(_){} };
  video.addEventListener("play", () => { if (overlay.parentNode) overlay.remove(); });

  const skipBtn = document.createElement("button");
  skipBtn.textContent = "Skip video";
  skipBtn.style.cssText = "margin-top:8px;padding:8px 12px;border:none;border-radius:8px;background:#222;color:#eee;cursor:pointer;font-weight:700";
  skipBtn.onclick = () => startQuestions();

  const errorMsg = () => {
    const msg = document.createElement("div");
    msg.style.cssText = "margin-top:8px;color:orange;font-weight:700";
    msg.textContent = "⚠️ This device can’t play the video inline.";
    const a = document.createElement("a");
    a.href = resolveSrc(scene.videoSrc);
    a.target = "_blank";
    a.textContent = "Open video in a new tab";
    a.style.cssText = "display:inline-block;margin-left:8px;color:#0ff;text-decoration:underline";
    msg.appendChild(a);
    wrap.appendChild(msg);
  };
  video.addEventListener("error", errorMsg);

  wrap.appendChild(video);
  wrap.appendChild(overlay);
  wrap.appendChild(skipBtn);

  // State
  const questions = Array.isArray(scene.questions) ? scene.questions : [];
  let qIndex = 0, score = 0, timerInterval = null, timeLeft = 0;

  function resolveTimerSeconds(scene, q) {
    const pick = (v) => {
      if (v === false || v == null) return null;
      if (v === true) return VMQ_DEFAULT_SECONDS;
      const n = Number(v);
      return Number.isFinite(n) && n > 0 ? Math.floor(n) : null;
    };
    const perQ = pick(q && q.timer);
    const perScene = pick(scene && scene.timer);
    return (perQ != null) ? perQ : (perScene != null ? perScene : VMQ_DEFAULT_SECONDS);
  }
  function clearTimer(){ if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } }

  function finish() {
    // cleanup
    ["video-multi-question-timer","video-multi-question-options","video-multi-question-feedback"].forEach(x => { const n = document.getElementById(x); if (n) n.remove(); });
    clearTimer();
    try { video.pause(); } catch(_){}
    if (wrap && wrap.parentNode) wrap.remove();

    if (scene.scoring && scene.endings) {
      const { high = Infinity, medium = -Infinity } = scene.scoring;
      const dest = (score >= high) ? scene.endings.high
                 : (score >= medium) ? scene.endings.medium
                 : scene.endings.low;
      if (dest) return loadScene(dest);
    }
    if (scene.next) return loadScene(scene.next);
    console.warn("video-multi-question: No endings or next specified.");
  }

  function startQuestions() {
    wrap.style.display = "none";
    try { video.pause(); } catch(_){}
    qIndex = 0; score = 0;
    renderQuestion();
  }

  function renderQuestion() {
    if (qIndex >= questions.length) return finish();

    // clear old
    ["video-multi-question-timer","video-multi-question-options","video-multi-question-feedback"].forEach(x => { const n = document.getElementById(x); if (n) n.remove(); });
    clearTimer();

    const q = questions[qIndex];
    if (!q) { console.error(`Question ${qIndex} missing`); return finish(); }
    if (sceneText) sceneText.textContent = q.text || "";

    // Timer
    const seconds = resolveTimerSeconds(scene, q);
    if (seconds && seconds > 0) {
      timeLeft = seconds;
      const timerDiv = document.createElement("div");
      timerDiv.id = "video-multi-question-timer";
      timerDiv.style.cssText = "font-weight:700;font-size:1.1rem;color:#00ffff;margin-top:10px;";
      timerDiv.textContent = `⏳ Time left: ${timeLeft}s`;
      game.appendChild(timerDiv);

      timerInterval = setInterval(() => {
        timeLeft -= 1;
        if (timerDiv) timerDiv.textContent = `⏳ Time left: ${Math.max(0,timeLeft)}s`;
        if (timeLeft <= 0) {
          clearTimer();
          // count a miss in cross-scene tally if enabled
          try { if (scene.tallyKey && typeof tallyAdd === 'function') tallyAdd(scene.tallyKey, 0); } catch(_){}
          feedback("⏲️ Time's up. Moving on...", "orange", false, true);
        }
      }, 1000);
    }

    // Options
    const optionsDiv = document.createElement("div");
    optionsDiv.id = "video-multi-question-options";
    optionsDiv.style.marginTop = "15px";
    game.appendChild(optionsDiv);

    const feedbackDiv = document.createElement("div");
    feedbackDiv.id = "video-multi-question-feedback";
    feedbackDiv.style.cssText = "margin-top:15px;font-weight:700;";
    game.appendChild(feedbackDiv);

    function disable(){ [...optionsDiv.children].forEach(b => b.disabled = true); }
    function feedback(msg, color, isCorrect, timedOut=false) {
      clearTimer(); disable();
      feedbackDiv.textContent = msg;
      feedbackDiv.style.color = color;
      if (isCorrect) score++;
      setTimeout(() => { qIndex++; renderQuestion(); }, timedOut ? 900 : 700);
    }

    const opts = Array.isArray(q.options) ? q.options.slice() : [];
    const correctIndex = Number(q.correct);

    // optional shuffle
    if (scene.shuffleOptions) {
      for (let i=opts.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [opts[i],opts[j]]=[opts[j],opts[i]]; }
    }

    opts.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = (typeof opt === "string") ? opt : String(opt);
      btn.style.cssText = "margin:5px;padding:8px 16px;font-weight:700;background:#00ffff;border:none;border-radius:8px;cursor:pointer";
      btn.onmouseenter = () => (btn.style.backgroundColor = "#00cccc");
      btn.onmouseleave = () => (btn.style.backgroundColor = "#00ffff");
      regListener(btn, "click", () => {
        const ok = (i === correctIndex);
        // cross-scene tally (optional)
        try { if (scene.tallyKey && typeof tallyAdd === 'function') tallyAdd(scene.tallyKey, ok ? (scene.tallyWeight || 1) : 0); } catch(_){}
        feedback(ok ? "✅ Correct! Moving on..." : "❌ Not quite. Moving on...", ok ? "lightgreen" : "salmon", ok);
      });
      optionsDiv.appendChild(btn);
    });
  }

  regListener(video, "ended", startQuestions);
}


// ─────────────────────────────────────────────────────────────────────────────
// Mobile-safe VIDEO → MULTI *AUDIO* CHOICE (each option is an audio clip)
// ─────────────────────────────────────────────────────────────────────────────
function loadVideoMultiAudioChoiceScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene data not found for ID: ${id}`); return; }

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const container = document.getElementById("scene-container");

  [sceneImage, container].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) { sceneText.style.display = "block"; sceneText.textContent = scene.text || ""; }
  if (gameContainer) gameContainer.style.display = "block";

  // Remove stale UI
  const prevUI = document.getElementById("video-multi-audio-question-ui");
  if (prevUI) prevUI.remove();
  const oldVid = document.getElementById("scene-video");
  if (oldVid) oldVid.remove();

  // Video (mobile-safe)
  const videoWrap = document.createElement("div");
  videoWrap.style.cssText = "position:relative;max-width:100%;margin:0 auto 16px;";

  const videoElem = document.createElement("video");
  videoElem.id = "scene-video";
  videoElem.controls = true;
  videoElem.preload = "metadata";
  videoElem.src = resolveSrc(scene.videoSrc);
  if (scene.poster) videoElem.poster = resolveSrc(scene.poster);
  videoElem.style.cssText = "width:100%;height:auto;max-height:45vh;display:block;border-radius:12px;background:#000;";
  videoElem.setAttribute("playsinline", "");
  videoElem.setAttribute("webkit-playsinline", "");
  videoElem.playsInline = true;

  const playOverlay = document.createElement("button");
  playOverlay.textContent = "▶ Tap to Play";
  playOverlay.style.cssText = "position:absolute;inset:auto 0 0 0;margin:auto;top:0;bottom:0;width:180px;height:48px;" +
                              "background:#00ffff;color:#000;border:none;border-radius:10px;font-weight:700;cursor:pointer";
  playOverlay.onclick = async () => {
    try { await videoElem.play(); playOverlay.remove(); } catch(e) { console.warn("User play failed:", e); }
  };
  videoElem.addEventListener("play", () => playOverlay.remove());

  videoElem.addEventListener("error", () => {
    const msg = document.createElement("div");
    msg.style.cssText = "margin-top:8px;color:orange;font-weight:700";
    msg.textContent = "⚠️ This device can’t play the video inline.";
    const a = document.createElement("a");
    a.href = resolveSrc(scene.videoSrc);
    a.target = "_blank";
    a.textContent = "Open video in a new tab";
    a.style.cssText = "display:inline-block;margin-left:8px;color:#0ff;text-decoration:underline";
    msg.appendChild(a);
    videoWrap.appendChild(msg);
  });

  // Optional SKIP button
  const skipBtn = document.createElement("button");
  skipBtn.textContent = "Skip video";
  skipBtn.style.cssText = "margin-top:8px;padding:8px 12px;border:none;border-radius:8px;background:#222;color:#eee;cursor:pointer;font-weight:700";
  skipBtn.onclick = () => showQuestion();
  videoWrap.appendChild(skipBtn);

  videoWrap.appendChild(videoElem);
  videoWrap.appendChild(playOverlay);
  gameContainer.appendChild(videoWrap);

  // Question UI (hidden until video ends or skip)
  let questionUI = document.createElement("div");
  questionUI.id = "video-multi-audio-question-ui";
  questionUI.style.maxWidth = "700px";
  questionUI.style.margin = "0 auto";
  questionUI.style.color = "#eee";
  questionUI.style.fontSize = "1.1rem";
  questionUI.style.display = "none";
  gameContainer.appendChild(questionUI);

  let index = 0;
  let score = 0;

  function cleanupQuestionUI() {
    questionUI.style.display = "none";
    questionUI.innerHTML = "";
  }

  function finishBlock() {
    cleanupQuestionUI();
    try { videoElem.pause(); } catch(_) {}
    if (videoWrap.parentNode) videoWrap.remove();

    if (scene.scoring && scene.endings) {
      let endingScene;
      if (score >= scene.scoring.high) endingScene = scene.endings.high;
      else if (score >= scene.scoring.medium) endingScene = scene.endings.medium;
      else endingScene = scene.endings.low;
      if (endingScene) return loadScene(endingScene);
    }
    if (scene.next) return loadScene(scene.next);
    console.warn("video-multi-audio-choice: no next/endings specified.");
  }

  function showQuestion() {
    // hide video area once questions start
    videoWrap.style.display = "none";

    if (index >= (scene.questions?.length || 0)) return finishBlock();

    const question = scene.questions[index];
    questionUI.style.display = "block";
    questionUI.innerHTML = `
      <p><strong>Question ${index + 1}:</strong> ${question.text || ""}</p>
      <div id="audio-options-container" style="margin-top: 12px;"></div>
      <div id="video-multi-audio-feedback" style="margin-top: 10px; font-weight: bold;"></div>
    `;

    const optionsContainer = document.getElementById("audio-options-container");
    const feedbackDiv = document.getElementById("video-multi-audio-feedback");

    optionsContainer.innerHTML = "";

    (question.options || []).forEach((audioSrc, i) => {
      const optionLabel = document.createElement("label");
      optionLabel.style.display = "block";
      optionLabel.style.marginBottom = "12px";
      optionLabel.style.cursor = "pointer";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "audio-choice";
      radio.value = i;
      radio.style.marginRight = "10px";

      const audio = document.createElement("audio");
      audio.controls = true;
      audio.preload = "metadata";
      audio.src = resolveSrc(audioSrc);
      audio.style.verticalAlign = "middle";

      optionLabel.appendChild(radio);
      optionLabel.appendChild(audio);
      optionsContainer.appendChild(optionLabel);
    });

    // Submit button (fresh each q)
    let submitBtn = document.getElementById("video-multi-audio-submit-btn");
    if (submitBtn) submitBtn.remove();

    submitBtn = document.createElement("button");
    submitBtn.id = "video-multi-audio-submit-btn";
    submitBtn.textContent = "Submit Answer";
    submitBtn.style.cssText = "margin-top: 15px; padding: 8px 16px; font-weight: 700; background: #00ffff; border: none; border-radius: 8px; cursor: pointer";
    submitBtn.onmouseover = () => (submitBtn.style.backgroundColor = "#00cccc");
    submitBtn.onmouseout  = () => (submitBtn.style.backgroundColor = "#00ffff");
    questionUI.appendChild(submitBtn);

    submitBtn.onclick = () => {
      const selected = document.querySelector('input[name="audio-choice"]:checked');
      if (!selected) {
        feedbackDiv.textContent = "⚠️ Please select an answer.";
        feedbackDiv.style.color = "orange";
        return;
      }
      const answerIndex = parseInt(selected.value, 10);
      if (answerIndex === question.correct) {
        score++;
        feedbackDiv.textContent = "✅ Correct! Moving on...";
        feedbackDiv.style.color = "lightgreen";
      } else {
        feedbackDiv.textContent = "❌ Not quite. Moving on...";
        feedbackDiv.style.color = "salmon";
      }
      submitBtn.disabled = true;
      setTimeout(() => { index++; showQuestion(); }, 900);
    };
  }

  // Start questions after video ends (or on Skip)
  videoElem.addEventListener("ended", showQuestion);
}
// ─────────────────────────────────────────────────────────────────────────────
// Video → Scramble scene (inline-safe + GitHub Pages-safe URLs)
// ─────────────────────────────────────────────────────────────────────────────
function loadVideoScrambleScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  const gameContainer = document.getElementById("game-container");
  const sceneText     = document.getElementById("scene-text");
  const sceneImage    = document.getElementById("scene-image");
  const infoDiv       = document.getElementById("challenge-info");
  const scrambleDiv   = document.getElementById("sentence-scramble");
  const feedbackDiv   = document.getElementById("scramble-feedback");

  // Hide unrelated UI; show instructions if provided
  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (gameContainer) gameContainer.style.display = "block";
  if (sceneText) {
    if (scene.text) { sceneText.style.display = "block"; sceneText.textContent = scene.text; }
    else { sceneText.style.display = "none"; sceneText.innerHTML = ""; }
  }

  // Clear any previous video
  let old = document.getElementById("scene-video");
  if (old) { try { old.pause(); } catch(_){} old.src = ""; old.load(); old.remove(); }

  // Build video (resolved URL + inline-safe)
  const videoElem = document.createElement("video");
  videoElem.id = "scene-video";
  videoElem.controls = true;
  videoElem.preload  = "metadata";
  videoElem.setAttribute("playsinline", "");
  videoElem.setAttribute("webkit-playsinline", "");
  videoElem.playsInline = true;
  videoElem.src = resolveSrc(scene.videoSrc);
  if (scene.poster) videoElem.poster = resolveSrc(scene.poster);
  videoElem.style.cssText = "max-width:100%;max-height:360px;display:block;margin:0 auto 20px;border-radius:12px;background:#000;";

  // Graceful fallback if inline playback fails
  videoElem.addEventListener("error", () => {
    const msg = document.createElement("div");
    msg.style.cssText = "margin-top:8px;color:orange;font-weight:700;text-align:center";
    msg.textContent = "⚠️ This device can’t play the video inline.";
    const a = document.createElement("a");
    a.href = resolveSrc(scene.videoSrc);
    a.target = "_blank";
    a.textContent = "Open video in a new tab";
    a.style.cssText = "margin-left:8px;color:#0ff;text-decoration:underline";
    msg.appendChild(a);
    gameContainer.appendChild(msg);
  }, { once:true });

  // Insert video into DOM
  if (sceneText && sceneText.parentNode) {
    sceneText.parentNode.insertBefore(videoElem, sceneText.nextSibling);
  } else {
    gameContainer.appendChild(videoElem);
  }

  // After video ends, show scramble UI
  videoElem.onended = () => {
    if (!scrambleDiv || !feedbackDiv) return;

    scrambleDiv.style.display = "block";
    feedbackDiv.style.display = "block";
    scrambleDiv.innerHTML = "";
    feedbackDiv.textContent = "";

    // Instruction
    const instruction = document.createElement("p");
    instruction.className = "scramble-instructions";
    instruction.textContent = "🧩 Drag the words into the correct order:";
    scrambleDiv.appendChild(instruction);

    // Scramble container
    const scrambleContainer = document.createElement("div");
    scrambleContainer.id = "scramble-words";
    const source = Array.isArray(scene.scramble) ? scene.scramble.slice() : [];
    const shuffled = shuffleArray(source);
    shuffled.forEach(token => {
      const span = document.createElement("span");
      span.className = "scramble-word";
      span.textContent = token;
      scrambleContainer.appendChild(span);
    });
    scrambleDiv.appendChild(scrambleContainer);

    // Enable drag/drop
    try {
      if (window.scrambleSortable && typeof window.scrambleSortable.destroy === "function") {
        window.scrambleSortable.destroy();
      }
      window.scrambleSortable = Sortable.create(scrambleContainer, { animation: 150 });
    } catch (e) { console.warn("Sortable unavailable; drag disabled.", e); }

    // Check button
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "Check Answer";
    checkBtn.style.marginTop = "15px";
    scrambleDiv.appendChild(checkBtn);

    checkBtn.onclick = () => {
      const words = Array.from(document.querySelectorAll("#scramble-words .scramble-word"));
      const userOrder = words.map(w => w.textContent.trim());
      const correctArr = Array.isArray(scene.correct)
        ? scene.correct
        : (typeof scene.correct === "string" ? scene.correct.trim().split(/\s+/) : []);

      if (arraysEqual(userOrder, correctArr)) {
        feedbackDiv.textContent = "✅ Correct! Moving on...";
        feedbackDiv.style.color = "lightgreen";
        if (Array.isArray(scene.unlockScenes)) scene.unlockScenes.forEach(unlockScene);
        if (Array.isArray(scene.setFlags))     scene.setFlags.forEach(setFlag);
        setTimeout(() => { if (scene.next) loadScene(scene.next); }, 1200);
      } else {
        feedbackDiv.textContent = "❌ Not quite. Try again.";
        feedbackDiv.style.color = "salmon";
      }
    };
  };
}
 





// --- Video → Fill-in-the-Blank loader ---
function loadVideoFillBlankScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // Safe shorthands
  const regNode     = window.registerNode     || function(){};
  const regListener = window.registerListener || function(t,e,h){ t.addEventListener(e,h); };
  const regCleanup  = window.registerCleanup  || function(){};

  const game = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  if (game) game.style.display = "block";
  if (sceneText) { sceneText.style.display = "block"; sceneText.textContent = scene.text || ""; }

  // Clear stale UI
  ["vfb-wrap","vfb-ui","scene-video"].forEach(x => { const n = document.getElementById(x); if (n) n.remove(); });

  // ---- Inline-safe video wrapper
  const wrap = document.createElement("div");
  wrap.id = "vfb-wrap";
  wrap.style.cssText = "position:relative;max-width:100%;margin:0 auto 16px;";
  game.appendChild(wrap);

  const video = document.createElement("video");
  video.id = "scene-video";
  video.controls = true;
  video.preload = "metadata";
  if (scene.poster) video.poster = resolveSrc(scene.poster);
  video.src = resolveSrc(scene.videoSrc);
  video.style.cssText = "width:100%;height:auto;max-height:45vh;display:block;border-radius:12px;background:#000;";
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.playsInline = true;
  regNode(video);

  const overlay = document.createElement("button");
  overlay.textContent = "▶ Tap to Play";
  overlay.style.cssText = "position:absolute;inset:auto 0 0 0;margin:auto;top:0;bottom:0;width:180px;height:48px;background:#00ffff;color:#000;border:none;border-radius:10px;font-weight:700;cursor:pointer";
  overlay.onclick = async () => { try { await video.play(); overlay.remove(); } catch(_){} };
  video.addEventListener("play", () => { if (overlay.parentNode) overlay.remove(); });

  const skipBtn = document.createElement("button");
  skipBtn.textContent = "Skip video";
  skipBtn.style.cssText = "margin-top:8px;padding:8px 12px;border:none;border-radius:8px;background:#222;color:#eee;cursor:pointer;font-weight:700";
  skipBtn.onclick = () => startFIB();

  const errorMsg = () => {
    const msg = document.createElement("div");
    msg.style.cssText = "margin-top:8px;color:orange;font-weight:700";
    msg.textContent = "⚠️ This device can’t play the video inline.";
    const a = document.createElement("a");
    a.href = resolveSrc(scene.videoSrc);
    a.textContent = "Open video in a new tab";
    a.style.cssText = "display:inline-block;margin-left:8px;color:#0ff;text-decoration:underline";
    msg.appendChild(a);
    wrap.appendChild(msg);
  };
  video.addEventListener("error", errorMsg);

  wrap.appendChild(video);
  wrap.appendChild(overlay);
  wrap.appendChild(skipBtn);

  // ---- FIB UI
  function startFIB() {
    wrap.style.display = "none";
    try { video.pause(); } catch(_) {}

    const ui = document.createElement("div");
    ui.id = "vfb-ui";
    ui.style.cssText = "max-width:900px;margin:0 auto;color:#eee";
    game.appendChild(ui);

    const sentEl = document.createElement("p");
    sentEl.id = "vfb-sentence";
    sentEl.style.cssText = "font-size:1.2rem;line-height:1.5;margin-bottom:14px;";
    ui.appendChild(sentEl);

    const optsEl = document.createElement("div");
    optsEl.id = "vfb-options";
    optsEl.style.cssText = "margin-bottom:16px;display:flex;flex-wrap:wrap;gap:8px;";
    ui.appendChild(optsEl);

    const ctrl = document.createElement("div");
    ctrl.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;";
    ui.appendChild(ctrl);

    const checkBtn = document.createElement("button");
    checkBtn.textContent = "Check Answer";
    checkBtn.style.cssText = "padding:8px 12px;border:none;border-radius:8px;background:#00ffff;color:#000;font-weight:700;cursor:pointer";
    checkBtn.onmouseenter = () => (checkBtn.style.backgroundColor = "#00cccc");
    checkBtn.onmouseleave = () => (checkBtn.style.backgroundColor = "#00ffff");
    ctrl.appendChild(checkBtn);

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.style.cssText = "padding:8px 12px;border:none;border-radius:8px;background:#333;color:#eee;font-weight:700;cursor:pointer";
    ctrl.appendChild(resetBtn);

    const fb = document.createElement("div");
    fb.id = "vfb-feedback";
    fb.style.cssText = "margin-top:10px;font-weight:700;";
    ui.appendChild(fb);

    // Data prep — build sentence/blanks if not provided
    const toWords = s => String(s||"").trim().split(/\s+/).filter(Boolean);
    if (!Array.isArray(scene.sentence) || !Array.isArray(scene.blanks)) {
      const parts = String(scene.text || "").split("___");
      const toks = []; const blanks = [];
      parts.forEach((seg, i) => {
        if (seg) toks.push(...toWords(seg));
        if (i < parts.length - 1) { blanks.push(toks.length); toks.push("___"); }
      });
      scene.sentence = scene.sentence || toks;
      scene.blanks   = scene.blanks   || blanks;
    }

    const sentence = Array.isArray(scene.sentence) ? scene.sentence.slice() : [];
    const blanks   = Array.isArray(scene.blanks) ? scene.blanks.slice() : [];
    const options  = Array.isArray(scene.options) ? scene.options.slice() : [];
    const correct  = Array.isArray(scene.correct) ? scene.correct.slice()
                    : (typeof scene.correct === "string" ? [scene.correct] : []);

    // Render sentence with dropzones
    function paintSentence() {
      let html = "";
      for (let i = 0; i < sentence.length; i++) {
        if (blanks.includes(i)) {
          html += `<span class="vfb-zone" data-idx="${i}" style="display:inline-block;min-width:86px;border-bottom:2px solid #00ffff;margin:0 4px;vertical-align:bottom;padding:4px 6px;background:#111"></span> `;
        } else {
          html += `<span style="margin:0 4px;">${sentence[i]}</span> `;
        }
      }
      sentEl.innerHTML = html;
    }
    paintSentence();

    // Render options
    function paintOptions() {
      optsEl.innerHTML = "";
      options.forEach(opt => {
        const b = document.createElement("button");
        b.textContent = opt;
        b.className = "vfb-opt";
        b.style.cssText = "padding:6px 12px;border-radius:6px;border:2px solid #00ffff;background:#000;color:#0ff;font-weight:700;cursor:grab;user-select:none";
        optsEl.appendChild(b);
      });
    }
    paintOptions();

    // Enable drag/drop with Sortable
    const zones = Array.from(sentEl.querySelectorAll(".vfb-zone"));
    const sortZones = [];
    zones.forEach(zone => {
      try {
        const srt = Sortable.create(zone, { group:"vfb", animation:150, sort:false,
          onAdd: (evt) => {
            const dragged = evt.item;
            // ensure one token per zone
            if (zone.children.length > 1) {
              Array.from(zone.children).forEach((c,idx) => { if (idx>0) { optsEl.appendChild(c); } });
            }
          },
          onRemove: (evt) => { optsEl.appendChild(evt.item); }
        });
        sortZones.push(srt);
      } catch(e) { console.warn("Sortable missing?", e); }
    });
    let sortOpts;
    try { sortOpts = Sortable.create(optsEl, { group:"vfb", animation:150 }); } catch(e){}

    function sameToken(a,b){
      const norm = s => String(s||"")
        .replace(/[’']/g,"")        // ignore apostrophes
        .replace(/\s+/g," ")
        .toLowerCase().trim();
      return norm(a) === norm(b);
    }

    checkBtn.onclick = () => {
      const user = [];
      let filled = true;
      zones.forEach((zone, zi) => {
        if (zone.children.length === 1) user.push(zone.children[0].textContent.trim());
        else filled = false;
      });
      if (!filled) { fb.textContent = "⚠️ Please fill all blanks."; fb.style.color = "orange"; return; }

      const ok = (user.length === correct.length) && user.every((t,i) => sameToken(t, correct[i]));
      if (ok) {
        fb.textContent = "✅ Correct! Moving on...";
        fb.style.color = "lightgreen";
        try { if (scene.tallyKey && typeof tallyAdd === 'function') tallyAdd(scene.tallyKey, scene.tallyWeight || 1); } catch(_){}
        setTimeout(() => scene.next ? loadScene(scene.next) : console.warn("video-fill-in-the-blank: no next"), 900);
      } else {
        fb.textContent = "❌ Not quite. Try again.";
        fb.style.color = "salmon";
      }
    };

    resetBtn.onclick = () => {
      zones.forEach(z => { Array.from(z.children).forEach(ch => optsEl.appendChild(ch)); });
      paintOptions();
      fb.textContent = "";
    };

    regCleanup(() => { const n = document.getElementById("vfb-ui"); if (n) n.remove(); });
  }

  regListener(video, "ended", startFIB);
}

function loadVideoChoiceScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // Safe shorthands (don’t break if helpers aren’t present)
  const regNode     = window.registerNode     || function(){};
  const regListener = window.registerListener || function(t,e,h){ t.addEventListener(e,h); };
  const regCleanup  = window.registerCleanup  || function(){};

  const game = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");

  // Hide unrelated UI
  [sceneImage].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; }});
  if (sceneText) { sceneText.style.display = "none"; sceneText.textContent = ""; }
  if (game) game.style.display = "block";

  // Remove any prior instance
  const stale = document.getElementById("vc-wrap");
  if (stale) stale.remove();

  // Wrapper
  const wrap = document.createElement("div");
  wrap.id = "vc-wrap";
  wrap.style.cssText = "max-width:840px;margin:0 auto;padding:8px;";
  regNode(wrap);
  game.appendChild(wrap);

  // Video
  const video = document.createElement("video");
  video.id = "vc-video";
  video.controls = true;               // user-controlled (avoids autoplay policies)
  video.preload = "metadata";
  video.playsInline = true;            // iOS inline
  video.setAttribute("webkit-playsinline","true");
  video.muted = false;                 // don’t trigger autoplay attempts
  video.src = scene.videoSrc || "";
  video.style.cssText = "width:100%;max-height:45vh;border-radius:12px;background:#000;display:block;margin:0 auto;";
  wrap.appendChild(video);

  // “Tap to play” overlay to guarantee a user gesture
  const overlay = document.createElement("button");
  overlay.id = "vc-overlay";
  overlay.textContent = "▶ Tap to play";
  overlay.style.cssText = `
    position:relative; display:block; width:100%;
    margin:10px auto 0; padding:10px 14px;
    border:none; border-radius:10px;
    background:#00ffff; color:#000; font-weight:700; cursor:pointer;
  `;
  wrap.appendChild(overlay);

  // Choice panel (hidden until video ends or user skips)
  const panel = document.createElement("div");
  panel.id = "vc-panel";
  panel.style.cssText = "display:none;margin-top:12px;";
  wrap.appendChild(panel);

  // Timer
  const timerDiv = document.createElement("div");
  timerDiv.id = "vc-timer";
  timerDiv.style.cssText = "font-weight:700;font-size:1.05rem;color:#00ffff;margin:6px 0;";
  panel.appendChild(timerDiv);

  // Options
  const opts = document.createElement("div");
  opts.id = "vc-choices";
  opts.style.cssText = "display:flex;flex-direction:column;gap:8px;margin-top:8px;";
  panel.appendChild(opts);

  // Feedback
  const fb = document.createElement("div");
  fb.id = "vc-feedback";
  fb.style.cssText = "margin-top:10px;font-weight:700;";
  panel.appendChild(fb);

  // Build choices
  (scene.choices || []).forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text || "";
    btn.style.cssText = "text-align:left;padding:10px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;font-weight:700;cursor:pointer";
    btn.onmouseenter = () => (btn.style.background = "#00cccc");
    btn.onmouseleave = () => (btn.style.background = "#00ffff");
    regListener(btn, "click", () => {
      clearTimer();
      fb.textContent = "→";
      fb.style.color = "#aaa";
      loadScene(choice.next);
    });
    opts.appendChild(btn);
  });

  // Timer logic (starts AFTER video ends or when user skips)
  const DEFAULT_SECONDS = 15;
  let timeLeft = 0;
  let iv = null;

  function clearTimer() {
    if (iv) { clearInterval(iv); iv = null; }
  }
  function startTimer() {
    const sec = (scene.timer === true)
      ? DEFAULT_SECONDS
      : (Number.isFinite(scene.timer) ? Number(scene.timer) : DEFAULT_SECONDS);
    timeLeft = sec;
    timerDiv.textContent = `⏳ Time left: ${timeLeft}s`;
    iv = setInterval(() => {
      timeLeft -= 1;
      timerDiv.textContent = `⏳ Time left: ${Math.max(0,timeLeft)}s`;
      if (timeLeft <= 0) {
        clearTimer();
        fb.textContent = "⏲️ Time's up. Returning...";
        fb.style.color = "orange";
        const to = scene.timeoutNext || scene.next || null;
        setTimeout(() => { if (to) loadScene(to); }, 800);
      }
    }, 1000);
  }

  function revealPanelAndStartTimer() {
    panel.style.display = "block";
    startTimer();
  }

  // Play flow — only on explicit tap
  regListener(overlay, "click", async () => {
    overlay.disabled = true;
    try {
      await video.play();            // user gesture → should be allowed
      overlay.remove();              // playing OK
    } catch (err) {
      // If play still fails, show graceful fallback: show choices + timer immediately
      console.warn("[video-choice] play() rejected:", err);
      overlay.textContent = "▶ Open video in a new tab";
      overlay.disabled = false;
      overlay.onclick = () => window.open(video.src, "_blank");

      // Also add a Skip button
      const skip = document.createElement("button");
      skip.textContent = "Skip video";
      skip.style.cssText = "margin-left:8px;padding:10px 14px;border:none;border-radius:10px;background:#222;color:#eee;font-weight:700;cursor:pointer";
      overlay.parentNode.insertBefore(skip, overlay.nextSibling);
      skip.onclick = () => {
        overlay.remove();
        skip.remove();
        revealPanelAndStartTimer();
      };
    }
  });

  // When the video ends → reveal panel and start timer
  regListener(video, "ended", () => {
    revealPanelAndStartTimer();
  });

  // Cleanup on leave
  regCleanup(() => {
    clearTimer();
    const w = document.getElementById("vc-wrap");
    if (w) w.remove();
  });
}





// === Hangman loader (updated: no seepage, defensive keyboard cleanup) ===
function loadHangmanScene(id) {
  const scene = scenes[id];
  if (!scene) {
    console.error(`Scene ${id} not found.`);
    return;
  }

  // Pre-clean any previous hangman instance + key handler (belt & suspenders)
  const stale = document.getElementById('hangman');
  if (stale) stale.remove();
  if (window.__hmKeyHandler) {
    document.removeEventListener('keydown', window.__hmKeyHandler);
    window.__hmKeyHandler = null;
  }

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const infoDiv = document.getElementById("challenge-info");

  // Hide unrelated bits; show instructions if provided
  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) {
    if (scene.text) {
      sceneText.style.display = "block";
      sceneText.textContent = scene.text;
    } else {
      sceneText.style.display = "none";
      sceneText.innerHTML = "";
    }
  }
  if (gameContainer) gameContainer.style.display = "block";

  // Clean previous video/audio just in case
  const oldVideo = document.getElementById("scene-video");
  if (oldVideo) { oldVideo.pause(); oldVideo.src = ""; oldVideo.load(); oldVideo.remove(); }
  let audioElem = document.getElementById("scene-audio");
  if (audioElem) { audioElem.pause(); audioElem.src = ""; audioElem.load(); audioElem.remove(); }

  // Config
  const rawTarget = scene.target || "";
  const target = rawTarget.toUpperCase();
  const alphabet = (scene.alphabet || "ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
  const maxWrong = Number.isFinite(scene.maxWrong) ? scene.maxWrong : 6;

  // State
  const guessed = new Set();
  let wrong = 0;
  let solved = false;

  // Build UI
  const wrap = document.createElement("div");
  wrap.id = "hangman";
  wrap.style.maxWidth = "720px";
  wrap.style.margin = "0 auto";
  wrap.style.padding = "12px 8px";
  wrap.style.textAlign = "center";
  wrap.style.color = "#eee";

  wrap.innerHTML = `
    <div id="hm-header" style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <div id="hm-lives" style="font-weight:bold;">❤️ Lives: <span id="hm-lives-num">${maxWrong - wrong}</span></div>
      ${scene.hint ? `<div id="hm-hint" style="opacity:.85;">💡 ${scene.hint}</div>` : `<div></div>`}
    </div>

    <div id="hm-word"
         style="margin:18px 0;font:700 28px/1.4 system-ui,Segoe UI,Arial,Helvetica,Apple Color Emoji,Segoe UI Emoji;letter-spacing:.08em;"></div>

    <div id="hm-letters" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;"></div>

    <div id="hm-feedback" style="margin-top:14px;font-weight:700;"></div>
    <div id="hm-ctrl" style="margin-top:12px;"></div>
  `;

  // Insert
  if (sceneText && sceneText.parentNode) {
    sceneText.parentNode.insertBefore(wrap, sceneText.nextSibling);
  } else if (gameContainer) {
    gameContainer.appendChild(wrap);
  }

  const livesNum = wrap.querySelector("#hm-lives-num");
  const wordEl = wrap.querySelector("#hm-word");
  const lettersEl = wrap.querySelector("#hm-letters");
  const feedbackEl = wrap.querySelector("#hm-feedback");
  const ctrlEl = wrap.querySelector("#hm-ctrl");

  // Helpers
  function isLetter(ch) { return /[A-Z]/.test(ch); }
  function displayWord() {
    const out = [];
    for (const ch of target) {
      if (!isLetter(ch)) { out.push(ch); continue; } // keep spaces/punct visible
      out.push(guessed.has(ch) ? ch : "_");
    }
    wordEl.textContent = out.join(" ");
  }
  function allRevealed() {
    for (const ch of target) {
      if (isLetter(ch) && !guessed.has(ch)) return false;
    }
    return true;
  }
  function disableAll() {
    lettersEl.querySelectorAll("button").forEach(b => b.disabled = true);
  }

  function finishWin() {
    solved = true;
    feedbackEl.textContent = "✅ Correct! You solved it.";
    feedbackEl.style.color = "lightgreen";
    disableAll();

    // Award (optional)
    if (Array.isArray(scene.setFlagsOnWin)) scene.setFlagsOnWin.forEach(setFlag);
    if (Array.isArray(scene.unlockScenesOnWin)) scene.unlockScenesOnWin.forEach(unlockScene);

    // Next
    if (scene.next) {
      setTimeout(() => loadScene(scene.next), 1200);
    } else {
      // manual continue button if no next provided
      ctrlEl.innerHTML = "";
      const btn = document.createElement("button");
      btn.textContent = "Continue";
      btn.onclick = () => loadScene("scene1");
      ctrlEl.appendChild(btn);
    }
  }

  function finishLose() {
    feedbackEl.textContent = `❌ Out of lives. The answer was: "${rawTarget}"`;
    feedbackEl.style.color = "salmon";
    disableAll();
    ctrlEl.innerHTML = "";

    const retry = document.createElement("button");
    retry.textContent = "Retry";
    retry.style.marginRight = "8px";
    retry.onclick = () => loadScene(id);
    ctrlEl.appendChild(retry);

    const back = document.createElement("button");
    back.textContent = "Back to Hub";
    back.onclick = () => loadScene("scene1");
    ctrlEl.appendChild(back);

    if (scene.onLoseNext) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Continue";
      nextBtn.style.marginLeft = "8px";
      nextBtn.onclick = () => loadScene(scene.onLoseNext);
      ctrlEl.appendChild(nextBtn);
    }
  }

  function guessLetter(letter) {
    if (guessed.has(letter) || solved) return;
    guessed.add(letter);

    const btn = lettersEl.querySelector(`button[data-letter="${letter}"]`);
    if (btn) btn.disabled = true;

    if (target.includes(letter)) {
      displayWord();
      if (allRevealed()) finishWin();
    } else {
      wrong++;
      livesNum.textContent = String(maxWrong - wrong);
      if (wrong >= maxWrong) finishLose();
    }
  }

  // Render alphabet
  alphabet.forEach(ch => {
    const b = document.createElement("button");
    b.textContent = ch;
    b.dataset.letter = ch;
    b.style.cssText = "min-width:34px;padding:8px;border-radius:8px;border:none;background:#00ffff;color:#000;font-weight:700;cursor:pointer";
    b.onmouseenter = () => (b.style.background = "#00cccc");
    b.onmouseleave = () => (b.style.background = "#00ffff");
    b.onclick = () => guessLetter(ch);
    lettersEl.appendChild(b);
  });

  // Keyboard support (defensive: clear any previous handler and store globally)
  if (window.__hmKeyHandler) {
    document.removeEventListener('keydown', window.__hmKeyHandler);
    window.__hmKeyHandler = null;
  }
  const keyHandler = (e) => {
    const k = (e.key || "").toUpperCase();
    if (/^[A-Z]$/.test(k)) {
      e.preventDefault();
      guessLetter(k);
    }
  };
  document.addEventListener("keydown", keyHandler);
  window.__hmKeyHandler = keyHandler;

  // Cleanup keyboard when hangman DOM is removed
  const observer = new MutationObserver(() => {
    const alive = document.getElementById('hangman');
    if (!alive && window.__hmKeyHandler) {
      document.removeEventListener('keydown', window.__hmKeyHandler);
      window.__hmKeyHandler = null;
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial paint
  displayWord();
}


// === Grammar Survivor (seepage-proof) ===
function loadSurvivorQuizScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // Pre-clean any previous instance + timers
  if (window.__svCleanup) { try { window.__svCleanup(); } catch(_){} window.__svCleanup = null; }
  const stale = document.getElementById('survivor-quiz');
  if (stale) stale.remove();

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const infoDiv = document.getElementById("challenge-info");

  // Hide unrelated UI; show prompt/instructions if provided
  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) {
    if (scene.text) {
      sceneText.style.display = "block";
      sceneText.textContent = scene.text;
    } else {
      sceneText.style.display = "none";
      sceneText.innerHTML = "";
    }
  }
  if (gameContainer) gameContainer.style.display = "block";

  // Config
  const qs = Array.isArray(scene.questions) ? scene.questions.slice() : [];
  const livesStart = Number.isFinite(scene.lives) ? scene.lives : 3;
  const defaultTimer = Number.isFinite(scene.timer) && scene.timer > 0 ? scene.timer : 0;

  // State
  let qIndex = 0;
  let lives = livesStart;
  let score = 0;
  let timer = 0;
  let interval = null;

  // Wrapper
  const wrap = document.createElement('div');
  wrap.id = 'survivor-quiz';
  wrap.style.maxWidth = '760px';
  wrap.style.margin = '0 auto';
  wrap.style.padding = '12px 8px';
  wrap.style.color = '#eee';

  wrap.innerHTML = `
    <div id="sv-top" style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <div id="sv-progress" style="font-weight:700;">Q 1/${qs.length}</div>
      <div id="sv-lives" style="font-weight:700;">❤️ ${'❤'.repeat(lives)}<span style="opacity:.4">${'♡'.repeat(Math.max(0, livesStart - lives))}</span></div>
      <div id="sv-timer" style="min-width:120px;text-align:right;font-weight:700;"></div>
    </div>
    <div id="sv-question" style="margin:14px 0 8px;font:600 20px/1.35 system-ui,Segoe UI,Arial,Helvetica;"></div>
    <div id="sv-options" style="display:flex;flex-direction:column;gap:10px;"></div>
    <div id="sv-feedback" style="margin-top:12px;font-weight:700;"></div>
    <div id="sv-ctrl" style="margin-top:14px;"></div>
  `;

  if (sceneText && sceneText.parentNode) {
    sceneText.parentNode.insertBefore(wrap, sceneText.nextSibling);
  } else if (gameContainer) {
    gameContainer.appendChild(wrap);
  }

  const elProgress = wrap.querySelector('#sv-progress');
  const elLives    = wrap.querySelector('#sv-lives');
  const elTimer    = wrap.querySelector('#sv-timer');
  const elQ        = wrap.querySelector('#sv-question');
  const elOpts     = wrap.querySelector('#sv-options');
  const elFB       = wrap.querySelector('#sv-feedback');
  const elCtrl     = wrap.querySelector('#sv-ctrl');

  function paintLives() {
    elLives.innerHTML = `❤️ ${'❤'.repeat(lives)}<span style="opacity:.4">${'♡'.repeat(Math.max(0, livesStart - lives))}</span>`;
  }
  function stopTimer() { if (interval) { clearInterval(interval); interval = null; } elTimer.textContent = ''; }
  function startTimer(seconds) {
    stopTimer();
    if (!seconds || seconds <= 0) return;
    timer = seconds;
    elTimer.textContent = `⏳ ${timer}s`;
    interval = setInterval(() => {
      timer--;
      if (timer >= 0) elTimer.textContent = `⏳ ${timer}s`;
      if (timer <= 0) { stopTimer(); handleAnswer(-1, true); }
    }, 1000);
  }
  function disableButtons() { [...elOpts.querySelectorAll('button')].forEach(b => b.disabled = true); }

  // local cleanup used before navigating away
  function cleanup() {
    try { stopTimer(); } catch(_) {}
    const node = document.getElementById('survivor-quiz');
    if (node) node.remove();
  }
  // safe navigation: cleanup first, then go
  function goNext(dest) {
    cleanup();
    if (dest) loadScene(dest);
  }

  function nextQuestion() { qIndex++; (qIndex >= qs.length) ? finish() : renderQuestion(); }

  function finishLose() {
    stopTimer();
    elFB.textContent = "❌ You ran out of lives.";
    elFB.style.color = "salmon";
    elCtrl.innerHTML = "";

    if (Array.isArray(scene.setFlagsOnLose)) scene.setFlagsOnLose.forEach(setFlag);
    if (Array.isArray(scene.unlockScenesOnLose)) scene.unlockScenesOnLose.forEach(unlockScene);

    const retry = document.createElement('button');
    retry.textContent = "Retry";
    retry.style.marginRight = "8px";
    retry.onclick = () => goNext(id);
    elCtrl.appendChild(retry);

    const back = document.createElement('button');
    back.textContent = "Back to Hub";
    back.onclick = () => goNext("scene1");
    elCtrl.appendChild(back);

    if (scene.onLoseNext) {
      const cont = document.createElement('button');
      cont.textContent = "Continue";
      cont.style.marginLeft = "8px";
      cont.onclick = () => goNext(scene.onLoseNext);
      elCtrl.appendChild(cont);
    }
  }

  function finish() {
    stopTimer();
    if (scene.scoring && scene.endings) {
      const { high = Infinity, medium = -Infinity } = scene.scoring;
      let dest;
      if (score >= high) dest = scene.endings.high;
      else if (score >= medium) dest = scene.endings.medium;
      else dest = scene.endings.low;
      if (dest) return goNext(dest);
    }
    if (Array.isArray(scene.setFlagsOnWin)) scene.setFlagsOnWin.forEach(setFlag);
    if (Array.isArray(scene.unlockScenesOnWin)) scene.unlockScenesOnWin.forEach(unlockScene);

    if (scene.next) return goNext(scene.next);

    elFB.textContent = `🏁 Done! Score: ${score}/${qs.length}`;
    elFB.style.color = "#7fffd4";
    elCtrl.innerHTML = "";
    const back = document.createElement('button');
    back.textContent = "Back to Hub";
    back.onclick = () => goNext("scene1");
    elCtrl.appendChild(back);
  }

  function handleAnswer(choiceIndex, timedOut = false) {
    stopTimer();
    disableButtons();
    const q = qs[qIndex];
    const correct = (choiceIndex === q.correct);
    if (correct) {
      score++;
      elFB.textContent = "✅ Correct!";
      elFB.style.color = "lightgreen";
    } else {
      lives--;
      paintLives();
      elFB.textContent = timedOut ? "⌛ Time’s up!" : "❌ Not quite.";
      elFB.style.color = "salmon";
      if (q.explain) {
        const exp = document.createElement('div');
        exp.style.marginTop = "6px";
        exp.style.opacity = ".85";
        exp.textContent = `Hint: ${q.explain}`;
        elFB.appendChild(exp);
      }
    }
    if (lives <= 0) setTimeout(finishLose, 700);
    else setTimeout(nextQuestion, 800);
  }

  function renderQuestion() {
    elCtrl.innerHTML = "";
    elFB.textContent = "";
    const q = qs[qIndex];

    elProgress.textContent = `Q ${qIndex + 1}/${qs.length}`;
    elQ.textContent = q.text || "";

    elOpts.innerHTML = "";
    (q.options || []).forEach((opt, i) => {
      const b = document.createElement('button');
      b.textContent = opt;
      b.style.cssText = "text-align:left;padding:10px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;font-weight:700;cursor:pointer";
      b.onmouseenter = () => (b.style.background = "#00cccc");
      b.onmouseleave = () => (b.style.background = "#00ffff");
      b.onclick = () => handleAnswer(i, false);
      elOpts.appendChild(b);
    });

    const perQ = Number.isFinite(q.timer) && q.timer > 0 ? q.timer : defaultTimer;
    startTimer(perQ);
  }

  // Global cleanup hook so UNIVERSAL CLEANUP can stop timers + remove DOM
  window.__svCleanup = function () { cleanup(); };

  // Auto-clean timers if wrapper disappears for any reason
  const mo = new MutationObserver(() => {
    const alive = document.getElementById('survivor-quiz');
    if (!alive) { stopTimer(); mo.disconnect(); }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Kick off
  paintLives();
  renderQuestion();
}

// === Conjugation Race (timed typing drill; seepage-proof) ===
function loadConjugationRaceScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // Pre-clean any previous instance
  if (window.__crCleanup) { try { window.__crCleanup(); } catch(_){} window.__crCleanup = null; }
  const stale = document.getElementById('conj-race');
  if (stale) stale.remove();

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const infoDiv = document.getElementById("challenge-info");

  // Hide unrelated UI; show instructions if provided
  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) {
    if (scene.text) {
      sceneText.style.display = "block";
      sceneText.textContent = scene.text;
    } else {
      sceneText.style.display = "none";
      sceneText.innerHTML = "";
    }
  }
  if (gameContainer) gameContainer.style.display = "block";

  // Config
  const items = Array.isArray(scene.questions) ? scene.questions.slice() : [];
  const shuffle = !!scene.shuffle;
  const timerOverall = Number.isFinite(scene.timerOverall) ? scene.timerOverall : null; // one clock for all
  const timerPer = Number.isFinite(scene.timerPer) ? scene.timerPer : null;             // per item clock
  const showAnswerOnWrong = scene.showAnswerOnWrong !== false; // default true
  const acceptPunctuationVariants = scene.acceptPunctuationVariants !== false; // default true
  const caseInsensitive = scene.caseInsensitive !== false; // default true

  if (shuffle && typeof shuffleArray === "function") {
    // reuse your existing util
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
  }

  // State
  let qIndex = 0;
  let score = 0;
  let totalAnswered = 0;
  let tRemaining = timerOverall || 0;
  let tItem = timerPer || 0;
  let intervalOverall = null;
  let intervalPer = null;

  // Build UI
  const wrap = document.createElement('div');
  wrap.id = 'conj-race';
  wrap.style.maxWidth = '760px';
  wrap.style.margin = '0 auto';
  wrap.style.padding = '12px 8px';
  wrap.style.color = '#eee';

  wrap.innerHTML = `
    <div id="cr-top" style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <div id="cr-progress" style="font-weight:700;">Q 1/${items.length}</div>
      <div id="cr-score" style="font-weight:700;">Score: 0</div>
      <div id="cr-timer" style="min-width:140px;text-align:right;font-weight:700;"></div>
    </div>

    <div id="cr-prompt" style="margin:16px 0 8px;font:600 20px/1.35 system-ui,Segoe UI,Arial,Helvetica;"></div>

    <div id="cr-inputrow" style="display:flex;gap:8px;align-items:center;">
      <input id="cr-input" type="text" autocomplete="off"
             style="flex:1;min-width:140px;padding:10px;border-radius:10px;border:2px solid #00ffff;background:#000;color:#0ff;font-weight:700"/>
      <button id="cr-submit" style="padding:10px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;font-weight:700;cursor:pointer">Submit</button>
    </div>

    <div id="cr-feedback" style="margin-top:10px;font-weight:700;"></div>
    <div id="cr-ctrl" style="margin-top:14px;"></div>
  `;

  if (sceneText && sceneText.parentNode) {
    sceneText.parentNode.insertBefore(wrap, sceneText.nextSibling);
  } else if (gameContainer) {
    gameContainer.appendChild(wrap);
  }

  const elProgress = wrap.querySelector('#cr-progress');
  const elScore    = wrap.querySelector('#cr-score');
  const elTimer    = wrap.querySelector('#cr-timer');
  const elPrompt   = wrap.querySelector('#cr-prompt');
  const elInput    = wrap.querySelector('#cr-input');
  const elSubmit   = wrap.querySelector('#cr-submit');
  const elFB       = wrap.querySelector('#cr-feedback');
  const elCtrl     = wrap.querySelector('#cr-ctrl');

  // Helpers
  const norm = (s) => {
    if (s == null) return '';
    let x = String(s).trim();
    if (caseInsensitive) x = x.toLowerCase();
    if (acceptPunctuationVariants) {
      // normalize smart quotes & common punctuation
      x = x
        .replace(/[’‘]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/\s+/g, ' ')
        .replace(/\u00A0/g, ' ');
    }
    return x;
  };

  function stopOverallTimer() { if (intervalOverall) { clearInterval(intervalOverall); intervalOverall = null; } }
  function stopPerTimer() { if (intervalPer) { clearInterval(intervalPer); intervalPer = null; } }

  function startOverallTimer(seconds) {
    stopOverallTimer();
    if (!seconds || seconds <= 0) return;
    tRemaining = seconds;
    elTimer.textContent = `⏳ ${tRemaining}s total`;
    intervalOverall = setInterval(() => {
      tRemaining--;
      if (tRemaining >= 0) elTimer.textContent = `⏳ ${tRemaining}s total`;
      if (tRemaining <= 0) {
        stopPerTimer(); stopOverallTimer();
        finish(); // time up
      }
    }, 1000);
  }

  function startPerTimer(seconds) {
    stopPerTimer();
    if (!seconds || seconds <= 0) { elTimer.textContent = ''; return; }
    tItem = seconds;
    elTimer.textContent = `⏳ ${tItem}s`;
    intervalPer = setInterval(() => {
      tItem--;
      if (tItem >= 0) elTimer.textContent = `⏳ ${tItem}s`;
      if (tItem <= 0) {
        stopPerTimer();
        checkAnswer('', true); // timed out as empty answer
      }
    }, 1000);
  }

  function paintScore() { elScore.textContent = `Score: ${score}`; }
  function paintProgress() { elProgress.textContent = `Q ${Math.min(qIndex+1, items.length)}/${items.length}`; }

  function setPrompt(q) {
    // Question item shape: { prompt: "He ____ (go) — Past Simple", answers: ["went","'went'"] }
    // Optional: q.display (rich), q.hint
    elPrompt.textContent = q.prompt || '';
    elFB.textContent = q.hint ? `💡 ${q.hint}` : '';
    elFB.style.color = q.hint ? "#9fe8ff" : "";
  }

  function disableInput() {
    elInput.disabled = true;
    elSubmit.disabled = true;
  }
  function enableInput() {
    elInput.disabled = false;
    elSubmit.disabled = false;
  }

  function nextQuestion() {
    qIndex++;
    if (qIndex >= items.length) { finish(); return; }
    renderQuestion();
  }

function finish() {
  stopPerTimer(); stopOverallTimer();
  disableInput();

  const summary = `🏁 Done! Score: ${score}/${items.length}`;
  elFB.textContent = summary;
  elFB.style.color = "#7fffd4";
  elCtrl.innerHTML = "";

  // If using scoring/endings
  if (scene.scoring && scene.endings) {
    const { high = Infinity, medium = -Infinity } = scene.scoring;
    let dest;
    if (score >= high) dest = scene.endings.high;
    else if (score >= medium) dest = scene.endings.medium;
    else dest = scene.endings.low;
    if (dest) {
      const btn = document.createElement('button');
      btn.textContent = "Continue";
      btn.onclick = () => goNext(dest);
      elCtrl.appendChild(btn);
      return;
    }
  }

  // Respect scene.next if provided
  if (scene.next) {
    const btn = document.createElement('button');
    btn.textContent = "Continue";
    btn.onclick = () => goNext(scene.next);
    elCtrl.appendChild(btn);
    return;
  }

  // Final fallback
  const back = document.createElement('button');
  back.textContent = "Back to Hub";
  back.onclick = () => goNext("scene1");
  elCtrl.appendChild(back);
}


  function checkAnswer(userRaw, timedOut=false) {
    stopPerTimer();
    totalAnswered++;
    const q = items[qIndex] || {};
    const answers = Array.isArray(q.answers) ? q.answers : (q.answer ? [q.answer] : []);
    const user = norm(userRaw);
    const ok = answers.some(a => norm(a) === user);

    if (ok && !timedOut) {
      score++;
      paintScore();
      elFB.textContent = "✅ Correct!";
      elFB.style.color = "lightgreen";
      setTimeout(() => {
        qIndex++;
        (qIndex >= items.length) ? finish() : renderQuestion();
      }, 600);
    } else {
      elFB.textContent = timedOut ? "⌛ Time’s up." : "❌ Not quite.";
      elFB.style.color = "salmon";
      if (showAnswerOnWrong && answers.length) {
        const ans = document.createElement('div');
        ans.style.marginTop = "6px"; ans.style.opacity = ".9";
        ans.textContent = `Answer: ${answers[0]}`;
        elFB.appendChild(ans);
      }
      setTimeout(() => {
        qIndex++;
        (qIndex >= items.length) ? finish() : renderQuestion();
      }, 900);
    }
  }

  function renderQuestion() {
    paintProgress();
    enableInput();
    elInput.value = "";
    elInput.focus();
    const q = items[qIndex];
    setPrompt(q);

    if (timerPer) startPerTimer(timerPer);
    else if (timerOverall) {
      // already running; keep showing overall
      elTimer.textContent = `⏳ ${tRemaining}s total`;
    } else {
      elTimer.textContent = "";
    }
  }

  // Wire up events
  elSubmit.onclick = () => checkAnswer(elInput.value, false);
  elInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkAnswer(elInput.value, false);
    }
  });

  // Safe navigation: cleanup then go
  function cleanup() {
    try { stopPerTimer(); } catch(_) {}
    try { stopOverallTimer(); } catch(_) {}
    const node = document.getElementById('conj-race');
    if (node) node.remove();
  }
  function goNext(dest) { cleanup(); if (dest) loadScene(dest); }

  // Global cleanup hook for universal cleanup
  window.__crCleanup = function () { cleanup(); };

  // Auto-clean timers if wrapper disappears
  const mo = new MutationObserver(() => {
    const alive = document.getElementById('conj-race');
    if (!alive) { stopPerTimer(); stopOverallTimer(); mo.disconnect(); }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Start timers + first question
  if (timerOverall) startOverallTimer(timerOverall);
  renderQuestion();
}

// === Image Hotspots → drag tokens onto pins (seepage-proof) ===
function loadHotspotsScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // kill any previous instance
  if (window.__hsCleanup) { try { window.__hsCleanup(); } catch(_){} window.__hsCleanup = null; }
  const stale = document.getElementById('hotspots');
  if (stale) stale.remove();

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const infoDiv = document.getElementById("challenge-info");

  // Hide unrelated bits; show instructions if provided
  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) {
    if (scene.text) { sceneText.style.display = "block"; sceneText.textContent = scene.text; }
    else { sceneText.style.display = "none"; sceneText.innerHTML = ""; }
  }
  if (gameContainer) gameContainer.style.display = "block";

  // Config shape:
  // image: 'images/…'
  // pins: [{ id:'p1', x:25, y:60, answers:['look up'] }, ...]  // x/y = % (relative to image box)
  // tokens: ['look up','pick up','put down','get over']
  // next: 'scene1' (optional)
  const pins = Array.isArray(scene.pins) ? scene.pins : [];
  const tokens = Array.isArray(scene.tokens) ? scene.tokens.slice() : [];
  const bankTitle = scene.bankTitle || 'Choices';

  // Wrapper
  const wrap = document.createElement('div');
  wrap.id = 'hotspots';
  wrap.style.maxWidth = '980px';
  wrap.style.margin = '0 auto';
  wrap.style.padding = '10px 6px';
  wrap.style.color = '#eee';

  wrap.innerHTML = `
    <div id="hs-grid" style="display:grid;grid-template-columns:1fr 320px;gap:16px;align-items:start;">
      <div id="hs-stage" style="position:relative;border-radius:12px;overflow:hidden;background:#000;">
        <img id="hs-img" src="${scene.image}" alt="scene" style="display:block;width:100%;height:auto;"/>
        <div id="hs-layer" style="position:absolute;inset:0;pointer-events:none;"></div>
      </div>
      <div id="hs-side">
        <div style="font-weight:700;margin-bottom:8px;">${bankTitle}</div>
        <div id="hs-bank" style="display:flex;flex-wrap:wrap;gap:8px;min-height:48px;"></div>
        <div id="hs-feedback" style="margin-top:12px;font-weight:700;"></div>
        <div id="hs-ctrl" style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;"></div>
      </div>
    </div>
  `;

  if (sceneText && sceneText.parentNode) sceneText.parentNode.insertBefore(wrap, sceneText.nextSibling);
  else gameContainer.appendChild(wrap);

  const layer = wrap.querySelector('#hs-layer');
  const bank  = wrap.querySelector('#hs-bank');
  const fb    = wrap.querySelector('#hs-feedback');
  const ctrl  = wrap.querySelector('#hs-ctrl');

  // Build token chips in bank
  tokens.forEach(val => {
    const chip = document.createElement('div');
    chip.className = 'hs-chip';
    chip.textContent = val;
    chip.dataset.value = val;
    chip.style.cssText = "pointer-events:auto;user-select:none;padding:8px 10px;border-radius:10px;border:2px solid #00ffff;background:#000;color:#0ff;font-weight:700;cursor:grab";
    bank.appendChild(chip);
  });

  // Make bank sortable (source list)
  const bankSortable = Sortable.create(bank, {
    group: { name: 'hs', pull: 'clone', put: true },
    animation: 150,
    sort: false
  });

  // Build pins (droppable 1-item targets)
  const dropSortables = {};
  pins.forEach(pin => {
    const pinWrap = document.createElement('div');
    pinWrap.className = 'hs-pin';
    pinWrap.style.cssText = `
      position:absolute;left:${pin.x}%;top:${pin.y}%;
      transform:translate(-50%,-50%);
      width:48px;height:48px;border-radius:50%;
      background:radial-gradient(circle at 30% 30%, #5ff, #09a);
      box-shadow:0 0 0 3px rgba(0,255,255,.3), 0 0 12px rgba(0,255,255,.6);
      display:flex;align-items:center;justify-content:center;
      pointer-events:auto;`;
    pinWrap.title = pin.label || '';

    const slot = document.createElement('div');
    slot.id = `hs-slot-${pin.id}`;
    slot.dataset.pin = pin.id;
    slot.style.cssText = `
      width:36px;min-height:24px;max-width:80px;
      pointer-events:auto;background:#000d;border:2px dashed #bdf;
      border-radius:8px;padding:2px;display:flex;align-items:center;justify-content:center;`;
    pinWrap.appendChild(slot);

    // label below (optional)
    if (pin.caption) {
      const cap = document.createElement('div');
      cap.textContent = pin.caption;
      cap.style.cssText = "position:absolute;top:54px;left:50%;transform:translateX(-50%);font:600 12px/1.2 system-ui;white-space:nowrap;background:#000a;padding:2px 6px;border-radius:6px;border:1px solid #00bcd4";
      pinWrap.appendChild(cap);
    }

    layer.appendChild(pinWrap);

    dropSortables[pin.id] = Sortable.create(slot, {
      group: { name: 'hs', pull: true, put: true },
      animation: 150,
      sort: false,
      onAdd: (evt) => {
        const to = evt.to;
        // keep only one chip in the slot
        while (to.children.length > 1) {
          bank.appendChild(to.children[0]);
        }
      },
      onRemove: () => {}
    });
  });

  // Controls
  const resetBtn = document.createElement('button');
  resetBtn.textContent = "Reset";
  resetBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#333;color:#eee;cursor:pointer;font-weight:700";
  resetBtn.onclick = () => {
    // move all chips back to bank
    const chips = layer.querySelectorAll('.hs-chip');
    chips.forEach(ch => bank.appendChild(ch));
    fb.textContent = "";
  };
  ctrl.appendChild(resetBtn);

  const checkBtn = document.createElement('button');
  checkBtn.textContent = "Check";
  checkBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;cursor:pointer;font-weight:700";
  checkBtn.onmouseenter = () => (checkBtn.style.backgroundColor = "#00cccc");
  checkBtn.onmouseleave = () => (checkBtn.style.backgroundColor = "#00ffff");
  checkBtn.onclick = () => {
    let ok = true;
    let filled = true;
    pins.forEach(pin => {
      const slot = document.getElementById(`hs-slot-${pin.id}`);
      const chip = slot && slot.firstElementChild;
      if (!chip) { filled = false; ok = false; return; }
      const val = (chip.dataset.value || "").trim();
      const answers = Array.isArray(pin.answers) ? pin.answers : [pin.answer].filter(Boolean);
      const match = answers.some(a => (a || "").trim().toLowerCase() === val.toLowerCase());
      if (!match) ok = false;
    });

    if (!filled) {
      fb.textContent = "⚠️ Place a token on every pin.";
      fb.style.color = "orange";
      return;
    }
    if (ok) {
      fb.textContent = "✅ Correct! Moving on...";
      fb.style.color = "lightgreen";

      // optional rewards
      if (Array.isArray(scene.setFlagsOnWin)) scene.setFlagsOnWin.forEach(setFlag);
      if (Array.isArray(scene.unlockScenesOnWin)) scene.unlockScenesOnWin.forEach(unlockScene);

      setTimeout(() => {
        if (scene.next) goNext(scene.next);
      }, 900);
    } else {
      fb.textContent = "❌ Not quite. Try again.";
      fb.style.color = "salmon";
    }
  };
  ctrl.appendChild(checkBtn);

  const backBtn = document.createElement('button');
  backBtn.textContent = "Back to Hub";
  backBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#222;color:#eee;cursor:pointer;font-weight:700";
  backBtn.onclick = () => goNext("scene1");
  ctrl.appendChild(backBtn);

  // Cleanup helpers
  function cleanup() {
    const node = document.getElementById('hotspots');
    if (node) node.remove();
  }
  function goNext(dest) { cleanup(); if (dest) loadScene(dest); }

  // Expose global cleanup for Universal Cleanup
  window.__hsCleanup = function(){ cleanup(); };

  // Auto-stop if wrapper disappears
  const mo = new MutationObserver(() => {
    const alive = document.getElementById('hotspots');
    if (!alive) { mo.disconnect(); }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

// === Buckets / Kanban Sort (seepage-proof) ===
function loadBucketsScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // kill previous instance if any
  if (window.__bkCleanup) { try { window.__bkCleanup(); } catch(_){} window.__bkCleanup = null; }
  const stale = document.getElementById('buckets');
  if (stale) stale.remove();

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const infoDiv = document.getElementById("challenge-info");

  // Hide unrelated bits; show instructions if provided
  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) {
    if (scene.text) { sceneText.style.display = "block"; sceneText.textContent = scene.text; }
    else { sceneText.style.display = "none"; sceneText.innerHTML = ""; }
  }
  if (gameContainer) gameContainer.style.display = "block";

  // Scene shape:
  // buckets: [{ id:'separable', label:'Separable' }, { id:'inseparable', label:'Inseparable' }, ...]
  // tokens:  ['take off','turn on','look after','get over', ...]
  // answers: { separable:['take off','turn on'], inseparable:['look after','get over'] }
  // allowExtraInBank: true (optional), showAnswerOnWrong: true (default), next:'scene1'
  const buckets = Array.isArray(scene.buckets) ? scene.buckets : [];
  const tokens  = Array.isArray(scene.tokens) ? scene.tokens.slice() : [];
  const answers = scene.answers || {};
  const allowExtraInBank = scene.allowExtraInBank !== false; // default true: distractors can stay in bank
  const showAnswerOnWrong = scene.showAnswerOnWrong !== false; // default true

  // Wrapper
  const wrap = document.createElement('div');
  wrap.id = 'buckets';
  wrap.style.maxWidth = '1100px';
  wrap.style.margin = '0 auto';
  wrap.style.padding = '10px 6px';
  wrap.style.color = '#eee';

  // grid: bank on top, buckets below
  wrap.innerHTML = `
    <div id="bk-bank-wrap" style="margin-bottom:14px;">
      <div style="font-weight:700;margin-bottom:8px;">Tokens</div>
      <div id="bk-bank" style="display:flex;flex-wrap:wrap;gap:8px;min-height:54px;border:1px dashed #00ffff33;border-radius:12px;padding:10px;"></div>
    </div>
    <div id="bk-buckets" style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));align-items:start;"></div>
    <div id="bk-feedback" style="margin-top:14px;font-weight:700;"></div>
    <div id="bk-ctrl" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;"></div>
  `;

  if (sceneText && sceneText.parentNode) sceneText.parentNode.insertBefore(wrap, sceneText.nextSibling);
  else gameContainer.appendChild(wrap);

  const bank = wrap.querySelector('#bk-bank');
  const panel = wrap.querySelector('#bk-buckets');
  const fb = wrap.querySelector('#bk-feedback');
  const ctrl = wrap.querySelector('#bk-ctrl');

  // Build chips
  tokens.forEach(txt => {
    const chip = document.createElement('div');
    chip.className = 'bk-chip';
    chip.dataset.value = txt;
    chip.textContent = txt;
    chip.style.cssText = "pointer-events:auto;user-select:none;padding:8px 10px;border-radius:10px;border:2px solid #00ffff;background:#000;color:#0ff;font-weight:700;cursor:grab";
    bank.appendChild(chip);
  });

  // Bank Sortable
  const bankSortable = Sortable.create(bank, {
    group: { name: 'classify', pull: true, put: true },
    animation: 150,
    sort: false
  });

  // Buckets UIs + Sortables
  const bucketSortables = {};
  buckets.forEach(b => {
    const col = document.createElement('div');
    col.className = 'bk-col';
    col.style.cssText = "background:#000a;border:1px solid #00bcd455;border-radius:12px;padding:10px;min-height:140px;";

    col.innerHTML = `
      <div class="bk-title" style="font-weight:800;margin-bottom:8px;color:#9fe8ff">${b.label || b.id}</div>
      <div class="bk-drop" id="bk-drop-${b.id}" data-bucket="${b.id}"
           style="display:flex;flex-wrap:wrap;gap:8px;min-height:54px;"></div>
      <div class="bk-hint" style="opacity:.85;margin-top:6px;font-size:.9rem;"></div>
    `;
    if (b.hint) col.querySelector('.bk-hint').textContent = b.hint;
    panel.appendChild(col);

    const drop = col.querySelector(`#bk-drop-${b.id}`);
    bucketSortables[b.id] = Sortable.create(drop, {
      group: { name: 'classify', pull: true, put: true },
      animation: 150,
      sort: false
    });
  });

  // Controls
  const resetBtn = document.createElement('button');
  resetBtn.textContent = "Reset";
  resetBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#333;color:#eee;cursor:pointer;font-weight:700";
  resetBtn.onclick = () => {
    // send all chips back to bank
    wrap.querySelectorAll('.bk-drop .bk-chip').forEach(ch => bank.appendChild(ch));
    fb.textContent = "";
    // clear highlights
    wrap.querySelectorAll('.bk-chip').forEach(ch => ch.style.borderColor = '#00ffff');
  };
  ctrl.appendChild(resetBtn);

  const checkBtn = document.createElement('button');
  checkBtn.textContent = "Check";
  checkBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;cursor:pointer;font-weight:700";
  checkBtn.onmouseenter = () => (checkBtn.style.backgroundColor = "#00cccc");
  checkBtn.onmouseleave = () => (checkBtn.style.backgroundColor = "#00ffff");
  checkBtn.onclick = () => {
    // Clear previous highlights
    wrap.querySelectorAll('.bk-chip').forEach(ch => ch.style.borderColor = '#00ffff');

    // build placed map
    const placed = {};
    buckets.forEach(b => {
      const drop = document.getElementById(`bk-drop-${b.id}`);
      placed[b.id] = Array.from(drop.querySelectorAll('.bk-chip')).map(c => c.dataset.value);
    });

    // If not allowing extra in bank, require that every token left the bank
    if (!allowExtraInBank) {
      const leftovers = Array.from(bank.querySelectorAll('.bk-chip')).length;
      if (leftovers > 0) {
        fb.textContent = "⚠️ Sort all tokens into a bucket.";
        fb.style.color = "orange";
        return;
      }
    }

    // Validate: each bucket should contain exactly the expected items (order irrelevant)
    let allOk = true;
    buckets.forEach(b => {
      const want = new Set((answers[b.id] || []).map(s => s.toLowerCase()));
      const got  = placed[b.id].map(s => s.toLowerCase());

      // Wrong if: any missing target OR any extra not in want
      let ok = true;

      // missing
      want.forEach(w => { if (!got.includes(w)) ok = false; });
      // extras
      got.forEach(g => { if (!want.has(g)) ok = false; });

      if (!ok) {
        allOk = false;
        // highlight wrong chips in this bucket
        const drop = document.getElementById(`bk-drop-${b.id}`);
        Array.from(drop.querySelectorAll('.bk-chip')).forEach(ch => {
          const val = (ch.dataset.value || "").toLowerCase();
          if (!want.has(val)) ch.style.borderColor = 'salmon';
        });
        if (showAnswerOnWrong && want.size) {
          const hintEl = drop.parentElement.querySelector('.bk-hint');
          hintEl.textContent = `Expected: ${Array.from(want).join(', ')}`;
          hintEl.style.color = '#ffd27f';
        }
      }
    });

    if (allOk) {
      fb.textContent = "✅ Correct! Moving on...";
      fb.style.color = "lightgreen";
      if (Array.isArray(scene.setFlagsOnWin)) scene.setFlagsOnWin.forEach(setFlag);
      if (Array.isArray(scene.unlockScenesOnWin)) scene.unlockScenesOnWin.forEach(unlockScene);
      setTimeout(() => { if (scene.next) goNext(scene.next); }, 900);
    } else {
      fb.textContent = "❌ Some items are misplaced. Adjust and try again.";
      fb.style.color = "salmon";
    }
  };
  ctrl.appendChild(checkBtn);

  const backBtn = document.createElement('button');
  backBtn.textContent = "Back to Hub";
  backBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#222;color:#eee;cursor:pointer;font-weight:700";
  backBtn.onclick = () => goNext("scene1");
  ctrl.appendChild(backBtn);

  // cleanup + navigation
  function cleanup() {
    const node = document.getElementById('buckets');
    if (node) node.remove();
  }
  function goNext(dest) { cleanup(); if (dest) loadScene(dest); }

  window.__bkCleanup = function(){ cleanup(); };

  const mo = new MutationObserver(() => {
    const alive = document.getElementById('buckets');
    if (!alive) { mo.disconnect(); }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

// === Particle Swapper (live preview, seepage-proof) ===
// Supports two modes:
//
//  A) Full-phrase mode (default):
//     template: 'Please {{CHOICE}} the music.'
//     options: ['turn up','turn down','turn off']
//     correct: 1
//
//  B) Particle-only mode:
//     template: 'Please {{PARTICLE}} the heater.'   (or 'Please turn {{PARTICLE}} the heater.')
//     verb: 'turn'   // optional, used only for preview notes mapping
//     options: ['up','down','off']
//     correct: 2
//
// Optional:
//     previews: { '<option or full>': 'emoji or note', ... }
//     next, setFlagsOnWin[], unlockScenesOnWin[]
function loadParticleSwapperScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // kill any previous instance
  if (window.__psCleanup) { try { window.__psCleanup(); } catch(_){} window.__psCleanup = null; }
  const stale = document.getElementById('particle-swapper');
  if (stale) stale.remove();

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const infoDiv = document.getElementById("challenge-info");

  // Hide unrelated bits; show instructions if provided
  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) {
    if (scene.text) { sceneText.style.display = "block"; sceneText.textContent = scene.text; }
    else { sceneText.style.display = "none"; sceneText.innerHTML = ""; }
  }
  if (gameContainer) gameContainer.style.display = "block";

  // shape
  const mode = (scene.mode === 'particle') ? 'particle' : 'full';
  const template = scene.template || 'Please {{CHOICE}} the object.';
  const options = Array.isArray(scene.options) ? scene.options : [];
  const correctIndex = Number.isInteger(scene.correct) ? scene.correct : 0;
  const previews = scene.previews || {};
  const verb = scene.verb || ''; // only for particle mode helper text

  // Build UI
  const wrap = document.createElement('div');
  wrap.id = 'particle-swapper';
  wrap.style.maxWidth = '840px';
  wrap.style.margin = '0 auto';
  wrap.style.padding = '10px 6px';
  wrap.style.color = '#eee';

  wrap.innerHTML = `
    <div id="ps-sentence" style="font:700 26px/1.5 system-ui,Segoe UI,Arial;letter-spacing:.02em;margin-bottom:12px;"></div>
    <div id="ps-note" style="opacity:.9;margin-bottom:12px;"></div>
    <div id="ps-options" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;"></div>
    <div id="ps-feedback" style="font-weight:700;margin-top:4px;"></div>
    <div id="ps-ctrl" style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;"></div>
  `;
  if (sceneText && sceneText.parentNode) sceneText.parentNode.insertBefore(wrap, sceneText.nextSibling);
  else gameContainer.appendChild(wrap);

  const sentenceEl = wrap.querySelector('#ps-sentence');
  const noteEl = wrap.querySelector('#ps-note');
  const optsEl = wrap.querySelector('#ps-options');
  const fbEl = wrap.querySelector('#ps-feedback');
  const ctrlEl = wrap.querySelector('#ps-ctrl');

  let selectedIndex = null;

  function renderSentence() {
    let s = template;
    if (mode === 'particle') {
      const particle = (selectedIndex != null) ? options[selectedIndex] : '___';
      s = s.replace('{{PARTICLE}}', particle);
      // If the template did not include PARTICLE, fall back to a reasonable preview
      if (s === template) {
        s = `Please ${verb ? (verb + ' ') : ''}${particle} the object.`;
      }
    } else {
      const choice = (selectedIndex != null) ? options[selectedIndex] : '_____';
      s = s.replace('{{CHOICE}}', choice);
      if (s === template) {
        s = `Please ${choice} the object.`;
      }
    }
    sentenceEl.textContent = s;
  }

  function renderNote() {
    if (selectedIndex == null) { noteEl.textContent = ''; return; }
    const val = options[selectedIndex];
    // Build key for previews
    let key = val;
    if (mode === 'particle' && verb) key = `${verb} ${val}`;
    const note = previews[key] || previews[val] || '';
    noteEl.textContent = note;
  }

  // Build option buttons
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'ps-opt';
    btn.textContent = opt;
    btn.dataset.index = i;
    btn.style.cssText = "padding:8px 12px;border-radius:10px;border:2px solid #00ffff;background:#000;color:#0ff;font-weight:700;cursor:pointer";
    btn.onmouseenter = () => (btn.style.background = "#001a1a");
    btn.onmouseleave = () => (btn.style.background = "#000");
    btn.onclick = () => {
      // clear selection
      optsEl.querySelectorAll('.ps-opt').forEach(b => { b.style.borderColor = '#00ffff'; b.style.opacity = '1'; });
      selectedIndex = i;
      btn.style.borderColor = '#9effa0';
      renderSentence();
      renderNote();
      fbEl.textContent = '';
    };
    optsEl.appendChild(btn);
  });

  // Controls
  const resetBtn = document.createElement('button');
  resetBtn.textContent = "Reset";
  resetBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#333;color:#eee;cursor:pointer;font-weight:700";
  resetBtn.onclick = () => {
    selectedIndex = null;
    optsEl.querySelectorAll('.ps-opt').forEach(b => { b.style.borderColor = '#00ffff'; b.style.opacity = '1'; });
    fbEl.textContent = '';
    noteEl.textContent = '';
    renderSentence();
  };
  ctrlEl.appendChild(resetBtn);

  const checkBtn = document.createElement('button');
  checkBtn.textContent = "Submit";
  checkBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;cursor:pointer;font-weight:700";
  checkBtn.onmouseenter = () => (checkBtn.style.backgroundColor = "#00cccc");
  checkBtn.onmouseleave = () => (checkBtn.style.backgroundColor = "#00ffff");
  checkBtn.onclick = () => {
    if (selectedIndex == null) {
      fbEl.textContent = '⚠️ Select an option first.';
      fbEl.style.color = 'orange';
      return;
    }
    const correct = (selectedIndex === correctIndex);
    if (correct) {
      fbEl.textContent = '✅ Correct! Moving on...';
      fbEl.style.color = 'lightgreen';
      if (Array.isArray(scene.setFlagsOnWin)) scene.setFlagsOnWin.forEach(setFlag);
      if (Array.isArray(scene.unlockScenesOnWin)) scene.unlockScenesOnWin.forEach(unlockScene);
      setTimeout(() => { if (scene.next) goNext(scene.next); }, 900);
    } else {
      fbEl.textContent = '❌ Not quite. Try another particle.';
      fbEl.style.color = 'salmon';
      // nudge UI
      optsEl.querySelectorAll('.ps-opt').forEach((b, idx) => {
        if (idx === selectedIndex) b.style.borderColor = 'salmon';
      });
    }
  };
  ctrlEl.appendChild(checkBtn);

  const backBtn = document.createElement('button');
  backBtn.textContent = "Back to Hub";
  backBtn.style.cssText = "padding:8px 12px;border-radius:10px;border:none;background:#222;color:#eee;cursor:pointer;font-weight:700";
  backBtn.onclick = () => goNext('scene1');
  ctrlEl.appendChild(backBtn);

  function cleanup() {
    const node = document.getElementById('particle-swapper');
    if (node) node.remove();
  }
  function goNext(dest) { cleanup(); if (dest) loadScene(dest); }
  window.__psCleanup = function(){ cleanup(); };

  const mo = new MutationObserver(() => {
    const alive = document.getElementById('particle-swapper');
    if (!alive) { mo.disconnect(); }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Initial paint
  renderSentence();
  renderNote();
}

// === Comic Bubbles (speech/thought over image) — seepage-proof ===
// Scene shape:
//   type: 'comic-bubbles',
//   image: 'images/whatever.png',
//   text: 'instructions...',
//   bubbles: [
//     { x: 22, y: 28, kind: 'speech', prompt: 'Can you ___ the word?', options: ['look up','pick up','put down'], correct: 0 },
//     { x: 72, y: 62, kind: 'thought', prompt: 'We should ___ the TV.', options: ['turn up','turn down','turn off'], correct: 2 }
//   ],
//   next: 'scene1', setFlagsOnWin:[], unlockScenesOnWin:[]
function loadComicBubblesScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  // kill any previous instance
  if (window.__cbCleanup) { try { window.__cbCleanup(); } catch(_){} window.__cbCleanup = null; }
  const stale = document.getElementById('comic-bubbles');
  if (stale) stale.remove();

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const infoDiv = document.getElementById("challenge-info");

  // Hide unrelated bits; show instructions if provided
  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) {
    if (scene.text) { sceneText.style.display = "block"; sceneText.textContent = scene.text; }
    else { sceneText.style.display = "none"; sceneText.innerHTML = ""; }
  }
  if (gameContainer) gameContainer.style.display = "block";

  const bubbles = Array.isArray(scene.bubbles) ? scene.bubbles : [];

  // Wrapper with the image and overlay layer
  const wrap = document.createElement('div');
  wrap.id = 'comic-bubbles';
  wrap.style.maxWidth = '980px';
  wrap.style.margin = '0 auto';
  wrap.style.padding = '8px 6px';
  wrap.style.color = '#eee';

  wrap.innerHTML = `
    <div id="cb-figure" style="position:relative; width:100%; border-radius:12px; overflow:hidden; background:#000;">
      <img id="cb-img" src="${scene.image || ''}" alt="scene" style="width:100%; height:auto; display:block;"/>
      <div id="cb-overlay" style="position:absolute; inset:0;"></div>
    </div>
    <div id="cb-feedback" style="margin-top:12px; font-weight:700;"></div>
    <div id="cb-ctrl" style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap;"></div>
  `;
  if (sceneText && sceneText.parentNode) sceneText.parentNode.insertBefore(wrap, sceneText.nextSibling);
  else gameContainer.appendChild(wrap);

  const overlay = wrap.querySelector('#cb-overlay');
  const fbEl = wrap.querySelector('#cb-feedback');
  const ctrlEl = wrap.querySelector('#cb-ctrl');

  // Create bubbles
  const state = { chosen: Array(bubbles.length).fill(null) };

  function bubbleShellStyles(kind) {
    const base = "position:absolute; transform:translate(-50%,-50%); max-width:46%;";
    const pad = "padding:10px 12px; border-radius:16px;";
    const common = "background:#111; color:#0ff; border:2px solid #00ffff; box-shadow:0 2px 10px #0008;";
    const tail =
      kind === 'thought'
        ? ``
        : ``;
    return `${base} ${pad} ${common} ${tail}`;
  }

  function renderBubble(i, b) {
    const el = document.createElement('div');
    el.className = 'cb-bubble';
    el.style.cssText = bubbleShellStyles(b.kind || 'speech');
    el.style.left = (b.x || 50) + '%';
    el.style.top = (b.y || 50) + '%';
    el.style.cursor = 'default';

    const prompt = document.createElement('div');
    prompt.textContent = b.prompt || '';
    prompt.style.fontWeight = '700';
    prompt.style.marginBottom = '8px';
    el.appendChild(prompt);

    const optWrap = document.createElement('div');
    optWrap.className = 'cb-options';
    optWrap.style.display = 'flex';
    optWrap.style.flexWrap = 'wrap';
    optWrap.style.gap = '6px';
    el.appendChild(optWrap);

    (b.options || []).forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.textContent = optText;
      btn.dataset.index = idx;
      btn.style.cssText = "padding:6px 10px; border-radius:10px; border:2px solid #00ffff; background:#000; color:#0ff; font-weight:700; cursor:pointer;";
      btn.onmouseenter = () => (btn.style.background = "#001a1a");
      btn.onmouseleave = () => (btn.style.background = "#000");
      btn.onclick = () => {
        state.chosen[i] = idx;
        // reset all buttons border in this bubble
        optWrap.querySelectorAll('button').forEach(bn => bn.style.borderColor = '#00ffff');
        btn.style.borderColor = '#9effa0';
        fbEl.textContent = '';
      };
      optWrap.appendChild(btn);
    });

    // inline result area for this bubble
    const note = document.createElement('div');
    note.className = 'cb-note';
    note.style.marginTop = '6px';
    note.style.opacity = '.95';
    el.appendChild(note);

    overlay.appendChild(el);
  }

  bubbles.forEach((b, i) => renderBubble(i, b));

  // Controls
  const resetBtn = document.createElement('button');
  resetBtn.textContent = "Reset";
  resetBtn.style.cssText = "padding:8px 12px; border-radius:10px; border:none; background:#333; color:#eee; cursor:pointer; font-weight:700";
  resetBtn.onclick = () => {
    state.chosen = Array(bubbles.length).fill(null);
    overlay.querySelectorAll('.cb-bubble .cb-options button').forEach(b => b.style.borderColor = '#00ffff');
    overlay.querySelectorAll('.cb-bubble .cb-note').forEach(n => { n.textContent = ''; n.style.color = '#eee'; });
    fbEl.textContent = '';
  };
  ctrlEl.appendChild(resetBtn);

  const checkBtn = document.createElement('button');
  checkBtn.textContent = "Submit";
  checkBtn.style.cssText = "padding:8px 12px; border-radius:10px; border:none; background:#00ffff; color:#000; cursor:pointer; font-weight:700";
  checkBtn.onmouseenter = () => (checkBtn.style.backgroundColor = "#00cccc");
  checkBtn.onmouseleave = () => (checkBtn.style.backgroundColor = "#00ffff");
  checkBtn.onclick = () => {
    let allAnswered = true;
    let allCorrect = true;

    bubbles.forEach((b, i) => {
      const note = overlay.querySelectorAll('.cb-bubble .cb-note')[i];
      const chosen = state.chosen[i];
      if (chosen == null) { allAnswered = false; note.textContent = '⚠️ Choose an option.'; note.style.color = 'orange'; return; }
      if (chosen !== b.correct) { allCorrect = false; note.textContent = '❌ Try another option.'; note.style.color = 'salmon'; }
      else { note.textContent = '✅'; note.style.color = 'lightgreen'; }
    });

    if (!allAnswered) {
      fbEl.textContent = "⚠️ Answer all bubbles before submitting.";
      fbEl.style.color = "orange";
      return;
    }

    if (allCorrect) {
      fbEl.textContent = "✅ Perfect! Moving on…";
      fbEl.style.color = "lightgreen";
      if (Array.isArray(scene.setFlagsOnWin)) scene.setFlagsOnWin.forEach(setFlag);
      if (Array.isArray(scene.unlockScenesOnWin)) scene.unlockScenesOnWin.forEach(unlockScene);
      setTimeout(() => { if (scene.next) goNext(scene.next); }, 900);
    } else {
      fbEl.textContent = "❌ Some bubbles are incorrect. Adjust and submit again.";
      fbEl.style.color = "salmon";
    }
  };
  ctrlEl.appendChild(checkBtn);

  const backBtn = document.createElement('button');
  backBtn.textContent = "Back to Hub";
  backBtn.style.cssText = "padding:8px 12px; border-radius:10px; border:none; background:#222; color:#eee; cursor:pointer; font-weight:700";
  backBtn.onclick = () => goNext('scene1');
  ctrlEl.appendChild(backBtn);

  // cleanup + navigation
  function cleanup() {
    const node = document.getElementById('comic-bubbles');
    if (node) node.remove();
  }
  function goNext(dest) { cleanup(); if (dest) loadScene(dest); }
  window.__cbCleanup = function(){ cleanup(); };

  const mo = new MutationObserver(() => {
    const alive = document.getElementById('comic-bubbles');
    if (!alive) { mo.disconnect(); }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

// === Dashboard (universal CRM-style widgets + data MCQs) ===
// Scene shape:
//   type: 'dashboard',
//   text: 'instructions...',
//   widgets: [
//     { type:'kpi', id:'rev', label:'Revenue', value:'$1.2M', delta:+8 },
//     { type:'bar', id:'perf', label:'Quarterly Performance', data:[{label:'Q1',value:20},...], max:100 },
//     { type:'pie', id:'mix', label:'Product Mix', data:[{label:'A',value:50},...], colors:['#0ff','#9f0','#f90'] },
//     { type:'table', id:'top', label:'Top Accounts', columns:['Client','MRR','Status'], rows:[['Acme','$50k','Active'], ...] }
//   ],
//   questions: [
//     { text:'Which product leads the mix?', options:['A','B','C'], correct:0 },
//     { text:'Which quarter was best?', options:['Q1','Q2','Q3','Q4'], correct:3 }
//   ],
//   next:'scene1' OR {scoring:{high:2,medium:1}, endings:{high:'id',medium:'id',low:'id'}}
// === Dashboard loader (binds to crm.state + live updates) ===
// === Dashboard (narrative CRM) loader ===
function loadDashboardScene(id) {
  const scene = scenes[id];
  if (!scene) { console.error(`Scene ${id} not found.`); return; }

  const regNode     = window.registerNode     || function(){};
  const regCleanup  = window.registerCleanup  || function(){};

  // Kill any previous instance
  const stale = document.getElementById('dashboard-wrap');
  if (stale) stale.remove();

  const game       = document.getElementById('game-container');
  const sceneText  = document.getElementById('scene-text');
  const sceneImage = document.getElementById('scene-image');
  const infoDiv    = document.getElementById('challenge-info');

  [sceneImage, infoDiv].forEach(el => { if (el) { el.style.display = "none"; el.innerHTML = ""; } });
  if (sceneText) {
    if (scene.text) { sceneText.style.display = 'block'; sceneText.textContent = scene.text; }
    else { sceneText.style.display = 'none'; sceneText.innerHTML = ''; }
  }
  if (game) game.style.display = 'block';

  // Wrapper
  const wrap = document.createElement('div');
  wrap.id = 'dashboard-wrap';
  wrap.style.maxWidth = '1100px';
  wrap.style.margin = '0 auto';
  wrap.style.padding = '8px 6px';
  wrap.style.color = '#eee';
  regNode(wrap);

  const questions = Array.isArray(scene.questions) ? scene.questions : [];

  wrap.innerHTML = `
    <div id="dash-grid" style="
      display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
      gap:12px;align-items:start;">
    </div>
    ${questions.length ? `<div id="dash-qa" style="margin-top:16px;border-top:1px solid #00ffff55;padding-top:12px;"></div>` : ``}
  `;
  if (sceneText && sceneText.parentNode) sceneText.parentNode.insertBefore(wrap, sceneText.nextSibling);
  else game.appendChild(wrap);

  regCleanup(() => { const n = document.getElementById('dashboard-wrap'); if (n) n.remove(); });

  const grid = wrap.querySelector('#dash-grid');
  const qa   = wrap.querySelector('#dash-qa');

  // --- Card helpers
  function card(title) {
    const c = document.createElement('div');
    c.className = 'dash-card';
    c.style.cssText = 'background:#0a0a0a;border:1px solid #00ffff33;border-radius:12px;padding:12px;box-shadow:0 4px 16px #0006;';
    if (title) {
      const h = document.createElement('div');
      h.textContent = title;
      h.style.cssText = 'font-weight:800;margin-bottom:8px;color:#0ff;';
      c.appendChild(h);
    }
    regNode(c);
    return c;
  }
  function renderKPI(w) {
    const c = card(w.label);
    const val = document.createElement('div');
    val.textContent = w.value ?? '';
    val.style.cssText = 'font-size:28px;font-weight:900;letter-spacing:.02em;margin-bottom:6px;';
    const d = document.createElement('div');
    const delta = Number(w.delta || 0);
    const sign = delta > 0 ? '+' : '';
    d.textContent = `${sign}${delta}% vs prev`;
    d.style.cssText = `font-weight:700;${delta>=0?'color:#9effa0;':'color:salmon;'}`;
    c.appendChild(val); c.appendChild(d);
    return c;
  }
  function renderBar(w) {
    const c = card(w.label);
    const max = Number.isFinite(w.max) ? w.max : Math.max(...(w.data||[]).map(d=>d.value||0), 1);
    (w.data||[]).forEach(row=>{
      const line = document.createElement('div');
      line.style.cssText='display:flex;align-items:center;gap:8px;margin:6px 0;';
      const label = document.createElement('div');
      label.textContent = row.label ?? '';
      label.style.cssText='min-width:64px;opacity:.9;';
      const barBox = document.createElement('div');
      barBox.style.cssText='flex:1;background:#111;border-radius:8px;overflow:hidden;border:1px solid #00ffff33;';
      const bar = document.createElement('div');
      const pct = Math.max(0, Math.min(100, (row.value||0)/max*100));
      bar.style.cssText=`height:14px;width:${pct}%;background:linear-gradient(90deg,#00ffff,#00cccc);`;
      barBox.appendChild(bar);
      const val = document.createElement('div');
      val.textContent = row.value ?? '';
      val.style.cssText='min-width:44px;text-align:right;opacity:.85;';
      line.appendChild(label); line.appendChild(barBox); line.appendChild(val);
      c.appendChild(line);
    });
    return c;
  }
  function renderPie(w) {
    const total = (w.data||[]).reduce((a,b)=>a+(b.value||0),0) || 1;
    let acc = 0;
    const colors = ['#00ffff','#9effa0','#f9f871','#f99','#0bf','#f0f','#ffa500'];
    const stops = (w.data||[]).map((seg,i)=>{
      const start = acc/total*360; acc += (seg.value||0);
      const end = acc/total*360;
      const col = (w.colors && w.colors[i]) || colors[i%colors.length];
      return `${col} ${start}deg ${end}deg`;
    }).join(', ');
    const c = card(w.label);
    const ring = document.createElement('div');
    ring.style.cssText=`width:140px;height:140px;border-radius:50%;margin:6px auto;background:conic-gradient(${stops});`;
    const hole = document.createElement('div');
    hole.style.cssText='width:80px;height:80px;border-radius:50%;background:#0a0a0a;margin:-110px auto 8px;border:1px solid #00ffff33;';
    c.appendChild(ring); c.appendChild(hole);
    (w.data||[]).forEach((seg,i)=>{
      const row=document.createElement('div');
      const col=(w.colors && w.colors[i]) || colors[i%colors.length];
      row.innerHTML=`<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${col};margin-right:6px;"></span>${seg.label ?? ''} — ${seg.value ?? 0}`;
      row.style.margin='4px 0'; row.style.opacity='.9';
      c.appendChild(row);
    });
    return c;
  }
  function renderTable(w) {
    const c = card(w.label);
    const tbl = document.createElement('table');
    tbl.style.cssText='width:100%;border-collapse:collapse;font-size:14px;';
    const thead = document.createElement('thead');
    const trh = document.createElement('tr');
    (w.columns||[]).forEach(h=>{
      const th=document.createElement('th');
      th.textContent=h; th.style.cssText='text-align:left;border-bottom:1px solid #00ffff33;padding:6px;';
      trh.appendChild(th);
    });
    thead.appendChild(trh); tbl.appendChild(thead);
    const tbody=document.createElement('tbody');
    (w.rows||[]).forEach(r=>{
      const tr=document.createElement('tr');
      (r||[]).forEach(cell=>{
        const td=document.createElement('td');
        td.textContent=cell; td.style.cssText='padding:6px;border-bottom:1px dashed #00ffff1f;';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);
    c.appendChild(tbl);
    return c;
  }

  // Render widgets
  (scene.widgets||[]).forEach(w=>{
    let node=null;
    if (w.type==='kpi') node=renderKPI(w);
    else if (w.type==='bar') node=renderBar(w);
    else if (w.type==='pie') node=renderPie(w);
    else if (w.type==='table') node=renderTable(w);
    if (node) { node.dataset.id = w.id || ''; grid.appendChild(node); }
  });

  // --- Questions (auto-advance on correct) OR auto-skip if none
  if (questions.length && qa) {
    let qIndex = 0;

    function renderDashQuestion(i) {
      const q = questions[i];
      qa.innerHTML = '';
      const cardQ = card(`Question ${i+1} of ${questions.length}`);
      const p = document.createElement('div');
      p.textContent = q.text || '';
      p.style.marginBottom = '10px';
      cardQ.appendChild(p);

      const opts = document.createElement('div');
      opts.style.display = 'flex';
      opts.style.flexDirection = 'column';
      opts.style.gap = '8px';

      (q.options || []).forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.style.cssText = "text-align:left;padding:10px 12px;border-radius:10px;border:none;background:#00ffff;color:#000;font-weight:700;cursor:pointer";
        btn.onmouseenter = () => (btn.style.background = "#00cccc");
        btn.onmouseleave = () => (btn.style.background = "#00ffff");
        btn.onclick = () => {
          const correct = (idx === q.correct);
          // disable all to avoid double clicks
          Array.from(opts.children).forEach(b => b.disabled = true);
          if (correct) {
            // brief feedback flash
            const fb = document.createElement('div');
            fb.textContent = "✅ Correct!";
            fb.style.cssText = "margin-top:8px;font-weight:800;color:lightgreen;";
            cardQ.appendChild(fb);

            setTimeout(() => {
              // next question or navigate
              if (i + 1 < questions.length) {
                renderDashQuestion(i + 1);
              } else if (scene.endings && scene.scoring) {
                // optional scoring path (count corrects)
                // minimal: treat all answered correctly path
                const dest = scene.endings.high || scene.next;
                if (dest) loadScene(dest);
              } else if (scene.next) {
                loadScene(scene.next);
              }
            }, 700);
          } else {
            // allow retry on wrong
            btn.style.background = '#ff9e9e';
            btn.style.color = '#000';
            // re-enable others so they can try again
            Array.from(opts.children).forEach(b => { if (b !== btn) b.disabled = false; });
          }
        };
        opts.appendChild(btn);
      });

      cardQ.appendChild(opts);
      qa.appendChild(cardQ);
    }

    renderDashQuestion(qIndex);
  } else if (scene.next) {
    // No questions: jump straight to the next scene
    setTimeout(() => loadScene(scene.next), 0);
  }
}




