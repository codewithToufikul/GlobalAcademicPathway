export const NAV_LINKS = [
  "Home",
  "About",
  "Events",
  "Services",
  "Universities",
  "Contact",
];

export const DESTINATIONS = [
  {
    country: "United Kingdom",
    code: "GB",
    tag: "Primary focus",
    universities: "160+",
    programs: "3,000+",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
    description:
      "Home to top-ranked universities like Oxford, Cambridge, and Imperial College London. Offers 1-Year Masters and 2-Year Post-Study Work Visa (PSW).",
    intake: "Sep / Jan",
    benefits: [
      "MRes (Masters of Research) courses available",
      "Support in post study work visa",
      "Opportunity to work while studying",
      "World-class Education System",
      "Connect to local community though us.",
    ],
  },
  {
    country: "USA",
    code: "US",
    tag: "Top Choice",
    universities: "4,000+",
    programs: "10,000+",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80",
    description:
      "The global leader in higher education with prestigious Ivy League schools and cutting-edge research facilities. Home to Silicon Valley tech giants.",
    intake: "Fall / Spring",
    benefits: [
      "OPT (Optional Practical Training) up to 3 years for STEM",
      "Unmatched global prestige",
      "Diverse campus culture",
      "High flexibility in course selection",
      "Leading innovation and research hubs",
    ],
  },
  {
    country: "Canada",
    code: "CA",
    tag: "Student Friendly",
    universities: "100+",
    programs: "5,000+",
    image:
      "https://images.unsplash.com/photo-1517935707175-e0636989bf4e?w=1200&q=80",
    description:
      "Renowned for its high quality of life, multicultural environment, and generous post-graduation work permits and immigration pathways.",
    intake: "Fall / Winter / Summer",
    benefits: [
      "Post-Graduation Work Permit (PGWP) up to 3 years",
      "High quality of life and safety",
      "Pathways to Permanent Residency (PR)",
      "Lower tuition fees compared to USA/UK",
      "Inclusive multicultural society",
    ],
  },
  {
    country: "Australia",
    code: "AU",
    tag: "Future Ready",
    universities: "43",
    programs: "2,000+",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&q=80",
    description:
      "Known for its excellence in research, vibrant student cities, and strong emphasis on practical skills and industry connections.",
    intake: "Feb / July",
    benefits: [
      "Generous Post-Study Work (PSW) rights",
      "High standard of living",
      "Work up to 48 hours per fortnight",
      "Strong economy and job market",
      "Beautiful climate and outdoor lifestyle",
    ],
  },
];

export const SERVICES = [
  {
    icon: "GraduationCap",
    title: "University Selection",
    desc: "We match you with the universities that align with your academic profile, goals, and budget.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: "FileText",
    title: "Application Support",
    desc: "End-to-end application management including SOP, LOR, and document preparation.",
    color: "from-sky-500 to-blue-600",
    requirements: [
      {
        title: "1. Academic Documents",
        important: true,
        items: [
          "SSC / O-Level certificates",
          "HSC / A-Level certificates",
          "Academic transcripts (mark sheets)",
          "Bachelor’s degree certificate (for postgraduate)",
        ],
      },
      {
        title: "2. English Language Test",
        info: "Typical requirement: Undergrad 6.0–6.5 | Postgrad 6.5–7.0",
        items: [
          "IELTS Academic (most common)",
          "OR TOEFL / PTE / Duolingo (if accepted)",
        ],
      },
      {
        title: "3. Personal Statement (SOP)",
        items: [
          "Why you chose the course and university",
          "Why you chose the UK",
          "Your future goals",
        ],
      },
      {
        title: "4. Reference / Recommendation Letter",
        items: [
          "Teachers (for undergraduate)",
          "Professors or employers (for postgraduate)",
        ],
      },
      {
        title: "5. Valid Passport",
        items: ["Include scanned copy (Required for both admission and visa)"],
      },
      {
        title: "6. CV / Resume",
        info: "Required especially for master’s program",
        items: ["Education", "Work experience", "Skills"],
      },
    ],
  },
  {
    icon: "ShieldCheck",
    title: "Visa Processing",
    desc: "Expert visa counseling with high success rates for student visas worldwide.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: "Coins",
    title: "Scholarship Guidance",
    desc: "Identify and apply for scholarships to reduce your financial burden significantly.",
    color: "from-blue-600 to-sky-700",
  },
  {
    icon: "Mic",
    title: "Interview Preparation",
    desc: "Mock interviews and coaching to help you ace embassy and university interviews.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: "PlaneTakeoff",
    title: "Pre-Departure Briefing",
    desc: "Travel guidance, accommodation help, and cultural orientation before you fly.",
    color: "from-blue-600 to-indigo-700",
    requirements: [
      {
        title: "Accommodation",
        info: "Do you need accommodation? We will provide guidance.",
        items: [
          "University / college managed halls of residence",
          "Private student accommodation options",
          "Homestay with local families",
          "Shared private rental guidance",
          "Cost estimates and budgeting tips",
        ],
      },
      {
        title: "Part-Time Work",
        info: "Do you need a part-time job? We will help you navigate UK work rules.",
        items: [
          "Student visa work restrictions (max 20 hrs/week during term)",
          "How to get a National Insurance (NI) number",
          "Finding campus and local part-time jobs",
          "Tips for balancing work and studies",
        ],
      },
      {
        title: "Local Community & Networking",
        info: "Do you need to connect with local community and networks? We will guide you.",
        items: [
          "Bangladeshi & South Asian student societies",
          "University international student groups",
          "Professional networking events & LinkedIn tips",
          "Mosque, cultural & religious community contacts",
          "Mental health & student wellbeing resources",
        ],
      },
    ],
  },
];

