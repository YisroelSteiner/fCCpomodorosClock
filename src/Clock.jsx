import React, {useState, useEffect} from "react";
import Beep from "./assets/beep.mp3";

class Session extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="session" className="container small">
                <h3 id="session-label">Session length</h3>
                <div className="container internal">
                    <button id="session-decrement" onClick={this.props.decreaseLength}>-</button>
                    <p id="session-length"  className="number">{this.props.length}</p>
                    <button id="session-increment" onClick={this.props.increaseLength}>+</button>
                </div>
            </div>
        );
    }
}

class Break extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div id="break" className="container small">
                <h3 id="break-label">Break length</h3>
                <div className="container internal">
                    <button id="break-decrement" onClick={this.props.decreaseLength}>-</button>
                    <p id="break-length" className="number">{this.props.length}</p>
                    <button id="break-increment" onClick={this.props.increaseLength}>+</button>
                </div>
            </div>
        );
    }
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="timer" className="container small">
              <div className="container small">
                <p id="timer-label">{this.props.stage}</p>
                <p id="time-left" className="number">{this.props.displayedTime}</p>
                <audio src={Beep} id="beep"></audio>
              </div>         
              <div className="container internal">
                <button id="start_stop" onClick={this.props.toggle}>St.</button>  
                <button id="reset" onClick={this.props.reset}>Reset</button>  
              </div>         
            </div>
      );
    }
};

export default function Clock()  {
    const [sessionLength, setSessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [stage, setStage] = useState("Session");
    const [counting, setCounting] = useState(false);
    const [time, setTime] = useState(1500);

    
    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (counting) setTime(time => time - 1);
        }, 1000);
        return () => clearInterval(timerInterval); 
    }, [counting]);

    useEffect(() => {
        if (!counting && stage === "Session" ) 
            setTime(sessionLength * 60);     
    }, [sessionLength]);

    useEffect(() => {
        const audio = document.getElementById("beep");
        if (time === 1) 
            setTimeout(() => {
            if (stage === "Session") {
                setStage("Break");
                setTime(breakLength * 60);
                audio.play();
            } else {
                setStage("Session");
                setTime(sessionLength * 60);
                audio.play();
            }
        }, 1000);
    }, [time]);
        
    function decreaseSessionLength() {
        if (sessionLength >= 2){
        setSessionLength(sl => sl - 1);
    }
}

    function increaseSessionLength() {
        if (sessionLength <= 59) {
      setSessionLength(sl => sl + 1);
    }
    }

    function decreaseBreakLength() {
        if (breakLength >= 2)
       setBreakLength(bl => bl - 1);
    }

    function increaseBreakLength() {
        if (breakLength <= 59)
        setBreakLength(bl => bl + 1);
    }
    
    function reset() {
        setSessionLength(25);
        setBreakLength(5);
        setStage("Session");
        setCounting(false);
        setTime(1500);
        const audio = document.getElementById("beep");
        audio.pause();
        audio.currentTime = 0;
    }

    function toggle() {
        setCounting(counting => !counting);
    }
    
    function displayTime(time) {
        let minutes = Math.floor(time / 60); 
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        let seconds = time % 60;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    }
    
          const displayedTime = displayTime(time);

      return (
         <div id="clock" className="container external">
            <h1>25 + 5 clock</h1>
            <div className="container medium">
            <Session length={sessionLength} decreaseLength={decreaseSessionLength} increaseLength={increaseSessionLength} />
            <Timer stage={stage} displayedTime={displayedTime} toggle={toggle} reset={reset} />
            <Break length={breakLength} decreaseLength={decreaseBreakLength} increaseLength={increaseBreakLength} />
            </div>
         </div>
      );
    }
