"use server"

import { signIn, signOut } from "@/auth"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "@/model/user-model";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongo";

export async function toggleModuleCompletion(moduleTitle, completed) {
    "use server";
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error("User not authenticated.");
    }

    try {
        const result = await User.updateOne(
            { email: session.user.email, "learningPath.title": moduleTitle },
            { $set: { "learningPath.$.completed": completed } }
        );

        if (result.nModified === 0) {
            // This can happen if the module title doesn't match.
            // You might want to handle this case, e.g., by returning an error.
            console.warn(`No module found with title: ${moduleTitle} for user: ${session.user.email}`);
        }

        // No need to revalidate if you're handling state on the client
        // revalidatePath("/learn"); 

        return { success: true };

    } catch (error) {
        console.error("Error updating module completion:", error);
        return { error: "Failed to update module status." };
    }
}


export async function generatePersonalizedCourse(topics) {
    const session = await auth();
    if (!session?.user?.email) {
        return { error: "User not authenticated." };
    }

    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is not set");
        return { error: "AI service is not configured properly." };
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const jsonFormat = `
    [
        {
            "title": "Module 1: Topic Name",
            "chapters": [
                {
                    "title": "Chapter 1: Sub-topic",
                    "subTopics": [
                        { "title": "State-a Component's  Memory", "demoLink": "https://react.dev/learn/state-a-components-memory" },
                        { "title": "Stacks", "demoLink": "https://www.geeksforgeeks.org/dsa/stack-data-structure/" }
                    ]
                }
            ],
            "completed": false
        }
    ]
    `;

        const prompt = `
    You are a fast professional web scraper at perplexity ai.
    your Tasks: 
    1. Based on the following topics: ${topics.join(", ")}. 
    2. Generate a structured learning path for a beginner.
    3. The output MUST be a valid JSON array, following this exact structure and format: ${jsonFormat}.
    4. Do not include any text, explanations, or markdown formatting like \`\`\`json before or after the JSON array.
    5. Do NOT include any quizzes or assessments. The path is for learning only.
    6. Create 2-3 modules, each with 2-3 chapters. Each chapter should have 2-3 sub-topics Those subtopics should have a valid and latest link to a valid page like gfg or w3schools or any other like even javatpoint for eg a react module would include link to react doc.please make sure the links are latest and new versions as they keep on changing in every few days. make sure to not include legacy docs like here https://legacy.reactjs.org/docs/components-and-props.html. Please make sure the links are working and active as they may turn dead even in an hour sometimes.
    7. In the end reorganize the modules and chapters based on one user should learn like a person selecting topics c++,python,c is incorrect path as you need to learn C first then c++ and then python so maintain such a sequence for modules and subchapters. 
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let jsonString = text.replace(/```json|```/g, '').trim();

        if (jsonString.indexOf('[') > -1 && jsonString.lastIndexOf(']') > -1) {
            jsonString = jsonString.substring(jsonString.indexOf('['), jsonString.lastIndexOf(']') + 1);
        }

        const learningPathData = JSON.parse(jsonString);

        await User.updateOne(
            { email: session.user.email },
            { $set: { learningPath: learningPathData } }
        );

        return { success: true };

    } catch (error) {
        console.error("Error generating or saving personalized course:", error);
        return { error: "Failed to generate the learning path. Please try again." };
    }
}

export async function doSocialLogin(formData) {
    const action = formData.get('action')
    await signIn(action, { redirectTo: "/dashboard" })
    // console.log(action)
}

export async function doLogout() {
    await signOut({ redirectTo: "/" })
}

export async function doCredLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });

        // This part is for successful logins or other non-throwing errors
        if (response && response.error) {
            return { error: "Invalid credentials or user not found." };
        }

        return response; // Success case

    } catch (error) {
        // This catches errors thrown by signIn, like invalid credentials
        if (error.type === 'CredentialsSignin' || error.message.includes('CredentialsSignin')) {
            return { error: "Invalid credentials or user not found." };
        }
        // For any other unexpected errors
        console.error("Catch block error in doCredLogin:", error);
        return { error: "An internal server error occurred." };
    }
}

export async function getLearningSuggestions(skills) {
    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is not set in the environment variables.");
        return { error: "AI service is not configured. Missing API key." };
    }

    if (!skills || skills.length === 0) {
        return { error: "No skills provided to get suggestions for." };
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `
            You are an expert course recommender. Your goal is to provide high-quality, relevant online courses for a user looking to improve their technical skills.

            The user is weak in these topics: **${skills.join(', ')}**.

            Find 3-4 courses for them, following these strict rules:

            **CRITICAL INSTRUCTIONS:**
            1.  **RELEVANCE IS KEY:** The course content must be directly relevant to the listed skills.
            2.  **VERIFY LINKS:** Ensure every course link is currently active and leads to the course landing page.
            3.  **DIVERSE PLATFORMS:** Suggest courses from reputable platforms like Udemy, Coursera, freeCodeCamp, Pluralsight, or official documentation tutorials.

            **OUTPUT FORMAT:**
            - You MUST return **ONLY** a valid JSON array of objects.
            - NO other text, explanations, or markdown.
            - Each object MUST contain these keys: "title", "link", "platform", and "description".

            Example of a perfect, verified response:
            \`\`\`json
            [
              {
                "title": "The Complete 2024 Web Development Bootcamp",
                "link": "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
                "platform": "Udemy",
                "description": "A comprehensive course covering HTML, CSS, Javascript, Node, React, MongoDB, and more."
              },
              {
                "title": "Google Data Analytics Professional Certificate",
                "link": "https://www.coursera.org/professional-certificates/google-data-analytics",
                "platform": "Coursera",
                "description": "Gain an immersive understanding of the practices and processes used by a junior or associate data analyst in their day-to-day job."
              }
            ]
            \`\`\`
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        let jsonString = text.replace(/```json|```/g, '').trim();

        // A more robust way to find the JSON part
        if (jsonString.indexOf('[') > -1 && jsonString.lastIndexOf(']') > -1) {
            jsonString = jsonString.substring(jsonString.indexOf('['), jsonString.lastIndexOf(']') + 1);
        }

        try {
            const suggestions = JSON.parse(jsonString);
            return suggestions;
        } catch (parseError) {
            console.error("Failed to parse JSON response from AI:", parseError);
            console.error("Raw AI response:", text);
            return { error: "The AI returned an invalid response. Please try again." };
        }

    } catch (error) {
        console.error("Error fetching learning suggestions:", error);
        if (error.message.includes('API key not valid')) {
            return { error: "The AI service API key is not valid. Please check your configuration." };
        }
        // Check for fetch-related errors which often indicate network issues.
        if (error.message.includes('fetch failed')) {
            return { error: "Could not connect to the AI service. Please check your network connection and firewall settings." };
        }
        return { error: "An unexpected error occurred while fetching suggestions. Please try again later." };
    }
}

export async function getLeaderboardData() {
    try {
        await dbConnect();

        const leaderboard = await User.aggregate([
            {
                $project: {
                    Username: 1,
                    averageScore: { $avg: "$quizzes.score" }
                }
            },
            { $match: { averageScore: { $gt: 0 } } },
            { $sort: { averageScore: -1 } },
            { $limit: 10 }
        ]);

        return leaderboard.map(user => ({
            name: user.Username,
            averageScore: Math.round(user.averageScore)
        }));

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
    }
}

export async function getGitHubOpportunities(skill) {
    try {
        // Sanitize skill to avoid injection or weird queries
        const safeSkill = encodeURIComponent(skill);
        // Search for issues with label "good first issue" or "good-first-issue"
        const response = await fetch(`https://api.github.com/search/issues?q=label:"good-first-issue","good first issue"+language:${safeSkill}+state:open&sort=updated&per_page=5`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Opportunity-Lens-App'
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            // If rate limited or other error, return empty array gracefully
            console.warn(`GitHub API returned ${response.status}`);
            return [];
        }

        const data = await response.json();

        if (!data.items) return [];

        return data.items.map(issue => ({
            id: issue.id,
            title: issue.title,
            url: issue.html_url,
            repo: issue.repository_url.replace('https://api.github.com/repos/', ''),
            comments: issue.comments,
            created_at: issue.created_at
        }));
    } catch (error) {
        console.error("Error fetching GitHub issues:", error);
        return [];
    }
}

