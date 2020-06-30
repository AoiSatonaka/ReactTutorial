import React from 'react';

//props
type Props = {
    value:      string,
    onClick:    Function,
}
//extendsする際にジェネリクスを指定することでpropsやstateの型を指定できる。
export default class Square extends React.Component<Props,{}> {
    public render(): JSX.Element {
        return(
            <button className='square' onClick={()=>{if(this.props.value==='')this.props.onClick()}} >
                {this.props.value}
            </button>
        );
    }
}