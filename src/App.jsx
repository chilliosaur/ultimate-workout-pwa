import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import WorkoutScreen from './components/WorkoutScreen';
import Settings from './components/Settings';
import { workoutPrograms } from './data/workouts';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedProgramKey, setSelectedProgramKey] = useState(null);

  const handleStartWorkout = (programKey) => {
    setSelectedProgram(workoutPrograms[programKey]);
    setSelectedProgramKey(programKey);
    setCurrentScreen('workout');
  };

  const handleWorkoutComplete = (programKey) => {
    // Save completed program to localStorage
    localStorage.setItem('lastCompletedProgram', programKey);
    setCurrentScreen('home');
    setSelectedProgram(null);
    setSelectedProgramKey(null);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedProgram(null);
    setSelectedProgramKey(null);
  };

  const handleOpenSettings = () => {
    setCurrentScreen('settings');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <HomeScreen
          onStartWorkout={handleStartWorkout}
          onOpenSettings={handleOpenSettings}
        />
      )}

      {currentScreen === 'workout' && selectedProgram && (
        <WorkoutScreen
          program={selectedProgram}
          programKey={selectedProgramKey}
          onComplete={handleWorkoutComplete}
          onBack={handleBackToHome}
        />
      )}

      {currentScreen === 'settings' && (
        <Settings onBack={handleBackToHome} />
      )}
    </>
  );
}

export default App;
