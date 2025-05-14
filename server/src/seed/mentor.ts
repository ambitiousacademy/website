import prisma from '../lib/prisma';
async function main() {
  // Seed data for Adv. Shashank Mishra
  const mentorData = [
    {
      profileImageUrl: 'https://media-hosting.imagekit.io/8d506c095f664436/Advocate Shashank Mishra.jpg?Expires=1841845544&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=cmaNGtcpF8t0gzDGOQDA0pToeLycKoPSEhO2K44mwLgsFjZPja379u7eYnb2Uv6Qe9p8btRikrRrO6RiDuWTWmph0ER332qpK5-ujIJ8Pn6E79UtQ36our3f7e3uJiem-aZuodkkcKATh4kMtJty3C5SQI~kWTaNgLjkP7ICcJJbWwx4Kh6Npuse8N5VFWHAUnrGjySetOVqF57nK~dOccv6J67RqmUKQEtYfzDdD017XSBBYrfbmg3UbKLnmFxYL7q0ChswJ3DSwngV3-pANvSSkMUTT0yCIsflOplUD1EVrSmLKuzIDkiGv38qtwkd5tNq-ZENyCxTnGwwkpElQg__',
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
        { title: 'Punjab National Bank', description: 'Panel Counsel' },
        { title: 'Worldstreet Sports Center Ltd.', description: 'Real Estate Client' },
        { title: 'Omaxe Heritage Pvt. Ltd.', description: 'Corporate Client' },
        { title: 'DCM Nouvelle Ltd.', description: 'Corporate Client' },
        { title: 'Hiptage Infrastructure Pvt. Ltd.', description: 'Real Estate Client' },
        { title: 'Platinum Multistate CGHS Ltd.', description: 'Real Estate Client' },
        { title: 'Z Axis Aggregators Pvt. Ltd.', description: 'Corporate Client' },
        { title: 'Navchetana International Education Pvt. Ltd.', description: 'Corporate Client' },
      ],
      education: [
        { degree: 'LL.B', institution: 'Rani Durgawati Vishwavidyalaya', duration: '2010-2014' },
        { degree: 'LL.M (Criminology)', institution: 'Rani Durgawati Vishwavidyalaya', duration: '2018-2020' },
      ],
      technicalSkills: ['Legal Research', 'Contract Drafting', 'Case Management'],
      languagesKnown: ['English', 'Hindi'],
    },
    {
      profileImageUrl: 'https://media-hosting.imagekit.io/c9c6f051c8de403d/Advocate Shagufta Rehman.jpg?Expires=1841845537&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DXUoHIJzoYetrp7o4Fv2zLljgQ7W-PP3gwOCRoypsxNvWt82N8nlAeWa7yjVRztNuu0pqoCKsJHwcn95NYIDRSCG6AuZOfudbWSRF-jATauonzYQXM0YMu-ZOYbILDJXDkzcZVGP5D~8iq-5ltyLuHgwTMgGuiJuIKIdhPAw5OFvD6tw1fG~FT4oWcF7uDeGVzX~N1ZofucBzlDI6Px-7mlz7SVhyPYhUFGNFOdEIunimQTERrMRFFWDJGRPHlf88oEiuUZssnEwzU9CxU8NzERE0uPEZE0qto7UQd7emJxEpDLRJTVMaLRfJ-cGFskDgmCHc8wglLR6iPoXQrQC9g__',
      name: 'Adv. Shagufta Rehman',
      profileSummary: 'Adv. Shagufta Rehman is a legal professional with over 9 years of experience in litigation, legal research, drafting, and corporate legal advisory.',
      about:
        'Advocate Shagufta Rehman is a legal professional with over 9 years of experience in litigation, legal research, drafting, and corporate legal advisory. She has expertise in problem-solving, document evaluation, legal auditing, and interpretation of laws.',
      areasOfPractice: [
        'Criminal Appeals & Bail Matters',
        'Electricity Act & Corporate Law',
        'Arbitration Law',
        'Contract Law',
        'Writ Petitions',
        'Drafting of Petitions, Appeals & Legal Documents',
        'Negotiable Instruments Act (Section 138 - Cheque Bounce Cases)',
        'Consumer Forum Disputes',
        'Framing Privacy Policies & Terms for Startups',
      ],
      courtsOfPractice: [
        'High Court of Madhya Pradesh, Jabalpur',
        'District Courts across 16 districts (Bhopal, Jabalpur regions)',
      ],
      experienceHighlights: [
        'Conducted legal research, identified relevant case laws, and assisted in drafting judgments as a Law Clerk at MP High Court.',
        'Drafted and litigated NHAI, NABARD, BHEL, and WRDA-related cases across various courts.',
        'Managed defamation cases and media law issues for Prathamik Media.',
      ],
      pastRoles: [
        {
          title: 'Law Clerk Cum Research Assistant – High Court of Madhya Pradesh',
          responsibilities: [
            'Conducted legal research, identified relevant case laws, and assisted in drafting judgments.',
            'Composed legal memos, reports, and case synopses.',
          ],
        },
        {
          title: 'Associate & Incharge of Branch – M.V. Kini & Co. Law Firm',
          responsibilities: [
            'Provides legal opinions to NHAI on land acquisition and contracts.',
            'Litigates cases across various courts for major public sector clients.',
          ],
        },
        {
          title: 'Head of Grievance Management – Prathamik Media',
          responsibilities: [
            'Handles defamation and customer grievance cases.',
            'Specializes in media laws and dispute resolution.',
          ],
        },
      ],
      keyClients: [
        { title: 'National Highway Authority of India (NHAI)', description: 'Land acquisition and contracts' },
        { title: 'NABARD', description: 'Public sector litigation' },
        { title: 'BHEL', description: 'Public sector litigation' },
        { title: 'WRDA', description: 'Water resource dispute matters' },
      ],
      education: [
        { degree: 'LL.M (Criminology)', institution: 'Rani Durgawati Vishwavidyalaya, Jabalpur', duration: '2018-2020' },
        { degree: 'LL.B', institution: 'Rani Durgawati Vishwavidyalaya, Jabalpur', duration: '2013-2016' },
        { degree: 'Company Secretary (Executive Qualified)', institution: 'ICSI', duration: '2014-2016' },
        { degree: 'MA (English Literature)', institution: 'Rani Durgawati Vishwavidyalaya, Jabalpur', duration: '2009-2012' },
        { degree: 'B.Com', institution: 'Rani Durgawati Vishwavidyalaya, Jabalpur', duration: '2008-2009' },
      ],
      technicalSkills: ['SCC Online', 'Manupatra', 'Microsoft Office'],
      languagesKnown: ['English', 'Hindi', 'Bengali'],
    },
  ];

  try {
    const result = await prisma.mentor.createMany({
      data: mentorData,
    });
    console.log('Mentors created:', result);
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
