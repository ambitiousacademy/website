import prisma from '../lib/prisma';

async function main() {
  await prisma.course.create({
    data: {
      title: 'Certificate Course in Drafting and Conveyancing',
      instructor: 'Adv. Shagufta Reheman & Adv. Nitesh Dwivedi',
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
      price: 0, // Add a default price or your desired value
      image: '', // Add a default image URL or your desired value
      rating: 0, // Add a default rating or your desired value
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

  console.log('✅ Course seeded');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
