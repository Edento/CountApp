var Counter = React.createClass({
  displayName: 'Counter',


  getInitialState: function () {
    return {
      count: this.props.count
    };
  },

  update: function () {
    this.props.change(this.state.count);
  },

  addClick: function () {
    var url = "/api/add";
    var click = {
      time: new Date()
    };

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: click,
      cache: false,
      success: function (data) {
        this.setState({ count: data });
        this.update(data);
        console.log("addClick: state updated to " + data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function () {
    var url = "/api/count";
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ count: data });
        this.update();
        console.log("componentDidMount: state updated! to " + data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    return React.createElement(
      'button',
      { type: 'button', className: 'btn btn-primary btn-lg btn-block', onClick: this.addClick },
      'Click me!'
    );
  }

});