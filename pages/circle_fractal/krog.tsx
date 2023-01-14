import { useState} from 'react';
export default function Krog(props){
    let circleColor="red";
    if(props.barva=="red"){
        circleColor="blue";
    }
    if(props.barva=="blue"){
        circleColor="green";
    }
    if(props.barva=="green"){
        circleColor="purple";
    }   
    if(props.barva=="purple"){
        circleColor="orange";
    }  
    if(props.barva=="orange"){
        circleColor="red";
    }     
    const krogStyle = {
        background:props.barva,
        position:"absolute",
        borderRadius: "50%",
        height:  props.radius+"%",
        width: props.radius+"%",
        maxHeight: props.radius+"%",
        maxWidth:props.radius+"%",
        top:props.top+"%",
        right:props.left+"%"

    };

    let numberOfCircles=props.m;

    let sp = props.spin;
    
    if(props.isRandom){
        numberOfCircles=2+Math.floor(Math.random()*(props.m-2));
        sp=Math.floor(Math.random()*360);
    }

    let circleWidth=100*Math.sin(Math.PI/numberOfCircles)/(1+Math.sin(Math.PI/numberOfCircles));
    var angles = [];
    for(let i = 0;i<numberOfCircles;i++){
        angles.push(2* (Math.PI) * (i / numberOfCircles)+Math.PI*sp/360);
    }
    if(props.n>1){
        return <div style={krogStyle}>                
            {angles.map((angle,i) => (

                <Krog 
                n={props.n-1} 
                m={props.m}
                radius={circleWidth} 
                top={50-Math.sin(angle)*(50-circleWidth/2)-circleWidth/2} 
                left={50-Math.cos(angle)*(50-circleWidth/2)-circleWidth/2}
                barva={circleColor} 
                isRandom={props.isRandom}
                spin={props.spin}
                />


            ))}
            </div>;
    }
    else{

        return <div style={krogStyle}></div>;
        

    }

}