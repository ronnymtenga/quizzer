import React, { useState, useEffect } from 'react';
import questions from './questions_answers_explanation'; // Make sure this file exists and is correct!
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Dynamically derive sections from the questions object
const SECTIONS = Object.keys(questions);
const MODES = { LEARN: 'learn', TEST: 'test' };

// --- Question Type Groups ---
const SELF_GRADED_SECTIONS = ['shortAnswer', 'fillInTheBlanks', 'scenarioAnalysis', 'problemSolving'];
const MULTIPLE_CHOICE_SECTIONS = ['multipleChoice', 'matching'];

 /* A robust, unbiased shuffle algorithm (Fisher-Yates).
 * Ensures uniform randomization of array elements.
 */
function shuffleArray(array) {
  if (!array) return [];
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
  }
  return shuffled;
}

/**
 * Calculates the Levenshtein distance between two strings.
 * Used for fuzzy matching.
 */
function levenshteinDistance(s1, s2) {
  s1 = String(s1);
  s2 = String(s2);
  const m = s1.length;
  const n = s2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
}

/**
 * Performs a fuzzy match between two strings based on Levenshtein distance.
 * Returns true if similarity is above a given threshold.
 */
function calculateFuzzyMatch(userAnswer, correctAnswer, threshold = 0.9) {
  if (!userAnswer && !correctAnswer) return true; // Both empty, consider match
  if (!userAnswer || !correctAnswer) return false; // One empty, one not

  // Normalize strings: lowercase, remove non-alphanumeric except spaces, then trim and reduce multiple spaces
  const normalize = (str) => String(str).toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  
  const normalizedUser = normalize(userAnswer);
  const normalizedCorrect = normalize(correctAnswer);

  if (normalizedCorrect.length === 0) return normalizedUser.length === 0;

  const dist = levenshteinDistance(normalizedUser, normalizedCorrect);
  const maxLength = Math.max(normalizedUser.length, normalizedCorrect.length);

  // If max length is 0 (both empty after normalization), consider it a match
  if (maxLength === 0) return true;

  const similarity = (maxLength - dist) / maxLength;
  return similarity >= threshold;
}

