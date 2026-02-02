"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { AvatarWithDropdown } from "./ui/avatar-with-dropdown"
import { Header } from "./header"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import BlurIn from "./animTxt"
import StaggeredFade from "./an3"
import ShinyButton from "@/components/ui/shinyButton"
import Image from "next/image"
import Link from "next/link"
import { MultiSelect } from './ui/multi-select'
import { toast } from "sonner";
import { Checkbox } from './ui/checkbox'
import { generatePersonalizedCourse } from '@/app/actions';
import { Calendar, History } from "lucide-react"

export function TestPage({ userImage, userName, recentQuizzes = [] }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [isDegreeTest, setIsDegreeTest] = useState(false);
    const [countdown, setCountdown] = useState(120);
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    // Effect for the countdown timer
    useEffect(() => {
        let timer;
        if (isLoading && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (isLoading && countdown === 0) {
            // Timer ran out, but we're still loading. Extend the timer.
            setCountdown(60);
        }
        return () => clearInterval(timer);
    }, [isLoading, countdown]);

    // Effect to save quiz if user leaves the page
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (generatedQuiz && !isSaved) {
                const difficultyMap = ["Easy", "Medium", "Hard"];
                const quizData = {
                    skills: isDegreeTest ? [selectedItems.join(', ')] : selectedItems,
                    difficulty: difficultyMap[selectedLevel],
                    questions: generatedQuiz.mcqs,
                    topic_counts: generatedQuiz.topic_counts,
                };
                const blob = new Blob([JSON.stringify({ quizData })], { type: 'application/json; charset=UTF-8' });
                navigator.sendBeacon('/api/save-quiz', blob);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [generatedQuiz, isSaved, selectedItems, selectedLevel, isDegreeTest]);


    const saveQuiz = async (quizResult) => {
        const difficultyMap = ["Easy", "Medium", "Hard"];
        const quizData = {
            skills: isDegreeTest ? [selectedItems.join(', ')] : selectedItems,
            difficulty: difficultyMap[selectedLevel],
            questions: quizResult.mcqs,
            topic_counts: quizResult.topic_counts,
        };

        try {
            const saveResponse = await fetch('/api/save-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quizData }),
            });

            if (!saveResponse.ok) {
                throw new Error('Failed to save the quiz.');
            }

            setIsSaved(true);
            toast.success("Assessment generated and saved successfully!");
            router.push('/dashboard');

        } catch (saveError) {
            console.error("Failed to save quiz:", saveError);
            toast.error(`Assessment generated but failed to save: ${saveError.message}`);
        }
    };

    const handleStartAssessment = async () => {
        if (selectedItems.length === 0) {
            toast.warning(`Please select at least one ${isDegreeTest ? 'degree' : 'subject'}.`);
            return;
        }

        setIsLoading(true);
        setCountdown(120); // Reset countdown
        setGeneratedQuiz(null);
        setIsSaved(false);

        const difficultyMap = ["Easy", "Medium", "Hard"];
        const payload = {
            skills: isDegreeTest ? [selectedItems.join(', ')] : selectedItems,
            difficulty: difficultyMap[selectedLevel],
            num_mcqs: 10,
            for_career_clarity: isDegreeTest,
        };

        console.log("Sending payload to API:", JSON.stringify(payload, null, 2));

        try {
            const response = await fetch('https://ayush472-opportunity-t5-model.hf.space/generate-mcq/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            console.log("API Response:", result);
            setGeneratedQuiz(result);
            await saveQuiz(result);

        } catch (error) {
            console.error("API Error:", error);
            toast.error(`An error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateCourse = async () => {
        if (selectedItems.length === 0) {
            toast.warning(`Please select at least one subject.`);
            return;
        }
        if (isDegreeTest) {
            toast.info("Course generation is available for topics, not degrees.");
            return;
        }

        toast.info("Generating your personalized learning path... This may take a moment.");

        try {
            const result = await generatePersonalizedCourse(selectedItems);
            if (result?.success) {
                toast.success("Learning path created! You can view it on the Learn page.");
                router.push('/learn');
            } else {
                throw new Error(result?.error || "An unknown error occurred.");
            }
        } catch (error) {
            console.error("Failed to generate course:", error);
            toast.error(`Failed to create learning path: ${error.message}`);
        }
    };

    const handleTestTypeChange = (checked) => {
        setIsDegreeTest(checked);
        setSelectedItems([]); // Reset selections when changing test type
    };

    const finalUserImage = userImage && userImage.trim() !== "" ? userImage : "/Avatar21.svg";

    const subjects = [
        "programming in C", "programming in C++", "programming in Java", "programming in Python", "programming in JavaScript", "HTML", "CSS", "React", "Angular", "Node.js", "data structures - arrays", "data structures - linked lists", "data structures - stacks", "data structures - queues", "data structures - trees", "data structures - graphs", "algorithms - sorting",
        "algorithms - searching", "algorithms - graph algorithms", "operating systems - process management", "operating systems - memory management", "database management - SQL", "database management - NoSQL", "database management - MongoDB", "database management - PostgreSQL", "database management - MySQL", "software development lifecycle",
        "version control - Git", "debugging techniques", "unit testing", "integration testing", "web technologies", "mobile app development - Android", "mobile app development - iOS", "mobile app development - Flutter", "mobile app development - Swift", "mobile app development - Kotlin", "cloud computing - AWS", "cloud computing - Azure", "cloud computing - Google Cloud",
        "machine learning - supervised learning", "machine learning - unsupervised learning", "deep learning", "neural networks", "natural language processing", "computer vision", "transformers", "cybersecurity principles", "penetration testing", "ethical hacking", "DevOps practices", "Agile methodology", "Scrum", "Kanban", "containerization - Docker", "containerization - Kubernetes",
        "RESTful APIs", "microservices architecture", "blockchain basics", "smart contracts - Solidity", "systems programming", "embedded systems programming", "functional programming", "concurrency", "parallel programming", "big data technologies - Hadoop", "big data technologies - Spark", "data visualization - Tableau", "data visualization - Power BI", "data visualization - Matplotlib",
        "data visualization - Seaborn", "data visualization - D3.js", "computer graphics", "distributed systems", "communication skills", "teamwork", "project management", "engineering mechanics", "thermodynamics", "fluid mechanics", "heat transfer", "materials science", "machine design", "manufacturing processes", "control systems", "robotics", "CAD software - SolidWorks",
        "CAD software - AutoCAD", "CAD software - CATIA", "CAM technologies", "finite element analysis - FEA", "vibration analysis", "hydraulics", "pneumatics", "automation and control", "electric vehicles technology", "renewable energy systems", "AI in manufacturing", "prototyping", "3D printing", "machining and fabrication", "maintenance engineering", "quality control",
        "structural analysis", "concrete and steel design", "surveying techniques", "soil mechanics", "geotechnical engineering", "construction management", "transportation engineering", "water resources engineering", "environmental engineering", "building information modeling - BIM", "project scheduling", "cost estimation", "safety management", "sustainable construction practices",
        "urban planning", "site engineering", "quantity surveying", "road and highway design", "analog electronics", "digital electronics", "signals and systems", "communication theory", "microprocessors", "microcontrollers", "VLSI design", "wireless communication", "antenna design", "circuit simulation - MATLAB", "circuit simulation - Multisim", "FPGA programming - Verilog",
        "FPGA programming - VHDL", "Internet Of Things", "Embedded Systems", "Embedded Devices", "PCB design", "telecommunications protocols", "network security", "signal processing", "assembly language programming", "circuit design", "electrical machines", "power systems", "power electronics", "instrumentation", "PLC programming", "SCADA systems", "MATLAB/Simulink", "automation systems", "smart grids",
        "fault diagnosis", "energy management", "Bash scripting", "PowerShell scripting", "UI/UX design", "data analytics", "chemical process design", "reaction engineering", "process control", "HAZOP analysis", "Aspen Plus", "HYSYS", "biochemical engineering", "polymer science", "nanotechnology basics", "aerodynamics", "flight mechanics", "propulsion systems", "avionics",
        "computational fluid dynamics - CFD", "navigation systems", "propulsion testing", "AI for aerospace", "biomedical instrumentation", "medical imaging technologies", "biomechanics", "clinical engineering", "prosthetics design", "medical device regulatory compliance", "tissue engineering", "biochemistry", "microbiology", "biotechnology processes", "environmental monitoring",
        "food technology", "home science", "agricultural engineering", "soil science", "crop management", "pest control", "farm mechanization", "architecture design principles", "sustainability in architecture", "criminal law", "civil law", "international law", "public administration", "political theory", "sociology", "anthropology", "cognitive psychology", "clinical psychology", "developmental psychology", "microeconomics",
        "macroeconomics", "econometrics", "statistical analysis - SPSS", "statistical analysis - R", "statistical analysis - Stata", "strategic management", "digital marketing", "business analytics", "entrepreneurship", "finance", "taxation", "banking", "human resource management", "marketing research", "journalism", "content creation", "media studies"

    ];

    const degrees = [
        "bachelor's of technology in computer science", "bachelor's of technology in mechanical engineering", "bachelor's of technology in civil engineering", "bachelor's of technology in electronics and communication", "bachelor's of technology in electrical engineering", "bachelor's of technology in information technology",
        "bachelor's of technology in chemical engineering", "bachelor's of technology in aerospace engineering", "bachelor's of technology in artificial intelligence and data science", "bachelor's of technology in biomedical engineering", "bachelor's of arts in english literature", "bachelor's of arts in political science",
        "bachelor's of arts in economics", "bachelor's of arts in psychology", "bachelor's of arts in history", "bachelor's of arts in sociology", "bachelor's of arts in philosophy", "bachelor's of arts in journalism and mass communication", "bachelor's of arts in anthropology", "bachelor's of arts in fine arts", "bachelor's of science in physics",
        "bachelor's of science in chemistry", "bachelor's of science in mathematics", "bachelor's of science in biotechnology", "bachelor's of science in microbiology", "bachelor's of science in environmental science", "bachelor's of science in computer science", "bachelor's of science in zoology", "bachelor's of science in botany", "bachelor's of science in statistics",
        "bachelor's of commerce in accounting and finance", "bachelor's of commerce in banking and insurance", "bachelor's of commerce in economics", "bachelor's of commerce in taxation", "bachelor's of commerce in business administration", "bachelor's of commerce in marketing and advertising", "bachelor's of commerce in human resource management",
        "bachelor's of commerce in international business", "bachelor's of commerce in cost and management accounting", "bachelor of business administration in finance", "bachelor of business administration in human resource management", "bachelor of business administration in marketing", "bachelor of business administration in entrepreneurship",
        "bachelor of management studies in strategic management", "bachelor of business studies in international business", "bachelor of business administration in hospitality management", "bachelor of management studies in operations and analytics", "bachelor of business administration in digital marketing", "bachelor of management studies in business analytics",
        "bachelor of law in civil law", "bachelor of law in criminal law", "bachelor of law in international law", "bachelor of law in labour law", "bachelor of medicine and bachelor of surgery (MBBS)", "bachelor of pharmacy general", "bachelor of pharmacy honours", "bachelor's of pharmacy in pharmaceutical chemistry", "bachelor's of pharmacy in pharmacology",
        "bachelor's of pharmacy in pharmaceutical biotechnology", "bachelor's of pharmacy in pharmaceutical analysis", "bachelor's of pharmacy in clinical pharmacy", "bachelor of architecture", "bachelor of agriculture", "bachelor of ayurvedic medicine and surgery (BAMS)", "bachelor of science in software engineering", "bachelor's of technology in cyber physical systems",
        "bachelor's of science in environmental engineering", "bachelor's of arts in multimedia and mass communication", "bachelor's of science in biomedical science", "bachelor's of science in food technology", "bachelor's of science in instrumentation", "bachelor's of science in polymer science", "bachelor's of science in food technology", "bachelor's of science in home science",
        "bachelor of elementary education", "bachelor of science in biochemistry", "bachelor's of technology in medical coding", "bachelor's of technology in musopathy"
    ];

    const proficiencyLevels = ["Easy", "Medium", "Hard"];
    const currentOptions = isDegreeTest ? degrees : subjects;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background flex flex-col">
            <div className="m-2 p-1 flex flex-col">
                <Header userImage={finalUserImage} />
            </div>

            <div className="w-full flex flex-row flex-wrap items-center justify-center gap-2 py-6">
                <BlurIn className="md:text-[35px] font-extrabold text-center text-slate-900 dark:text-slate-100">Assessment Center</BlurIn>
                {userName && <StaggeredFade text={userName} className="md:text-[35px] text-blue-600 dark:text-blue-400 font-extrabold text-center" />}
            </div>

            <main className="flex-grow flex flex-col items-center p-4">
                <div className="w-full max-w-7xl space-y-12">
                    {/* Top Section: Image & Assessment Card */}
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                        {/* Left Column: Image */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center p-4">
                            <Image
                                src="/testvector.svg"
                                alt="Test Assessment Illustration"
                                width={500}
                                height={500}
                                className="object-contain hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                            />
                        </div>

                        {/* Right Column: Assessment Card */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <Card className="w-full max-w-lg shadow-xl border-none relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                                <div className="p-6 md:p-8 space-y-8 pt-10">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Knowledge Assessment</h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Select your options and proficiency level to begin the test.</p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Test Type Selection */}
                                        <div
                                            className="flex items-center space-x-3 cursor-pointer group w-fit"
                                            onClick={() => handleTestTypeChange(!isDegreeTest)}
                                        >
                                            <div className={`
                                                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                                ${isDegreeTest ? "border-blue-600 border-[6px]" : "border-slate-300 dark:border-slate-600 group-hover:border-blue-400"}
                                            `}>
                                            </div>
                                            <span className={`font-medium text-sm transition-colors ${isDegreeTest ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300 group-hover:text-blue-600"}`}>
                                                Tests After 10/12th Grade
                                            </span>
                                        </div>

                                        {/* Topics Selection */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {isDegreeTest ? 'Select Degree' : 'Select Topics'}
                                            </Label>
                                            <MultiSelect
                                                options={currentOptions}
                                                selected={selectedItems}
                                                onChange={setSelectedItems}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Proficiency Level */}
                                        <div className="space-y-3">
                                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                Proficiency Level
                                            </Label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {proficiencyLevels.map((level, index) => {
                                                    let activeClass = "";
                                                    let inactiveClass = "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400";

                                                    if (level === "Easy") {
                                                        activeClass = "bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-400";
                                                        if (index !== selectedLevel) inactiveClass += " hover:border-green-200 hover:text-green-600";
                                                    } else if (level === "Medium") {
                                                        activeClass = "bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400";
                                                        if (index !== selectedLevel) inactiveClass += " hover:border-amber-200 hover:text-amber-600";
                                                    } else if (level === "Hard") {
                                                        activeClass = "bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-400";
                                                        if (index !== selectedLevel) inactiveClass += " hover:border-red-200 hover:text-red-600";
                                                    }

                                                    return (
                                                        <button
                                                            key={level}
                                                            onClick={() => setSelectedLevel(index)}
                                                            className={`
                                                                h-10 text-sm rounded-md border font-medium transition-all duration-200
                                                                ${selectedLevel === index ? activeClass : inactiveClass}
                                                            `}
                                                        >
                                                            {level}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-6 pt-2">
                                            <Button
                                                onClick={handleStartAssessment}
                                                disabled={isLoading || selectedItems.length === 0}
                                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]"
                                            >
                                                {isLoading ? 'Preparing Test...' : 'Start Assessment'} <div className="ml-2">→</div>
                                            </Button>

                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center">
                                                    <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                                                </div>
                                                <div className="relative flex justify-center text-xs uppercase">
                                                    <span className="bg-white dark:bg-card px-2 text-slate-400">
                                                        Or
                                                    </span>
                                                </div>
                                            </div>

                                            <Button
                                                variant="outline"
                                                onClick={handleGenerateCourse}
                                                disabled={isDegreeTest || selectedItems.length === 0}
                                                className="w-full h-11 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-900/20 font-semibold text-sm"
                                            >
                                                Just Generate Learning Path
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Recently Taken Assessments */}
                    <div className="w-full bg-white dark:bg-card rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
                                    <History className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Recently Taken Assessments</h3>
                            </div>
                            <Link href="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                                View All History
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800">
                                        <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Assessment Name</th>
                                        <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date Taken</th>
                                        <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Proficiency</th>
                                        <th className="text-right py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentQuizzes && recentQuizzes.length > 0 ? (
                                        recentQuizzes.map((quiz, i) => (
                                            <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-orange-500'}`} />
                                                        <div>
                                                            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{quiz.title || quiz.skills?.[0] || "General Assessment"}</p>
                                                            <p className="text-xs text-slate-500">{quiz.skills?.length > 1 ? `${quiz.skills.length} Topics` : "Core Concept"}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(quiz.completedAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`
                                                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                        ${quiz.difficulty === 'Hard' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                                                            quiz.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' :
                                                                'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'}
                                                    `}>
                                                        {quiz.difficulty || "Medium"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${quiz.score >= 80 ? 'bg-green-500' : quiz.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                                style={{ width: `${quiz.score}%` }}
                                                            />
                                                        </div>
                                                        <span className="font-bold text-slate-900 dark:text-slate-100 text-sm w-8">{Math.round(quiz.score)}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="py-8 text-center text-slate-500 text-sm">
                                                No assessments taken yet. Start one above!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {isLoading && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 pr-6 rounded-full shadow-2xl border border-blue-100 dark:border-blue-900/50 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="relative w-6 h-6 flex-shrink-0">
                        <div className="absolute w-6 h-6 rounded-full border-4 border-blue-600 dark:border-blue-500 border-t-transparent animate-spin"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Preparing your test...</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{countdown}s remaining</span>
                    </div>
                </div>
            )}
        </div>
    )
}
