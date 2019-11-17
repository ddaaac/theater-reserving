import React, {Component} from 'react';
import Designer, {Rect} from 'react-designer';

class TestDesigner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [
                {type: "rect", x: 50, y: 70, width: 30, height: 40, fill: "red"}
            ],
        }
    }

    render() {
        return (
            <div className="App">
                <Designer width={500} height={500}
                          objectTypes={{
                              'rect': Rect
                          }}
                          onUpdate={(objects) => this.setState({objects})}
                          objects={this.state.objects}/>
            </div>
        );
    }
}

export default TestDesigner;