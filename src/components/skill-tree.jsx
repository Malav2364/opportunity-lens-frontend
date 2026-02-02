"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Star, BookOpen, ChevronRight, PlayCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toggleModuleCompletion } from "@/app/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SkillTree({ modules }) {
    // Determine the status of each module (locked, active, completed)
    // For now, assuming sequential: 
    // Module 0 is unlocked. Module N is unlocked if Module N-1 is completed.
    // If a module has "completed: true" in data, it's completed.
    // If not, it's active if it's the first uncompleted one.
    // Subsequent ones are locked.

    // Since structured data might not have 'completed' flag on root modules properly populated in all cases 
    // (the prompt example had it, but let's be robust), we might need logic.
    // For this UI, we'll trust the data or default to first being active.

    return (
        <div className="relative w-full max-w-5xl mx-auto py-12 px-4">
            {/* Central Spine */}
            <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12 md:space-y-24">
                {modules.map((module, index) => {
                    const isCompleted = module.completed;
                    const isActive = !isCompleted && (index === 0 || modules[index - 1].completed);
                    // If everything before is completed, this is the active one.

                    return (
                        <SkillNode
                            key={index}
                            module={module}
                            index={index}
                            status={isCompleted ? "completed" : isActive ? "active" : "locked"}
                        />
                    );
                })}
            </div>

            <div className="mt-12 text-center">
                <p className="text-slate-400 text-sm">Keep learning to unlock more branches!</p>
            </div>
        </div>
    );
}

function SkillNode({ module, index, status }) {
    const isLeft = index % 2 === 0;

    return (
        <div className={cn(
            "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
            isLeft ? "md:flex-row" : "md:flex-row-reverse"
        )}>
            {/* Node Connector Line (Desktop) */}
            <div className={cn(
                "absolute top-1/2 h-1 bg-slate-200 dark:bg-slate-800 hidden md:block w-1/2",
                isLeft ? "right-1/2" : "left-1/2",
                "z-0"
            )} />

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4 z-10">
                {/* For left nodes, content is on left, so justify-end relative to half-width container pushes it to center? 
                    Wait.
                    If flex-row (Left Node):
                    [Content] [Center] [Empty]
                    We want content on Left side.
                    Container is row.
                    Item 1: Content (w-1/2)
                    Item 2: Center Node (absolute?) -> No, easier to make 3 columns or flex items.
                 */}

                {/* Let's try a different structure for alignment */}
                <ModuleCard module={module} status={status} align={isLeft ? "right" : "left"} />
            </div>

            {/* Center Node Icon */}
            <div className="relative z-20 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className={cn(
                        "w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg transition-colors duration-500 bg-background",
                        status === "completed" ? "border-green-500 text-green-500 shadow-green-500/20" :
                            status === "active" ? "border-blue-500 text-blue-500 shadow-blue-500/30 animate-pulse" :
                                "border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-700"
                    )}
                >
                    {status === "completed" ? <Check className="w-8 h-8 stroke-[3]" /> :
                        status === "active" ? <Star className="w-8 h-8 fill-current" /> :
                            <Lock className="w-6 h-6" />}
                </motion.div>
            </div>

            {/* Mirror Side (Empty for balancing) */}
            <div className="w-full md:w-1/2 hidden md:block" />
        </div>
    );
}

function ModuleCard({ module, status, align }) {
    const [expanded, setExpanded] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const isLocked = status === "locked";

    const handleComplete = async () => {
        startTransition(async () => {
            try {
                const result = await toggleModuleCompletion(module.title, true);
                if (result.success) {
                    toast.success("Module completed! Next branch unlocked.");
                    router.refresh();
                } else {
                    toast.error("Failed to update module status.");
                }
            } catch (e) {
                toast.error("Something went wrong.");
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
                "w-full max-w-md",
                align === "right" ? "md:text-right md:items-end" : "md:text-left md:items-start"
            )}
        >
            <Card className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4",
                isLocked ? "bg-slate-50 dark:bg-slate-900/50 grayscale opacity-80" : "bg-white dark:bg-card hover:-translate-y-1",
                status === "completed" ? "border-t-green-500" :
                    status === "active" ? "border-t-blue-500" :
                        "border-t-slate-300 dark:border-t-slate-700"
            )}>
                <CardContent className="p-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <Badge variant={isLocked ? "outline" : "default"} className={cn(
                                "mb-1 w-fit",
                                status === "completed" ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400" :
                                    status === "active" ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400" :
                                        ""
                            )}>
                                {status.toUpperCase()}
                            </Badge>
                            {/* Mobile Toggle for details */}
                            <button onClick={() => !isLocked && setExpanded(!expanded)} className="md:hidden">
                                <ChevronRight className={cn("transition-transform", expanded ? "rotate-90" : "")} />
                            </button>
                        </div>

                        <h3 className="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            {module.title}
                        </h3>

                        {/* Chapters Preview */}
                        <div className={cn("space-y-3 mt-2", isLocked ? "blur-[2px] select-none" : "")}>
                            {module.chapters && module.chapters.map((chapter, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-muted/50 rounded-lg p-3 text-left">
                                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-200 mb-2">
                                        <BookOpen className="w-4 h-4 text-blue-500" />
                                        {chapter.title}
                                    </div>
                                    <div className="flex flex-wrap gap-2 pl-6">
                                        {chapter.subTopics.slice(0, 3).map((sub, j) => (
                                            <Link
                                                key={j}
                                                href={isLocked ? "#" : sub.demoLink || "#"}
                                                target={isLocked ? "_self" : "_blank"}
                                                className={cn(
                                                    "text-xs px-2 py-1 rounded border bg-white dark:bg-background transition-colors flex items-center gap-1",
                                                    isLocked ? "cursor-not-allowed text-slate-400" : "hover:border-blue-400 hover:text-blue-600 text-slate-600 dark:text-slate-400"
                                                )}
                                            >
                                                {!isLocked && <PlayCircle className="w-3 h-3" />}
                                                {sub.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Complete Button for Active Modules */}
                        {status === "active" && (
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <Button
                                    onClick={handleComplete}
                                    disabled={isPending}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Completing...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4 mr-2" />
                                            Mark Module as Complete
                                        </>
                                    )}
                                </Button>
                                <p className="text-[10px] text-center text-slate-400 mt-2">
                                    Click this after you have finished all topics to unlock the next module.
                                </p>
                            </div>
                        )}

                        {/* Completed Status Message */}
                        {status === "completed" && (
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-center gap-2 text-green-600 font-medium text-sm">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Module Completed!
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

// Icon component needed for completed state
function CheckCircle2({ className }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
