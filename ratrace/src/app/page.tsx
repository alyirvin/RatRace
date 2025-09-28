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
import RakeWelcomesYou from './scenes/rakeWelcomesYou';
import Ratilda from './scenes/ratildaScene';
import RakeWelcomesAgain from './scenes/rakeWelcomesAgain';
import ClaimRatOne from './scenes/claimRatOne';
import ClaimRatTwo from './scenes/claimRatTwo';
import RatnoldNeedsHelp from './scenes/ratnoldNeedsHelp';
import HelpRatnold from './scenes/helpRatnold';
import RemiMessageDeliver from './scenes/remiMessageDeliver';
import RatKingPromotion from './scenes/ratKingPromotion';
import BadBadEnding from './scenes/badBadEnding';
import ExecRatMessage from './scenes/execRatMessage';
import ScamperellaNeedsHelp from './scenes/scamperellaNeedsHelp'; 
import GoodBadEnding from './scenes/goodBadEnding';
import GoodGoodEnding from './scenes/goodGoodEnding';
import FiredEnding from './scenes/firedEnding';
import BadGoodEnding from './scenes/badGoodEnding';
import FinalPromotion from './scenes/finalPromotion';
import CustomerService1 from './scenes/customerService1';
import CustomerService2 from './scenes/customerService2';
import CustomerService3 from './scenes/customerService3';
import ReturnToKing from './scenes/returnToKing';

