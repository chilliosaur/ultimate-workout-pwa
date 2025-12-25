import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, Save, Download, Smartphone } from 'lucide-react';

export default function Settings({ onBack }) {
    const [restTime, setRestTime] = useState(() => {
        const saved = localStorage.getItem('restTime');
        return saved ? parseInt(saved) : 60;
    });
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        // PWA install prompt handler
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setShowInstallButton(false);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setShowInstallButton(false);
        }

        setDeferredPrompt(null);
    };

    const increaseTime = () => {
        setRestTime(prev => prev + 5);
    };

    const decreaseTime = () => {
        setRestTime(prev => Math.max(10, prev - 5));
    };

    const saveSettings = () => {
        localStorage.setItem('restTime', restTime.toString());
        alert('✅ Ayarlar kaydedildi!');
        onBack();
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

            {/* Settings Card */}
            <div className="glass-card p-8 w-full max-w-md animate-slide-up">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Ayarlar
                </h2>

                {/* PWA Install Section */}
                {showInstallButton && (
                    <div className="mb-8">
                        <h3 className="text-white/80 text-lg block mb-4 text-center">
                            Uygulamayı Kur
                        </h3>
                        <button
                            onClick={handleInstallClick}
                            className="w-full glass-card p-5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-2 border-purple-400/50 hover:scale-102 transition-all"
                        >
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <Smartphone className="w-6 h-6 text-white" />
                                <span className="text-white font-bold text-lg">Telefonuna Kur</span>
                            </div>
                            <p className="text-white/70 text-sm text-center">
                                Offline kullan, ana ekrana ekle
                            </p>
                        </button>
                        <p className="text-white/50 text-xs text-center mt-2">
                            💡 Kurulum sonrası tarayıcı gerekmez
                        </p>
                    </div>
                )}

                {/* Rest Time Setting */}
                <div className="mb-8">
                    <label className="text-white/80 text-lg block mb-4 text-center">
                        Dinlenme Süresi
                    </label>

                    <div className="flex items-center justify-center gap-4 mb-6">
                        <button
                            onClick={decreaseTime}
                            disabled={restTime <= 10}
                            className="p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            <Minus className="w-6 h-6 text-white" />
                        </button>

                        <div className="glass-card px-8 py-6 min-w-[140px] text-center">
                            <div className="text-5xl font-bold text-white mb-2">
                                {restTime}
                            </div>
                            <div className="text-white/60 text-sm">
                                saniye
                            </div>
                        </div>

                        <button
                            onClick={increaseTime}
                            className="p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all active:scale-95"
                        >
                            <Plus className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    <p className="text-white/50 text-sm text-center">
                        Minimum: 10 saniye • Artış: 5 saniye
                    </p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-8">
                    <p className="text-blue-200 text-sm text-center">
                        💡 Optimal dinlenme süresi kas gruplarına göre değişir.
                        Başlangıç için 60 saniye önerilir.
                    </p>
                </div>

                {/* Save Button */}
                <button
                    onClick={saveSettings}
                    className="w-full glass-button bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40 flex items-center justify-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Ayarları Kaydet
                </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 glass-card p-6 max-w-md w-full">
                <h3 className="text-white font-semibold mb-3">Dinlenme Süreleri Rehberi</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                    <li>• <span className="text-emerald-300">30-45 saniye:</span> Kondisyon & Dayanıklılık</li>
                    <li>• <span className="text-blue-300">60-90 saniye:</span> Hipertrofi (Kas Gelişimi)</li>
                    <li>• <span className="text-purple-300">2-3 dakika:</span> Kuvvet Antrenmanı</li>
                </ul>
            </div>
        </div>
    );
}
