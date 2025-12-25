import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Dumbbell, Calendar, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function HomeScreen({ onStartWorkout, onOpenSettings }) {
    const [lastProgram, setLastProgram] = useState(null);
    const [nextProgram, setNextProgram] = useState('A');

    useEffect(() => {
        // Load last completed program from localStorage
        const saved = localStorage.getItem('lastCompletedProgram');
        if (saved) {
            setLastProgram(saved);
            setNextProgram(saved === 'A' ? 'B' : 'A');
        } else {
            setNextProgram('A'); // Default to A if no history
        }
    }, []);

    const handleStartWorkout = (program) => {
        onStartWorkout(program);
    };

    return (
        <div className="min-h-screen flex flex-col p-4">
            {/* Compact Header - Logo and Title in Top Left */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-md border border-white/20">
                        <Dumbbell className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Ultimate Workout</h1>
                        <p className="text-white/60 text-xs">Evde Antrenman</p>
                    </div>
                </div>

                {/* Settings Icon */}
                <button
                    onClick={onOpenSettings}
                    className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                    aria-label="Ayarlar"
                >
                    <SettingsIcon className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Next Workout - Main CTA */}
            <div className="mb-4">
                <div className="glass-card p-5 border-2 border-white/30">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-white/90">Sıradaki Antrenman</h2>
                        <TrendingUp className="w-5 h-5 text-emerald-300" />
                    </div>

                    {lastProgram && (
                        <div className="flex items-center gap-2 mb-3 text-white/60 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Son antrenman: Program {lastProgram}</span>
                        </div>
                    )}

                    <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white mb-1">
                            Program {nextProgram}
                        </h3>
                        <p className={`font-medium text-sm mb-1 ${nextProgram === 'A' ? 'text-emerald-300' : 'text-blue-300'}`}>
                            {nextProgram === 'A' ? 'İtme ve Bacak' : 'Çekme ve Karın'}
                        </p>
                        <p className="text-white/60 text-xs">
                            {nextProgram === 'A'
                                ? 'Göğüs • Omuz • Arka Kol • Bacaklar'
                                : 'Sırt • Biceps • Core'}
                        </p>
                    </div>

                    <button
                        onClick={() => handleStartWorkout(nextProgram)}
                        className={`w-full glass-button text-lg py-4 ${nextProgram === 'A'
                                ? 'bg-gradient-to-r from-emerald-500/40 to-green-500/40 border-emerald-400/50'
                                : 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40 border-blue-400/50'
                            }`}
                    >
                        Antrenmanı Başlat
                    </button>
                </div>
            </div>

            {/* Alternative Programs */}
            <div className="mb-4">
                <h3 className="text-white/70 text-xs font-medium mb-2 text-center">
                    veya farklı bir program seç
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {/* Program A */}
                    <button
                        onClick={() => handleStartWorkout('A')}
                        className={`glass-card p-3 hover:scale-105 transition-transform text-left ${nextProgram === 'A' ? 'ring-2 ring-emerald-400/50' : ''
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30">
                                <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                            </div>
                            <h4 className="text-base font-bold text-white">Program A</h4>
                        </div>
                        <p className="text-emerald-300 text-xs font-medium mb-0.5">İtme ve Bacak</p>
                        <p className="text-white/50 text-xs">Pzt & Per</p>
                    </button>

                    {/* Program B */}
                    <button
                        onClick={() => handleStartWorkout('B')}
                        className={`glass-card p-3 hover:scale-105 transition-transform text-left ${nextProgram === 'B' ? 'ring-2 ring-blue-400/50' : ''
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-blue-500/20 border border-blue-400/30">
                                <Calendar className="w-3.5 h-3.5 text-blue-300" />
                            </div>
                            <h4 className="text-base font-bold text-white">Program B</h4>
                        </div>
                        <p className="text-blue-300 text-xs font-medium mb-0.5">Çekme ve Karın</p>
                        <p className="text-white/50 text-xs">Sal & Cum</p>
                    </button>
                </div>
            </div>

            {/* Schedule Info - Reference Only */}
            <div className="glass-card p-3">
                <h3 className="text-white/70 font-medium mb-2 text-center text-xs">
                    Örnek Haftalık Takvim
                </h3>
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                    {[
                        { day: 'Pzt', program: 'A', active: true },
                        { day: 'Sal', program: 'B', active: true },
                        { day: 'Çar', program: '-', active: false },
                        { day: 'Per', program: 'A', active: true },
                        { day: 'Cum', program: 'B', active: true },
                        { day: 'Cmt', program: '-', active: false },
                        { day: 'Paz', program: '-', active: false },
                    ].map((item, i) => (
                        <div key={i} className={`p-1.5 rounded-lg ${item.active ? 'bg-white/10' : 'bg-white/5'}`}>
                            <div className="text-white/50 mb-0.5 text-xs">{item.day}</div>
                            <div className={`font-bold text-xs ${item.active ? 'text-white/60' : 'text-white/20'}`}>
                                {item.program}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
