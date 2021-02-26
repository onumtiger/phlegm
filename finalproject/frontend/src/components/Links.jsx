import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    <span style={{fontFamily: 'Impact'}}>OMM Meme App</span>
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/memes/view" className="nav-link">
                                View Memes
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/memes/create" className="nav-link">
                                Create Meme
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/memes/own" className="nav-link">
                                My Memes
                            </Link>
                        </Item>

                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links