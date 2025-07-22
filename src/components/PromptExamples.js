'use client';

import { BookOpen, Lightbulb, Code, Briefcase, Palette, Brain } from 'lucide-react';

export default function PromptExamples({ onSelectExample }) {
  const examples = [
    {
      category: "Creative Writing",
      icon: <Palette className="h-6 w-6" />,
      color: "bg-pink-100 text-pink-600",
      prompt: "Write a story about a robot who learns to paint."
    },
    {
      category: "Code Generation",
      icon: <Code className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
      prompt: "Create a function that sorts an array of numbers."
    },
    {
      category: "Business Strategy",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600",
      prompt: "Help me create a marketing plan for a new app."
    },
    {
      category: "Learning & Education",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600",
      prompt: "Explain quantum physics in simple terms."
    },
    {
      category: "Problem Solving",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-orange-100 text-orange-600",
      prompt: "I need help organizing my daily schedule."
    },
    {
      category: "Creative Ideas",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "bg-yellow-100 text-yellow-600",
      prompt: "Give me ideas for a birthday party theme."
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Try These Example Prompts
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Click on any example below to see how our AI enhancer transforms basic prompts into powerful, detailed instructions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <div
            key={index}
            onClick={() => onSelectExample(example.prompt)}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer group"
          >
            <div className={`p-3 ${example.color} rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-200`}>
              {example.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {example.category}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              "{example.prompt}"
            </p>
            <div className="mt-4 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Click to try this prompt →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}