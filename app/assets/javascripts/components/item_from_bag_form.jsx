var ItemFromBagForm = React.createClass({
    displayName: 'ItemFromBagForm',
    getInitialState: function(){
        return {name: '',weight: 0,benefit: 0}
    },
    render: function(){
        return(
            <div className="form-inline">
                <div className="form-group">
                    <label >Nombre</label>
                    <input onChange={this.handleTextInputChange} name="name" className="form-control" value={this.state.name} ></input>
                </div>
                <div className="form-group">
                    <label>Weight</label>
                    <input onChange={this.handleNumberInputChange} name="weight" className="form-control" value={this.state.weight} type="number"></input>
                </div>
                <div className="form-group">
                    <label>benefit</label>
                    <input onChange={this.handleNumberInputChange} name="benefit" className="form-control" value={this.state.benefit} type="number"></input>
                </div>
                <button className="btn btn-primary" onClick={this.handleSubmit} disabled={!this.valid()} >Agregar</button>
            </div>
        );
    },
    valid: function(){
        return this.state.name && this.state.weight && this.state.benefit
    },
    handleNumberInputChange: function(e){
        var data = {};
        data[e.target.name] = parseInt(e.target.value);
        this.setState(data);
    },
    handleTextInputChange: function(e){
        var data = {};
        data[e.target.name] = e.target.value;
        this.setState(data);
    },
    handleSubmit: function(){
        this.props.newItemHandler(this.state);
        this.setState({name: '',weight: 0,benefit: 0});
    }
});