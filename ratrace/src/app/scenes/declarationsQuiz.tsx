"use client";

import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  rectIntersection,
  pointerWithin,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import ComputerOn from '../images/computer_on.png';

// Types for our quiz items
interface QuizItem {
  id: string;
  text: string;
  correctPosition: { x: number; y: number };
  currentPosition?: { x: number; y: number };
}

interface DropZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface DeclarationsQuizProps {
  onDialogueData?: (data: any) => void;
}

// Draggable Item Component
const DraggableItem = ({ item, isActive }: { item: QuizItem; isActive?: boolean }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-blue-500 text-white px-3 py-2 rounded-lg cursor-grab shadow-lg
        ${isDragging ? 'cursor-grabbing' : ''}
        ${isActive ? 'ring-2 ring-blue-300' : ''}
        hover:bg-blue-600 transition-colors
      `}
    >
      {item.text}
    </div>
  );
};

// Drop Zone Component
const DropZone = ({ zone, isOver }: { zone: DropZone; isOver: boolean }) => {
  return (
    <div
      className={`
        absolute border-2 border-dashed rounded-lg flex items-center justify-center
        ${isOver ? 'border-green-500 bg-green-100' : 'border-gray-400 bg-gray-100'}
        transition-colors
      `}
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.width}%`,
        height: `${zone.height}%`,
      }}
    >
      <span className="text-xs text-gray-600 text-center px-2">
        {zone.label}
      </span>
    </div>
  );
};

