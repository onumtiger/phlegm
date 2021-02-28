import React, { Component } from 'react';
import '../style/MemeComment.scss';

/**
 * Comment component to post comments to memes
 */
export default class Comment extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * handles 'post'-button click
     */
    handlePost = async () => {
        //get value of input field
        const input = document.getElementById('commentInput').value;

        let message = input;

        //post comment
        await this.props.postComment(message);

        //clear input field
        document.getElementById('commentInput').value = '';
    }

    /**
     * checks which key is pressed and calls a function
     * @param {Event} e 
     */
    handleKeypress = e => {
        //triggers by pressing the enter key
        if (e.which == 13 || e.keyCode == 13) {
            this.handlePost();
        }
    };

    /**
     * displays the date (yyyy/mm/dd) as another notation
     * @param {String} inputDateString - date String
     * @returns {String} - date in the format: dd.mm.yyy
     */
    getDateString = (inputDateString) => {
        let dateArray = inputDateString.split('/');
        let year = dateArray[0];
        let month = dateArray[1];
        let day = dateArray[2];
        return `${day}.${month}.${year}`
    }

    render() {
        return (
            <div id="comments-wrapper">
                <p className="commentNumber">{this.props.comments.length} comments</p>
                <div>
                    {this.props.comments.map((comment, index) => (
                        <div key={index} className="commentContainer">
                            <div className="commentInfo">
                                <div className="commentDate">
                                    {this.getDateString(comment.creationDate)}
                                </div>
                                <div className="userInfo"><label className="username">{comment.user_name}</label>:</div>
                            </div>
                            <label className="commentText">{comment.message}</label>
                        </div>
                    ))}
                </div>
                <div className="postContainer">
                    <input id="commentInput" placeholder="add a comment..." onKeyPress={this.handleKeypress}></input>
                    <button id="postButton" onClick={this.handlePost}>Post</button>
                </div>
            </div >
        );
    }
}