import { TextBook } from '../types';

export const WB_TEXTBOOKS: TextBook[] = [
  // ================= CLASS 1 =================
  {
    id: 'wb-c1-sahaj-path-1',
    classId: 1,
    title: 'Sahaj Path (Prothom Bhag)',
    titleBn: 'সহজ পাঠ (প্রথম ভাগ)',
    subject: 'Bengali First Language',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ (রবীন্দ্রনাথ ঠাকুর)',
    edition: 'Official Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-500 to-orange-600',
    description: 'Foundational Bengali literature reader composed by Rabindranath Tagore with rhythmic rhymes, phonetics, and short stories.',
    descriptionBn: 'রবীন্দ্রনাথ ঠাকুর রচিত প্রথম শ্রেণির বাংলা পাঠ্যবই। ছোট ছোট ছড়া, স্বরবর্ণ, ব্যঞ্জনবর্ণ ও ভাষার প্রথম পাঠ।',
    totalChapters: 8,
    totalPages: 48,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Borno Porichoy (Shoroborno o Byanjonborno)', titleBn: 'বর্ণ পরিচয় ও ছড়া (অ আ ক খ)' },
      { chapterNo: 2, title: 'Chhoto Khoka Bole O', titleBn: 'ছোটো খোকা বলে অ, শেখেনি সে কথা কও' },
      { chapterNo: 3, title: 'Bade Bone Thake Bagh', titleBn: 'বাদাবনে থাকে বাঘ, গাছে থাকে পাখি' },
      { chapterNo: 4, title: 'Haat (Kharbayer Haat)', titleBn: 'কুমোরপাড়ার গোরুর গাড়ি বোঝাই করা কলসি হাঁড়ি' },
      { chapterNo: 5, title: 'Alo Hoye Gelo', titleBn: 'আলো হয় গেল, সকাল হল' },
      { chapterNo: 6, title: 'Chhutir Dine', titleBn: 'মেঘের কোলে রোদ হেসেছে বাদল গেছে টুটি' },
      { chapterNo: 7, title: 'Anjana Nodi', titleBn: 'অঞ্জনা নদীতীরে চন্দনী গাঁয়ে' },
      { chapterNo: 8, title: 'Bikel Bela', titleBn: 'বিকেলের খেলা ও গল্প পাঠ' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'সহজ পাঠ - প্রথম পাঠ',
        content: `# সহজ পাঠ (প্রথম ভাগ)
### লেখক: রবীন্দ্রনাথ ঠাকুর
#### পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ অনুমোদিত

**প্রথম পাঠ - ছড়া ও শব্দ:**
> ছোটো খোকা বলে অ,
> শেখেনি সে কথা কও।
> 
> ই ঈ বসে খায় ক্ষীর খই,
> উ ঊ ডাক ছাড়ে ঘেউ ঘেউ।
> 
> ঋ বসে করে ধ্যান,
> এ ঐ হাঁক দেয় দে রে মান।
> ও ঔ দুই ভাই মিলে যায় পাঠশালে।

*শব্দার্থ ও অনুশীলন:*
- **ক্ষীর**: ঘন দুধ দিয়ে তৈরি মিষ্টি খাবার।
- **পাঠশালা**: বিদ্যালয় বা পড়ার জায়গা।`
      },
      {
        pageNo: 2,
        title: 'সহজ পাঠ - হাট',
        content: `### হাট - রবীন্দ্রনাথ ঠাকুর
> কুমোরপাড়ার গোরুর গাড়ি
> বোঝাই করা কলসি হাঁড়ি।
> গাড়ি চালায় বংশীবদন,
> সঙ্গে যে যায় ভাগনে মদন।
> হাট বসেছে শুক্রবারে
> বকশিবাজারে পদ্মা নদীর ধারে।

**শিক্ষণীয় বিষয়:**
- গ্রামীণ হাট ও জীবনের দৃশ্য
- ছন্দমিল যুক্ত শব্দ: গাড়ি-হাঁড়ি, বংশীবদন-মদন`
      }
    ]
  },
  {
    id: 'wb-c1-amar-boi-1',
    classId: 1,
    title: 'Amar Boi (Part 1, 2, 3)',
    titleBn: 'আমার বই (১ম, ২য় ও ৩য় পর্ব)',
    subject: 'Integrated (Bengali, English, Math)',
    subjectBn: 'সমন্বিত পাঠ (বাংলা, ইংরেজি, গণিত ও পরিবেশ)',
    category: 'general',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-blue-500 to-indigo-600',
    description: 'Activity-based integrated textbook covering basic arithmetic, English alphabet recognition, environmental awareness, and sketching.',
    descriptionBn: 'প্রথম শ্রেণির শিশুদের জন্য সমন্বিত বই। গণনা, সহজ ইংরেজি বর্ণমালা এবং চিত্রাঙ্কন সমন্বিত পাঠ।',
    totalChapters: 6,
    totalPages: 72,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Let us Look at the Pictures', titleBn: 'ছবি দেখি ও বলি' },
      { chapterNo: 2, title: 'Counting Numbers (1 to 20)', titleBn: 'এক থেকে কুড়ি পর্যন্ত গণনা ও দাগ টানা' },
      { chapterNo: 3, title: 'English Alphabet Fun (A to Z)', titleBn: 'ইংরেজি বর্ণমালা ও সহজ শব্দ' },
      { chapterNo: 4, title: 'Shapes, Colors and Nature', titleBn: 'আকার, রঙ ও আমাদের চারপাশ' },
      { chapterNo: 5, title: 'Simple Additions and Subtractions', titleBn: 'যোগ ও বিয়োগের প্রথম সিঁড়ি' },
      { chapterNo: 6, title: 'Health, Cleanliness & Songs', titleBn: 'পরিচ্ছন্নতা, স্বাস্থ্য ও ছোটদের গান' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'আমার বই - গণনা ও সংখ্যা',
        content: `# আমার বই (১ম শ্রেণি)
### ১ থেকে ১০ সংখ্যা চেনা ও লেখা

- ১ (এক) - একটি সূর্য
- ২ (দুই) - দুটি চোখ
- ৩ (তিন) - রিকশার তিন চাকা
- ৪ (চার) - গরুর চারটি পা
- ৫ (পাঁচ) - হাতের পাঁচটি আঙুল

*গণিত অনুশীলন:*
১ + ১ = ২
২ + ১ = ৩
৩ + ২ = ৫`
      }
    ]
  },

  // ================= CLASS 2 =================
  {
    id: 'wb-c2-sahaj-path-2',
    classId: 2,
    title: 'Sahaj Path (Ditiyo Bhag)',
    titleBn: 'সহজ পাঠ (দ্বিতীয় ভাগ)',
    subject: 'Bengali First Language',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ (রবীন্দ্রনাথ ঠাকুর)',
    edition: 'Official Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-600 to-rose-600',
    description: 'Rabindranath Tagore’s classic literary reader for Class 2 students with prose passages, joined letters (Juktakhshor), and nature stories.',
    descriptionBn: 'যুক্তাক্ষর, বাক্য গঠন, সহজ গদ্য ও পদ্যের মাধ্যমে ভাষা শিক্ষার ঐতিহ্যবাহী বই।',
    totalChapters: 8,
    totalPages: 60,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Borno Jukto Path (Stuti o Shokal)', titleBn: 'যুক্তবর্ণের পাঠ ও সকালের দৃশ্য' },
      { chapterNo: 2, title: 'Borgo Borgo Byanjon', titleBn: 'উষার দুয়ার খুলল কে?' },
      { chapterNo: 3, title: 'Shasti o Upohar', titleBn: 'আজ মঙ্গলবার, পাড়ার জঙ্গল সাফ করবার দিন' },
      { chapterNo: 4, title: 'Chhutir Deshe', titleBn: 'আমাদের ছোট নদী চলে বাঁকে বাঁকে' },
      { chapterNo: 5, title: 'Srotoshwini Kotha', titleBn: 'মেঘের কোলে রোদ ভেসেছে' },
      { chapterNo: 6, title: 'Rathjatra Kotha', titleBn: 'রথের মেলা ও শান্তিনিকেতন' },
      { chapterNo: 7, title: 'Bishonno Dupur', titleBn: 'বৃষ্টি পড়ে টাপুর টুপুর' },
      { chapterNo: 8, title: 'Proshnottor', titleBn: 'পাঠ প্রতিক্রিয়া ও ব্যাকরণ' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'আমাদের ছোট নদী',
        content: `# আমাদের ছোট নদী
### রবীন্দ্রনাথ ঠাকুর

> আমাদের ছোট নদী চলে বাঁকে বাঁকে,
> বৈশাখ মাসে তার হাঁটু জল থাকে।
> পার হয়ে যায় গোরু, পার হয় গাড়ি,
> দুই ধার উঁচু তার, ঢালু তার পাড়ি।
> 
> চিকচিক করে বালি, কোথা নাই কাদা,
> একধারে কাশবন ফুলে ফুলে সাদা।
> কিচিমিচি করে সেথা শালিকের ঝাঁক,
> রাতে ওঠে থেকে থেকে শেয়ালের হাঁক।

**শব্দার্থ ও মূলভাব:**
- বৈশাখ মাসে নদীর রূপ শান্ত ও জল হাঁটু সমান থাকে।
- কাশফুলের বর্ণনায় শরৎকালের রূপ ফুটিয়ে তোলা হয়েছে।`
      }
    ]
  },
  {
    id: 'wb-c2-amar-boi-2',
    classId: 2,
    title: 'Amar Boi (Class 2)',
    titleBn: 'আমার বই (দ্বিতীয় শ্রেণি)',
    subject: 'Integrated Learning',
    subjectBn: 'সমন্বিত পাঠ ও গণিত',
    category: 'general',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-emerald-500 to-teal-700',
    description: 'Class 2 activity-driven textbook with two-digit additions, subtractions, multiplication tables, and English sight words.',
    descriptionBn: 'নামতা শিক্ষা, দ্বি-অঙ্কের যোগ-বিয়োগ, ছোট ইংরেজি বাক্য ও নীতিগল্প।',
    totalChapters: 6,
    totalPages: 80,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Word Fun & Rhymes', titleBn: 'শব্দের খেলা ও সুন্দর ছড়া' },
      { chapterNo: 2, title: 'Two-digit Numbers & Place Values', titleBn: 'দশকের ঘর ও স্থানীয় মান' },
      { chapterNo: 3, title: 'Multiplication Tables (2 to 10)', titleBn: 'নামতার সহজ ছড়া (২ থেকে ১০)' },
      { chapterNo: 4, title: 'English Sight Words and Sentences', titleBn: 'English Action Words & Objects' },
      { chapterNo: 5, title: 'Plants, Animals and Our Surroundings', titleBn: 'গাছপালা, পশু-পাখি ও পরিবেশ' },
      { chapterNo: 6, title: 'Time, Clock and Calendar', titleBn: 'ঘড়ি দেখা ও দিনের হিসাব' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'নামতার সহজ ছড়া',
        content: `# গুণের ধারণা ও নামতা
### ২ ও ৩ এর ঘরের নামতা

- ২ × ১ = ২
- ২ × ২ = ৪
- ২ × ৩ = ৬
- ২ × ৪ = ৮
- ২ × ৫ = ১০
- ২ × ১০ = ২০

*নিয়ম:* বারবার যোগ করার সহজ রূপ হল গুণ!`
      }
    ]
  },

  // ================= CLASS 3 =================
  {
    id: 'wb-c3-patabahar',
    classId: 3,
    title: 'Patabahar (Class 3)',
    titleBn: 'পাতাবাহার (৩য় শ্রেণি)',
    subject: 'Bengali First Language',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-green-600 to-emerald-700',
    description: 'Class 3 Bengali literature collection including stories of Sukumar Ray, Upendrakishore Roy Chowdhury, and Rabindranath Tagore.',
    descriptionBn: 'সুকুমার রায়, উপেন্দ্রকিশোর ও রবীন্দ্রনাথের সেরা গল্প, কবিতা ও শব্দভাণ্ডার।',
    totalChapters: 9,
    totalPages: 96,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Sachha Bondhu', titleBn: 'সত্যিকারের বন্ধু (গল্প)' },
      { chapterNo: 2, title: 'Suktara', titleBn: 'শুকতারা ও সুখ (কবিতা)' },
      { chapterNo: 3, title: 'Maju Majhi', titleBn: 'মাঝি (রবীন্দ্রনাথ ঠাকুর)' },
      { chapterNo: 4, title: 'Puntipukur', titleBn: 'পুঁটিপুকুর ও মাছের গল্প' },
      { chapterNo: 5, title: 'Kathbiralir Kotha', titleBn: 'কাঠবিড়ালি ও পাখির বাসা' },
      { chapterNo: 6, title: 'Boipora', titleBn: 'বই পড়ার আনন্দ' },
      { chapterNo: 7, title: 'Chhotoder Ramayan', titleBn: 'ছোটদের রামায়ণের রূপকথা' },
      { chapterNo: 8, title: 'Pakhi Sab Kore Rob', titleBn: 'পাখী সব করে রব (মদনমোহন তর্কালঙ্কার)' },
      { chapterNo: 9, title: 'Bhasha Poriksha', titleBn: 'ব্যাকরণ ও নির্মিতি পাঠ' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'পাখী সব করে রব',
        content: `# পাখী সব করে রব
### মদনমোহন তর্কালঙ্কার

> পাখী সব করে রব রাতি পোহাইল,
> কাননে কুসুমকলি সকলি ফুটিল।
> রাখাল গরুর পাল লয়ে যায় মাঠে,
> শিশুগণ দেয় মন নিজ নিজ পাঠে।
> 
> ফুটিল মালতী ফুল সৌরভ ছুটিল,
> পরিমল লোভে অলি আসিয়া জুটিল।
> গগনে উঠিল রবি লোহিত বরণ,
> আলোক পাইয়া লোক পুলকিত মন।

**প্রশ্নোত্তর:**
১. সকালে রাখাল কী নিয়ে মাঠে যায়?
*উত্তর:* রাখাল গরুর পাল নিয়ে মাঠে যায়।
২. সকালে শিশুরা কী করে?
*উত্তর:* শিশুরা মন দিয়ে নিজেদের পড়াশোনা করে।`
      }
    ]
  },
  {
    id: 'wb-c3-butterfly',
    classId: 3,
    title: 'Butterfly (Class 3)',
    titleBn: 'বাটারফ্লাই (ইংরেজি - ৩য় শ্রেণি)',
    subject: 'English Second Language',
    subjectBn: 'ইংরেজি দ্বিতীয় ভাষা',
    category: 'language',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-sky-500 to-indigo-600',
    description: 'Official WBBPE English textbook designed to build vocabulary, phonetic awareness, and simple conversational English.',
    descriptionBn: 'ইংরেজি ব্যাকরণ, কথোপকথন, ছোট ছোট গল্প ও ছন্দমিলযুক্ত কবিতা।',
    totalChapters: 8,
    totalPages: 88,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'My Friends (Animals and Birds)', titleBn: 'My Friends (গৃহপালিত পশু-পাখি)' },
      { chapterNo: 2, title: 'Animal Homes and Babies', titleBn: 'পশুদের বাসস্থান ও তাদের ছানা' },
      { chapterNo: 3, title: 'The Grasshopper and the Ant', titleBn: 'The Grasshopper and the Ant' },
      { chapterNo: 4, title: 'Know Your Surroundings', titleBn: 'Know Your Surroundings' },
      { chapterNo: 5, title: 'Water: The Gift of Nature', titleBn: 'Water: The Gift of Nature' },
      { chapterNo: 6, title: 'The Blue Kite', titleBn: 'The Blue Kite (Story)' },
      { chapterNo: 7, title: 'Our Helpers and Community', titleBn: 'Our Community Helpers' },
      { chapterNo: 8, title: 'English Grammar Basics', titleBn: 'Nouns, Verbs & Pronouns' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'The Grasshopper and the Ant',
        content: `# The Grasshopper and the Ant
### Lesson 3 Summary

In a warm summer field, a grasshopper was hopping about, chirping and singing to its heart's content. An ant passed by, bearing along with great effort an ear of corn he was taking to the nest.

"Why not come and chat with me," said the grasshopper, "instead of toiling and moiling in that way?"
"I am helping to lay up food for the winter," said the ant, "and recommend you to do the same."

**Moral Lesson:** Work hard today to enjoy the fruit of your labor tomorrow!`
      }
    ]
  },
  {
    id: 'wb-c3-amar-ganit',
    classId: 3,
    title: 'Amar Ganit (Class 3)',
    titleBn: 'আমার গণিত (৩য় শ্রেণি)',
    subject: 'Mathematics',
    subjectBn: 'গণিত',
    category: 'mathematics',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-500 to-yellow-600',
    description: 'Three-digit additions, subtractions, multiplications, divisions, word problems, and geometric shapes.',
    descriptionBn: 'তিন অঙ্কের সংখ্যার যোগ, বিয়োগ, গুণ, ভাগ ও জ্যামিতিক চিত্র পরিচয়।',
    totalChapters: 8,
    totalPages: 104,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Three-digit Numbers & Place Value', titleBn: 'শতকের ঘর ও স্থানীয় মান নির্ণয়' },
      { chapterNo: 2, title: 'Addition and Subtraction of 3 digits', titleBn: 'তিন অঙ্কের সংখ্যার যোগ ও বিয়োগ' },
      { chapterNo: 3, title: 'Multiplication by 2-digit numbers', titleBn: 'গুণ করার সহজ কৌশল' },
      { chapterNo: 4, title: 'Introduction to Division', titleBn: 'ভাগের প্রাথমিক ধারণা ও ভাগশেষ' },
      { chapterNo: 5, title: 'Time, Clock & Calendar', titleBn: 'ঘণ্টা, মিনিট ও ক্যালেন্ডার' },
      { chapterNo: 6, title: 'Money: Rupees and Paise', titleBn: 'টাকা ও পয়সার হিসাব' },
      { chapterNo: 7, title: 'Length, Weight & Capacity', titleBn: 'মিটার, কিলোগ্রাম ও লিটারের ধারণা' },
      { chapterNo: 8, title: 'Basic 2D Shapes', titleBn: 'ত্রিভুজ, চতুর্ভুজ ও বৃত্তের বৈশিষ্ট্য' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'স্থানীয় মানের সাহায্যে বিস্তার',
        content: `# শতক, দশক ও এককের ধারণা
### তিন অঙ্কের সংখ্যার রূপ

ধরা যাক সংখ্যাটি **৪৫৬**:
- ৪ এর স্থানীয় মান = ৪ × ১০০ = ৪০০
- ৫ এর স্থানীয় মান = ৫ × ১০ = ৫০
- ৬ এর স্থানীয় মান = ৬ × ১ = ৬

সুতরাং, **৪৫৬ = ৪০০ + ৫০ + ৬**`
      }
    ]
  },
  {
    id: 'wb-c3-amader-paribesh',
    classId: 3,
    title: 'Amader Paribesh (Class 3)',
    titleBn: 'আমাদের পরিবেশ (৩য় শ্রেণি)',
    subject: 'Environmental Studies',
    subjectBn: 'আমাদের পরিবেশ ও বিজ্ঞান',
    category: 'science',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-teal-600 to-cyan-700',
    description: 'Human body, five senses, food nutrition, housing, family roles, and natural surroundings.',
    descriptionBn: 'মানবদেহ, পঞ্চেন্দ্রিয়, পুষ্টিকর খাদ্য, জীববৈচিত্র্য ও আমাদের পরিবার।',
    totalChapters: 6,
    totalPages: 76,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Body Parts & Senses', titleBn: 'আমাদের শরীর ও ইন্দ্রিয়' },
      { chapterNo: 2, title: 'Food & Nutrition', titleBn: 'খাবার ও সুষম আহার' },
      { chapterNo: 3, title: 'House & Shelter', titleBn: 'ঘরবাড়ি ও পোশাক পরিচ্ছদ' },
      { chapterNo: 4, title: 'Living and Non-living things', titleBn: 'জীব ও জড় জগৎ' },
      { chapterNo: 5, title: 'Water and Air around us', titleBn: 'জল ও বাতাস' },
      { chapterNo: 6, title: 'Safety and First Aid', titleBn: 'নিরাপত্তা ও প্রাথমিক চিকিৎসা' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'আমাদের পাঁচটি ইন্দ্রিয়',
        content: `# পঞ্চেন্দ্রিয় ও তাদের কাজ
১. **চোখ**: দেখা বা দৃষ্টির কাজ করে।
২. **কান**: শোনা বা শ্রবণের কাজ করে।
৩. **নাক**: গন্ধ বা ঘ্রাণের কাজ করে।
৪. **জিভ**: স্বাদ গ্রহণের কাজ করে।
৫. **ত্বক বা চামড়া**: স্পর্শ অনুভব করতে সাহায্য করে।`
      }
    ]
  },

  // ================= CLASS 4 =================
  {
    id: 'wb-c4-patabahar',
    classId: 4,
    title: 'Patabahar (Class 4)',
    titleBn: 'পাতাবাহার (৪র্থ শ্রেণি)',
    subject: 'Bengali First Language',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-green-600 to-lime-700',
    description: 'Classic stories like Dhononjoyer Noukojatra, Bonobhojon, and poems of Sunirmal Basu and Kazi Nazrul Islam.',
    descriptionBn: 'সুনির্মল বসু, কাজী নজরুল ও শীর্ষেন্দু মুখোপাধ্যায়ের ছোটদের গল্প ও কবিতা।',
    totalChapters: 10,
    totalPages: 110,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Sobar Ami Chhatro', titleBn: 'সবার আমি ছাত্র (সুনির্মল বসু)' },
      { chapterNo: 2, title: 'Norohori Das', titleBn: 'নরহরি দাস (উপেন্দ্রকিশোর রায়চৌধুরী)' },
      { chapterNo: 3, title: 'Bonbhojon', titleBn: 'বনভোজন (গোলাম মোস্তফা)' },
      { chapterNo: 4, title: 'Totto Chaner Adventure', titleBn: 'তোত্তোচানের অ্যাডভেঞ্চার' },
      { chapterNo: 5, title: 'Moglir Kotha', titleBn: 'মোগলির গল্প' },
      { chapterNo: 6, title: 'Chander Deshe', titleBn: 'চাঁদের দেশের রূপকথা' },
      { chapterNo: 7, title: 'Swadhinota Songram', titleBn: 'স্বাধীনতা আন্দোলনের বীরগাঁথা' },
      { chapterNo: 8, title: 'Pothohara', titleBn: 'পথহারা নাবিক' },
      { chapterNo: 9, title: 'Bhasha Path - Byakoron', titleBn: 'ভাষা পাঠ: বিশেষ্য, বিশেষণ ও ক্রিয়াপদ' },
      { chapterNo: 10, title: 'Rochona o Chithi', titleBn: 'অনুচ্ছেদ রচনা ও ছুটির আবেদন' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'সবার আমি ছাত্র - সুনির্মল বসু',
        content: `# সবার আমি ছাত্র
### সুনির্মল বসু

> আকাশ আমায় শিক্ষা দিল
> উদার হতে ভাই রে,
> কর্মী হবার মন্ত্র আমি
> বায়ুর কাছে পাই রে।
> 
> পাহাড় শিখায় তাহার সমান
> হই যেন ভাই মৌন-মহান,
> খোলা মাঠের উপদেশে
> দিল-খোলা হই তাই রে।

**শিক্ষণীয় নীতি:**
প্রকৃতির প্রতিটি উপাদান যেমন আকাশ, বাতাস, পাহাড় ও নদী আমাদের জীবনের শ্রেষ্ঠ শিক্ষক।`
      }
    ]
  },
  {
    id: 'wb-c4-amar-ganit',
    classId: 4,
    title: 'Amar Ganit (Class 4)',
    titleBn: 'আমার গণিত (৪র্থ শ্রেণি)',
    subject: 'Mathematics',
    subjectBn: 'গণিত',
    category: 'mathematics',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-600 to-orange-700',
    description: 'Four-digit numbers, long divisions, basic fractions (ভগ্নাংশ), perimeter, and unit conversions.',
    descriptionBn: 'চার অঙ্কের সংখ্যা, ভগ্নাংশের ধারণা, দীর্ঘ ভাগ প্রক্রিয়া ও জ্যামিতিক পরিসীমা।',
    totalChapters: 8,
    totalPages: 120,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Four Digit Numbers and Comparisons', titleBn: 'চার অঙ্কের সংখ্যার তুলনা ও বিস্তার' },
      { chapterNo: 2, title: 'Complex Additions and Subtractions', titleBn: 'হাতে রেখে যোগ ও বিয়োগের হিসাব' },
      { chapterNo: 3, title: 'Long Division & Remainder Formula', titleBn: 'ভাজ্য = (ভাজক × ভাগফল) + ভাগশেষ' },
      { chapterNo: 4, title: 'Concept of Fractions', titleBn: 'ভগ্নাংশের ধারণা: লব ও হর' },
      { chapterNo: 5, title: 'Measurement of Weight and Capacity', titleBn: 'কিলোগ্রাম, গ্রাম ও মিলিমিটারের অংক' },
      { chapterNo: 6, title: 'Time Calculation & Leap Year', titleBn: 'দিন, মাস, বছর ও লিপ ইয়ার' },
      { chapterNo: 7, title: 'Geometry: Lines, Angles & Perimeter', titleBn: 'রেখাংশ, কোণ ও পরিসীমা নির্ণয়' },
      { chapterNo: 8, title: 'Pattern and Mental Math', titleBn: 'মানসাঙ্ক ও প্যাটার্নের খেলা' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'ভগ্নাংশের ধারণা',
        content: `# ভগ্নাংশ কী?
কোনো সম্পূর্ণ বস্তুকে সমান কয়েকভাগে ভাগ করে তার কিছু অংশ নিলে তাকে ভগ্নাংশ বলে।

**ভগ্নাংশের অংশ:**
- উপরে থাকে: **লব (Numerator)**
- নিচে থাকে: **হর (Denominator)**

উদাহরণ: একটি রুটিকে সমান ৪ ভাগে ভাগ করে ৩ ভাগ খেলে আমরা পাই **৩/৪ অংশ**।`
      }
    ]
  },

  // ================= CLASS 5 =================
  {
    id: 'wb-c5-patabahar',
    classId: 5,
    title: 'Patabahar (Class 5)',
    titleBn: 'পাতাবাহার (৫ম শ্রেণি)',
    subject: 'Bengali Literature',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-emerald-700 to-teal-800',
    description: 'Class 5 Bengali literature collection containing Golpo Buro, Buno Hansh, Darjeeling Bhromon, and grammar rules.',
    descriptionBn: 'গল্পবুড়ো, বুনো হাঁস, পাহাড়িয়া বর্ষার সুর ও দার্জিলিং ভ্রমণ।',
    totalChapters: 10,
    totalPages: 125,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Golpo Buro', titleBn: 'গল্পবুড়ো (সুনির্মল বসু)' },
      { chapterNo: 2, title: 'Buno Hansh', titleBn: 'বুনো হাঁস (লীলা মজুমদার)' },
      { chapterNo: 3, title: 'Daroga Babu Ebong Bhola Babu', titleBn: 'দারোগাবাবু এবং ভোলাবাবু' },
      { chapterNo: 4, title: 'Pahariya Borshar Sur', titleBn: 'পাহাড়িয়া বর্ষার সুর' },
      { chapterNo: 5, title: 'Majar Desh', titleBn: 'মজার দেশ (যোগীন্দ্রনাথ সরকার)' },
      { chapterNo: 6, title: 'Bimolir Abhiman', titleBn: 'বিমলার অভিমান (নবকৃষ্ণ ভট্টাচার্য)' },
      { chapterNo: 7, title: 'Chhelebela', titleBn: 'ছেলেবেলা (রবীন্দ্রনাথ ঠাকুর)' },
      { chapterNo: 8, title: 'Shonpapadier Dokan', titleBn: 'সোনপাপড়ির দোকান ও মেলা' },
      { chapterNo: 9, title: 'Bhasha Path 5', titleBn: 'ভাষা পাঠ: ধ্বনি, বর্ণ, লিঙ্গ ও বচন' },
      { chapterNo: 10, title: 'Patro Rochona', titleBn: 'পত্র রচনা ও ভাবসম্প্রসারণ' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'গল্পবুড়ো - সুনির্মল বসু',
        content: `# গল্পবুড়ো
### সুনির্মল বসু

> বইছে হাওয়া উত্তুরে,
> গল্পবুড়ো থুরথুরে
> চলছে হেঁটে পথ ধরে
> শীতের ভোরে ডাক ছেড়ে।
> 
> বলছে ডেকে চেঁচিয়ে সে—
> রূপকথা চাই রূপকথা?
> গুটিসুটি শীতের ভোরে
> কে শুনবি আয় রূপকথা!
> কাঁধের ওপর ঝোলাটাতে
> মন-মাতানো গল্প আছে।

**প্রশ্নোত্তর:**
- গল্পবুড়োর কাঁধের ঝোলায় কী আছে?
*উত্তর:* গল্পবুড়োর কাঁধের ঝোলায় দত্যি-দানব, যক্ষিরাজ, রাজপুত্তুর আর পক্ষীরাজের মন-মাতানো সব রূপকথার গল্প আছে।`
      }
    ]
  },
  {
    id: 'wb-c5-amar-ganit',
    classId: 5,
    title: 'Amar Ganit (Class 5)',
    titleBn: 'আমার গণিত (৫ম শ্রেণি)',
    subject: 'Mathematics',
    subjectBn: 'গণিত',
    category: 'mathematics',
    board: 'WBBPE',
    publisher: 'West Bengal Board of Primary Education',
    publisherBn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-600 to-orange-700',
    description: 'HCF & LCM (গসাগু ও লসাগু), decimal fractions, unitary method (ঐকিক নিয়ম), and geometric perimeter.',
    descriptionBn: 'গসাগু, লসাগু, দশমিক ভগ্নাংশ, ঐকিক নিয়ম, শতকরা ও ক্ষেত্রফল।',
    totalChapters: 9,
    totalPages: 140,
    officialPortalUrl: 'https://banglarsiksha.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Multiples and Factors (L.C.M & H.C.F)', titleBn: 'গুণনীয়ক, গুণিতক, গসাগু ও লসাগু' },
      { chapterNo: 2, title: 'Decimal Fractions and Addition/Subtraction', titleBn: 'দশমিক ভগ্নাংশের বিস্তার ও হিসাব' },
      { chapterNo: 3, title: 'Unitary Method (Oikik Niyom)', titleBn: 'ঐকিক নিয়মের সহজ সমস্যা' },
      { chapterNo: 4, title: 'Perimeter and Area of Rectangles/Squares', titleBn: 'আয়তক্ষেত্র ও বর্গক্ষেত্রের পরিসীমা' },
      { chapterNo: 5, title: 'Time, Train Journey and Seconds', titleBn: 'সময় ও দূরত্বের সম্পর্ক' },
      { chapterNo: 6, title: 'Percentages Introduction', titleBn: 'শতকরার প্রাথমিক ধারণা (%)' },
      { chapterNo: 7, title: 'Basic Geometry: Angles, Protractor', titleBn: 'কোণের শ্রেণিবিভাগ ও চাঁদার ব্যবহার' },
      { chapterNo: 8, title: 'Symmetry & Patterns', titleBn: 'প্রতিসাম্য ও জ্যামিতিক নকশা' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'ল.সা.গু ও গ.সা.গু এর সূত্র',
        content: `# গ.সা.গু ও ল.সা.গু এর নিয়ম
- **গ.সা.গু (H.C.F)**: গরিষ্ঠ সাধারণ গুণনীয়ক
- **ল.সা.গু (L.C.M)**: লঘিষ্ঠ সাধারণ গুণিতক

**গুরুত্বপূর্ণ স্বর্ণসূত্র:**
> দুটি সংখ্যার গুণফল = (সংখ্যা দুটির গ.সা.গু) × (সংখ্যা দুটির ল.সা.গু)

*উদাহরণ:*
দুটি সংখ্যার গসাগু ৫ এবং লসাগু ৩০। একটি সংখ্যা ১৫ হলে অন্য সংখ্যাটি কত?
অন্য সংখ্যা = (৫ × ৩০) ÷ ১৫ = ১০।`
      }
    ]
  },

  // ================= CLASS 6 =================
  {
    id: 'wb-c6-sahitya-mela',
    classId: 6,
    title: 'Sahitya Mela (Class 6)',
    titleBn: 'সাহিত্য মেলা (৬ষ্ঠ শ্রেণি)',
    subject: 'Bengali First Language',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE)',
    edition: 'New Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-blue-600 to-indigo-800',
    description: 'Official WBBSE Class 6 Bengali literature reader containing Bharot Tirtha, Fashor, Banchharam, and Senapati Shankar.',
    descriptionBn: 'ভরদুপুরে, সেনাপতি শংকর, পাইন দাঁড়িয়ে আকাশে নয়ন তুলি ও হাবুল মাস্টারের গল্প।',
    totalChapters: 12,
    totalPages: 135,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Bhor Dupure', titleBn: 'ভরদুপুরে (নীরেন্দ্রনাথ চক্রবর্তী)' },
      { chapterNo: 2, title: 'Senapati Shankar', titleBn: 'সেনাপতি শংকর (শ্যামল গঙ্গোপাধ্যায়)' },
      { chapterNo: 3, title: 'Pine Dariye Akashe Nayan Tuli', titleBn: 'পাইন দাঁড়িয়ে আকাশে নয়ন তুলি (হেনরিখ হাইনে)' },
      { chapterNo: 4, title: 'Mon Bhalo Kora', titleBn: 'মন-ভালো-করা (শক্তি চট্টোপাধ্যায়)' },
      { chapterNo: 5, title: 'Habul Master', titleBn: 'হাবুল মাস্টারের কথা' },
      { chapterNo: 6, title: 'Bhasha Charcha 6', titleBn: 'ভাষা চর্চা: সন্ধি, পদ পরিবর্তন ও প্রায় সমোচ্চারিত শব্দ' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'ভরদুপুরে - নীরেন্দ্রনাথ চক্রবর্তী',
        content: `# ভরদুপুরে
### কবি: নীরেন্দ্রনাথ চক্রবর্তী

> ওই যে অসথ গাছটি ওরে
> পথিক জনের ছাতা,
> তলায় ঘাসের গালচেখানি
> ছড়িয়ে রাখায় পাতা।
> 
> চড়ছে দূরে গোরু বাছুর,
> শুকনো খড়ের আঁটি
> নদীর ধারে একলা পড়ে
> খোলের ওপর মাটি।
> 
> কেউ কোথাও নেই, বাতাস ওড়ে
> মিহি সাদা ধুলো,
> ভরদুপুরে যে যার ঘরে
> ঘুমোচ্ছে লোকগুলো।

**কবিতার সারসংক্ষেপ:**
পল্লী বাংলার নিঝুম দুপুরের শান্ত রূপ ও প্রকৃতির নির্জনতার গভীর চিত্র ফুটে উঠেছে এই কবিতায়।`
      }
    ]
  },
  {
    id: 'wb-c6-ganit-prabha',
    classId: 6,
    title: 'Ganit Prabha (Class 6)',
    titleBn: 'গণিতপ্রভা (৬ষ্ঠ শ্রেণি)',
    subject: 'Mathematics',
    subjectBn: 'গণিত',
    category: 'mathematics',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-600 to-amber-800',
    description: 'Official WBBSE Class 6 Math textbook covering Algebra intro (বীজগণিত), BODMAS, fractions, ratios (অনুপাত), and geometry.',
    descriptionBn: 'সরলীকরণ, ভগ্নাংশের গুণ ও ভাগ, অনুপাত, প্রথম বীজগণিত এবং কোণ ও ত্রিভুজ।',
    totalChapters: 12,
    totalPages: 160,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Revision and BODMAS rule', titleBn: 'পূর্বপাঠের পুনরালোচনা ও বদমাস (BODMAS) নিয়ম' },
      { chapterNo: 2, title: 'Fractions and Decimals', titleBn: 'ভগ্নাংশ ও দশমিকের গুণ-ভাগ' },
      { chapterNo: 3, title: 'Introduction to Algebra (Variables)', titleBn: 'বীজগণিতের প্রাথমিক ধারণা: চলরাশি ও ধ্রুবক' },
      { chapterNo: 4, title: 'Ratio and Proportion', titleBn: 'অনুপাত ও সমানুপাত' },
      { chapterNo: 5, title: 'Prime Numbers and Divisibility', titleBn: 'মৌলিক সংখ্যা ও বিভাজ্যতার নিয়ম' },
      { chapterNo: 6, title: 'Geometry: Point, Ray, Line and Circle', titleBn: 'জ্যামিতি: রেখা, রশ্নি, কোণ ও বৃত্ত' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'BODMAS নিয়মের প্রয়োগ',
        content: `# বদমাস (BODMAS) নিয়ম
- **B** = Bracket (বন্ধনীর কাজ: প্রথম, দ্বিতীয়, তৃতীয়)
- **O** = Of (এর এর কাজ)
- **D** = Division (ভাগের কাজ)
- **M** = Multiplication (গুণের কাজ)
- **A** = Addition (যোগের কাজ)
- **S** = Subtraction (বিয়োগের কাজ)

**মনে রাখবে:** বন্ধনীর মধ্যে সবচেয়ে প্রথমে রেখা বন্ধনী (Bar), তারপর প্রথম বন্ধনী (), দ্বিতীয় বন্ধনী {}, এবং শেষে তৃতীয় বন্ধনী [] এর কাজ করতে হয়।`
      }
    ]
  },
  {
    id: 'wb-c6-paribesh-bigyan',
    classId: 6,
    title: 'Paribesh O Bigyan (Class 6)',
    titleBn: 'পরিবেশ ও বিজ্ঞান (৬ষ্ঠ শ্রেণি)',
    subject: 'General Science',
    subjectBn: 'পরিবেশ ও বিজ্ঞান',
    category: 'science',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-teal-600 to-emerald-800',
    description: 'Physical & life science fundamentals: matter, energy, machines, living diversity, skeletons, and ecosystems.',
    descriptionBn: 'পদার্থের অবস্থা, সরল যন্ত্র, মানবদেহ, কঙ্কালতন্ত্র, উদ্ভিদের বৃদ্ধি ও বাস্তুতন্ত্র।',
    totalChapters: 8,
    totalPages: 130,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Interdependence of Organisms', titleBn: 'পরিবেশের সজীব উপাদানের পারস্পরিক নির্ভরতা' },
      { chapterNo: 2, title: 'States of Matter and Physical/Chemical Changes', titleBn: 'পদার্থের ভৌত ও রাসায়নিক পরিবর্তন' },
      { chapterNo: 3, title: 'Basic Machines and Force', titleBn: 'মৌলিক বল, কার্য ও সরল যন্ত্র' },
      { chapterNo: 4, title: 'Measurement of Physical Quantities', titleBn: 'পরিমাপ ও একক (SI Unit)' },
      { chapterNo: 5, title: 'Human Body: Bones, Muscles and Heart', titleBn: 'মানুষের শরীর: অস্থিসন্ধি, পেশি ও রক্ত' },
      { chapterNo: 6, title: 'Waste Management and Pollution', titleBn: 'বর্জ্য পদার্থ ও পরিবেশ দূষণ নিয়ন্ত্রণ' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'ভৌত ও রাসায়নিক পরিবর্তন',
        content: `# ভৌত বনাম রাসায়নিক পরিবর্তন
### ১. ভৌত পরিবর্তন (Physical Change):
যে পরিবর্তনে পদার্থের মূল গঠন অপরিবর্তিত থাকে এবং কোনো নতুন পদার্থ তৈরি হয় না।
- যেমন: বরফ গলে জল হওয়া, লোহাকে চুম্বকে পরিণত করা।

### ২. রাসায়নিক পরিবর্তন (Chemical Change):
যে পরিবর্তনে এক বা একাধিক নতুন ধর্মবিশিষ্ট পদার্থ উৎপন্ন হয় এবং পরিবর্তনটি সহজে প্রত্যাবর্তনীয় নয়।
- যেমন: দুধে ছানা কেটে যাওয়া, লোহায় মরচে ধরা, কাগজ পোড়ানো।`
      }
    ]
  },

  // ================= CLASS 7 =================
  {
    id: 'wb-c7-sahitya-mela',
    classId: 7,
    title: 'Sahitya Mela (Class 7)',
    titleBn: 'সাহিত্য মেলা (৭ম শ্রেণি)',
    subject: 'Bengali First Language',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-blue-600 to-sky-800',
    description: 'Chhondo Hariyeche, Pagla Dashu, Kar Dour Koto Dur, and Leela Majumdar’s Maku (সহায়ক পাঠ).',
    descriptionBn: 'ছন্দ হারিয়ে গেছে, পাগলা দাশু, কার দৌড় কত দূর এবং লীলা মজুমদারের মাকু উপন্যাস।',
    totalChapters: 12,
    totalPages: 155,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Chhonde Chhonde Cholo', titleBn: 'ছন্দে চলো (অজিত দত্ত)' },
      { chapterNo: 2, title: 'Pagla Dashu', titleBn: 'পাগলা দাশু (সুকুমার রায়)' },
      { chapterNo: 3, title: 'Kar Dour Koto Dur', titleBn: 'কার দৌড় কত দূর (শিবতোষ মুখোপাধ্যায়)' },
      { chapterNo: 4, title: 'Notun Master', titleBn: 'নতুন মাস্টার ও অন্যান্য গল্প' },
      { chapterNo: 5, title: 'Maku (Supplementary Novel)', titleBn: 'সহায়ক পাঠ: মাকু (লীলা মজুমদার)' },
      { chapterNo: 6, title: 'Bhasha Charcha 7', titleBn: 'ভাষা চর্চা: উপসর্গ, অনুসর্গ ও কারক পরিচয়' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'ছন্দে চলো - অজিত দত্ত',
        content: `# ছন্দে চলো
### কবি: অজিত দত্ত

> মন্দ কথায় কান দিও না
> ছন্দে সুরের টান দিও না,
> দ্বন্দ ভুলে মন না দিলে
> ছন্দ শোনা যায় না কো।
> 
> ছন্দ আছে ঝড়-বাদলে
> ছন্দ আছে নদীর চলে,
> পাখির ডাকে ঝিঁঝিঁর ডাকে
> ছন্দ আছে সারাটা দিন।

**উপলব্ধি:** বিশ্বব্রহ্মাণ্ডের সবকিছুই একটি নির্দিষ্ট ছন্দ ও সুরের ওপর প্রতিষ্ঠিত। ছন্দ অনুভব করলে জীবনের সকল সংঘাত দূর হয়।`
      }
    ]
  },
  {
    id: 'wb-c7-ganit-prabha',
    classId: 7,
    title: 'Ganit Prabha (Class 7)',
    titleBn: 'গণিতপ্রভা (৭ম শ্রেণি)',
    subject: 'Mathematics',
    subjectBn: 'গণিত',
    category: 'mathematics',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-600 to-amber-900',
    description: 'Indices (সূচক), Algebraic Formulae ((a+b)² = a²+2ab+b²), Simple Equations, Triangles, and Congruence.',
    descriptionBn: 'বীজগাণিতিক সূত্রাবলি, সূচকের নিয়মাবলি, ত্রিভুজের সর্বসমতা ও সমীকরণ গঠন।',
    totalChapters: 14,
    totalPages: 180,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Laws of Indices', titleBn: 'সূচকের ধারণা ও নিয়মাবলি' },
      { chapterNo: 2, title: 'Algebraic Identities (Squares)', titleBn: 'বীজগাণিতিক সূত্রাবলি ((a+b)² ও (a-b)²)' },
      { chapterNo: 3, title: 'Linear Equations in One Variable', titleBn: 'একচলবিশিষ্ট একঘাত সমীকরণ সমাধান' },
      { chapterNo: 4, title: 'Congruence of Triangles (SAS, SSS, ASA, RHS)', titleBn: 'ত্রিভুজের সর্বসমতার শর্তাবলি' },
      { chapterNo: 5, title: 'Speed, Time and Distance', titleBn: 'সময়, গতিবেগ ও দূরত্বের অংক' },
      { chapterNo: 6, title: 'Parallel Lines and Transversal', titleBn: 'সমান্তরাল সরলরেখা ও ছেদকের ধর্ম' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'বীজগণিতের মৌলিক সূত্রাবলি',
        content: `# বীজগণিতের মূল বর্গ সূত্র
১. **(a + b)² = a² + 2ab + b²**
২. **(a - b)² = a² - 2ab + b²**
৩. **a² - b² = (a + b)(a - b)**
৪. **4ab = (a + b)² - (a - b)²**
৫. **2(a² + b²) = (a + b)² + (a - b)²**

*প্রয়োগ উদাহরণ:*
(x + 5)² = x² + 2·x·5 + 5² = **x² + 10x + 25**`
      }
    ]
  },

  // ================= CLASS 8 =================
  {
    id: 'wb-c8-sahitya-mela',
    classId: 8,
    title: 'Sahitya Mela (Class 8)',
    titleBn: 'সাহিত্য মেলা (৮ম শ্রেণি)',
    subject: 'Bengali First Language',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-indigo-600 to-purple-800',
    description: 'Bojhapora by Rabindranath Tagore, Adarsha Chhatro, Chithi by Swami Vivekananda, and Pather Panchali.',
    descriptionBn: 'বোঝাপড়া (রবীন্দ্রনাথ ঠাকুর), চিঠিপত্র (স্বামী বিবেকানন্দ) এবং বিভূতিভূষণের পথের পাঁচালী।',
    totalChapters: 12,
    totalPages: 165,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Bojhapora', titleBn: 'বোঝাপড়া (রবীন্দ্রনাথ ঠাকুর)' },
      { chapterNo: 2, title: 'Adbhuto Atithi Sotkar', titleBn: 'অদ্ভুত আতিথেয়তা (ঈশ্বরচন্দ্র বিদ্যাসাগর)' },
      { chapterNo: 3, title: 'Chithi', titleBn: 'চিঠি (স্বামী বিবেকানন্দ)' },
      { chapterNo: 4, title: 'Chondrogupte', titleBn: 'চন্দ্রগুপ্ত (দ্বিজেন্দ্রলাল রায়)' },
      { chapterNo: 5, title: 'Pather Panchali (Rapid Reader)', titleBn: 'সহায়ক পাঠ: পথের পাঁচালী (বিভূতিভূষণ বন্দ্যোপাধ্যায়)' },
      { chapterNo: 6, title: 'Bhasha Charcha 8', titleBn: 'ভাষা চর্চা: পদান্বয়ী অব্যয় ও সমাস পরিচয়' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'বোঝাপড়া - রবীন্দ্রনাথ ঠাকুর',
        content: `# বোঝাপড়া
### কবি: রবীন্দ্রনাথ ঠাকুর

> মনেরে আজ কহ যে—
> ভালো মন্দ যাহাই আসুক
> সত্যেরে লও সহজে।
> 
> কেউবা তোমায় ভালোবাসে
> কেউবা বাসতে পারেই না যে,
> কেউ বিকিয়ে আছে একেলে
> কেউবা সিকি পয়সা না যে।
> কতখানি যে সত্য তোমার
> কতখানি যে ফাঁকি,
> মনের সাথে বোঝাপড়া
> করবে তোমায় বাকি।

**মূল বার্তা:** জীবনের ঘাত-প্রতিঘাত ও বাস্তবতাকে শান্ত মনে মেনে নিয়ে এগিয়ে যাওয়াই আসল মনুষ্যত্ব।`
      }
    ]
  },
  {
    id: 'wb-c8-ganit-prabha',
    classId: 8,
    title: 'Ganit Prabha (Class 8)',
    titleBn: 'গণিতপ্রভা (৮ম শ্রেণি)',
    subject: 'Mathematics',
    subjectBn: 'গণিত',
    category: 'mathematics',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-700 to-orange-900',
    description: 'Algebraic factorisation (উৎপাদকে বিশ্লেষণ), Cubes formulae, Simultaneous equations, Pie charts, and Pythagoras Theorem.',
    descriptionBn: 'ঘনফলের সূত্রাবলি, বীজগণিতীয় উৎপাদকে বিশ্লেষণ, পাইচিত্র ও পিথাগোরাসের উপপাদ্য।',
    totalChapters: 16,
    totalPages: 200,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Factorisation of Algebraic Expressions', titleBn: 'বীজগাণিতিক সংখ্যামালার উৎপাদকে বিশ্লেষণ' },
      { chapterNo: 2, title: 'Formulae of Cubes (a+b)³', titleBn: 'বীজগাণিতিক ঘনফল নির্ণয়ের সূত্র' },
      { chapterNo: 3, title: 'Simultaneous Linear Equations', titleBn: 'সহসমীকরণ গঠন ও সমাধানের চার পদ্ধতি' },
      { chapterNo: 4, title: 'Pythagoras Theorem & Right-Angled Triangles', titleBn: 'পিথাগোরাসের উপপাদ্য ও প্রয়োগ' },
      { chapterNo: 5, title: 'Data Representation & Pie Chart', titleBn: 'তথ্য উপস্থাপনা ও বৃত্তাকার লেখ (পাইচিত্র)' },
      { chapterNo: 6, title: 'Compound Interest Introduction', titleBn: 'চক্রবৃদ্ধি সুদের প্রাথমিক ধারণা' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'উৎপাদকে বিশ্লেষণের পদ্ধতিসমূহ',
        content: `# উৎপাদকে বিশ্লেষণ (Factorisation)
বীজগাণিতিক সংখ্যামালাকে দুই বা ততোধিক রাশির গুণফল আকারে প্রকাশ করাই হলো উৎপাদকে বিশ্লেষণ।

**সাধারণ পদ্ধতিসমূহ:**
১. সাধারণ পদ কমন নেওয়া: ax + ay = a(x + y)
২. বর্গের অন্তর সূত্র: a² - b² = (a + b)(a - b)
৩. মধ্যপদ সহগ পৃথকীকরণ (Middle-term Break):
   x² + 5x + 6 = x² + 3x + 2x + 6 = x(x+3) + 2(x+3) = **(x + 3)(x + 2)**`
      }
    ]
  },

  // ================= CLASS 9 =================
  {
    id: 'wb-c9-sahitya-sanchayan',
    classId: 9,
    title: 'Sahitya Sanchayan (Class 9)',
    titleBn: 'সাহিত্য সঞ্চয়ন (৯ম শ্রেণি)',
    subject: 'Bengali First Language',
    subjectBn: 'বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-violet-600 to-indigo-900',
    description: 'Kolingodeshe Jhor Brishti, Dhibor Brittanto, Ilias, Dam, and Professor Shonkur Diary (সহায়ক পাঠ - সত্যজিৎ রায়).',
    descriptionBn: 'কলিঙ্গদেশে ঝড় বৃষ্টি, ধীবর বৃত্তান্ত, দাম, ইলিয়াস এবং সত্যজিৎ রায়ের প্রফেসর শঙ্কুর ডায়েরি।',
    totalChapters: 12,
    totalPages: 185,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Kolingodeshe Jhor Brishti', titleBn: 'কলিঙ্গদেশে ঝড় বৃষ্টি (মুকুন্দরাম চক্রবর্তী)' },
      { chapterNo: 2, title: 'Dhibor Brittanto', titleBn: 'ধীবর বৃত্তান্ত (মহাকবি কালিদাস)' },
      { chapterNo: 3, title: 'Ilias', titleBn: 'ইলিয়াস (লিও তলস্তয়)' },
      { chapterNo: 4, title: 'Dam', titleBn: 'দাম (নারায়ণ গঙ্গোপাধ্যায়)' },
      { chapterNo: 5, title: 'Nobonobo Srishti', titleBn: 'নব নব সৃষ্টি (সৈয়দ মুজতবা আলী)' },
      { chapterNo: 6, title: 'Professor Shonku (Rapid Reader)', titleBn: 'সহায়ক পাঠ: প্রফেসর শঙ্কুর ডায়েরি (সত্যজিৎ রায়)' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'কলিঙ্গদেশে ঝড় বৃষ্টি - কবিকঙ্কণ মুকুন্দরাম',
        content: `# কলিঙ্গদেশে ঝড় বৃষ্টি
### চণ্ডীমঙ্গল কাব্য থেকে গৃহীত

> মেঘে কৈল অন্ধকার মেঘে কৈল অন্ধকার।
> দেখিতে না পায় কেহ অঙ্গ আপনার।
> ঈশানে উড়িল মেঘ সঘনে চিকুর।
> উত্তর পবনে মেঘ ডাকে দুর দুর।
> 
> নিমিষেকে জোড়ে মেঘ গগনমণ্ডল।
> চারি মেঘে বরিষে মুষলধারে জল।
> কলিঙ্গে সোঙরে লোক পাইয়া বিষাদ।

**ব্যাখ্যা ও প্রশ্ন:**
ঈশান কোণে কালো মেঘ জমে প্রবল ঝড় ও ঘনঘন বজ্রপাত শুরু হওয়ায় কলিঙ্গদেশের প্রজারা প্রচণ্ড আতঙ্কিত হয়ে পড়েছিল।`
      }
    ]
  },
  {
    id: 'wb-c9-ganit-prakash',
    classId: 9,
    title: 'Ganit Prakash (Class 9)',
    titleBn: 'গণিত প্রকাশ (৯ম শ্রেণি)',
    subject: 'Mathematics',
    subjectBn: 'গণিত',
    category: 'mathematics',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-700 to-amber-950',
    description: 'Real numbers, Polynomials, Coordinate Geometry, Profit & Loss, Theorems on Parallelograms, and Statistics.',
    descriptionBn: 'বাস্তব সংখ্যা, বহুপদী সংখ্যামালা, লাভ ও ক্ষতি, স্থানাঙ্ক জ্যামিতি ও পরিসংখ্যা বিভাজন।',
    totalChapters: 21,
    totalPages: 240,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Real Numbers (বাস্তব সংখ্যা)', titleBn: 'মূলদ ও অমূলদ সংখ্যা, সংখ্যারেখা' },
      { chapterNo: 2, title: 'Laws of Indices (সূচকের নিয়মাবলি)', titleBn: 'ঘাত, সূচকের সূত্রাবলি ও সমীকরণ' },
      { chapterNo: 3, title: 'Graph & Linear Simultaneous Equations', titleBn: 'লেখচিত্র ও দুই চলবিশিষ্ট রৈখিক সমীকরণ' },
      { chapterNo: 4, title: 'Coordinate Geometry: Distance Formula', titleBn: 'স্থানাঙ্ক জ্যামিতি: দূরত্ব নির্ণয় সূত্র' },
      { chapterNo: 5, title: 'Polynomials (বহুপদী সংখ্যামালা)', titleBn: 'ভাগশেষ উপপাদ্য ও উৎপাদক উপপাদ্য' },
      { chapterNo: 6, title: 'Profit and Loss (লাভ ও ক্ষতি)', titleBn: 'ক্রয়মূল্য, বিক্রয়মূল্য ও ধার্যমূল্যের শতকরা লাভ-ক্ষতি' },
      { chapterNo: 7, title: 'Theorems on Parallelograms', titleBn: 'সামান্তরিক সংক্রান্ত উপপাদ্য' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'লাভ ও ক্ষতির মৌলিক সূত্রাবলি',
        content: `# লাভ ও ক্ষতি (Profit & Loss)
১. লাভ = বিক্রয়মূল্য (SP) - ক্রয়মূল্য (CP)
২. ক্ষতি = ক্রয়মূল্য (CP) - বিক্রয়মূল্য (SP)
৩. শতকরা লাভ = (মোট লাভ ÷ ক্রয়মূল্য) × ১০০%
৪. শতকরা ক্ষতি = (মোট ক্ষতি ÷ ক্রয়মূল্য) × ১০০%

> **বিশেষ নোট:** প্রশ্নে উল্লেখ না থাকলে লাভ বা ক্ষতি সর্বদা **ক্রয়মূল্যের** ওপর হিসাব করা হয়।`
      }
    ]
  },
  {
    id: 'wb-c9-bhouto-bigyan',
    classId: 9,
    title: 'Bhouto Bigyan O Paribesh (Class 9)',
    titleBn: 'ভৌতবিজ্ঞান ও পরিবেশ (৯ম শ্রেণি)',
    subject: 'Physical Science',
    subjectBn: 'ভৌতবিজ্ঞান ও পরিবেশ',
    category: 'science',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-cyan-700 to-blue-900',
    description: 'Measurement, Force & Motion (নিউটনের গতিসূত্র), Atomic Structure (পরমাণুর গঠন), Solution, Acids & Bases, and Work, Energy & Power.',
    descriptionBn: 'পরিমাপ, বল ও গতি, পরমাণুর গঠন, দ্রবণ, অ্যাসিড-ক্ষার এবং কার্য, ক্ষমতা ও শক্তি।',
    totalChapters: 6,
    totalPages: 210,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Measurement (পরিমাপ)', titleBn: 'ভৌতরাশি, মাত্রা ও সাধারণ তুলাযন্ত্র' },
      { chapterNo: 2, title: 'Force and Motion (বল ও গতি)', titleBn: 'সরণ, বেগ, ত্বরণ এবং নিউটনের ৩টি গতিসূত্র' },
      { chapterNo: 3, title: 'Matter: Structure and Properties', titleBn: 'পৃষ্ঠটান, সান্দ্রতা ও বের্নৌলির নীতি' },
      { chapterNo: 4, title: 'Atomic Structure & Chemical Bonding', titleBn: 'রাদারফোর্ড-বোরের মডেল, আইসোটোপ ও ইলেকট্রন বিন্যাস' },
      { chapterNo: 5, title: 'Solution, Acids, Bases and Salts', titleBn: 'প্রকৃত দ্রবণ, কলয়েড, পিএইচ (pH) মান ও নির্দেশক' },
      { chapterNo: 6, title: 'Work, Power and Energy', titleBn: 'স্থিতিশক্তি, গতিশক্তি ও শক্তির নিত্যতা সূত্র' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'নিউটনের গতিসূত্রাবলি',
        content: `# নিউটনের তিনটি গতিসূত্র
### প্রথম গতিসূত্র (Law of Inertia):
বাইরে থেকে কোনো প্রযুক্ত বল দ্বারা অবস্থার পরিবর্তনে বাধ্য না করলে স্থির বস্তু চিরকাল স্থির থাকবে এবং গতিশীল বস্তু সমবেগে সরলরেখায় চিরকাল চলতে থাকবে। (জাড্যধর্ম ও বলের সংজ্ঞা)

### দ্বিতীয় গতিসূত্র (F = ma):
বস্তুর ভরবেগের পরিবর্তনের হার তার ওপর প্রযুক্ত বলের সমানুপাতিক এবং বল যেদিকে প্রযুক্ত হয় ভরবেগের পরিবর্তনও সেদিকে ঘটে।

### তৃতীয় গতিসূত্র:
প্রত্যেক ক্রিয়ারই একটি সমান ও বিপরীতমুখী প্রতিক্রিয়া থাকে।`
      }
    ]
  },

  // ================= CLASS 10 (MADHYAMIK) =================
  {
    id: 'wb-c10-sahitya-sanchayan',
    classId: 10,
    title: 'Sahitya Sanchayan (Madhyamik Class 10)',
    titleBn: 'সাহিত্য সঞ্চয়ন (মাধ্যমিক ১০ম শ্রেণি)',
    subject: 'Bengali First Language',
    subjectBn: 'মাধ্যমিক বাংলা প্রথম ভাষা',
    category: 'language',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE Madhyamik)',
    edition: 'Official Madhyamik Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-red-600 to-rose-900',
    description: 'Mandatory WBBSE Madhyamik text: Gyanochokkhu, Bahurupi, Pather Dabi, Ay Aro Bendhe Bendhe Thaki, and Koni (মতি নন্দী).',
    descriptionBn: 'জ্ঞানচক্ষু, বহুরূপী, পথের দাবী, অদল বদল, আয় আরো বেঁধে বেঁধে থাকি, আফ্রিকা ও সহায়ক পাঠ কোনি।',
    totalChapters: 12,
    totalPages: 220,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Gyanochokkhu', titleBn: 'জ্ঞানচক্ষু (আশাপূর্ণা দেবী)' },
      { chapterNo: 2, title: 'Bahurupi', titleBn: 'বহুরূপী (সুবোধ ঘোষ)' },
      { chapterNo: 3, title: 'Pather Dabi', titleBn: 'পথের দাবী (শরৎচন্দ্র চট্টোপাধ্যায়)' },
      { chapterNo: 4, title: 'Adal Badal', titleBn: 'অদল বদল (পান্নালাল প্যাটেল)' },
      { chapterNo: 5, title: 'Oshukhi Ekjon', titleBn: 'অসুখী একজন (পাবলো নেরুদা)' },
      { chapterNo: 6, title: 'Ay Aro Bendhe Bendhe Thaki', titleBn: 'আয় আরো বেঁধে বেঁধে থাকি (শঙ্খ ঘোষ)' },
      { chapterNo: 7, title: 'Africa', titleBn: 'আফ্রিকা (রবীন্দ্রনাথ ঠাকুর)' },
      { chapterNo: 8, title: 'Abhisek', titleBn: 'অভিষেক (মাইকেল মধুসূদন দত্ত)' },
      { chapterNo: 9, title: 'Koni (Supplementary Novel)', titleBn: 'সহায়ক পাঠ: কোনি (মতি নন্দী)' },
      { chapterNo: 10, title: 'Madhyamik Byakoron', titleBn: 'কারক, সমাস, বাক্য ও বাচ্য পরিবর্তন' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'জ্ঞানচক্ষু - আশাপূর্ণা দেবী',
        content: `# জ্ঞানচক্ষু
### লেখিকা: আশাপূর্ণা দেবী
#### মাধ্যমিক বাংলা প্রথম ভাষা

> "কথাটা শুনে তপনের চোখ মার্বেল হয়ে গেল!"

**পটভূমি ও সারসংক্ষেপ:**
তপনের নতুন মেসোমশাই একজন জলজ্যান্ত লেখক। তিনি বই লেখেন এবং সেই বই ছাপাও হয়। তপন আগে ভাবত লেখকেরা বোধহয় অন্য কোনো গ্রহের মানুষ। কিন্তু মেসোমশাইকে দেখে তার ভুল ভাঙল। তপন নিজেও মেসোমশাইকে দেখে একটি গোটা গল্প লিখে ফেলল। কিন্তু গল্পটি যখন পত্রিকায় মেসোর সংশোধিত রূপে ছাপা হলো, তপন বুঝল নিজের আসল সৃষ্টির আনন্দ অন্য কারও হাতের ছোঁয়ায় ম্লান হয়ে যায়। তখনই তপনের আত্মমর্যাদাবোধ ও অন্তরের 'জ্ঞানচক্ষু' উন্মোচিত হলো।`
      },
      {
        pageNo: 2,
        title: 'সহায়ক উপন্যাস: কোনি - মতি নন্দী',
        content: `# কোনি (সহায়ক পাঠ)
### ঔপন্যাসিক: মতি নন্দী

**প্রধান চরিত্রসমূহ:**
- **ক্ষিতীশ সিংহ (ক্ষিতীশদা)**: নিষ্ঠাবান সাঁতার প্রশিক্ষক
- **কনকচাঁপা পাল (কোনি)**: অদম্য ইচ্ছাশক্তির অধিকারী শ্যামপুকুর বস্তির সাঁতারু কিশোরী

**বিখ্যাত উক্তি:**
> "ফাইট কোনি ফাইট!"
> "তোর আসল লজ্জা জলে, আসল গর্বও জলে!"

দারিদ্র্য, অবহেলা ও ষড়যন্ত্রের বিরুদ্ধে লড়াই করে জাতীয় সাঁতার চ্যাম্পিয়নশিপে কোনির জয়ের কাহিনীই উপন্যাসের প্রাণ।`
      }
    ]
  },
  {
    id: 'wb-c10-ganit-prakash',
    classId: 10,
    title: 'Ganit Prakash (Madhyamik Class 10)',
    titleBn: 'গণিত প্রকাশ (মাধ্যমিক ১০ম শ্রেণি)',
    subject: 'Mathematics',
    subjectBn: 'মাধ্যমিক গণিত',
    category: 'mathematics',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Official Madhyamik Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-600 to-yellow-800',
    description: 'Quadratic Equations, Simple & Compound Interest, Circle Theorems, Trigonometry, Heights & Distances, and Sphere/Cone.',
    descriptionBn: 'একচলবিশিষ্ট দ্বিঘাত সমীকরণ, সরল ও চক্রবৃদ্ধি সুদ, বৃত্তের উপপাদ্য, ত্রিকোণমিতি, উচ্চতা ও দূরত্ব এবং লম্ব বৃত্তাকার চোঙ ও গোলক।',
    totalChapters: 26,
    totalPages: 320,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Quadratic Equations in One Variable', titleBn: 'একচলবিশিষ্ট দ্বিঘাত সমীকরণ (শ্রীধর আচার্যের সূত্র)' },
      { chapterNo: 2, title: 'Simple Interest (সরল সুদকষা)', titleBn: 'I = P·R·T / 100 সূত্রের প্রয়োগ' },
      { chapterNo: 3, title: 'Circle Related Theorems', titleBn: 'বৃত্ত সম্পর্কিত উপপাদ্য ও স্পর্শক' },
      { chapterNo: 4, title: 'Rectangular Parallelopiped (Cuboid)', titleBn: 'আয়তঘন ও ঘনক' },
      { chapterNo: 5, title: 'Ratio and Proportion', titleBn: 'অনুপাত ও সমানুপাত (যোগ-ভাগ প্রক্রিয়া)' },
      { chapterNo: 6, title: 'Compound Interest and Uniform Rate', titleBn: 'চক্রবৃদ্ধি সুদ ও সমহার বৃদ্ধি বা হ্রাস' },
      { chapterNo: 7, title: 'Right Circular Cylinder and Cone', titleBn: 'লম্ব বৃত্তাকার চোঙ ও শঙ্কু' },
      { chapterNo: 8, title: 'Sphere (গোলক)', titleBn: 'গোলকের বক্রতলের ক্ষেত্রফল ও আয়তন' },
      { chapterNo: 9, title: 'Trigonometry: Ratios and Identities', titleBn: 'ত্রিকোণমিতিক কোণানুপাত ও অভেদাবলি' },
      { chapterNo: 10, title: 'Heights and Distances (উচ্চতা ও দূরত্ব)', titleBn: 'উন্নতি কোণ ও অবনতি কোণের ত্রিকোণমিতিক সমস্যা' },
      { chapterNo: 11, title: 'Statistics: Mean, Median, Mode, Ogive', titleBn: 'গড়, মধ্যমা, ওজাইভ ও সংখ্যাগুরুমান' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'দ্বিঘাত সমীকরণ ও শ্রীধর আচার্যের সূত্র',
        content: `# একচলবিশিষ্ট দ্বিঘাত সমীকরণ
আদর্শ রূপ: **ax² + bx + c = 0** (যেখানে a ≠ 0)

### শ্রীধর আচার্যের সূত্র:
> **x = [ -b ± √(b² - 4ac) ] ÷ 2a**

**নিরূপক (Discriminant, D = b² - 4ac) এর ধর্ম:**
1. D > 0 হলে বীজদ্বয় বাস্তব ও অসমান হবে।
2. D = 0 হলে বীজদ্বয় বাস্তব ও সমান হবে।
3. D < 0 হলে কোনো বাস্তব বীজ থাকবে না।`
      },
      {
        pageNo: 2,
        title: 'ত্রিকোণমিতির মৌলিক সূত্রাবলি',
        content: `# ত্রিকোণমিতিক অভেদাবলি
১. **sin²θ + cos²θ = 1**
২. **sec²θ - tan²θ = 1**
৩. **cosec²θ - cot²θ = 1**

**মানসমূহ (০°, ৩০°, ৪৫°, ৬০°, ৯০°):**
- sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2
- cos 30° = √3/2, cos 45° = 1/√2, cos 60° = 1/2
- tan 45° = 1, tan 30° = 1/√3, tan 60° = √3`
      }
    ]
  },
  {
    id: 'wb-c10-bhouto-bigyan',
    classId: 10,
    title: 'Bhouto Bigyan O Paribesh (Madhyamik Class 10)',
    titleBn: 'ভৌতবিজ্ঞান ও পরিবেশ (মাধ্যমিক ১০ম শ্রেণি)',
    subject: 'Physical Science',
    subjectBn: 'মাধ্যমিক ভৌতবিজ্ঞান ও পরিবেশ',
    category: 'science',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Official Madhyamik Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-blue-700 to-cyan-900',
    description: 'Behavior of Gases (বয়েল ও চার্লসের সূত্র), Light & Lenses (আলো), Current Electricity (ওহমের সূত্র), Periodic Table, and Organic Chemistry.',
    descriptionBn: 'পরিবেশের ভাবনা, গ্যাসের আচরণ, আলো, চলতড়িৎ, পর্যায় সারণি ও জৈব রসায়ন।',
    totalChapters: 8,
    totalPages: 260,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Concerns about Our Environment', titleBn: 'পরিবেশের জন্য ভাবনা (ওজোন স্তর ও গ্রিনহাউস এফেক্ট)' },
      { chapterNo: 2, title: 'Behavior of Gases (গ্যাসের আচরণ)', titleBn: 'বয়েলের সূত্র, চার্লসের সূত্র ও PV = nRT' },
      { chapterNo: 3, title: 'Chemical Calculations (রাসায়নিক গণনা)', titleBn: 'বিক্রিয়ায় ভর সংরক্ষণ ও গাণিতিক সমস্যা' },
      { chapterNo: 4, title: 'Thermal Phenomena (তাপের ঘটনা সমূহ)', titleBn: 'তাপীয় প্রসারণ গুণাঙ্ক ও তাপ পরিবাহিতা' },
      { chapterNo: 5, title: 'Light (আলো)', titleBn: 'গলীয় দর্পণ, লেন্স, আলোর বিচ্ছুরণ ও প্রিজম' },
      { chapterNo: 6, title: 'Current Electricity (চলতড়িৎ)', titleBn: 'ওহমের সূত্র, রোধের সমবায় ও জুলের তাপীয় ফল' },
      { chapterNo: 7, title: 'Periodic Table and Chemical Bonding', titleBn: 'পর্যায় সারণি, তড়িৎযোজী ও সমযোজী বন্ধন' },
      { chapterNo: 8, title: 'Organic Chemistry (জৈব রসায়ন)', titleBn: 'হাইড্রোকার্বন, IUPAC নামকরণ ও পলিমার' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'গ্যাসের আচরণ: বয়েল ও চার্লসের সূত্র',
        content: `# গ্যাসের আচরণ ও সূত্রাবলি
### ১. বয়েলের সূত্র (Boyle's Law):
স্থির উষ্ণতায় নির্দিষ্ট ভরের কোনো গ্যাসের আয়তন ওই গ্যাসের চাপের সঙ্গে ব্যস্তানুপাতে পরিবর্তিত হয়।
> **P₁V₁ = P₂V₂** (যেখানে T ও m স্থির)

### ২. চার্লসের সূত্র (Charles's Law):
স্থির চাপে ১ ডিগ্রি সেলসিয়াস উষ্ণতা বৃদ্ধি বা হ্রাসের জন্য নির্দিষ্ট ভরের গ্যাসের আয়তন ০° সেলসিয়াসে থাকা আয়তনের ১/২৭৩ অংশ পরিবর্তিত হয়।
> **V₁ / T₁ = V₂ / T₂** (যেখানে P ও m স্থির)

### ৩. আদর্শ গ্যাস সমীকরণ:
> **PV = nRT** (R = সার্বজনীন গ্যাস ধ্রুবক)`
      }
    ]
  },
  {
    id: 'wb-c10-jibon-bigyan',
    classId: 10,
    title: 'Jibon Bigyan O Paribesh (Madhyamik Class 10)',
    titleBn: 'জীবন বিজ্ঞান ও পরিবেশ (মাধ্যমিক ১০ম শ্রেণি)',
    subject: 'Life Science',
    subjectBn: 'মাধ্যমিক জীবন বিজ্ঞান ও পরিবেশ',
    category: 'science',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Official Madhyamik Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-emerald-700 to-green-950',
    description: 'Control & Coordination in Living Organisms (হরমোন ও স্নায়ুতন্ত্র), Cell Division (কোষ বিভাজন ও DNA), Heredity (মেন্ডেলের সূত্র), Evolution & Biodiversity.',
    descriptionBn: 'জীবজগতে নিয়ন্ত্রণ ও সমন্বয়, জীবনের ধারাবাহিকতা, বংশগতি, অভিব্যক্তি ও পরিবেশ এবং তার সম্পদ।',
    totalChapters: 5,
    totalPages: 240,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Control and Coordination in Organisms', titleBn: 'উদ্ভিদ ও প্রাণী হরমোন, স্নায়ুতন্ত্র এবং চোখ' },
      { chapterNo: 2, title: 'Continuity of Life (কোষ বিভাজন)', titleBn: 'মাইটোসিস, মিয়োসিস, ডিএনএ এবং জনন' },
      { chapterNo: 3, title: 'Heredity and Common Genetic Diseases', titleBn: 'মেন্ডেলের বংশগতি সূত্র, থ্যালাসেমিয়া ও বর্ণান্ধতা' },
      { chapterNo: 4, title: 'Evolution and Adaptation', titleBn: 'ল্যামার্কবাদ, ডারউইনবাদ ও অভিযোজন' },
      { chapterNo: 5, title: 'Environment, Its Resources and Conservation', titleBn: 'নাইট্রোজেন চক্র, দূষণ ও জীববৈচিত্র্য সংরক্ষণ' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'কোষ বিভাজন: মাইটোসিস বনাম মিয়োসিস',
        content: `# মাইটোসিস ও মিয়োসিসের তুলনামূলক আলোচনা
### মাইটোসিস (Mitosis - সমবিভাজন):
- **ঘটার স্থান**: দেহকোষে (Somatic cells) ঘটে।
- **অপত্য কোষের সংখ্যা**: একটি জনিতৃ কোষ থেকে দুটি সমান ক্রোমোজোমযুক্ত অপত্য কোষ উৎপন্ন হয়।
- **গুরুত্ব**: জীবের বৃদ্ধি ও ক্ষয়পূরণ সম্পন্ন করে।

### মিয়োসিস (Meiosis - হ্রাসবিভাজন):
- **ঘটার স্থান**: জনন মাতৃকোষে (Germ cells) ঘটে।
- **অপত্য কোষের সংখ্যা**: চারটি হ্যাপ্লয়েড (n) অপত্য কোষ উৎপন্ন হয়।
- **গুরুত্ব**: ক্রোমোজোম সংখ্যা নির্দিষ্ট রাখা ও প্রকরণ সৃষ্টি।`
      }
    ]
  },
  {
    id: 'wb-c10-itihas',
    classId: 10,
    title: 'Itihas O Paribesh (Madhyamik Class 10)',
    titleBn: 'ইতিহাস ও পরিবেশ (মাধ্যমিক ১০ম শ্রেণি)',
    subject: 'History',
    subjectBn: 'মাধ্যমিক ইতিহাস ও পরিবেশ',
    category: 'social_science',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Official Madhyamik Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-amber-800 to-stone-900',
    description: 'Modern Indian History: Reform movements, Tribal revolts, 1857 Great Revolt, Print culture, and Post-independence integration.',
    descriptionBn: 'ইতিহাসের ধারণা, সংস্কার বৈশিষ্ট্য ও পর্যালোচনা, প্রতিরোধ ও বিদ্রোহ, সংহতির প্রাথমিক রূপ ও বিশ শতকের ভারত।',
    totalChapters: 8,
    totalPages: 215,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Ideas of History (ইতিহাসের ধারণা)', titleBn: 'খেলাধুলা, পোশাক, নারী ও আধুনিক ইতিহাস চর্চা' },
      { chapterNo: 2, title: 'Reform: Characteristics and Evaluation', titleBn: 'উনবিংশ শতকের নবজাগরণ, বিদ্যাসাগর ও রামমোহন' },
      { chapterNo: 3, title: 'Resistance and Rebellion: Characteristics', titleBn: 'সাঁওতাল, কোল, মুণ্ডা ও নীল বিদ্রোহ' },
      { chapterNo: 4, title: 'Early Stages of Collective Action', titleBn: '১৮৫৭ সালের মহাবিদ্রোহ ও ভারতমাতা চিত্র' },
      { chapterNo: 5, title: 'Alternative Ideas & Initiatives (Printing)', titleBn: 'ছাপাখানা, উপেন্দ্রকিশোর ও বিশ্বভারতী প্রতিষ্ঠা' },
      { chapterNo: 6, title: 'Peasants, Working Class & Left Movements', titleBn: 'অসহযোগ, আইন অমান্য ও ভারত ছাড়ো আন্দোলন' }
    ],
    pages: [
      {
        pageNo: 1,
        title: '১৮৫৭ সালের মহাবিদ্রোহের প্রকৃতি',
        content: `# ১৮৫৭ সালের মহাবিদ্রোহ
### মহাবিদ্রোহ কি কেবল সিপাহি বিদ্রোহ ছিল নাকি জাতীয় সংগ্রাম?

- **সূচনা**: ১৮৫৭ সালের ২৯ মার্চ ব্যারাকপুর সেনানিবাসে মঙ্গল পাণ্ডের বিদ্রোহের মাধ্যমে শুরু হয়।
- **কারণসমূহ**: এনফিল্ড রাইফেলের টোটা সংক্রান্ত ক্ষোভ, লর্ড ডালহৌসির স্বত্ববিলোপ নীতি এবং ইংরেজদের অর্থনৈতিক শোষণ।
- **ঐতিহাসিক দৃষ্টিভঙ্গি**: 
  - জন কে এবং লরেন্স একে নিছক 'সিপাহি বিদ্রোহ' বলেছেন।
  - কিন্তু ড. বিনায়ক দামোদর সাভারকর একে **"ভারতের প্রথম স্বাধীনতা সংগ্রাম"** বলে অভিহিত করেছেন।`
      }
    ]
  },
  {
    id: 'wb-c10-bhugol',
    classId: 10,
    title: 'Bhugol O Paribesh (Madhyamik Class 10)',
    titleBn: 'ভূগোল ও পরিবেশ (মাধ্যমিক ১০ম শ্রেণি)',
    subject: 'Geography',
    subjectBn: 'মাধ্যমিক ভূগোল ও পরিবেশ',
    category: 'social_science',
    board: 'WBBSE',
    publisher: 'West Bengal Board of Secondary Education',
    publisherBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    edition: 'Official Madhyamik Syllabus 2026-2027',
    academicYear: '2026-2027',
    coverColor: 'from-teal-700 to-sky-950',
    description: 'Exogenetic Processes (নদী, হিমবাহ, বায়ু), Atmosphere, Hydrosphere, India (Physical, Climate, Agriculture, Industry), and Satellite Imagery.',
    descriptionBn: 'বহির্জাত প্রক্রিয়া ও তাদের দ্বারা সৃষ্ট ভূমিরূপ, বায়ুমণ্ডল, বারিমণ্ডল, ভারতের ভূগোল এবং উপগ্রহ চিত্র ও ভূবৈচিত্র্যসূচক মানচিত্র।',
    totalChapters: 6,
    totalPages: 230,
    officialPortalUrl: 'https://wbbse.wb.gov.in',
    chapters: [
      { chapterNo: 1, title: 'Exogenetic Processes & Landforms', titleBn: 'নদী, হিমবাহ ও বায়ুর ক্ষয় এবং সঞ্চয়কার্য' },
      { chapterNo: 2, title: 'Atmosphere (বায়ুমণ্ডল)', titleBn: 'বায়ুমণ্ডলের স্তরবিন্যাস, উত্তাপের বৈষম্য ও বায়ুপ্রবাহ' },
      { chapterNo: 3, title: 'Hydrosphere (বারিমণ্ডল)', titleBn: 'সমুদ্রস্রোত, জোয়ার-ভাটা ও বানডাকা' },
      { chapterNo: 4, title: 'Waste Management (বর্জ্য ব্যবস্থাপনা)', titleBn: 'বর্জ্যের উৎস, প্রভাব এবং থ্রি-আর (3R) পদ্ধতি' },
      { chapterNo: 5, title: 'India: Physical and Economic Geography', titleBn: 'ভারতের ভূপ্রকৃতি, নদনদী, মৃত্তিকা, কৃষি ও শিল্প' },
      { chapterNo: 6, title: 'Satellite Imagery and Topographical Maps', titleBn: 'উপগ্রহ চিত্র ও টোপোগ্রাফিক্যাল মানচিত্রের ব্যবহার' }
    ],
    pages: [
      {
        pageNo: 1,
        title: 'হিমবাহ ও নদীর ক্ষয়কার্যে সৃষ্ট ভূমিরূপ',
        content: `# বহির্জাত প্রক্রিয়া ও ভূমিরূপ
### ১. নদীর ক্ষয়কার্যে গঠিত ভূমিরূপ:
- **'I' ও 'V' আকৃতির উপত্যকা**: উচ্চগতিতে নদীর প্রবল নিম্নক্ষয়ের ফলে গিরিখাত ও ক্যানিয়ন তৈরি হয়।
- **জলপ্রপাত**: কঠিন ও কোমল শিলাস্তর উলম্বভাবে থাকলে গঠিত হয়।
- **মন্থকূপ (Pot holes)**: নদীর তলদেশে ঘূর্ণমান প্রস্তরখণ্ড দ্বারা সৃষ্ট গর্ত।

### ২. হিমবাহের ক্ষয়কার্যে গঠিত ভূমিরূপ:
- **'U' আকৃতির উপত্যকা বা হিমদ্রোণী**
- **সার্ক বা কোরি (Cirque)**
- **ঝুলন্ত উপত্যকা (Hanging Valley)**`
      }
    ]
  }
];