export async function addGoal(title) {
    const session = await auth();
    if (!session?.user?.email) return { error: "Not authenticated" };

    try {
        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) return { error: "User not found" };

        user.goals.push({ title, completed: false });
        await user.save();

        // Return plain object representation of the new goal
        const newGoal = user.goals[user.goals.length - 1];
        return {
            success: true,
            goal: {
                _id: newGoal._id.toString(),
                title: newGoal.title,
                completed: newGoal.completed,
                createdAt: newGoal.createdAt
            }
        };
    } catch (error) {
        console.error("Error adding goal:", error);
        return { error: "Failed to add goal" };
    }
}

export async function toggleGoal(goalId) {
    const session = await auth();
    if (!session?.user?.email) return { error: "Not authenticated" };

    try {
        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) return { error: "User not found" };

        const goal = user.goals.id(goalId);
        if (goal) {
            goal.completed = !goal.completed;
            await user.save();
            return { success: true };
        }
        return { error: "Goal not found" };
    } catch (error) {
        console.error("Error toggling goal:", error);
        return { error: "Failed to toggle goal" };
    }
}

export async function deleteGoal(goalId) {
    const session = await auth();
    if (!session?.user?.email) return { error: "Not authenticated" };

    try {
        await dbConnect();
        await User.updateOne(
            { email: session.user.email },
            { $pull: { goals: { _id: goalId } } }
        );
        return { success: true };
    } catch (error) {
        console.error("Error deleting goal:", error);
        return { error: "Failed to delete goal" };
    }
}

