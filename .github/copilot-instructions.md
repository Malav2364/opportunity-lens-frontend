# Opportunity Lens - AI Coding Instructions

## Project Overview
Opportunity Lens is a Next.js 15 (App Router) application for AI-powered career guidance and assessments. It uses MongoDB for data persistence, NextAuth v5 for authentication, and Google Gemini for AI features.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (ES6+)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5 (Beta)
- **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
- **AI**: Google Generative AI SDK (@google/generative-ai)

## Architecture & Patterns

### 1. Server Actions & Data Mutation
- **Pattern**: Use Server Actions for all data mutations (form submissions, updates).
- **Location**: `src/app/actions/index.js` contains the main server actions.
- **Convention**: Always add `"use server"` at the top of action files or functions.
- **Example**:
  ```javascript
  // src/app/actions/index.js
  "use server"
  import { auth } from "@/auth";
  import { User } from "@/model/user-model";
  
  export async function updateScore(score) {
    const session = await auth();
    // ... logic
  }
  ```

### 2. Database Access
- **Connection**: Use the singleton connection pattern in `src/lib/mongo.js`. Always await `dbConnect()` before DB operations in server actions or API routes.
- **Models**: Mongoose models are defined in `src/model/`.
- **Queries**: Complex read operations are abstracted in `src/queries/` (e.g., `src/queries/users.js`).
- **Example**:
  ```javascript
  import { dbConnect } from "@/lib/mongo";
  import { User } from "@/model/user-model";
  
  await dbConnect();
  const user = await User.findOne({ email });
  ```

### 3. Authentication
- **Config**: `src/auth.js` exports `auth`, `signIn`, `signOut`, and `handlers`.
- **Usage**:
  - **Server Components/Actions**: `import { auth } from "@/auth"; const session = await auth();`
  - **Middleware**: `export { auth as middleware } from "@/auth"` (if applicable).

### 4. UI & Styling
- **Components**: Reusable UI components are in `src/components/ui/` (Shadcn).
- **Icons**: Use `lucide-react` for icons.
- **Animations**: Use `framer-motion` for complex animations.
- **Theme**: Supports light/dark mode via `next-themes`.

### 5. AI Integration
- **SDK**: Use `GoogleGenerativeAI` class.
- **Environment**: Ensure `GEMINI_API_KEY` is present.
- **Pattern**: Handle AI calls in Server Actions to keep keys secure.

## Developer Workflow
- **Dev Server**: `npm run dev`
- **Environment Variables**: Required keys in `.env`:
  - `MONGO_DB_CONNECTION_STRING`
  - `AUTH_SECRET`
  - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
  - `GEMINI_API_KEY`
  - `NEXT_PUBLIC_X_API_KEY` (for external quiz API)

## Common Pitfalls
- **Hydration Errors**: Ensure client components (`"use client"`) match server output.
- **DB Connection**: Always call `dbConnect()` inside Server Actions/API routes; do not rely on a global connection being open.
- **NextAuth v5**: Note that `getServerSession` is replaced by `auth()` in v5.
