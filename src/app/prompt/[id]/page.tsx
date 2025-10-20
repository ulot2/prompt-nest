// app/prompt/[id]/page.tsx

interface PromptPageProps {
  params: { id: string };
}

const prompts = [
  {
    id: 1,
    category: "midjourney",
    title: "Cinematic Midjourney Prompt Formula",
    description:
      "Create stunning, movie-quality images with this detailed prompts structure.",
    tag1: "cinematic",
    tag2: "photography",
    tag3: "visual",
    img: "/images/img1.jpeg",
    userName: "Alex Rivera",
  },
  {
    id: 2,
    category: "chatgpt",
    title: "ChatGPT as a Socratic Tutor",
    description: "Learn through guided questions rather than direct answers.",
    tag1: "education",
    tag2: "learning",
    tag3: "teaching",
    img: "/images/img1.jpeg",
    userName: "Lisa Anderson",
  },
];

export default function PromptPage({ params }: PromptPageProps) {
  return (
    <main className="p-6">
      <div>fif</div>
    </main>
  );
}
