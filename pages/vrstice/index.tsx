


function Vrstica(props){
    let stevile = Array.from(Array(props.i).keys());
    const backgroundStyle={display:"flex",
     };

    const kvadratStyle={width:"100px",
    height:"100px",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"black",
    background:"red",
    borderRadius:"50px",
  };

  const firstStyle={paddingRight:(50*(props.n-props.i-1))+"px"
};

    return <div style={backgroundStyle}>
        <div style={firstStyle}>
        </div>
{stevile.map((v1) => (
        <div style={kvadratStyle}>
        </div>
      ))}

    </div>;


}

export default function vrstice(props){


    let n = 6;
    let stevile = Array.from(Array(n).keys());
    const backgroundStyle={background:"blue",display:"flex",margin:"30px"}


    return <div style={backgroundStyle}>
        <div>
        {stevile.map((v1) => (
      <Vrstica n={n} i={v1}/>
   ))}   
        </div>
        <div>  
        </div>


    </div>
}