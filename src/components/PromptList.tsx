"use client";

import { useState } from "react";
import { PromptCard } from "./PromptCard";
import { PromptModal } from "./PromptModal";

const prompts = [
  {
    id: 1,
    category: "midjourney",
    title: "Cinematic Midjourney Prompt Formula",
    description:
      "Create stunning, movie-quality images with this detailed prompts structure.",
    fullPrompt: `You are an expert code reviewer with deep knowledge of software engineering best practices, security vulnerabilities, and performance optimization.

Please review the following code and provide:
1. Security vulnerabilities and how to fix them
2. Performance bottlenecks and optimization suggestions
3. Code style and best practice improvements
4. Potential bugs or edge cases
5. Overall code quality rating (1-10)

Be specific with your suggestions and provide code examples where applicable.

Code to review:
[PASTE CODE HERE]`,

    tags: ["cinematic", "photography", "visual"],
    img: "/images/img1.jpeg",
    userName: "Alex Rivera",
  },
  {
    id: 2,
    category: "chatgpt",
    title: "ChatGPT as a Socratic Tutor",
    description: "Learn through guided questions rather than direct answers.",
    fullPrompt: `Please analyze the following research paper and provide:

1. **TL;DR Summary** (2-3 sentences)
2. **Main Research Question/Hypothesis**
3. **Methodology Used**
4. **Key Findings** (bullet points)
5. **Statistical Significance** (if applicable)
6. **Strengths of the Study**
7. **Limitations and Potential Biases**
8. **Implications for the Field**
9. **Future Research Directions Suggested**
10. **Critical Assessment** (your evaluation of the paper's contribution)

Paper Title: [TITLE]
Paper Abstract/Content: [PASTE HERE]

Please be thorough yet concise, using academic language where appropriate.`,
    // tag1: "education",
    // tag2: "learning",
    // tag3: "teaching",
    tags: ["education", "learning", "teaching"],
    img: "/images/img1.jpeg",
    userName: "Lisa Anderson",
  },
];

export const PromptList = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<any | null>(null);

  return (
    <div>
      <div className="max-w-[900px] mx-auto mt-[2rem] flex justify-center gap-[2%] flex-wrap">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="w-[45%] mb-[2%]">
            <PromptCard prompt={prompt} setSelectedPrompt={setSelectedPrompt} />
          </div>
        ))}
      </div>
      <PromptModal
        isOpen={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        prompt={selectedPrompt}
      />
    </div>
  );
};
