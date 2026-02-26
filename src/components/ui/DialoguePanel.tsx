// ============================================================
// INNER WORLDS – Dialogue Panel
// Typewriter effect, speaker portraits, emotion indicators
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import type { DialogueLine, SceneChoice } from '@/types/game';

interface Props {
  lines: DialogueLine[];
  choices?: SceneChoice[];
  onComplete: () => void;
  onChoiceSelected?: (choice: SceneChoice) => void;
  isShadowSelf?: boolean;
}

export default function DialoguePanel({
  lines,
  choices = [],
  onComplete,
  onChoiceSelected,
  isShadowSelf = false,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);

  const currentLine = lines[currentIndex];

  // Typewriter effect
  useEffect(() => {
    if (!currentLine) return;

    setDisplayedText('');
    setIsTyping(true);

    const text = currentLine.text;
    let charIndex = 0;

    const timer = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30); // Typing speed

    return () => clearInterval(timer);
  }, [currentIndex, currentLine]);

  const handleAdvance = useCallback(() => {
    if (isTyping) {
      // Skip typing animation
      setDisplayedText(currentLine.text);
      setIsTyping(false);
      return;
    }

    if (currentIndex < lines.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (choices.length > 0) {
      setShowChoices(true);
    } else {
      onComplete();
    }
  }, [isTyping, currentIndex, lines.length, choices.length, currentLine, onComplete]);

  const handleChoice = (choice: SceneChoice) => {
    setShowChoices(false);
    onChoiceSelected?.(choice);
  };

  if (!currentLine) return null;

  const isShadow = currentLine.isSchattenSelbst;
  const isCompanion = currentLine.isCompanion;

  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center pointer-events-none">
      {/* Darkened background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 pointer-events-auto ${
          isShadowSelf ? 'bg-black/70' : 'bg-black/40'
        }`}
        onClick={handleAdvance}
      />

      {/* Dialogue box */}
      <div className="relative w-full max-w-3xl mx-4 mb-8 pointer-events-auto animate-slide-in-up">
        {/* Shadow Self glitch effect */}
        {isShadow && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-purple-900/20 rounded-2xl animate-glitch" />
        )}

        <div
          className={`rounded-2xl p-6 backdrop-blur-md border ${
            isShadow
              ? 'bg-gray-950/90 border-white/10'
              : isCompanion
                ? 'bg-amber-950/80 border-amber-500/30'
                : 'bg-gray-900/90 border-white/10'
          }`}
          onClick={handleAdvance}
        >
          {/* Speaker name */}
          <div className="flex items-center gap-3 mb-3">
            {/* Emotion indicator */}
            {currentLine.emotion && (
              <span className="text-xl">
                {currentLine.emotion === 'freude' && '😊'}
                {currentLine.emotion === 'trauer' && '😢'}
                {currentLine.emotion === 'wut' && '😠'}
                {currentLine.emotion === 'angst' && '😰'}
              </span>
            )}
            <span
              className={`font-bold text-sm ${
                isShadow
                  ? 'text-white/60'
                  : isCompanion
                    ? 'text-amber-400'
                    : 'text-indigo-400'
              }`}
            >
              {currentLine.sprecher}
            </span>
            {isShadow && (
              <span className="text-xs text-red-400/60 ml-auto">Schatten-Selbst</span>
            )}
          </div>

          {/* Text */}
          <p
            className={`text-lg leading-relaxed ${
              isShadow ? 'text-white/80 italic' : 'text-white/90'
            }`}
          >
            {displayedText}
            {isTyping && <span className="animate-pulse ml-1">|</span>}
          </p>

          {/* Continue indicator */}
          {!isTyping && !showChoices && (
            <div className="flex justify-end mt-3">
              <span className="text-white/30 text-sm animate-pulse">
                Klicke zum Weiterlesen...
              </span>
            </div>
          )}

          {/* Progress dots */}
          <div className="flex justify-center gap-1 mt-3">
            {lines.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === currentIndex
                    ? 'bg-white/60'
                    : i < currentIndex
                      ? 'bg-white/20'
                      : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Choice Panel */}
        {showChoices && (
          <div className="mt-4 space-y-2 animate-fade-in">
            {choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="w-full text-left px-6 py-4 bg-gray-800/90 backdrop-blur-sm border border-white/10 rounded-xl text-white/90 hover:bg-indigo-900/60 hover:border-indigo-500/30 transition-all group"
              >
                <p className="font-medium">{choice.text}</p>
                {/* Subtle skill hint */}
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {Object.entries(choice.skillEffects).map(([skill, points]) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/50"
                    >
                      {skill} +{points}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
