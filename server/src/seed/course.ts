import prisma from '../lib/prisma';

async function main() {

  await prisma.course.create({
    data: {
      title: 'Certificate Course in Drafting and Conveyancing',
      instructor: {
        connect: { id: '6824bc4f39b98dc2ad18e0f4' },
      },
      description:
        'Focuses on skills in legal drafting and conveyancing for judiciary, litigation, and corporate law aspirants.',
      importance:
        'Vital for real estate, litigation, corporate law, and judiciary preparation. Enhances legal clarity and precision.',
      duration: '6 Weeks',
      classesPerWeek: 4,
      totalClasses: 20,
      mode: 'Online (Live Classes)',
      assessmentDetails: `Theoretical exams, real-world drafting exercises, and case studies for a comprehensive evaluation.`,
      internshipDetails: `Top-performing students will be offered internships with reputed law firms or departments.`,
      price: 1000, // Add a default price or your desired value
      image: 'https://www.freepik.com/free-photos-vectors/professional-courses', // Add a default image URL or your desired value
      rating: 45, // Add a default rating or your desired value
      modules: {
        create: [
          {
            title: 'Introduction to Legal Drafting',
            lessons: [
              'Overview of Legal Drafting',
              'General Drafting Principles',
              'Legal Language & Terminologies',
            ],
            duration: '1 Week',
          },
          {
            title: 'Civil Pleadings',
            lessons: ['Suits for Recovery', 'Affidavits', 'Applications for Temporary Injunction'],
            duration: '2 Weeks',
          },
          {
            title: 'Matrimonial Pleadings',
            lessons: ['Divorce, Custody, Maintenance', 'Family Law Documents'],
            duration: '1 Week',
          },
          {
            title: 'Succession Act Drafting',
            lessons: ['Succession Pleadings', 'Wills & Codicils'],
            duration: '2 Weeks',
          },
          {
            title: 'Constitutional Law Pleadings',
            lessons: ['Constitutional Petitions & Writs', 'Fundamental Rights'],
            duration: '2 Weeks',
          },
          {
            title: 'Criminal Law Pleadings',
            lessons: ['FIRs, Complaints, Bail Applications', 'Criminal Petitions'],
            duration: '2 Weeks',
          },
          {
            title: 'Conveyancing: Sale, Lease, Mortgage',
            lessons: ['Sale Deed', 'Lease Deed', 'Mortgage Deed'],
            duration: '2 Weeks',
          },
          {
            title: 'Power of Attorney & Partnership',
            lessons: ['General & Special Power of Attorney', 'Partnership Agreements'],
            duration: '1 Week',
          },
          {
            title: 'Miscellaneous Deeds',
            lessons: ['Gift & Relinquishment Deeds', 'Dissolution of Partnership'],
            duration: '1 Week',
          },
          {
            title: 'Legal Notices',
            lessons: ['Legal Notices for Real Estate', 'Breach of Contract, Demand Notices'],
            duration: '1 Week',
          },
        ],
      },
    },
  });
  await prisma.course.create({
    data: {
      title: 'Course on RERA and Real Estate Law',
      instructor: {
        connect: { id: '6824bda55458f57cb8a56d06' },
      },
      description:
        'The Real Estate (Regulation and Development) Act, 2016 (RERA) has revolutionized the real estate sector in India, ensuring transparency, accountability, and protection of consumer interests.',
      importance:
        'Knowledge of RERA and related legal frameworks has become crucial for professionals, investors, and students in law and business. This course equips learners with a deep understanding of RERA’s legal, regulatory, and compliance aspects.',
      duration: '2 Months',
      classesPerWeek: 3,
      totalClasses: 25,
      mode: '100% online with live lectures and recorded sessions',
      assessmentDetails: `Weekly quizzes and assignments, case study-based evaluations, and a final assessment with MCQs and legal drafting.`,
      internshipDetails: `Top-performing students will get internships with reputed law and real estate firms.`,
      price: 1200,
      image: 'https://example.com/rera-course-image.jpg', // Replace with a real image URL
      rating: 48,

      modules: {
        create: [
          {
            title: 'Fundamentals of RERA',
            lessons: [
              'Origins and Development of RERA',
              'Significance and Objectives',
              'Legal Structure of RERA',
            ],
            duration: '1 Week',
          },
          {
            title: 'Real Estate Transactions and RERA\'s Impact',
            lessons: [
              'Transformation of Property Transactions',
              'Buyer Rights and Protections',
              'Dispute Resolution Mechanisms',
            ],
            duration: '1 Week',
          },
          {
            title: 'Regulatory Framework and Compliance',
            lessons: [
              'Roles of Regulatory Bodies',
              'Project and Agent Registration',
              'Consumer Rights Protection',
            ],
            duration: '1 Week',
          },
          {
            title: 'Legal Documentation and Compliance Measures',
            lessons: [
              'Drafting RERA-Compliant Documents',
              'Developer Responsibilities',
              'Legal Consequences of Non-Compliance',
            ],
            duration: '1 Week',
          },
          {
            title: 'Case Studies and Real-World Applications',
            lessons: [
              'Real-Life RERA Case Studies',
              'Compliance Guidelines',
              'Industry Best Practices',
            ],
            duration: '1 Week',
          },
          {
            title: 'Technology Integration in Real Estate & RERA',
            lessons: [
              'Digital Property Dealings',
              'Online Registration and Tracking',
              'AI and Blockchain in Enforcement',
            ],
            duration: '1 Week',
          },
          {
            title: 'Investment Strategies and Legal Aspects',
            lessons: [
              'Legalities in Real Estate Investment',
              'Real Estate Partnerships',
              'Tax and Financial Laws',
            ],
            duration: '1 Week',
          },
          {
            title: 'Future Prospects and Regulatory Challenges',
            lessons: [
              'Upcoming Regulatory Developments',
              'Compliance Challenges',
              'Strategies to Stay Updated',
            ],
            duration: '1 Week',
          },
        ],
      },
    },
  });
  console.log('✅ Course seeded');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
