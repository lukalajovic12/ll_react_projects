export default function FractalMenu(props) {
    const menuStyle = {display:'flex', paddingBottom:"100px",  paddingTop:"100px"};
    return <div style={menuStyle} >
        <button onClick={props.increaseLevel}>Level+1</button>
        <button onClick={props.decreassLevel}>Level-1</button>
        <div> {props.level}</div>
        <button onClick={props.increasePerLevel}>Per Level+1</button>
        <button onClick={props.decreassPerLevel}>Per Level-1</button>
        <div> {props.perLevel}</div>
        <button onClick={props.increaseSpin}>Spin +15</button>
        <button onClick={props.decreassSpin}>Spin -15</button>
        <div> {props.spin}</div>

        <label>
        <input
          type="checkbox"
          checked={props.isRandom}
          onChange={props.handleIsRandom}
        />
        Random
      </label>
    </div>;
}
