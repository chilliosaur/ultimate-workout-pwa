import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';

export default function Timer({ onComplete, onBack }) {
    const [restTime, setRestTime] = useState(() => {
        const saved = localStorage.getItem('restTime');
        return saved ? parseInt(saved) : 60;
    });
    const [timeLeft, setTimeLeft] = useState(restTime);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        setTimeLeft(restTime);
    }, [restTime]);

    useEffect(() => {
        let interval = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Play beep sound
            playBeep();
            // Flash effect
            document.body.style.backgroundColor = '#ef4444';
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 200);

            setTimeout(() => {
                onComplete();
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, onComplete]);

    const playBeep = () => {
        // Create audio context for beep
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    };

    const getTimerClass = () => {
        const percentage = (timeLeft / restTime) * 100;
        if (percentage > 50) return 'timer-circle';
        if (percentage > 20) return 'timer-circle warning';
        return 'timer-circle danger';
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const togglePause = () => {
        setIsActive(!isActive);
    };

    const skipRest = () => {
        onComplete();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            {/* Header */}
            <div className="absolute top-6 left-6">
                <button
                    onClick={onBack}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                <Volume2 className="w-8 h-8" />
                Dinlenme Zamanı
            </h2>

            {/* Timer Circle */}
            <div className={getTimerClass()}>
                <div className="text-center">
                    <div className="text-7xl font-bold text-white mb-2">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="text-white/60 text-sm">
                        {restTime} saniye dinlenme
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mt-12 bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-emerald-400 to-blue-500 h-full transition-all duration-1000"
                    style={{ width: `${((restTime - timeLeft) / restTime) * 100}%` }}
                />
            </div>

            {/* Controls */}
            <div className="mt-12 flex gap-4">
                <button
                    onClick={togglePause}
                    className="glass-button-small"
                >
                    {isActive ? 'Duraklat' : 'Devam Et'}
                </button>
                <button
                    onClick={skipRest}
                    className="glass-button-small bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40"
                >
                    Dinlenmeyi Atla
                </button>
            </div>

            {/* Motivation Text */}
            <div className="mt-12 text-center max-w-md">
                <p className="text-white/70 text-lg italic">
                    "Dinlenme de antrenmanın bir parçasıdır"
                </p>
            </div>
        </div>
    );
}
