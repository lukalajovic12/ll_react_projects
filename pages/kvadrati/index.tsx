
function createSquares():number[]{
    let squares:number[] =[];
  

    let redSquares:number =2;
    let squareCount:number =4;
  
    let showValue:boolean;
  
    let sq = [];
    for(let i=0;i<(squareCount*squareCount-redSquares);i++){
      sq.push(0);
    }

    for(let i=0;i<redSquares;i++){
        sq.push(1);
    }

    let shuffledArray = sq.sort((a, b) => 0.5 - Math.random());



    return shuffledArray;


}


function Kvadrat(props){

    let styleKvadrat = {
        background: "red",
        height: "100px",
        width:"100px"
      };


    return <div style={styleKvadrat}>l</div>
}

export default function Kvadrati(props){
    return <h1>title</h1>;
}