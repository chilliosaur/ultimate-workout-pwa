import { useState } from 'react';
import { ArrowLeft, Check, Timer as TimerIcon } from 'lucide-react';
import Timer from './Timer';

export default function WorkoutScreen({ program, programKey, onComplete, onBack }) {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [completedExercises, setCompletedExercises] = useState([]);

    const currentExercise = program.exercises[currentExerciseIndex];
    const isLastExercise = currentExerciseIndex === program.exercises.length - 1;
    const Icon = currentExercise.icon;

    const handleCompleteExercise = () => {
        setCompletedExercises([...completedExercises, currentExercise.id]);

        if (isLastExercise) {
            // Workout complete - save to localStorage and return
            setTimeout(() => {
                alert('🎉 Tebrikler! Antrenmanı tamamladınız!');
                onComplete(programKey);
            }, 300);
        } else {
            // Move to next exercise
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        }
    };

    const handleStartRest = () => {
        setIsResting(true);
    };

    const handleRestComplete = () => {
        setIsResting(false);
    };

    if (isResting) {
        return (
            <Timer
                onComplete={handleRestComplete}
                onBack={() => setIsResting(false)}
            />
        );
    }

    return (
        <div className="min-h-screen flex flex-col p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <div className="text-white text-lg font-semibold">
                    {currentExerciseIndex + 1} / {program.exercises.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-emerald-400 to-blue-500 h-full transition-all duration-500"
                    style={{ width: `${((currentExerciseIndex + 1) / program.exercises.length) * 100}%` }}
                />
            </div>

            {/* Exercise Card */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="glass-card p-8 w-full max-w-md text-center animate-slide-up">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-8 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-md border border-white/30">
                            <Icon className="w-24 h-24 text-white" />
                        </div>
                    </div>

                    {/* Exercise Name */}
                    <h2 className="text-3xl font-bold text-white mb-3">
                        {currentExercise.name}
                    </h2>

                    {/* Sets & Reps */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="glass-card px-6 py-3">
                            <div className="text-white/60 text-sm">Set</div>
                            <div className="text-white text-2xl font-bold">{currentExercise.sets}</div>
                        </div>
                        <div className="glass-card px-6 py-3">
                            <div className="text-white/60 text-sm">Tekrar</div>
                            <div className="text-white text-2xl font-bold">{currentExercise.reps}</div>
                        </div>
                    </div>

                    {/* Target Muscle */}
                    <p className="text-emerald-300 font-medium mb-2">
                        {currentExercise.target}
                    </p>

                    {/* Description */}
                    <p className="text-white/70 text-sm mb-8">
                        {currentExercise.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleStartRest}
                            className="w-full glass-button bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-400/40 flex items-center justify-center gap-2"
                        >
                            <TimerIcon className="w-5 h-5" />
                            Dinlenmeye Geç
                        </button>

                        <button
                            onClick={handleCompleteExercise}
                            className="w-full glass-button bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40 flex items-center justify-center gap-2"
                        >
                            <Check className="w-5 h-5" />
                            {isLastExercise ? 'Antrenmanı Bitir' : 'Hareketi Tamamla'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Completed Exercises */}
            {completedExercises.length > 0 && (
                <div className="mt-6 text-center">
                    <p className="text-white/60 text-sm">
                        Tamamlanan: {completedExercises.length} / {program.exercises.length}
                    </p>
                </div>
            )}
        </div>
    );
}
