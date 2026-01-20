'use client';

import { useState } from 'react';
import { Module, Lesson } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, GripVertical, Video, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { createModule, createLesson } from '@/app/actions/academy';
import { useRouter } from 'next/navigation';

type CourseWithRelations = {
    id: string;
    modules: (Module & { lessons: Lesson[] })[];
};

export function CourseOutline({ course }: { course: CourseWithRelations }) {
    const router = useRouter();
    const [newModuleTitle, setNewModuleTitle] = useState("");
    const [addingModule, setAddingModule] = useState(false);

    const handleAddModule = async () => {
        if (!newModuleTitle) return;
        await createModule(course.id, newModuleTitle);
        setNewModuleTitle("");
        setAddingModule(false);
        router.refresh();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Curriculum</h2>
                <Button variant="outline" size="sm" onClick={() => setAddingModule(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Module
                </Button>
            </div>

            {addingModule && (
                <Card className="border-dashed border-2">
                    <CardContent className="p-4 flex gap-2">
                        <Input
                            placeholder="Module Title (e.g., Introduction)"
                            value={newModuleTitle}
                            onChange={e => setNewModuleTitle(e.target.value)}
                        />
                        <Button onClick={handleAddModule}>Save</Button>
                        <Button variant="ghost" onClick={() => setAddingModule(false)}>Cancel</Button>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                {course.modules.length === 0 && !addingModule && (
                    <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                        No modules yet. Start by adding one.
                    </div>
                )}

                {course.modules.map((module) => (
                    <ModuleItem key={module.id} module={module} />
                ))}
            </div>
        </div>
    );
}

function ModuleItem({ module }: { module: Module & { lessons: Lesson[] } }) {
    const router = useRouter();
    const [addingLesson, setAddingLesson] = useState(false);
    const [lessonTitle, setLessonTitle] = useState("");

    const handleAddLesson = async () => {
        if (!lessonTitle) return;
        await createLesson(module.id, lessonTitle);
        setLessonTitle("");
        setAddingLesson(false);
        router.refresh();
    };

    return (
        <Card>
            <CardHeader className="py-3 px-4 bg-secondary/20 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2 font-medium">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    {module.title}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setAddingLesson(true)}>
                    <Plus className="h-3 w-3 mr-1" /> Lesson
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y">
                    {module.lessons.map(lesson => (
                        <div key={lesson.id} className="flex items-center gap-3 p-3 pl-8 hover:bg-secondary/10 transition-colors">
                            <div className="p-1.5 bg-secondary rounded">
                                <Video className="h-3 w-3 text-muted-foreground" />
                            </div>
                            <span className="text-sm">{lesson.title}</span>
                        </div>
                    ))}
                    {module.lessons.length === 0 && !addingLesson && (
                        <div className="p-3 pl-8 text-xs text-muted-foreground italic">Empty module</div>
                    )}
                    {addingLesson && (
                        <div className="p-3 pl-8 flex gap-2">
                            <Input
                                className="h-8 text-sm"
                                placeholder="Lesson Title"
                                autoFocus
                                value={lessonTitle}
                                onChange={e => setLessonTitle(e.target.value)}
                            />
                            <Button size="sm" onClick={handleAddLesson}>Add</Button>
                            <Button variant="ghost" size="sm" onClick={() => setAddingLesson(false)}>X</Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
