var Header = React.createClass({
    
    
    render: function() {

        var title =  this.props.title;

        return(
        
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="#">{title}</a>
                    </div>
                </div>
            </nav>
        );
        
    }
    
    
    
})