import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        padding: "10px",
        marginBottom: "20px"
    },
    button: {
        display: "block",
        margin: "0 auto",
        textDecoration: "none"
    }
});

class TopAppMenu extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <>
                <CssBaseline />
                <Paper className={classes.root}>
                    <Link to="/" className={classes.button}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            All posts
                        </Button>
                    </Link>
                </Paper>
            </>
        );
    }
}

export default withStyles(useStyles)(TopAppMenu);