export default function Home() {
  const [day, setDay] = useState(1);
  const [currentScene, setCurrentScene] = useState('ratKingPromotion');
  const [playerData, setPlayerData] = useState({
    karma: 0,
    social: 0,
    sales: 0,
  });

  const determineSalesKarmaEnding = (karma: number, sales: number) => {
    const karmaThreshold = 2;
    const salesThreshold = 2;
    
    const goodKarma = karma >= karmaThreshold;
    const goodSales = sales >= salesThreshold;
    
    if (goodKarma && goodSales) {
      return 'goodGood';
    } else if (goodKarma && !goodSales) {
      return 'goodBad';
    } else if (!goodKarma && goodSales) {
      return 'badGood';
    } else {
      return 'badBad';
    }
  };

  const handleDialogueData = (data: any) => {
    console.log('Received data:', data);
    
    if (data.type === 'completed') {
      setPlayerData(prev => ({
        karma: prev.karma + (data.karma || 0),
        social: prev.social + (data.social || 0),
        sales: prev.sales + (data.sales || 0),
      }));

      console.log('Updated player data:', playerData.karma, playerData.social, playerData.sales);

      if (data?.fired) {
        if (playerData?.sales < 2 && playerData?.karma < 2) {
          setCurrentScene('firedEnding');
        }
      }

      if (data.stage === 'RatKingPromotion')
      {
        if (!data?.fired) {
          const salesKarmaEnding = determineSalesKarmaEnding(playerData.karma + (data.karma || 0), playerData.sales + (data.sales || 0));
          
          if (salesKarmaEnding === 'goodGood') {
            setCurrentScene('goodGoodEnding');
          } else if (salesKarmaEnding === 'goodBad') {
            setCurrentScene('goodBadEnding');
          } else if (salesKarmaEnding === 'badGood') {
            setCurrentScene('badGoodEnding');
          } else if (salesKarmaEnding === 'badBad') {
            setCurrentScene('badBadEnding');
          } else {
            setCurrentScene('remiIntro'); 
          }
        }
      }

      if (data.stage === 'execRatMessage')
      {
        if (data?.fired) {
          setCurrentScene('firedEnding');
        }
        else
        {
          setCurrentScene('finalPromotion');
        }
      }

      handleSceneTransition(data);
    }
  };

  const handleSceneTransition = (data: any) => {
    switch (currentScene) {
      case 'remiIntro':
        setCurrentScene('walkToDesk');
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
        setCurrentScene('declarationsQuiz');
        break;
      case 'ratnoldNeedsHelp':
        setCurrentScene('remiIntro');
        break;
      case 'helpRatnold':
        setCurrentScene('declarationsQuiz');
        break;
      case 'declarationsQuiz':
        setCurrentScene('remiPartTwo');
        break;
      case 'remiPartTwo':
        setCurrentScene('returnToKing');
        break;
      case 'returnToKing':
        setCurrentScene('rakeWelcomesYou');
        break;  
      case 'rakeWelcomesYou':
        setCurrentScene('customerService3');
        break;
      case 'customerService1':
        setCurrentScene('customerService2');
        break;
      case 'customerService2':
        setCurrentScene('ratildaScene');
        break;
      case 'ratildaScene':
        setCurrentScene('customerService3');
        break;
      case 'customerService3':
        setCurrentScene('remiMessageDeliver');
        break;
      case 'remiMessageDeliver':
        setCurrentScene('ratKingPromotion');
        break;
      case 'ratKingPromotion':
        break;
      case 'rakeWelcomesAgain':
        setCurrentScene('claimRatOne');
        break;
      case 'claimRatOne':
        setCurrentScene('scamperellaNeedsHelp');
        break;
      case 'scamperellaNeedsHelp':
        setCurrentScene('claimRatTwo');
        break;
      case 'claimRatTwo':
        setCurrentScene('execRatMessage');
        break;
      case 'execRatMessage':
        break;
      case 'finalPromotion':
        break;
      case 'badBadEnding':
        break;
      case 'firedEnding':
        break;
      case 'goodBadEnding':
        break;
      case 'goodGoodEnding':
        break;
      case 'badGoodEnding':
        break;
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
        return <DeclarationsQuiz onDialogueData={handleDialogueData} />;
      case 'helpRatnold':
        return <HelpRatnold onDialogueData={handleDialogueData} />;
      case 'ratnoldNeedsHelp':
        return <RatnoldNeedsHelp onDialogueData={handleDialogueData} />;
      case 'remiMessageDeliver':
        return <RemiMessageDeliver onDialogueData={handleDialogueData} />;
      case 'ratKingPromotion':
        return <RatKingPromotion onDialogueData={handleDialogueData} playerData={playerData} />;
      case 'badBadEnding':
        return <BadBadEnding />;
      case 'execRatMessage':
        return <ExecRatMessage onDialogueData={handleDialogueData} />;
      case 'scamperellaNeedsHelp':
        return <ScamperellaNeedsHelp onDialogueData={handleDialogueData} />;
      case 'goodBadEnding':
        return <GoodBadEnding />;
      case 'goodGoodEnding':
        return <GoodGoodEnding />;
      case 'firedEnding':
        return <FiredEnding />;
      case 'badGoodEnding':
        return <BadGoodEnding />;
      case 'rakeWelcomesAgain':
        return <RakeWelcomesAgain onDialogueData={handleDialogueData} />;
      case 'claimRatOne':
        return <ClaimRatOne onDialogueData={handleDialogueData} />;
      case 'claimRatTwo':
        return <ClaimRatTwo onDialogueData={handleDialogueData} />;
      case 'finalPromotion':
        return <FinalPromotion onDialogueData={handleDialogueData} playerData={playerData} />;
      case 'customerService1':
        return <CustomerService1 onDialogueData={handleDialogueData} />;
      case 'customerService2':
        return <CustomerService2 onDialogueData={handleDialogueData} />;
      case 'customerService3': 
        return <CustomerService3 onDialogueData={handleDialogueData} />;
      case 'remiPartTwo':
        return <RemiPartTwo onDialogueData={handleDialogueData} />;
      case 'returnToKing':
        return <ReturnToKing onDialogueData={handleDialogueData} />;
      case 'rakeWelcomesYou':
        return <RakeWelcomesYou onDialogueData={handleDialogueData} />;
      case 'ratildaScene':
        return <Ratilda onDialogueData={handleDialogueData} />;
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
