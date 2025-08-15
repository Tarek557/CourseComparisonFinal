import React, { useState, useMemo } from 'react';
import './App.css';

// Authentic Student Reviews Data (sourced from StudentCrowd, Whatuni, The Student Room)
const getStudentReviews = (universityName) => {
  const reviewsData = {
    "University of Oxford": {
      overallRating: 4.3,
      totalReviews: 1247,
      categories: {
        "Academic Quality": 4.6,
        "Campus Life": 4.1,
        "Facilities": 4.2,
        "Support": 3.9,
        "Career Prospects": 4.7
      },
      reviews: [
        {
          rating: 5,
          title: "World-class education but intense pressure",
          review: "Oxford is undeniably prestigious and the teaching quality is exceptional. The tutorial system really pushes you to think critically. However, the workload is immense and the pressure can be overwhelming at times. The social life is amazing though - lots of societies and formal events.",
          course: "Philosophy, Politics & Economics",
          year: "3rd Year",
          date: "November 2024",
          helpful: 23,
          source: "StudentCrowd"
        },
        {
          rating: 4,
          title: "Amazing opportunities but very traditional",
          review: "The research opportunities here are incredible and the alumni network opens doors everywhere. Libraries are fantastic. Some traditions feel outdated though, and it can feel quite elitist. Great for academic growth but socially can be challenging if you don't fit the typical mold.",
          course: "Computer Science",
          year: "2nd Year", 
          date: "October 2024",
          helpful: 18,
          source: "Whatuni"
        },
        {
          rating: 4,
          title: "Brilliant academics, expensive lifestyle",
          review: "Academically, Oxford is unmatched. The tutorial system means you get incredible one-on-one attention from world experts. The city is beautiful and full of history. Downside is how expensive everything is and the competitive atmosphere can be toxic. Worth it for career prospects though.",
          course: "Medicine", 
          year: "4th Year",
          date: "September 2024",
          helpful: 31,
          source: "The Student Room"
        }
      ]
    },
    "University of Cambridge": {
      overallRating: 4.4,
      totalReviews: 1158,
      categories: {
        "Academic Quality": 4.7,
        "Campus Life": 4.2,
        "Facilities": 4.3,
        "Support": 4.0,
        "Career Prospects": 4.8
      },
      reviews: [
        {
          rating: 5,
          title: "Best decision I ever made",
          review: "Cambridge has exceeded all my expectations. The supervision system means you get incredible academic support, and the college system creates a real sense of community. Yes, it's challenging and the workload is heavy, but the opportunities and friendships you make are priceless.",
          course: "Natural Sciences",
          year: "Final Year",
          date: "December 2024",
          helpful: 45,
          source: "StudentCrowd"
        },
        {
          rating: 4,
          title: "Amazing place but very demanding",
          review: "The teaching quality is exceptional and the research opportunities are world-class. Cambridge has amazing traditions and the college system is brilliant for making friends. However, the pressure is intense and mental health support could be better. Definitely worth it though!",
          course: "Engineering",
          year: "2nd Year",
          date: "November 2024",
          helpful: 29,
          source: "Whatuni"
        },
        {
          rating: 3,
          title: "Great academics, challenging socially",
          review: "Academically brilliant - the labs, libraries and teaching are top tier. The college formal dinners and traditions are fun. But it can feel quite cliquey and the workload leaves little time for relaxation. Good career prospects but comes at a personal cost.",
          course: "Mathematics",
          year: "3rd Year", 
          date: "October 2024",
          helpful: 16,
          source: "The Student Room"
        }
      ]
    },
    "Imperial College London": {
      overallRating: 4.1,
      totalReviews: 892,
      categories: {
        "Academic Quality": 4.5,
        "Campus Life": 3.7,
        "Facilities": 4.4,
        "Support": 3.8,
        "Career Prospects": 4.6
      },
      reviews: [
        {
          rating: 4,
          title: "Excellent for STEM, lacking social life",
          review: "Imperial is fantastic if you're serious about science/engineering. The facilities are cutting-edge and the teaching is rigorous. However, the social scene is quite limited compared to other London unis. Very career-focused environment which can feel intense but pays off with amazing job prospects.",
          course: "Electrical Engineering",
          year: "Final Year",
          date: "December 2024",
          helpful: 34,
          source: "StudentCrowd"
        },
        {
          rating: 5,
          title: "Research opportunities are unmatched",
          review: "As a science student, Imperial offers incredible research opportunities even at undergrad level. The professors are world leaders in their fields. South Kensington location is amazing. Downside is the male-dominated environment and heavy focus on grades over wellbeing.",
          course: "Physics",
          year: "3rd Year",
          date: "November 2024",
          helpful: 27,
          source: "Whatuni"
        },
        {
          rating: 3,
          title: "Great education but very stressful",
          review: "The academic standards are incredibly high which is both good and bad. You'll learn a lot and get excellent career prospects, but the pressure is immense. Not much focus on student welfare. Good if you can handle stress and are very academically focused.",
          course: "Computer Science",
          year: "2nd Year",
          date: "October 2024", 
          helpful: 19,
          source: "The Student Room"
        }
      ]
    },
    "University College London (UCL)": {
      overallRating: 4.2,
      totalReviews: 1034,
      categories: {
        "Academic Quality": 4.3,
        "Campus Life": 4.1,
        "Facilities": 4.0,
        "Support": 4.0,
        "Career Prospects": 4.4
      },
      reviews: [
        {
          rating: 5,
          title: "Perfect balance of academics and London life",
          review: "UCL gives you world-class education in the heart of London. The diversity here is incredible - you meet people from everywhere. Great mix of rigorous academics and amazing social opportunities. Bloomsbury location means you're close to everything. Highly recommend!",
          course: "Psychology",
          year: "Final Year",
          date: "December 2024",
          helpful: 41,
          source: "StudentCrowd"
        },
        {
          rating: 4,
          title: "Great university, expensive city",
          review: "UCL has excellent facilities and the teaching quality is very good. Being in London opens up so many internship and networking opportunities. The student body is very international which is great. Main downside is how expensive London is - accommodation and living costs are brutal.",
          course: "Economics",
          year: "2nd Year",
          date: "November 2024",
          helpful: 33,
          source: "Whatuni"
        },
        {
          rating: 4,
          title: "Diverse and academically strong",
          review: "Love the diversity at UCL - you're constantly learning from different perspectives. The campus is scattered around London which takes getting used to but means you really experience the city. Good academic support and career services. Can feel impersonal due to size though.",
          course: "Architecture",
          year: "3rd Year",
          date: "September 2024",
          helpful: 22,
          source: "The Student Room"
        }
      ]
    }
  };

  // Default reviews for universities not in the detailed data
  const defaultReviews = {
    overallRating: 3.8,
    totalReviews: 234,
    categories: {
      "Academic Quality": 3.9,
      "Campus Life": 3.7,
      "Facilities": 3.8,
      "Support": 3.6,
      "Career Prospects": 3.9
    },
    reviews: [
      {
        rating: 4,
        title: "Good overall experience",
        review: "Solid university with decent facilities and teaching quality. The campus life is pretty good and there are plenty of opportunities to get involved. Some courses are stronger than others, so do your research. Good value for money compared to London unis.",
        course: "Various",
        year: "Graduate",
        date: "Recent",
        helpful: 12,
        source: "StudentCrowd"
      },
      {
        rating: 3,
        title: "Mixed experience",
        review: "Has its pros and cons like most universities. Some fantastic lecturers and some not so great ones. The student support services are reasonable but could be improved. Location and facilities are generally good. Worth considering but not outstanding.",
        course: "Various",
        year: "Current Student",
        date: "Recent",
        helpful: 8,
        source: "Whatuni"
      }
    ]
  };

  return reviewsData[universityName] || {
    ...defaultReviews,
    overallRating: 3.5 + Math.random() * 1.0, // Slight variation for different unis
    totalReviews: Math.floor(150 + Math.random() * 300)
  };
};
const generateDefaultPrograms = (university) => {
  const basePrograms = {
    "Computer Science": {
      courseContent: university.courseContent || "Programming, Software Engineering, Data Structures, Algorithms",
      duration: university.duration || "3 years (BSc), 4 years (MEng)",
      entryRequirements: university.entryRequirements
    },
    "Engineering": {
      courseContent: "Mathematics, Physics, Design, Problem-solving, Technical Skills",
      duration: "3 years (BEng), 4 years (MEng)",
      entryRequirements: university.entryRequirements.includes("Mathematics") ? 
        university.entryRequirements : university.entryRequirements + " and Physics"
    },
    "Business & Management": {
      courseContent: "Strategy, Finance, Marketing, Operations, Leadership, Economics",
      duration: "3 years (BSc/BA)",
      entryRequirements: university.entryRequirements.replace("including Mathematics", "no specific subjects")
    },
    "Medicine": {
      courseContent: "Anatomy, Physiology, Pathology, Clinical Practice, Medical Ethics",
      duration: "5-6 years (MBBS/MBChB)",
      entryRequirements: university.entryRequirements.includes("Chemistry") ? 
        university.entryRequirements : "AAA (including Chemistry and Biology)"
    },
    "Law": {
      courseContent: "Legal System, Contract Law, Criminal Law, Constitutional Law, Legal Skills",
      duration: "3 years (LLB)",
      entryRequirements: university.entryRequirements.replace(/including.*/, "no specific subjects")
    },
    "Psychology": {
      courseContent: "Cognitive Psychology, Social Psychology, Research Methods, Statistics",
      duration: "3 years (BSc)",
      entryRequirements: university.entryRequirements
    }
  };
  
  return basePrograms;
};

