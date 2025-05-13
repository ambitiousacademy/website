import prisma from "../lib/prisma";

async function main() {
    await prisma.course.create({
        data: {
            title: 'Certificate Course in Drafting and Conveyancing',
            instructor: 'Adv. Shagufta Reheman & Adv. Nitesh Dwivedi',
            description: 'Focuses on skills in legal drafting and conveyancing for judiciary, litigation, and corporate law aspirants.',
            importance: 'Vital for real estate, litigation, corporate law, and judiciary preparation. Enhances legal clarity and precision.',
            duration: '6 Weeks',
            classesPerWeek: 4,
            totalClasses: 20,
            mode: 'Online (Live Classes)',
            assessmentDetails: `Theoretical exams, real-world drafting exercises, and case studies for a comprehensive evaluation.`,
            internshipDetails: `Top-performing students will be offered internships with reputed law firms or departments.`,
            modules: {
                create: [
                    {
                        title: 'Introduction to Legal Drafting',
                        topics: [
                            'Overview of Legal Drafting',
                            'General Drafting Principles',
                            'Legal Language & Terminologies'
                        ]
                    },
                    {
                        title: 'Civil Pleadings',
                        topics: [
                            'Suits for Recovery',
                            'Affidavits',
                            'Applications for Temporary Injunction'
                        ]
                    },
                    {
                        title: 'Matrimonial Pleadings',
                        topics: [
                            'Divorce, Custody, Maintenance',
                            'Family Law Documents'
                        ]
                    },
                    {
                        title: 'Succession Act Drafting',
                        topics: [
                            'Succession Pleadings',
                            'Wills & Codicils'
                        ]
                    },
                    {
                        title: 'Constitutional Law Pleadings',
                        topics: [
                            'Constitutional Petitions & Writs',
                            'Fundamental Rights'
                        ]
                    },
                    {
                        title: 'Criminal Law Pleadings',
                        topics: [
                            'FIRs, Complaints, Bail Applications',
                            'Criminal Petitions'
                        ]
                    },
                    {
                        title: 'Conveyancing: Sale, Lease, Mortgage',
                        topics: [
                            'Sale Deed',
                            'Lease Deed',
                            'Mortgage Deed'
                        ]
                    },
                    {
                        title: 'Power of Attorney & Partnership',
                        topics: [
                            'General & Special Power of Attorney',
                            'Partnership Agreements'
                        ]
                    },
                    {
                        title: 'Miscellaneous Deeds',
                        topics: [
                            'Gift & Relinquishment Deeds',
                            'Dissolution of Partnership'
                        ]
                    },
                    {
                        title: 'Legal Notices',
                        topics: [
                            'Legal Notices for Real Estate',
                            'Breach of Contract, Demand Notices'
                        ]
                    }
                ]
            }
        }
    });

    console.log('✅ Course seeded');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
