'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export interface ClassScheduleData {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  duration: number;
  className: string;
  trainer: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  capacity: number;
  spotsLeft?: number;
}

export interface ClassScheduleProps {
  classes: ClassScheduleData[];
  view?: 'table' | 'accordion';
  highlightCurrent?: boolean;
}

const ClassSchedule: React.FC<ClassScheduleProps> = ({
  classes,
  view,
  highlightCurrent = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedDay, setExpandedDay] = useState<string | null>('Monday');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayView = view || (isMobile ? 'accordion' : 'table');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getClassesForDay = (day: string) => {
    return classes
      .filter(c => c.day === day)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const isCurrentClass = (classData: ClassScheduleData) => {
    if (!highlightCurrent) return false;
    const now = new Date();
    const currentDay = days[now.getDay() === 0 ? 6 : now.getDay() - 1];
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [hours, minutes] = classData.time.split(':').map(Number);
    const classTime = hours * 60 + minutes;

    return classData.day === currentDay &&
           currentTime >= classTime &&
           currentTime < classTime + classData.duration;
  };

  const isPastClass = (classData: ClassScheduleData) => {
    if (!highlightCurrent) return false;
    const now = new Date();
    const currentDay = days[now.getDay() === 0 ? 6 : now.getDay() - 1];
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [hours, minutes] = classData.time.split(':').map(Number);
    const classTime = hours * 60 + minutes;

    return classData.day === currentDay && currentTime > classTime + classData.duration;
  };

  const ClassCard = ({ classData }: { classData: ClassScheduleData }) => {
    const isCurrent = isCurrentClass(classData);
    const isPast = isPastClass(classData);
    const isFull = classData.spotsLeft === 0;
    const isAlmostFull = classData.spotsLeft && classData.spotsLeft < 5;

    return (
      <div
        className={`
          p-4 border-2 transition-all duration-300
          ${isCurrent ? 'border-blood-red bg-blood-red/10 animate-pulse' : 'border-burgundy-primary'}
          ${isPast ? 'opacity-50' : ''}
          ${isFull ? 'bg-burgundy-dark/30' : 'bg-cream-light/50'}
        `}
      >
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-[family-name:var(--font-ui)] text-base font-semibold uppercase tracking-wide">
                {classData.time}
              </p>
              <h4 className={`font-[family-name:var(--font-display)] text-lg uppercase ${isFull ? 'line-through' : ''}`}>
                {classData.className}
              </h4>
            </div>
            <span className={`text-xs px-2 py-1 border ${
              classData.difficulty === 'Beginner' ? 'border-green-600 text-green-600' :
              classData.difficulty === 'Advanced' ? 'border-blood-red text-blood-red' :
              'border-burgundy-primary text-burgundy-primary'
            }`}>
              {classData.difficulty}
            </span>
          </div>

          <p className="text-sm">
            <span className="font-semibold">Trainer:</span> {classData.trainer}
          </p>

          <p className={`text-sm font-semibold ${
            isFull ? 'text-blood-red' :
            isAlmostFull ? 'text-orange-600' :
            'text-charcoal-black'
          }`}>
            {isFull ? 'FULL' :
             classData.spotsLeft ? `${classData.spotsLeft} spots left` :
             'Unlimited'}
          </p>

          <Button
            variant={isFull ? 'outline' : 'secondary'}
            size="sm"
            disabled={isFull}
            className="w-full"
          >
            {isFull ? 'Join Waitlist' : 'Book Now'}
          </Button>
        </div>
      </div>
    );
  };

  if (displayView === 'accordion') {
    return (
      <div role="region" aria-label="Class schedule by day" className="space-y-4">
        {days.map(day => {
          const dayClasses = getClassesForDay(day);
          const isExpanded = expandedDay === day;

          return (
            <div key={day} className="border-2 border-burgundy-primary">
              <button
                onClick={() => setExpandedDay(isExpanded ? null : day)}
                aria-expanded={isExpanded}
                aria-controls={`${day}-classes`}
                className="w-full p-4 font-[family-name:var(--font-display)] text-xl uppercase tracking-wider text-left bg-burgundy-primary text-cream-primary hover:bg-burgundy-light transition-colors duration-300 flex justify-between items-center"
              >
                {day}
                <span className="text-2xl">{isExpanded ? '▼' : '▶'}</span>
              </button>

              {isExpanded && (
                <div id={`${day}-classes`} className="p-4 space-y-4 bg-cream-primary">
                  {dayClasses.length > 0 ? (
                    dayClasses.map(classData => (
                      <ClassCard key={classData.id} classData={classData} />
                    ))
                  ) : (
                    <p className="text-center text-charcoal-black py-8">Rest Day - No classes scheduled</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Table view
  return (
    <div className="overflow-x-auto">
      <table role="table" aria-label="Weekly class schedule" className="w-full border-collapse">
        <thead>
          <tr>
            {days.map(day => (
              <th
                key={day}
                scope="col"
                className="p-3 border-2 border-burgundy-primary bg-burgundy-primary text-cream-primary font-[family-name:var(--font-display)] text-lg uppercase tracking-wider sticky top-0"
              >
                {day.substring(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {days.map(day => {
              const dayClasses = getClassesForDay(day);
              return (
                <td
                  key={day}
                  className="p-2 border-2 border-burgundy-primary bg-cream-light align-top min-w-[180px]"
                >
                  {dayClasses.length > 0 ? (
                    <div className="space-y-2">
                      {dayClasses.map(classData => (
                        <ClassCard key={classData.id} classData={classData} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-charcoal-black/50 py-4">Rest Day</p>
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClassSchedule;
