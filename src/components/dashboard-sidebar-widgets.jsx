"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Plus, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { addGoal, toggleGoal, deleteGoal } from "@/app/actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TopicMastery({ recentQuizzes }) {
  // Calculate mastery based on quiz scores per topic/skill
  const topicScores = recentQuizzes.reduce((acc, quiz) => {
    const topics = quiz.skills || ["General"];
    topics.forEach(topic => {
      if (!acc[topic]) {
        acc[topic] = { total: 0, count: 0 };
      }
      acc[topic].total += quiz.score;
      acc[topic].count += 1;
    });
    return acc;
  }, {});

  const masteryData = Object.keys(topicScores).map(topic => ({
    topic,
    mastery: Math.round(topicScores[topic].total / topicScores[topic].count)
  })).sort((a, b) => b.mastery - a.mastery).slice(0, 4); // Top 4 topics

  // Fallback if no data
  const displayData = masteryData.length > 0 ? masteryData : [
    { topic: "Python", mastery: 0 },
    { topic: "Data Visualization", mastery: 0 },
    { topic: "SQL Basics", mastery: 0 },
    { topic: "Statistics", mastery: 0 }
  ];

  const getColor = (index) => {
    const colors = ["bg-blue-600", "bg-purple-600", "bg-emerald-500", "bg-slate-500"];
    return colors[index % colors.length];
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
          Topic Mastery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {displayData.map((item, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-700 dark:text-slate-300">{item.topic}</span>
              <span className={index === 0 ? "text-blue-600" : index === 1 ? "text-purple-600" : "text-slate-500"}>
                {item.mastery}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${getColor(index)}`} 
                style={{ width: `${item.mastery}%` }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function YourGoals({ initialGoals = [] }) {
  const [goals, setGoals] = useState(initialGoals);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGoal = async () => {
    if (!newGoalTitle.trim()) return;
    setIsLoading(true);
    try {
      const result = await addGoal(newGoalTitle);
      if (result.success) {
        setGoals([...goals, result.goal]);
        setNewGoalTitle("");
        setIsAdding(false);
        toast.success("Goal added successfully");
      } else {
        toast.error("Failed to add goal");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleGoal = async (goalId) => {
    // Optimistic update
    const updatedGoals = goals.map(g => 
      g._id === goalId ? { ...g, completed: !g.completed } : g
    );
    setGoals(updatedGoals);

    const result = await toggleGoal(goalId);
    if (!result.success) {
      // Revert if failed
      setGoals(goals);
      toast.error("Failed to update goal");
    }
  };

  const handleDeleteGoal = async (goalId) => {
    const originalGoals = [...goals];
    setGoals(goals.filter(g => g._id !== goalId));

    const result = await deleteGoal(goalId);
    if (!result.success) {
      setGoals(originalGoals);
      toast.error("Failed to delete goal");
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
            <div className="w-1 h-4 bg-orange-500 rounded-full"></div>
            Your Goals
            </CardTitle>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
                <div className="w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600">
                  <Plus className="w-4 h-4" />
                </div>
            </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding && (
          <div className="flex gap-2 mb-4 animate-in slide-in-from-top-2 fade-in duration-200">
            <Input
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              placeholder="Enter new goal..."
              className="h-8 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
            />
            <Button 
              size="sm" 
              className="h-8 px-2"
              onClick={handleAddGoal}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
            </Button>
          </div>
        )}

        {goals.length === 0 && !isAdding && (
          <div className="text-center py-4 text-slate-400 text-sm">
            No goals set yet. Add one to get started!
          </div>
        )}

        {goals.map((goal) => (
          <div key={goal._id} className="group relative p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleToggleGoal(goal._id)}
                  className={`mt-0.5 transition-colors ${goal.completed ? "text-green-500" : "text-slate-300 hover:text-slate-400"}`}
                >
                    {goal.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </button>
                <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-semibold truncate ${goal.completed ? "text-slate-400 line-through decoration-slate-400" : "text-slate-800 dark:text-slate-200"}`}>
                      {goal.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(goal.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <button 
                  onClick={() => handleDeleteGoal(goal._id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
