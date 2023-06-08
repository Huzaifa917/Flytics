const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px"
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "40%",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme
            .spacing(3)}px`,
    },
    formTitle: {
        fontWeight: "bold",
        marginLeft: "2%",
        marginBottom: "2%",
    },
    logoContainer: {
        width: "200px",
        "& img": {
            width: "100%",
            height: "100%"
        },
    },
    form: {
        width: "80%",
        margin:"auto"
    },
    fromBottomWraper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    submit: {
        color: "white !important",
        backgroundColor: "#0077FF !important",
        whiteSpace: "nowrap",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(6),
        borderRadius: "5px",
        paddingRight: "20px",
        paddingLeft: "20px",
        "&:hover": {
            color: "#0077FF !important",
            backgroundColor: "white !important",
        },
    },
});

export default styles;