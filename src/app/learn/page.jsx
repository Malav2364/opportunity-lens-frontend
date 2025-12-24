import { auth } from "@/auth"
import { dbConnect } from "@/lib/mongo";
import React from 'react'
import { Timeline } from "@/components/ui/timeline";
import { AvatarWithDropdown } from "@/components/ui/avatar-with-dropdown";
import { Header } from "@/components/header";
import Link from "next/link";
import BlurIn from "@/components/animTxt";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default async function page() {
    const session = await auth()
    
    if(!session?.user) redirect("/unauthorized")

    await dbConnect();
    const { User } = await import("@/model/user-model");
    const user = await User.findOne({ email: session.user.email }).lean();
    const userImage = session?.user?.image && session.user.image.trim() !== "" ? session.user.image : "/Avatar21.svg";

    const modules = user?.learningPath && user.learningPath.length > 0 ? user.learningPath : [];

    const data = modules.map((module, moduleIndex) => ({
        title: module.title,
        content: (
            <Card>
                <CardContent className="flex flex-col gap-4 pt-6">
                    {module.chapters && module.chapters.length > 0 && (
                        <Accordion type="single" collapsible className="w-full">
                            {module.chapters.map((chapter, chapterIndex) => (
                                <AccordionItem value={`item-${moduleIndex}-${chapterIndex}`} key={chapterIndex}>
                                    <AccordionTrigger>{chapter.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col gap-2 pl-4">
                                            {chapter.subTopics.map((subTopic, subTopicIndex) => (
                                                <Link
                                                    href={subTopic.demoLink || "#"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    key={subTopicIndex}
                                                    className={cn(buttonVariants({ variant: "link", className: "justify-start" }))}
                                                >
                                                    {subTopic.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </CardContent>
            </Card>
        )
    }));

  return (
    <div className="min-h-screen bg-background">
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 py-2">
            <Header userImage={userImage} />
            <main className="flex-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Learning Path</CardTitle>
                        <CardDescription>Complete the modules to unlock new quizzes and achievements.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timeline data={data} />
                    </CardContent>
                </Card>
            </main>
        </div>
    </div>
  )
}