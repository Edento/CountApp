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
            <h1>Clicks: { this.state.count }</h1>
            <div>
                <Counter count= {this.state.count} change={this.onCountChange}></Counter>
                <Resetbtn count = {this.state.count} text="Reset clicks" reset={this.onCountChange}></Resetbtn>
                <Button text="Download CSV"></Button>
            </div>
        </div>
        
        );
    },
    
    onCountChange: function(value){
        this.setState({count: value});
    }
    
    
});