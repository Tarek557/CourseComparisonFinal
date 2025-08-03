import React, { useState, useMemo } from 'react';
import './App.css';

// Comprehensive UK Universities Data for Computer Science Programs
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
    courseContent: "Algorithms, Computer Systems, Software Engineering, Machine Learning, AI",
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