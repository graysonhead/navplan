import React from 'react';
import { connect } from 'react-redux';
import { dismissMessage, dismissAllMessages } from "../actions";

class Flash extends React.Component {

    renderMessages() {
        return this.props.messages.map(message => {
            const message_index = this.props.messages.indexOf(message);
            return (
                <div className={`ui ${message.emphasis} message`} key={message_index}>
                    <i onClick={() => {this.props.dismissMessage(message_index)}} className={"close icon"} />
                    <div className={"header"}>
                        {message.title}
                    </div>
                    <p>{message.text}</p>
                </div>
            )
        })
    }

    renderRemoveAll() {
        if (this.props.messages.length > 1) {
            return(
                <div
                    className={"ui button small"}
                    onClick={() => {this.props.dismissAllMessages();}}
                >
                    Clear All
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderMessages()}
                {this.renderRemoveAll()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
};

export default connect(mapStateToProps, {dismissMessage, dismissAllMessages})(Flash);