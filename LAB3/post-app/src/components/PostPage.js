import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";

import { postFetchData } from "../actions/items";
import fetchDelete from "../fetchDelete";

const useStyles = theme => ({
    post: {
        margin: "0 auto",
        marginBottom: "20px",
        width: "60%",
        padding: "20px"
    },
    card: {
        margin: "0 auto",
        marginBottom: "20px",
        width: "90%",
        padding: "20px"
    },
    button: {
        marginTop: "29px",
        marginLeft: "15px",
        width: "20%"
    },
    progress: {
        display: "block",
        margin: "50px auto"
    }
});

class PostPage extends Component {
    state = {
        comment: "",
        deleted: false
    };

    componentDidMount() {
        this.props.fetchData(
            `https://bloggy-api.herokuapp.com/posts/${this.props.id}?_embed=comments`
        );
    }

    onDeleteItem = id => {
        fetchDelete(id);
        this.props.fetchData("https://bloggy-api.herokuapp.com/posts");
        this.setState({
            deleted: true
        });
    };

    sendComment = async e => {
        e.preventDefault();
        if (this.state.comment === "") return;
        await fetch("https://bloggy-api.herokuapp.com/comments", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: +this.props.id,
                body: this.state.comment
            })
        }).then(function(response) {
            return response.json();
        });

        this.props.fetchData(
            `https://bloggy-api.herokuapp.com/posts/${this.props.id}?_embed=comments`
        );

        this.setState({
            comment: ""
        });
    };

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        const {
            post: { body, title, id },
            comments,
            classes
        } = this.props;
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <CircularProgress className={classes.progress} />;
        }

        let commentsLoading = null;
        if (comments === undefined) {
            commentsLoading = <CircularProgress className={classes.progress} />;
        } else {
            commentsLoading = null;
            if (!comments.length) {
                commentsLoading = (
                    <div>This post doesn't have any comments</div>
                );
            } else {
                commentsLoading = comments.map(comment => (
                    <p key={comment.id}>{comment.body}</p>
                ));
            }
        }

        return (
            <Card className={classes.card}>
                <Card className={classes.post}>
                    <Typography variant="h3" gutterBottom>
                        {title}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        {body}
                    </Typography>

                    <Link to={`/update/post/${id}`}>
                        <Tooltip title="Edit">
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            onClick={e => {
                                e.preventDefault();
                                this.onDeleteItem(`${id}`);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                    {this.state.deleted ? <Redirect to="/" /> : null}
                </Card>
                <Card className={classes.post}>
                    <Typography variant="subtitle2" display="block">
                        Write a comment:
                    </Typography>
                    <form action="#" onSubmit={this.sendComment}>
                        <TextField
                            id="comment"
                            label="comment"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            name="comment"
                            required
                            onChange={this.handleChange("comment")}
                            value={this.state.comment}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.sendComment}
                            position="bottom"
                            gutterBottom
                        >
                            Send
                        </Button>
                    </form>
                </Card>
                <Card className={classes.post}>
                    <Typography
                        variant="subtitle2"
                        display="block"
                        gutterBottom
                    >
                        Comments:
                    </Typography>

                    {commentsLoading}
                </Card>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        post: state.post,
        comments: state.post.comments,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(postFetchData(url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(PostPage));
