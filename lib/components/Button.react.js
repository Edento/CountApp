
var Button = React.createClass({
    displayName: "Button",


    getInitialState: function () {
        return {
            items: ''
        };
    },

    download: function () {

        var url = "/api/download";
        console.log("Downloading data from server...");

        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function (data) {

                this.setState({ items: data });

                window.open("./click_times.csv");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {

        var text = this.props.text;
        return React.createElement(
            "button",
            { type: "button", className: "btn btn-primary", onClick: this.download },
            text
        );
    }

});