import { auth } from "@/auth"
import { dbConnect } from "@/lib/mongo";
import React from 'react'
import { SkillTree } from "@/components/skill-tree";
import { Header } from "@/components/header";
import { User } from "@/model/user-model";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function page() {
    const session = await auth()

    if (!session?.user) redirect("/unauthorized")

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).lean();
    const userImage = session?.user?.image && session.user.image.trim() !== "" ? session.user.image : "/Avatar21.svg";

    // Ensure we have a valid array
    const modules = user?.learningPath && Array.isArray(user.learningPath) ? user.learningPath : [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background">
            <div className="max-w-[1600px] mx-auto px-2 sm:px-4 py-2">
                <Header userImage={userImage} />
                <main className="flex-1 py-8">
                    <div className="text-center mb-12 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 pb-2 leading-tight">
                            Your Learning Adventure
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                            Master each skill node to progress. Unlock new chapters and earn badges as you grow your expertise.
                        </p>
                    </div>

                    {modules.length > 0 ? (
                        <SkillTree modules={JSON.parse(JSON.stringify(modules))} />
                    ) : (
                        <Card className="max-w-md mx-auto text-center p-8">
                            <CardHeader>
                                <CardTitle>No Learning Path Yet</CardTitle>
                                <CardDescription>Take a quiz or request a personalized path to start your journey!</CardDescription>
                            </CardHeader>
                        </Card>
                    )}
                </main>
            </div>
        </div>
    )
}
