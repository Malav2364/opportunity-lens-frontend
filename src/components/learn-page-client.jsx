"use client";

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { dbConnect } from "@/lib/mongo";
import React, { useState, useMemo } from 'react'
import { Timeline } from "@/components/ui/timeline";
import { AvatarWithDropdown } from "@/components/ui/avatar-with-dropdown";
import { Header } from "./header";
import Link from "next/link";
import BlurIn from "@/components/animTxt";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toggleModuleCompletion } from "@/app/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function LearnPageClient({ initialModules, userImage }) {
    const [modules, setModules] = useState(initialModules);

    const handleModuleCompletion = async (moduleTitle, completed) => {
        const originalModules = [...modules];
        
        // Optimistically update UI
        const updatedModules = modules.map(m => 
            m.title === moduleTitle ? { ...m, completed } : m
        );
        setModules(updatedModules);

        const result = await toggleModuleCompletion(moduleTitle, completed);

        if (result?.error) {
            toast.error("Failed to update progress. Please try again.");
            // Revert to original state on failure
            setModules(originalModules);
        } else {
            toast.success(`Module marked as ${completed ? 'complete' : 'incomplete'}.`);
        }
    };

    const completedCount = useMemo(() => modules.filter(m => m.completed).length, [modules]);
    const totalModules = modules.length;
    const progressPercentage = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

    const data = modules.map((module, moduleIndex) => ({
        title: (
            <div className="flex items-center justify-between w-full">
                <span>{module.title}</span>
                <div className="flex items-center gap-2 pr-4">
                    <Checkbox
                        id={`module-checkbox-${moduleIndex}`}
                        checked={module.completed}
                        onCheckedChange={(checked) => handleModuleCompletion(module.title, checked)}
                    />
                    <label htmlFor={`module-checkbox-${moduleIndex}`} className="text-sm font-medium leading-none">
                        Done
                    </label>
                </div>
            </div>
        ),
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
                            <CardDescription>Track your progress and complete modules to master new skills.</CardDescription>
                            <div className="pt-4">
                                <Progress value={progressPercentage} className="w-full" />
                                <p className="text-sm text-muted-foreground mt-2 text-center">{completedCount} of {totalModules} modules completed ({Math.round(progressPercentage)}%)</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {modules.length > 0 ? (
                                <Timeline data={data} />
                            ) : (
                                <div className="text-center py-12">
                                    <h3 className="text-xl font-semibold">No Learning Path Found</h3>
                                    <p className="text-muted-foreground mt-2">Go to the assessment page to generate a new personalized learning path.</p>
                                    <Button asChild className="mt-4">
                                        <Link href="/test">Generate Path</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
