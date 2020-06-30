import React from 'react';
import Square from './Square';

type Props = {
    oneside_num: number,
    board: string[],
    onClick: Function,
};


export default class Board extends React.Component<Props,{}> {

    private renderSquare = (key: number): JSX.Element => {
        return <Square value={this.props.board[key]} onClick={()=>{this.props.onClick(key)}} key={key.toString()}/>;
    }

    private renderRow = (i: number): JSX.Element => {
        const squares: JSX.Element[] = [];
        const loop_start = i * this.props.oneside_num;
        for(let j=loop_start; j<=loop_start+2; j++)squares.push(this.renderSquare(j));
        return(
            <div className="board-row" key={`Row${i.toString()}`}>
                {squares}
            </div>
        );
    }

    public render(): JSX.Element {
        const rows: JSX.Element[] = [];
        for(let i=0;i<this.props.oneside_num;i++)rows.push(this.renderRow(i));
        return(
            <div>
                {rows}
            </div>
        );
    }
}
