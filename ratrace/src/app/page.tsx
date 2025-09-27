'use client';

import React, { useRef, useEffect, useState } from 'react';
import Paw from "./components/paw";
import SpeechBubble from "./components/speechBubble";
import Remi from "./components/remi";
import RemiIntro from './scenes/remiIntro';
import WalkToDesk from './scenes/walkToDesk';
import FirstRatKingMeeting from './scenes/firstRatKingMeeting';

export default function Home() {
  const [day, setDay] = useState(1);
  const [currentScene, setCurrentScene] = useState('remiIntro');
  const [playerData, setPlayerData] = useState({
    karma: 0,
    social: 0,
    sales: 0,
  });

  const handleDialogueData = (data: any) => {
    console.log('Received data:', data);
    
    if (data.type === 'completed') {
      setPlayerData(prev => ({
        karma: prev.karma + (data.karma || 0),
        social: prev.social + (data.social || 0),
        sales: prev.sales + (data.sales || 0),
      }));

      console.log('Updated player data:', playerData.karma, playerData.social, playerData.sales);

      handleSceneTransition(data);
    }
  };

  const handleSceneTransition = (data: any) => {
    switch (currentScene) {
      case 'remiIntro':
        // After Remi intro, go to task scene or next dialogue
        setCurrentScene('walkToDesk');
        break;
      case 'walkToDesk':
        // After task assignment, go to work day
        setCurrentScene('firstRatKingMeeting');
        break;
      case 'firstRatKingMeeting':
        // After work day, advance to next day
        // setDay(prev => prev + 1);
        setCurrentScene('remiIntro');
        break;
      // case 'dayTransition':
      //   // Reset for new day
      //   setCurrentScene('remiIntro');
      //   break;
      default:
        console.log('Unknown scene transition from:', currentScene);
    }
  };

  const renderCurrentScene = () => {
    switch (currentScene) {
      case 'remiIntro':
        return <RemiIntro onDialogueData={handleDialogueData} />;
      case 'walkToDesk':
        return <WalkToDesk onDialogueData={handleDialogueData} />;
      case 'firstRatKingMeeting':
        return <FirstRatKingMeeting onDialogueData={handleDialogueData} />
      default:
        return <div className="text-white text-center">Unknown scene: {currentScene}</div>;
    }
  };

  return (
    <div className="flex items-end h-[100vh] overflow-hidden">
      <div className="z-10 absolute right-10 top-10 text-4xl">Day {day}</div>
      <div className="absolute left-10 top-10 text-sm text-white">
        <div>Scene: {currentScene}</div>
        <div>Karma: {playerData.karma}</div>
        <div>Social: {playerData.social}</div>
        <div>Sales: {playerData.sales}</div>
      </div>
      
      {renderCurrentScene()}
      
      <div id="leftPaw" className="absolute translate-y-3/5 translate-x-90 rotate-12">
        <Paw />
      </div>
      <div id="rightPaw" className="absolute translate-y-3/5 translate-x-250 rotate-348">
        <Paw />
      </div>
    </div>
  );
}
