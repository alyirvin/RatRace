"use client";

import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
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
        correctPosition: { x: -1, y: 80 },
      },
      {
        id: '5',
        text: 'Plan Type',
        correctPosition: { x: 69, y: 17 },
      },
      {
        id: '6',
        text: 'PCP Co-Pay',
        correctPosition: { x: 69, y: 37 },
      },
      {
        id: '7',
        text: 'Specialty Co-Pay',
        correctPosition: { x: 69, y: 47 },
      },
      {
        id: '8',
        text: 'Emergency Co-Pay',
        correctPosition: { x: 69, y: 57 },
      },
      {
        id: '9',
        text: 'Prescription Plan Info',
        correctPosition: { x: 69, y: 71 },
      },
    ],
    2: [
      {
        id: '10',
        text: 'Plan Website',
        correctPosition: { x: 69, y: 22 },
      },
      {
        id: '11',
        text: 'In-Network Deductible',
        correctPosition: { x: 69, y: 32 },
      },
      {
        id: '12',
        text: 'Out-of-Network Deductible',
        correctPosition: { x: 69, y: 49 },
      },
      {
        id: '13',
        text: 'Plan Contact Info',
        correctPosition: { x: 69, y: 63 },
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
        y: 80,
        width: 6,
        height: 8,
        label: '4',
      },
      {
        id: '5',
        x: 69,
        y: 17,
        width: 6,
        height: 8,
        label: '5',
      },
      {
        id: '6',
        x: 69,
        y: 37,
        width: 6,
        height: 8,
        label: '6',
      },
      {
        id: '7',
        x: 69,
        y: 47,
        width: 6,
        height: 8,
        label: '7',
      },
      {
        id: '8',
        x: 69,
        y: 57,
        width: 6,
        height: 8,
        label: '8',
      },
      {
        id: '9',
        x: 69,
        y: 71,
        width:6,
        height: 8,
        label: '9',
      },
    ],
    2: [
      {
        id: '10',
        x: 69,
        y: 22,
        width: 6,
        height: 8,
        label: '10',
      },
      {
        id: '11',
        x: 69,
        y: 32,
        width: 6,
        height: 8,
        label: '11',
      },
      {
        id: '12',
        x: 69,
        y: 49,
        width: 6,
        height: 8,
        label: '12',
      },
      {
        id: '13',
        x: 69,
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
    let totalQuestions = 0;

    // Count total questions across all pages
    Object.values(quizItems).forEach(pageItems => {
      totalQuestions += pageItems.length;
    });

    // Check each dropped item
    Object.entries(droppedItems).forEach(([zoneId, item]) => {
      // Enhanced check for multi-page items
      const isCorrect = (
        (zoneId === 'name-field-p1' && item.id === 'name-p1') ||
        (zoneId === 'date-field-p1' && item.id === 'date-p1') ||
        (zoneId === 'amount-field-p2' && item.id === 'amount-p2') ||
        (zoneId === 'policy-field-p2' && item.id === 'policy-p2') ||
        (zoneId === 'signature-field-p3' && item.id === 'signature-p3') ||
        (zoneId === 'witness-field-p3' && item.id === 'witness-p3')
      );
      
      if (isCorrect) correctCount++;
    });

    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    setScore(finalScore);
    setIsCompleted(true);

    // Send results back to parent
    if (onDialogueData) {
      let karmaPoints = 0;
      let socialPoints = 0;
      let salesPoints = 0;

      // Score-based rewards
      if (finalScore >= 80) {
        karmaPoints = 2;
        salesPoints = 3;
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
    }
  };

  const resetQuiz = () => {
    setDroppedItems({});
    setScore(0);
    setIsCompleted(false);
  };

  const currentQuizItems = quizItems[currentPage] || [];
  const currentDropZones = dropZones[currentPage] || [];
  
  const availableItems = currentQuizItems.filter(item => 
    !Object.values(droppedItems).find(dropped => dropped.id === item.id)
  );

  return (
    <div className="w-full h-screen relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* PDF/Image Background */}
        <div className="relative top-17 left-9 w-[45%] h-[50%] mx-auto" style={{ maxWidth: '750px', aspectRatio: '8.5/11' }}>
          {/* PDF Image - Current Page */}
          <Image
            src={`/insurance-card-${currentPage}.png`}
            alt={`Insurance Declaration Form - Page ${currentPage}`}
            fill
            className="object-contain pr-40"
          />
          
          {/* Page Navigation */}
          <div className="absolute -bottom-2 left-2 text-black px-2 py-1 rounded text-xs">
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
        <div className="absolute right-90 top-18 w-48 p-4">
          <h3 className="font-bold mb-2">Drag these items:</h3>
          <SortableContext items={availableItems.map(item => item.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-2 text-[0.6rem]">
              {availableItems.map(item => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </div>

        <div className="absolute right-90 top-90 w-48 p-4">
            <div className="mt-3 space-y-2">
            {!isCompleted ? (
              <button
                onClick={checkAnswers}
                disabled={Object.keys(droppedItems).length === 0}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-xs font-bold"
              >
                Check All Answers
              </button>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Score: {score}%</div>
                <button
                  onClick={resetQuiz}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            )}
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
