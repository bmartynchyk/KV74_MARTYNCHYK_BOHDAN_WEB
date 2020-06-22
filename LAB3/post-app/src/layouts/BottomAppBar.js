import React from "react";
import { connect } from "react-redux";
import { createNewPost, itemsFetchData } from "../actions/items";

import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from "@material-ui/core";

const useStyles = theme => ({
    appBar: {
        top: "auto",
        bottom: 0
    },
    grow: {
        flexGrow: 1
    },
    fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto"
    }
});

class BottomAppBar extends React.Component {
    state = {
        toggle: false,
        open: false
    };

    handleToggleAddMenu = () => {
        this.setState(({ open }) => ({ open: !open }));
    };

    createPost = async e => {
        if (!(this.props.newPost.title && this.props.newPost.body)) return;
        e.preventDefault();
        this.setState(({ open }) => ({ open: !open }));
        console.log("this.newPost", this.props.newPost.title);
        await fetch("https://bloggy-api.herokuapp.com/posts", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.props.newPost.title,
                body: this.props.newPost.body
            })
        }).then(function(response) {
            return response.json();
        });
        this.props.handleChange("title", "");
        this.props.handleChange("body", "");

        this.setState({
            toggle: true
        });

        await setTimeout(() => {
            this.setState({
                toggle: false
            });
            this.props.fetchData("https://bloggy-api.herokuapp.com/posts");
        }, 0);
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Tooltip title="Add post" aria-label="add">
                        <Fab
                            color="secondary"
                            aria-label="add"
                            className={classes.fabButton}
                            onClick={this.handleToggleAddMenu}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    <Dialog
                        onClose={this.handleToggleAddMenu}
                        open={open}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            Create Post
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To create Post please fill this fileld and then
                                press CREATE
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="text"
                                fullWidth
                                onChange={({ target: { value } }) =>
                                    this.props.handleChange("title", value)
                                }
                                value={this.props.newPost.title}
                            />
                            <TextField
                                margin="dense"
                                id="body"
                                label="Body"
                                type="text"
                                fullWidth
                                onChange={({ target: { value } }) =>
                                    this.props.handleChange("body", value)
                                }
                                value={this.props.newPost.body}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.handleToggleAddMenu}
                                color="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={this.createPost}
                                color="primary"
                                variant="contained"
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => {
    return {
        newPost: state.newPost
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleChange: (name, value) => dispatch(createNewPost(name, value)),
        fetchData: url => dispatch(itemsFetchData(url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(BottomAppBar));
