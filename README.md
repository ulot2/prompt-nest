# PromptNest

PromptNest is a modern platform for discovering, creating, and sharing AI prompts. It serves as a community hub where users can find inspiration, vote on the best prompts, and manage their own collection.

## ✨ Key Features

- **🔎 Discovery**: Browse trending, latest, and categorized prompts.
- **🗳️ Community Interaction**: Like, dislike, and comment on prompts to help curate quality content.
- **🔖 Personalization**: Bookmark your favorite prompts and manage them in your profile.
- **👤 User Profiles**: View user contributions and saved prompts.
- **🎨 Modern UI**: Responsive design with a pixel-grid background and dark mode support.
- **🔐 Secure Authentication**: Sign in easily with GitHub or Google.
- **🔍 Search & Filter**: Find exactly what you need with advanced search and filtering options.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Supabase](https://supabase.com/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Package manager)
- A PostgreSQL database (e.g., from Supabase or a local instance)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/promptnest.git
    cd promptnest
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Setup:**

    Create a `.env` file in the root directory (or `.env.local`) and add the following variables:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@host:port/db?schema=public"
    DIRECT_URL="postgresql://user:password@host:port/db?schema=public"

    # NextAuth
    AUTH_SECRET="your-secret-key" # Generate with: npx auth secret

    # OAuth Providers
    AUTH_GITHUB_ID="your-github-id"
    AUTH_GITHUB_SECRET="your-github-secret"
    AUTH_GOOGLE_ID="your-google-id"
    AUTH_GOOGLE_SECRET="your-google-secret"
    ```

4.  **Database Setup:**

    Push the schema to your database:

    ```bash
    npx prisma db push
    ```

5.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

