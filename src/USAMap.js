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
        this.testUSA = []
        this.state = {
        usa: [],
        visited: [],
        apiResponse: "",
        visitednum:0
        };
    }


    componentDidMount() {
        fetch("http://localhost:9000/states")
        .then(res => res.json())
        .then(jsondata => this.setState({usa : [...jsondata]}));
    }


    handleState = (abbr) => {
        console.log(abbr.abbreviation);
        var s2 = abbr.abbreviation;
        
        this.state.usa.forEach((s, i) => {
                var s1 = s.attributes.abbreviation;
                
                if (s1 === s2) {
                    console.log(s.attributes.abbreviation, s2);
                    var updatestate = { 'id' : s.id,
                                        'visited': s.attributes.visited
                                    };
                    console.log(updatestate.id, updatestate.visited);

                    let copyUSA = [...this.state.usa];
                    let state = {...copyUSA[i]};
                    state.attributes.visited = this.pickingColor;
                    copyUSA[i] = state;
                    this.setState({copyUSA});

                    fetch("http://localhost:9000/states",
                    {
                        method:'PATCH', 
                        body: JSON.stringify(updatestate),
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        }
                    });  
                }
                
            }
        );
    }                       
    
    statesFilling = () => {
        const something = {};

        this.state.usa.forEach((state, i) => {
            let fill = state.attributes.visited;
            const { abbreviation, name } = state.attributes;
            
            something[abbreviation] = {
                abbreviation,
                fill,
                clickHandler: () =>  this.handleState(something[abbreviation])
            };
        });
        
        return { ...something };
    };
    
    
    
    render() {
        return (
        <div className="App">
            <h1>USA</h1>
            <div className="colorpicker">
                <h5>Select a Color</h5>
                <button className="base_button button1"  onClick={()=>this.pickingColor='#ff4d4d'}></button> {/*  red   */}
                <button className="base_button button2"  onClick={()=>this.pickingColor='#57de6d'}></button> {/* green  */}
                <button className="base_button button3"  onClick={()=>this.pickingColor='#fdfd7d'}></button> {/* yellow */}
            </div>                
            <USAMap customize={this.statesFilling()} onClick={this.handleState} />
        </div>
        );
    }
}

export default App;
