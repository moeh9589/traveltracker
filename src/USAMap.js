// import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";
import React, { Component } from "react";
import USAMap from "react-usa-map";
import states from "./states.json";
import "./usa.css";
import "./USAMap.css";

class App extends Component {
    constructor() {
        super();
        this.pickingColor = ""
        this.state = {
        usa: [],
        visited: [],
        apiResponse: "",
        visitednum:0
        };
    }

    colorPicker(color) {
        this.pickingColor = color;
        return this.pickingColor;
    }

    refreshPage() {
        window.location.reload(false);
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    mapHandler = (event) => {

        this.handleState(event);
        // console.log(",,,,,,",event.target.dataset.name);
        // alert("event.target.dataset.name");

    };

    updateVisited () {
        this.setState({visited: [...this.state.visited]});
    }



    componentDidMount() {
        this.callAPI();
        this.setState({visited: [...this.state.visited]});
        this.setState({ usa: [...states.data] });
    }

    handleState = (abbr) => {
        this.setState({
            visited: [...this.state.visited, abbr]
        });
        console.log("LENGTH",this.state.visited.length);

        for (var j = 0; j < this.state.visited.length; j++) {
            console.log(this.state.visited[j]);
        }

        this.state.usa.forEach((s, i) => {
            for (var j = 1; j < this.state.visited.length; j++) {
                var s1 = s.attributes.abbreviation.toString();
                var s2 = this.state.visited[j].abbreviation;

                if (s1 === s2) {
                    console.log(s.attributes.abbreviation, this.state.visited[j].abbreviation);
                    var updatestate = {'id' : s.id,
                                        'visited': s.attributes.visited
                                        };
                    console.log(updatestate.id, updatestate.visited);
                    fetch("http://localhost:9000/states",
                    {
                        method:'PATCH', 
                        body: JSON.stringify(updatestate),
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        }
                    }) 
                    .then(res => res.json())
                    // .then(setUpdate(update + 1))
                    .then(console.log("finished"));

                    //red
                    if (this.pickingColor == '#ff4d4d') {
                        s.attributes.visited = 0;
                        s.attributes.visited = 0;

                        // var array = [...this.state.visited];
                        // array.splice(0,1);
                        // array.splice(j,1);
                        // this.setState({visited: array});
                    }

                    //green
                    else if (this.pickingColor == '#57de6d') {
                        s.attributes.visited = 1;
                        s.attributes.visited = 1;

                        // var array = [...this.state.visited];
                        // array.splice(0,1);
                        // array.splice(j,1);
                        // this.setState({visited: array}); 
                    }
                    
                    //yellow
                    else if (this.pickingColor == '#fdfd7d') {
                        s.attributes.visited = 2;
                        s.attributes.visited = 2;

                        // var array = [...this.state.visited];
                        // array.splice(0,1);
                        // array.splice(j,1);
                        // this.setState({visited: array}); 
                    }
                    

                    // s.attributes.visited = !s.attributes.visited;
                    console.log('#####');

                }
                
            }
            // this.refreshPage();
        });

        // console.log(`${abbr} test`);
        }                       

    statesFilling = () => {
        // console.log("testing");
        const something = {};
        this.state.usa.forEach((state, i) => {
            const { abbreviation, name } = state.attributes;
            let fill = "#ff4d4d";

            const v = fetch("http://localhost:9000/states/" + abbreviation)
                .then(response => response.json())
                .then(compstate => {
                    return compstate;
                });
                
            const compState_ = async () => {
                const c = await v;

                if (c === 0) {
                    state.attributes.visited = 0;
                }

                else if (c === 1) {
                    state.attributes.visited = 1;
                }
                
                else if (c === 2) {
                    state.attributes.visited = 2;
                }

                // console.log(c, state.attributes.abbreviation);

                return c;

            }
            const c = compState_();
            // console.log(c);
            // console.log(compState);

            if (state.attributes.visited === 0) {
                fill = "#ff4d4d";
            }

            else if (state.attributes.visited === 1) {
                fill = "#57de6d";
            }

            else if (state.attributes.visited === 2) {
                fill = "#fdfd7d";
            }


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
            <div >
                <h5>Select a Color</h5>
                <button className="base_button button1"  onClick={()=>this.pickingColor='#ff4d4d'}></button> {/*  red   */}
                <button className="base_button button2" onClick={()=>this.pickingColor='#57de6d'}></button> {/* green  */}
                <button className="base_button button3"  onClick={()=>this.pickingColor='#fdfd7d'}></button> {/* yellow */}
            </div>
                
            <USAMap customize={this.statesFilling()} onClick={this.handleState} componentDidMount={this.handleState} />
        </div>
        );
    }
}

export default App;