export const STEPS = [
  {
    num: "01",
    icon: "Search",
    title: "Choose Your Program",
    desc: "Browse thousands of programs across 50+ countries and find your perfect match.",
  },
  {
    num: "02",
    icon: "ClipboardList",
    title: "Submit Your Application",
    desc: "Our experts prepare and submit your application with all required documents.",
  },
  {
    num: "03",
    icon: "Landmark",
    title: "Get Your Student Visa",
    desc: "We guide you through the visa process with expert advice and documentation support.",
  },
  {
    num: "04",
    icon: "Plane",
    title: "Fly & Start Studying",
    desc: "Board your flight and begin your international academic journey with confidence.",
  },
];

export const UNIVERSITIES = [
  {
    name: "University of Greenwich",
    country: "UK",
    rank: "#801-1000 QS",
    field: "Business & Computing",
  },
  {
    name: "University of Hertfordshire",
    country: "UK",
    rank: "#801-1000 QS",
    field: "Engineering & Health",
  },
  {
    name: "Ravensbourne University London",
    country: "UK",
    rank: "Top Design Sc.",
    field: "Design & Digital Media",
  },
  {
    name: "BPP University",
    country: "UK",
    rank: "Career Focused",
    field: "Law & Business",
  },
  {
    name: "Anglia Ruskin University",
    country: "UK",
    rank: "#301-350 THE",
    field: "Health & Education",
  },
  {
    name: "University of Hull",
    country: "UK",
    rank: "#523 QS World",
    field: "Science & Engineering",
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    country: "Studying in UK 🇬🇧",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Global Academic Pathway made my dream of studying at University of Greenwich a reality. Their support with my application and scholarship was exceptional!",
    university: "University of Greenwich",
    program: "MSc Data Science",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    country: "Studying in UK 🇬🇧",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "From selecting the course to getting my visa, they supported me at every step. Highly recommend their guidance for admission to University of Hertfordshire!",
    university: "University of Hertfordshire",
    program: "MBA",
    rating: 5,
  },
  {
    name: "Liu Wei",
    country: "Studying in UK 🇬🇧",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "The team helped me secure my place at Ravensbourne University London. Their creative portfolio guidance and SOP support were outstanding.",
    university: "Ravensbourne University London",
    program: "MA Digital Media",
    rating: 5,
  },
  {
    name: "Fatima Malik",
    country: "Studying in UK 🇬🇧",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    review:
      "I was confused about Law schools, but their counselors gave me a clear roadmap for BPP University. Now I'm pursuing my legal career in London!",
    university: "BPP University",
    program: "Master of Laws (LLM)",
    rating: 5,
  },
];

