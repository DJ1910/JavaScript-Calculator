import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

class JavascriptCalculator extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {currentExp: '0', result: '', opIndex: -1, lastOp: '', prevExp: ''};
    this.clickHandler = this.clickHandler.bind(this);
    this.insertInExp = this.insertInExp.bind(this);
    this.insertNum = this.insertNum.bind(this);
    this.insertOp = this.insertOp.bind(this);
    this.onEquals = this.onEquals.bind(this);
  }
  
  insertInExp(ch)
  {
    if(this.state.lastOp === '')
      {
        if((ch.charCodeAt(0) >= 48) && (ch.charCodeAt(0) <= 57))
          {
            if(this.state.currentExp === '0')
              {
                this.setState({currentExp: ''});
              }
            this.insertNum(ch);
          }
        else
          {
            this.insertOp(ch);
          }
      }
    else
      {
        if(this.state.opIndex === this.state.currentExp.length-1)
          {
            if((ch.charCodeAt(0) >= 48) && (ch.charCodeAt(0) <= 57))
              {
                if((this.state.currentExp[this.state.opIndex-1] === '-') && (this.state.lastOp === '-'))
                  {
                    this.setState((state) => {
                      let newExp = state.currentExp.slice(0, state.currentExp.length-2);
                      newExp = newExp + '+';
                      return ({currentExp: newExp, lastOp: '+', opIndex: state.opIndex-1});
                    });
                  }
                this.insertNum(ch);
              }
            else if((ch === '.') && (this.state.lastOp !== '.'))
              {
                this.setState((state) => ({currentExp: state.currentExp + '0.', lastOp: '.', opIndex: state.currentExp.length+1}));
              }
            else if(this.state.lastOp === '.')
              {
                
              }
            else if((this.state.lastOp === '-') && (this.state.currentExp[this.state.opIndex-1] === '-'))
              {
                if(ch === '-' || ch === '+' || ch === '*' || ch === '/')
                  {
                    this.setState((state) => {
                      let newExp = state.currentExp.slice(0, state.currentExp.length-2);
                      newExp = newExp + ch;
                      return ({currentExp: newExp, lastOp: ch, opIndex: state.opIndex-1});
                    });
                  }
              }
            else if((this.state.lastOp === '-') && ((this.state.currentExp[this.state.opIndex-1] === '+') || (this.state.currentExp[this.state.opIndex-1] === '*') || (this.state.currentExp[this.state.opIndex-1] === '/')))
                  {
                    this.setState((state) => {
                      let newExp = state.currentExp.slice(0, state.currentExp.length-2);
                      newExp = newExp + ch;
                      return ({currentExp: newExp, lastOp: ch, opIndex: state.opIndex-1});
                    });
                  }
            else
              {
                if(ch === '+' || ch === '*' || ch === '/')
                  {
                    this.setState((state) => {
                      let newExp = state.currentExp.slice(0, state.currentExp.length-1);
                      newExp = newExp + ch;
                      return ({currentExp: newExp, lastOp: ch, opIndex: state.opIndex});
                    });
                  }
                else
                  {
                    this.setState((state) => {
                      return ({currentExp: state.currentExp + '-', opIndex: state.opIndex+1, lastOp: '-'})});
                  }
              }
          }
        else
          {
            if((this.state.lastOp !== '.') && (ch === '.'))
              {
                this.insertOp(ch);
              }
            else if((ch.charCodeAt(0) >= 48) && (ch.charCodeAt(0) <= 57))
              {
                this.insertNum(ch);
              }
            else if(ch === '+' || ch === '*' || ch === '/' || ch === '-')
              {
                this.insertOp(ch);
              }
          }
      }
  }
  
  insertNum(ch)
  {
    this.setState((state) => ({currentExp: state.currentExp + ch}));
  }
  
  insertOp(ch)
  {
    this.setState((state) => ({currentExp: state.currentExp + ch, lastOp: ch, opIndex: state.currentExp.length}));
  }
  
  onEquals() {
    if((this.state.currentExp[this.state.currentExp.length-1] === '+') || (this.state.currentExp[this.state.currentExp.length-1] === '-') || (this.state.currentExp[this.state.currentExp.length-1] === '/') || (this.state.currentExp[this.state.currentExp.length-1] === '*') || (this.state.currentExp[this.state.currentExp.length-1] === '.'))
      {
        if(this.state.lastOp === '.' || this.state.lastOp === '+' || this.state.lastOp === '-')
          {
            this.setState((state) => {
              let newExp = state.currentExp + '0';
              return ({result: eval(newExp), currentExp: eval(newExp), prevExp: newExp})
            });  
          }
        else if(this.state.lastOp === '*' || this.state.lastOp === '/')
          {
            this.setState((state) => {
              let newExp = state.currentExp + '1';
              return ({result: eval(newExp), currentExp: eval(newExp), prevExp: newExp})
            });  
          }
      }
    else {
      this.setState((state) => ({result: eval(state.currentExp), currentExp: eval(state.currentExp), prevExp: state.currentExp}));
    }
  }
  
  clickHandler(event) 
  {  
    switch(event.target.id)
      {
        case 'one': this.insertInExp('1');
                    break;
        case 'two': this.insertInExp('2');
                    break;
        case 'three': this.insertInExp('3');
                    break;
        case 'four': this.insertInExp('4');
                    break;
        case 'five': this.insertInExp('5');
                    break;
        case 'six': this.insertInExp('6');
                    break;
        case 'seven': this.insertInExp('7');
                    break;
        case 'eight': this.insertInExp('8');
                    break;
        case 'nine': this.insertInExp('9');
                    break;
        case 'zero': this.insertInExp('0');
                    break;
        case 'multiply': this.insertInExp('*');
                    break;
        case 'divide': this.insertInExp('/');
                    break;
        case 'add': this.insertInExp('+');
                    break;
        case 'subtract': this.insertInExp('-');
                    break;
        case 'decimal': this.insertInExp('.');
                    break;
        case 'equals': this.onEquals();
                     break;
        case 'clear': this.setState({currentExp: '0', result: '', opIndex: -1, lastOp: '', prevExp: ''});
                     break;
      }
  }
  
  render() {
    
    return (
      <div id="wrapper">
        <div id="calculator">
          <div id="display-container">
            <div id="history">{this.state.currentExp === this.state.result ? this.state.prevExp + '=' : this.state.currentExp}</div>
            <div id="display">{this.state.result != '' ? this.state.result : this.state.currentExp}</div>
          </div>
          <button id="clear" onClick= {this.clickHandler}>AC</button>
          <button id="divide" onClick= {this.clickHandler}>/</button>
          <button id="multiply" onClick= {this.clickHandler}>*</button>
          <button id="seven" onClick= {this.clickHandler}>7</button>
          <button id="eight" onClick= {this.clickHandler}>8</button>
          <button id="nine" onClick= {this.clickHandler}>9</button>
          <button id="subtract" onClick= {this.clickHandler}>-</button>
          <button id="four" onClick= {this.clickHandler}>4</button>
          <button id="five" onClick= {this.clickHandler}>5</button>
          <button id="six" onClick= {this.clickHandler}>6</button>
          <button id="add" onClick= {this.clickHandler}>+</button>
          <button id="one" onClick= {this.clickHandler}>1</button>
          <button id="two" onClick= {this.clickHandler}>2</button>
          <button id="three" onClick= {this.clickHandler}>3</button>
          <button id="equals" onClick= {this.clickHandler}>=</button>
          <button id="decimal" onClick= {this.clickHandler}>.</button>
          <button id="zero" onClick= {this.clickHandler}>0</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<JavascriptCalculator />, document.getElementById('target'));
