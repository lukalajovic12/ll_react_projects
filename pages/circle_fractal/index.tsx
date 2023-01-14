import FractalMenu from './fractal_menu'

import Krog from './krog'
import { useState, useEffect} from 'react';
import { ideahub } from 'googleapis/build/src/apis/ideahub';

export default function Krogi(props){


    let { height, width } = useWindowDimensions();

    let screenWidth=width;

    if(typeof screenWidth === "undefined"){
        screenWidth=700;
    }
    const ozadjeStyle={ width:screenWidth+"px", height:screenWidth+"px",maxWidth:"500px",maxHeight:"500px" }
    const krogOzadjeStyle={background:"white",position:"relative",width:"90%",height:"90%", maxWidth:"400px",maxHeight:"400px"};
    var [perLevel,setPerLevel]=useState(2);

    function increasePerLevel(){
        if(perLevel<7){
            setPerLevel(perLevel+1);
        }
    }

    function decreassPerLevel(){
        if(perLevel>2){
            setPerLevel(perLevel-1);
        }
    }

    var [level,setLevel]=useState(2);

    function increaseLevel(){
        if(level<7){
            setLevel(level+1);
        }
    }

    function decreassLevel(){
        if(level>2){
            setLevel(level-1);
        }
    }


    const [isRandom, setIsRandom] = useState(false);

    const handleIsRandom = () => {
      setIsRandom(!isRandom);
    };

    var [spin,setSpin]=useState(0);

    function increaseSpin(){
        if(spin<360){
            setSpin(spin+15);
        } else{
            setSpin(0);
        }
    }

    function decreassSpin(){
        if(spin>0){
            setSpin(spin-15);
        } else{
            setSpin(360);
        }
    }

    return <div style={ozadjeStyle}>
            <FractalMenu setPerLevel=""
             perLevel={perLevel}
              increasePerLevel={increasePerLevel} 
              decreassPerLevel={decreassPerLevel}
              increaseLevel={increaseLevel}
              decreassLevel={decreassLevel}
              level={level}
              isRandom={isRandom}
              handleIsRandom={handleIsRandom}
              spin={spin}
              increaseSpin={increaseSpin}
              decreassSpin={decreassSpin}
              />
            <div style={krogOzadjeStyle}>

                <Krog  spin={spin} isRandom={isRandom} barva="red" n={level} m={perLevel}  radius={100} top={0} left={-10} />
            </div>
        </div>;
    }


    function getWindowDimensions() {
        const width=window.innerWidth;
        const height=window.innerHeight;
        return {
            width,
            height
        };
    }
      
      
    function useWindowDimensions() {
        if (typeof window === "undefined") { 
            return [500,500];
        }
        else{
   
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
   
        useEffect(() => {
          function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);
        return windowDimensions;
        }
      }