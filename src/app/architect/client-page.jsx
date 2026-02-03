"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Folder, FileCode, Database, Layers, Hammer, Wand2, ChevronRight, ChevronDown, Sparkles } from "lucide-react";
import { generateProjectBlueprint, saveActiveProject } from "@/app/actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function ClientArchitectPage({ initialStack = [] }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [blueprint, setBlueprint] = useState(null);
    const router = useRouter();
    const [formData, setFormData] = useState({
        stack: initialStack.join(", "),
        interest: ""
    });

    const handleGenerate = async (e) => {
        e.preventDefault();

        // Validation: Ensure we have skills to work with
        const currentStack = formData.stack || initialStack.join(", ");

        if (!currentStack || !formData.interest) {
            toast.error("Please provide both your skills and an interest.");
            return;
        }

        setIsLoading(true);
        try {
            // We append a directive to the interest to ensure the AI knows to prioritize the known skills
            const result = await generateProjectBlueprint(currentStack, formData.interest);
            if (result.error) {
                toast.error(result.error);
            } else {
                setBlueprint(result);
                toast.success("Blueprint generated successfully!");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const result = await saveActiveProject(blueprint);
            if (result.success) {
                toast.success("Project saved and added to goals!");
                router.push("/dashboard");
            } else {
                toast.error("Failed to save project.");
            }
        } catch (error) {
            toast.error("Something went wrong saving the project.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background pb-12">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6">
                <Header userImage="/Avatar21.svg" />

                <div className="mt-8 space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                            <Wand2 className="w-4 h-4" />
                            <span>AI Project Architect</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Verification Project</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Don't just list skills on your resume. Prove them. We'll design a unique project that specifically demonstrates the topics you've mastered here.
                        </p>
                    </div>

                    {/* Input Form */}
                    {!blueprint && (
                        <Card className="max-w-xl mx-auto border-none shadow-xl">
                            <CardContent className="p-6 md:p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label>Your Mastered Skills (Auto-Detected)</Label>
                                            {initialStack.length > 0 && (
                                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                                                    <Sparkles className="w-3 h-3 mr-1" />
                                                    {initialStack.length} Verified Topics
                                                </Badge>
                                            )}
                                        </div>
                                        <Input
                                            placeholder="e.g. Next.js, Tailwind, Supabase"
                                            value={formData.stack}
                                            onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                                            className="h-12 bg-slate-50 dark:bg-slate-900/50 font-medium text-slate-700 dark:text-slate-300"
                                        />
                                        <p className="text-xs text-slate-500">
                                            These are the skills you've passed quizzes for. We'll build the project around them.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Project Theme / Interest</Label>
                                        <Input
                                            placeholder="e.g. Finance, Wildlife, Crypto, Travel"
                                            value={formData.interest}
                                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                            className="h-12"
                                            autoFocus
                                        />
                                        <p className="text-xs text-slate-500">Pick a domain you love to make the project stand out.</p>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Architecting Project...
                                        </>
                                    ) : (
                                        "Generate Verified Project Blueprint"
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Blueprint Result */}
                    {blueprint && (
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">

                            {/* Project Header */}
                            <div className="bg-white dark:bg-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{blueprint.title}</h2>
                                    <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mt-1">{blueprint.tagline}</p>
                                    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">{blueprint.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                                            {blueprint.difficulty}
                                        </Badge>
                                        {blueprint.features.map((feature, i) => (
                                            <Badge key={i} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button variant="outline" onClick={() => setBlueprint(null)}>
                                        Create Another
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                                    >
                                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Hammer className="w-4 h-4 mr-2" />}
                                        Start This Project
                                    </Button>
                                </div>
                            </div>

                            {/* Blueprint Details */}
                            <Tabs defaultValue="structure" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-12 mb-8 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <TabsTrigger value="structure" className="rounded-lg data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-400">
                                        <Layers className="w-4 h-4 mr-2" /> Structure
                                    </TabsTrigger>
                                    <TabsTrigger value="database" className="rounded-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-400">
                                        <Database className="w-4 h-4 mr-2" /> Database
                                    </TabsTrigger>
                                    <TabsTrigger value="plan" className="rounded-lg data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400">
                                        <Hammer className="w-4 h-4 mr-2" /> Build Plan
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="structure" className="mt-0">
                                    <Card className="border-none shadow-md overflow-hidden">
                                        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                            <CardTitle>File Architecture</CardTitle>
                                            <CardDescription>Recommended folder structure for scalability.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6 font-mono text-sm">
                                            <FileTree nodes={blueprint.fileStructure} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="database" className="mt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {blueprint.databaseSchema.map((table, i) => (
                                            <Card key={i} className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                                <CardHeader className="bg-amber-50/50 dark:bg-amber-900/10 border-b border-amber-100 dark:border-amber-900/20 py-4">
                                                    <CardTitle className="text-base font-bold flex items-center gap-2 text-amber-700 dark:text-amber-500">
                                                        <Database className="w-4 h-4" /> {table.table}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-0">
                                                    <table className="w-full text-left border-collapse">
                                                        <tbody>
                                                            {table.fields.map((field, j) => (
                                                                <tr key={j} className="border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                                                    <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">{field.name}</td>
                                                                    <td className="p-3 text-right text-slate-400 text-xs uppercase">{field.type}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="plan" className="mt-0">
                                    <Card className="border-none shadow-md">
                                        <CardHeader>
                                            <CardTitle>Implementation Roadmap</CardTitle>
                                            <CardDescription>Step-by-step guide to bringing this to life.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-8">
                                            <div className="space-y-8 relative">
                                                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />
                                                {blueprint.buildSteps.map((phase, i) => (
                                                    <div key={i} className="relative pl-12">
                                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-background flex items-center justify-center font-bold text-slate-500 z-10">
                                                            {i + 1}
                                                        </div>
                                                        <div className="space-y-4">
                                                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{phase.phase}</h3>
                                                            <ul className="space-y-2">
                                                                {phase.steps.map((step, j) => (
                                                                    <li key={j} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                                                        <span className="text-slate-700 dark:text-slate-300 text-sm">{step}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Recursive Component for File Tree
const FileTree = ({ nodes, depth = 0 }) => {
    return (
        <div className="flex flex-col select-none">
            {nodes.map((node, i) => (
                <FileTreeNode key={i} node={node} depth={depth} />
            ))}
        </div>
    );
};

const FileTreeNode = ({ node, depth }) => {
    const [isOpen, setIsOpen] = useState(true);
    const isFolder = node.type === "folder";

    return (
        <div className="ml-2">
            <div
                className={`flex items-center gap-2 py-1 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors ${depth === 0 ? 'mb-1' : ''}`}
                style={{ marginLeft: `${depth * 12}px` }}
                onClick={() => isFolder && setIsOpen(!isOpen)}
            >
                {isFolder && (
                    <span className="text-slate-400">
                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                )}
                {!isFolder && <span className="w-4" />} {/* Spacer for files */}

                {isFolder ? (
                    <Folder className="w-4 h-4 text-blue-500 fill-blue-100 dark:fill-blue-900/30" />
                ) : (
                    <FileCode className="w-4 h-4 text-slate-400" />
                )}

                <span className={`${isFolder ? 'font-semibold text-slate-700 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                    {node.name}
                </span>
            </div>

            {isFolder && isOpen && node.children && (
                <div className="border-l border-slate-200 dark:border-slate-800 ml-[22px]" style={{ marginLeft: `${depth * 12 + 22}px` }}>
                    <FileTree nodes={node.children} depth={depth + 1} />
                </div>
            )}
        </div>
    );
};