export async function generateProjectBlueprint(techStack, interest) {
    if (!process.env.GEMINI_API_KEY) {
        return { error: "AI service is not configured." };
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
            You are a Senior Software Architect. Create a unique, portfolio-worthy project blueprint.
            
            **Inputs:**
            - **Tech Stack / Mastered Skills:** ${techStack}
            - **User Interest/Theme:** ${interest}

            **Goal:** Design a unique, portfolio-worthy project that specifically demonstrates mastery of the provided skills/tech stack within the context of the user's interest. Avoid generic ideas.

            **Output Format:**
            Return ONLY a valid JSON object with this exact structure:
            {
                "title": "Project Name",
                "tagline": "A catchy one-sentence pitch.",
                "description": "Short summary of what it does.",
                "difficulty": "Intermediate",
                "features": ["Key Feature 1", "Key Feature 2", "Key Feature 3"],
                "fileStructure": [
                    {
                        "name": "src",
                        "type": "folder",
                        "children": [
                            { "name": "components", "type": "folder", "children": [{ "name": "Button.jsx", "type": "file" }] },
                            { "name": "App.js", "type": "file" }
                        ]
                    }
                ],
                "databaseSchema": [
                    {
                        "table": "Users",
                        "fields": [
                            { "name": "id", "type": "UUID" },
                            { "name": "email", "type": "String" }
                        ]
                    }
                ],
                "buildSteps": [
                    {
                        "phase": "1. Setup & Core",
                        "steps": ["Initialize repo", "Setup Auth"]
                    }
                ]
            }
            
            **Rules:**
            1. The file structure should reflect best practices for the requested stack (e.g., Next.js App Router folders vs React CRA).
            2. The database schema should be relevant (SQL vs NoSQL keys).
            3. Do not assume any pre-existing code.
            4. Make it impressive but achievable for a solo dev.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let jsonString = text.replace(/```json|```/g, '').trim();
        if (jsonString.indexOf('{') > -1 && jsonString.lastIndexOf('}') > -1) {
            jsonString = jsonString.substring(jsonString.indexOf('{'), jsonString.lastIndexOf('}') + 1);
        }

        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error generating blueprint:", error);
        return { error: "Failed to generate blueprint. Please try again." };
    }
}

export async function saveActiveProject(blueprint) {
    const session = await auth();
    if (!session?.user?.email) {
        return { error: "User not authenticated." };
    }

    try {
        await dbConnect();

        // 1. Save the project
        // 2. Add a goal for it
        const goalTitle = `Build Project: ${blueprint.title}`;

        await User.updateOne(
            { email: session.user.email },
            {
                $set: { activeProject: blueprint },
                $push: {
                    goals: {
                        title: goalTitle,
                        completed: false,
                        createdAt: new Date()
                    }
                }
            }
        );

        return { success: true };
    } catch (error) {
        console.error("Error saving project:", error);
        return { error: "Failed to save project." };
    }
}