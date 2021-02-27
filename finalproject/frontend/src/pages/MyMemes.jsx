import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { MemeComment, MemeVoteCounter } from '../components';
import api from '../api';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import '../style/MyMemes.scss';

export default class MyMemes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            memes: [],
            isLoading: true,
            commentMessages: [],
            commentIds: [],
            commentDate: []
        };
    }

    getDateString(inputDateString) {
        let dateArray = inputDateString.split('/');
        let year = dateArray[0];
        let month = dateArray[1];
        let day = dateArray[2];
        return `${day}.${month}.${year}`
    }
    getComments = async () => {
        let response = await api.getCommentsByMemeId(0);

        let comments = response.data.data;

        var messages = [];
        var ids = [];
        var date = [];

        for (var i = 0; i < comments.length; i++) {
            messages.push(comments[i].message);
            ids.push(comments[i].user_id);
            date.push(comments[i].creationDate)
        }

        this.setState({
            commentMessages: messages,
            commentIds: ids,
            commentDate: date
        })
    }

    componentDidMount = async () => {
        try {
            //TODO actual userid...
            let response = await api.getOwnMemes(0);
            this.setState({
                memes: response.data.data,
                isLoading: false
            });
        } catch (err) {
            console.log('Failed to get memes: ', err);
        }
    }


    render() {
        let { memes, isLoading } = this.state;
        this.getComments()
        return (
            <div id="mymemes-page-wrapper">
                {isLoading ? (
                    <div id="mymemes-page-loader">
                        <Loader type="Grid" height={500} width={500} color="#7ab2e1" visible={true} />
                    </div>
                ) : (
                        <>
                            {!memes.length && <p id="mymemes-empty">Hmm, seems like you haven't created any Memes yet. Once you do, they will show up here! Yes, even your private and unlisted ones.</p>}
                            {memes.map(meme => (
                                <div className={`meme-wrapper visibility-${meme.visibility}`} key={'meme-wrapper-' + meme._id}>
                                    <div className="title-row">
                                        <span className="title">{meme.name}</span>
                                        {meme.visibility == 1 && (
                                            <img src="/ui/lock-unlisted.png" alt="unlisted meme" title="unlisted meme" />
                                        )}
                                        {meme.visibility == 0 && (
                                            <img src="/ui/lock-private.png" alt="private meme" title="private meme" />
                                        )}
                                    </div>
                                    <Link to={'/memes/view/' + meme._id}>
                                        <img className="meme-img" src={meme.url} alt={meme.name}></img>
                                    </Link>
                                    <table className="stats-table">
                                        <tbody>
                                            <tr>
                                                <td><p>{meme.stats.views} views</p></td>
                                                <td><MemeVoteCounter meme={meme} /></td>
                                                <td><p>{this.getDateString(meme.creationDate)}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <MemeComment
                                        id={meme._id}
                                        commentCount={meme.comment_ids.length}
                                        comments={this.state.commentMessages}
                                        dates={this.state.commentDate}
                                        userId={this.state.commentIds}
                                    />

                                </div>
                            ))}
                        </>
                    )}
            </div>
        )
    }
}