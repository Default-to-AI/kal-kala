import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

export interface ExerciseStep {
  title: string;
  content: React.ReactNode;
  solution: React.ReactNode;
}

export interface StepByStepExerciseProps {
  questionTitle: string;
  questionContent: React.ReactNode;
  steps: ExerciseStep[];
}

export const StepByStepExercise: React.FC<StepByStepExerciseProps> = ({
  questionTitle,
  questionContent,
  steps,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(curr => curr + 1);
      setShowSolution(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
      setShowSolution(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setShowSolution(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-lg">
      <div className="bg-[var(--color-surface-alt)] p-6 border-b border-[var(--color-border)]">
        <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">{questionTitle}</h3>
        <div className="text-[var(--color-text-secondary)] text-sm prose prose-sm max-w-none prose-invert">
          {questionContent}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-8 bg-[var(--color-primary)]' : 
                  idx < currentStep ? 'w-4 bg-[var(--color-success)]' : 'w-4 bg-[var(--color-surface-alt)] border border-[var(--color-border)]'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-[var(--color-text-tertiary)]">
            שלב {currentStep + 1} מתוך {steps.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[250px]"
          >
            <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
              {steps[currentStep].title}
            </h4>
            
            <div className="mb-6 text-[var(--color-text)] text-sm">
              {steps[currentStep].content}
            </div>

            {!showSolution ? (
              <div className="flex justify-center my-8">
                <Button 
                  onClick={() => setShowSolution(true)} 
                  variant="primary"
                  className="shadow-lg shadow-[var(--color-primary)]/20"
                >
                  הצג פתרון
                </Button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 border-t border-dashed border-[var(--color-border)] pt-6"
              >
                <div className="bg-[var(--color-success)]/10 text-[var(--color-success)] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 mb-4">
                  <Check className="w-3 h-3" />
                  פתרון
                </div>
                {steps[currentStep].solution}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-[var(--color-surface-alt)] p-4 border-t border-[var(--color-border)] flex justify-between items-center">
        <Button 
          variant="secondary" 
          onClick={handlePrev} 
          disabled={currentStep === 0}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          לשלב הקודם
        </Button>

        {isLastStep && showSolution ? (
          <Button variant="primary" onClick={reset} rightIcon={<RefreshCcw className="w-4 h-4" />}>
            התחל מחדש
          </Button>
        ) : (
          <Button 
            variant="primary" 
            onClick={handleNext}
            disabled={!showSolution && !isLastStep}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            {isLastStep ? 'סיום' : 'לשלב הבא'}
          </Button>
        )}
      </div>
    </div>
  );
};
