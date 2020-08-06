import React, { Component } from 'react';
import Card from './Card';

class Widgets extends Component {

    constructor(props){
        super(props);
        this.state = {
            cards :[]
        }
    }

    componentDidMount(){
        fetch('/api/widgets/')
        .then(res => res.json())
        .then(res=>{
            this.setState({
                cards: res.data
            })
        })
    }

    render() {
        return (
            <>
                {this.state.cards.map((card,i)=>{
                    return (
                     <Card key={i}{...card}/>
                    );
                })}
            </>
        );
    }
}

export default Widgets;