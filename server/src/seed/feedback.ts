import prisma from '../lib/prisma';

async function main() {
  const feedbacks = [
    {
      emailAddress: 'khushirathore286@gmail.com',
      name: 'Khushi Rathore',
      email: 'khushirathore286@gmail.com',
      contactNumber: '9755454052',
      feedbackText: 'It was really valuable and insightful session.',
      panelDiscussionRating: 3,
      feedbackFor: 'Extended Event',
      collegeAndCourse: 'Indore Institute of Law',
      timestamp: new Date(),
    },
    {
      emailAddress: 'gaurangiprof23@gmail.com',
      name: 'Gaurangi Saxena',
      email: 'gaurangiprof23@gmail.com',
      contactNumber: '8209131072',
      feedbackText: 'I had great learning and lessons through it, great initiative',
      panelDiscussionRating: 4,
      feedbackFor: 'Extended Event',
      collegeAndCourse: 'Indore Institute of Law',
      timestamp: new Date(),
    },
    {
      emailAddress: 'robertamy31@gmail.com',
      name: 'Amy Evangeline Robert',
      email: 'robertamy31@gmail.com',
      contactNumber: '8269208400',
      feedbackText: 'Really great initiative',
      panelDiscussionRating: 5,
      feedbackFor: 'Extended Event',
      collegeAndCourse: 'St. Aloysius Institute of Technology Law, Jabalpur (MP)',
      timestamp: new Date(),
    },
    {
      emailAddress: 'kanchanchouhan184@gmail.com',
      name: 'Kanchan Chouhan',
      email: 'kanchanchouhan184@gmail.com',
      contactNumber: '9753689021',
      feedbackText: 'It was good journey.',
      panelDiscussionRating: 4,
      feedbackFor: 'Extended Event',
      collegeAndCourse: 'Acropolis Institute of Law, Indore',
      timestamp: new Date(),
    },
    {
      emailAddress: 'priyanshuroy2564@gmail.com',
      name: 'Priyanshu Roy Choudhury',
      email: 'priyanshuroy2564@gmail.com',
      contactNumber: '06268437556',
      feedbackText:
        'I appreciate the ambitious academy for organising insightful series of events. It was truly a valuable opportunity.',
      panelDiscussionRating: 4,
      feedbackFor: 'Extended Event',
      collegeAndCourse: 'Indore Institute of Law',
      timestamp: new Date(),
    },
    {
      emailAddress: 'asmitasingh1804@gmail.com',
      name: 'Asmita Singh',
      email: 'asmitasingh1804@gmail.com',
      contactNumber: '7828552052',
      feedbackText:
        'The academy arrenged session really very well . All the session were nice and informative.',
      panelDiscussionRating: 5,
      feedbackFor: 'Extended Event',
      collegeAndCourse: 'Indore Institute of Law',
      timestamp: new Date(),
    },
    {
      emailAddress: 'jatandeepsingh091@gmail.com',
      name: 'Jatan Deep Singh',
      email: 'jatandeepsingh091@gmail.com',
      contactNumber: '9555872290',
      feedbackText:
        'Well organised sessions and very useful for 1 and 2 year students and also for me to know about the fields of law that whether I choose to go whether in judiciary or in litigation...',
      panelDiscussionRating: 5,
      feedbackFor: 'Extended Event',
      collegeAndCourse: 'Indore Institute of Law',
      timestamp: new Date(),
    },
    {
      emailAddress: 'muskansharma.lm19@gmail.com',
      name: 'Muskan Sharma',
      email: 'muskansharma.lm19@gmail.com',
      contactNumber: '7389562051',
      feedbackText: 'Excellent',
      panelDiscussionRating: 5,
      feedbackFor: 'Extended Event',
      collegeAndCourse: 'Indore Institute of Law',
      timestamp: new Date(),
    },
  ];

  for (const feedback of feedbacks) {
    await prisma.feedback.create({ data: feedback });
  }

  console.log('✅ Seeded 5 feedback entries');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding feedback:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
