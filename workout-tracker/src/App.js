import React from 'react';
import UserWorkoutTracker from './UserWorkoutTracker';

function App() {
  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      alignItems: 'center'
    }}>
      {/* Cierrah */}
      <UserWorkoutTracker username="Cierrah" color="green" style={{ flex: 1 }} />
      {/* Benji */}
      <UserWorkoutTracker username="Ben" color="orange" style={{ flex: 1 }} />
    </div>
  );
}

export default App;