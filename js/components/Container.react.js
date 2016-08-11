var Container = React.createClass({

    
    getInitialState: function() {
        return{
            count: 0,
        }
    },
    
    render: function() {
        
        return (
        <div>
            <Header title="Counter App"></Header>
            <h2>Clicks: { this.state.count }</h2>
            <div>
                <Counter count= {this.state.count} change={this.onCountChange}></Counter>
                <Button text="Download CSV"></Button>
                <Resetbtn count = {this.state.count} text="Reset clicks" reset={this.onCountChange}></Resetbtn>
                
            </div>
        </div>
        
        );
    },
    
    onCountChange: function(value){
        this.setState({count: value});
    }
    
    
});