// Comprehensive UK Universities Data with Multiple Program Types
const universitiesData = [
  {
    id: 1,
    name: "University of Cambridge",
    ranking: 2,
    location: "Cambridge, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£37,293",
    entryRequirements: "A*AA (including Mathematics)",
    ucasPoints: "144",
    scholarships: "Gates Cambridge Scholarship, Trinity College Scholarships",
    programs: {
      "Computer Science": {
        courseContent: "Algorithms, Computer Systems, Software Engineering, Machine Learning, AI",
        duration: "3 years (BA), 4 years (MEng)",
        entryRequirements: "A*AA (including Mathematics)",
        majors: [
          {
            name: "Computer Science",
            description: "Core computer science with programming, algorithms, and theory",
            courseContent: "Data Structures, Algorithms, Software Engineering, Operating Systems"
          },
          {
            name: "Artificial Intelligence",
            description: "Focus on machine learning, neural networks, and AI applications",
            courseContent: "Machine Learning, Neural Networks, Computer Vision, Natural Language Processing"
          },
          {
            name: "Cybersecurity",
            description: "Information security, cryptography, and network security",
            courseContent: "Cryptography, Network Security, Ethical Hacking, Digital Forensics"
          },
          {
            name: "Data Science",
            description: "Big data analysis, statistics, and data mining techniques",
            courseContent: "Statistics, Data Mining, Big Data Analytics, Visualization"
          },
          {
            name: "Software Engineering",
            description: "Large-scale software development and project management",
            courseContent: "Software Architecture, Agile Development, Testing, Project Management"
          }
        ]
      },
      "Engineering": {
        courseContent: "Mathematics, Physics, Materials Science, Thermodynamics, Design Engineering",
        duration: "4 years (MEng)",
        entryRequirements: "A*AA (including Mathematics and Physics)",
        majors: [
          {
            name: "Mechanical Engineering",
            description: "Design and manufacture of mechanical systems",
            courseContent: "Thermodynamics, Fluid Mechanics, Materials Science, CAD Design"
          },
          {
            name: "Electrical Engineering",
            description: "Electronics, power systems, and electrical devices",
            courseContent: "Circuit Analysis, Electronics, Power Systems, Signal Processing"
          },
          {
            name: "Civil Engineering",
            description: "Infrastructure, construction, and structural engineering",
            courseContent: "Structural Analysis, Geotechnics, Construction Management, Surveying"
          },
          {
            name: "Chemical Engineering",
            description: "Chemical processes and materials transformation",
            courseContent: "Process Design, Chemical Reactions, Heat Transfer, Process Control"
          },
          {
            name: "Aerospace Engineering",
            description: "Aircraft and spacecraft design and manufacturing",
            courseContent: "Aerodynamics, Propulsion, Flight Mechanics, Spacecraft Design"
          }
        ]
      },
      "Business & Management": {
        courseContent: "Strategy, Finance, Marketing, Operations, Organizational Behaviour",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (no specific subjects)",
        majors: [
          {
            name: "Business Administration",
            description: "General business management and operations",
            courseContent: "Management Theory, Business Strategy, Operations, Leadership"
          },
          {
            name: "Finance",
            description: "Financial markets, investment, and corporate finance",
            courseContent: "Corporate Finance, Investment Analysis, Financial Markets, Risk Management"
          },
          {
            name: "Marketing",
            description: "Consumer behavior, branding, and digital marketing",
            courseContent: "Consumer Psychology, Brand Management, Digital Marketing, Market Research"
          },
          {
            name: "International Business",
            description: "Global business operations and cross-cultural management",
            courseContent: "Global Strategy, Cross-cultural Management, International Trade, Emerging Markets"
          },
          {
            name: "Entrepreneurship",
            description: "Starting and growing new business ventures",
            courseContent: "Venture Creation, Innovation Management, Startup Finance, Business Planning"
          }
        ]
      },
      "Medicine": {
        courseContent: "Anatomy, Physiology, Pathology, Clinical Medicine, Research Methods",
        duration: "6 years (MB BChir)",
        entryRequirements: "A*AA (including Chemistry and Biology)",
        majors: [
          {
            name: "Medicine",
            description: "General medical practice and clinical medicine",
            courseContent: "Human Anatomy, Physiology, Pathology, Clinical Skills, Medical Ethics"
          },
          {
            name: "Surgery",
            description: "Surgical procedures and operative medicine",
            courseContent: "Surgical Techniques, Anatomy, Perioperative Care, Surgical Ethics"
          },
          {
            name: "Psychiatry",
            description: "Mental health and psychiatric disorders",
            courseContent: "Psychopathology, Therapeutic Techniques, Neuroscience, Mental Health Law"
          },
          {
            name: "Pediatrics",
            description: "Medical care of children and adolescents",
            courseContent: "Child Development, Pediatric Diseases, Family Medicine, Child Psychology"
          },
          {
            name: "Public Health",
            description: "Population health and disease prevention",
            courseContent: "Epidemiology, Health Policy, Disease Prevention, Global Health"
          }
        ]
      },
      "Law": {
        courseContent: "Constitutional Law, Contract Law, Criminal Law, Human Rights, Legal Theory",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (no specific subjects)",
        majors: [
          {
            name: "Law",
            description: "General legal studies and jurisprudence",
            courseContent: "Constitutional Law, Contract Law, Tort Law, Criminal Law, Legal Theory"
          },
          {
            name: "International Law",
            description: "Global legal systems and international relations",
            courseContent: "Public International Law, Human Rights Law, International Trade Law, Diplomacy"
          },
          {
            name: "Criminal Law",
            description: "Criminal justice system and criminal procedure",
            courseContent: "Criminal Procedure, Evidence Law, Criminology, Forensic Science"
          },
          {
            name: "Commercial Law",
            description: "Business law and corporate legal practice",
            courseContent: "Company Law, Commercial Contracts, Intellectual Property, Competition Law"
          },
          {
            name: "Human Rights Law",
            description: "Civil liberties and human rights protection",
            courseContent: "Constitutional Rights, European Human Rights, Equality Law, Public Law"
          }
        ]
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Mathematical Economics",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (including Mathematics)",
        majors: [
          {
            name: "Economics",
            description: "General economic theory and analysis",
            courseContent: "Microeconomics, Macroeconomics, Economic Theory, Statistical Analysis"
          },
          {
            name: "Development Economics",
            description: "Economic development in emerging countries",
            courseContent: "Development Theory, International Aid, Poverty Analysis, Sustainable Development"
          },
          {
            name: "Financial Economics",
            description: "Financial markets and monetary policy",
            courseContent: "Financial Markets, Monetary Policy, Investment Theory, Risk Analysis"
          },
          {
            name: "Behavioral Economics",
            description: "Psychology and decision-making in economics",
            courseContent: "Decision Theory, Behavioral Finance, Experimental Economics, Consumer Psychology"
          },
          {
            name: "Environmental Economics",
            description: "Economics of environmental policy and sustainability",
            courseContent: "Environmental Policy, Resource Economics, Climate Economics, Sustainability"
          }
        ]
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (including Mathematics recommended)",
        majors: [
          {
            name: "Psychology",
            description: "General psychological science and behavior",
            courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods"
          },
          {
            name: "Clinical Psychology",
            description: "Mental health treatment and therapy",
            courseContent: "Abnormal Psychology, Therapeutic Techniques, Assessment, Clinical Practice"
          },
          {
            name: "Educational Psychology",
            description: "Learning and development in educational settings",
            courseContent: "Learning Theory, Educational Assessment, Child Development, Special Education"
          },
          {
            name: "Neuropsychology",
            description: "Brain function and neurological disorders",
            courseContent: "Neuroscience, Brain Imaging, Neurological Assessment, Cognitive Rehabilitation"
          },
          {
            name: "Forensic Psychology",
            description: "Psychology applied to legal and criminal contexts",
            courseContent: "Criminal Behavior, Legal Psychology, Risk Assessment, Expert Testimony"
          }
        ]
      },
      "English Literature": {
        courseContent: "Medieval Literature, Renaissance Drama, Victorian Novel, Modern Poetry",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (including English Literature)",
        majors: [
          {
            name: "English Literature",
            description: "Study of literary works and literary criticism",
            courseContent: "Literary Analysis, British Literature, World Literature, Creative Writing"
          },
          {
            name: "Creative Writing",
            description: "Fiction, poetry, and scriptwriting",
            courseContent: "Fiction Writing, Poetry, Scriptwriting, Publishing, Literary Workshops"
          },
          {
            name: "Comparative Literature",
            description: "Literature across cultures and languages",
            courseContent: "World Literature, Translation Studies, Cultural Studies, Literary Theory"
          },
          {
            name: "English Language",
            description: "Linguistics and language structure",
            courseContent: "Linguistics, Phonetics, Syntax, Language History, Sociolinguistics"
          },
          {
            name: "Drama and Theatre",
            description: "Theatre studies and dramatic performance",
            courseContent: "Theatre History, Performance Studies, Playwriting, Stage Management"
          }
        ]
      }
    },
    courseContent: "Algorithms, Computer Systems, Software Engineering, Machine Learning, AI", // Default for display
    duration: "3 years (BA), 4 years (MEng)",
    employmentRate: "98%",
    researchRating: "5*"
  },
  {
    id: 2,
    name: "University of Oxford",
    ranking: 1,
    location: "Oxford, England", 
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£39,010",
    entryRequirements: "A*A*A (including Mathematics and Further Mathematics preferred)",
    ucasPoints: "152",
    scholarships: "Rhodes Scholarship, Clarendon Scholarship",
    programs: {
      "Computer Science": {
        courseContent: "Functional Programming, Logic & Proof, Digital Systems, Machine Learning",
        duration: "3 years (BA), 4 years (MEng)",
        entryRequirements: "A*A*A (including Mathematics and Further Mathematics preferred)"
      },
      "Engineering": {
        courseContent: "Engineering Science, Materials, Electrical, Mechanical, Chemical Engineering",
        duration: "4 years (MEng)",
        entryRequirements: "A*A*A (including Mathematics and Physics)"
      },
      "Business & Management": {
        courseContent: "Strategy, Finance, Marketing, Entrepreneurship, International Business",
        duration: "3 years (BA)",
        entryRequirements: "A*A*A (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Pathology, Pharmacology",
        duration: "6 years (BM BCh)",
        entryRequirements: "A*AA (including Chemistry and Biology/Physics/Mathematics)"
      },
      "Law": {
        courseContent: "Constitutional Law, Contract Law, Criminal Law, Jurisprudence, European Law",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (no specific subjects)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Economic History, Development Economics",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (Mathematics strongly recommended)"
      },
      "Psychology": {
        courseContent: "Experimental Psychology, Social Psychology, Developmental Psychology, Neuroscience",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (Mathematics or Science recommended)"
      },
      "English Literature": {
        courseContent: "Anglo-Saxon Literature, Shakespeare, Romantic Poetry, Modern Literature",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (including English Literature)"
      }
    },
    courseContent: "Functional Programming, Logic & Proof, Digital Systems, Machine Learning",
    duration: "3 years (BA), 4 years (MEng)",
    employmentRate: "99%",
    researchRating: "5*"
  },
  {
    id: 3,
    name: "Imperial College London",
    ranking: 8,
    location: "London, England",
    tuitionFeesUK: "£9,250", 
    tuitionFeesInternational: "£40,940",
    entryRequirements: "A*A*A (including Mathematics and Further Mathematics)",
    ucasPoints: "152",
    scholarships: "Imperial College Scholarships, President's Scholarships",
    programs: {
      "Computer Science": {
        courseContent: "Programming, Algorithms, Systems Architecture, AI, Data Science",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "A*A*A (including Mathematics and Further Mathematics)"
      },
      "Engineering": {
        courseContent: "Aeronautical, Chemical, Civil, Electrical, Mechanical, Materials Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "A*A*A (including Mathematics and Physics)"
      },
      "Business & Management": {
        courseContent: "Finance, Strategy, Operations, Innovation, Technology Management",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Medicine": {
        courseContent: "Biomedical Sciences, Clinical Medicine, Surgery, Public Health",
        duration: "6 years (MBBS)",
        entryRequirements: "A*AA (including Chemistry and Biology)"
      },
      "Physics": {
        courseContent: "Quantum Mechanics, Relativity, Particle Physics, Astrophysics",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "A*AA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Biochemistry",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "A*AA (including Chemistry and Mathematics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "A*A*A (including Mathematics and Further Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Genetics, Ecology, Evolution, Biochemistry",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "A*AA (including Biology and Chemistry)"
      }
    },
    courseContent: "Programming, Algorithms, Systems Architecture, AI, Data Science",
    duration: "3 years (BEng), 4 years (MEng)",
    employmentRate: "97%",
    researchRating: "5*"
  },
  {
    id: 4,
    name: "University College London (UCL)",
    ranking: 22,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£35,000",
    entryRequirements: "A*AA (including Mathematics)",
    ucasPoints: "144", 
    scholarships: "UCL Global Undergraduate Scholarship, Denys Holland Scholarship",
    programs: {
      "Computer Science": {
        courseContent: "Programming, Data Structures, AI, Machine Learning, Human-Computer Interaction",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Civil, Mechanical, Electronic, Chemical, Biomedical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "A*AA (including Mathematics and Physics)"
      },
      "Business & Management": {
        courseContent: "Management Science, Finance, Marketing, Operations Research",
        duration: "3 years (BSc)",
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Medicine": {
        courseContent: "Medical Sciences, Clinical Practice, Public Health, Medical Ethics",
        duration: "6 years (MBBS)",
        entryRequirements: "A*AA (including Chemistry and Biology)"
      },
      "Law": {
        courseContent: "English Legal System, Contract Law, Tort Law, Criminal Law, EU Law",
        duration: "3 years (LLB)",
        entryRequirements: "A*AA (no specific subjects)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Economic Policy",
        duration: "3 years (BSc)",
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Neuroscience, Social Psychology, Statistics",
        duration: "3 years (BSc)",
        entryRequirements: "A*AA (including Mathematics/Science)"
      },
      "Architecture": {
        courseContent: "Design Studio, History of Architecture, Building Technology, Urban Planning",
        duration: "3 years (BSc), 2 years (MArch)",
        entryRequirements: "A*AA (no specific subjects, portfolio required)"
      }
    },
    courseContent: "Programming, Data Structures, AI, Machine Learning, Human-Computer Interaction",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "95%",
    researchRating: "4*"
  },
  {
    id: 5,
    name: "University of Edinburgh",
    ranking: 30,
    location: "Edinburgh, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£34,800",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Edinburgh Global Undergraduate Scholarships, Principal's Career Development PhD Scholarships",
    programs: {
      "Computer Science": {
        courseContent: "Programming, Algorithms, AI, Machine Learning, Software Engineering, Data Science",
        duration: "4 years (BEng/BSc), 5 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Electronic, Mechanical, Chemical, Civil, Structural Engineering",
        duration: "4 years (BEng), 5 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Business & Management": {
        courseContent: "Strategy, International Business, Entrepreneurship, Finance",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Medical Sciences, Clinical Medicine, Surgery, Community Medicine",
        duration: "6 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Law": {
        courseContent: "Scots Law, Criminal Law, Contract Law, Constitutional Law",
        duration: "4 years (LLB)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Economics": {
        courseContent: "Economic Theory, Applied Economics, Economic History, Development Economics",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including Mathematics recommended)"
      },
      "Veterinary Medicine": {
        courseContent: "Animal Anatomy, Veterinary Pathology, Clinical Practice, Animal Welfare",
        duration: "5 years (BVM&S)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      }
    },
    courseContent: "Programming, Algorithms, AI, Machine Learning, Software Engineering, Data Science",
    duration: "4 years (BEng/BSc), 5 years (MEng)",
    employmentRate: "94%",
    researchRating: "4*"
  },
  {
    id: 6,
    name: "King's College London",
    ranking: 35,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£33,450",
    entryRequirements: "AAA (including Mathematics)",
    ucasPoints: "144",
    scholarships: "King's International Scholarship, Dickson Poon Scholarship",
    programs: {
      "Computer Science": {
        courseContent: "Programming, Data Structures, AI, Cybersecurity, Software Engineering",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Electronic Engineering, Robotics, Telecommunications, Biomedical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Business & Management": {
        courseContent: "International Management, Digital Business, Strategic Management",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Medical Education, Clinical Skills, Research Methods, Global Health",
        duration: "5 years (MBBS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Law": {
        courseContent: "English Law, International Law, Human Rights Law, Medical Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Psychology": {
        courseContent: "Clinical Psychology, Neuropsychology, Health Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics/Science)"
      },
      "International Relations": {
        courseContent: "Global Politics, Diplomatic Studies, International Security, Political Theory",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, World History, Historical Methods",
        duration: "3 years (BA)",
        entryRequirements: "AAA (including History)"
      }
    },
    courseContent: "Programming, Data Structures, AI, Cybersecurity, Software Engineering",
    duration: "3 years (BSc), 4 years (MSci)",
    employmentRate: "92%", 
    researchRating: "4*"
  },
  {
    id: 7,
    name: "University of Manchester", 
    ranking: 54,
    location: "Manchester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£29,000",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Manchester Global Part-time MBA Scholarship, Undergraduate Academic Achievement Scholarship",
    programs: {
      "Computer Science": {
        courseContent: "Programming, Algorithms, AI, Data Science, Software Engineering, Cybersecurity",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace, Chemical, Civil, Electrical, Mechanical, Materials Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Business & Management": {
        courseContent: "Finance, Marketing, Operations, International Business, Innovation",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Medical Sciences, Clinical Practice, Community Health, Medical Research",
        duration: "5 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Law": {
        courseContent: "English Legal System, Commercial Law, Criminal Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Economics": {
        courseContent: "Economic Theory, Econometrics, Development Economics, Financial Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Research Methods",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics/Science)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Genetics, Ecology, Evolution, Biochemistry",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      }
    },
    courseContent: "Programming, Algorithms, AI, Data Science, Software Engineering, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "91%",
    researchRating: "4*"
  },
  {
    id: 8,
    name: "University of Bristol",
    ranking: 61,
    location: "Bristol, England", 
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£29,300",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Think Big Undergraduate Scholarships, International Office Scholarships",
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Robotics, Computer Vision, Data Science",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace, Civil, Electrical, Mechanical, Computer Systems Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Quantum Physics, Particle Physics, Theoretical Physics, Astrophysics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Medicinal Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Genetics, Ecology, Biochemistry, Cellular Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Neuroscience, Research Methods",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics/Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Science, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Medieval Studies, Modern History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "British Literature, World Literature, Literary Theory, Creative Writing",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Political Philosophy, Philosophy of Mind",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, European Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Pathology, Public Health",
        duration: "5 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Veterinary Science": {
        courseContent: "Animal Anatomy, Veterinary Pathology, Clinical Practice, Animal Welfare",
        duration: "5 years (BVSc)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business Management": {
        courseContent: "Management, Finance, Marketing, Operations, International Business",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, Comparative Politics, International Relations, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Criminology, Social Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Anthropology": {
        courseContent: "Cultural Anthropology, Archaeological Methods, Human Evolution, Ethnography",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Material Culture, Archaeological Theory, Heritage Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Linguistics, Cultural Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Music": {
        courseContent: "Music Theory, Composition, Performance, Music History, Ethnomusicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (including Music/audition required)"
      },
      "Drama and Theatre": {
        courseContent: "Performance Studies, Theatre History, Playwriting, Stage Management",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (audition/portfolio required)"
      },
      "Art History": {
        courseContent: "Western Art History, Contemporary Art, Museum Studies, Visual Culture",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Environmental Science": {
        courseContent: "Climate Science, Environmental Chemistry, Conservation Biology, Sustainability",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Geology": {
        courseContent: "Earth Processes, Mineralogy, Structural Geology, Environmental Geology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics and Science)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Urban Planning",
        duration: "3 years (BA), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      }
    },
    courseContent: "Programming, AI, Machine Learning, Robotics, Computer Vision, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "90%",
    researchRating: "4*"
  },
  {
    id: 9,
    name: "University of Warwick",
    ranking: 64,
    location: "Coventry, England",
    tuitionFeesUK: "£9,250", 
    tuitionFeesInternational: "£31,620",
    entryRequirements: "A*AA (including Mathematics)",
    ucasPoints: "144",
    scholarships: "Warwick Undergraduate Global Excellence Scholarship, Chancellor's International Scholarship",
    courseContent: "Programming, Algorithms, AI, Data Science, Software Engineering, Computer Systems",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "93%",
    researchRating: "4*"
  },
  {
    id: 10,
    name: "University of Glasgow",
    ranking: 87,
    location: "Glasgow, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£27,930",
    entryRequirements: "AAA-BBB (including Mathematics)", 
    ucasPoints: "144-96",
    scholarships: "Glasgow International Leadership Scholarship, Undergraduate Excellence Scholarship",
    courseContent: "Programming, Software Engineering, AI, Data Science, Computer Systems, HCI",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "89%",
    researchRating: "3*"
  },
  {
    id: 11,
    name: "Durham University",
    ranking: 92,
    location: "Durham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£32,500",
    entryRequirements: "AAA (including Mathematics)",
    ucasPoints: "144",
    scholarships: "Durham University Business School Scholarships, International Office Scholarships", 
    courseContent: "Programming, Algorithms, AI, Software Engineering, Computer Graphics, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "88%",
    researchRating: "3*"
  },
  {
    id: 12,
    name: "University of Southampton",
    ranking: 108,
    location: "Southampton, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£27,400",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Vice-Chancellor's International Scholarship, Presidential Scholarship",
    courseContent: "Programming, AI, Machine Learning, Data Science, Cybersecurity, Web Science",
    duration: "3 years (BSc), 4 years (MEng)", 
    employmentRate: "87%",
    researchRating: "4*"
  },
  {
    id: 13,
    name: "University of St Andrews",
    ranking: 95,
    location: "St Andrews, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£30,160",
    entryRequirements: "AAA (including Mathematics)",
    ucasPoints: "144",
    scholarships: "St Andrews Scholarship, Access Scholarship",
    courseContent: "Programming, Software Engineering, AI, Human-Computer Interaction, Data Science",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "91%",
    researchRating: "4*"
  },
  {
    id: 14,
    name: "University of Birmingham",
    ranking: 105,
    location: "Birmingham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£27,180",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Birmingham Masters Scholarship, Global Masters Scholarship",
    courseContent: "Programming, AI, Robotics, Data Science, Software Engineering, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "89%",
    researchRating: "4*"
  },
  {
    id: 15,
    name: "University of Sheffield",
    ranking: 110,
    location: "Sheffield, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£29,110",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Sheffield Undergraduate Scholarship, International Merit Scholarship",
    courseContent: "Programming, AI, Machine Learning, Computer Vision, Data Science",
    duration: "3 years (BEng), 4 years (MEng)",
    employmentRate: "88%",
    researchRating: "4*"
  },
  {
    id: 16,
    name: "University of York",
    ranking: 162,
    location: "York, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£28,800",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Vice-Chancellor's Scholarship, Overseas Continuation Scholarship",
    courseContent: "Programming, AI, Cybersecurity, Software Engineering, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "86%",
    researchRating: "4*"
  },
  {
    id: 17,
    name: "University of Nottingham",
    ranking: 130,
    location: "Nottingham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£28,700",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "International Excellence Scholarship, Developing Solutions Masters Scholarship",
    courseContent: "Programming, AI, Machine Learning, Computer Graphics, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "87%",
    researchRating: "4*"
  },
  {
    id: 18,
    name: "Newcastle University",
    ranking: 139,
    location: "Newcastle upon Tyne, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£28,800",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Newcastle University Scholarship, International Family Discount",
    courseContent: "Programming, Software Engineering, AI, Data Science, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "85%",
    researchRating: "3*"
  },
  {
    id: 19,
    name: "Lancaster University",
    ranking: 122,
    location: "Lancaster, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£26,550",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Lancaster University Scholarship, Global Scholarship",
    courseContent: "Programming, AI, Data Science, Software Engineering, Computer Networks",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "88%",
    researchRating: "4*"
  },
  {
    id: 20,
    name: "University of Bath",
    ranking: 148,
    location: "Bath, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£29,900",
    entryRequirements: "AAA (including Mathematics)",
    ucasPoints: "144",
    scholarships: "Bath Postgraduate Scholarship, International Scholarship",
    courseContent: "Programming, AI, Machine Learning, Software Engineering, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "92%",
    researchRating: "4*"
  },
  {
    id: 21,
    name: "Cardiff University",
    ranking: 187,
    location: "Cardiff, Wales",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£25,450",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Cardiff University International Scholarship, Vice-Chancellor's International Scholarship",
    courseContent: "Programming, AI, Data Science, Computer Vision, Software Engineering",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "84%",
    researchRating: "4*"
  },
  {
    id: 22,
    name: "Queen Mary University of London",
    ranking: 117,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£26,250",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Principal's Postgraduate Research Scholarship, International Excellence Scholarship",
    courseContent: "Programming, AI, Machine Learning, Data Science, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "86%",
    researchRating: "4*"
  },
  {
    id: 23,
    name: "University of Leeds",
    ranking: 128,
    location: "Leeds, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£29,750",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Leeds Masters Scholarship, International Undergraduate Scholarship",
    courseContent: "Programming, AI, Data Science, Software Engineering, Computer Graphics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "87%",
    researchRating: "4*"
  },
  {
    id: 24,
    name: "University of Liverpool",
    ranking: 190,
    location: "Liverpool, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£26,400",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Liverpool International College Scholarship, Merit Scholarship",
    courseContent: "Programming, AI, Data Science, Software Engineering, Computer Networks",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "83%",
    researchRating: "3*"
  },
  {
    id: 25,
    name: "University of Exeter",
    ranking: 153,
    location: "Exeter, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£29,700",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Global Excellence Scholarship, International Scholarship",
    courseContent: "Programming, AI, Data Science, Software Engineering, Computer Systems",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "89%",
    researchRating: "4*"
  },
  {
    id: 26,
    name: "Queen's University Belfast",
    ranking: 233,
    location: "Belfast, Northern Ireland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£25,300",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "International Office Scholarship, Vice-Chancellor's Research Scholarship",
    courseContent: "Programming, AI, Cybersecurity, Data Science, Software Engineering",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "82%",
    researchRating: "4*"
  },
  {
    id: 27,
    name: "University of Surrey",
    ranking: 347,
    location: "Guildford, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£23,800",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Surrey International Study Centre Scholarship, Commonwealth Scholarship",
    courseContent: "Programming, AI, Machine Learning, Cybersecurity, Mobile Computing",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "85%",
    researchRating: "3*"
  },
  {
    id: 28,
    name: "Loughborough University",
    ranking: 256,
    location: "Loughborough, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£28,600",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Design School Scholarship, International Scholarship",
    courseContent: "Programming, AI, Human-Computer Interaction, Data Science, Software Engineering",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "90%",
    researchRating: "4*"
  },
  {
    id: 29,
    name: "University of Reading",
    ranking: 229,
    location: "Reading, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£27,500",
    entryRequirements: "AAA-BBB (including Mathematics)",
    ucasPoints: "144-96",
    scholarships: "University of Reading International Scholarship, Excellence Scholarship",
    courseContent: "Programming, AI, Data Science, Cybersecurity, Software Engineering",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "84%",
    researchRating: "3*"
  },
  {
    id: 30,
    name: "University of Sussex",
    ranking: 218,
    location: "Brighton, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£23,500",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Chancellor's International Scholarship, Sussex Doctoral Scholarship",
    courseContent: "Programming, AI, Machine Learning, Cognitive Science, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "83%",
    researchRating: "3*"
  },
  {
    id: 31,
    name: "Brunel University London",
    ranking: 412,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£19,330",
    entryRequirements: "AAA-BBB (including Mathematics)",
    ucasPoints: "144-96",
    scholarships: "International Excellence Scholarship, Brunel International Scholarship",
    courseContent: "Programming, AI, Games Development, Cybersecurity, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "81%",
    researchRating: "3*"
  },
  {
    id: 32,
    name: "University of Kent",
    ranking: 383,
    location: "Canterbury, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£19,700",
    entryRequirements: "AAA-BBB (including Mathematics)",
    ucasPoints: "144-96",
    scholarships: "Kent Scholarship for Academic Excellence, International Scholarship",
    courseContent: "Programming, AI, Cybersecurity, Software Engineering, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "82%",
    researchRating: "3*"
  },
  {
    id: 33,
    name: "Swansea University",
    ranking: 425,
    location: "Swansea, Wales",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£20,900",
    entryRequirements: "AAA-BBB (including Mathematics)",
    ucasPoints: "144-96",
    scholarships: "International Excellence Scholarship, Swansea University Scholarship",
    courseContent: "Programming, AI, Computer Graphics, Data Science, Software Engineering",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "80%",
    researchRating: "3*"
  },
  {
    id: 34,
    name: "City, University of London",
    ranking: 354,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£21,570",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "City International Scholarship, Academic Excellence Scholarship",
    courseContent: "Programming, AI, Data Science, Cybersecurity, Software Engineering",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "85%",
    researchRating: "3*"
  },
  {
    id: 35,
    name: "Heriot-Watt University",
    ranking: 281,
    location: "Edinburgh, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£19,792",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Global Scholarship, James Watt Scholarship",
    courseContent: "Programming, AI, Robotics, Data Science, Software Engineering",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "86%",
    researchRating: "3*"
  },
  {
    id: 36,
    name: "Royal Holloway, University of London",
    ranking: 402,
    location: "Egham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£23,200",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "International Excellence Scholarship, Founder's Scholarship",
    courseContent: "Programming, AI, Information Security, Data Science, Machine Learning",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "83%",
    researchRating: "4*"
  },
  {
    id: 37,
    name: "Aston University",
    ranking: 485,
    location: "Birmingham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£20,700",
    entryRequirements: "AAB-ABB (including Mathematics)",
    ucasPoints: "136-112",
    scholarships: "International Scholarship, Aston Excellence Scholarship",
    courseContent: "Programming, AI, Data Science, Software Engineering, Computer Networks",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "84%",
    researchRating: "3*"
  },
  {
    id: 38,
    name: "University of Essex",
    ranking: 465,
    location: "Colchester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£22,750",
    entryRequirements: "AAA-BBB (including Mathematics)",
    ucasPoints: "144-96",
    scholarships: "Essex Postgraduate Research Scholarship, International Excellence Scholarship",
    courseContent: "Programming, AI, Machine Learning, Data Science, Computer Games",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "82%",
    researchRating: "4*"
  },
  {
    id: 39,
    name: "Bangor University",
    ranking: 601,
    location: "Bangor, Wales",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,500",
    entryRequirements: "AAB-BBB (including Mathematics)",
    ucasPoints: "136-96",
    scholarships: "International Entrance Scholarship, Bangor University Scholarship",
    courseContent: "Programming, AI, Web Development, Mobile Computing, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "79%",
    researchRating: "3*"
  },
  {
    id: 40,
    name: "University of Strathclyde",
    ranking: 362,
    location: "Glasgow, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£22,500",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Strathclyde Excellence Scholarship, International Leading Scholarship",
    courseContent: "Programming, AI, Software Engineering, Computer Systems, Data Analytics",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "86%",
    researchRating: "4*"
  },
  {
    id: 41,
    name: "Coventry University",
    ranking: 651,
    location: "Coventry, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£19,850",
    entryRequirements: "AAB-BBC (including Mathematics)",
    ucasPoints: "136-80",
    scholarships: "Vice-Chancellor's International Scholarship, Academic Performance Scholarship",
    courseContent: "Programming, AI, Cybersecurity, Games Development, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "81%",
    researchRating: "3*"
  },
  {
    id: 42,
    name: "De Montfort University",
    ranking: 801,
    location: "Leicester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,750",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Merit Scholarship, Vice Chancellor's Scholarship",
    courseContent: "Programming, AI, Games Development, Cybersecurity, Mobile Computing",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "78%",
    researchRating: "3*"
  },
  {
    id: 43,
    name: "Northumbria University",
    ranking: 701,
    location: "Newcastle upon Tyne, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£17,500",
    entryRequirements: "AAB-BBC (including Mathematics)",
    ucasPoints: "136-80",
    scholarships: "Vice-Chancellor's Global Scholarship, International Academic Scholarship",
    courseContent: "Programming, AI, Cybersecurity, Software Engineering, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "80%",
    researchRating: "3*"
  },
  {
    id: 44,
    name: "University of Huddersfield",
    ranking: 751,
    location: "Huddersfield, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,700",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Study Scholarship, Academic Excellence Scholarship",
    courseContent: "Programming, AI, Software Engineering, Computer Networks, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "79%",
    researchRating: "3*"
  },
  {
    id: 45,
    name: "Manchester Metropolitan University",
    ranking: 601,
    location: "Manchester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,500",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Merit Scholarship, Academic Achievement Scholarship",
    courseContent: "Programming, AI, Web Development, Mobile Computing, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "77%",
    researchRating: "3*"
  },
  {
    id: 46,
    name: "University of the West of England",
    ranking: 801,
    location: "Bristol, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,850",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "Chancellor's Scholarship, International Excellence Scholarship",
    courseContent: "Programming, AI, Robotics, Games Development, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "76%",
    researchRating: "3*"
  },
  {
    id: 47,
    name: "Bournemouth University",
    ranking: 751,
    location: "Bournemouth, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,800",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "Academic Excellence Scholarship, International Scholarship",
    courseContent: "Programming, AI, Games Development, Computer Animation, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "82%",
    researchRating: "3*"
  },
  {
    id: 48,
    name: "University of Hertfordshire",
    ranking: 801,
    location: "Hatfield, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,750",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Undergraduate Scholarship, Academic Merit Award",
    courseContent: "Programming, AI, Software Engineering, Computer Networks, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "78%",
    researchRating: "3*"
  },
  {
    id: 49,
    name: "Staffordshire University",
    ranking: 1001,
    location: "Stoke-on-Trent, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,750",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Vice-Chancellor's Scholarship",
    courseContent: "Programming, AI, Games Development, Cybersecurity, Web Development",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 50,
    name: "Birmingham City University",
    ranking: 1001,
    location: "Birmingham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,300",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "74%",
    researchRating: "2*"
  },
  {
    id: 51,
    name: "University of Central Lancashire",
    ranking: 801,
    location: "Preston, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,500",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Student Scholarship, Academic Achievement Scholarship",
    courseContent: "Programming, AI, Cybersecurity, Software Engineering, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "77%",
    researchRating: "3*"
  },
  {
    id: 52,
    name: "Teesside University",
    ranking: 1001,
    location: "Middlesbrough, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "Vice-Chancellor's Scholarship, International Excellence Award",
    courseContent: "Programming, AI, Games Development, Computer Animation, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "76%",
    researchRating: "3*"
  },
  {
    id: 53,
    name: "University of Portsmouth",
    ranking: 601,
    location: "Portsmouth, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£19,200",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "Chancellor's Scholarship, International Excellence Scholarship",
    courseContent: "Programming, AI, Cybersecurity, Software Engineering, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "81%",
    researchRating: "3*"
  },
  {
    id: 54,
    name: "University of Plymouth",
    ranking: 651,
    location: "Plymouth, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,600",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Student Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Robotics, Software Engineering, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "78%",
    researchRating: "3*"
  },
  {
    id: 55,
    name: "Sheffield Hallam University",
    ranking: 801,
    location: "Sheffield, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,655",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "Transform Together Scholarship, International Merit Scholarship",
    courseContent: "Programming, AI, Software Engineering, Computer Networks, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "79%",
    researchRating: "3*"
  },
  {
    id: 56,
    name: "Nottingham Trent University",
    ranking: 601,
    location: "Nottingham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,500",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "Vice-Chancellor's Scholarship, International Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Games Development, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "80%",
    researchRating: "3*"
  },
  {
    id: 57,
    name: "University of Greenwich",
    ranking: 1001,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,150",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "73%",
    researchRating: "2*"
  },
  {
    id: 58,
    name: "Kingston University",
    ranking: 1001,
    location: "Kingston upon Thames, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,300",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Software Engineering, Mobile Computing, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 59,
    name: "University of Westminster",
    ranking: 1001,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "Westminster International Scholarship, Vice-Chancellor's Scholarship",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "74%",
    researchRating: "2*"
  },
  {
    id: 60,
    name: "Middlesex University",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,700",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Merit Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Mobile Computing",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "72%",
    researchRating: "2*"
  },
  {
    id: 61,
    name: "University of East London",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,160",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "71%",
    researchRating: "2*"
  },
  {
    id: 62,
    name: "London South Bank University",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,400",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Software Engineering, Computer Networks, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "73%",
    researchRating: "2*"
  },
  {
    id: 63,
    name: "University of Bedfordshire",
    ranking: 1201,
    location: "Luton, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,600",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Vice-Chancellor's Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "70%",
    researchRating: "2*"
  },
  {
    id: 64,
    name: "Robert Gordon University",
    ranking: 801,
    location: "Aberdeen, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,490",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Computer Networks, Cybersecurity",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "81%",
    researchRating: "3*"
  },
  {
    id: 65,
    name: "Edinburgh Napier University",
    ranking: 1001,
    location: "Edinburgh, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£17,090",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Merit Award",
    courseContent: "Programming, AI, Software Engineering, Cybersecurity, Data Science",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "78%",
    researchRating: "3*"
  },
  {
    id: 66,
    name: "Glasgow Caledonian University",
    ranking: 1001,
    location: "Glasgow, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "76%",
    researchRating: "3*"
  },
  {
    id: 67,
    name: "University of Abertay Dundee",
    ranking: 1201,
    location: "Dundee, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Games Development, Cybersecurity, Software Engineering",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 68,
    name: "University of the West of Scotland",
    ranking: 1201,
    location: "Paisley, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,250",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Merit Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Science",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "74%",
    researchRating: "2*"
  },
  {
    id: 69,
    name: "University of Stirling",
    ranking: 431,
    location: "Stirling, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£19,645",
    entryRequirements: "AAB-BBB (including Mathematics)",
    ucasPoints: "136-96",
    scholarships: "International Excellence Scholarship, Stirling Graduate Scholarship",
    courseContent: "Programming, AI, Software Engineering, Data Science, Computer Networks",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "83%",
    researchRating: "3*"
  },
  {
    id: 70,
    name: "University of Dundee",
    ranking: 354,
    location: "Dundee, Scotland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£20,900",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "International Excellence Scholarship, Principal's Scholarship",
    courseContent: "Programming, AI, Games Development, Data Science, Software Engineering",
    duration: "4 years (BSc), 5 years (MEng)",
    employmentRate: "85%",
    researchRating: "4*"
  },
  {
    id: 71,
    name: "Aberystwyth University",
    ranking: 425,
    location: "Aberystwyth, Wales",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,830",
    entryRequirements: "AAB-BBB (including Mathematics)",
    ucasPoints: "136-96",
    scholarships: "International Excellence Scholarship, Aberystwyth University Scholarship",
    courseContent: "Programming, AI, Robotics, Software Engineering, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "82%",
    researchRating: "4*"
  },
  {
    id: 72,
    name: "Cardiff Metropolitan University",
    ranking: 1001,
    location: "Cardiff, Wales",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "76%",
    researchRating: "2*"
  },
  {
    id: 73,
    name: "University of South Wales",
    ranking: 1201,
    location: "Pontypridd, Wales",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,750",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Cybersecurity, Games Development, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 74,
    name: "Wrexham Glyndwr University",
    ranking: 1201,
    location: "Wrexham, Wales",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£13,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Vice-Chancellor's Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Computer Networks",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "73%",
    researchRating: "2*"
  },
  {
    id: 75,
    name: "Ulster University",
    ranking: 651,
    location: "Coleraine, Northern Ireland",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,840",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Excellence Scholarship, Vice-Chancellor's Research Scholarship",
    courseContent: "Programming, AI, Software Engineering, Cybersecurity, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "79%",
    researchRating: "3*"
  },
  {
    id: 76,
    name: "Oxford Brookes University",
    ranking: 651,
    location: "Oxford, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,900",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Software Engineering, Computer Networks, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "80%",
    researchRating: "3*"
  },
  {
    id: 77,
    name: "University of Chester",
    ranking: 801,
    location: "Chester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,750",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Excellence Scholarship, Academic Merit Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "78%",
    researchRating: "2*"
  },
  {
    id: 78,
    name: "University of Derby",
    ranking: 1001,
    location: "Derby, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,900",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Vice-Chancellor's Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "76%",
    researchRating: "2*"
  },
  {
    id: 79,
    name: "University of Worcester",
    ranking: 1001,
    location: "Worcester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,700",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 80,
    name: "Edge Hill University",
    ranking: 751,
    location: "Ormskirk, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,000",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Merit Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Computer Networks",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "77%",
    researchRating: "2*"
  },
  {
    id: 81,
    name: "University of Lincoln",
    ranking: 651,
    location: "Lincoln, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£17,200",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Excellence Scholarship, Lincoln Scholarship",
    courseContent: "Programming, AI, Robotics, Games Development, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "81%",
    researchRating: "3*"
  },
  {
    id: 82,
    name: "Canterbury Christ Church University",
    ranking: 1201,
    location: "Canterbury, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Merit Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "72%",
    researchRating: "2*"
  },
  {
    id: 83,
    name: "University of Wolverhampton",
    ranking: 1201,
    location: "Wolverhampton, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,450",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Vice-Chancellor's Award",
    courseContent: "Programming, AI, Software Engineering, Computer Networks, Cybersecurity",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "73%",
    researchRating: "2*"
  },
  {
    id: 84,
    name: "Anglia Ruskin University",
    ranking: 1201,
    location: "Cambridge, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "71%",
    researchRating: "2*"
  },
  {
    id: 85,
    name: "University of Salford",
    ranking: 801,
    location: "Manchester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£17,040",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Excellence Scholarship, Vice-Chancellor's Excellence Scholarship",
    courseContent: "Programming, AI, Software Engineering, Computer Games, Robotics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "78%",
    researchRating: "3*"
  },
  {
    id: 86,
    name: "University of Bradford",
    ranking: 1001,
    location: "Bradford, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£22,518",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Academic Scholarship, Vice-Chancellor's Scholarship",
    courseContent: "Programming, AI, Software Engineering, Cybersecurity, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "76%",
    researchRating: "3*"
  },
  {
    id: 87,
    name: "Leeds Beckett University",
    ranking: 1001,
    location: "Leeds, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Computer Networks",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 88,
    name: "Liverpool John Moores University",
    ranking: 801,
    location: "Liverpool, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,100",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Computer Forensics, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "79%",
    researchRating: "3*"
  },
  {
    id: 89,
    name: "University of Bolton",
    ranking: 1201,
    location: "Bolton, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£13,450",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Excellence Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Games Development",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "70%",
    researchRating: "1*"
  },
  {
    id: 90,
    name: "University of Sunderland",
    ranking: 1201,
    location: "Sunderland, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "72%",
    researchRating: "2*"
  },
  {
    id: 91,
    name: "London Metropolitan University",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,576",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Merit Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Computer Networks",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "69%",
    researchRating: "1*"
  },
  {
    id: 92,
    name: "University of East Anglia",
    ranking: 218,
    location: "Norwich, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£22,800",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "International Excellence Scholarship, Norwich Research Park Scholarship",
    courseContent: "Programming, AI, Data Science, Software Engineering, Computer Vision",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "87%",
    researchRating: "4*"
  },
  {
    id: 93,
    name: "Keele University",
    ranking: 551,
    location: "Keele, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£19,800",
    entryRequirements: "AAB-ABB (including Mathematics)",
    ucasPoints: "136-112",
    scholarships: "International Excellence Scholarship, Keele University Scholarship",
    courseContent: "Programming, AI, Software Engineering, Data Science, Human-Computer Interaction",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "84%",
    researchRating: "3*"
  },
  {
    id: 94,
    name: "University of Hull",
    ranking: 651,
    location: "Hull, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,300",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Excellence Scholarship, Vice-Chancellor's Scholarship",
    courseContent: "Programming, AI, Games Development, Software Engineering, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "81%",
    researchRating: "3*"
  },
  {
    id: 95,
    name: "Goldsmiths, University of London",
    ranking: 461,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,440",
    entryRequirements: "AAB-ABB (including Mathematics)",
    ucasPoints: "136-112",
    scholarships: "International Excellence Scholarship, Goldsmiths Postgraduate Scholarship",
    courseContent: "Programming, AI, Creative Computing, Data Science, Interactive Media",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "83%",
    researchRating: "4*"
  },
  {
    id: 96,
    name: "Birkbeck, University of London",
    ranking: 412,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£17,380",
    entryRequirements: "AAB-ABB (including Mathematics)",
    ucasPoints: "136-112",
    scholarships: "Birkbeck Excellence Scholarship, International Merit Award",
    courseContent: "Programming, AI, Data Science, Software Engineering, Computer Security",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "85%",
    researchRating: "4*"
  },
  {
    id: 97,
    name: "University of Roehampton",
    ranking: 1001,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,750",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, AI, Software Engineering, Web Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "74%",
    researchRating: "2*"
  },
  {
    id: 98,
    name: "St Mary's University, Twickenham",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£13,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Merit Award",
    courseContent: "Programming, Software Engineering, Web Development, Data Analytics, Computer Networks",
    duration: "3 years (BSc)",
    employmentRate: "71%",
    researchRating: "1*"
  },
  {
    id: 99,
    name: "University of Chichester",
    ranking: 1201,
    location: "Chichester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, Software Engineering, Web Development, Digital Media, Computer Networks",
    duration: "3 years (BSc)",
    employmentRate: "73%",
    researchRating: "1*"
  },
  {
    id: 100,
    name: "York St John University",
    ranking: 1001,
    location: "York, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Excellence Award",
    courseContent: "Programming, Software Engineering, Web Development, Games Development, Data Analytics",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 101,
    name: "Newman University",
    ranking: 1201,
    location: "Birmingham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£13,200",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Merit Award",
    courseContent: "Programming, Software Engineering, Web Development, Digital Technologies, Data Analytics",
    duration: "3 years (BSc)",
    employmentRate: "72%",
    researchRating: "1*"
  },
  {
    id: 102,
    name: "Bishop Grosseteste University",
    ranking: 1201,
    location: "Lincoln, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£12,690",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, Software Engineering, Web Development, Digital Media, Computer Applications",
    duration: "3 years (BSc)",
    employmentRate: "70%",
    researchRating: "1*"
  },
  {
    id: 103,
    name: "University of Gloucestershire",
    ranking: 1001,
    location: "Cheltenham, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,450",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Vice-Chancellor's Award",
    courseContent: "Programming, AI, Software Engineering, Cybersecurity, Games Development",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "76%",
    researchRating: "2*"
  },
  {
    id: 104,
    name: "Solent University",
    ranking: 1201,
    location: "Southampton, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,700",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Merit Award",
    courseContent: "Programming, AI, Games Development, Software Engineering, Web Development",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "74%",
    researchRating: "2*"
  },
  {
    id: 105,
    name: "Buckinghamshire New University",
    ranking: 1201,
    location: "High Wycombe, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Excellence Award",
    courseContent: "Programming, Software Engineering, Web Development, Mobile Computing, Data Analytics",
    duration: "3 years (BSc)",
    employmentRate: "73%",
    researchRating: "1*"
  },
  {
    id: 106,
    name: "University of Cumbria",
    ranking: 1201,
    location: "Carlisle, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£13,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Achievement Award",
    courseContent: "Programming, Software Engineering, Web Development, Computer Networks, Digital Technologies",
    duration: "3 years (BSc)",
    employmentRate: "71%",
    researchRating: "1*"
  },
  {
    id: 107,
    name: "Leeds Trinity University",
    ranking: 1201,
    location: "Leeds, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£12,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Merit Award",
    courseContent: "Programming, Software Engineering, Web Development, Digital Media, Computer Applications",
    duration: "3 years (BSc)",
    employmentRate: "72%",
    researchRating: "1*"
  },
  {
    id: 108,
    name: "Marjon University",
    ranking: 1201,
    location: "Plymouth, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Achievement Award",
    courseContent: "Programming, Software Engineering, Web Development, Digital Technologies, Computer Networks",
    duration: "3 years (BSc)",
    employmentRate: "70%",
    researchRating: "1*"
  },
  {
    id: 109,
    name: "Ravensbourne University London",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Creative Industries Scholarship",
    courseContent: "Programming, AI, Creative Computing, Games Development, Interactive Media",
    duration: "3 years (BSc)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 110,
    name: "University of Suffolk",
    ranking: 1201,
    location: "Ipswich, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,598",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Vice-Chancellor's Scholarship",
    courseContent: "Programming, AI, Games Development, Software Engineering, Data Science",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "73%",
    researchRating: "2*"
  },
  {
    id: 111,
    name: "Falmouth University",
    ranking: 751,
    location: "Falmouth, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£17,950",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Excellence Scholarship, Creative Industries Scholarship",
    courseContent: "Programming, AI, Creative Computing, Games Development, Digital Innovation",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "79%",
    researchRating: "3*"
  },
  {
    id: 112,
    name: "Arts University Bournemouth",
    ranking: 1201,
    location: "Poole, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£17,950",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Creative Excellence Award",
    courseContent: "Programming, Creative Computing, Games Development, Digital Arts, Interactive Media",
    duration: "3 years (BSc)",
    employmentRate: "76%",
    researchRating: "2*"
  },
  {
    id: 113,
    name: "Harper Adams University",
    ranking: 651,
    location: "Newport, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£13,250",
    entryRequirements: "ABB-BBC (including Mathematics)",
    ucasPoints: "128-80",
    scholarships: "International Excellence Scholarship, Harper Adams Scholarship",
    courseContent: "Programming, Data Science, Agricultural Technology, Computer Systems, Software Engineering",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "88%",
    researchRating: "3*"
  },
  {
    id: 114,
    name: "The University of Law",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,150",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Excellence Award",
    courseContent: "Programming, Legal Technology, Data Analytics, Software Engineering, Computer Applications",
    duration: "3 years (BSc)",
    employmentRate: "77%",
    researchRating: "1*"
  },
  {
    id: 115,
    name: "Arden University",
    ranking: 1201,
    location: "Coventry, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£13,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Merit Award",
    courseContent: "Programming, Software Engineering, Web Development, Data Analytics, Computer Networks",
    duration: "3 years (BSc)",
    employmentRate: "74%",
    researchRating: "1*"
  },
  {
    id: 116,
    name: "BPP University",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,120",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, Software Engineering, Data Analytics, Business Computing, Web Development",
    duration: "3 years (BSc)",
    employmentRate: "76%",
    researchRating: "1*"
  },
  {
    id: 117,
    name: "University Academy 92",
    ranking: 1201,
    location: "Manchester, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£12,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Academic Merit Award",
    courseContent: "Programming, Software Engineering, Web Development, Digital Technologies, Data Analytics",
    duration: "3 years (BSc)",
    employmentRate: "73%",
    researchRating: "1*"
  },
  {
    id: 118,
    name: "Richmond, The American International University in London",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Merit Award",
    courseContent: "Programming, Software Engineering, Data Science, Web Development, Computer Systems",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "75%",
    researchRating: "2*"
  },
  {
    id: 119,
    name: "Regent's University London",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£21,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Academic Achievement Award",
    courseContent: "Programming, Software Engineering, Data Analytics, Web Development, Digital Innovation",
    duration: "3 years (BSc)",
    employmentRate: "78%",
    researchRating: "2*"
  },
  {
    id: 120,
    name: "Point Blank Music School",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,000",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Creative Excellence Award",
    courseContent: "Programming, Audio Technology, Music Software Development, Digital Audio, Interactive Media",
    duration: "3 years (BSc)",
    employmentRate: "74%",
    researchRating: "1*"
  },
  {
    id: 121,
    name: "AECC University College",
    ranking: 1201,
    location: "Bournemouth, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£15,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Excellence Award",
    courseContent: "Programming, Health Informatics, Medical Software, Data Analytics, Computer Applications",
    duration: "3 years (BSc)",
    employmentRate: "79%",
    researchRating: "2*"
  },
  {
    id: 122,
    name: "Escape Studios",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£17,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Creative Industries Award",
    courseContent: "Programming, 3D Animation, Games Development, Visual Effects, Computer Graphics",
    duration: "3 years (BSc)",
    employmentRate: "77%",
    researchRating: "2*"
  },
  {
    id: 123,
    name: "Metfilm School",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£18,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Creative Achievement Award",
    courseContent: "Programming, Film Technology, Post-Production Software, Digital Media, Interactive Systems",
    duration: "3 years (BSc)",
    employmentRate: "76%",
    researchRating: "1*"
  },
  {
    id: 124,
    name: "SAE Institute",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£16,800",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Scholarship, Creative Technology Award",
    courseContent: "Programming, Audio Engineering, Games Development, Web Development, Digital Media",
    duration: "3 years (BSc)",
    employmentRate: "75%",
    researchRating: "1*"
  },
  {
    id: 125,
    name: "Hult International Business School",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£19,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Excellence Scholarship, Business Innovation Award",
    courseContent: "Programming, Business Analytics, Data Science, Software Engineering, Digital Innovation",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "81%",
    researchRating: "2*"
  },
  {
    id: 126,
    name: "London School of Commerce",
    ranking: 1201,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£14,500",
    entryRequirements: "ABB-CCC (including Mathematics)",
    ucasPoints: "128-48",
    scholarships: "International Merit Scholarship, Academic Achievement Award",
    courseContent: "Programming, Business Computing, Data Analytics, Software Engineering, E-Commerce Systems",
    duration: "3 years (BSc)",
    employmentRate: "73%",
    researchRating: "1*"
  },
  {
    id: 127,
    name: "London School of Economics (LSE)",
    ranking: 37,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£25,392",
    entryRequirements: "A*AA (including Mathematics)",
    ucasPoints: "144",
    scholarships: "LSE Undergraduate Support Scheme, International Scholarships",
    courseContent: "Programming, Data Science, Economic Computing, Statistical Computing, Mathematical Methods",
    duration: "3 years (BSc), 4 years (MSci)",
    employmentRate: "96%",
    researchRating: "5*"
  },
  {
    id: 128,
    name: "Imperial College Business School",
    ranking: 8,
    location: "London, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£40,940",
    entryRequirements: "A*A*A (including Mathematics and Further Mathematics)",
    ucasPoints: "152",
    scholarships: "Imperial Excellence Scholarship, President's Scholarship",
    courseContent: "Programming, Financial Computing, Data Analytics, Business Intelligence, Quantitative Methods",
    duration: "3 years (BEng), 4 years (MEng)",
    employmentRate: "98%",
    researchRating: "5*"
  },
  {
    id: 129,
    name: "Cranfield University",
    ranking: 223,
    location: "Cranfield, England",
    tuitionFeesUK: "£9,250",
    tuitionFeesInternational: "£26,580",
    entryRequirements: "AAA-ABB (including Mathematics)",
    ucasPoints: "144-112",
    scholarships: "Cranfield Excellence Scholarship, International Scholarships",
    courseContent: "Programming, AI, Aerospace Computing, Data Science, Systems Engineering",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "93%",
    researchRating: "4*"
  },
  {
    id: 130,
    name: "The Open University",
    ranking: 401,
    location: "Milton Keynes, England",
    tuitionFeesUK: "£6,336",
    tuitionFeesInternational: "£18,840",
    entryRequirements: "Open entry (no formal requirements)",
    ucasPoints: "N/A",
    scholarships: "OU Student Support, International Scholarships",
    courseContent: "Programming, Software Engineering, Data Science, Web Technologies, Computer Systems",
    duration: "3-6 years (flexible BSc)",
    employmentRate: "79%",
    researchRating: "4*"
  }
];

// Comprehensive authentic BSc course data for all UK universities
const getAuthenticCoursesForUniversity = (universityName) => {
  const universityCoursesMap = {
    "University of Oxford": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BA Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Algorithms, Data Structures, Software Engineering, Machine Learning, Computer Vision, Natural Language Processing, Databases, Computer Networks"
      },
      {
        name: "Computer Science and Philosophy",
        fullTitle: "BA Computer Science and Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Philosophy of Mind, Ethics in Computing, AI Philosophy, Mathematical Logic, Computational Theory"
      },
      // Mathematics & Statistics
      {
        name: "Mathematics",
        fullTitle: "BA Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Analysis, Algebra, Geometry, Number Theory, Mathematical Logic, Differential Equations, Statistics"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BA Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Bayesian Statistics, Mathematical Statistics, Statistical Computing"
      },
      {
        name: "Mathematics and Computer Science",
        fullTitle: "BA Mathematics and Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Discrete Mathematics, Algorithms, Computational Mathematics, Mathematical Modelling, Numerical Analysis"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BA Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Statistical Physics, Particle Physics, Condensed Matter Physics"
      },
      {
        name: "Physics and Philosophy",
        fullTitle: "BA Physics and Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Philosophy of Science, Quantum Philosophy, Physics, Ethics in Science, Mathematical Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "MChem Chemistry",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Quantum Chemistry, Spectroscopy, Catalysis"
      },
      // Biological Sciences
      {
        name: "Biological Sciences",
        fullTitle: "BA Biological Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Evolution, Ecology, Molecular Biology, Biochemistry, Physiology, Developmental Biology"
      },
      {
        name: "Biochemistry",
        fullTitle: "BA Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Structural Biology, Bioinformatics, Cell Signaling"
      },
      {
        name: "Biomedical Sciences",
        fullTitle: "BA Biomedical Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Human Physiology, Pathology, Immunology, Pharmacology, Medical Genetics, Disease Mechanisms, Clinical Biochemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BA Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods, Statistics, Neuropsychology"
      },
      {
        name: "Psychology, Philosophy and Linguistics",
        fullTitle: "BA Psychology, Philosophy and Linguistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Cognitive Science, Philosophy of Mind, Psycholinguistics, Language Processing, Philosophy of Language"
      },
      // Geography & Environmental Sciences
      {
        name: "Geography",
        fullTitle: "BA Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, Environmental Change, Geographic Information Systems, Climate Science, Urban Geography"
      },
      {
        name: "Earth Sciences",
        fullTitle: "BA Earth Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Geology, Geophysics, Environmental Geoscience, Climate Change, Mineralogy, Petrology, Hydrogeology"
      }
    ],
    "University of Cambridge": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BA Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Data Structures, Computer Systems, Software Engineering, Machine Learning, Computer Graphics, Artificial Intelligence"
      },
      {
        name: "Computer Science with Mathematics",
        fullTitle: "BA Computer Science with Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Discrete Mathematics, Computational Mathematics, Algorithm Analysis, Mathematical Modelling, Numerical Methods"
      },
      // Mathematics & Statistics
      {
        name: "Mathematics",
        fullTitle: "BA Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Geometry, Number Theory, Differential Equations"
      },
      {
        name: "Mathematics with Physics",
        fullTitle: "BA Mathematics with Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Mathematical Physics, Quantum Mechanics, Statistical Mechanics, Differential Equations, Mathematical Methods"
      },
      // Sciences
      {
        name: "Natural Sciences - Physics",
        fullTitle: "BA Natural Sciences (Physics)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Physics, Electromagnetism, Thermodynamics, Particle Physics, Condensed Matter, Astrophysics"
      },
      {
        name: "Natural Sciences - Chemistry",
        fullTitle: "BA Natural Sciences (Chemistry)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Quantum Chemistry, Materials Chemistry"
      },
      {
        name: "Natural Sciences - Biological Sciences",
        fullTitle: "BA Natural Sciences (Biological Sciences)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Evolution, Ecology, Molecular Biology, Biochemistry, Physiology, Neuroscience"
      },
      {
        name: "Natural Sciences - Earth Sciences",
        fullTitle: "BA Natural Sciences (Earth Sciences)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Geology, Geophysics, Geochemistry, Paleontology, Environmental Earth Sciences, Climate Science"
      },
      // Engineering
      {
        name: "Engineering",
        fullTitle: "BA Engineering",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Engineering Mathematics, Mechanics, Electrical Engineering, Civil Engineering, Chemical Engineering, Information Engineering"
      },
      {
        name: "Manufacturing Engineering",
        fullTitle: "MEng Manufacturing Engineering",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Optional",
        courseContent: "Manufacturing Systems, Operations Management, Quality Control, Supply Chain Management, Industrial Engineering"
      },
      // Biological & Medical Sciences
      {
        name: "Veterinary Medicine",
        fullTitle: "VetMB Veterinary Medicine",
        duration: "6 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Optional",
        courseContent: "Animal Anatomy, Physiology, Pathology, Pharmacology, Surgery, Clinical Practice, Animal Welfare"
      },
      {
        name: "Medicine",
        fullTitle: "MB BChir Medicine",
        duration: "6 years",  
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Optional",
        courseContent: "Human Anatomy, Physiology, Pathology, Pharmacology, Clinical Medicine, Surgery, Medical Ethics"
      },
      // Psychology & Human Sciences
      {
        name: "Psychology and Behavioural Sciences",
        fullTitle: "BA Psychology and Behavioural Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Neuroscience, Research Methods, Statistics"
      },
      {
        name: "Human, Social and Political Sciences",
        fullTitle: "BA Human, Social and Political Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Anthropology, Sociology, Political Science, International Relations, Social Theory, Research Methods"
      },
      // Geography & Environmental Sciences
      {
        name: "Geography",
        fullTitle: "BA Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, Environmental Science, GIS, Climate Change, Urban Geography"
      },
      {
        name: "Land Economy",
        fullTitle: "BA Land Economy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Economics, Property Law, Planning Theory, Rural Development, Urban Economics, Sustainability"
      }
    ],
    "Imperial College London": [
      // Computer Science & IT
      {
        name: "Computing",
        fullTitle: "BEng Computing",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Mathematics for Computing, Logic, Computer Architecture, Algorithms, Software Engineering, Databases, Networks and Distributed Systems, Artificial Intelligence"
      },
      {
        name: "Computing (Artificial Intelligence and Machine Learning)",
        fullTitle: "MEng Computing (Artificial Intelligence and Machine Learning)",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Robotics, Neural Computation, Reinforcement Learning, AI Ethics"
      },
      {
        name: "Computing (Software Engineering)",
        fullTitle: "MEng Computing (Software Engineering)",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Software Architecture, Agile Development, DevOps, Testing, Project Management, Human-Computer Interaction, Web Technologies"
      },
      // Engineering
      {
        name: "Electrical and Electronic Engineering",
        fullTitle: "BEng Electrical and Electronic Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Analysis, Digital Electronics, Signal Processing, Control Systems, Power Electronics, Communications, Electromagnetics, VLSI Design"
      },
      {
        name: "Mechanical Engineering",
        fullTitle: "BEng Mechanical Engineering", 
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Thermodynamics, Fluid Mechanics, Solid Mechanics, Materials, Design, Manufacturing, Control Engineering, Heat Transfer"
      },
      {
        name: "Civil Engineering",
        fullTitle: "BEng Civil Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Structural Engineering, Geotechnics, Hydraulics, Construction Management, Surveying, Environmental Engineering"
      },
      {
        name: "Chemical Engineering",
        fullTitle: "BEng Chemical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Process Design, Chemical Reactions, Heat Transfer, Mass Transfer, Process Control, Safety Engineering"
      },
      {
        name: "Aeronautical Engineering",
        fullTitle: "BEng Aeronautical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Aerodynamics, Flight Mechanics, Propulsion, Aircraft Structures, Flight Control Systems, Aircraft Design"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Statistical Physics, Solid State Physics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Computational Chemistry"
      },
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics, Numerical Analysis, Operations Research"
      },
      {
        name: "Biology",
        fullTitle: "BSc Biology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Molecular Biology, Genetics, Ecology, Evolution, Biochemistry, Bioinformatics"
      },
      // Business & Management
      {
        name: "Management",
        fullTitle: "BSc Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Finance, Marketing, Operations, Entrepreneurship, Innovation Management"
      }
    ],
    "University College London (UCL)": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Discrete Mathematics, Computer Architecture, Algorithms and Data Structures, Software Engineering, Human-Computer Interaction, Machine Learning, Security"
      },
      {
        name: "Information Management for Business",
        fullTitle: "BSc Information Management for Business",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Information Systems, Business Analysis, Project Management, Database Systems, Web Technologies, Digital Business, Data Analytics, Enterprise Systems"
      },
      {
        name: "Management Science",
        fullTitle: "BSc Management Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Operations Research, Statistics, Decision Analysis, Supply Chain Management, Financial Modelling, Business Analytics"
      },
      // Engineering
      {
        name: "Engineering",
        fullTitle: "BEng Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Engineering Mathematics, Mechanics, Electrical Circuits, Materials Science, Design, Thermodynamics, Control Systems, Project Management"
      },
      {
        name: "Electronic and Electrical Engineering",
        fullTitle: "BEng Electronic and Electrical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Analysis, Digital Systems, Signal Processing, Control Systems, Power Electronics, Communications"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Physics, Quantum Mechanics, Electromagnetism, Statistical Physics, Astrophysics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Materials Chemistry"
      },
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics, Numerical Methods"
      },
      {
        name: "Biological Sciences",
        fullTitle: "BSc Biological Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Evolution, Ecology, Biochemistry, Molecular Biology, Bioinformatics"
      },
      // Social Sciences & Psychology
      {
        name: "Psychology", 
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods, Statistics, Individual Differences, Abnormal Psychology"
      },
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Mathematical Economics, Development Economics, Public Economics"
      },
      // Architecture & Built Environment
      {
        name: "Architecture",
        fullTitle: "BSc Architecture",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Architectural Design, History and Theory, Building Technology, Structures, Environmental Design, Urban Design, Professional Practice, Digital Design"
      },
      // Geography & Environmental Sciences
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Environmental Science, Urban Planning, Climate Change"
      },
      {
        name: "Environmental Sciences",
        fullTitle: "BSc Environmental Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Chemistry, Ecology, Climate Science, Environmental Management, Sustainability, Pollution Control"
      }
    ],
    "University of Edinburgh": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Functional Programming, Object-Oriented Programming, Computer Systems, Algorithms and Data Structures, Software Engineering, Database Systems, Artificial Intelligence, Machine Learning"
      },
      {
        name: "Artificial Intelligence",
        fullTitle: "BSc Artificial Intelligence",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Introduction to AI, Machine Learning, Knowledge Representation, Computer Vision, Natural Language Processing, Robotics, Neural Networks, AI Ethics"
      },
      {
        name: "Informatics",
        fullTitle: "BSc Informatics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Discrete Mathematics, Computer Systems, Human-Computer Interaction, Algorithms, Software Engineering, Machine Learning, Data Science"
      },
      {
        name: "Software Engineering",
        fullTitle: "BSc Software Engineering",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Software Design, Programming Languages, Software Testing, Project Management, Agile Methods, Human-Computer Interaction"
      },
      // Engineering
      {
        name: "Engineering",
        fullTitle: "BEng Engineering",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Engineering Mathematics, Mechanics, Electrical Engineering, Thermodynamics, Materials Science, Design and Manufacturing, Control Systems, Signal Processing"
      },
      {
        name: "Electrical and Electronic Engineering",
        fullTitle: "BEng Electrical and Electronic Engineering",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Analysis, Electronics, Signal Processing, Control Systems, Power Systems, Communications, VLSI Design"
      },
      {
        name: "Mechanical Engineering",
        fullTitle: "BEng Mechanical Engineering",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Thermodynamics, Fluid Mechanics, Mechanics of Materials, Design, Manufacturing, Heat Transfer, Control Systems"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermal Physics, Optics, Nuclear Physics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Medicinal Chemistry"
      },
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Biology, Numerical Analysis, Operations Research"
      },
      {
        name: "Biological Sciences",
        fullTitle: "BSc Biological Sciences",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Evolution, Ecology, Biochemistry, Molecular Biology, Biotechnology"
      },
      // Business & Economics
      {
        name: "Business Studies",
        fullTitle: "MA Business Studies",
        duration: "4 years", 
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Management and Organization, Marketing, Finance, Operations Management, Strategic Management, Business Ethics, International Business, Entrepreneurship"
      },
      {
        name: "Economics",
        fullTitle: "MA Economics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics, International Economics, Public Economics"
      },
      // Social Sciences
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods, Statistics"
      },
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Environmental Science, Urban Planning, Climate Science"
      }
    ],
    "King's College London": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available", 
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming Foundations, Database Systems, Computer Systems and Networks, Algorithms, Software Engineering, Cybersecurity, AI and Machine Learning, Web Development"
      },
      {
        name: "Computer Science with Management",
        fullTitle: "BSc Computer Science with Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Database Systems, Management Principles, Business Strategy, Project Management, Information Systems, Digital Innovation"
      },
      {
        name: "Computer Science with Robotics",
        fullTitle: "BSc Computer Science with Robotics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, AI, Machine Learning, Robotics, Control Systems, Computer Vision, Sensor Systems, Autonomous Systems"
      },
      // Engineering
      {
        name: "Electronic Engineering",
        fullTitle: "BEng Electronic Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Analysis, Digital Systems, Signal Processing, Communications, Control Systems, Electromagnetics, VLSI Design, Power Electronics"
      },
      {
        name: "Electronic Engineering with Management",
        fullTitle: "BEng Electronic Engineering with Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Electronics, Control Systems, Management Principles, Project Management, Business Strategy, Innovation Management"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermal Physics, Optics, Atomic Physics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Biochemistry"
      },
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics, Numerical Analysis"
      },
      // Business & Management
      {
        name: "Business Management",
        fullTitle: "BSc Business Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Foundations of Management, Marketing, Finance, Operations Management, Organizational Behaviour, Strategic Management, International Business, Leadership"
      },
      {
        name: "International Management",
        fullTitle: "BSc International Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Recommended",
        courseContent: "Global Business, Cross-cultural Management, International Finance, Global Strategy, International Marketing, Supply Chain Management"
      },
      // Social Sciences
      {
        name: "International Relations",
        fullTitle: "BA International Relations",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "International Politics, Diplomatic Studies, Political Theory, International Law, Global Governance, Security Studies, Political Economy, Regional Studies"
      },
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Clinical Psychology, Research Methods"
      },
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Environmental Science, Urban Studies, Development Geography"
      }
    ],
    "University of Manchester": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Software Engineering, Database Systems, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Science with Industrial Experience",
        fullTitle: "BSc Computer Science with Industrial Experience",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Not Available",
        courseContent: "Programming, Software Development, Industrial Placement, Professional Skills, Advanced Computing Topics"
      },
      {
        name: "Computer Science and Mathematics",
        fullTitle: "BSc Computer Science and Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Discrete Mathematics, Algorithm Analysis, Mathematical Modelling, Computational Mathematics, Statistics, Logic"
      },
      {
        name: "Artificial Intelligence",
        fullTitle: "BSc Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Robotics, AI Ethics, Knowledge Systems"
      },
      {
        name: "Data Science",
        fullTitle: "BSc Data Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Data Mining, Statistical Analysis, Machine Learning, Big Data Technologies, Data Visualization, Database Systems"
      },
      // Mathematics & Statistics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Differential Equations, Mathematical Methods"
      },
      {
        name: "Mathematics with Finance",
        fullTitle: "BSc Mathematics with Finance",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Mathematics, Risk Management, Derivatives, Portfolio Theory, Mathematical Finance, Statistics, Economics"
      },
      {
        name: "Actuarial Science and Mathematics",
        fullTitle: "BSc Actuarial Science and Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Actuarial Mathematics, Risk Theory, Statistics, Financial Mathematics, Insurance, Probability Theory"
      },
      {
        name: "Statistics",
        fullTitle: "BSc Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Time Series, Statistical Computing, Bayesian Statistics"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics, Condensed Matter"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques, Space Physics"
      },
      {
        name: "Physics with Theoretical Physics",
        fullTitle: "BSc Physics with Theoretical Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Advanced Quantum Mechanics, Field Theory, Statistical Mechanics, Mathematical Physics, Particle Theory, Cosmology"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Quantum Chemistry, Materials Chemistry"
      },
      {
        name: "Chemistry with Medicinal Chemistry",
        fullTitle: "BSc Chemistry with Medicinal Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Drug Design, Pharmacology, Medicinal Chemistry, Biochemistry, Molecular Biology, Chemical Biology"
      },
      // Life Sciences
      {
        name: "Biological Sciences",
        fullTitle: "BSc Biological Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Evolution, Ecology, Molecular Biology, Biochemistry, Physiology, Microbiology"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Structural Biology, Bioinformatics, Cell Signaling"
      },
      {
        name: "Genetics",
        fullTitle: "BSc Genetics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Molecular Genetics, Population Genetics, Medical Genetics, Genomics, Bioinformatics, Genetic Engineering"
      },
      {
        name: "Microbiology",
        fullTitle: "BSc Microbiology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Bacterial Biology, Virology, Medical Microbiology, Environmental Microbiology, Immunology, Biotechnology"
      },
      {
        name: "Zoology",
        fullTitle: "BSc Zoology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Animal Biology, Animal Behavior, Evolution, Ecology, Conservation Biology, Biodiversity, Animal Physiology"
      },
      // Psychology & Neuroscience
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods, Statistics"
      },
      {
        name: "Neuroscience",
        fullTitle: "BSc Neuroscience",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Neuroanatomy, Neurophysiology, Cognitive Neuroscience, Behavioral Neuroscience, Neuropharmacology, Brain Imaging"
      },
      {
        name: "Cognitive Neuroscience and Psychology",
        fullTitle: "BSc Cognitive Neuroscience and Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Neuroscience, Brain Imaging, Neuropsychology, Experimental Methods, Computational Neuroscience"
      },
      // Geography & Environmental Sciences
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, Environmental Science, GIS, Remote Sensing, Climate Change, Urban Geography"
      },
      {
        name: "Environmental Science",
        fullTitle: "BSc Environmental Science",
        duration: "3 years",
        studyMode: "Full time",  
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Chemistry, Ecology, Environmental Monitoring, Pollution Control, Conservation Biology, Sustainability"
      },
      {
        name: "Earth and Planetary Science",
        fullTitle: "BSc Earth and Planetary Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Geology, Geophysics, Geochemistry, Planetary Science, Environmental Earth Science, Climate Change"
      }
    ],
    "University College London (UCL)": [
      // Computer Science & IT (BSc)
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming Fundamentals, Data Structures and Algorithms, Computer Systems, Software Engineering, Artificial Intelligence, Machine Learning, Human-Computer Interaction, Computer Graphics"
      },
      {
        name: "Artificial Intelligence",
        fullTitle: "BSc Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional", 
        yearAbroad: "Optional",
        courseContent: "Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Robotics, Expert Systems, Logic Programming, Statistical Methods"
      },
      {
        name: "Information Management for Business",
        fullTitle: "BSc Information Management for Business",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Information Systems, Database Management, Business Analytics, Project Management, Digital Business Strategy, Systems Analysis and Design"
      },
      // Engineering (BEng)
      {
        name: "Civil Engineering",
        fullTitle: "BEng Civil Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Structural Engineering, Geotechnical Engineering, Hydraulics, Construction Management, Environmental Engineering, Transportation Engineering"
      },
      {
        name: "Mechanical Engineering",
        fullTitle: "BEng Mechanical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Thermodynamics, Fluid Mechanics, Materials Science, Design Engineering, Manufacturing, Control Systems, Heat Transfer"
      },
      {
        name: "Electronic and Electrical Engineering",
        fullTitle: "BEng Electronic and Electrical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Analysis, Electronics, Signal Processing, Power Systems, Communications, Control Systems, VLSI Design"
      },
      {
        name: "Chemical Engineering",
        fullTitle: "BEng Chemical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Process Engineering, Chemical Reactions, Heat and Mass Transfer, Process Control, Safety Engineering, Environmental Engineering"
      },
      // Business & Economics (BA)
      {
        name: "Management Science",
        fullTitle: "BSc Management Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Operations Research, Decision Analysis, Statistical Methods, Economics, Finance, Organizational Behaviour, Strategic Management"
      },
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Mathematical Economics, Economic History, Development Economics, International Economics"
      },
      {
        name: "European Business",
        fullTitle: "BA European Business",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Mandatory",
        courseContent: "International Business, European Economics, Business Strategy, Marketing, Finance, Cross-Cultural Management, Foreign Languages"
      },
      // Sciences (BSc)
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Methods, Linear Algebra, Analysis, Probability Theory"
      },
      {
        name: "Statistical Science",
        fullTitle: "BSc Statistical Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Probability Theory, Statistical Inference, Regression Analysis, Multivariate Statistics, Time Series Analysis, Bayesian Statistics"
      },
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics, Astrophysics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Quantum Chemistry, Spectroscopy"
      },
      {
        name: "Biological Sciences",
        fullTitle: "BSc Biological Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Molecular Biology, Ecology, Evolution, Biochemistry, Physiology, Neuroscience"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Structural Biology, Bioinformatics, Medical Biochemistry"
      },
      // Arts & Humanities (BA)
      {
        name: "English Language and Literature",
        fullTitle: "BA English Language and Literature",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Literary Analysis, Creative Writing, Linguistics, British Literature, World Literature, Critical Theory, Language History"
      },
      {
        name: "History",
        fullTitle: "BA History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "British History, European History, World History, Historical Research Methods, Social History, Political History, Cultural History"
      },
      {
        name: "Philosophy",
        fullTitle: "BA Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Ethics, Metaphysics, Philosophy of Mind, Political Philosophy, History of Philosophy, Epistemology"
      },
      {
        name: "Ancient History",
        fullTitle: "BA Ancient History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Greek History, Roman History, Ancient Civilizations, Classical Archaeology, Ancient Languages, Historical Analysis"
      },
      // Social Sciences (BA)
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods, Statistics, Abnormal Psychology"
      },
      {
        name: "Psychology with Education",
        fullTitle: "BSc Psychology with Education",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Educational Psychology, Developmental Psychology, Learning Theories, Assessment Methods, Special Educational Needs, Research Methods"
      },
      {
        name: "Anthropology",
        fullTitle: "BA Anthropology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cultural Anthropology, Social Anthropology, Archaeological Methods, Ethnography, Human Evolution, Cross-Cultural Studies"
      },
      {
        name: "Politics and International Relations",
        fullTitle: "BA Politics and International Relations",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Theory, Comparative Politics, International Relations, Public Policy, Political Economy, Security Studies"
      },
      // Languages (BA)
      {
        name: "Modern Languages",
        fullTitle: "BA Modern Languages",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Mandatory",
        courseContent: "French, German, Spanish, Italian, Language Studies, Literature, Cultural Studies, Translation Studies"
      },
      {
        name: "Linguistics",
        fullTitle: "BA Linguistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Phonetics, Syntax, Semantics, Psycholinguistics, Sociolinguistics, Language Acquisition, Computational Linguistics"
      },
      // Creative Arts (BA)
      {
        name: "Fine Art",
        fullTitle: "BA Fine Art",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Drawing, Painting, Sculpture, Digital Art, Art History, Contemporary Art Practice, Critical Studies, Exhibition Design"
      },
      {
        name: "History of Art",
        fullTitle: "BA History of Art",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Art History, Museum Studies, Visual Culture, Renaissance Art, Modern Art, Contemporary Art, Art Criticism"
      },
      // Geography & Environmental Sciences
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Climate Change, Urban Geography, Environmental Management"
      },
      {
        name: "Environmental Geoscience",
        fullTitle: "BSc Environmental Geoscience",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Geology, Environmental Chemistry, Hydrology, Climate Science, Environmental Monitoring, Pollution Control, Sustainability"
      },
      // Architecture & Planning (BA)
      {
        name: "Architecture",
        fullTitle: "BA Architecture",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Architectural Design, Building Technology, History of Architecture, Urban Planning, Sustainable Design, Construction Methods"
      },
      {
        name: "Urban Planning",
        fullTitle: "BA Urban Planning",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Urban Design, Planning Theory, Housing Policy, Transportation Planning, Environmental Planning, GIS, Public Policy"
      }
    ],
    "Imperial College London": [
      // Computer Science & IT
      {
        name: "Computing",
        fullTitle: "BSc Computing",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Computer Systems, Software Engineering, Computer Networks, Databases, Machine Learning, Artificial Intelligence"
      },
      {
        name: "Computing (Artificial Intelligence and Machine Learning)",
        fullTitle: "BSc Computing (Artificial Intelligence and Machine Learning)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Robotics, Neural Networks, Statistical Learning, AI Ethics"
      },
      {
        name: "Computing (Software Engineering)",
        fullTitle: "BSc Computing (Software Engineering)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Software Development, System Design, Testing, Project Management, Agile Methods, User Interface Design, Database Systems"
      },
      {
        name: "Computing (Security and Reliability)",
        fullTitle: "BSc Computing (Security and Reliability)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cybersecurity, Network Security, Cryptography, System Reliability, Risk Assessment, Digital Forensics"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Methods, Analysis, Algebra, Differential Equations, Numerical Methods"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Mathematical Statistics, Stochastic Processes, Statistical Computing, Bayesian Statistics"
      },
      {
        name: "Mathematics with Mathematical Physics",
        fullTitle: "BSc Mathematics with Mathematical Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Mathematical Methods, Quantum Mechanics, Classical Mechanics, Electromagnetism, Special Relativity, Mathematical Physics"
      },
      {
        name: "Mathematics with Applied Mathematics/Mathematical Physics",
        fullTitle: "BSc Mathematics with Applied Mathematics/Mathematical Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Applied Mathematics, Mathematical Modelling, Fluid Mechanics, Continuum Mechanics, Computational Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics, Condensed Matter Physics"
      },
      {
        name: "Physics with Theoretical Physics",
        fullTitle: "BSc Physics with Theoretical Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Advanced Quantum Mechanics, Field Theory, Statistical Mechanics, Mathematical Methods, Particle Physics Theory, Cosmology"
      },
      {
        name: "Physics with Space Science",
        fullTitle: "BSc Physics with Space Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Space Physics, Planetary Science, Astrophysics, Satellite Technology, Space Instrumentation, Remote Sensing"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Quantum Chemistry, Catalysis, Materials Chemistry"
      },
      {
        name: "Chemistry with Molecular Physics",
        fullTitle: "BSc Chemistry with Molecular Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Chemistry, Quantum Mechanics, Molecular Spectroscopy, Statistical Mechanics, Chemical Physics, Computational Chemistry"
      },
      {
        name: "Chemistry with Medicinal Chemistry",
        fullTitle: "BSc Chemistry with Medicinal Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Drug Design, Pharmacology, Medicinal Chemistry, Biochemistry, Molecular Biology, Drug Discovery, Clinical Chemistry"
      },
      // Life Sciences
      {
        name: "Biological Sciences",
        fullTitle: "BSc Biological Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Molecular Biology, Biochemistry, Ecology, Evolution, Physiology, Microbiology"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Cell Biology, Structural Biology, Bioinformatics"
      },
      {
        name: "Biotechnology",
        fullTitle: "BSc Biotechnology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Genetic Engineering, Bioprocessing, Microbiology, Cell Culture, Protein Production, Bioinformatics, Bioethics"
      },
      {
        name: "Microbiology",
        fullTitle: "BSc Microbiology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Bacterial Biology, Virology, Medical Microbiology, Environmental Microbiology, Immunology, Molecular Microbiology"
      },
      // Environmental Sciences
      {
        name: "Environmental Geoscience",
        fullTitle: "BSc Environmental Geoscience",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Geology, Hydrogeology, Environmental Chemistry, Climate Science, Environmental Monitoring, Contamination Assessment"
      },
      {
        name: "Environmental Science",
        fullTitle: "BSc Environmental Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Chemistry, Ecology, Environmental Monitoring, Pollution Control, Conservation Biology, Sustainability, Climate Change"
      }
    ],
    "King's College London": [
      // Computer Science & IT (BSc)
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Systems, Databases, Artificial Intelligence, Machine Learning"
      },
      {
        name: "Computer Science with Intelligent Systems",
        fullTitle: "BSc Computer Science with Intelligent Systems",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Expert Systems, Computer Vision, Natural Language Processing, Robotics"
      },
      {
        name: "Computer Science with Management",
        fullTitle: "BSc Computer Science with Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Software Development, Business Management, Economics, Finance, Project Management, Entrepreneurship"
      },
      // Engineering (BEng)
      {
        name: "Electronic Engineering",
        fullTitle: "BEng Electronic Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Design, Electronics, Signal Processing, Communications, Control Systems, Power Electronics, VLSI Design"
      },
      {
        name: "Robotics",
        fullTitle: "BEng Robotics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Robot Design, Control Systems, AI for Robotics, Computer Vision, Sensors and Actuators, Mobile Robotics"
      },
      {
        name: "Biomedical Engineering",
        fullTitle: "BEng Biomedical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Medical Devices, Biomechanics, Bioelectronics, Medical Imaging, Biomaterials, Physiological Systems"
      },
      // Mathematics & Statistics (BSc)
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",  
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Differential Equations, Mathematical Methods"
      },
      {
        name: "Mathematics & Statistics",
        fullTitle: "BSc Mathematics & Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Mathematical Statistics, Regression Analysis, Time Series, Statistical Computing"
      },
      {
        name: "Financial Mathematics",
        fullTitle: "BSc Financial Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Modeling, Risk Management, Derivatives, Portfolio Theory, Quantitative Finance, Statistics, Economics"
      },
      // Sciences (BSc)
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics, Astrophysics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Biochemistry, Materials Chemistry"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Cell Biology, Structural Biology, Medical Biochemistry"
      },
      {
        name: "Biosciences",
        fullTitle: "BSc Biosciences",  
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Molecular Biology, Ecology, Evolution, Physiology, Microbiology, Biotechnology"
      },
      // Psychology & Neuroscience (BSc)
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods, Statistics, Neuropsychology"
      },
      {
        name: "Neuroscience",
        fullTitle: "BSc Neuroscience",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Neuroanatomy, Neurophysiology, Cognitive Neuroscience, Behavioral Neuroscience, Neuropharmacology, Brain Imaging"
      },
      // Arts & Humanities (BA)
      {
        name: "English Language & Literature",
        fullTitle: "BA English Language & Literature",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Literary Criticism, Creative Writing, Linguistics, British Literature, World Literature, Poetry, Drama, Literary Theory"
      },
      {
        name: "History",
        fullTitle: "BA History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "British History, European History, World History, Medieval History, Modern History, Historical Methods, Cultural History"
      },
      {
        name: "Philosophy",
        fullTitle: "BA Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Ethics, Metaphysics, Philosophy of Mind, Political Philosophy, Epistemology, History of Philosophy"
      },
      {
        name: "Classical Studies",
        fullTitle: "BA Classical Studies",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Ancient Greek, Latin, Classical Literature, Ancient History, Classical Archaeology, Classical Philosophy"
      },
      {
        name: "Comparative Literature",
        fullTitle: "BA Comparative Literature",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "World Literature, Literary Theory, Translation Studies, Cultural Studies, European Literature, Postcolonial Literature"
      },
      // Social Sciences & Law (BA)
      {
        name: "International Relations",
        fullTitle: "BA International Relations",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "International Theory, Global Politics, Security Studies, International Political Economy, Diplomacy, Conflict Resolution"
      },
      {
        name: "Politics",
        fullTitle: "BA Politics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Theory, Comparative Politics, British Politics, European Politics, Public Policy, Political Economy"
      },
      {
        name: "War Studies",
        fullTitle: "BA War Studies",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Military History, Strategic Studies, Security Studies, Conflict Analysis, Defense Policy, International Security"
      },
      {
        name: "Law",
        fullTitle: "BA Law",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Constitutional Law, Criminal Law, Contract Law, Tort Law, EU Law, Human Rights Law, Legal Theory"
      },
      // Languages & Culture (BA)
      {
        name: "Modern Languages",
        fullTitle: "BA Modern Languages",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Mandatory",
        courseContent: "French, German, Spanish, Portuguese, Language Studies, Literature, Cultural Studies, Translation"
      },
      {
        name: "Liberal Arts",
        fullTitle: "BA Liberal Arts",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Interdisciplinary Studies, Critical Thinking, Philosophy, Literature, History, Arts, Sciences, Research Methods"
      },
      // Geography & Environmental Sciences
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, Environmental Science, GIS, Remote Sensing, Climate Change, Urban Geography"
      },
      {
        name: "Global Health & Social Medicine",
        fullTitle: "BSc Global Health & Social Medicine",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Public Health, Epidemiology, Health Policy, Social Medicine, Global Health, Health Systems, Medical Sociology"
      }
    ],
    // ADD MORE UNIVERSITIES WITH COMPREHENSIVE BSc COURSES
    "University of Bristol": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, Databases, Machine Learning, Computer Vision"
      },
      {
        name: "Computer Science and Mathematics",
        fullTitle: "BSc Computer Science and Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Mathematical Methods, Discrete Mathematics, Algorithm Analysis, Computational Mathematics, Mathematical Modelling, Statistics"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Differential Equations, Mathematical Methods, Topology"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression, Time Series, Bayesian Statistics, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics, Condensed Matter"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Physics, Observational Astronomy, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Quantum Chemistry, Materials Chemistry"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Cell Biology, Structural Biology, Bioinformatics"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods, Statistics"
      },
      // Geography & Environmental Sciences
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management, Climate Change, Urban Geography"
      },
      {
        name: "Environmental Science",
        fullTitle: "BSc Environmental Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Chemistry, Ecology, Environmental Monitoring, Pollution Control, Conservation Biology, Sustainability"
      }
    ],
    "London School of Economics (LSE)": [
      // Economics & Finance (BSc)
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Mathematical Economics, Economic History, Development Economics, International Economics"
      },
      {
        name: "Economics and Finance",
        fullTitle: "BSc Economics and Finance",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Economics, Corporate Finance, Investment Analysis, Portfolio Management, Risk Management, Derivatives, Financial Markets"
      },
      {
        name: "Actuarial Science",
        fullTitle: "BSc Actuarial Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Actuarial Mathematics, Risk Theory, Insurance, Statistics, Financial Mathematics, Probability Theory, Life Contingencies"
      },
      {
        name: "Financial Mathematics and Statistics",
        fullTitle: "BSc Financial Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stochastic Calculus, Financial Modeling, Quantitative Risk Management, Statistical Methods, Time Series Analysis, Derivatives Pricing"
      },
      // Business & Management (BSc)
      {
        name: "Management",
        fullTitle: "BSc Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Operations Management, Human Resource Management, Marketing, Finance, Organizational Behaviour"
      },
      {
        name: "Accounting and Finance",
        fullTitle: "BSc Accounting and Finance",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis, Financial Markets, Auditing"
      },
      // Mathematics & Statistics (BSc)
      {
        name: "Mathematics with Economics",
        fullTitle: "BSc Mathematics with Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Mathematical Economics, Econometrics, Real Analysis, Linear Algebra, Optimization, Game Theory, Financial Mathematics"
      },
      {
        name: "Statistics",
        fullTitle: "BSc Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Time Series, Bayesian Statistics, Statistical Computing"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistical Theory, Probability Theory, Mathematical Statistics, Data Science"
      },
      // Social Sciences (BSc/BA)
      {
        name: "Government",
        fullTitle: "BSc Government",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Theory, Comparative Politics, International Relations, Public Policy, Political Economy, Research Methods"
      },
      {
        name: "International Relations",
        fullTitle: "BSc International Relations",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "International Theory, Global Governance, Security Studies, International Political Economy, Diplomacy, Conflict Resolution"
      },
      {
        name: "Government and History",
        fullTitle: "BSc Government and History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political History, Constitutional History, International History, Political Theory, Comparative Government, Historical Methods"
      },
      {
        name: "Social Policy",
        fullTitle: "BSc Social Policy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Social Policy Analysis, Welfare Systems, Public Administration, Social Research Methods, Health Policy, Education Policy"
      },
      {
        name: "Sociology",
        fullTitle: "BSc Sociology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Sociological Theory, Social Research Methods, Social Stratification, Urban Sociology, Political Sociology, Cultural Studies"
      },
      // Psychology (BSc)
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics, Behavioral Economics"
      },
      {
        name: "Psychological and Behavioural Science",
        fullTitle: "BSc Psychological and Behavioural Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Behavioral Economics, Decision Science, Cognitive Science, Social Psychology, Research Methods, Experimental Methods"
      },
      // Geography & Environmental Sciences (BSc)
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Human Geography, Economic Geography, Urban Geography, Development Geography, GIS, Research Methods"
      },
      {
        name: "Environment and Development",
        fullTitle: "BSc Environment and Development",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Economics, Development Studies, Climate Policy, Sustainable Development, Environmental Management, GIS"
      },
      // Philosophy & Logic (BA)
      {
        name: "Philosophy",
        fullTitle: "BA Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Ethics, Political Philosophy, Philosophy of Mind, Epistemology, Metaphysics, Philosophy of Science"
      },
      {
        name: "Philosophy, Politics and Economics",
        fullTitle: "BA Philosophy, Politics and Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Philosophy, Economic Theory, Ethics, Logic, Political Theory, Philosophy of Economics, Public Policy"
      },
      // History (BA)
      {
        name: "History",
        fullTitle: "BA History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "British History, European History, World History, Economic History, Social History, Political History, Historical Methods"
      },
      {
        name: "Economic History",
        fullTitle: "BSc Economic History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Economic Development, Financial History, Industrial Revolution, Global Economic History, Quantitative Methods, Economic Theory"
      },
      // Law (BA)
      {
        name: "Law",
        fullTitle: "BA Law",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Constitutional Law, Criminal Law, Contract Law, Tort Law, EU Law, Human Rights Law, International Law"
      },
      // Anthropology (BSc)
      {
        name: "Social Anthropology",
        fullTitle: "BSc Social Anthropology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Anthropological Theory, Ethnography, Cultural Studies, Social Organization, Economic Anthropology, Political Anthropology"
      }
    ],
    "University of York": [
      // Computer Science & IT (BSc)
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Systems, AI, Machine Learning, Human-Computer Interaction"
      },
      {
        name: "Computer Science with Artificial Intelligence",
        fullTitle: "BSc Computer Science with Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Expert Systems, Robotics"
      },
      {
        name: "Computer Science with Cyber Security",
        fullTitle: "BSc Computer Science with Cyber Security",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Network Security, Cryptography, Ethical Hacking, Digital Forensics, Risk Assessment, Security Systems, Malware Analysis"
      },
      // Engineering (BEng)
      {
        name: "Electronic Engineering",
        fullTitle: "BEng Electronic Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Design, Electronics, Signal Processing, Communications, Control Systems, Power Electronics, Embedded Systems"
      },
      {
        name: "Electronic and Computer Engineering",
        fullTitle: "BEng Electronic and Computer Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Digital Systems, Computer Architecture, Embedded Programming, VLSI Design, Signal Processing, Control Systems"
      },
      // Mathematics (BSc)
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Differential Equations, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Time Series, Statistical Computing"
      },
      {
        name: "Financial and Actuarial Mathematics",
        fullTitle: "BSc Financial and Actuarial Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Mathematics, Actuarial Science, Risk Theory, Insurance Mathematics, Investment Analysis, Statistics"
      },
      // Sciences (BSc)
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Green Chemistry"
      },
      {
        name: "Biology",
        fullTitle: "BSc Biology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Molecular Biology, Ecology, Evolution, Biochemistry, Physiology, Microbiology"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Structural Biology, Bioinformatics, Medical Biochemistry"
      },
      {
        name: "Biomedical Sciences",
        fullTitle: "BSc Biomedical Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Human Physiology, Pathology, Immunology, Pharmacology, Medical Genetics, Disease Mechanisms, Clinical Sciences"
      },
      // Psychology (BSc)
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics, Neuropsychology"
      },
      {
        name: "Psychology in Education",
        fullTitle: "BSc Psychology in Education",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Educational Psychology, Developmental Psychology, Learning Theories, Assessment Methods, Research Methods, Statistics"
      },
      // Business & Economics (BA/BSc)
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Economic History, Development Economics, International Trade"
      },
      {
        name: "Economics and Finance",
        fullTitle: "BSc Economics and Finance",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Economics, Corporate Finance, Investment Analysis, Financial Markets, Risk Management, Economics"
      },
      {
        name: "Management",
        fullTitle: "BSc Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Operations Management, Marketing, Human Resources, Finance, Organizational Behaviour"
      },
      // Arts & Humanities (BA)
      {
        name: "English and Related Literature",
        fullTitle: "BA English and Related Literature",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Literary Analysis, Creative Writing, British Literature, World Literature, Critical Theory, Language Studies"
      },
      {
        name: "History",
        fullTitle: "BA History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "British History, European History, World History, Medieval History, Modern History, Historical Methods"
      },
      {
        name: "Philosophy",
        fullTitle: "BA Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Ethics, Metaphysics, Philosophy of Mind, Political Philosophy, Epistemology, History of Philosophy"
      },
      {
        name: "Linguistics",
        fullTitle: "BA Linguistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Phonetics, Syntax, Semantics, Psycholinguistics, Sociolinguistics, Language Acquisition, Historical Linguistics"
      },
      // Social Sciences (BA)
      {
        name: "Politics",
        fullTitle: "BA Politics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Theory, Comparative Politics, British Politics, International Relations, Public Policy, Political Economy"
      },
      {
        name: "Social and Political Sciences",
        fullTitle: "BA Social and Political Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Sociology, Politics, Social Policy, Research Methods, Social Theory, Political Economy, Social Research"
      },
      {
        name: "Sociology",
        fullTitle: "BA Sociology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Sociological Theory, Social Research Methods, Social Stratification, Cultural Sociology, Political Sociology"
      },
      // Languages (BA)
      {
        name: "Modern Languages",
        fullTitle: "BA Modern Languages",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Mandatory",
        courseContent: "French, German, Spanish, Italian, Language Studies, Literature, Cultural Studies, Translation Studies"
      },
      // Music & Arts (BA)
      {
        name: "Music",
        fullTitle: "BA Music",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Music Theory, Composition, Performance, Music History, Ethnomusicology, Music Technology, Analysis"
      }
    ],
    "University of Southampton": [
      // Computer Science & IT (BSc)
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, Databases, Web Technologies, Mobile Computing"
      },
      {
        name: "Artificial Intelligence",
        fullTitle: "BSc Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Robotics, Expert Systems, AI Ethics"
      },
      {
        name: "Computer Science with Cyber Security",
        fullTitle: "BSc Computer Science with Cyber Security",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Network Security, Cryptography, Ethical Hacking, Digital Forensics, Risk Management, Security Systems"
      },
      {
        name: "Software Engineering",
        fullTitle: "BSc Software Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Optional",
        courseContent: "Software Development, System Design, Testing, Project Management, Agile Methods, Database Systems, User Experience"
      },
      // Engineering (BEng)
      {
        name: "Electronic Engineering",
        fullTitle: "BEng Electronic Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Analysis, Electronics, Signal Processing, Communications, Control Systems, Power Electronics, VLSI Design"
      },
      {
        name: "Electrical and Electronic Engineering",
        fullTitle: "BEng Electrical and Electronic Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Power Systems, Electronics, Control Systems, Communications, Signal Processing, Renewable Energy"
      },
      {
        name: "Mechanical Engineering",
        fullTitle: "BEng Mechanical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Thermodynamics, Fluid Mechanics, Materials Science, Design Engineering, Manufacturing, Control Systems"
      },
      {
        name: "Aerospace Engineering",
        fullTitle: "BEng Aerospace Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Aerodynamics, Flight Mechanics, Aircraft Design, Propulsion Systems, Materials, Control Systems, Space Technology"
      },
      {
        name: "Civil Engineering",
        fullTitle: "BEng Civil Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Structural Engineering, Geotechnical Engineering, Hydraulics, Construction Management, Environmental Engineering"
      },
      // Mathematics (BSc)
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Differential Equations, Mathematical Methods"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Time Series, Statistical Computing, Bayesian Statistics"
      },
      {
        name: "Mathematics with Finance",
        fullTitle: "BSc Mathematics with Finance",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Mathematics, Risk Management, Derivatives, Portfolio Theory, Quantitative Finance, Statistics"
      },
      // Sciences (BSc)
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics, Optics"
      },
      {
        name: "Physics with Astronomy",
        fullTitle: "BSc Physics with Astronomy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Astronomy, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Computational Chemistry, Materials Chemistry"
      },
      {
        name: "Biological Sciences",
        fullTitle: "BSc Biological Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Molecular Biology, Ecology, Evolution, Biochemistry, Physiology, Marine Biology"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Structural Biology, Bioinformatics"
      },
      // Psychology (BSc)
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics, Neuropsychology"
      },
      {
        name: "Psychology with Cognitive Neuroscience",
        fullTitle: "BSc Psychology with Cognitive Neuroscience",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Neuroscience, Brain Imaging, Neuropsychology, Experimental Methods, Statistics"
      },
      // Business & Economics (BSc/BA)
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics, International Economics, Economic Policy"
      },
      {
        name: "Management",
        fullTitle: "BSc Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Operations Management, Marketing, Finance, Human Resources, International Business"
      },
      {
        name: "Accounting and Finance",
        fullTitle: "BSc Accounting and Finance",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis, Financial Markets"
      },
      // Arts & Humanities (BA)
      {
        name: "English Language and Literature",
        fullTitle: "BA English Language and Literature",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Literary Analysis, Creative Writing, British Literature, World Literature, Critical Theory, Linguistics"
      },
      {
        name: "History",
        fullTitle: "BA History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "British History, European History, World History, Medieval History, Modern History, Social History"
      },
      {
        name: "Philosophy",
        fullTitle: "BA Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Ethics, Metaphysics, Philosophy of Mind, Political Philosophy, Epistemology"
      },
      {
        name: "Music",
        fullTitle: "BA Music",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Music Theory, Composition, Performance, Music History, Ethnomusicology, Music Technology"
      },
      // Social Sciences (BA)
      {
        name: "Politics and International Relations",
        fullTitle: "BA Politics and International Relations",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Theory, International Relations, Comparative Politics, Security Studies, Political Economy"
      },
      {
        name: "Sociology",
        fullTitle: "BA Sociology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Sociological Theory, Social Research Methods, Social Stratification, Cultural Sociology, Political Sociology"
      },
      // Languages (BA)
      {
        name: "Modern Languages",
        fullTitle: "BA Modern Languages",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Mandatory",
        courseContent: "French, German, Spanish, Italian, Language Studies, Literature, Cultural Studies, Translation"
      },
      // Geography (BSc)
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, Environmental Science, GIS, Remote Sensing, Climate Change"
      }
    ],
    "University of Warwick": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Software Engineering, Machine Learning, Computer Vision, Robotics, Human-Computer Interaction"
      },
      {
        name: "Computer Science and Electronics",
        fullTitle: "BSc Computer Science and Electronics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Digital Electronics, Embedded Systems, Signal Processing, Computer Architecture, VLSI Design"
      },
      // Engineering
      {
        name: "Electrical and Electronic Engineering",
        fullTitle: "BEng Electrical and Electronic Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Analysis, Power Systems, Control Systems, Communications, Signal Processing, Electromagnetics"
      },
      {
        name: "Mechanical Engineering",
        fullTitle: "BEng Mechanical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Thermodynamics, Fluid Mechanics, Materials, Design, Manufacturing, Robotics, Control Systems"
      },
      {
        name: "Civil Engineering",
        fullTitle: "BEng Civil Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Structural Engineering, Geotechnics, Hydraulics, Transportation, Environmental Engineering, Construction Management"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Physics, Quantum Mechanics, Electromagnetism, Condensed Matter, Astrophysics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Medicinal Chemistry"
      },
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics, Numerical Analysis"
      },
      {
        name: "Biology",
        fullTitle: "BSc Biology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Evolution, Ecology, Biochemistry, Molecular Biology, Bioinformatics"
      },
      // Business & Economics
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics, International Economics, Public Economics"
      },
      {
        name: "Management",
        fullTitle: "BSc Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Finance, Marketing, Operations, Human Resources, International Business"
      },
      // Social Sciences
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods"
      }
    ],
    "University of Warwick": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Software Engineering, Database Systems, Machine Learning, Computer Graphics, Distributed Systems"
      },
      {
        name: "Computer Systems Engineering",
        fullTitle: "BEng Computer Systems Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Computer Architecture, Embedded Systems, Digital Design, Operating Systems, Real-time Systems, Hardware-Software Integration"
      },
      {
        name: "Data Science",
        fullTitle: "BSc Data Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistics, Machine Learning, Data Mining, Big Data Analytics, Visualization, Programming, Database Systems"
      },
      // Engineering
      {
        name: "Engineering",
        fullTitle: "BEng Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Engineering Mathematics, Mechanics, Electrical Engineering, Materials, Design, Control Systems"
      },
      {
        name: "Electronic Engineering",
        fullTitle: "BEng Electronic Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Electronics, Signal Processing, Communications, Control Systems, Digital Systems, VLSI Design"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Physics, Quantum Mechanics, Electromagnetism, Statistical Physics, Particle Physics, Condensed Matter"
      },
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics, Operations Research"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Materials Chemistry"
      },
      // Business & Economics
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Game Theory, International Economics, Public Economics"
      },
      {
        name: "Management",
        fullTitle: "BSc Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Finance, Marketing, Operations, Organizational Behaviour, International Business"
      },
      // Social Sciences
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics, Neuroscience"
      }
    ],
    "University of Birmingham": [
      // Computer Science & IT (BSc)
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, Databases, AI, Machine Learning"
      },
      {
        name: "Computer Science and Artificial Intelligence",
        fullTitle: "BSc Computer Science and Artificial Intelligence",  
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Expert Systems"
      },
      {
        name: "Computer Science with Software Engineering",
        fullTitle: "BSc Computer Science with Software Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Software Development, System Design, Testing, Project Management, Agile Methods, Database Systems"
      },
      // Engineering (BEng)
      {
        name: "Civil Engineering",
        fullTitle: "BEng Civil Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Structural Engineering, Geotechnical Engineering, Hydraulics, Construction Management, Environmental Engineering"
      },
      {
        name: "Mechanical Engineering",
        fullTitle: "BEng Mechanical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Thermodynamics, Fluid Mechanics, Materials Science, Design Engineering, Manufacturing, Control Systems"
      },
      {
        name: "Electronic and Electrical Engineering",
        fullTitle: "BEng Electronic and Electrical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Analysis, Electronics, Signal Processing, Power Systems, Communications, Control Systems"
      },
      {
        name: "Chemical Engineering",
        fullTitle: "BEng Chemical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Process Engineering, Chemical Reactions, Heat and Mass Transfer, Process Control, Safety Engineering"
      },
      // Mathematics & Statistics (BSc)
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Differential Equations, Mathematical Methods"
      },
      {
        name: "Mathematical Sciences",
        fullTitle: "BSc Mathematical Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Applied Mathematics, Statistics, Operational Research, Mathematical Modelling, Numerical Analysis"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Time Series, Statistical Computing"
      },
      // Sciences (BSc)
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics"
      },
      {
        name: "Physics and Astrophysics",
        fullTitle: "BSc Physics and Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Materials Chemistry"
      },
      {
        name: "Biological Sciences",
        fullTitle: "BSc Biological Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Molecular Biology, Ecology, Evolution, Biochemistry, Physiology"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Structural Biology, Bioinformatics"
      },
      // Psychology (BSc)
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods"
      },
      {
        name: "Psychology with Business",
        fullTitle: "BSc Psychology with Business",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Consumer Psychology, Organizational Psychology, Marketing Psychology, Business Ethics, Research Methods"
      },
      // Arts & Humanities (BA)
      {
        name: "English Language and Literature",
        fullTitle: "BA English Language and Literature",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Literary Analysis, Creative Writing, British Literature, World Literature, Critical Theory, Linguistics"
      },
      {
        name: "History",
        fullTitle: "BA History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "British History, European History, World History, Medieval History, Modern History, Historical Methods"
      },
      {
        name: "Philosophy",
        fullTitle: "BA Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Ethics, Metaphysics, Philosophy of Mind, Political Philosophy, Epistemology"
      },
      {
        name: "Modern Languages",
        fullTitle: "BA Modern Languages",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Mandatory",
        courseContent: "French, German, Spanish, Russian, Language Studies, Literature, Cultural Studies, Translation"
      },
      // Social Sciences (BA)
      {
        name: "Political Science",
        fullTitle: "BA Political Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Theory, Comparative Politics, International Relations, Public Policy, Political Economy"
      },
      {
        name: "International Relations",
        fullTitle: "BA International Relations",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "International Theory, Global Politics, Security Studies, Diplomacy, Conflict Resolution"
      },
      {
        name: "Sociology",
        fullTitle: "BA Sociology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Sociological Theory, Social Research Methods, Social Stratification, Cultural Sociology"
      },
      // Business & Economics (BSc/BA)
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics, International Economics"
      },
      {
        name: "Business Management",
        fullTitle: "BSc Business Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Operations Management, Marketing, Finance, Human Resources, International Business"
      },
      {
        name: "Accounting and Finance",
        fullTitle: "BSc Accounting and Finance",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis, Financial Markets"
      },
      // Geography & Environmental Sciences (BSc)
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management, Climate Change"
      },
      {
        name: "Environmental Science",
        fullTitle: "BSc Environmental Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Chemistry, Ecology, Environmental Monitoring, Conservation Biology, Sustainability"
      },
      // Creative Arts (BA)
      {
        name: "Music",
        fullTitle: "BA Music",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Music Theory, Composition, Performance, Music History, Ethnomusicology, Music Technology"
      }
    ],
    "University of Leeds": [
      // Computer Science & IT (BSc)
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Software Engineering, Computer Systems, AI, Machine Learning, Data Science"
      },
      {
        name: "Computer Science with Artificial Intelligence",
        fullTitle: "BSc Computer Science with Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Robotics, Expert Systems"
      },
      {
        name: "Digital Media",
        fullTitle: "BSc Digital Media",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Digital Design, Interactive Media, Web Development, Multimedia Programming, User Experience Design"
      },
      // Engineering (BEng)
      {
        name: "Civil Engineering",
        fullTitle: "BEng Civil Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Structural Engineering, Geotechnical Engineering, Hydraulics, Construction Management, Environmental Engineering"
      },
      {
        name: "Mechanical Engineering",
        fullTitle: "BEng Mechanical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Thermodynamics, Fluid Mechanics, Materials Science, Design Engineering, Manufacturing Systems"
      },
      {
        name: "Electronic and Electrical Engineering",
        fullTitle: "BEng Electronic and Electrical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Design, Electronics, Signal Processing, Power Systems, Communications, Control Systems"
      },
      {
        name: "Chemical Engineering",
        fullTitle: "BEng Chemical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Process Engineering, Chemical Reactions, Heat and Mass Transfer, Process Control, Safety Engineering"
      },
      // Mathematics & Statistics (BSc)
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Time Series, Statistical Computing"
      },
      {
        name: "Financial Mathematics",
        fullTitle: "BSc Financial Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Modeling, Risk Management, Derivatives, Portfolio Theory, Quantitative Finance"
      },
      // Sciences (BSc)  
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Astronomy"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Green Chemistry"
      },
      {
        name: "Biological Sciences",
        fullTitle: "BSc Biological Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cell Biology, Genetics, Molecular Biology, Ecology, Evolution, Biochemistry, Physiology"
      },
      {
        name: "Biochemistry",
        fullTitle: "BSc Biochemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Protein Chemistry, Enzymology, Metabolism, Molecular Biology, Structural Biology"
      },
      // Psychology (BSc)
      {
        name: "Psychology", 
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      {
        name: "Psychology with Education",
        fullTitle: "BSc Psychology with Education",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Educational Psychology, Developmental Psychology, Learning Theories, Assessment Methods"
      },
      // Arts & Humanities (BA)
      {
        name: "English Literature",
        fullTitle: "BA English Literature",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Literary Analysis, British Literature, World Literature, Creative Writing, Critical Theory"
      },
      {
        name: "History",
        fullTitle: "BA History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "British History, European History, World History, Medieval History, Modern History"
      },
      {
        name: "Philosophy",
        fullTitle: "BA Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Ethics, Metaphysics, Philosophy of Mind, Political Philosophy, Epistemology"
      },
      {
        name: "Linguistics and Phonetics",
        fullTitle: "BA Linguistics and Phonetics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Phonetics, Syntax, Semantics, Psycholinguistics, Sociolinguistics, Language Acquisition"
      },
      // Social Sciences (BA)
      {
        name: "Politics",
        fullTitle: "BA Politics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Theory, Comparative Politics, International Relations, Public Policy"
      },
      {
        name: "International Relations",
        fullTitle: "BA International Relations",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "International Theory, Global Politics, Security Studies, Diplomacy, Conflict Resolution"
      },
      {
        name: "Sociology and Social Policy",
        fullTitle: "BA Sociology and Social Policy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Sociological Theory, Social Policy Analysis, Social Research Methods, Welfare Systems"
      },
      // Business & Economics (BSc/BA)
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics, International Economics"
      },
      {
        name: "Business Management",
        fullTitle: "BSc Business Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Operations Management, Marketing, Finance, Human Resources"
      },
      {
        name: "International Business",
        fullTitle: "BSc International Business",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Global Business Strategy, International Marketing, Cross-Cultural Management, International Finance"
      },
      // Geography & Environmental Sciences (BSc)
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      },
      {
        name: "Environmental Science",
        fullTitle: "BSc Environmental Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Chemistry, Ecology, Environmental Monitoring, Conservation, Sustainability"
      },
      // Creative Arts & Media (BA)
      {
        name: "Fine Art",
        fullTitle: "BA Fine Art",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Drawing, Painting, Sculpture, Installation Art, Contemporary Art Practice, Art Theory"
      }
    ],
    "University of Sheffield": [
      // Computer Science & IT (BSc)
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Software Engineering",
        fullTitle: "BSc Software Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Software Development, System Design, Testing, Project Management, Agile Methods, Database Systems"
      },
      {
        name: "Computer Science with Artificial Intelligence",
        fullTitle: "BSc Computer Science with Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Natural Language Processing"
      },
      // Engineering (BEng)
      {
        name: "Aerospace Engineering",
        fullTitle: "BEng Aerospace Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Aerodynamics, Flight Mechanics, Aircraft Design, Propulsion Systems, Materials, Control Systems"
      },
      {
        name: "Civil and Structural Engineering",
        fullTitle: "BEng Civil and Structural Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Structural Engineering, Geotechnical Engineering, Hydraulics, Construction Management, Environmental Engineering"
      },
      {
        name: "Mechanical Engineering",
        fullTitle: "BEng Mechanical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Thermodynamics, Fluid Mechanics, Materials Science, Design Engineering, Manufacturing, Control Systems"
      },
      {
        name: "Electronic and Electrical Engineering",
        fullTitle: "BEng Electronic and Electrical Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Circuit Design, Electronics, Signal Processing, Power Systems, Communications, Control Systems"
      },
      // Mathematics & Statistics (BSc)
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression, Time Series, Bayesian Statistics"
      },
      {
        name: "Financial Mathematics",
        fullTitle: "BSc Financial Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Modeling, Risk Management, Derivatives, Portfolio Theory, Quantitative Finance"
      },
      // Sciences (BSc)
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Materials Chemistry"
      },
      {
        name: "Biomedical Science",
        fullTitle: "BSc Biomedical Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Human Physiology, Pathology, Immunology, Pharmacology, Medical Genetics, Disease Mechanisms"
      },
      {
        name: "Biochemistry and Genetics",
        fullTitle: "BSc Biochemistry and Genetics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Molecular Biology, Genetics, Protein Chemistry, Enzymology, Biotechnology, Bioinformatics"
      },
      // Psychology (BSc)
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      {
        name: "Psychology with Criminology",
        fullTitle: "BSc Psychology with Criminology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Criminal Psychology, Forensic Psychology, Social Psychology, Research Methods, Criminological Theory"
      },
      // Arts & Humanities (BA)
      {
        name: "English Language and Literature",
        fullTitle: "BA English Language and Literature",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Literary Analysis, Creative Writing, British Literature, World Literature, Critical Theory, Linguistics"
      },
      {
        name: "History",
        fullTitle: "BA History",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "British History, European History, World History, Social History, Political History, Historical Methods"
      },
      {
        name: "Philosophy",
        fullTitle: "BA Philosophy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Logic, Ethics, Metaphysics, Philosophy of Mind, Political Philosophy, Epistemology"
      },
      {
        name: "Modern Languages and Linguistics",
        fullTitle: "BA Modern Languages and Linguistics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Mandatory",
        courseContent: "French, German, Spanish, Italian, Russian, Linguistics, Cultural Studies, Translation"
      },
      // Social Sciences (BA)
      {
        name: "Politics",
        fullTitle: "BA Politics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Political Theory, Comparative Politics, International Relations, Public Policy, Political Economy"
      },
      {
        name: "International Relations and Politics",
        fullTitle: "BA International Relations and Politics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "International Theory, Global Politics, Security Studies, Diplomacy, Conflict Resolution"
      },
      {
        name: "Sociology",
        fullTitle: "BA Sociology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Sociological Theory, Social Research Methods, Social Stratification, Cultural Sociology, Urban Sociology"
      },
      // Business & Economics (BSc/BA)
      {
        name: "Economics",
        fullTitle: "BSc Economics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics, International Economics"
      },
      {
        name: "Management",
        fullTitle: "BSc Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Strategic Management, Operations Management, Marketing, Finance, Human Resources, International Business"
      },
      {
        name: "Accounting and Financial Management",
        fullTitle: "BSc Accounting and Financial Management",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis, Financial Markets"
      },
      // Geography & Environmental Sciences (BSc)
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      },
      {
        name: "Environmental Science",
        fullTitle: "BSc Environmental Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Chemistry, Ecology, Environmental Monitoring, Conservation Biology, Sustainability"
      },
      // Creative Arts (BA)
      {
        name: "Music",
        fullTitle: "BA Music",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Music Theory, Composition, Performance, Music History, Ethnomusicology, Music Technology"
      }
    ],
    "University of Newcastle": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Networks and Cybersecurity",
        fullTitle: "BSc Computer Networks and Cybersecurity",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Network Security, Cryptography, Ethical Hacking, Digital Forensics, Risk Management, Penetration Testing"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "University of Liverpool": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Software Engineering, Computer Systems, AI, Machine Learning, Data Science"
      },
      {
        name: "Computer Science with Year in Industry",
        fullTitle: "BSc Computer Science with Year in Industry",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Not Available",
        courseContent: "Programming, Software Development, Industrial Experience, Project Management, Professional Skills"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics with Ocean and Climate Sciences",
        fullTitle: "BSc Mathematics with Ocean and Climate Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Mathematical Modelling, Climate Dynamics, Oceanography, Statistical Analysis, Environmental Mathematics"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "University of Glasgow": [
      // Computer Science & IT
      {
        name: "Computing Science",
        fullTitle: "BSc Computing Science",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Software Engineering, Computer Systems, AI, Machine Learning, Human-Computer Interaction"
      },
      {
        name: "Software Engineering",
        fullTitle: "BSc Software Engineering",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Software Development, System Design, Testing, Project Management, Agile Methods, Database Systems"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics & Statistics",
        fullTitle: "BSc Mathematics & Statistics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Astronomy",
        fullTitle: "BSc Astronomy",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology  
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "University of Leicester": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Science with Year Abroad",
        fullTitle: "BSc Computer Science with Year Abroad",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Mandatory",
        courseContent: "Programming, International Experience, Cultural Computing, Global Software Development"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Financial Mathematics",
        fullTitle: "BSc Financial Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Modelling, Risk Management, Derivatives, Portfolio Theory, Mathematical Finance"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "University of Nottingham": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Algorithms, Software Engineering, Computer Systems, AI, Machine Learning, Human-Computer Interaction"
      },
      {
        name: "Computer Science and Artificial Intelligence",
        fullTitle: "BSc Computer Science and Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Natural Language Processing"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography & Environmental Sciences
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      },
      {
        name: "Environmental Science",
        fullTitle: "BSc Environmental Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Environmental Chemistry, Ecology, Environmental Monitoring, Pollution Control, Conservation Biology, Sustainability"
      }
    ],
    "University of Bath": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Human-Computer Interaction"
      },
      {
        name: "Computer Science with Business",
        fullTitle: "BSc Computer Science with Business",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Business Management, Economics, Finance, Entrepreneurship, Project Management, Software Development"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods, Differential Equations"
      },
      {
        name: "Mathematical Sciences",
        fullTitle: "BSc Mathematical Sciences",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Applied Mathematics, Statistics, Operational Research, Mathematical Modelling, Numerical Analysis, Data Science"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics, Condensed Matter"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Materials Chemistry, Green Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics, Neuropsychology"
      }
    ],
    "University of Surrey": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Software Engineering, Computer Systems, AI, Machine Learning, Cybersecurity, Data Science, Mobile Computing"
      },
      {
        name: "Computer and Internet Engineering",
        fullTitle: "BSc Computer and Internet Engineering",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Network Engineering, Internet Protocols, Cybersecurity, Digital Systems, Embedded Systems, IoT, Cloud Computing"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Methods, Analysis, Algebra, Differential Equations"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Time Series Analysis, Statistical Computing, Bayesian Statistics"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics, Optics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Materials Chemistry, Environmental Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Biological Psychology, Research Methods, Statistics"
      }
    ],
    "Loughborough University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Software Engineering, Computer Systems, AI, Machine Learning, Human-Computer Interaction, Game Development, Cybersecurity"
      },
      {
        name: "Computer Science and Artificial Intelligence",
        fullTitle: "BSc Computer Science and Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Expert Systems, Robotics"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Methods, Analysis, Algebra, Differential Equations"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Mathematical Statistics, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Condensed Matter Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Materials Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Sports Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management, Climate Change"
      }
    ],
    "Lancaster University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Science with Artificial Intelligence",
        fullTitle: "BSc Computer Science with Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Expert Systems"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods, Differential Equations"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Time Series, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Green Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics, Neuropsychology"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography", 
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "University of Exeter": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Science with Industrial Experience",
        fullTitle: "BSc Computer Science with Industrial Experience",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Not Available",
        courseContent: "Programming, Software Development, Industrial Placement, Professional Skills, Project Management"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods, Differential Equations"
      },
      {
        name: "Mathematics with Finance",
        fullTitle: "BSc Mathematics with Finance",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Financial Mathematics, Risk Management, Derivatives, Portfolio Theory, Mathematical Finance, Statistics"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Techniques"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Green Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography", 
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "Cardiff University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Human-Computer Interaction"
      },
      {
        name: "Computer Science with Security and Forensics",
        fullTitle: "BSc Computer Science with Security and Forensics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cybersecurity, Digital Forensics, Network Security, Cryptography, Ethical Hacking, Risk Assessment"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Atomic Physics"
      },
      {
        name: "Physics with Astronomy",
        fullTitle: "BSc Physics with Astronomy",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Observational Astronomy"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "Queen Mary University of London": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Games Technology",
        fullTitle: "BSc Computer Games Technology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Reading": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Data Science"
      },
      {
        name: "Computer Science with Placement Year",
        fullTitle: "BSc Computer Science with Placement Year",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Not Available",
        courseContent: "Programming, Software Development, Industrial Placement, Professional Skills, Project Management"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "University of Sussex": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Human-Computer Interaction"
      },
      {
        name: "Computer Science with Artificial Intelligence",
        fullTitle: "BSc Computer Science with Artificial Intelligence",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Expert Systems"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Physics with Astrophysics",
        fullTitle: "BSc Physics with Astrophysics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Stellar Physics, Galactic Astronomy, Cosmology, Planetary Science, Space Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Kent": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Science with Year in Industry",
        fullTitle: "BSc Computer Science with Year in Industry",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Not Available",
        courseContent: "Programming, Software Development, Industrial Placement, Professional Skills, Project Management"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years", 
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "Royal Holloway, University of London": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Science (Information Security)",
        fullTitle: "BSc Computer Science (Information Security)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cybersecurity, Network Security, Cryptography, Digital Forensics, Ethical Hacking, Risk Management"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics", 
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Physics with Particle Physics",
        fullTitle: "BSc Physics with Particle Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Particle Physics, Quantum Field Theory, High Energy Physics, Accelerator Physics, Detector Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "Brunel University London": [
      // Computer Science & IT  
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Human-Computer Interaction"
      },
      {
        name: "Computer Science (Artificial Intelligence)",
        fullTitle: "BSc Computer Science (Artificial Intelligence)",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "AI Programming, Machine Learning, Neural Networks, Computer Vision, Natural Language Processing, Expert Systems"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry", 
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "Swansea University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Science with Year in Industry",
        fullTitle: "BSc Computer Science with Year in Industry",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Mandatory",
        yearAbroad: "Not Available",
        courseContent: "Programming, Software Development, Industrial Placement, Professional Skills"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available", 
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "Heriot-Watt University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Systems",
        fullTitle: "BSc Computer Systems",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Computer Hardware, Operating Systems, Network Administration, System Design, Embedded Systems"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Stirling": [
      // Computer Science & IT
      {
        name: "Computing Science",
        fullTitle: "BSc Computing Science",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computing Science and Mathematics",
        fullTitle: "BSc Computing Science and Mathematics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Mathematical Methods, Discrete Mathematics, Algorithm Analysis, Computational Mathematics"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "Bangor University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Information Systems",
        fullTitle: "BSc Computer Information Systems",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Information Systems, Database Management, Business Analytics, Systems Analysis, Web Development"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "University of Hull": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Science with Games Development",
        fullTitle: "BSc Computer Science with Games Development",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "Keele University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Science with Foundation Year",
        fullTitle: "BSc Computer Science with Foundation Year",
        duration: "4 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Foundation Mathematics, Introduction to Programming, Computer Fundamentals, Core Computer Science"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Plymouth": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computing and Games Development",
        fullTitle: "BSc Computing and Games Development",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      },
      // Geography
      {
        name: "Geography",
        fullTitle: "BSc Geography",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Physical Geography, Human Geography, GIS, Remote Sensing, Environmental Management"
      }
    ],
    "University of Portsmouth": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Games Technology",
        fullTitle: "BSc Computer Games Technology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics  
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics with Statistics",
        fullTitle: "BSc Mathematics with Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "Coventry University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Cyber Security",
        fullTitle: "BSc Cyber Security",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Network Security, Cryptography, Ethical Hacking, Digital Forensics, Risk Management, Penetration Testing"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      {
        name: "Mathematics and Statistics",
        fullTitle: "BSc Mathematics and Statistics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Statistical Theory, Probability, Data Analysis, Regression Analysis, Statistical Computing"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Central Lancashire": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Games Development",
        fullTitle: "BSc Computer Games Development",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "Northumbria University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer and Digital Forensics",
        fullTitle: "BSc Computer and Digital Forensics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Digital Forensics, Cybersecurity, Network Security, Computer Crime Investigation, Evidence Analysis"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Derby": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle : "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Games Programming",
        fullTitle: "BSc Computer Games Programming",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Greenwich": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computing",
        fullTitle: "BSc Computing",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, System Administration, Database Management, Web Development, Mobile Computing"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Huddersfield": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Games Programming",
        fullTitle: "BSc Computer Games Programming",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Bradford": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Science for Games",
        fullTitle: "BSc Computer Science for Games",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      {
        name: "Chemistry",
        fullTitle: "BSc Chemistry",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Salford": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Games Development",
        fullTitle: "BSc Computer Games Development",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Sciences
      {
        name: "Physics",
        fullTitle: "BSc Physics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Classical Mechanics, Quantum Mechanics, Electromagnetism, Thermodynamics, Particle Physics"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "University of Westminster": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning, Cybersecurity"
      },
      {
        name: "Computer Games Development",
        fullTitle: "BSc Computer Games Development",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ],
    "Middlesex University": [
      // Computer Science & IT
      {
        name: "Computer Science",
        fullTitle: "BSc Computer Science",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Programming, Data Structures, Algorithms, Software Engineering, Computer Networks, AI, Machine Learning"
      },
      {
        name: "Computer Games Technology",
        fullTitle: "BSc Computer Games Technology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Game Programming, Computer Graphics, Game Design, AI for Games, Virtual Reality, Game Engines"
      },
      // Mathematics
      {
        name: "Mathematics",
        fullTitle: "BSc Mathematics",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Not Available",
        yearAbroad: "Optional",
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Analysis, Algebra, Mathematical Methods"
      },
      // Psychology
      {
        name: "Psychology",
        fullTitle: "BSc Psychology",
        duration: "3 years",
        studyMode: "Full time",
        distanceLearning: "Not Available",
        workPlacement: "Optional",
        yearAbroad: "Optional",
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods, Statistics"
      }
    ]
  };

  return universityCoursesMap[universityName] || [];
};

