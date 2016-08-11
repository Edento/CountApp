var Header = React.createClass({
    displayName: "Header",


    render: function () {

        var title = this.props.title;

        return React.createElement(
            "nav",
            { className: "navbar navbar-default navbar-static-top", role: "navigation" },
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "navbar-header" },
                    React.createElement(
                        "a",
                        { className: "navbar-brand", href: "#" },
                        title
                    )
                )
            )
        );
    }

});