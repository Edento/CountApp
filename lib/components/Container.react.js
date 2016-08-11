var Container = React.createClass({
    displayName: "Container",


    getInitialState: function () {
        return {
            count: 0
        };
    },

    render: function () {

        return React.createElement(
            "div",
            null,
            React.createElement(Header, { title: "Counter App" }),
            React.createElement(
                "h2",
                null,
                "Clicks: ",
                this.state.count
            ),
            React.createElement(
                "div",
                null,
                React.createElement(Counter, { count: this.state.count, change: this.onCountChange }),
                React.createElement(Button, { text: "Download CSV" }),
                React.createElement(Resetbtn, { count: this.state.count, text: "Reset clicks", reset: this.onCountChange })
            )
        );
    },

    onCountChange: function (value) {
        this.setState({ count: value });
    }

});