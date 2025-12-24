"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Sparkles, Loader2, ExternalLink } from "lucide-react";
import { getLearningSuggestions, generatePersonalizedCourse } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function AILearningBanner({ recentQuizzes = [] }) {
  const router = useRouter();
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Derive skills from recent quizzes (focus on weak areas or just recent topics)
  const getTopics = () => {
    if (!recentQuizzes || recentQuizzes.length === 0) return ["General Web Development", "JavaScript Basics"];
    
    // Get unique skills from recent quizzes
    const skills = new Set();
    recentQuizzes.forEach(q => {
      if (q.skills) q.skills.forEach(s => skills.add(s));
    });
    
    const topics = Array.from(skills);
    return topics.length > 0 ? topics.slice(0, 5) : ["General Web Development"];
  };

  const handleGetSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const topics = getTopics();
      const result = await getLearningSuggestions(topics);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        setSuggestions(result);
        setShowSuggestions(true);
        toast.success("Learning suggestions generated!");
      }
    } catch (error) {
      toast.error("Failed to get suggestions. Please try again.");
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGeneratePath = async () => {
    setIsGeneratingPath(true);
    try {
      const topics = getTopics();
      const result = await generatePersonalizedCourse(topics);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("New learning path generated successfully!");
        router.push("/learn");
      }
    } catch (error) {
      toast.error("Failed to generate learning path.");
    } finally {
      setIsGeneratingPath(false);
    }
  };

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              <span>AI LEARNING ASSISTANT</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              Ready to accelerate your learning?
            </h2>
            
            <p className="text-blue-100 text-sm md:text-base">
              Get personalized course recommendations or generate a new learning path based on your recent activity patterns.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                variant="secondary" 
                className="bg-white text-blue-700 hover:bg-blue-50 border-none font-semibold"
                onClick={handleGetSuggestions}
                disabled={isLoadingSuggestions || isGeneratingPath}
              >
                {isLoadingSuggestions ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Get Suggestions
              </Button>
              <Button 
                variant="outline" 
                className="bg-blue-600/50 text-white border-white/30 hover:bg-blue-600 hover:text-white backdrop-blur-sm"
                onClick={handleGeneratePath}
                disabled={isLoadingSuggestions || isGeneratingPath}
              >
                {isGeneratingPath ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <BrainCircuit className="w-4 h-4 mr-2" />
                )}
                Generate New Path
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative mr-4">
             {/* Back Square */}
             <div className="absolute top-3 left-3 w-24 h-24 lg:w-32 lg:h-32 bg-white/10 rounded-3xl"></div>
             
             {/* Front Square */}
             <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 flex items-center justify-center shadow-xl">
                <Image 
                  src="/brain-imag.png" 
                  alt="AI Brain" 
                  width={100} 
                  height={100} 
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-lg"
                />
             </div>
          </div>
        </div>
      </div>

      <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Recommended Learning Resources
            </DialogTitle>
            <DialogDescription>
              AI-curated courses based on your recent activity and identified knowledge gaps.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-base">{item.title}</h4>
                      <Badge variant="secondary" className="shrink-0">{item.platform}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mt-2"
                    >
                      Start Learning <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No suggestions found. Try taking more quizzes to identify your learning needs.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
