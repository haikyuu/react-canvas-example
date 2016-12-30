import React from 'react';
import './App.css';
import Konva from 'konva'
import {
    Layer, Rect, Stage,
    // Group,
} from 'react-konva';
class MyRect extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            color: 'green'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({color: Konva.Util.getRandomColor()});
    }
    render() {
        return (
          <Rect
           x={10}
           y={10}
           width={50}
           height={50}
           fill={this.state.color}
           shadowBlur={10}
           onClick={this.handleClick}
           draggable
           shadowColor='black'
         />
       );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Stage ref="stage" width={700} height={700}>
                <Layer ref="layer">
                    <MyRect/>
                </Layer>
            </Stage>
        );
    }
}

export default App;
