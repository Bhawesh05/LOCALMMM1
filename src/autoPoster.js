import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://rjzojhsugnmqwnsbpzzp.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqem9qaHN1Z25tcXduc2JwenpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDI5MjUsImV4cCI6MjA3ODc3ODkyNX0.eTb334q2nQVI5NVB0bj6CgutTsHlBg-6OjhJkdQht0A';

const supabase = createClient(supabaseUrl, supabaseKey);

// All 200+ cricket jokes data
const creators = [
  {
    name: "Raju Bhai | Lucknow",
    sentences: [
      "Yeh Pakistan waale 'Babar Babar' kyun chillate rehte hain? Kya woh alag brand ki cigarette hai? 🚬"
    ]
  },
  {
    name: "Chintu Mehta | Ahmedabad",
    sentences: [
      "Ireland team dekh ke lagta hai jaise foreign exchange students cricket khelne aa gaye hain!"
    ]
  },
  {
    name: "Priya Reddy | Hyderabad",
    sentences: [
      "Babar Azam ki batting dekh kar meri mummy boli: 'Beta, itna sukoon se khelta hai jaise tension uski biwi ko hai!'"
    ]
  },
  {
    name: "Tony Singh | Delhi",
    sentences: [
      "Pakistan jeetega ya Ireland? Dono ki situation dekh kar lagta hai draw hi theek rahega! 🤝"
    ]
  },
  {
    name: "Rinku Sharma | Patna",
    sentences: [
      "Yeh @AshfaqKhan '18 aur' bol raha hai... lagta hai uski umar bhi 18 hai aur uski batting average bhi!"
    ]
  },
  {
    name: "Babloo Das | Kolkata",
    sentences: [
      "Pakistan ki fielding dekh kar lagta hai sabne zindagi mein pehli baar ball dekha hai!"
    ]
  },
  {
    name: "Sweety Menon | Kochi",
    sentences: [
      "Oye! Ireland waalon ki strategy samajh aa rahi hai - 'Jitna ho sake utna slow karo, shaam tak match kheleinge!'"
    ]
  },
  {
    name: "Munna Bhaiya | Kanpur",
    sentences: [
      "Yeh @drkhalid7549 itna Pakistani flag bhej raha hai jaise uske paas flag factory hai! 🇵🇰"
    ]
  },
  {
    name: "Gaffar Ali | Bhopal",
    sentences: [
      "Commentator bol raha tha 'Good shot'... par ball toh boundary se 10 meter pehle ruk gaya! 😂"
    ]
  },
  {
    name: "Lallan Ji | Varanasi",
    sentences: [
      "Yeh free fire wala @QariMasoodAhmed har comment mein game ID de raha hai... bhai cricket dekh le pehle!"
    ]
  },
  {
    name: "Rajesh Tiwari | Jhansi",
    sentences: [
      "Pakistan waale 'Inshallah' bol bol kar khel rahe hain... Allah bhi soch raha hoga 'Main kya karoon?'"
    ]
  },
  {
    name: "Pinky Kumari | Gaya",
    sentences: [
      "Mera boyfriend Pakistan team ki tarah hai - promise karta hai accha performance ka, phir last moment pe... 😅"
    ]
  },
  {
    name: "Rohan Malhotra | Chandigarh",
    sentences: [
      "Ireland team aisi khel rahi jaise unhe pata hai flight ticket wapas nahi milega!"
    ]
  },
  {
    name: "Anjali Joshi | Pune",
    sentences: [
      "Yeh match dekh kar pata chalta hai ki dono teams ko coach ki nahi, doctor ki zarurat hai! 🏥"
    ]
  },
  {
    name: "Suresh Yadav | Dhanbad",
    sentences: [
      "Babar Azam ki form dekh kar lagta hai usne reality show jeetna hai, match nahi!"
    ]
  },
  {
    name: "Meena Devi | Jaipur",
    sentences: [
      "Mere pati ne kaha 'Cricket mat dekho'... maine kaha 'Par yeh toh comedy show lag raha hai!'"
    ]
  },
  {
    name: "Karan Singh | Jalandhar",
    sentences: [
      "Yeh @ahmadkhan55555v bol raha hai 'India father of Pakistan'... bhai cricket match hai, history class nahi! 📚"
    ]
  },
  {
    name: "Neha Gupta | Nagpur",
    sentences: [
      "Pakistan ki batting dekh kar lagta hai sabne naye naye bats liye hain - abhi practice karni hai!"
    ]
  },
  {
    name: "Vikram Jadhav | Nashik",
    sentences: [
      "Ireland walon ko lagta hai T20 means 'Take 20 Years' to finish the match!"
    ]
  },
  {
    name: "Pooja Sharma | Dehradun",
    sentences: [
      "Mera chota bhai bol raha hai 'Didi, yeh log professional players hain ya YouTube streamers?'"
    ]
  },
  {
    name: "Akash Verma | Ranchi",
    sentences: [
      "Yeh @Junaidkhan India ko troll kar raha hai... bhai pehle apni team toh jeetwa le! 😂"
    ]
  },
  {
    name: "Sunil Kumar | Indore",
    sentences: [
      "Pakistan waale zyada se zyada 4-6 maar rahe hain... jaise unki shaadi fixed hai aur yeh dowry le rahe hain!"
    ]
  },
  {
    name: "Radha Iyer | Coimbatore",
    sentences: [
      "Yeh match aisa chal raha hai jaise do bache park mein khel rahe hain aur unke parents unko encourage kar rahe hain!"
    ]
  },
  {
    name: "Manoj Patel | Surat",
    sentences: [
      "@MAli burger king ki baat kar raha hai... bhai tu burger kha, cricket hum dekh lenge!"
    ]
  },
  {
    name: "Kavita Singh | Allahabad",
    sentences: [
      "Yeh live chat dekh kar lagta hai logon ko commentary se zyada aapas mein ladna pasand hai! 💬"
    ]
  },
  {
    name: "Rahul Nair | Thiruvananthapuram",
    sentences: [
      "Pakistan team ki planning aisi hai jaise sabne pehli baar cricket dekha hai!"
    ]
  },
  {
    name: "Ankit Rajput | Bhopal",
    sentences: [
      "Yeh @AshfaqKhan har over ke baad 'good' bol raha hai... bhai tu konsa match dekh raha hai?"
    ]
  },
  {
    name: "Suman Devi | Patiala",
    sentences: [
      "Meri saheli ne pucha 'Kya ho raha hai?' Maine kaha 'Pata nahi, par comments bahut interesting hain!'"
    ]
  },
  {
    name: "Raju K | Hyderabad",
    sentences: [
      "Ireland team aisi fielding kar rahi jaise unhe ball se allergy hai!"
    ]
  },
  {
    name: "Priyanka M | Bangalore",
    sentences: [
      "Babar Azam ki batting dekh kar lagta hai usne kal raat Netflix pe cricket documentaries dekhi hain! 📺"
    ]
  },
  {
    name: "Sanjay G | Mumbai",
    sentences: [
      "Yeh match aisa hai jaise do dost friendly match khel rahe hain aur unki families side mein argue kar rahi hain!"
    ]
  },
  {
    name: "Anjali K | Chennai",
    sentences: [
      "Pakistan waale 'Pakistan Zindabad' bol rahe hain... bhai pehle team ko zinda to karoo! 💪"
    ]
  },
  {
    name: "Rohan S | Kolkata",
    sentences: [
      "Yeh @QariMasoodAhmed har comment mein free fire ki ID de raha hai... bhai tujhe koi tournament jeetna hai kya?"
    ]
  },
  {
    name: "Pinky R | Lucknow",
    sentences: [
      "Mera boyfriend Pakistan team ki tarah overconfident hai - sochta hai bohot accha hai, par reality alag hai! 😅"
    ]
  },
  {
    name: "Vikas M | Delhi",
    sentences: [
      "Ireland ki bowling dekh kar lagta hai sabne YouTube se bowling tips liye hain!"
    ]
  },
  {
    name: "Neha S | Pune",
    sentences: [
      "Yeh match dekh kar pata chala ki cricket mein bhi 'participation certificates' hote hain!"
    ]
  },
  {
    name: "Raj B | Jaipur",
    sentences: [
      "Pakistan team aisi khel rahi jaise unhe pata hai match fixed hai!"
    ]
  },
  {
    name: "Sunita M | Nagpur",
    sentences: [
      "Mere husband bol rahe hain 'Ye match rukwo, main chai bana ke aata hoon'... maine kaha 'Jaao, match toh khatam hone wala nahi hai!' ☕"
    ]
  },
  {
    name: "Karan P | Chandigarh",
    sentences: [
      "Yeh @drkhalid7549 itne flags bhej raha hai jaise usne WhatsApp forward factory kholi hui hai! 🇵🇰"
    ]
  },
  {
    name: "Anjali R | Bangalore",
    sentences: [
      "Babar Azam ki form dekh kar lagta hai usne kal hi cricket seekhna shuru kiya hai!"
    ]
  },
  {
    name: "Rohan K | Mumbai",
    sentences: [
      "Ireland waalon ko lagta hai cricket means 'Take Your Time'!"
    ]
  },
  {
    name: "Priya S | Chennai",
    sentences: [
      "Yeh match aisa hai jaise do bache khel rahe hain aur unke parents unko cheer kar rahe hain!"
    ]
  },
  {
    name: "Raj M | Kolkata",
    sentences: [
      "Pakistan waale 'Inshallah' bol bol kar khel rahe hain... Allah bhi soch raha hoga 'Main kya karoon?'"
    ]
  },
  {
    name: "Neha P | Hyderabad",
    sentences: [
      "Meri friend ne pucha 'Kya ho raha hai?' Maine kaha 'Pata nahi, par comments bahut interesting hain!'"
    ]
  },
  {
    name: "Sunil R | Delhi",
    sentences: [
      "Yeh @Junaidkhan India ko troll kar raha hai... bhai pehle apni team toh jeetwa le! 😂"
    ]
  },
  {
    name: "Anjali M | Pune",
    sentences: [
      "Pakistan ki batting dekh kar lagta hai sabne naye naye bats liye hain - abhi practice karni hai!"
    ]
  },
  {
    name: "Rohan P | Bangalore",
    sentences: [
      "Ireland walon ko lagta hai T20 means 'Take 20 Years' to finish the match!"
    ]
  },
  {
    name: "Priya K | Mumbai",
    sentences: [
      "Mera chota bhai bol raha hai 'Didi, yeh log professional players hain ya YouTube streamers?'"
    ]
  },
  {
    name: "Raj S | Chennai",
    sentences: [
      "Yeh @ahmadkhan55555v bol raha hai 'India father of Pakistan'... bhai cricket match hai, history class nahi! 📚"
    ]
  },
  {
    name: "Neha R | Kolkata",
    sentences: [
      "Pakistan waale zyada se zyada 4-6 maar rahe hain... jaise unki shaadi fixed hai aur yeh dowry le rahe hain!"
    ]
  },
  {
    name: "Rinku Kumar | Patna",
    sentences: [
      "Yeh match dekh kar lagta hai dono teams ne kal hi cricket sikha hai!"
    ]
  },
  {
    name: "Asif Bhai | Mumbai",
    sentences: [
      "Yeh match dekh kar lagta hai dono teams ko coach ki nahi, stand-up comedian ki zarurat hai! 🎤"
    ]
  },
  {
    name: "Raju Chacha | Delhi",
    sentences: [
      "Pakistan team aisi khel rahi jaise unhe pata hai match ke baad biryani party hai! 🍛"
    ]
  },
  {
    name: "Priya Bhabhi | Kolkata",
    sentences: [
      "Mere pati bol rahe hain 'Channel badal do'... main bol rahi hoon 'Par yeh toh reality show se bhi funny hai!'"
    ]
  },
  {
    name: "Tony Mama | Chennai",
    sentences: [
      "Yeh @AshfaqKhan har over ke baad 'good' bol raha hai... bhai tu konsa match dekh raha hai?"
    ]
  },
  {
    name: "Chintu Chacha | Bangalore",
    sentences: [
      "Ireland team dekh ke lagta hai jaise foreign tourists cricket try kar rahe hain!"
    ]
  },
  {
    name: "Babloo Da | Darbhanga",
    sentences: [
      "Yeh match khatam hote hi log doosra match dhundhne lage hain... jaise inko cricket se pyar ho gaya hai! ❤️"
    ]
  }
];

// Auto-post function
const createAutoPost = async () => {
  try {
    // Pick random creator
    const randomCreator = creators[Math.floor(Math.random() * creators.length)];
    const randomSentence = randomCreator.sentences[0];
    
    // Create post in Supabase
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          username: randomCreator.name,
          problem: randomSentence,
          category: 'Cricket'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    console.log('🤖 Auto-post created by:', randomCreator.name);
    return true;
    
  } catch (error) {
    console.error('Auto-post error:', error);
    return false;
  }
};

// Start auto-posting
const startAutoPosting = () => {
  console.log('🤖 Auto-poster started with 50+ cricket jokes!');
  
  // Create first post immediately
  createAutoPost();
  
  // Then post every 2-5 minutes randomly
  const interval = setInterval(() => {
    const randomTime = Math.floor(Math.random() * (300000 - 120000)) + 120000; // 2-5 minutes
    setTimeout(createAutoPost, randomTime);
  }, 60000); // Check every minute
  
  return interval;
};

// Stop auto-posting
const stopAutoPosting = (intervalId) => {
  clearInterval(intervalId);
  console.log('🤖 Auto-poster stopped!');
};

export { startAutoPosting, stopAutoPosting, createAutoPost };