export const PARTNERS = [
  "University of Greenwich",
  "University of Hertfordshire",
  "Ravensbourne University London",
  "BPP University",
  "Anglia Ruskin University",
  "University of Hull",
  "Aston University",
  "Cardiff Metropolitan University",
];

export const COUNTRIES = [
  { name: "Bangladesh", code: "BD", flag: "🇧🇩", dialCode: "+880" },
  { name: "India", code: "IN", flag: "🇮🇳", dialCode: "+91" },
  { name: "Pakistan", code: "PK", flag: "🇵🇰", dialCode: "+92" },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰", dialCode: "+94" },
  { name: "Nepal", code: "NP", flag: "🇳🇵", dialCode: "+977" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { name: "USA", code: "US", flag: "🇺🇸", dialCode: "+1" },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { name: "Australia", code: "AU", flag: "🇦🇺", dialCode: "+61" },
  { name: "Germany", code: "DE", flag: "🇩🇪", dialCode: "+49" },
  { name: "France", code: "FR", flag: "🇫🇷", dialCode: "+33" },
  { name: "Ireland", code: "IE", flag: "🇮🇪", dialCode: "+353" },
  { name: "Sweden", code: "SE", flag: "🇸🇪", dialCode: "+46" },
  { name: "Denmark", code: "DK", flag: "🇩🇰", dialCode: "+45" },
  { name: "Norway", code: "NO", flag: "🇳🇴", dialCode: "+47" },
  { name: "Finland", code: "FI", flag: "🇫🇮", dialCode: "+358" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", dialCode: "+41" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", dialCode: "+60" },
  { name: "Singapore", code: "SG", flag: "🇸🇬", dialCode: "+65" },
  { name: "UAE", code: "AE", flag: "🇦🇪", dialCode: "+971" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", dialCode: "+966" },
  { name: "Qatar", code: "QA", flag: "🇶🇦", dialCode: "+974" },
  { name: "China", code: "CN", flag: "🇨🇳", dialCode: "+86" },
  { name: "Japan", code: "JP", flag: "🇯🇵", dialCode: "+81" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", dialCode: "+82" },
  { name: "Italy", code: "IT", flag: "🇮🇹", dialCode: "+39" },
  { name: "Spain", code: "ES", flag: "🇪🇸", dialCode: "+34" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", dialCode: "+31" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", dialCode: "+64" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", dialCode: "+27" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", dialCode: "+234" },
  { name: "Egypt", code: "EG", flag: "🇪🇬", dialCode: "+20" },
  { name: "Turkey", code: "TR", flag: "🇹🇷", dialCode: "+90" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", dialCode: "+55" },
];

export const EVENTS = [
  {
    id: "uk-virtual-open-day-2025",
    title: "UK University Virtual Open Day 2025",
    date: "May 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Online (Zoom)",
    image:
      "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&q=80",
    description:
      "Meet representatives from top UK universities directly. Get on-spot assessment and application guidance.",
    category: "Virtual Event",
    featured: true,
    status: "Upcoming",
  },
  {
    id: "visa-guidance-seminar-dhaka",
    title: "Student Visa Guidance Seminar",
    date: "May 22, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Panthapath, Dhaka",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    description:
      "Unlock the secrets to a successful student visa application. Expert tips on documentation and interview prep.",
    category: "Seminar",
    featured: false,
    status: "Upcoming",
  },
  {
    id: "spot-admission-greenwich",
    title: "Spot Admission: University of Greenwich",
    date: "June 05, 2025",
    time: "11:00 AM - 3:00 PM",
    location: "Pan Pacific Sonargaon, Dhaka",
    image:
      "https://images.unsplash.com/photo-1523050338692-7b835a07973f?w=800&q=80",
    description:
      "Apply directly to the University of Greenwich and get your offer letter within 48 hours. Bring your documents!",
    category: "Admission Day",
    featured: false,
    status: "Upcoming",
  },
  {
    id: "past-uk-intake-expo",
    title: "UK September Intake Expo 2024",
    date: "August 10, 2024",
    time: "Full Day",
    location: "Online",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74dea327912?w=800&q=80",
    description:
      "Our biggest expo of the year with over 50 universities participating.",
    category: "Expo",
    featured: false,
    status: "Past",
  },
];
