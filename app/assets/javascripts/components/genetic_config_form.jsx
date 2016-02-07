

//TODO try make anonymous functions and add to the forms via prototype to update state: maybe with mixins
var GeneticConfigForm = React.createClass({
    displayName: 'GeneticConfigForm',
    getInitialState: function(){
        return {generations: '0'}
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
                    </div>
                </div>
            </div>
        )
    },
    handleInputChange: function(e){
        if(e.target.value < 0){
            this.setState({generations: '0'});
            alert("Cant't be negative");
            return;
        }
        this.setState({generations: parseInt(e.target.value)});
        this.props.updateParent(e.target.value);
    }

});