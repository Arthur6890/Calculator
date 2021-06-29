import React from 'react'
import './calculator.css'
import KeyCalc from '../components/calcKey'
import Display from '../components/display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends React.Component{

    state = { ...initialState}
    clearMemory(){
        this.setState({...initialState})
        console.log('limpou')
    }
    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true })
        }
        else{
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            }catch(e){
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation, 
                current: equals ? 0 : 1,
                clearDisplay: !equals
            })
        }
    }
    addDigit(n){
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n 
        this.setState({displayValue, clearDisplay: false})  

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }
    }

    render(){
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        return(
            <div className="calculator" >
                <Display value={this.state.displayValue}  />
                <KeyCalc label="AC" click={() => this.clearMemory()} triple/>
                <KeyCalc label="/" click={setOperation} operation/>
                <KeyCalc label="7" click={addDigit}/>
                <KeyCalc label="8" click={addDigit}/>
                <KeyCalc label="9" click={addDigit}/>
                <KeyCalc label="*" click={setOperation} operation/>
                <KeyCalc label="4" click={addDigit}/>
                <KeyCalc label="5" click={addDigit}/>
                <KeyCalc label="6" click={addDigit}/>
                <KeyCalc label="-" click={setOperation} operation/>
                <KeyCalc label="1" click={addDigit}/>
                <KeyCalc label="2" click={addDigit}/>
                <KeyCalc label="3" click={addDigit}/>
                <KeyCalc label="+" click={setOperation} operation/>
                <KeyCalc label="0" click={addDigit} double/>
                <KeyCalc label="." click={addDigit} />
                <KeyCalc label="=" click={setOperation} operation/>
            </div>
        )
    }
}