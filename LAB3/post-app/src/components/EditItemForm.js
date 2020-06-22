import React, { Component } from "react";
import { connect } from "react-redux";

import { postFetchData, handleChange } from "../actions/items";

import { withStyles, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = theme => ({
    post: {
        margin: "0 auto",
        marginBottom: "20px",
        width: "60%",
        padding: "20px"
    },
    card: {
        margin: "70px auto",
        width: "50%",
        padding: "20px",
        textAlign: "center"
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

class EditItemForm extends Component {
    state = {
        toggle: false
    };

    componentDidMount() {
        this.props.fetchData(
            `https://bloggy-api.herokuapp.com/posts/${this.props.id}?_embed=comments`
        );
    }

    updatePost = async e => {
        e.preventDefault();
        await fetch(`https://bloggy-api.herokuapp.com/posts/${this.props.id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.props.post.title,
                body: this.props.post.body
            })
        }).then(function(response) {
            return response.json();
        });
        this.setState({
            toggle: true
        });

        await setTimeout(() => {
            this.setState({
                toggle: false
            });
        }, 2000);
    };

    render() {
        const { classes } = this.props;
        if (!(this.props.post.title || this.props.post.body)) {
            return <CircularProgress className={classes.progress} />;
        }
        return (
            <Card className={classes.card}>
                <form action="#" onSubmit={this.sendComment}>
                    <TextField
                        id="title-full-width"
                        label="Title"
                        style={{ margin: 8 }}
                        placeholder="Title"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={({ target: { value } }) => {
                            console.log("value is", value);
                            this.props.handleChange("title", value);
                        }}
                        value={this.props.post.title}
                    />
                    <TextField
                        id="body-full-width"
                        label="Body"
                        style={{ margin: 8 }}
                        placeholder="Body"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={({ target: { value } }) => {
                            console.log("value is", value);
                            this.props.handleChange("body", value);
                        }}
                        value={this.props.post.body}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.updatePost}
                        position="bottom"
                        gutterBottom
                    >
                        Send
                    </Button>
                </form>

                {this.state.toggle ? <div>Post is updated</div> : null}
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        post: state.post,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(postFetchData(url)),
        handleChange: (name, value) => dispatch(handleChange(name, value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(EditItemForm));
