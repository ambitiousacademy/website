import prisma from "../lib/prisma";

async function main() {
    const feedbacks = [
        {
            emailAddress: 'john.doe@example.com',
            name: 'John Doe',
            email: 'john.doe@example.com',
            contactNumber: '9876543210',
            panelDiscussionFeedback: 'Very insightful discussion, learned a lot about legal tech.',
            panelDiscussionRating: 5,
            feedbackFor: 'Panel Discussion',
            collegeAndCourse: 'NALSAR University - B.A. LL.B.',
        },
        {
            emailAddress: 'jane.smith@example.com',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            contactNumber: '9123456780',
            panelDiscussionFeedback: 'Good panel, but would love more practical examples.',
            panelDiscussionRating: 4,
            feedbackFor: 'Panel Discussion',
            collegeAndCourse: 'Symbiosis Law School - BBA LL.B.',
        },
        {
            emailAddress: 'alice.wonder@example.com',
            name: 'Alice Wonder',
            email: 'alice.wonder@example.com',
            contactNumber: '9988776655',
            panelDiscussionFeedback: 'Excellent discussion with clear takeaways.',
            panelDiscussionRating: 5,
            feedbackFor: 'Panel Discussion',
            collegeAndCourse: 'Jindal Global Law School - LL.M.',
        },
        {
            emailAddress: 'bob.marley@example.com',
            name: 'Bob Marley',
            email: 'bob.marley@example.com',
            contactNumber: '9000012345',
            panelDiscussionFeedback: 'Informative, but could be more interactive.',
            panelDiscussionRating: 3,
            feedbackFor: 'Panel Discussion',
            collegeAndCourse: 'ILS Law College - BSL LL.B.',
        },
        {
            emailAddress: 'charlie.brown@example.com',
            name: 'Charlie Brown',
            email: 'charlie.brown@example.com',
            contactNumber: '9765432109',
            panelDiscussionFeedback: 'Loved the panelists and the depth of the discussion!',
            panelDiscussionRating: 5,
            feedbackFor: 'Panel Discussion',
            collegeAndCourse: 'Faculty of Law, DU - LL.B.',
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
