

//TODO try make anonymous functions and add to the forms via prototype to update state: maybe with mixins
var GeneticConfigForm = React.createClass({
    displayName: 'GeneticConfigForm',
    getInitialState: function(){
        return {generations: '0',bagSize: '0'}
    },
    getDefaultProps: function(){
        return {updateParent: function(){}}
    },
    render: function(){
        return(
            <div>
                <div className="form-inline">
                    <div className="form-group">
                        <label >Numero de generaciones</label>
                        <input onChange={this.handleInputChange} name="generations" className="form-control" value={this.state.generations}  type="number"></input>
                        <label >Bag size</label>
                        <input onChange={this.handleInputChange} name="bagSize" className="form-control" value={this.state.bagSize}  type="number"></input>
                    </div>
                </div>
            </div>
        )
    },
    handleInputChange: function(e){
        if(e.target.value < 0){
            var name = e.target.name;
            this.setState({name: '0'});
            alert("Can't be negative");
            return;
        }
        var data = {};
        data[e.target.name] = e.target.value;
        this.setState(data);
        this.setState(data);
        this.props.updateParent(data);
    }


});