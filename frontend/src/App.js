import React, { useState, useMemo } from 'react';
import './App.css';

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
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Engineering": {
        courseContent: "Mathematics, Physics, Materials Science, Thermodynamics, Design Engineering",
        duration: "4 years (MEng)",
        entryRequirements: "A*AA (including Mathematics and Physics)"
      },
      "Business & Management": {
        courseContent: "Strategy, Finance, Marketing, Operations, Organizational Behaviour",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (no specific subjects)"
      },
      "Medicine": {
        courseContent: "Anatomy, Physiology, Pathology, Clinical Medicine, Research Methods",
        duration: "6 years (MB BChir)",
        entryRequirements: "A*AA (including Chemistry and Biology)"
      },
      "Law": {
        courseContent: "Constitutional Law, Contract Law, Criminal Law, Human Rights, Legal Theory",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (no specific subjects)"
      },
      "Economics": {
        courseContent: "Microeconomics, Macroeconomics, Econometrics, Mathematical Economics",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (including Mathematics)"
      },
      "Psychology": {
        courseContent: "Cognitive Psychology, Social Psychology, Developmental Psychology, Research Methods",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (including Mathematics recommended)"
      },
      "English Literature": {
        courseContent: "Medieval Literature, Renaissance Drama, Victorian Novel, Modern Poetry",
        duration: "3 years (BA)",
        entryRequirements: "A*AA (including English Literature)"
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

const UniversityCard = ({ university, isSelected, onSelect, isCompareMode }) => {
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

const ComparisonTable = ({ universities, onRemove }) => {
  const comparisonFields = [
    { key: 'name', label: 'University Name', type: 'text' },
    { key: 'ranking', label: 'THE Ranking', type: 'ranking' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'tuitionFeesUK', label: 'UK Student Fees', type: 'fee' },
    { key: 'tuitionFeesInternational', label: 'International Fees', type: 'fee' },
    { key: 'entryRequirements', label: 'Entry Requirements', type: 'text' },
    { key: 'ucasPoints', label: 'UCAS Points', type: 'text' },
    { key: 'duration', label: 'Course Duration', type: 'text' },
    { key: 'employmentRate', label: 'Employment Rate', type: 'percentage' },
    { key: 'researchRating', label: 'Research Rating', type: 'rating' },
    { key: 'courseContent', label: 'Course Content', type: 'text' },
    { key: 'scholarships', label: 'Available Scholarships', type: 'text' }
  ];

  const getCellValue = (university, field) => {
    const value = university[field.key];
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
      default:
        return <span className="text-gray-800">{value}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h2 className="text-2xl font-bold">University Comparison</h2>
        <p className="text-blue-100">Computer Science Programs Side-by-Side</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700 border-b">Criteria</th>
              {universities.map((uni, index) => (
                <th key={uni.id} className="text-left p-4 font-semibold text-gray-700 border-b min-w-64">
                  <div className="flex justify-between items-center">
                    <span>{uni.name}</span>
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
                <td className="p-4 font-semibold text-gray-700 border-r">{field.label}</td>
                {universities.map((uni) => (
                  <td key={`${uni.id}-${field.key}`} className="p-4 border-r">
                    {getCellValue(uni, field)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function App() {
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('ranking');
  const [showComparison, setShowComparison] = useState(false);

  const filteredAndSortedUniversities = useMemo(() => {
    let filtered = universitiesData.filter(uni =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ranking':
          return a.ranking - b.ranking;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'fees':
          return parseInt(a.tuitionFeesUK.replace(/[£,]/g, '')) - parseInt(b.tuitionFeesUK.replace(/[£,]/g, ''));
        default:
          return a.ranking - b.ranking;
      }
    });
  }, [searchTerm, sortBy]);

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

  const removeFromComparison = (universityId) => {
    setSelectedUniversities(prev => prev.filter(uni => uni.id !== universityId));
  };

  const clearComparison = () => {
    setSelectedUniversities([]);
    setShowComparison(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">UK Universities CS Program Finder</h1>
          <p className="text-xl text-blue-100">Compare Computer Science, Computing & Data Science programs from top UK universities</p>
        </div>
      </header>

      {/* Control Panel */}
      <div className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search universities or locations..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="ranking">Sort by Ranking</option>
                <option value="name">Sort by Name</option>
                <option value="fees">Sort by UK Fees</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              {selectedUniversities.length > 0 && (
                <>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {showComparison ? 'Show Universities' : `Compare Selected (${selectedUniversities.length})`}
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
        {showComparison && selectedUniversities.length > 0 ? (
          <ComparisonTable 
            universities={selectedUniversities} 
            onRemove={removeFromComparison}
          />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{filteredAndSortedUniversities.length}</div>
                <div className="text-gray-600">Universities Listed</div>
                <div className="text-sm text-gray-500 mt-1">130+ total available</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{selectedUniversities.length}</div>
                <div className="text-gray-600">Selected for Comparison</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                <div className="text-gray-600">Program Types</div>
                <div className="text-sm text-gray-500 mt-1">CS, Computing, Data Science</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">THE</div>
                <div className="text-gray-600">Ranking Source</div>
                <div className="text-sm text-gray-500 mt-1">Times Higher Education</div>
              </div>
            </div>

            {/* University Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedUniversities.map((university) => (
                <UniversityCard
                  key={university.id}
                  university={university}
                  isSelected={selectedUniversities.some(uni => uni.id === university.id)}
                  onSelect={handleUniversitySelect}
                  isCompareMode={selectedUniversities.length > 0}
                />
              ))}
            </div>

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