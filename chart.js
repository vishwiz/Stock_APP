import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class Chart extends Component{
    constructor(props){
        super(props)
        this.state = {
            chartData : []
        }
        this.ws = new WebSocket("wss://ws-feed.gdax.com")
    }
    mainFunction = ()=>{
        let data = this.state.chartData
        const subscribe = {
            type:"subscribe",
            channels:[
                {
                    name: "ticker",
                    product_ids:["BTC-USD"]
                }
            ]
        };
       
        this.ws.onopen = ()=>{
            this.ws.send(JSON.stringify(subscribe))
        }

        this.ws.onmessage = (e) => {
            // a message was received
            // console.log("e.data call",e.data);
            data.push(e.data)
            this.setState({
                chartData : [...data]
            })
          };


          
    }

    componentWillUnmount = ()=>{
        this.ws.onclose = (e) => {
            // connection closed
            console.log("error ",e.code, e.reason);
          };
    }

    componentWillMount = ()=>{
        this.mainFunction()
    }
    render(){
        console.log("dataaaaa ", this.state.chartData)
        return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>Open Chart</Text></View>
    }
}

export default Chart