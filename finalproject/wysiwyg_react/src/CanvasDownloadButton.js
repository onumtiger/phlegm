import React from 'react';
import './CanvasDownloadButton.scss';

export default class CanvasDownloadButton extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <a id="download-anchor" download={this.props.placeholderFileName}>
                <button type="button" id="download-btn" onClick={this.props.onButtonClick}>Download image</button>
            </a>
        );
    }
}