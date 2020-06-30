import React from "react";
import Board from '../components/Board';

type State = {
    status:     boolean,
    oIsNext:    boolean,
    stepNum:    number,
    history:    string[][]
};

export default class Game extends React.Component<{},State> {
    private ONESIDE_NUM = 3;
    private DEFAULT_STATE = {
        status:     false,
        oIsNext:    Math.random()>=.5,
        stepNum:    0,
        history:    [Array(this.ONESIDE_NUM**2).fill('')]
    };

    constructor(props: {}) {
        super(props);
        this.state= this.DEFAULT_STATE;
    }

    private squareClick(key: number): void {
        if(this.state.status) return;

        const board = this.state.history[this.state.stepNum];

        const newBoard = board.slice();
        newBoard[key] = this.state.oIsNext? 'O': 'X';

        const newHistory = 
            this.state.history
                .slice(0,this.state.stepNum+1)
                .concat([newBoard]);

        const newStatus = this.checkVictory(newBoard);
        
        this.setState({
            status:     newStatus,
            oIsNext:    !this.state.oIsNext,
            stepNum:    this.state.stepNum + 1,
            history:    newHistory
        });
    }

    private check(ar: string[]): boolean{
        const set = new Set(ar);
        return set.size===1 && !set.has('');
    }
    private checkVictory(board: string[]): boolean{
        for(let i=0;i<this.ONESIDE_NUM;i++){
            // Row
            if(this.check(board.filter((_,index)=>Math.floor(index/this.ONESIDE_NUM)===i)))return true;
            // Col
            if(this.check(board.filter((_,index)=>index%this.ONESIDE_NUM===i)))return true;
        }
        return this.checkDia(board) || false;
    }
    private checkDia(board: string[]): boolean{
        const upper_left =  board.filter((_,index)=>index%(this.ONESIDE_NUM+1)===0);
        const upper_right = board.filter((_,index)=>index%(this.ONESIDE_NUM-1)===0 && index!==0);
        if(this.check(upper_left) || this.check(upper_right))return true;

        return false;
    }

    private jump(step: number=0): void{
        console.log(this.state.history);
        this.setState({
            stepNum:    step,
            status:     this.checkVictory(this.state.history[step])
,
            });
    }

    private renderHisBtn(index: number): JSX.Element{
        return (
            <li key={`btn#${index}`}>
                <button onClick={()=>this.jump(index)} >{`Go to #${index}`}</button>
            </li>
        );
    }

    public render() {
        const histories = this.state.history;
        const board = histories[this.state.stepNum];
        const message = this.state.status
            ? `Winner ${this.state.oIsNext? 'X': 'O'}`
            : `Next Player: ${this.state.oIsNext? 'O': 'X'}`;

        const hisBtns = 
            histories.map((_,index)=> index? this.renderHisBtn(index): null);
        
        return(
            <div className="game">
                <div className="game-board">
                    <Board 
                        oneside_num={this.ONESIDE_NUM}
                        board={board}
                        onClick={(key: number)=>this.squareClick(key)}/>
                </div>
                <div className="game-info">
                    <div className="status">{message}</div>
                    <div>
                        <p>histories</p>
                        <ol>
                            {hisBtns}
                        </ol>
                    </div>
                    <button onClick={()=>this.jump()} className='reset'>
                        Game Reset
                    </button>
                </div>
            </div>
        )
    }
}