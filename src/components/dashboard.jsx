"use client";

import { useState } from "react";
import { Header } from "./header"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Trophy, Activity, Target, Zap, CheckCircle2, ArrowUpRight, ArrowRight } from "lucide-react"
import { Leaderboard } from "./leaderboard";
import { OpportunityScout } from "./opportunity-scout";
import { AILearningBanner } from "./ai-learning-banner";
import { TopicMastery, YourGoals } from "./dashboard-sidebar-widgets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Dashboard({ user, session, availableQuizzes, recentQuizzes, achievements, totalQuizzes, leaderboardData }) {
    const userImage = session?.user?.image && session.user.image.trim() !== "" ? session.user.image : "/Avatar21.svg";
    const userName = user?.Username || session?.user?.name;
    const [activeTab, setActiveTab] = useState("available");

    const averageScore = recentQuizzes.length > 0 
        ? (recentQuizzes.reduce((acc, quiz) => acc + quiz.score, 0) / recentQuizzes.length).toFixed(0)
        : 0;

    const quizzesPassed = recentQuizzes.filter(q => q.score >= 50).length;
    const passingRate = recentQuizzes.length > 0
        ? ((quizzesPassed / recentQuizzes.length) * 100).toFixed(0)
        : 0;

    const activeChallenges = availableQuizzes.length;

    return (
        <div className="min-h-screen bg-[#F8F9FC] dark:bg-background text-slate-900 dark:text-slate-100 font-sans">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
                <Header userImage={userImage} />

                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                            Welcome back, {userName?.split(' ')[0]}! <span className="animate-wave">👋</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Here is your unified dashboard for data exploration.</p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">AVERAGE SCORE</p>
                                <h3 className="text-4xl font-bold text-slate-800 dark:text-slate-100">{averageScore}<span className="text-2xl text-slate-400">%</span></h3>
                                <div className="flex items-center gap-1 mt-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md w-fit">
                                    <ArrowUpRight className="w-3 h-3" />
                                    <span className="text-xs font-bold">+2.4% vs last week</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <BarChart className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ACTIVE CHALLENGES</p>
                                <h3 className="text-4xl font-bold text-slate-800 dark:text-slate-100">{activeChallenges}</h3>
                                <div className="flex items-center gap-1 mt-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md w-fit">
                                    <Zap className="w-3 h-3 fill-amber-600" />
                                    <span className="text-xs font-bold">2 due soon</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <Target className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">PASS RATE</p>
                                <h3 className="text-4xl font-bold text-slate-800 dark:text-slate-100">{passingRate}<span className="text-2xl text-slate-400">%</span></h3>
                                <div className="flex items-center gap-1 mt-2 text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-md w-fit">
                                    <Trophy className="w-3 h-3" />
                                    <span className="text-xs font-bold">Top 10%</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area (Left Column) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        <AILearningBanner recentQuizzes={recentQuizzes} />

                        {/* Challenges Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Choose Your Next Challenge</h2>
                                </div>
                                <div className="flex bg-white dark:bg-card p-1 rounded-lg border border-slate-200 dark:border-border">
                                    <button 
                                        onClick={() => setActiveTab("available")}
                                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === "available" ? "bg-slate-100 dark:bg-muted text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                    >
                                        Available Quizzes
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab("completed")}
                                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === "completed" ? "bg-slate-100 dark:bg-muted text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(activeTab === "available" ? availableQuizzes : recentQuizzes).slice(0, 4).map((quiz, idx) => (
                                    <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all group">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <Badge variant="secondary" className={`
                                                    ${quiz.difficulty === 'Hard' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                                                      quiz.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                                                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'} 
                                                    uppercase text-[10px] font-bold tracking-wider px-2 py-1 rounded-md
                                                `}>
                                                    {quiz.difficulty || "MEDIUM"}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                                                    <Activity className="w-3 h-3" />
                                                    <span>{quiz.questions?.length || 10} Qs</span>
                                                </div>
                                            </div>
                                            
                                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-1">
                                                {quiz.title || (quiz.skills && quiz.skills[0]) || "General Assessment"}
                                            </h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 h-10">
                                                Master the fundamentals of {quiz.skills ? quiz.skills.join(", ") : "this topic"}, including syntax, data structures, and algorithms.
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {(quiz.skills || []).slice(0, 2).map(skill => (
                                                    <span key={skill} className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 group-hover:translate-y-[-2px] transition-transform" asChild>
                                                <Link href={activeTab === "available" ? `/quiz/${quiz._id}` : "#"}>
                                                    {activeTab === "available" ? "Start Quiz" : "View Results"} <ArrowRight className="w-4 h-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                                {(activeTab === "available" ? availableQuizzes : recentQuizzes).length === 0 && (
                                    <div className="col-span-2 text-center py-12 text-slate-400 bg-white dark:bg-card rounded-xl border border-dashed border-slate-200 dark:border-border">
                                        <p>No quizzes found in this category.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Opportunity Scout */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Opportunity Scout</h2>
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Live Feed</Badge>
                                </div>
                                <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                                    View All <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                            </div>
                            <OpportunityScout recentQuizzes={recentQuizzes} />
                        </div>

                    </div>

                    {/* Sidebar (Right Column) */}
                    <div className="lg:col-span-1 space-y-6">
                        <TopicMastery recentQuizzes={recentQuizzes} />
                        
                        <YourGoals initialGoals={user.goals || []} />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-amber-500" />
                                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Leaderboard</h3>
                                </div>
                                <Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-700">See All</Link>
                            </div>
                            <Leaderboard data={leaderboardData} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-4 h-4 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                    <Trophy className="w-3 h-3" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Achievements</h3>
                            </div>
                            <Card className="border-none shadow-sm">
                                <CardContent className="p-6">
                                    <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                            <Trophy className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Unlock your first badge</h4>
                                        <p className="text-xs text-slate-400 mt-1 px-4">Score 80%+ on your next quiz to earn the "High Flyer" badge!</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}