const DeclarationsQuiz = ({ onDialogueData }: DeclarationsQuizProps) => {
  const [gameState, setGameState] = useState<'start' | 'quiz' | 'end'>('start');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  // Quiz items to drag - organized by page
  const [quizItems] = useState<Record<number, QuizItem[]>>({
    1: [
      {
        id: '1',
        text: 'Member ID Number',
        correctPosition: { x: -1, y: 19 },
      },
      {
        id: '2',
        text: 'Member Name',
        correctPosition: { x: -1, y: 34 },
      },
      {
        id: '3',
        text: 'Group Number',
        correctPosition: { x: -1, y: 56 },
      },
      {
        id: '4',
        text: 'PCP Info',
        correctPosition: { x: -1, y: 78 },
      },
      {
        id: '5',
        text: 'Plan Type',
        correctPosition: { x: 71, y: 19 },
      },
      {
        id: '6',
        text: 'PCP Co-Pay',
        correctPosition: { x: 71, y: 37 },
      },
      {
        id: '7',
        text: 'Specialty Co-Pay',
        correctPosition: { x: 71, y: 47 },
      },
      {
        id: '8',
        text: 'Emergency Co-Pay',
        correctPosition: { x: 71, y: 57 },
      },
      {
        id: '9',
        text: 'Prescription Plan Info',
        correctPosition: { x: 71, y: 69 },
      },
    ],
    2: [
      {
        id: '10',
        text: 'Plan Website',
        correctPosition: { x: 71, y: 23 },
      },
      {
        id: '11',
        text: 'In-Network Deductible',
        correctPosition: { x: 71, y: 34 },
      },
      {
        id: '12',
        text: 'Out-of-Network Deductible',
        correctPosition: { x: 71, y: 49 },
      },
      {
        id: '13',
        text: 'Plan Contact Info',
        correctPosition: { x: 71, y: 63 },
      },
    ],
  });

  // Drop zones organized by page
  const [dropZones] = useState<Record<number, DropZone[]>>({
    1: [
      {
        id: '1',
        x: -1,
        y: 19,
        width: 6,
        height: 8,
        label: '1',
      },
      {
        id: '2',
        x: -1,
        y: 34,
        width: 6,
        height: 8,
        label: '2',
      },
      {
        id: '3',
        x: -1,
        y: 56,
        width: 6,
        height: 8,
        label: '3',
      },
      {
        id: '4',
        x: -1,
        y: 78,
        width: 6,
        height: 8,
        label: '4',
      },
      {
        id: '5',
        x: 71,
        y: 19,
        width: 6,
        height: 8,
        label: '5',
      },
      {
        id: '6',
        x: 71,
        y: 37,
        width: 6,
        height: 8,
        label: '6',
      },
      {
        id: '7',
        x: 71,
        y: 47,
        width: 6,
        height: 8,
        label: '7',
      },
      {
        id: '8',
        x: 71,
        y: 57,
        width: 6,
        height: 8,
        label: '8',
      },
      {
        id: '9',
        x: 71,
        y: 69,
        width:6,
        height: 8,
        label: '9',
      },
    ],
    2: [
      {
        id: '10',
        x: 71,
        y: 23,
        width: 6,
        height: 8,
        label: '10',
      },
      {
        id: '11',
        x: 71,
        y: 34,
        width: 6,
        height: 8,
        label: '11',
      },
      {
        id: '12',
        x: 71,
        y: 49,
        width: 6,
        height: 8,
        label: '12',
      },
      {
        id: '13',
        x: 71,
        y: 63,
        width: 6,
        height: 8,
        label: '13',
      },
    ],
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<Record<string, QuizItem>>({});
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Calculate total questions on component mount
  React.useEffect(() => {
    const total = Object.values(quizItems).reduce((sum, items) => sum + items.length, 0);
    setTotalQuestions(total);
  }, [quizItems]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    const currentDropZones = dropZones[currentPage] || [];
    const currentQuizItems = quizItems[currentPage] || [];

    if (over && currentDropZones.find(zone => zone.id === over.id)) {
      const item = currentQuizItems.find(item => item.id === active.id);
      const zone = currentDropZones.find(zone => zone.id === over.id);
      
      if (item && zone) {
        setDroppedItems(prev => ({
          ...prev,
          [zone.id]: item,
        }));
      }
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;

    // Simple scoring: check if item.id matches zone.id
    Object.entries(droppedItems).forEach(([zoneId, item]) => {
      if (zoneId === item.id) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setIsCompleted(true);
    setGameState('end');
  };  const resetQuiz = () => {
    setDroppedItems({});
    setScore(0);
    setIsCompleted(false);
    setCurrentPage(1);
    setGameState('quiz');
  };

  const handleQuizComplete = () => {
    setGameState('end');
  };

  const currentQuizItems = quizItems[currentPage] || [];
  const currentDropZones = dropZones[currentPage] || [];
  
  const availableItems = currentQuizItems.filter(item => 
    !Object.values(droppedItems).find(dropped => dropped.id === item.id)
  );

  if (gameState === 'start') {
    return (
      <div className="w-full h-auto relative flex justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md text-center mb-70">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Insurance Card Quiz</h1>
          <p className="text-gray-600 mb-6">
            Interns, thank you for testing our new online assessment tool! This quiz will cover the key components of an Insurance
            card. It consists of {totalQuestions} questions across {totalPages} pages. Be sure to:
          </p>
          <div className="mb-6 text-sm text-gray-500">
            <p>• Read the card carefully, there is no time limit!</p>
            <p>• Drag items to the correct locations</p>
            <p>• Submit when you're done!</p>
          </div>
          <button
            onClick={() => setGameState('quiz')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg"
          >
            Start Quiz
          </button>
        </div>
        <Image src={ComputerOn} alt="Computer On" className="z-[-1] absolute bottom-[-55vh] -left-10 w-[100vw] h-auto scale-[1.2]" />
      </div>
    );
  }

  // End Screen
  if (gameState === 'end') {
    const finalScore = Math.round((score / totalQuestions) * 100);
    
    let performance = '';
    let performanceColor = '';
    if (finalScore >= 90) {
      performance = 'Excellent! 🏆';
      performanceColor = 'text-green-600';
    } else if (finalScore >= 70) {
      performance = 'Good job! 👍';
      performanceColor = 'text-blue-600';
    } else if (finalScore >= 50) {
      performance = 'Not bad! 📚';
      performanceColor = 'text-yellow-600';
    } else {
      performance = 'Keep practicing! 💪';
      performanceColor = 'text-red-600';
    }

    return (
      <div className="w-full h-auto relative flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md text-center mb-65">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>
          
          <div className="mb-6">
            <div className="text-6xl font-bold mb-2 text-blue-600">{finalScore}%</div>
            <div className={`text-xl font-semibold mb-4 ${performanceColor}`}>{performance}</div>
            
            <div className="text-gray-600 mb-4">
              <p>You got {score} out of {totalQuestions} questions correct</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Try Again
            </button>
            {onDialogueData && (
              <button
                onClick={() => {
                  // Send final results back to main game
                  let karmaPoints = 0, salesPoints = 0, socialPoints = 0;
                  
                  if (finalScore >= 90) {
                    karmaPoints = 2;
                    salesPoints = 3;
                    socialPoints = 1;
                  } else if (finalScore >= 70) {
                    karmaPoints = 1;
                    salesPoints = 2;
                    socialPoints = 1;
                  } else if (finalScore >= 60) {
                    karmaPoints = 1;
                    salesPoints = 2;
                    socialPoints = 0;
                  } else {
                    karmaPoints = -1;
                    salesPoints = 0;
                    socialPoints = -1;
                  }

                  onDialogueData({
                    type: 'completed',
                    score: finalScore,
                    karma: karmaPoints,
                    social: socialPoints,
                    sales: salesPoints,
                  });
                }}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
              >
                Continue Game
              </button>
            )}
          </div>
        </div>
        <Image src={ComputerOn} alt="Computer On" className="z-[-1] absolute bottom-[-55vh] -left-10 w-[100vw] h-auto scale-[1.2]" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* PDF/Image Background */}
        <div className="relative top-6 -left-10 w-[50%] h-[60%] mx-auto" style={{ maxWidth: '750px', aspectRatio: '8.5/11' }}>
          {/* PDF Image - Current Page */}
          <Image
            src={`/insurance-card-${currentPage}.png`}
            alt={`Insurance Declaration Form - Page ${currentPage}`}
            fill
            className="object-contain pr-40"
          />
          
          {/* Page Navigation */}
          <div className="absolute -bottom-1 left-2 text-black px-2 py-1 rounded text-xs">
            <div className="mt-4 flex justify-between">
                <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed mr-2"
                >
                ← Prev
                </button>
                <span className="text-sm self-center">
                {currentPage}/{totalPages}
                </span>
                <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="ml-2 px-3 py-1 bg-gray-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                Next →
            </button>
            </div>
          </div>
          
          {/* Drop Zones for Current Page */}
          {currentDropZones.map(zone => (
            <DropZone
              key={zone.id}
              zone={zone}
              isOver={activeId !== null}
            />
          ))}

          {/* Dropped Items for Current Page */}
          {Object.entries(droppedItems).map(([zoneId, item]) => {
            const zone = currentDropZones.find(z => z.id === zoneId);
            if (!zone) return null;
            
            return (
              <div
                key={`${zoneId}-${item.id}`}
                className="absolute bg-blue-500 text-white px-2 py-1 rounded text-sm"
                style={{
                  left: `${zone.x + 1}%`,
                  top: `${zone.y + 1}%`,
                }}
              >
                {item.text}
              </div>
            );
          })}
        </div>

        {/* Draggable Items Panel */}
        <div className="absolute right-76 top-14 w-70 p-4">
          <h3 className="font-bold mb-2 text-lg">Drag these items:</h3>
          <SortableContext items={availableItems.map(item => item.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {availableItems.map(item => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </div>

        <div className="absolute right-90 top-90 w-48 p-4">
            <div className="mt-3 space-y-2">
              <button
                onClick={checkAnswers}
                disabled={Object.keys(droppedItems).length < totalQuestions}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-xs font-bold"
              >
                Check All Answers
              </button>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <DraggableItem
              item={currentQuizItems.find(item => item.id === activeId)!}
              isActive
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <Image src={ComputerOn} alt="Computer On" className="z-[-1] absolute bottom-[-55vh] -left-10 w-[100vw] h-auto scale-[1.2]" />
    </div>
  );
};

export default DeclarationsQuiz;
