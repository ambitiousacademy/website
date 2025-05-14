import prisma from '../lib/prisma';
async function main() {
  // Seed data for Adv. Shashank Mishra
  const mentorData = {
    profileImageUrl: 'https://example.com/image.jpg',
    name: 'Adv. Shashank Mishra',
    profileSummary:
      'Advocate Shashank Mishra is a legal consultant and practicing advocate with over 8 years of professional experience. His practice is result-oriented, focusing on ethical and professional legal consultancy and advisory services.',
    about:
      'Advocate Shashank Mishra is a legal consultant and practicing advocate with over 8 years of professional experience. His practice is result-oriented, focusing on ethical and professional legal consultancy and advisory services.',
    areasOfPractice: [
      'Real Estate (RERA matters, project registration, homebuyer complaints)',
      'Litigation & Arbitration',
      'Corporate & Commercial Laws',
      'Banking & Insurance Laws',
      'Employment & Service Laws',
      'Civil & Criminal Laws',
      'Family Law',
    ],
    courtsOfPractice: [
      'Supreme Court of India',
      'Delhi High Court',
      'Allahabad High Court',
      'RERA & Appellate Tribunal',
      'National Consumer Disputes Redressal Commission (NCDRC)',
      'National Company Law Tribunal (NCLT)',
      'District & Sessions Courts',
    ],
    experienceHighlights: [
      'Successfully represented M/s. Best View Infracon Ltd. (SPV of ELDECO), Urbtech Food & Hospitality Pvt. Ltd., Klick India Reality Associates Pvt. Ltd., Ravi Shankar CGHS Ltd. before Delhi RERA.',
      'Represented Worldstreet Sports Center Ltd., Omaxe Heritage Pvt. Ltd., DCM Nouvelle Ltd. in RERA-related matters.',
      'Extensive experience in handling legal cases before Supreme Court, High Courts, and Tribunals.',
    ],
    pastRoles: [
      {
        title: 'Legal Consultant',
        responsibilities: [
          'Examined applications for real estate project registration.',
          'Provided legal opinions and assisted in hearings.',
        ],
      },
    ],
    keyClients: [
      {
        title: 'Punjab National Bank',
        description: 'Panel Counsel',
      },
      {
        title: 'Worldstreet Sports Center Ltd.',
        description: 'Real Estate Client',
      },
      {
        title: 'Omaxe Heritage Pvt. Ltd.',
        description: 'Corporate Client',
      },
      {
        title: 'DCM Nouvelle Ltd.',
        description: 'Corporate Client',
      },
      {
        title: 'Hiptage Infrastructure Pvt. Ltd.',
        description: 'Real Estate Client',
      },
      {
        title: 'Platinum Multistate CGHS Ltd.',
        description: 'Real Estate Client',
      },
      {
        title: 'Z Axis Aggregators Pvt. Ltd.',
        description: 'Corporate Client',
      },
      {
        title: 'Navchetana International Education Pvt. Ltd.',
        description: 'Corporate Client',
      },
    ],
    education: [
      {
        degree: 'LL.B',
        institution: 'Rani Durgawati Vishwavidyalaya',
        duration: '2010-2014',
      },
      {
        degree: 'LL.M (Criminology)',
        institution: 'Rani Durgawati Vishwavidyalaya',
        duration: '2018-2020',
      },
    ],
    technicalSkills: ['Legal Research', 'Contract Drafting', 'Case Management'],
    languagesKnown: ['English', 'Hindi'],
  };

  try {
    const mentor = await prisma.mentor.create({
      data: mentorData,
    });
    console.log('Mentor created:', mentor);
  } catch (error) {
    console.error('Error creating mentor:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
