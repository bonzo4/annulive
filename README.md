# Annulive 🚀

**Social media AI app where users can create and share their own roadmaps learning the skills they want to.**

Annulive is a revolutionary platform that combines social networking with AI-powered learning. Users can create personalized learning roadmaps, share their progress, and discover new skills through an engaging, community-driven experience.

## ✨ Features

- **AI-Powered Roadmaps**: Create intelligent learning paths tailored to your goals
- **Social Learning**: Share your progress and discover what others are learning
- **Community-Driven**: Connect with learners on similar paths
- **Skill Tracking**: Monitor your progress and celebrate milestones
- **Personalized Experience**: AI-driven recommendations based on your interests

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org) with React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with custom animations
- **UI Components**: [Radix UI](https://www.radix-ui.com/) for accessible components
- **Authentication**: [Auth0](https://auth0.com/) for secure user management
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful icons
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bonzo4/annulive.git
cd annulive
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Configure your Auth0 credentials and other environment variables in `.env.local`.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   └── ui/             # Base UI components (Radix + custom)
├── lib/                # Utility functions and configurations
└── middleware.ts       # Next.js middleware for authentication
```

## 🌟 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deploy

The easiest way to deploy Annulive is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more deployment options.

---

**Start your learning journey today with Annulive!** 🎯
