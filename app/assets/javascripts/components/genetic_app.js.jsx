var ItemFromBagForm = React.createClass({
    displayName: 'ItemFromBagForm',
    getInitialState: function(){
        return {name: '',quantity: ''}
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

//TODO try make anonymous functions and add to the forms via prototype to update state
var GeneticConfigForm = React.createClass({
    displayName: 'GeneticConfigForm',
    getInitialState: function(){
        return {generations: '0'}
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
        this.setState({generations: e.target.value})
    }

});

var GeneticApp = React.createClass({
    displayName: 'GeneticApp',
    getDefaultProps: function(){
        return {items: []}
    },
    getInitialState: function(){
      return {bagItems: this.props.items}
    },
    render: function() {
        return (
            <div>
                <h2>Agrega elementos que se pueden agregara la mochila</h2>
                <div className="row"><ItemFromBagForm newItemHandler={this.addNewBagItem}/></div>
                <div className="row">
                    <div className="col-md-3">
                        {this.bagElementsList(this.state.bagItems)}
                    </div>
                </div>
                <h2>Numero de generaciones</h2>
                <GeneticConfigForm/>
            </div>
        );
    },
    bagElementsList: function(bagItems){
        return (
             <div>
                <p>{"Numero de elementos ("  + bagItems.length + ")"}</p>
                <ul>
                {
                    bagItems.map(function(item,index){
                        return <li key={index}>{ item.name + ': ' + item.quantity}</li>;
                    })
                }
                </ul>
             </div>
        )
    },

    addNewBagItem: function(bagItem){
        var items = this.state.bagItems.slice();
        items.push(bagItem);
        this.setState({bagItems: items})
    }

});




//TODO solve problem when updating parent state
//var InputWithLabel = React.createClass({
//    displayName: 'InputWithLabel',
//    getDefaultProps: function(){
//        return { label: 'label',updateParent: function(){},type: 'text'}
//    },
//    getInitialState: function(){
//        return {value: this.props.value}
//    },
//    render: function(){
//        return(
//            <div className="form-group">
//                <label >{this.props.label}</label>
//                <input onChange={this.handleChange.bind(this)} name={this.props.name} className="form-control" value={this.state.value} type={this.props.type}></input>
//            </div>
//        )
//    },
//    handleChange: function(e){
//        var data = {};
//        data[this.props.name] = e.target.value;
//        this.setState({value:e.target.value});
//        this.props.updateParent(data);
//    }
//});
