

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
        var data = {};
        if(e.target.value < 0){
            data[e.target.name] = 0;
            this.setState(data);
            alert("Can't be negative");
            this.props.updateParent(data);
            return;
        }
        data[e.target.name] = parseInt(e.target.value);
        this.setState(data);
        this.props.updateParent(data);
    }


});