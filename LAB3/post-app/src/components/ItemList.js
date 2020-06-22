import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Paper, withStyles, ListItemSecondaryAction } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import { itemsFetchData } from "../actions/items";
import fetchDelete from "../fetchDelete";

const useStyles = theme => ({
    text: {
        padding: theme.spacing(2, 2, 0)
    },
    paper: {
        paddingBottom: 50
    },
    list: {
        marginBottom: theme.spacing(2)
    },
    subheader: {
        backgroundColor: theme.palette.background.paper
    },
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
    },
    link: {
        textDecoration: "none",
        color: "#000"
    },
    progress: {
        display: "block",
        margin: "50px auto"
    }
});

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData("https://bloggy-api.herokuapp.com/posts");
    }

    onDeleteItem = async id => {
        await fetchDelete(id);
        this.props.fetchData("https://bloggy-api.herokuapp.com/posts");
    };

    render() {
        const { classes } = this.props;

        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <CircularProgress className={classes.progress} />;
        }

        return (
            <>
                <CssBaseline />
                <Paper square className={classes.paper}>
                    <Typography
                        className={classes.text}
                        variant="h5"
                        gutterBottom
                    >
                        All Posts
                    </Typography>
                    <List className={classes.list}>
                        {this.props.items.map(({ id, title, body }) => (
                            <React.Fragment key={id}>
                                <Link
                                    to={`/post/${id}`}
                                    className={classes.link}
                                >
                                    <ListItem button>
                                        <ListItemText
                                            primary={title}
                                            secondary={body}
                                        />

                                        <ListItemSecondaryAction>
                                            <Link
                                                to={`/update/post/${id}`}
                                                className={classes.link}
                                            >
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
                                                        this.onDeleteItem(
                                                            `${id}`
                                                        );
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Link>
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
                <AppBar
                    position="fixed"
                    color="primary"
                    className={classes.appBar}
                >
                    <Toolbar>
                        <Link to="/create-item">
                            <Tooltip title="Add post" aria-label="add">
                                <Fab
                                    color="secondary"
                                    aria-label="add"
                                    className={classes.fabButton}
                                >
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </Link>

                        <div className={classes.grow} />
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(itemsFetchData(url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(ItemList));