// A simple Icon component for visual feedback
const Icon = ({ type }) => (
  <span className={`flex-shrink-0 inline-block w-6 h-6 rounded-full text-white text-center font-bold leading-6 ${type === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
    {type === 'correct' ? '✓' : '✗'}
  </span>
);

export default function QuizGame() {
  if (!questions || SECTIONS.length === 0) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="text-gray-600 mt-2">Could not load questions. Please check the `questions_answers_explanation.js` file.</p>
        </div>
    );
  }

  const defaultCount = Object.fromEntries(
    SECTIONS.map(key => [key, Math.min(5, questions[key]?.length || 0)])
  );

  const [mode, setMode] = useState(null);
  const [timed, setTimed] = useState(false);
  const [timeLimit, setTimeLimit] = useState(10);
  const [numQuestions, setNumQuestions] = useState(defaultCount);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [testQuestions, setTestQuestions] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selfGrades, setSelfGrades] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    if (mode === MODES.TEST) {
      const sample = {};
      SECTIONS.forEach(sec => {
        if(numQuestions[sec] > 0) {
            sample[sec] = shuffleArray(questions[sec]).slice(0, numQuestions[sec]);
        }
      });
      setTestQuestions(sample);
      if (timed) setTimerStarted(true);
      setTimeLeft(timeLimit * 60);
    }
  }, [mode, timed, numQuestions, timeLimit]);

  useEffect(() => {
    let timer;
    if (timed && timerStarted && timeLeft > 0 && !submitted) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && timed && mode === MODES.TEST && !submitted) {
      setSubmitted(true);
    }
    return () => clearInterval(timer);
  }, [timed, timerStarted, timeLeft, submitted]);

  function resetState() {
    setShowAnswer(false);
    setAnswers({});
    setSectionIndex(0);
    setQuestionIndex(0);
    setSubmitted(false);
    setTestQuestions(null);
    setTimerStarted(false);
    setSelfGrades({});
    setActiveAccordion(null);
  }

  function handleModeSelect(selectedMode) {
    resetState();
    setMode(selectedMode);
  }

  function handleAnswerSubmit(answer) {
    const key = `${SECTIONS[sectionIndex]}-${questionIndex}`;
    setAnswers(prev => ({ ...prev, [key]: answer }));
    setShowAnswer(true);
  }

  function handleNext() {
    setShowAnswer(false);
    const activeSections = mode === MODES.TEST ? Object.keys(testQuestions) : SECTIONS;
    const sec = activeSections[sectionIndex];
    const current = mode === MODES.TEST ? testQuestions[sec] : questions[sec];

    if (questionIndex + 1 < current.length) {
      setQuestionIndex(i => i + 1);
    } else if (sectionIndex + 1 < activeSections.length) {
      setSectionIndex(i => i + 1);
      setQuestionIndex(0);
    } else {
      setSubmitted(true);
    }
  }
  
  function handlePrev() {
    setShowAnswer(false);
    if (questionIndex > 0) {
      setQuestionIndex(i => i - 1);
    } else if (sectionIndex > 0) {
      const activeSections = mode === MODES.TEST ? Object.keys(testQuestions) : SECTIONS;
      const prevSectionIndex = sectionIndex - 1;
      const prevSection = activeSections[prevSectionIndex];
      const prevSectionQuestions = mode === MODES.TEST ? testQuestions[prevSection] : questions[prevSection];
      setSectionIndex(prevSectionIndex);
      setQuestionIndex(prevSectionQuestions.length - 1);
    }
  }

  function handleExit() {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      resetState();
      setMode(null);
    }
  }
  
  function renderOptions(q) {
    const sec = SECTIONS[sectionIndex];
    const baseButtonClass = "w-full text-left p-3 border rounded-lg transition-colors duration-200";
    const hoverClass = "hover:bg-indigo-50 hover:border-indigo-300";
    const formSubmitButton = "mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100";

    if (sec === 'trueFalse') {
      return (
        <div className="space-y-3">
          {[true, false].map(val => (
            <button key={String(val)} onClick={() => handleAnswerSubmit(val)} className={`${baseButtonClass} ${hoverClass}`}>{String(val)}</button>
          ))}
        </div>
      );
    }
    
    if (MULTIPLE_CHOICE_SECTIONS.includes(sec)) {
      const isMultipleAnswer = Array.isArray(q.answer);
      return (
        <form onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const selected = isMultipleAnswer ? formData.getAll('option') : formData.get('option');
            if (!selected || selected.length === 0) {
                return;
            }
            handleAnswerSubmit(selected);
          }}>
          <div className="space-y-3">
            {q.options.map((option, idx) => (
              <label key={idx} className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer has-[:checked]:bg-indigo-100 has-[:checked]:border-indigo-400 ${hoverClass}`}>
                <input type={isMultipleAnswer ? 'checkbox' : 'radio'} name="option" value={option} className="form-input h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <button type="submit" className={formSubmitButton}>Submit Answer</button>
        </form>
      );
    }
    
    return (
      <form onSubmit={e => { e.preventDefault(); handleAnswerSubmit(new FormData(e.target).get('answer')); }}>
        <textarea name="answer" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none" rows={5} placeholder="Type your answer here..." required/>
        <button type="submit" className={formSubmitButton}>Submit Answer</button>
      </form>
    );
  }
  
  function renderResults() {
    let totalCorrect = 0;
    let totalQuestions = 0;
    const resultsBySection = {};

    Object.keys(testQuestions).forEach(sec => {
        const questionsInSection = testQuestions[sec];
        if (!questionsInSection || questionsInSection.length === 0) return;

        resultsBySection[sec] = { questions: [], correct: 0, total: questionsInSection.length };
        totalQuestions += questionsInSection.length;

        questionsInSection.forEach((q, i) => {
            const key = `${sec}-${i}`;
            const userAnswer = answers[key];
            let isCorrect;

            if (SELF_GRADED_SECTIONS.includes(sec)) {
                // If the user has manually graded, that takes precedence.
                // Otherwise, use fuzzy matching for an initial automatic grade.
                isCorrect = selfGrades.hasOwnProperty(key)
                    ? !!selfGrades[key]
                    : calculateFuzzyMatch(userAnswer, q.answer || q.solution);
            } else if (Array.isArray(q.answer)) {
                isCorrect = Array.isArray(userAnswer) && q.answer.sort().join(',') === userAnswer.sort().join(',');
            } else {
                isCorrect = q.answer === userAnswer;
            }
            
            if (isCorrect) resultsBySection[sec].correct++;
            
            resultsBySection[sec].questions.push({
                question: q.question, scenario: q.scenario || q.problem, userAnswer, correctAnswer: q.answer !== undefined ? q.answer : q.solution, correct: isCorrect, key: key,
            });
        });
        totalCorrect += resultsBySection[sec].correct;
    });
    
    const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const allResultsForExport = Object.values(resultsBySection).flatMap(secData => secData.questions.map(q => ({...q, sectionName: SECTIONS.find(s => q.key.startsWith(s)) })));

    const exportHandler = (type) => {
        const headers = ['Section', 'Question', 'Your Answer', 'Correct Answer', 'Result'];
        const data = allResultsForExport.map(r => [r.sectionName, r.question, String(r.userAnswer ?? 'N/A'), String(r.correctAnswer ?? 'N/A'), r.correct ? 'Correct' : 'Incorrect']);

        if(type === 'csv') {
            const csvContent = [headers.join(','), ...data.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'quiz_results.csv';
            link.click();
        } else {
            const doc = new jsPDF();
            doc.text('Quiz Results', 14, 16);
            doc.autoTable({ head: [headers], body: data });
            doc.save('quiz_results.pdf');
        }
    };
    
    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-3xl mx-auto space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Test Complete!</h2>
                <p className={`text-5xl font-bold mt-4 ${overallPercentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>{overallPercentage}%</p>
                <p className="text-gray-600 mt-2">You answered {totalCorrect} out of {totalQuestions} questions correctly.</p>
            </div>
            <div className="flex justify-center gap-4 my-4">
              <button onClick={() => exportHandler('csv')} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Export CSV</button>
              <button onClick={() => exportHandler('pdf')} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Export PDF</button>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold border-b pb-2 mb-2 text-gray-700">Review Your Answers</h3>
                {Object.keys(resultsBySection).map(sec => (
                    <div key={sec} className="border rounded-lg overflow-hidden">
                        <button onClick={() => setActiveAccordion(activeAccordion === sec ? null : sec)} className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="font-semibold capitalize text-gray-800">{sec.replace(/([A-Z])/g, ' $1')} ({resultsBySection[sec].correct}/{resultsBySection[sec].total})</span>
                            <span className={`transform transition-transform text-gray-500 ${activeAccordion === sec ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {activeAccordion === sec && (
                            <div className="p-4 border-t bg-gray-50 space-y-4">
                                {resultsBySection[sec].questions.map((q, i) => (
                                    <div key={q.key} className="p-3 bg-white rounded-lg shadow-sm">
                                        {q.scenario && <p className="text-sm text-gray-500 mb-2 italic">Scenario: {q.scenario}</p>}
                                        <p className="font-semibold flex items-start gap-3 text-gray-800"><Icon type={q.correct ? 'correct' : 'incorrect'} />{q.question}</p>
                                        <div className="mt-2 pl-9 text-sm space-y-1">
                                          <p><strong className="text-gray-600">Your Answer:</strong> {String(q.userAnswer ?? 'Not answered')}</p>
                                          {!q.correct && <p><strong className="text-green-600">Correct Answer:</strong> {String(q.correctAnswer)}</p>}
                                        </div>
                                        {SELF_GRADED_SECTIONS.includes(sec) && (
                                          <label className="flex items-center gap-2 mt-3 text-sm text-gray-700 cursor-pointer">
                                              <input type="checkbox" checked={!!q.correct} onChange={e => setSelfGrades(prev => ({...prev, [q.key]: e.target.checked}))} className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                                              Mark as correct
                                          </label>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="text-center mt-6">
                <button onClick={() => setMode(null)} className="bg-gray-700 text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors">Back to Settings</button>
            </div>
        </div>
    );
  }

  // --- RENDER LOGIC ---

  if (!mode) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Cybersecurity Quiz</h1>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Test Options</h2>
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={timed} onChange={e => setTimed(e.target.checked)} className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"/>
              <span>Enable Timer</span>
            </label>
            {timed && (
              <div className="pl-8">
                <label className="block text-sm font-medium text-gray-600">Time Limit (minutes):</label>
                <input type="number" value={timeLimit} onChange={e => setTimeLimit(Math.max(1, +e.target.value))} className="w-24 border-gray-300 rounded-md shadow-sm p-2 mt-1 focus:border-indigo-500 focus:ring-indigo-500"/>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Number of Questions</h2>
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
            {SECTIONS.map(sec => (
              <label key={sec} className="flex items-center justify-between gap-3">
                <span className="capitalize text-gray-600">{sec.replace(/([A-Z])/g, ' $1')}</span>
                <input type="number" min={0} max={questions[sec]?.length || 0} value={numQuestions[sec] || '0'} onChange={e => setNumQuestions(prev => ({ ...prev, [sec]: Math.min(questions[sec]?.length || 0, Math.max(0, +e.target.value)) }))} className="w-20 border-gray-300 rounded-md shadow-sm p-2 text-center focus:border-indigo-500 focus:ring-indigo-500"/>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
          <button onClick={() => handleModeSelect(MODES.LEARN)} className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-green-700 transition-transform transform hover:scale-105">Learn Mode</button>
          <button onClick={() => handleModeSelect(MODES.TEST)} className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-indigo-700 transition-transform transform hover:scale-105">Start Test</button>
        </div>
      </div>
    );
  }

  if (submitted) return renderResults();
  if (mode === MODES.TEST && !testQuestions) return <p className="text-center mt-8 text-gray-500">Shuffling questions...</p>;
  
  const activeSections = mode === MODES.TEST ? Object.keys(testQuestions) : SECTIONS;
  const sec = activeSections[sectionIndex];
  const curr = mode === MODES.TEST ? testQuestions?.[sec] : questions?.[sec];
  if (!curr || curr.length === 0) return handleNext() || null;
  const q = curr[questionIndex];
  if (!q) return <p className="text-center mt-8 text-gray-500">Loading question...</p>;

  const totalQuizQs = activeSections.reduce((sum, s) => sum + (mode === MODES.TEST ? testQuestions[s]?.length || 0 : questions[s]?.length || 0), 0);
  const answeredQs = activeSections.slice(0, sectionIndex).reduce((sum, s) => sum + (mode === MODES.TEST ? testQuestions[s]?.length || 0 : questions[s]?.length || 0), 0) + questionIndex;
  const progress = totalQuizQs > 0 ? ((answeredQs) / totalQuizQs) * 100 : 0;
  
  const key = `${sec}-${questionIndex}`;
  const userAnswer = answers[key];
  
  let isCorrect;
  if (SELF_GRADED_SECTIONS.includes(sec)) {
    isCorrect = calculateFuzzyMatch(userAnswer, q.answer || q.solution);
  } else if (Array.isArray(q.answer)) {
    isCorrect = Array.isArray(userAnswer) && q.answer.sort().join(',') === userAnswer.sort().join(',');
  } else {
    isCorrect = q.answer === userAnswer;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-auto space-y-5">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="font-semibold capitalize">{sec.replace(/([A-Z])/g, ' $1')}</span>
        {timed && mode === MODES.TEST && (<span className="font-mono text-lg bg-gray-100 px-3 py-1 rounded-md">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>)}
        <span>Question {questionIndex + 1} of {curr.length}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
      
      {(q.scenario || q.problem) && (
        <div className="p-4 bg-gray-50 border-l-4 border-gray-300 text-gray-700 italic">
            <p className="font-semibold mb-1">{q.scenario ? "Scenario:" : "Problem:"}</p>
            {q.scenario || q.problem}
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-gray-800 pt-2">{q.question}</h2>

      {showAnswer ? (
        <div className={`p-4 rounded-lg ${mode === MODES.LEARN ? (isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200') : 'bg-gray-100'}`}>
          {mode === MODES.LEARN ? (
            <div className="space-y-3">
              <p className="font-semibold flex items-center gap-3 text-lg"><Icon type={isCorrect ? 'correct' : 'incorrect'} />{isCorrect ? 'Correct!' : 'Not quite.'}</p>
              <div className="pl-9 text-sm space-y-1">
                <p><strong className="text-gray-600">Your Answer:</strong> {String(userAnswer)}</p>
                {!isCorrect && <p><strong className="text-green-600">Correct Answer:</strong> {String(q.answer || q.solution)}</p>}
                <p className="text-gray-600 pt-2">{q.explanation}</p>
              </div>
            </div>
          ) : (<p className="text-center font-semibold text-gray-700">Answer recorded.</p>)}
        </div>
      ) : ( renderOptions(q) )}
        
      <div className="flex justify-between items-center pt-4 border-t">
        <button onClick={handlePrev} disabled={sectionIndex === 0 && questionIndex === 0} className="bg-gray-200 text-gray-700 py-2 px-5 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Prev</button>
        <button onClick={handleExit} className="text-sm text-red-500 hover:underline">Exit Quiz</button>
        <button onClick={handleNext} disabled={!showAnswer} className="bg-indigo-600 text-white py-2 px-5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Next</button>
      </div>
    </div>
  );
}