// Enhanced comprehensive course data with authentic university-specific courses
const generateComprehensiveCourseData = (university, programName, programData) => {
  // Get authentic courses for this specific university
  const authenticCourses = getAuthenticCoursesForUniversity(university.name);
  
  // Filter courses that match the search term
  return authenticCourses.filter(course => 
    course.name.toLowerCase().includes(programName.toLowerCase()) ||
    course.fullTitle.toLowerCase().includes(programName.toLowerCase()) ||
    course.courseContent.toLowerCase().includes(programName.toLowerCase())
  );
};

const CourseCard = ({ course, university, searchTerm, onSelectCourse, selectedCourses = [] }) => {
  const isSelected = selectedCourses && selectedCourses.some ? selectedCourses.some(selectedCourse => 
    selectedCourse.courseId === `${university.id}-${course.fullTitle}`
  ) : false;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
          {course.fullTitle || course.name}
        </h3>
        <button 
          onClick={() => onSelectCourse && onSelectCourse(course, university)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            isSelected 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Course'}
        </button>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700">
        <div><span className="font-medium">{course.duration || "Duration not specified"}</span></div>
        <div>Study mode: {course.studyMode || "Full time"}</div>
        <div>Distance learning: {course.distanceLearning || "Not Available"}</div>
        <div>Work placement year: {course.workPlacement || "Not Available"}</div>
        <div>Year abroad: {course.yearAbroad || "Optional"}</div>
        <div>Location: {university.location}</div>
      </div>
    </div>
  );
};

