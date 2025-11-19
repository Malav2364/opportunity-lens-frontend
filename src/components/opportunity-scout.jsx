"use client";
import { useEffect, useState } from 'react';
import { getGitHubOpportunities } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GitPullRequest, ExternalLink, Loader2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function OpportunityScout({ recentQuizzes }) {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    // Extract high-scoring skills (> 50%)
    // We flatten the skills arrays, filter out nulls, and use Set to get unique values
    const highSkills = [...new Set(recentQuizzes
        .filter(q => q.score >= 50)
        .flatMap(q => q.skills || [])
        .filter(s => s) 
    )];

    useEffect(() => {
        if (highSkills.length > 0 && !selectedSkill) {
            // Default to the first skill
            fetchOpportunities(highSkills[0]);
        }
    }, [highSkills]);

    const fetchOpportunities = async (skill) => {
        setLoading(true);
        setSelectedSkill(skill);
        try {
            const data = await getGitHubOpportunities(skill);
            setOpportunities(data);
        } catch (error) {
            console.error("Failed to fetch opportunities", error);
        } finally {
            setLoading(false);
        }
    };

    if (highSkills.length === 0) {
        return (
            <Card className="border-dashed border-2 bg-muted/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <GitPullRequest className="w-5 h-5 text-muted-foreground" />
                        Real-World Quests
                    </CardTitle>
                    <CardDescription>
                        Score 50% or higher in a technical quiz to unlock real open-source contributions!
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden relative border-none shadow-lg bg-gradient-to-br from-background to-muted/50">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Github className="w-32 h-32" />
            </div>

            <CardHeader className="relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-lg text-primary">
                            <GitPullRequest className="w-5 h-5" />
                            Opportunity Scout
                        </CardTitle>
                        <CardDescription className="mt-1">
                            You've proven your skills! Here are live "Good First Issues" you can solve right now.
                        </CardDescription>
                    </div>
                </div>
                
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    {highSkills.map(skill => (
                        <Badge 
                            key={skill} 
                            variant={selectedSkill === skill ? "default" : "outline"}
                            className={`cursor-pointer whitespace-nowrap transition-all ${
                                selectedSkill === skill 
                                ? "" 
                                : "hover:bg-muted"
                            }`}
                            onClick={() => fetchOpportunities(skill)}
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="relative z-10">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="space-y-3">
                        {opportunities.length > 0 ? (
                            opportunities.map(issue => (
                                <div key={issue.id} className="bg-card p-3 rounded-lg border hover:border-primary/50 transition-all group hover:shadow-md">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1 min-w-0">
                                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                                                {issue.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground flex items-center gap-2 truncate">
                                                <span className="font-mono text-primary/80">{issue.repo}</span>
                                                <span>•</span>
                                                <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                                            <a href={issue.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-muted-foreground text-sm bg-muted/30 rounded-lg border border-dashed">
                                No open "good first issues" found for {selectedSkill} right now.
                                <br/>Try checking back later!
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
