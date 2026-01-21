'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { BookOpen, Clock, Star, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const courses = [
    {
        id: 1,
        title: 'AI & Machine Learning Fundamentals',
        description: 'Master the basics of AI and ML with hands-on projects and real-world applications.',
        level: 'Beginner',
        duration: '12 weeks',
        lessons: 48,
        students: 1243,
        rating: 4.8,
        price: '$299',
        image: '/courses/ai-ml.jpg',
        gradient: 'from-blue-600 to-cyan-600',
        topics: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    },
    {
        id: 2,
        title: 'Large Language Models (LLMs) Mastery',
        description: 'Deep dive into LLMs, prompt engineering, fine-tuning, and building AI applications.',
        level: 'Intermediate',
        duration: '10 weeks',
        lessons: 40,
        students: 892,
        rating: 4.9,
        price: '$399',
        image: '/courses/llms.jpg',
        gradient: 'from-purple-600 to-pink-600',
        topics: ['GPT Models', 'Prompt Engineering', 'Fine-tuning', 'LangChain', 'Vector DBs'],
    },
    {
        id: 3,
        title: 'Deep Learning & Neural Networks',
        description: 'Build sophisticated neural networks and understand deep learning architectures.',
        level: 'Advanced',
        duration: '14 weeks',
        lessons: 56,
        students: 654,
        rating: 4.7,
        price: '$499',
        image: '/courses/deep-learning.jpg',
        gradient: 'from-orange-600 to-red-600',
        topics: ['CNNs', 'RNNs', 'Transformers', 'PyTorch', 'Model Optimization'],
    },
    {
        id: 4,
        title: 'AI for Business Applications',
        description: 'Learn how to implement AI solutions in real business scenarios and drive ROI.',
        level: 'Intermediate',
        duration: '8 weeks',
        lessons: 32,
        students: 1056,
        rating: 4.6,
        price: '$349',
        image: '/courses/ai-business.jpg',
        gradient: 'from-green-600 to-teal-600',
        topics: ['AI Strategy', 'Use Cases', 'ROI Analysis', 'Deployment', 'Ethics'],
    },
    {
        id: 5,
        title: 'Computer Vision & Image Processing',
        description: 'Master computer vision techniques from image classification to object detection.',
        level: 'Intermediate',
        duration: '10 weeks',
        lessons: 40,
        students: 745,
        rating: 4.8,
        price: '$379',
        image: '/courses/computer-vision.jpg',
        gradient: 'from-indigo-600 to-purple-600',
        topics: ['OpenCV', 'YOLO', 'Image Segmentation', 'Face Recognition', 'OCR'],
    },
    {
        id: 6,
        title: 'Natural Language Processing',
        description: 'Process and understand human language with state-of-the-art NLP techniques.',
        level: 'Advanced',
        duration: '12 weeks',
        lessons: 48,
        students: 589,
        rating: 4.7,
        price: '$429',
        image: '/courses/nlp.jpg',
        gradient: 'from-pink-600 to-rose-600',
        topics: ['NLTK', 'spaCy', 'BERT', 'Sentiment Analysis', 'Named Entity Recognition'],
    },
];

export default function CoursesPage() {
    const [selectedLevel, setSelectedLevel] = useState<string>('All');
    const router = useRouter();

    const filteredCourses = selectedLevel === 'All'
        ? courses
        : courses.filter(course => course.level === selectedLevel);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-background via-secondary/20 to-background overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">AI & ML</span> Skills
                        </h1>
                        <p className="text-xl text-foreground/70 mb-8">
                            Learn from industry experts with hands-on projects, real-world applications, and lifetime access to course materials.
                        </p>

                        {/* Filter */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Filter className="w-5 h-5 text-foreground/60" />
                            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedLevel === level
                                            ? 'bg-primary text-white'
                                            : 'bg-secondary text-foreground/70 hover:bg-secondary/80'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-16 container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <div
                            key={course.id}
                            className="group relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
                        >
                            {/* Image/Gradient Header */}
                            <div className={`h-48 bg-gradient-to-br ${course.gradient} relative`}>
                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white text-xs font-medium">
                                    {course.level}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BookOpen className="w-16 h-16 text-white/80" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm line-clamp-2">{course.description}</p>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {course.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        {course.lessons} lessons
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                        {course.rating}
                                    </div>
                                </div>

                                {/* Topics */}
                                <div className="flex flex-wrap gap-2">
                                    {course.topics.slice(0, 3).map(topic => (
                                        <span key={topic} className="px-2 py-1 text-xs rounded bg-slate-800 text-gray-300">
                                            {topic}
                                        </span>
                                    ))}
                                    {course.topics.length > 3 && (
                                        <span className="px-2 py-1 text-xs rounded bg-slate-800 text-gray-300">
                                            +{course.topics.length - 3} more
                                        </span>
                                    )}
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div>
                                        <div className="text-2xl font-bold text-white">{course.price}</div>
                                        <div className="text-xs text-gray-400">{course.students} students</div>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => router.push(`/academy/dashboard`)}
                                        className="bg-primary hover:bg-primary/90"
                                    >
                                        Enroll Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary/10 to-purple-600/10">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Start Learning Today
                        </h2>
                        <p className="text-xl text-foreground/70 mb-8">
                            Join thousands of students mastering AI and ML with our comprehensive courses.
                        </p>
                        <Button
                            size="lg"
                            onClick={() => router.push('/academy/dashboard')}
                            className="rounded-full bg-primary hover:bg-primary/90"
                        >
                            Browse All Courses
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
