// import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";
import React, { Component } from "react";
import USAMap from "react-usa-map";
import states from "./states.json";
import "./usa.css"
class App extends Component {
    constructor() {
        super();
        this.state = {
        usa: [],
        visited: []

        };

    }


    mapHandler = (event) => {

        this.handleState(event);
        // console.log(",,,,,,",event.target.dataset.name);
        // alert("event.target.dataset.name");

    };
    componentDidMount() {
        this.setState({visited: [...this.state.visited, 0]});
        this.setState({ usa: [...states.data] });
    }

    handleState = (abbr) => {
        this.setState({
            visited: [...this.state.visited, abbr]
        });
        console.log("LENGTH",this.state.visited.length);

        for (var j = 0; j < this.state.visited.length; j++) {
            console.log(this.state.visited[j].abbreviation);


        }
        this.state.usa.forEach((s, i) => {
            for (var j = 1; j < this.state.visited.length; j++) {
                var s1 = s.attributes.abbreviation.toString();
                var s2 = this.state.visited[j].abbreviation.toString();

                if (s1 === s2) {
                console.log(s.attributes.abbreviation, this.state.visited[j].abbreviation);

                    s.attributes.visited = true;
                    console.log('#####');

                }
            }
        });

        // console.log(`${abbr} test`);
        }

    statesFilling = () => {
        // console.log("testing");
        const something = {};
        this.state.usa.forEach((state, i) => {
        const { abbreviation, name } = state.attributes;
        let fill = "#C8102E";

        if( state.attributes.visited === true) {
            // console.log('true');
            fill = "#21B205";
        }
        //   if (name.includes("k")) {
        //     fill = "#21B205";
        //   } else if (name.includes("x")) {
        //     fill = "#DDAC04";
        //   }

        something[abbreviation] = {
            abbreviation,
            fill,
            clickHandler: () => this.handleState(something[abbreviation])
        };
        });

        // console.log(something);
        // console.log(visited);
        // for (var i = 0; i < visited.length; i++) {
        //     console.log("dfgdf");
        //     // console.log(visited.state.name);
        // }
        return { ...something };
    };

    render() {
        return (
        <div className="App">
            <h1>USA</h1>
            <USAMap customize={this.statesFilling()} onClick={this.handleState} />
        </div>
        );
    }
}

export default App;
