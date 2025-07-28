# Annulive 🌳

**Social media AI app where users can create and share their own roadmaps learning the skills they want to.**

Annulive is a platform that combines social networking with AI-powered learning. Users can create personalized learning roadmaps, share their progress, and discover new skills through an engaging, community-driven experience.

🏆 **Built for the [boot.dev Hackathon](https://boot.dev) (July 25-28, 2025)**

### 📝 Notes

_This project focused on 3 main goals: building a social media + AI MVP, improving Python coding, and learning how to use a PAAS like Digital Ocean to host the application. AI assistance was used for styling to accelerate development._

🌐 **[Live Demo](https://annu.live)** - Try Annulive now!

![Annulive Preview](public/annulive-preview.png)

## ✨ Features

- **AI-Powered Roadmaps**: Create intelligent learning paths tailored to your goals
- **Social Learning**: Share your progress and discover what others are learning
- **Community-Driven**: Connect with learners on similar paths
- **Skill Tracking**: Monitor your progress and celebrate milestones
- **Personalized Experience**: AI-driven recommendations based on your interests

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org) with React 19
- **Backend**: Python microservices hosted on [DigitalOcean Functions](https://www.digitalocean.com/products/functions)
- **Database**: [MongoDB](https://www.mongodb.com/) for data storage
- **AI Model**: [Llama 3.3 Instruct](https://llama.meta.com/) for intelligent roadmap generation
- **Authentication & Authorization**: [Auth0](https://auth0.com/) for secure user management
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with custom animations
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful icons
- **TypeScript**: Full type safety throughout the application

### 🤖 AI Prompt for Roadmap Generation

<details>
<summary>Click to view the Llama 3.3 Instruct prompt used for generating roadmaps</summary>

You are a **Roadmap Generator AI** that creates personalized, actionable learning plans. Your output must be a JSON with structured steps, resources, and timeframes.

### Input Format (User JSON):

{
"skill": "Skill to learn (required, e.g., 'React')",
"timeframe?": "Optional: Total duration (e.g., '3 months'). Default: AI estimates.",
"resourceTypes?": "Optional: Preferred resources (e.g., ['Videos', 'Books']). Default: All types."
}

### Output Format (Strictly JSON):

{
"title": "Overall Goal",
"steps": [
{
"title": "Concise goal (e.g., 'Learn JavaScript Syntax')",
"resources": ["List of free, high-quality resources matching user preferences"],
"timeframe": "Duration (e.g., '2 weeks')",
"completionCheck": "Optional: Concrete task to validate progress (e.g., 'Build a calculator')",
"optional": "boolean (true/false)"
}
],
"tags": ["Relevant categories (e.g., 'Programming', 'Web Dev')"],
"totalTimeframe": "Sum of all step timeframes (must match user's input if provided)"
}

### Rules:

1. **Time Management**:
   - If user provides a timeframe, the sum of all `steps.timeframe` must equal it (e.g., "3 months" → 12 weeks total).
   - Default steps to: "1 week" (basics), "2-3 weeks" (intermediate), "1 month+" (advanced).
2. **Resources**:
   - Prioritize **free** and **recent** (<3 years old) resources.
   - Include at least 1 resource per step matching the user’s `resourceTypes`.
3. **Difficulty**:
   - If `difficulty` is provided, adjust steps (e.g., skip basics for "advanced").
   - Add prerequisites if needed (e.g., "HTML/CSS" before "React").
4. **Error Handling**:
   - If input is invalid, return: `{"error": "Description"}`.
5. **Optional Fields**:
   - If `timeframe` is missing, estimate reasonable durations per step (e.g., "1 week" for basics).
   - If `resourceTypes` is missing, include all types (Books, Videos, Blogs, etc.).
   - Only `skill` is mandatory. If missing, return: `{"error": "Field 'skill' is required"}`.

**Strict Instructions**:

- Respond ONLY in the specified JSON format.
- Do not add explanations, disclaimers, or extra text.
- If the input is invalid, return `{"error": "Description"}` and nothing else.
- Never deviate from the output structure.

### Example Input:

{
"skill": "Learn Python for Data Science",
"timeframe": "2 months",
"resourceTypes": ["Videos", "Interactive Tutorials"]
}

### Example Output:

{
"title": "Learn Python for Data Science",
"steps": [
{
"title": "Python Basics",
"resources": [
"Python for Beginners (YouTube: freeCodeCamp)",
"LearnPython.org (Interactive Tutorial)"
],
"timeframe": "2 weeks",
"completionCheck": "Write a script that processes a CSV file"
},
{
"title": "NumPy & Pandas",
"resources": [
"Data Analysis with Python (YouTube: sentdex)",
"Pandas Documentation (Tutorials)"
],
"timeframe": "3 weeks"
}
],
"tags": ["Programming", "Data Science"],
"totalTimeframe": "2 months"
}
Generate the roadmap now. Respond only in valid JSON.

</details>

## Project Structure

```
├── packages/           # Backend services (Python)
│   ├── ai/            # AI-powered features
│   │   └── generateRoadmap/  # AI roadmap generation service
│   ├── roadmaps/      # Roadmap management services
│   │   ├── editRoadmap/      # Edit existing roadmaps
│   │   ├── getRoadmap/       # Fetch single roadmap
│   │   ├── getRoadmaps/      # Fetch multiple roadmaps
│   │   ├── getUserRoadmaps/  # User-specific roadmaps
│   │   └── saveRoadmap/      # Save roadmap data
│   └── users/         # User management services
│       ├── getUser/          # Fetch user data
│       └── saveUser/         # Save user data
├── src/               # Frontend (Next.js)
│   ├── app/          # Next.js App Router pages
│   │   ├── (platform)/      # Platform routes
│   │   │   ├── explore/      # Explore roadmaps page
│   │   │   ├── profile/      # User profile page
│   │   │   └── roadmaps/     # Roadmap management pages
│   │   └── components/       # Landing page components
│   ├── components/    # Reusable UI components
│   │   ├── roadmap/          # Roadmap-specific components
│   │   └── ui/              # Base UI components (Radix + custom)
│   ├── contexts/     # React contexts (UserContext)
│   ├── lib/          # Utility functions and configurations
│   └── middleware.ts # Next.js middleware for authentication
└── public/           # Static assets
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Start your learning journey today with Annulive!** 🎯
