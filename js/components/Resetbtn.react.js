
var Resetbtn = React.createClass({
   
    getInitialState: function() {
        return {
            count: this.props.count,
        };
    },
    
    reset: function(){
        this.props.reset(this.state.count);
    },
    
    resetCollection: function() {
        var url = "/api/reset";
        
        if(window.confirm("Reset counter? all data will be removed."))
            
        {
            console.log("User approved. removing all data...");

            $.ajax({
              url: url,
              dataType: 'json',
              type: 'DELETE',
              cache: false,
              success: function(data) {
                this.setState({count: data});
                  this.reset();
                  console.log("resetCollection: state updated to "+ data);
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(url, status, err.toString());
              }.bind(this)
            });
        } else {
            console.log ("User canceled. Data will not be removed.")
        }
        
    },
    
    render: function() {
        
        var text = this.props.text;

        return (
            <button type="button" className="btn btn-danger btn-lg btn-block" onClick={this.resetCollection}>
                { text }
            </button>
            
        );
    }
    
  
});