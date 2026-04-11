const Candidate = require('./models/Candidate');
const db = require('./db');

const sampleData = [
  {
    name: "Rohan Sharma",
    email: "rohan.sharma.tech@example.com",
    phone: "+91 9876543210",
    location: "Bangalore, India",
    rawText: "Highly skilled Software Engineer with 5 years of experience building scalable backend systems using Node.js, Express, and PostgreSQL. Expert in designing RESTful APIs and deploying microservices on AWS (EC2, ECS, S3). Strong understanding of performance tuning and database indexing.",
    skills: ["Node.js", "Express", "PostgreSQL", "AWS", "Microservices", "REST APIs"],
    experience: 5
  },
  {
    name: "Priya Patel",
    email: "priya.patel.dev@example.com",
    phone: "+91 8765432109",
    location: "Mumbai, India",
    rawText: "Frontend Developer specializing in React.js and modern JavaScript. 4 years of experience delivering highly responsive and accessible UI components. Proficient in Tailwind CSS, Redux, and integrating GraphQL APIs. Passionate about web performance and accessibility.",
    skills: ["React.js", "JavaScript", "Tailwind CSS", "Redux", "GraphQL", "Frontend"],
    experience: 4
  },
  {
    name: "Amit Desai",
    email: "amit.desai.pmp@example.com",
    phone: "+91 7654321098",
    location: "Pune, India",
    rawText: "Experienced Project Manager (PMP certified) with a proven track record of delivering cross-functional SaaS projects in the FinTech industry. Over 8 years of experience coordinating with engineering, design, and QA teams using Agile frameworks like Scrum and Kanban. Excellent stakeholder management skills.",
    skills: ["Project Management", "Agile", "Scrum", "SaaS", "Stakeholder Management", "Jira"],
    experience: 8
  },
  {
    name: "Kavya Singh",
    email: "kavya.singh.data@example.com",
    phone: "+91 6543210987",
    location: "Hyderabad, India",
    rawText: "Data Scientist with a background in machine learning and predictive analytics. 3 years of experience using Python, Pandas, and Scikit-Learn to build recommendation systems and natural language processing pipelines. Familiar with deploying models using Flask and Docker.",
    skills: ["Python", "Machine Learning", "Pandas", "Scikit-Learn", "NLP", "Docker"],
    experience: 3
  },
  {
    name: "Aarav Kumar",
    email: "aarav.kumar.devops@example.com",
    phone: "+91 5432109876",
    location: "Chennai, India",
    rawText: "DevOps Engineer focusing on continuous integration and deployment pipelines. 6 years of experience optimizing development workflows and reducing deployment times. Proficient in Kubernetes, Terraform, GitHub Actions, and Jenkins. Strong background in Linux administration and bash scripting.",
    skills: ["DevOps", "Kubernetes", "Terraform", "CI/CD", "Linux", "Jenkins"],
    experience: 6
  }
];

async function seedDatabase() {
  console.log('Connecting to database and starting seed process...');
  try {
    for (const candidate of sampleData) {
      console.log(`Processing candidate: ${candidate.name}`);
      await Candidate.upsert(candidate);
    }
    console.log('✅ Successfully seeded sample candidates with Indian names into the database.');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    process.exit(0);
  }
}

seedDatabase();