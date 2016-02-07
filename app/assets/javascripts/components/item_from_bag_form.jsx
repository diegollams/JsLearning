var ItemFromBagForm = React.createClass({
    displayName: 'ItemFromBagForm',
    getInitialState: function(){
        return {name: '',quantity: 0}
    },
    render: function(){
        return(
            <div className="form-inline">
                <div className="form-group">
                    <label >Nombre</label>
                    <input onChange={this.handleInputChange} name="name" className="form-control" value={this.state.name} ></input>
                </div>
                <div className="form-group">
                    <label>Cantidad</label>
                    <input onChange={this.handleInputChange} name="quantity" className="form-control" value={this.state.quantity} type="number"></input>
                </div>
                <button className="btn btn-primary" onClick={this.handleSubmit} disabled={!this.valid()} >Agregar</button>
            </div>
        );
    },
    valid: function(){
        return this.state.name && this.state.quantity
    },
    handleInputChange: function(e){
        var data = {};
        data[e.target.name] = e.target.value;
        this.setState(data);
    },
    handleSubmit: function(){
        this.props.newItemHandler(this.state);
        this.setState({name: '',quantity: ''});
    }
});