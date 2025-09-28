'use client';

import React, { useRef, useEffect, useState } from 'react';
import Paw from "./components/paw";
import RemiIntro from './scenes/remiIntro';
import WalkToDesk from './scenes/walkToDesk';
import FetchCoffee from './scenes/fetchCoffee';
import FirstRatKingMeeting from './scenes/firstRatKingMeeting';
import DeclarationsQuiz from './scenes/declarationsQuiz';
import Ratcita from './scenes/ratcita';
import KingExplainTutorial from './scenes/kingExplainTutorial';
import ShadowRatcita from './scenes/shadowRatcita';
import TalkAfterShadowing from './scenes/talkAfterShadowing';
import RakeFromSnoutFarm from './scenes/rakeFromSnoutFarm';
import RemiPartTwo from './scenes/remiPartTwo';
// import RakeWelcomesYou from './scenes/rakeWelcomesYou';
// import Ratilda from './scenes/ratildaScene';
// import RakeWelcomesAgain from './scenes/rakeWelcomesAgain';
import ClaimRatOne from './scenes/claimRatOne';
import RatnoldNeedsHelp from './scenes/ratnoldNeedsHelp';
import HelpRatnold from './scenes/helpRatnold';

export default function Home() {
  const [day, setDay] = useState(1);
  const [currentScene, setCurrentScene] = useState('declarationsQuiz');
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
      case 'ratnoldNeedsHelp':
        setCurrentScene('remiIntro');
      break;
      case 'declarationsQuiz':
        setCurrentScene('remiIntro');
        break;
      case 'remiIntro':
        setCurrentScene('remiPartTwo');
        break;
      case 'walkToDesk':
        setCurrentScene('fetchCoffee');
        break;
      case 'fetchCoffee':
        setCurrentScene('firstRatKingMeeting');
        break;
      case 'firstRatKingMeeting':
        setCurrentScene('kingExplainTutorial');
        break;
      case 'kingExplainTutorial':
        setCurrentScene('ratcita');
        break;
      case 'ratcita':
        setCurrentScene('shadowRacita'); 
        break;
      case 'shadowRacita':
        setCurrentScene('talkAfterShadowing');
        break;
      case 'talkAfterShadowing':
        setCurrentScene('rakeFromSnoutFarm');
        break;
      case 'rakeFromSnoutFarm':
        setCurrentScene('remiPartTwo');
        break;
      case 'remiPartTwo':
        setCurrentScene('claimRatOne');
        break;
      // case 'rakeWelcomesYou':
      //   setCurrentScene('remiIntro');
      // case 'ratildaScene':
      //   setCurrentScene("remiIntro");
      // case 'rakeWelcomesAgain':
      //   setCurrentScene('remiIntro');
      case 'claimRatOne':
        setCurrentScene('remiIntro')
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
      case 'fetchCoffee':
        return <FetchCoffee onDialogueData={handleDialogueData} />;
      case 'firstRatKingMeeting':
        return <FirstRatKingMeeting onDialogueData={handleDialogueData} />
      case 'kingExplainTutorial':
        return <KingExplainTutorial onDialogueData={handleDialogueData}/>
      case 'ratcita':
        return <Ratcita onDialogueData={handleDialogueData} />
      case 'shadowRacita':
        return <ShadowRatcita onDialogueData={handleDialogueData} />
      case 'talkAfterShadowing':
        return <TalkAfterShadowing onDialogueData={handleDialogueData} />
      case 'rakeFromSnoutFarm':
        return <RakeFromSnoutFarm onDialogueData={handleDialogueData} />
      case 'declarationsQuiz':
        return <DeclarationsQuiz onDialogueData={handleDialogueData} />
      case 'remiPartTwo':
        return <RemiPartTwo onDialogueData={handleDialogueData} />
      // case 'rakeWelcomesYou':
      //   return <RakeWelcomesYou onDialogueData={handleDialogueData} />
      // case 'ratildaScene':
      //   return <Ratilda onDialogueData={handleDialogueData} />
      // case 'rakeWelcomesAgain':
      //   return <RakeWelcomesAgain onDialogueData={handleDialogueData} />
      case 'claimRatOne':
        return <ClaimRatOne onDialogueData={handleDialogueData} />
      
      default:
        return <div className="text-white text-center">Unknown scene: {currentScene}</div>;
    }
  };

  return (
    <div className="flex items-end h-[100vh] overflow-hidden">
      {/* <div className="z-10 absolute right-5 top-5 text-4xl font-bold">Day {day}</div> */}
      
      {renderCurrentScene()}
      
      <div id="leftPaw" className="absolute translate-y-3/5 translate-x-90 rotate-12">
        {/* <Paw /> */}
      </div>
      <div id="rightPaw" className="absolute translate-y-3/5 translate-x-250 rotate-348">
        {/* <Paw /> */}
      </div>
    </div>
  );
}
