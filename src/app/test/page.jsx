import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { TestPage } from '@/components/testpage'
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

export const metadata = {
    title: "Test",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function Page() {
    const session = await auth()

    if (!session?.user) {
        redirect('/unauthorized')
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).lean();
    const recentQuizzes = user?.quizzes
        ? user.quizzes
            .filter(q => q.completedAt)
            .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
            .slice(0, 5) // Limit to top 5 recent
        : [];

    return <TestPage
        userImage={session.user.image}
        userName={session.user.name}
        recentQuizzes={JSON.parse(JSON.stringify(recentQuizzes))}
    />
}
