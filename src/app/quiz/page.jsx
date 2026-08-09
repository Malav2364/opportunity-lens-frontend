import React from 'react'
import { QuizList } from '@/components/quiz-list'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getQuizzesForUser } from '@/queries/users'

export const metadata = {
  title: "Quizzes",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function page() {
  const session = await auth()
  if (!session?.user) {
    redirect('/unauthorized')
  }

  const quizzes = await getQuizzesForUser(session.user.email)
  const availableQuizzes = quizzes.filter((quiz) => !quiz.completedAt)

  return (
    <main className="container mx-auto px-4 py-10">
      <QuizList quizzes={JSON.parse(JSON.stringify(availableQuizzes))} />
    </main>
  )
}
