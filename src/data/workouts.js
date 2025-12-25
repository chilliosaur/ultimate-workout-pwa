import {
    Footprints,
    Hand,
    Dumbbell,
    TrendingUp,
    CircleDot,
    PersonStanding,
    Boxes,
    Flame
} from 'lucide-react';

export const workoutPrograms = {
    A: {
        name: "Program A: İtme ve Bacak",
        description: "Pazartesi & Perşembe",
        targetMuscles: "Göğüs, Omuz, Arka Kol, Bacaklar",
        exercises: [
            {
                id: 1,
                name: "Squat",
                sets: 3,
                reps: "12-15",
                target: "Bacak",
                icon: Footprints,
                description: "Derin squat ile bacakları çalıştırın"
            },
            {
                id: 2,
                name: "Şınav (Pushup)",
                sets: 3,
                reps: "Maksimum",
                target: "Göğüs",
                icon: Hand,
                description: "Göğüs için klasik şınav"
            },
            {
                id: 3,
                name: "Pike Pushup",
                sets: 3,
                reps: "8-10",
                target: "Omuz",
                icon: TrendingUp,
                description: "Omuzları hedefleyen pike pozisyonu"
            },
            {
                id: 4,
                name: "Dips",
                sets: 2,
                reps: "12",
                target: "Arka Kol",
                icon: Dumbbell,
                description: "Triceps için dips hareketi"
            },
            {
                id: 5,
                name: "Bulgarian Split Squat",
                sets: 2,
                reps: "10/Bacak",
                target: "Alt Vücut Bitiriş",
                icon: PersonStanding,
                description: "Tek bacak çalışması ile bitiriş"
            }
        ]
    },
    B: {
        name: "Program B: Çekme ve Karın",
        description: "Salı & Cuma",
        targetMuscles: "Sırt, Biceps, Core",
        exercises: [
            {
                id: 6,
                name: "Pull-up / Chin-up",
                sets: 3,
                reps: "Maksimum",
                target: "Sırt & Biceps",
                icon: TrendingUp,
                description: "Sırt ve kol için barfiks"
            },
            {
                id: 7,
                name: "Bicep Curl & Hammer Curl",
                sets: 3,
                reps: "12",
                target: "Ön Kol",
                icon: Dumbbell,
                description: "İki yönlü biceps çalışması"
            },
            {
                id: 8,
                name: "Concentration Curl",
                sets: 2,
                reps: "12",
                target: "Ön Kol Detay",
                icon: CircleDot,
                description: "Odaklanmış biceps izolasyonu"
            },
            {
                id: 9,
                name: "Plank & Side Plank",
                sets: 2,
                reps: "Tur",
                target: "Karın",
                icon: Boxes,
                description: "Core stabilizasyonu"
            },
            {
                id: 10,
                name: "Hollow Body & Shoulder Taps",
                sets: 2,
                reps: "Set",
                target: "Core Bitiriş",
                icon: Flame,
                description: "Core kasları için bitiriş hareketi"
            }
        ]
    }
};

export const weeklySchedule = {
    monday: "A",
    tuesday: "B",
    wednesday: "rest",
    thursday: "A",
    friday: "B",
    saturday: "rest",
    sunday: "rest"
};

export const dayNames = {
    monday: "Pazartesi",
    tuesday: "Salı",
    wednesday: "Çarşamba",
    thursday: "Perşembe",
    friday: "Cuma",
    saturday: "Cumartesi",
    sunday: "Pazar"
};
