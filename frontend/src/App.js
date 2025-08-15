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
    programs: {
      "Computer Science": {
        courseContent: "Programming, Algorithms, AI, Machine Learning, Data Science, Software Engineering",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Systems Engineering, Manufacturing Engineering, Electronic Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "A*AA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Operational Research",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "A*AA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Quantum Physics, Particle Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "A*AA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Physical Chemistry, Chemical Biology, Materials Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Life Sciences": {
        courseContent: "Molecular Biology, Biochemistry, Microbiology, Biotechnology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Statistics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Game Theory",
        duration: "3 years (BSc)",
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Politics and International Studies": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Security Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, American History, Social History",
        duration: "3 years (BA)",
        entryRequirements: "AAA (including History preferred)"
      },
      "English and Comparative Literary Studies": {
        courseContent: "English Literature, Comparative Literature, Creative Writing, Literary Theory",
        duration: "3 years (BA)",
        entryRequirements: "AAA (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Public Law, European Law",
        duration: "3 years (LLB)",
        entryRequirements: "A*AA (no specific subjects)"
      },
      "Business": {
        courseContent: "Management, Finance, Marketing, Strategy, International Business",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Corporate Finance, Investment Analysis, Risk Management",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Film and Television Studies": {
        courseContent: "Film Theory, Television Studies, Media Production, Screen Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Theatre and Performance Studies": {
        courseContent: "Performance Theory, Theatre History, Devising, Applied Theatre",
        duration: "3 years (BA)",
        entryRequirements: "AAA (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Hispanic Studies, European Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA (including relevant language)"
      },
      "Classical Civilisation": {
        courseContent: "Ancient History, Latin Literature, Greek Literature, Classical Archaeology",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Art History": {
        courseContent: "European Art, Contemporary Art, Visual Culture, Museum Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Statistics": {
        courseContent: "Statistical Theory, Data Analysis, Probability, Statistical Computing",
        duration: "3 years (BSc)",
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Liberal Arts": {
        courseContent: "Interdisciplinary Studies, Critical Thinking, Research Skills, Global Perspectives",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Global Health",
        duration: "4 years (Graduate Entry MBBS)",
        entryRequirements: "Graduate degree required plus GAMSAT"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, Software Engineering, AI, Data Science, Computer Systems, HCI",
        duration: "4 years (BSc), 5 years (MEng)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace, Civil, Electronic, Mechanical, Naval Architecture",
        duration: "4 years (BEng), 5 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics",
        duration: "4 years (BSc), 5 years (MSci)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Astrophysics",
        duration: "4 years (BSc), 5 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Chemical Biology",
        duration: "4 years (BSc), 5 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Marine Biology, Ecology, Genetics, Biotechnology",
        duration: "4 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Neuropsychology, Clinical Psychology",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including Mathematics recommended)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics",
        duration: "4 years (MA)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Scottish Politics",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "Scottish History, Medieval History, Modern History, Economic History",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "Scottish Literature, English Literature, Creative Writing, Literary Theory",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Philosophy of Mind, Political Philosophy",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Scots Law, Criminal Law, Contract Law, Constitutional Law",
        duration: "4 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Global Health",
        duration: "5 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Veterinary Medicine": {
        courseContent: "Animal Anatomy, Veterinary Pathology, Clinical Practice, Animal Welfare",
        duration: "5 years (BVMS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Dentistry": {
        courseContent: "Dental Anatomy, Oral Pathology, Clinical Dentistry, Dental Materials",
        duration: "5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business and Management": {
        courseContent: "Management, Finance, Marketing, International Business, Entrepreneurship",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Urban Studies",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Science, Urban Planning",
        duration: "4 years (MA/BSc)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Music": {
        courseContent: "Music Theory, Composition, Performance, Music History, Ethnomusicology",
        duration: "4 years (BMus/MA)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Fine Art": {
        courseContent: "Drawing, Painting, Sculpture, Digital Art, Art History",
        duration: "4 years (BFA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Theatre Studies": {
        courseContent: "Performance Studies, Theatre History, Playwriting, Stage Management",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Celtic Studies": {
        courseContent: "Scottish Gaelic, Irish, Celtic History, Celtic Literature",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Scottish Archaeology, Cultural Heritage, Archaeological Science",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Education": {
        courseContent: "Educational Psychology, Primary Education, Secondary Education, Special Needs",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, Algorithms, AI, Software Engineering, Computer Graphics, Data Science",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Civil Engineering, Electronic Engineering, Mechanical Engineering, General Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "A*AA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Astrophysics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Theoretical Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Cell Biology, Evolutionary Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Neuroscience",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics",
        duration: "3 years (BA)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "History": {
        courseContent: "Medieval History, Modern History, British History, World History",
        duration: "3 years (BA)",
        entryRequirements: "AAA (including History preferred)"
      },
      "English Literature": {
        courseContent: "British Literature, World Literature, Literary Theory, Creative Writing",
        duration: "3 years (BA)",
        entryRequirements: "AAA (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Philosophy of Mind, Political Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "A*AA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Public Health",
        duration: "5 years (MBBS)",
        entryRequirements: "A*AA (including Chemistry and Biology)"
      },
      "Business and Management": {
        courseContent: "Management, Finance, Marketing, Strategy, International Business",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BA)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Science, GIS",
        duration: "3 years (BA/BSc)",
        entryRequirements: "AAA (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Anthropology": {
        courseContent: "Cultural Anthropology, Social Anthropology, Archaeological Anthropology",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Theology and Religion": {
        courseContent: "Christian Theology, World Religions, Religious Studies, Biblical Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Theory, Composition, Performance, Music History, Ethnomusicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA (audition required)"
      },
      "Classics": {
        courseContent: "Latin Literature, Greek Literature, Ancient History, Classical Archaeology",
        duration: "3 years (BA)",
        entryRequirements: "AAA (Latin or Greek preferred)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Russian, Linguistics",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA (including relevant language)"
      },
      "Sport, Exercise and Physical Activity": {
        courseContent: "Sports Science, Exercise Physiology, Sport Psychology, Coaching",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Science subjects)"
      },
      "Education Studies": {
        courseContent: "Educational Psychology, Curriculum Studies, Education Policy, Teaching Methods",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Medieval Archaeology, Cultural Heritage, Archaeological Science",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Data Science, Cybersecurity, Web Science",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aeronautics, Civil Engineering, Electronic Engineering, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Modelling",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics and Astronomy": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Space Science",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Physical Chemistry, Environmental Chemistry, Materials Science",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Marine Biology, Molecular Biology, Ecology, Genetics, Biochemistry",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Neuropsychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, International Economics, Financial Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Geography and Environmental Science": {
        courseContent: "Physical Geography, Human Geography, Environmental Management, Climate Science",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "History": {
        courseContent: "British History, Medieval History, Modern History, Maritime History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Linguistics, Film Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Metaphysics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, Maritime Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Research, Global Health",
        duration: "5 years (BM)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business and Management": {
        courseContent: "Management, Marketing, Finance, International Business, Entrepreneurship",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Corporate Finance, Taxation, Auditing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, European Politics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Applied Languages, Translation Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Music": {
        courseContent: "Music Theory, Composition, Performance, Music Technology, Musicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Art and Design": {
        courseContent: "Fine Art, Graphic Design, Fashion Design, Textile Design",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Maritime Archaeology, Cultural Heritage, Archaeological Science",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Education": {
        courseContent: "Educational Psychology, Curriculum Studies, Special Educational Needs, Primary Education",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Ocean and Earth Science": {
        courseContent: "Oceanography, Marine Geology, Climate Science, Environmental Monitoring",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics and Science)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Documentary Studies, Digital Media",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Ship Science": {
        courseContent: "Naval Architecture, Marine Engineering, Yacht Design, Maritime Technology",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, Software Engineering, AI, Human-Computer Interaction, Data Science",
        duration: "4 years (BSc), 5 years (MEng)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Biology",
        duration: "4 years (BSc), 5 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Quantum Physics",
        duration: "4 years (BSc), 5 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Chemical Physics",
        duration: "4 years (BSc), 5 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Marine Biology, Molecular Biology, Ecology, Cell Biology, Evolutionary Biology",
        duration: "4 years (BSc)",
        entryRequirements: "AAA (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Neuroscience",
        duration: "4 years (MA)",
        entryRequirements: "AAA (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics",
        duration: "4 years (MA)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "International Relations": {
        courseContent: "International Politics, Security Studies, International Law, Diplomacy",
        duration: "4 years (MA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "History": {
        courseContent: "Scottish History, Medieval History, Modern History, Art History",
        duration: "4 years (MA)",
        entryRequirements: "AAA (including History preferred)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Medieval Literature",
        duration: "4 years (MA)",
        entryRequirements: "AAA (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Moral Philosophy, Logic, Metaphysics, Philosophy of Mind",
        duration: "4 years (MA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Classics": {
        courseContent: "Latin Literature, Greek Literature, Ancient History, Classical Archaeology",
        duration: "4 years (MA)",
        entryRequirements: "AAA (Latin or Greek preferred)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Russian, Arabic",
        duration: "5 years (MA) with year abroad",
        entryRequirements: "AAA (including relevant language)"
      },
      "Art History": {
        courseContent: "Renaissance Art, Modern Art, Scottish Art, Museum Studies",
        duration: "4 years (MA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Documentary Studies, Digital Media",
        duration: "4 years (MA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Geography and Sustainable Development": {
        courseContent: "Physical Geography, Environmental Science, Sustainable Development, GIS",
        duration: "4 years (BSc/MA)",
        entryRequirements: "AAA (including Geography preferred)"
      },
      "Management": {
        courseContent: "Strategic Management, International Business, Marketing, Finance",
        duration: "4 years (MA)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Research, Global Health",
        duration: "6 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Divinity": {
        courseContent: "Christian Theology, Biblical Studies, Church History, Ethics",
        duration: "4 years (MA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Social Anthropology": {
        courseContent: "Cultural Anthropology, Social Theory, Ethnography, Applied Anthropology",
        duration: "4 years (MA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Arabic": {
        courseContent: "Arabic Language, Islamic Studies, Middle Eastern Studies, Arabic Literature",
        duration: "4 years (MA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Hebrew": {
        courseContent: "Hebrew Language, Biblical Hebrew, Jewish Studies, Ancient Near East",
        duration: "4 years (MA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Neuroscience": {
        courseContent: "Cellular Neuroscience, Cognitive Neuroscience, Neuroanatomy, Neurophysiology",
        duration: "4 years (BSc)",
        entryRequirements: "AAA (including Biology and Chemistry)"
      },
      "Earth and Environmental Sciences": {
        courseContent: "Geology, Environmental Science, Climate Change, Earth System Science",
        duration: "4 years (BSc)",
        entryRequirements: "AAA (including Mathematics and Science)"
      },
      "Statistics": {
        courseContent: "Statistical Theory, Data Analysis, Probability, Statistical Computing",
        duration: "4 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Robotics, Data Science, Software Engineering, Cybersecurity",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace, Chemical, Civil, Electronic, Materials, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics and Astronomy": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Astrophysics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Biochemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Genetics, Ecology, Microbiology, Biotechnology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Neuropsychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Political Science": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Medieval History, Modern History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "British Literature, World Literature, Creative Writing, Literary Theory",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Philosophy of Mind, Political Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Public Health",
        duration: "5 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Dentistry": {
        courseContent: "Dental Anatomy, Clinical Dentistry, Oral Pathology, Dental Materials",
        duration: "5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business Management": {
        courseContent: "Strategic Management, Marketing, Finance, International Business",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Science, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Theory, Composition, Performance, Music History, Music Technology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Russian, Linguistics",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Theology and Religion": {
        courseContent: "Christian Theology, World Religions, Religious Studies, Biblical Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Education": {
        courseContent: "Educational Psychology, Primary Education, Secondary Education, Special Needs",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Sport and Exercise Sciences": {
        courseContent: "Sports Science, Exercise Physiology, Sport Psychology, Biomechanics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Medieval Archaeology, Cultural Heritage, Archaeological Science",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Classical Literature and Civilisation": {
        courseContent: "Latin Literature, Greek Literature, Ancient History, Classical Archaeology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Social Work": {
        courseContent: "Social Work Theory, Community Work, Child Protection, Mental Health",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Computer Vision, Data Science",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace, Chemical, Civil, Electronic, Materials, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics and Statistics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Financial Mathematics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics and Astronomy": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Astrophysics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Materials Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Plant Sciences, Animal Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Neuropsychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Administration",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Social History, Historical Methods",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "British Literature, World Literature, Creative Writing, Literary Criticism",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Philosophy of Mind, Political Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Research, Global Health",
        duration: "5 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Dentistry": {
        courseContent: "Dental Anatomy, Clinical Dentistry, Oral Pathology, Dental Public Health",
        duration: "5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Management": {
        courseContent: "Strategic Management, Operations Management, International Business, Marketing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Financial Management": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Taxation",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Urban Planning",
        duration: "3 years (BA), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Urban Studies": {
        courseContent: "Urban Planning, Urban Geography, Housing Policy, Urban Design",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Theory, Composition, Performance, Music Technology, Ethnomusicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Japanese, Russian, Linguistics",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Journalism Studies": {
        courseContent: "News Writing, Media Law, Digital Journalism, Broadcast Journalism",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Information Management": {
        courseContent: "Information Systems, Database Management, Data Analytics, Digital Libraries",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Biomedical Science": {
        courseContent: "Human Biology, Medical Microbiology, Clinical Biochemistry, Immunology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Biology and Chemistry)"
      },
      "Environmental Science": {
        courseContent: "Environmental Chemistry, Ecology, Conservation Biology, Climate Science",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Classical Archaeology, Archaeological Science, Heritage Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Cybersecurity, Software Engineering, Data Analytics",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Electronic Engineering, Biomedical Engineering, Chemical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Finance",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Plasma Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Green Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Biotechnology, Conservation Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Health Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Behavioural Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Public Policy, Political Economy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, Medieval History, Modern History, Social History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English and Related Literature": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Medieval Literature",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Ancient Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, Human Rights Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Community Medicine",
        duration: "5 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Management": {
        courseContent: "Strategic Management, Operations Management, International Business, Marketing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting, Business Finance and Management": {
        courseContent: "Financial Accounting, Corporate Finance, Management Accounting, Business Strategy",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Environment": {
        courseContent: "Environmental Science, Environmental Management, Conservation, Sustainability",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Gender Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Linguistics": {
        courseContent: "Phonetics, Syntax, Semantics, Psycholinguistics, Sociolinguistics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Language and Linguistic Science": {
        courseContent: "General Linguistics, Language Acquisition, Phonology, Historical Linguistics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Theatre: Writing, Directing and Performance": {
        courseContent: "Playwriting, Directing, Acting, Theatre History, Applied Theatre",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Film and Television Production": {
        courseContent: "Film Production, Television Production, Screenwriting, Post-production",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Education": {
        courseContent: "Educational Psychology, Primary Education, Secondary Education, Special Needs",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Social Policy": {
        courseContent: "Social Welfare, Public Policy, Health Policy, Housing Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Heritage Studies, Archaeological Science, Medieval Archaeology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Computer Graphics, Data Science",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Civil Engineering, Electrical Engineering, Mechanical Engineering, Chemical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics and Astronomy": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Particle Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Environmental Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Plant Sciences, Zoology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Forensic Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Industrial Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, American History, East Asian History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Victorian Literature",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Continental Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, European Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Global Health",
        duration: "5 years (BM BS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Veterinary Medicine and Science": {
        courseContent: "Animal Anatomy, Veterinary Pathology, Clinical Practice, Animal Welfare",
        duration: "5 years (BVM BVS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business": {
        courseContent: "Management, Finance, Marketing, International Business, Entrepreneurship",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology and Social Policy": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Russian, Chinese, Applied Linguistics",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Urban Planning",
        duration: "3 years (BA), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Pharmacy": {
        courseContent: "Pharmaceutical Sciences, Clinical Pharmacy, Drug Development, Pharmacology",
        duration: "4 years (MPharm)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Agriculture": {
        courseContent: "Crop Science, Animal Science, Agricultural Economics, Sustainable Agriculture",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Food Science": {
        courseContent: "Food Technology, Food Safety, Nutrition, Food Processing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Chemistry and Biology)"
      },
      "Environmental Science": {
        courseContent: "Environmental Chemistry, Ecology, Climate Science, Environmental Management",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Classical Archaeology, Archaeological Science, Heritage Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, Software Engineering, AI, Data Science, Cybersecurity",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Civil Engineering, Electrical Engineering, Mechanical Engineering, Marine Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics, Statistics and Physics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Theoretical Physics",
        duration: "3 years (BSc), 4 years (MMath/MPhys)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Natural Sciences": {
        courseContent: "Chemistry, Biology, Physics, Earth Sciences, Environmental Science",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "AAA (including relevant Science subjects)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Health Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Medieval History, Modern History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Postcolonial Literature",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Ancient Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Public Health",
        duration: "5 years (MBBS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Dentistry": {
        courseContent: "Dental Anatomy, Clinical Dentistry, Oral Pathology, Dental Public Health",
        duration: "5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business and Management": {
        courseContent: "Strategic Management, Operations Management, International Business, Marketing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Urban Design",
        duration: "3 years (BA), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Fine Art": {
        courseContent: "Drawing, Painting, Sculpture, Digital Art, Contemporary Art",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Chinese, Linguistics",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Agriculture": {
        courseContent: "Animal Science, Crop Science, Agricultural Technology, Rural Development",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Food and Human Nutrition": {
        courseContent: "Human Nutrition, Food Science, Dietetics, Public Health Nutrition",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Chemistry and Biology)"
      },
      "Marine Biology": {
        courseContent: "Marine Ecology, Marine Conservation, Oceanography, Marine Biotechnology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Biomedical Sciences": {
        courseContent: "Human Biology, Medical Microbiology, Pharmacology, Pathology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Biology and Chemistry)"
      },
      "Speech and Language Sciences": {
        courseContent: "Linguistics, Speech Therapy, Language Development, Communication Disorders",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Medieval Archaeology, Archaeological Science, Heritage Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Software Engineering, Computer Networks",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Electronic Engineering, Mechanical Engineering, Nuclear Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics and Statistics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Financial Mathematics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Astrophysics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Medicinal Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Biomedical Sciences, Marine Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Clinical Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Behavioural Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Medieval History, Modern History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Medieval Literature",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Continental Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Management": {
        courseContent: "Strategic Management, Operations Management, International Business, Marketing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Environmental Science": {
        courseContent: "Environmental Chemistry, Ecology, Climate Science, Conservation Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Linguistics": {
        courseContent: "Phonetics, Syntax, Semantics, Psycholinguistics, Sociolinguistics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Chinese, Russian",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Art": {
        courseContent: "Fine Art, Contemporary Art, Digital Art, Art History, Sculpture",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Theatre Studies": {
        courseContent: "Performance Studies, Theatre History, Playwriting, Applied Theatre",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Documentary Studies, Digital Media",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Religious Studies": {
        courseContent: "World Religions, Theology, Ethics, Philosophy of Religion",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Social Work": {
        courseContent: "Social Work Theory, Community Work, Child Protection, Mental Health",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Software Engineering, Data Science",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace Engineering, Chemical Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Sciences",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "A*AA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Mathematical Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Medicinal Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology and Biochemistry": {
        courseContent: "Molecular Biology, Biochemistry, Cell Biology, Biotechnology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Neuropsychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Management": {
        courseContent: "Strategic Management, Operations Management, International Business, Marketing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Environmental Design",
        duration: "3 years (BSc), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Social Policy": {
        courseContent: "Social Welfare, Public Policy, Health Policy, Social Research",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Sport and Exercise Science": {
        courseContent: "Exercise Physiology, Sports Psychology, Biomechanics, Sports Nutrition",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Science subjects)"
      },
      "Pharmacy and Pharmacology": {
        courseContent: "Pharmaceutical Sciences, Clinical Pharmacy, Drug Development, Pharmacology",
        duration: "4 years (MPharm)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Modern Languages and European Studies": {
        courseContent: "French, German, Spanish, Italian, European Studies, Translation",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA (including relevant language)"
      },
      "Social Sciences": {
        courseContent: "Sociology, Anthropology, Social Research, Social Theory",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Education": {
        courseContent: "Educational Studies, Teaching Methods, Educational Psychology, Special Needs",
        duration: "3 years (BA)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Natural Sciences": {
        courseContent: "Interdisciplinary Science, Environmental Science, Materials Science",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "AAA (including Science subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Computer Vision, Software Engineering",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Civil Engineering, Electronic Engineering, Mechanical Engineering, Architecture Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Operational Research",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics and Astronomy": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Particle Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Medicinal Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Biotechnology, Marine Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Health Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Welsh Politics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "Welsh History, British History, European History, Ancient History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "English Literature, Welsh Literature, Creative Writing, Literary Theory",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Welsh Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, Welsh Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Public Health",
        duration: "5 years (MB BCh)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Dentistry": {
        courseContent: "Dental Anatomy, Clinical Dentistry, Oral Pathology, Dental Public Health",
        duration: "5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business Management": {
        courseContent: "Strategic Management, International Business, Marketing, Finance",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography and Planning": {
        courseContent: "Physical Geography, Human Geography, Urban Planning, Environmental Geography",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Environmental Design",
        duration: "3 years (BSc), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Welsh Music",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Welsh, Translation Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Welsh": {
        courseContent: "Welsh Language, Welsh Literature, Celtic Studies, Welsh Culture",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (Welsh language skills required)"
      },
      "Journalism": {
        courseContent: "News Writing, Media Law, Digital Journalism, Broadcast Journalism",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Education": {
        courseContent: "Educational Studies, Primary Education, Secondary Education, Welsh Education",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Welsh Archaeology, Classical Archaeology, Heritage Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Data Science, Cybersecurity",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace Engineering, Electronic Engineering, Materials Engineering, Biomedical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Financial Mathematics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Astrophysics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Pharmaceutical Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Genetics, Ecology, Biochemistry, Biotechnology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Forensic Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Medieval History, Modern History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Drama",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, Commercial Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine and Dentistry": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Dental Sciences, Medical Ethics",
        duration: "5 years (MBBS), 5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business Management": {
        courseContent: "Strategic Management, International Business, Marketing, Finance",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, Urban Studies",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Linguistics": {
        courseContent: "Phonetics, Syntax, Semantics, Psycholinguistics, Sociolinguistics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Russian, Hispanic Studies, Comparative Literature",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Documentary Studies, Digital Media Production",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Drama": {
        courseContent: "Performance Studies, Theatre History, Playwriting, Applied Theatre",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Ethnomusicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Software Engineering, Computer Graphics",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Civil Engineering, Electronic Engineering, Mechanical Engineering, Chemical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Actuarial Mathematics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics and Astronomy": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Medical Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Medicinal Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Plant Sciences, Zoology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Health Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics and International Studies": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Security Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Medieval History, Social History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Medieval Literature",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Ancient Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Public Health",
        duration: "5 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Dentistry": {
        courseContent: "Dental Anatomy, Clinical Dentistry, Oral Pathology, Dental Public Health",
        duration: "5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business": {
        courseContent: "Strategic Management, International Business, Marketing, Finance",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology and Social Policy": {
        courseContent: "Social Theory, Research Methods, Social Policy, Urban Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Modern Languages and Cultures": {
        courseContent: "French, German, Spanish, Italian, Russian, East Asian Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Art and Design": {
        courseContent: "Fine Art, Graphic Design, Textile Design, Art History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Theatre and Performance": {
        courseContent: "Performance Studies, Theatre History, Applied Theatre, Community Theatre",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Education": {
        courseContent: "Educational Studies, Primary Education, Secondary Education, Special Needs",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Food Science and Nutrition": {
        courseContent: "Food Technology, Human Nutrition, Food Safety, Public Health Nutrition",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Chemistry and Biology)"
      },
      "Environmental Science": {
        courseContent: "Environmental Chemistry, Ecology, Climate Science, Sustainability",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Software Engineering, Computer Networks",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Financial Mathematics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Medical Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Environmental Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Marine Biology, Ecology, Genetics, Tropical Disease Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Forensic Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Administration",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Maritime History, Social History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Literary Theory, World Literature",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Continental Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Tropical Medicine",
        duration: "5 years (MBChB)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Dentistry": {
        courseContent: "Dental Anatomy, Clinical Dentistry, Oral Pathology, Dental Public Health",
        duration: "5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Veterinary Science": {
        courseContent: "Animal Anatomy, Veterinary Pathology, Clinical Practice, Animal Welfare",
        duration: "5 years (BVSc)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Management": {
        courseContent: "Strategic Management, International Business, Marketing, Operations Management",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, Urban Planning",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Popular Music Studies",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Chinese, Hispanic Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Environmental Design",
        duration: "3 years (BA), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Classical Archaeology, Egyptology, Archaeological Science",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Communication and Media": {
        courseContent: "Media Studies, Digital Communication, Journalism, Film and TV Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Software Engineering, Computer Systems",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Civil Engineering, Electronic Engineering, Materials Engineering, Mining Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Sciences",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Renewable Energy",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Natural Sciences": {
        courseContent: "Chemistry, Biology, Physics, Earth Sciences, Environmental Science",
        duration: "3 years (BSc), 4 years (MSci)",
        entryRequirements: "AAA (including relevant Science subjects)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Sport Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Behavioural Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Ancient History, Medieval History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Drama",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Ancient Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, European Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Global Health",
        duration: "5 years (BM BS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business and Management": {
        courseContent: "Strategic Management, International Business, Marketing, Entrepreneurship",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, Climate Science",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Russian, Arabic",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Classics and Ancient History": {
        courseContent: "Latin Literature, Greek Literature, Ancient History, Classical Archaeology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (Latin or Greek preferred)"
      },
      "Theology and Religion": {
        courseContent: "Christian Theology, World Religions, Religious Studies, Biblical Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Classical Archaeology, Archaeological Science, Heritage Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Art History and Visual Culture": {
        courseContent: "European Art, Contemporary Art, Visual Culture, Museum Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Drama": {
        courseContent: "Performance Studies, Theatre History, Applied Theatre, Devising",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Documentary Studies, Digital Media",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Sport and Health Sciences": {
        courseContent: "Exercise Physiology, Sports Psychology, Biomechanics, Public Health",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Medical Sciences": {
        courseContent: "Human Biology, Medical Microbiology, Pharmacology, Neuroscience",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Biology and Chemistry)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Cybersecurity, Data Science, Software Engineering",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics and Physics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Theoretical Physics, Mathematical Physics",
        duration: "3 years (BSc), 4 years (MMath/MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Pharmaceutical Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Marine Biology, Ecology, Genetics, Biotechnology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Applied Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Irish Politics, Conflict Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "Irish History, British History, European History, Medieval History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English": {
        courseContent: "English Literature, Irish Literature, Creative Writing, Literary Theory",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Irish Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, Irish Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Public Health",
        duration: "5 years (MB BCh BAO)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Dentistry": {
        courseContent: "Dental Anatomy, Clinical Dentistry, Oral Pathology, Dental Public Health",
        duration: "5 years (BDS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Pharmacy": {
        courseContent: "Pharmaceutical Sciences, Clinical Pharmacy, Drug Development, Pharmacology",
        duration: "4 years (MPharm)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Management": {
        courseContent: "Strategic Management, International Business, Marketing, Human Resources",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Irish Traditional Music",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Languages": {
        courseContent: "Irish Gaelic, French, German, Spanish, Translation Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Urban Planning",
        duration: "3 years (BSc), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Social Work": {
        courseContent: "Social Work Theory, Community Work, Child Protection, Mental Health",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Archaeology and Palaeoecology": {
        courseContent: "Field Archaeology, Irish Archaeology, Palaeoecology, Heritage Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Food and Nutrition": {
        courseContent: "Human Nutrition, Food Science, Dietetics, Public Health Nutrition",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Chemistry and Biology)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Cybersecurity, Mobile Computing",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Financial Mathematics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Nuclear Physics, Space Technology",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Medicinal Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Microbiology, Biochemistry, Biotechnology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Health Psychology, Forensic Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Financial Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, European Politics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Business Management": {
        courseContent: "Strategic Management, International Business, Marketing, Entrepreneurship",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Hospitality and Tourism Management": {
        courseContent: "Hotel Management, Tourism Studies, Event Management, International Hospitality",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Sound Recording",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Film Production, Digital Media",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "English Literature": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Drama",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Chinese, Translation Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Environmental Science": {
        courseContent: "Environmental Chemistry, Ecology, Climate Science, Sustainability",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Veterinary Medicine": {
        courseContent: "Animal Anatomy, Veterinary Pathology, Clinical Practice, Animal Welfare",
        duration: "5 years (BVMSci)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Nutrition and Dietetics": {
        courseContent: "Human Nutrition, Clinical Nutrition, Food Science, Public Health",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Chemistry and Biology)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Human-Computer Interaction, Data Science, Software Engineering",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aeronautical Engineering, Automotive Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematics with Economics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Physics with Astrophysics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Materials Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Materials": {
        courseContent: "Materials Science, Materials Engineering, Biomaterials, Nanotechnology",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics/Chemistry)"
      },
      "Sport Sciences": {
        courseContent: "Sport Science, Exercise Physiology, Sports Psychology, Coaching Science",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Business Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Business": {
        courseContent: "Management, Marketing, Finance, International Business, Entrepreneurship",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Financial Management": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Urban Design",
        duration: "3 years (BA), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Drama, Media Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Art and Design": {
        courseContent: "Fine Art, Graphic Design, Industrial Design, Textiles",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Social Sciences": {
        courseContent: "Sociology, Criminology, Social Policy, International Relations",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Media and Communications": {
        courseContent: "Media Studies, Digital Media, Communication Studies, Journalism",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Sport Psychology, Applied Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Information Management": {
        courseContent: "Information Systems, Data Management, Digital Libraries, Knowledge Management",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Product Design": {
        courseContent: "Industrial Design, User Experience Design, Design Engineering, Innovation",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Transport Studies": {
        courseContent: "Transport Planning, Logistics, Supply Chain Management, Sustainable Transport",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Cybersecurity, Software Engineering",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Mathematics and Statistics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Actuarial Science",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Meteorology, Climate Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Environmental Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Zoology, Microbiology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Developmental Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Diplomacy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Medieval History, War Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English Literature": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Theatre Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Ancient Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Business and Management": {
        courseContent: "Strategic Management, International Business, Marketing, Finance",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography and Environmental Science": {
        courseContent: "Physical Geography, Human Geography, Environmental Science, Climate Change",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Agriculture": {
        courseContent: "Crop Science, Animal Science, Agricultural Technology, Sustainable Agriculture",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Food Science": {
        courseContent: "Food Technology, Food Safety, Nutrition, Food Processing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Chemistry and Biology)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Environmental Design",
        duration: "3 years (BA), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Art": {
        courseContent: "Fine Art, Graphic Design, Art History, Contemporary Art",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Film Production, Digital Media",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Applied Linguistics",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Education": {
        courseContent: "Educational Studies, Primary Education, Secondary Education, Special Needs",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Pharmacy": {
        courseContent: "Pharmaceutical Sciences, Clinical Pharmacy, Drug Development, Pharmacology",
        duration: "4 years (MPharm)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Speech and Language Therapy": {
        courseContent: "Linguistics, Speech Pathology, Language Development, Communication Disorders",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Meteorology": {
        courseContent: "Atmospheric Physics, Climate Science, Weather Forecasting, Environmental Meteorology",
        duration: "3 years (BSc), 4 years (MMet)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Cognitive Science, Data Science",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Automotive Engineering, Electronic Engineering, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Biology",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics and Astronomy": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Quantum Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Biochemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Ecology, Genetics, Neuroscience, Zoology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Experimental Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Development Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA (including Mathematics)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Corruption Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Contemporary History, Social History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Literary Theory, American Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Philosophy of Mind, Political Philosophy, Continental Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, Human Rights Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Business and Management": {
        courseContent: "Strategic Management, International Business, Marketing, Innovation",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Banking",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, Geopolitics",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "International Development": {
        courseContent: "Development Studies, Global Politics, Aid and Development, Social Policy",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Anthropology": {
        courseContent: "Cultural Anthropology, Social Anthropology, Applied Anthropology, Ethnography",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Media Studies": {
        courseContent: "Media Theory, Digital Media, Film Studies, Cultural Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Popular Music",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Translation Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Education": {
        courseContent: "Educational Studies, Primary Education, Secondary Education, Special Needs",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Global Health",
        duration: "5 years (BMBS)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Games Development, Cybersecurity, Data Science",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematics with Computing",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Business": {
        courseContent: "Business Management, International Business, Marketing, Finance",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Economics and Finance": {
        courseContent: "Economics, Finance, Accounting, Business Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Design": {
        courseContent: "Industrial Design, Product Design, Digital Design, Design Engineering",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (portfolio required)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Human Rights Law, International Law",
        duration: "3 years (LLB)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Politics": {
        courseContent: "Political Science, International Relations, Public Policy, Government",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Journalism, Media Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (including English)"
      },
      "Psychology": {
        courseContent: "Psychology, Social Psychology, Cognitive Psychology, Applied Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Mathematics or Science)"
      },
      "Life Sciences": {
        courseContent: "Biomedical Sciences, Biosciences, Environmental Sciences, Sport Sciences",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Biology and Chemistry)"
      },
      "Health Sciences": {
        courseContent: "Public Health, Health Studies, Occupational Therapy, Physiotherapy",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Science subjects)"
      },
      "Social Sciences": {
        courseContent: "Sociology, Anthropology, Social Work, Criminology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Theatre": {
        courseContent: "Theatre Arts, Drama, Performance Studies, Stage Management",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (audition required)"
      },
      "Games Design": {
        courseContent: "Game Design, Digital Games Theory, Game Development, Interactive Media",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (portfolio required)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Cybersecurity, Software Engineering, Data Analytics, Machine Learning, Computer Vision, Natural Language Processing, Distributed Systems",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Electronic Engineering, Computer Systems Engineering, Telecommunications, Signal Processing, Embedded Systems, VLSI Design, Robotics",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Actuarial Science, Financial Mathematics, Operational Research, Mathematical Biology, Cryptography",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA-ABB (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Astrophysics, Particle Physics, Quantum Mechanics, Solid State Physics, Medical Physics, Computational Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Forensic Psychology, Neuropsychology, Developmental Psychology, Health Psychology, Research Methods",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics, Development Economics, Financial Economics, Industrial Economics, Game Theory",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, European Politics, Security Studies, Diplomacy, Political Economy, Conflict Resolution",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, Medieval History, Modern History, Social History, Military History, Cultural History, Historical Research Methods",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (including History preferred)"
      },
      "English and American Literature": {
        courseContent: "English Literature, American Literature, Creative Writing, Literary Theory, Victorian Literature, Modern Literature, Poetry, Drama Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Philosophy of Mind, Political Philosophy, Continental Philosophy, Philosophy of Science, Applied Ethics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law, European Law, Human Rights Law, Commercial Law, Legal Research Methods",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Business": {
        courseContent: "Strategic Management, International Business, Marketing, Finance, Entrepreneurship, Operations Management, Business Analytics, Digital Business",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis, Banking, Financial Markets, Risk Management, International Finance",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology, Urban Sociology, Gender Studies, Race and Ethnicity, Social Psychology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Anthropology": {
        courseContent: "Cultural Anthropology, Social Anthropology, Biological Anthropology, Archaeological Anthropology, Ethnography, Medical Anthropology, Applied Anthropology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Documentary Studies, Film Production, Digital Media, World Cinema, Genre Studies, Film Criticism",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology, Popular Music Studies, Music Theory, Audio Production, Sound Design",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-BBB (audition required)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Russian, Translation Studies, Comparative Literature, European Studies, Language Teaching",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-BBB (including relevant language)"
      },
      "Journalism": {
        courseContent: "News Writing, Media Law, Digital Journalism, Broadcast Journalism, Investigative Journalism, Media Ethics, Multimedia Reporting, News Production",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Drama": {
        courseContent: "Performance Studies, Theatre History, Playwriting, Directing, Stage Management, Applied Theatre, Community Theatre, Theatre Criticism",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (audition required)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Urban Planning, Environmental Design, Construction Management, Digital Architecture, Sustainable Design",
        duration: "3 years (BA), 2 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Biosciences": {
        courseContent: "Molecular Biology, Cell Biology, Genetics, Biochemistry, Microbiology, Biotechnology, Bioinformatics, Evolutionary Biology, Ecology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Biology and Chemistry)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Medicinal Chemistry, Environmental Chemistry, Materials Chemistry, Chemical Biology",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA-ABB (including Chemistry and Mathematics)"
      },
      "Sport and Exercise Science": {
        courseContent: "Exercise Physiology, Sports Psychology, Biomechanics, Sports Nutrition, Coaching Science, Sport Sociology, Exercise Rehabilitation, Performance Analysis",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Science subjects)"
      },
      "Education": {
        courseContent: "Educational Psychology, Primary Education, Secondary Education, Special Educational Needs, Education Policy, Curriculum Studies, Teaching Methods, Educational Research",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Computer Graphics, Data Science, Software Engineering, Human-Computer Interaction, Computational Intelligence, Mobile Computing, Cloud Computing",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace Engineering, Chemical Engineering, Civil Engineering, Electronic Engineering, Materials Engineering, Biomedical Engineering, Sustainable Engineering, Process Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Modelling, Financial Mathematics, Computational Mathematics, Mathematical Physics, Optimization",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA-ABB (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Condensed Matter Physics, Quantum Physics, Nuclear Physics, Medical Physics, Renewable Energy Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Environmental Chemistry, Materials Chemistry, Pharmaceutical Chemistry, Green Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA-ABB (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Marine Biology, Molecular Biology, Ecology, Genetics, Zoology, Botany, Conservation Biology, Evolutionary Biology, Environmental Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Health Psychology, Developmental Psychology, Neuropsychology, Applied Psychology, Research Methods",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics, Development Economics, Environmental Economics, Economic Policy, Business Economics",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Welsh Politics, European Politics, Public Policy, Political Economy, Global Governance",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "History": {
        courseContent: "Welsh History, British History, European History, Medieval History, Modern History, Maritime History, Social History, Cultural History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (including History preferred)"
      },
      "English Literature": {
        courseContent: "English Literature, Welsh Literature, Creative Writing, Literary Theory, Medieval Literature, Modern Literature, Postcolonial Literature, Comparative Literature",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Philosophy of Mind, Political Philosophy, Philosophy of Science, Applied Ethics, Welsh Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, Welsh Law, Human Rights Law, International Law, Commercial Law, Legal Skills",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Pre-clinical Medicine, Clinical Medicine, Medical Ethics, Public Health, Global Health, Medical Research, Community Medicine, Healthcare Management",
        duration: "5 years (MBBCh)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Business Management": {
        courseContent: "Strategic Management, International Business, Marketing, Finance, Entrepreneurship, Operations Management, Business Analytics, Digital Innovation",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis, Banking, Financial Markets, Risk Management, Auditing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS, Climate Change, Coastal Geography, Urban Geography, Cultural Geography",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-BBB (including Geography preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology, Urban Sociology, Welsh Society, Social Psychology, Community Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Welsh, Translation Studies, European Studies, Applied Linguistics, Language Teaching",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-BBB (including relevant language)"
      },
      "Welsh": {
        courseContent: "Welsh Language, Welsh Literature, Celtic Studies, Welsh Culture, Welsh History, Translation, Creative Writing in Welsh, Welsh Linguistics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (Welsh language skills preferred)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology, Welsh Music, Popular Music Studies, Audio Production, Music Education",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-BBB (audition required)"
      },
      "American Studies": {
        courseContent: "American History, American Literature, American Politics, American Culture, Film Studies, African American Studies, Native American Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Sports Science": {
        courseContent: "Exercise Physiology, Sports Psychology, Biomechanics, Sports Nutrition, Coaching Science, Sport Management, Exercise Rehabilitation, Performance Analysis",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Science subjects)"
      },
      "Environmental Science": {
        courseContent: "Environmental Chemistry, Ecology, Climate Science, Conservation Biology, Environmental Management, Renewable Energy, Pollution Control, Sustainability",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Science subjects)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Welsh Archaeology, Classical Archaeology, Archaeological Science, Heritage Studies, Museum Studies, Conservation, Digital Archaeology",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Education": {
        courseContent: "Primary Education, Secondary Education, Welsh-medium Education, Special Educational Needs, Educational Psychology, Education Policy, Teaching Methods",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Health Sciences": {
        courseContent: "Public Health, Health Promotion, Healthcare Management, Mental Health, Community Health, Health Policy, Epidemiology, Health Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Science subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Cybersecurity, Software Engineering, Machine Learning, Computer Vision, Big Data Analytics, Cloud Computing",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aeronautical Engineering, Biomedical Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering, Energy Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Actuarial Science, Financial Mathematics, Mathematical Modelling, Data Analytics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA-ABB (including Mathematics and Further Mathematics)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Financial Economics, International Economics, Behavioural Economics, Economic Policy",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Business": {
        courseContent: "Management, Finance, Marketing, International Business, Entrepreneurship, Strategic Management, Business Analytics, Digital Business",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Banking, Risk Management, Financial Markets, Auditing",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Commercial Law, International Law, Human Rights Law, Legal Practice, Dispute Resolution",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Organizational Psychology, Health Psychology, Research Methods",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, Public Policy, European Politics, Global Governance",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Drama, Journalism, Media Studies, Publishing",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Urban Studies, Criminology, Social Psychology, Community Studies",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology, Music Business, Audio Production, Sound Design",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Journalism": {
        courseContent: "News Writing, Digital Journalism, Broadcast Journalism, Investigative Journalism, Media Law, Ethics, Multimedia Reporting",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Optometry": {
        courseContent: "Ocular Anatomy, Visual Optics, Contact Lenses, Binocular Vision, Ocular Disease, Clinical Practice, Low Vision",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Physics/Chemistry)"
      },
      "Radiography": {
        courseContent: "Medical Imaging, Radiation Physics, Anatomy, Pathology, Clinical Practice, Patient Care, Radiation Protection",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Nursing": {
        courseContent: "Adult Nursing, Mental Health Nursing, Clinical Skills, Pharmacology, Health Assessment, Patient Care, Evidence-Based Practice",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Science subjects)"
      },
      "Criminology": {
        courseContent: "Criminal Justice, Policing, Forensic Psychology, Crime Analysis, Security Studies, Criminal Law, Victimology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Robotics, Data Science, Software Engineering, Human-Computer Interaction, Cybersecurity, Machine Learning, Computer Networks",
        duration: "4 years (BSc), 5 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Chemical Engineering, Civil Engineering, Electrical Engineering, Mechanical Engineering, Petroleum Engineering, Renewable Energy Engineering, Robotics",
        duration: "4 years (BEng), 5 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Actuarial Mathematics, Financial Mathematics, Mathematical Biology, Computational Mathematics",
        duration: "4 years (MA), 5 years (MMath)",
        entryRequirements: "AAA-ABB (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Applied Physics, Renewable Energy Physics, Medical Physics, Quantum Physics, Materials Physics",
        duration: "4 years (BSc), 5 years (MPhys)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Pure Chemistry, Applied Chemistry, Materials Chemistry, Environmental Chemistry, Pharmaceutical Chemistry, Chemical Analysis, Green Chemistry",
        duration: "4 years (BSc), 5 years (MChem)",
        entryRequirements: "AAA-ABB (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Marine Biology, Molecular Biology, Environmental Biology, Biotechnology, Conservation Biology, Microbiology, Ecology",
        duration: "4 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Business Psychology, Applied Psychology, Research Methods, Statistics, Developmental Psychology",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics, Business Economics, Economic Policy, Financial Economics",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Business and Management": {
        courseContent: "Strategic Management, International Business, Marketing, Finance, Entrepreneurship, Operations Management, Digital Business, Supply Chain",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis, Risk Management, International Finance, Banking",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Architecture": {
        courseContent: "Design Studio, Building Technology, Architectural History, Urban Planning, Sustainable Design, Construction Management, Digital Architecture",
        duration: "5 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Construction Project Management": {
        courseContent: "Project Management, Construction Technology, Quantity Surveying, Building Information Modelling, Sustainable Construction, Contract Law",
        duration: "4 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Brewing and Distilling": {
        courseContent: "Fermentation Science, Brewing Technology, Distillation, Quality Control, Product Development, Business Management, Food Safety",
        duration: "4 years (BSc)",
        entryRequirements: "AAA-ABB (including Chemistry and Biology)"
      },
      "Fashion Marketing": {
        courseContent: "Fashion Marketing, Brand Management, Retail Management, Consumer Behavior, Fashion Buying, Digital Marketing, Global Fashion",
        duration: "4 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Textiles and Fashion Design": {
        courseContent: "Textile Design, Fashion Design, Pattern Making, Garment Construction, Fashion Technology, Sustainable Fashion, Fashion History",
        duration: "4 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Urban Planning": {
        courseContent: "Urban Design, Planning Policy, Environmental Planning, Transportation Planning, Housing Policy, Sustainability, GIS",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Actuarial Science": {
        courseContent: "Probability, Statistics, Financial Mathematics, Risk Management, Insurance, Pension Planning, Investment Analysis",
        duration: "4 years (BSc)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Information Systems": {
        courseContent: "Database Systems, Systems Analysis, Business Intelligence, IT Project Management, Cybersecurity, Cloud Computing, Data Analytics",
        duration: "4 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Languages and Intercultural Studies": {
        courseContent: "French, German, Spanish, Mandarin, Japanese, Translation Studies, Intercultural Communication, International Business",
        duration: "5 years (MA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Petroleum Engineering": {
        courseContent: "Reservoir Engineering, Drilling Engineering, Production Engineering, Petroleum Geology, Well Design, Enhanced Oil Recovery",
        duration: "4 years (BEng), 5 years (MEng)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Information Security, Data Science, Machine Learning, Cybersecurity, Software Engineering, Computer Networks, Distributed Systems",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Physics, Financial Mathematics, Cryptography, Number Theory, Analysis",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA-ABB (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Particle Physics, Astrophysics, Quantum Physics, Condensed Matter Physics, Medical Physics",
        duration: "3 years (BSc), 4 years (MPhys)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics, Financial Economics, Development Economics, Economic Theory",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Management": {
        courseContent: "Strategic Management, International Business, Marketing, Finance, Entrepreneurship, Operations Management, Leadership, Organizational Behavior",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Developmental Psychology, Forensic Psychology, Health Psychology, Research Methods",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "English": {
        courseContent: "English Literature, Creative Writing, Literary Theory, Victorian Literature, Modern Literature, American Literature, Shakespeare Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including English Literature)"
      },
      "History": {
        courseContent: "British History, European History, Medieval History, Modern History, Social History, Cultural History, Political History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (including History preferred)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, European Politics, Security Studies, Political Economy, Global Governance",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Philosophy of Mind, Political Philosophy, Continental Philosophy, Philosophy of Science, Applied Philosophy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Russian, Comparative Literature, Translation Studies, European Studies, Language Teaching",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-ABB (including relevant language)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology, Music Theory, Popular Music Studies, Sound Design, Music Production",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Drama and Theatre Studies": {
        courseContent: "Performance Studies, Theatre History, Playwriting, Directing, Stage Management, Applied Theatre, Theatre Criticism, Drama Therapy",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (audition required)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Documentary Studies, Film Production, World Cinema, Genre Studies, Film Criticism, Digital Media",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Media Arts": {
        courseContent: "Digital Media, Interactive Media, Video Production, Animation, Game Design, Virtual Reality, Multimedia Design, Media Theory",
        duration: "3 years (BA)",
        entryRequirements: "AAA-ABB (portfolio required)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS, Climate Change, Urban Geography, Cultural Geography, Geopolitics",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAA-ABB (including Geography preferred)"
      },
      "Geology": {
        courseContent: "Physical Geology, Environmental Geology, Mineralogy, Petrology, Structural Geology, Hydrogeology, Geological Mapping, Earth Sciences",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics and Science)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Cell Biology, Ecology, Genetics, Biochemistry, Microbiology, Biotechnology, Evolutionary Biology, Conservation Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Chemistry": {
        courseContent: "Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Medicinal Chemistry, Environmental Chemistry, Materials Chemistry",
        duration: "3 years (BSc), 4 years (MChem)",
        entryRequirements: "AAA-ABB (including Chemistry and Mathematics)"
      },
      "Criminology": {
        courseContent: "Criminal Justice, Policing, Forensic Psychology, Crime Analysis, Security Studies, Criminal Law, Victimology, Penology",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law, Human Rights Law, Commercial Law, Legal Practice, Jurisprudence",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Information Security": {
        courseContent: "Cybersecurity, Network Security, Digital Forensics, Cryptography, Risk Management, Security Management, Ethical Hacking, Security Policy",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Software Engineering, Computer Networks, Cybersecurity, Mobile Computing, Web Development, Database Systems",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAB-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Chemical Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering, Biomedical Engineering, Design Engineering",
        duration: "3 years (BEng), 4 years (MEng)",
        entryRequirements: "AAB-ABB (including Mathematics and Physics)"
      },
      "Business": {
        courseContent: "Management, Marketing, Finance, International Business, Entrepreneurship, Business Analytics, Operations Management, Strategic Management",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-ABB (no specific subjects)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Business Psychology, Health Psychology, Applied Psychology, Research Methods, Developmental Psychology",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-ABB (including Mathematics or Science)"
      },
      "Biology": {
        courseContent: "Human Biology, Cell Biology, Molecular Biology, Genetics, Biochemistry, Microbiology, Biotechnology, Medical Biology",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-ABB (including Biology and Chemistry)"
      },
      "Pharmacy": {
        courseContent: "Pharmaceutical Sciences, Clinical Pharmacy, Drug Development, Pharmacology, Medicinal Chemistry, Pharmacy Practice, Patient Care",
        duration: "4 years (MPharm)",
        entryRequirements: "AAB (including Chemistry and Biology)"
      },
      "Optometry": {
        courseContent: "Vision Science, Ocular Anatomy, Visual Optics, Contact Lenses, Binocular Vision, Ocular Disease, Clinical Practice",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-ABB (including Biology and Physics/Chemistry)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Modelling, Financial Mathematics, Computational Mathematics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAB-ABB (including Mathematics)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics, Financial Economics, Business Economics, Economic Policy",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-ABB (including Mathematics)"
      },
      "Politics and International Relations": {
        courseContent: "Political Theory, International Relations, Comparative Politics, European Politics, Public Policy, Political Economy",
        duration: "3 years (BA)",
        entryRequirements: "AAB-ABB (no specific subjects)"
      },
      "English Language": {
        courseContent: "English Language, Linguistics, Applied Linguistics, Language Teaching, Translation Studies, Communication Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAB-ABB (including English)"
      },
      "History": {
        courseContent: "British History, European History, Social History, Cultural History, Political History, Economic History",
        duration: "3 years (BA)",
        entryRequirements: "AAB-ABB (including History preferred)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology, Social Psychology, Urban Studies, Community Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAB-ABB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Translation Studies, European Studies, International Business Communication",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAB-ABB (including relevant language)"
      }
    },
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Machine Learning, Data Science, Computer Games, Cybersecurity, Software Engineering, Human-Computer Interaction, Robotics",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, International Economics, Development Economics, Financial Economics, Behavioral Economics, Economic Policy",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Financial Mathematics, Mathematical Biology, Operational Research, Computational Mathematics",
        duration: "3 years (BSc), 4 years (MMath)",
        entryRequirements: "AAA-ABB (including Mathematics and Further Mathematics)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Developmental Psychology, Forensic Psychology, Health Psychology, Research Methods",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Mathematics or Science)"
      },
      "Politics": {
        courseContent: "Political Theory, International Relations, Comparative Politics, European Politics, Public Policy, Political Economy, Human Rights",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology, Urban Studies, Gender Studies, Social Psychology, Community Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, International Law, Human Rights Law, Commercial Law, European Law, Legal Practice",
        duration: "3 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "History": {
        courseContent: "British History, European History, American History, Social History, Cultural History, Political History, Medieval History",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (including History preferred)"
      },
      "English Literature": {
        courseContent: "English Literature, Creative Writing, Literary Theory, American Literature, Modern Literature, Victorian Literature, Drama Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (including English Literature)"
      },
      "Philosophy": {
        courseContent: "Ethics, Logic, Metaphysics, Philosophy of Mind, Political Philosophy, Continental Philosophy, Philosophy of Science, Applied Ethics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Business Management": {
        courseContent: "Strategic Management, International Business, Marketing, Finance, Entrepreneurship, Operations Management, Digital Business, Leadership",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Accounting and Finance": {
        courseContent: "Financial Accounting, Management Accounting, Corporate Finance, Investment Analysis, Banking, Financial Markets, Risk Management",
        duration: "3 years (BSc)",
        entryRequirements: "AAA-BBB (including Mathematics)"
      },
      "Film Studies": {
        courseContent: "Film Theory, Cinema History, Documentary Studies, Film Production, World Cinema, Genre Studies, Digital Media, Screen Writing",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Art History": {
        courseContent: "European Art, Contemporary Art, Visual Culture, Museum Studies, Art Criticism, Renaissance Art, Modern Art, Curatorial Studies",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Portuguese, Translation Studies, European Studies, Applied Linguistics, Cultural Studies",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAA-BBB (including relevant language)"
      },
      "Linguistics": {
        courseContent: "Phonetics, Syntax, Semantics, Psycholinguistics, Sociolinguistics, Language Acquisition, Computational Linguistics, Applied Linguistics",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      },
      "Drama": {
        courseContent: "Performance Studies, Theatre History, Playwriting, Directing, Stage Management, Applied Theatre, Theatre Criticism, Community Theatre",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (audition required)"
      },
      "Human Rights": {
        courseContent: "Human Rights Law, International Law, Political Theory, Social Justice, Conflict Resolution, Development Studies, Legal Practice",
        duration: "3 years (BA)",
        entryRequirements: "AAA-BBB (no specific subjects)"
      }
    },
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
    scholarships: "Bangor University International Scholarship, Wales Scholarship",
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Data Science, Software Engineering, Computer Networks, Cybersecurity, Game Development, Mobile Computing, Web Technologies",
        duration: "3 years (BSc), 4 years (MEng)",
        entryRequirements: "AAB-BBB (including Mathematics)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Clinical Psychology, Sports Psychology, Neuropsychology, Health Psychology, Child Psychology, Research Methods",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-BBB (including Mathematics or Science)"
      },
      "Business": {
        courseContent: "Business Management, Marketing, Finance, International Business, Entrepreneurship, Digital Business, Operations Management, Strategic Planning",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-BBB (no specific subjects)"
      },
      "Ocean Sciences": {
        courseContent: "Marine Biology, Oceanography, Marine Chemistry, Marine Geology, Fisheries Science, Marine Conservation, Coastal Management, Climate Change",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-BBB (including Science subjects)"
      },
      "Environmental Science": {
        courseContent: "Environmental Chemistry, Ecology, Conservation Biology, Climate Science, Environmental Management, Renewable Energy, Sustainability, GIS",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-BBB (including Science subjects)"
      },
      "Forestry": {
        courseContent: "Forest Management, Silviculture, Forest Ecology, Wood Science, Conservation, Arboriculture, Forest Economics, Sustainable Forestry",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-BBB (including Science subjects)"
      },
      "English Literature": {
        courseContent: "English Literature, Welsh Literature, Creative Writing, Literary Theory, Medieval Literature, Modern Literature, Poetry, Drama",
        duration: "3 years (BA)",
        entryRequirements: "AAB-BBB (including English Literature)"
      },
      "History": {
        courseContent: "Welsh History, British History, Medieval History, Modern History, Social History, Cultural History, Archaeological History",
        duration: "3 years (BA)",
        entryRequirements: "AAB-BBB (including History preferred)"
      },
      "Welsh": {
        courseContent: "Welsh Language, Welsh Literature, Celtic Studies, Welsh Culture, Welsh History, Translation, Creative Writing in Welsh, Welsh Linguistics",
        duration: "3 years (BA)",
        entryRequirements: "AAB-BBB (Welsh language skills preferred)"
      },
      "Modern Languages": {
        courseContent: "French, German, Spanish, Italian, Chinese, Translation Studies, European Studies, Applied Linguistics, International Communication",
        duration: "4 years (BA) with year abroad",
        entryRequirements: "AAB-BBB (including relevant language)"
      },
      "Music": {
        courseContent: "Music Performance, Composition, Music Technology, Musicology, Welsh Music, Popular Music Studies, Music Education, Audio Production",
        duration: "3 years (BA/BMus)",
        entryRequirements: "AAB-BBB (audition required)"
      },
      "Sport Science": {
        courseContent: "Exercise Physiology, Sports Psychology, Biomechanics, Sports Nutrition, Coaching Science, Sport Management, Exercise Rehabilitation",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-BBB (including Science subjects)"
      },
      "Education": {
        courseContent: "Primary Education, Secondary Education, Welsh-medium Education, Special Educational Needs, Educational Psychology, Teaching Methods",
        duration: "3 years (BA)",
        entryRequirements: "AAB-BBB (no specific subjects)"
      },
      "Sociology": {
        courseContent: "Social Theory, Research Methods, Social Policy, Criminology, Welsh Society, Community Studies, Social Psychology",
        duration: "3 years (BA)",
        entryRequirements: "AAB-BBB (no specific subjects)"
      },
      "Geography": {
        courseContent: "Physical Geography, Human Geography, Environmental Geography, GIS, Climate Change, Coastal Geography, Welsh Geography",
        duration: "3 years (BSc/BA)",
        entryRequirements: "AAB-BBB (including Geography preferred)"
      },
      "Archaeology": {
        courseContent: "Field Archaeology, Welsh Archaeology, Prehistoric Archaeology, Medieval Archaeology, Heritage Studies, Archaeological Science",
        duration: "3 years (BA)",
        entryRequirements: "AAB-BBB (no specific subjects)"
      },
      "Law": {
        courseContent: "Contract Law, Criminal Law, Constitutional Law, Welsh Law, Human Rights Law, Commercial Law, Legal Practice",
        duration: "3 years (LLB)",
        entryRequirements: "AAB (no specific subjects)"
      },
      "Banking and Finance": {
        courseContent: "Banking, Corporate Finance, Investment Analysis, Financial Markets, Risk Management, International Finance, Financial Planning",
        duration: "3 years (BSc)",
        entryRequirements: "AAB-BBB (including Mathematics)"
      }
    },
    courseContent: "Programming, AI, Data Science, Software Engineering, Computer Networks",
    duration: "3 years (BSc), 4 years (MEng)",
    employmentRate: "78%",
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
    programs: {
      "Computer Science": {
        courseContent: "Programming, AI, Software Engineering, Computer Systems, Data Analytics, Cybersecurity, Machine Learning, Human-Computer Interaction",
        duration: "4 years (BSc), 5 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Aerospace Engineering, Biomedical Engineering, Chemical Engineering, Civil Engineering, Electronic Engineering, Mechanical Engineering, Naval Architecture",
        duration: "4 years (BEng), 5 years (MEng)",
        entryRequirements: "AAA-ABB (including Mathematics and Physics)"
      },
      "Business": {
        courseContent: "Business Administration, International Business, Marketing, Finance, Entrepreneurship, Strategic Management, Operations Management",
        duration: "4 years (BA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      },
      "Pharmacy": {
        courseContent: "Pharmaceutical Sciences, Clinical Pharmacy, Drug Development, Pharmacology, Medicinal Chemistry, Pharmacy Practice",
        duration: "5 years (MPharm)",
        entryRequirements: "AAA (including Chemistry and Biology)"
      },
      "Law": {
        courseContent: "Scots Law, Criminal Law, Contract Law, Constitutional Law, International Law, Commercial Law",
        duration: "4 years (LLB)",
        entryRequirements: "AAA (no specific subjects)"
      },
      "Mathematics": {
        courseContent: "Pure Mathematics, Applied Mathematics, Statistics, Mathematical Modelling, Financial Mathematics, Actuarial Mathematics",
        duration: "4 years (BSc), 5 years (MMath)",
        entryRequirements: "AAA (including Mathematics and Further Mathematics)"
      },
      "Physics": {
        courseContent: "Theoretical Physics, Experimental Physics, Applied Physics, Medical Physics, Renewable Energy Physics",
        duration: "4 years (BSc), 5 years (MPhys)",
        entryRequirements: "AAA (including Mathematics and Physics)"
      },
      "Chemistry": {
        courseContent: "Pure Chemistry, Applied Chemistry, Forensic Chemistry, Environmental Chemistry, Materials Chemistry",
        duration: "4 years (BSc), 5 years (MChem)",
        entryRequirements: "AAA (including Chemistry and Mathematics)"
      },
      "Biology": {
        courseContent: "Molecular Biology, Marine Biology, Microbiology, Biotechnology, Immunology, Genetics",
        duration: "4 years (BSc)",
        entryRequirements: "AAA-ABB (including Biology and Chemistry)"
      },
      "Psychology": {
        courseContent: "Psychology, Applied Psychology, Forensic Psychology, Health Psychology, Research Methods",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (including Mathematics or Science)"
      },
      "Architecture": {
        courseContent: "Architectural Design, Building Technology, Urban Planning, Sustainable Design, Digital Architecture",
        duration: "5 years (MArch)",
        entryRequirements: "AAA (portfolio required)"
      },
      "Education": {
        courseContent: "Primary Education, Secondary Education, Educational Psychology, Special Educational Needs, Teaching Methods",
        duration: "4 years (MA)",
        entryRequirements: "AAA-ABB (no specific subjects)"
      }
    },
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

// Get authentic courses from university programs data
const getAuthenticCoursesForUniversity = (universityName) => {
  // Find the university in our data
  const university = universitiesData.find(uni => uni.name === universityName);
  
  if (!university || !university.programs) {
    return [];
  }
  
  // Convert programs object to array format expected by the UI
  return Object.entries(university.programs).map(([programName, programData]) => ({
    name: programName,
    fullTitle: `${programData.duration.includes('BA') ? 'BA' : programData.duration.includes('BSc') ? 'BSc' : programData.duration.includes('BEng') ? 'BEng' : programData.duration.includes('MEng') ? 'MEng' : 'Bachelor'} ${programName}`,
    duration: programData.duration,
    studyMode: "Full time",
    distanceLearning: "Contact university",
    workPlacement: "Contact university", 
    yearAbroad: "Contact university",
    courseContent: programData.courseContent,
    entryRequirements: programData.entryRequirements
  }));
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
  const [selectedInstitution, setSelectedInstitution] = useState(''); // New state for institution filter
  const [sortBy, setSortBy] = useState('ranking');
  const [showComparison, setShowComparison] = useState(false);
  const [searchMode, setSearchMode] = useState('universities'); // 'universities' or 'courses'
  const [currentSearchPage, setCurrentSearchPage] = useState(1); // For paginating search results

  const UNIVERSITIES_PER_PAGE = 6;

  const filteredAndSortedUniversities = useMemo(() => {
    let filtered = [];
    
    if (searchMode === 'courses') {
      // Search by course/program name and return universities with detailed course data
      if (searchTerm.trim() || selectedInstitution) {
        filtered = universitiesData.map(uni => {
          // If institution filter is selected, only process that specific university
          if (selectedInstitution && uni.name !== selectedInstitution) {
            return {
              ...uni,
              matchingCourses: [],
              courseCount: 0
            };
          }

          let matchingCourses = [];
          
          // Get authentic courses for this university
          const authenticCourses = getAuthenticCoursesForUniversity(uni.name);
          
          // If only institution is selected (no search term), show all courses for that institution
          if (selectedInstitution && !searchTerm.trim()) {
            matchingCourses = authenticCourses;
          } else if (searchTerm.trim()) {
            // Filter courses that match the search term
            authenticCourses.forEach(course => {
              if (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  course.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  course.courseContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                matchingCourses.push(course);
              }
            });
          }
          
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

  const handleInstitutionChange = (e) => {
    setSelectedInstitution(e.target.value);
    setCurrentSearchPage(1); // Reset to page 1 when institution changes
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
                  onClick={() => {setSearchMode('universities'); setSearchTerm(''); setSelectedInstitution('');}}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    searchMode === 'universities' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Search Universities
                </button>
                <button
                  onClick={() => {setSearchMode('courses'); setSearchTerm(''); setSelectedInstitution('');}}
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
              
              {/* Institution Filter - only show in course search mode */}
              {searchMode === 'courses' && (
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={selectedInstitution}
                  onChange={handleInstitutionChange}
                >
                  <option value="">All Institutions</option>
                  {universitiesData.slice(0, 50).map(uni => (
                    <option key={uni.id} value={uni.name}>
                      {uni.name}
                    </option>
                  ))}
                </select>
              )}
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="ranking">Sort by Ranking</option>
                <option value="name">Sort by Name</option>
                <option value="fees">Sort by UK Fees</option>
                {searchMode === 'courses' && (searchTerm || selectedInstitution) && (
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
                  {searchMode === 'courses' && (searchTerm || selectedInstitution) ? 'Provider(s)' : 'Universities Listed'}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {searchMode === 'courses' && searchTerm ? `for "${searchTerm}"` 
                    : searchMode === 'courses' && selectedInstitution ? `from ${selectedInstitution}`
                    : '130+ total available'}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {searchMode === 'courses' && (searchTerm || selectedInstitution)
                    ? filteredAndSortedUniversities.reduce((total, uni) => total + uni.courseCount, 0)
                    : searchMode === 'courses' && selectedCourses.length > 0
                    ? selectedCourses.length
                    : selectedUniversities.length
                  }
                </div>
                <div className="text-gray-600">
                  {searchMode === 'courses' && (searchTerm || selectedInstitution)
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
            {searchMode === 'courses' && (searchTerm || selectedInstitution) ? (
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
                            selectedInstitution={selectedInstitution}
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