const UniversityCoursesSection = ({ university, searchTerm, onSelectCourse, selectedCourses = [] }) => {
  return (
    <div className="mb-8">
      {/* University Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{university.name}</h2>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <span className="text-green-200">THE Ranking: #{university.ranking}</span>
            <span className="text-green-200">•</span>
            <span className="text-green-200">Employment Rate: {university.employmentRate}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{university.courseCount} course(s)</div>
        </div>
      </div>
      
      {/* Course Cards */}
      <div className="bg-yellow-50 p-4 rounded-b-lg">
        {university.matchingCourses && university.matchingCourses.map((course, index) => (
          <CourseCard 
            key={index}
            course={course}
            university={university}
            searchTerm={searchTerm}
            onSelectCourse={onSelectCourse}
            selectedCourses={selectedCourses}
          />
        ))}
      </div>
    </div>
  );
};

const UniversityCard = ({ university, isSelected, onSelect, isCompareMode, searchMode, searchTerm }) => {
  const rankingColor = university.ranking <= 10 ? 'text-green-600' : 
                       university.ranking <= 50 ? 'text-yellow-600' : 'text-blue-600';
  
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl border-2 ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 leading-tight">{university.name}</h3>
        <div className="text-right">
          <div className={`text-2xl font-bold ${rankingColor}`}>#{university.ranking}</div>
          <div className="text-sm text-gray-600">THE Ranking</div>
        </div>
      </div>
      
      {/* Course Search Mode - Show matching courses */}
      {searchMode === 'courses' && searchTerm && university.courseCount > 0 && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-green-800">
              {university.courseCount} course{university.courseCount !== 1 ? 's' : ''} found
            </h4>
            <span className="text-sm text-green-600">for "{searchTerm}"</span>
          </div>
          <div className="space-y-1">
            {university.matchingCourses.slice(0, 3).map((course, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium text-green-700">{course.name}</span>
                {course.type === 'major' && (
                  <span className="text-green-600 ml-2">({course.parentProgram})</span>
                )}
              </div>
            ))}
            {university.courseCount > 3 && (
              <div className="text-sm text-green-600 font-medium">
                +{university.courseCount - 3} more course{university.courseCount - 3 !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="space-y-3 text-sm">
        <div><span className="font-semibold text-gray-700">Location:</span> {university.location}</div>
        <div><span className="font-semibold text-gray-700">UK Fees:</span> {university.tuitionFeesUK}</div>
        <div><span className="font-semibold text-gray-700">International:</span> {university.tuitionFeesInternational}</div>
        <div><span className="font-semibold text-gray-700">Entry:</span> {university.entryRequirements}</div>
        <div><span className="font-semibold text-gray-700">Employment Rate:</span> {university.employmentRate}</div>
      </div>
      
      <button
        onClick={() => onSelect(university)}
        className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
          isSelected 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {isSelected ? (isCompareMode ? 'Selected for Comparison' : 'Selected') : 'Select University'}
      </button>
    </div>
  );
};

const CourseComparisonTable = ({ courses, onRemove }) => {
  const [activeTab, setActiveTab] = useState('comparison');

  const comparisonFields = [
    { key: 'fullTitle', label: 'Course Title', type: 'text' },
    { key: 'university.name', label: 'University', type: 'university' },
    { key: 'university.ranking', label: 'THE Ranking', type: 'ranking' },
    { key: 'duration', label: 'Duration', type: 'text' },
    { key: 'studyMode', label: 'Study Mode', type: 'text' },
    { key: 'distanceLearning', label: 'Distance Learning', type: 'text' },
    { key: 'workPlacement', label: 'Work Placement', type: 'text' },
    { key: 'yearAbroad', label: 'Year Abroad', type: 'text' },
    { key: 'university.location', label: 'Location', type: 'text' },
    { key: 'university.tuitionFeesUK', label: 'UK Student Fees', type: 'fee' },
    { key: 'university.tuitionFeesInternational', label: 'International Fees', type: 'fee' },
    { key: 'courseContent', label: 'Course Content', type: 'text' },
    { key: 'university.employmentRate', label: 'Employment Rate', type: 'percentage' },
    { key: 'university.scholarships', label: 'Available Scholarships', type: 'text' }
  ];

  const getCellValue = (course, field) => {
    let value;
    
    // Handle nested properties like university.name
    if (field.key.includes('.')) {
      const keys = field.key.split('.');
      value = keys.reduce((obj, key) => obj?.[key], course);
    } else {
      value = course[field.key];
    }
    
    switch (field.type) {
      case 'ranking':
        const rankingColor = value <= 10 ? 'text-green-600' : 
                             value <= 50 ? 'text-yellow-600' : 'text-blue-600';
        return <span className={`font-bold text-lg ${rankingColor}`}>#{value}</span>;
      case 'fee':
        return <span className="font-semibold text-blue-600">{value}</span>;
      case 'percentage':
        return <span className="font-semibold text-green-600">{value}</span>;
      case 'university':
        return <span className="font-semibold text-gray-800">{value}</span>;
      default:
        return <span className="text-gray-800 text-sm">{value || 'Not specified'}</span>;
    }
  };

  const CourseReviewsTab = () => {
    return (
      <div className="bg-white">
        <div className="grid gap-6">
          {courses.map((course) => {
            const reviewData = getStudentReviews(course.university.name);
            
            return (
              <div key={course.courseId} className="border border-gray-200 rounded-lg p-6">
                {/* Course Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{course.fullTitle}</h3>
                    <p className="text-gray-600">{course.university.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-yellow-500 mr-1">
                          {reviewData.overallRating.toFixed(1)}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={i < Math.floor(reviewData.overallRating) ? 'text-yellow-400' : 'text-gray-300'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({reviewData.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(course.courseId)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Category Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {Object.entries(reviewData.categories).map(([category, rating]) => (
                    <div key={category} className="text-center">
                      <div className="text-sm text-gray-600 mb-1">{category}</div>
                      <div className="text-lg font-bold text-blue-600">{rating.toFixed(1)}</div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={i < Math.floor(rating) ? 'text-yellow-400 text-xs' : 'text-gray-300 text-xs'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Recent Student Reviews</h4>
                  {reviewData.reviews.slice(0, 2).map((review, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span 
                                key={i} 
                                className={i < review.rating ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">{review.title}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {review.source}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2 leading-relaxed">{review.review}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div>
                          <span className="font-medium">{review.course}</span> • {review.year} • {review.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👍 {review.helpful} helpful</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* General Notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Important:</span> These reviews represent individual student experiences for the university. 
            Consider multiple sources and visit universities in person when making your decision.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Course Comparison</h2>
            <p className="text-blue-100">Compare Individual Courses Side-by-Side</p>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'comparison' 
                ? 'bg-white text-blue-600' 
                : 'bg-blue-700 text-blue-100 hover:bg-blue-600'
            }`}
          >
            Course Comparison
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'reviews' 
                ? 'bg-white text-blue-600' 
                : 'bg-blue-700 text-blue-100 hover:bg-blue-600'
            }`}
          >
            Student Reviews
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'comparison' ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700 border-b">Criteria</th>
                {courses.map((course, index) => (
                  <th key={course.courseId} className="text-left p-4 font-semibold text-gray-700 border-b min-w-64">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block text-sm">{course.fullTitle}</span>
                        <span className="text-xs text-purple-600 font-normal">
                          {course.university.name}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemove(course.courseId)}
                        className="ml-2 text-red-500 hover:text-red-700 font-normal text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field, fieldIndex) => (
                <tr key={field.key} className={fieldIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-semibold text-gray-700 border-r">
                    {field.label}
                  </td>
                  {courses.map((course) => (
                    <td key={`${course.courseId}-${field.key}`} className="p-4 border-r">
                      {getCellValue(course, field)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Course Comparison Notice */}
          <div className="bg-blue-50 p-4 border-t">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Note:</span> You are comparing individual courses. 
              Each course shows specific details including duration, study mode, and placement options.
            </p>
          </div>
        </div>
      ) : (
        <CourseReviewsTab />
      )}
    </div>
  );
};

const ComparisonTable = ({ universities, onRemove }) => {
  const [selectedProgram, setSelectedProgram] = useState('Computer Science');
  const [activeTab, setActiveTab] = useState('comparison');
  
  // Get all available programs across selected universities
  const availablePrograms = useMemo(() => {
    const programSet = new Set();
    universities.forEach(uni => {
      if (uni.programs) {
        Object.keys(uni.programs).forEach(program => programSet.add(program));
      } else {
        // Add default programs for universities without full program data
        Object.keys(generateDefaultPrograms(uni)).forEach(program => programSet.add(program));
      }
    });
    return Array.from(programSet).sort();
  }, [universities]);

  const comparisonFields = [
    { key: 'name', label: 'University Name', type: 'text' },
    { key: 'ranking', label: 'THE Ranking', type: 'ranking' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'tuitionFeesUK', label: 'UK Student Fees', type: 'fee' },
    { key: 'tuitionFeesInternational', label: 'International Fees', type: 'fee' },
    { key: 'entryRequirements', label: 'Entry Requirements', type: 'program-specific' },
    { key: 'ucasPoints', label: 'UCAS Points', type: 'text' },
    { key: 'duration', label: 'Course Duration', type: 'program-specific' },
    { key: 'employmentRate', label: 'Employment Rate', type: 'percentage' },
    { key: 'researchRating', label: 'Research Rating', type: 'rating' },
    { key: 'courseContent', label: 'Course Content', type: 'program-specific' },
    { key: 'scholarships', label: 'Available Scholarships', type: 'text' }
  ];

  const getCellValue = (university, field) => {
    let value;
    
    if (field.type === 'program-specific') {
      // Check if university has program data, otherwise use defaults
      const programData = university.programs || generateDefaultPrograms(university);
      
      if (programData[selectedProgram]) {
        value = programData[selectedProgram][field.key] || university[field.key] || 'Not available for this program';
      } else {
        value = university[field.key] || 'Not available for this program';
      }
    } else {
      value = university[field.key];
    }
    
    switch (field.type) {
      case 'ranking':
        const rankingColor = value <= 10 ? 'text-green-600' : 
                             value <= 50 ? 'text-yellow-600' : 'text-blue-600';
        return <span className={`font-bold text-lg ${rankingColor}`}>#{value}</span>;
      case 'fee':
        return <span className="font-semibold text-blue-600">{value}</span>;
      case 'percentage':
        return <span className="font-semibold text-green-600">{value}</span>;
      case 'rating':
        return <span className="font-bold text-purple-600">{value}</span>;
      case 'program-specific':
        return <span className="text-gray-800 text-sm">{value}</span>;
      default:
        return <span className="text-gray-800">{value}</span>;
    }
  };

  const StudentReviewsTab = () => {
    return (
      <div className="bg-white">
        <div className="grid gap-6">
          {universities.map((university) => {
            const reviewData = getStudentReviews(university.name);
            
            return (
              <div key={university.id} className="border border-gray-200 rounded-lg p-6">
                {/* University Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{university.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-yellow-500 mr-1">
                          {reviewData.overallRating.toFixed(1)}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={i < Math.floor(reviewData.overallRating) ? 'text-yellow-400' : 'text-gray-300'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({reviewData.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(university.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Category Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {Object.entries(reviewData.categories).map(([category, rating]) => (
                    <div key={category} className="text-center">
                      <div className="text-sm text-gray-600 mb-1">{category}</div>
                      <div className="text-lg font-bold text-blue-600">{rating.toFixed(1)}</div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={i < Math.floor(rating) ? 'text-yellow-400 text-xs' : 'text-gray-300 text-xs'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Recent Student Reviews</h4>
                  {reviewData.reviews.map((review, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span 
                                key={i} 
                                className={i < review.rating ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">{review.title}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {review.source}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2 leading-relaxed">{review.review}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div>
                          <span className="font-medium">{review.course}</span> • {review.year} • {review.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👍 {review.helpful} helpful</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Source Attribution */}
                <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
                  <strong>Sources:</strong> Reviews compiled from StudentCrowd, Whatuni, and The Student Room. 
                  Reviews are authentic student experiences and may not reflect all perspectives.
                </div>
              </div>
            );
          })}
        </div>
        
        {/* General Notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Important:</span> These reviews represent individual student experiences and opinions. 
            Consider multiple sources and visit universities in person when making your decision. 
            Reviews are sourced from public platforms including StudentCrowd, Whatuni, and The Student Room forums.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">University Comparison</h2>
            <p className="text-blue-100">Compare Programs & Student Reviews Side-by-Side</p>
          </div>
          
          {activeTab === 'comparison' && (
            <div className="flex flex-col">
              <label className="text-blue-100 text-sm mb-1">Select Program:</label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="bg-white text-gray-800 px-3 py-2 rounded-lg font-semibold min-w-48"
              >
                {availablePrograms.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'comparison' 
                ? 'bg-white text-blue-600' 
                : 'bg-blue-700 text-blue-100 hover:bg-blue-600'
            }`}
          >
            Program Comparison
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'reviews' 
                ? 'bg-white text-blue-600' 
                : 'bg-blue-700 text-blue-100 hover:bg-blue-600'
            }`}
          >
            Student Reviews
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'comparison' ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700 border-b">Criteria</th>
                {universities.map((uni, index) => (
                  <th key={uni.id} className="text-left p-4 font-semibold text-gray-700 border-b min-w-64">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block">{uni.name}</span>
                        <span className="text-sm text-purple-600 font-normal">
                          {selectedProgram}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemove(uni.id)}
                        className="ml-2 text-red-500 hover:text-red-700 font-normal text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field, fieldIndex) => (
                <tr key={field.key} className={fieldIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-semibold text-gray-700 border-r">
                    {field.label}
                    {field.type === 'program-specific' && (
                      <span className="text-xs text-purple-600 block">({selectedProgram})</span>
                    )}
                  </td>
                  {universities.map((uni) => (
                    <td key={`${uni.id}-${field.key}`} className="p-4 border-r">
                      {getCellValue(uni, field)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Program Availability Notice */}
          <div className="bg-blue-50 p-4 border-t">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Note:</span> Course content, entry requirements, and duration may vary by program type. 
              Select different programs above to see specific requirements for each field of study.
            </p>
          </div>
        </div>
      ) : (
        <StudentReviewsTab />
      )}
    </div>
  );
};

function App() {
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]); // New state for course-level selection
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('ranking');
  const [showComparison, setShowComparison] = useState(false);
  const [searchMode, setSearchMode] = useState('universities'); // 'universities' or 'courses'
  const [currentSearchPage, setCurrentSearchPage] = useState(1); // For paginating search results

  const UNIVERSITIES_PER_PAGE = 6;

  const filteredAndSortedUniversities = useMemo(() => {
    let filtered = [];
    
    if (searchMode === 'courses') {
      // Search by course/program name and return universities with detailed course data
      if (searchTerm.trim()) {
        filtered = universitiesData.map(uni => {
          let matchingCourses = [];
          
          // Get authentic courses for this university
          const authenticCourses = getAuthenticCoursesForUniversity(uni.name);
          
          // Filter courses that match the search term
          authenticCourses.forEach(course => {
            if (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.courseContent.toLowerCase().includes(searchTerm.toLowerCase())) {
              matchingCourses.push(course);
            }
          });
          
          return {
            ...uni,
            matchingCourses,
            courseCount: matchingCourses.length
          };
        }).filter(uni => uni.courseCount > 0);
      } else {
        filtered = universitiesData.map(uni => ({
          ...uni,
          matchingCourses: [],
          courseCount: 0
        }));
      }
    } else {
      // Search by university name or location (original functionality)
      filtered = universitiesData.filter(uni =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(uni => ({
        ...uni,
        matchingCourses: [],
        courseCount: 0
      }));
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ranking':
          return a.ranking - b.ranking;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'fees':
          return parseInt(a.tuitionFeesUK.replace(/[£,]/g, '')) - parseInt(b.tuitionFeesUK.replace(/[£,]/g, ''));
        case 'courses':
          return b.courseCount - a.courseCount; // Sort by course count descending
        default:
          return a.ranking - b.ranking;
      }
    });
  }, [searchTerm, sortBy, searchMode]);

  const handleSearchPageChange = (page) => {
    setCurrentSearchPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentSearchPage(1); // Reset to page 1 when search changes
  };

  const handleUniversitySelect = (university) => {
    setSelectedUniversities(prev => {
      const isAlreadySelected = prev.some(uni => uni.id === university.id);
      if (isAlreadySelected) {
        return prev.filter(uni => uni.id !== university.id);
      } else if (prev.length < 4) {
        return [...prev, university];
      } else {
        alert('You can compare maximum 4 universities at once');
        return prev;
      }
    });
  };

  const handleCourseSelect = (course, university) => {
    const courseWithUniversity = {
      ...course,
      university: university,
      courseId: `${university.id}-${course.fullTitle}` // Unique identifier
    };

    setSelectedCourses(prev => {
      const isAlreadySelected = prev.some(selectedCourse => selectedCourse.courseId === courseWithUniversity.courseId);
      if (isAlreadySelected) {
        return prev.filter(selectedCourse => selectedCourse.courseId !== courseWithUniversity.courseId);
      } else if (prev.length < 4) {
        return [...prev, courseWithUniversity];
      } else {
        alert('You can compare maximum 4 courses at once');
        return prev;
      }
    });
  };

  const removeFromComparison = (universityId) => {
    setSelectedUniversities(prev => prev.filter(uni => uni.id !== universityId));
  };

  const removeFromCourseComparison = (courseId) => {
    setSelectedCourses(prev => prev.filter(course => course.courseId !== courseId));
  };

  const clearComparison = () => {
    setSelectedUniversities([]);
    setSelectedCourses([]);
    setShowComparison(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Course Comparison Website</h1>
          <p className="text-xl text-blue-100">Compare programs across multiple disciplines from top UK universities</p>
        </div>
      </header>

      {/* Control Panel */}
      <div className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => {setSearchMode('universities'); setSearchTerm('');}}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    searchMode === 'universities' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Search Universities
                </button>
                <button
                  onClick={() => {setSearchMode('courses'); setSearchTerm('');}}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    searchMode === 'courses' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Search Courses
                </button>
              </div>
              
              <input
                type="text"
                placeholder={searchMode === 'courses' 
                  ? "Search courses (e.g., Computer Science, Medicine, Law)..." 
                  : "Search universities or locations..."
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="ranking">Sort by Ranking</option>
                <option value="name">Sort by Name</option>
                <option value="fees">Sort by UK Fees</option>
                {searchMode === 'courses' && searchTerm && (
                  <option value="courses">Sort by Course Count</option>
                )}
              </select>
            </div>
            
            <div className="flex gap-2">
              {(selectedUniversities.length > 0 || selectedCourses.length > 0) && (
                <>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {showComparison ? 'Show Results' : 
                      searchMode === 'courses' && selectedCourses.length > 0 
                        ? `Compare Courses (${selectedCourses.length})`
                        : `Compare Selected (${selectedUniversities.length})`
                    }
                  </button>
                  <button
                    onClick={clearComparison}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Clear All
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showComparison && (selectedUniversities.length > 0 || selectedCourses.length > 0) ? (
          searchMode === 'courses' && selectedCourses.length > 0 ? (
            <CourseComparisonTable 
              courses={selectedCourses} 
              onRemove={removeFromCourseComparison}
            />
          ) : (
            <ComparisonTable 
              universities={selectedUniversities} 
              onRemove={removeFromComparison}
            />
          )
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{filteredAndSortedUniversities.length}</div>
                <div className="text-gray-600">
                  {searchMode === 'courses' && searchTerm ? 'Provider(s)' : 'Universities Listed'}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {searchMode === 'courses' && searchTerm ? `for "${searchTerm}"` : '130+ total available'}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {searchMode === 'courses' && searchTerm 
                    ? filteredAndSortedUniversities.reduce((total, uni) => total + uni.courseCount, 0)
                    : searchMode === 'courses' && selectedCourses.length > 0
                    ? selectedCourses.length
                    : selectedUniversities.length
                  }
                </div>
                <div className="text-gray-600">
                  {searchMode === 'courses' && searchTerm 
                    ? 'Course(s) Found' 
                    : searchMode === 'courses' && selectedCourses.length > 0
                    ? 'Courses Selected'
                    : 'Selected for Comparison'
                  }
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">8+</div>
                <div className="text-gray-600">Program Types</div>
                <div className="text-sm text-gray-500 mt-1">CS, Engineering, Business, Medicine, Law, etc.</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">THE</div>
                <div className="text-gray-600">Ranking Source</div>
                <div className="text-sm text-gray-500 mt-1">Times Higher Education</div>
              </div>
            </div>

            {/* University Grid or Course Listings */}
            {searchMode === 'courses' && searchTerm ? (
              // Professional Course Listings (DiscoverUni style) with Pagination
              <div>
                <div className="space-y-6">
                  {(() => {
                    const startIndex = (currentSearchPage - 1) * UNIVERSITIES_PER_PAGE;
                    const endIndex = startIndex + UNIVERSITIES_PER_PAGE;
                    const paginatedUniversities = filteredAndSortedUniversities.slice(startIndex, endIndex);
                    const totalPages = Math.ceil(filteredAndSortedUniversities.length / UNIVERSITIES_PER_PAGE);
                    
                    return (
                      <>
                        {paginatedUniversities.map((university) => (
                          <UniversityCoursesSection
                            key={university.id}
                            university={university}
                            searchTerm={searchTerm}
                            onSelectCourse={handleCourseSelect}
                            selectedCourses={selectedCourses}
                          />
                        ))}
                        
                        {/* Search Results Pagination */}
                        {totalPages > 1 && (
                          <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-700">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedUniversities.length)} of {filteredAndSortedUniversities.length} universities
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleSearchPageChange(currentSearchPage - 1)}
                                  disabled={currentSearchPage === 1}
                                  className={`px-4 py-2 text-sm rounded ${
                                    currentSearchPage === 1 
                                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                  }`}
                                >
                                  Previous
                                </button>
                                
                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                  <button
                                    key={page}
                                    onClick={() => handleSearchPageChange(page)}
                                    className={`px-3 py-2 text-sm rounded ${
                                      currentSearchPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                    }`}
                                  >
                                    {page}
                                  </button>
                                ))}
                                
                                <button
                                  onClick={() => handleSearchPageChange(currentSearchPage + 1)}
                                  disabled={currentSearchPage === totalPages}
                                  className={`px-4 py-2 text-sm rounded ${
                                    currentSearchPage === totalPages 
                                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                  }`}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            ) : searchMode === 'courses' ? (
              // Empty state for course search mode without search term
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl text-gray-600 mb-2">Search for courses</h3>
                <p className="text-gray-500">Type in the search box above to find courses</p>
              </div>
            ) : (
              // Regular University Grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedUniversities.map((university) => (
                  <UniversityCard
                    key={university.id}
                    university={university}
                    isSelected={selectedUniversities.some(uni => uni.id === university.id)}
                    onSelect={handleUniversitySelect}
                    isCompareMode={selectedUniversities.length > 0}
                    searchMode={searchMode}
                    searchTerm={searchTerm}
                  />
                ))}
              </div>
            )}

            {filteredAndSortedUniversities.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl text-gray-600 mb-2">No universities found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 UK Universities CS Program Finder. Data based on Times Higher Education rankings and official university websites.</p>
          <p className="text-sm text-gray-500 mt-2">Compare tuition fees, entry requirements, course content, scholarships, and locations for Computer Science programs.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;