var GeneticApp = React.createClass({
    displayName: 'GeneticApp',

    getDefaultProps: function(){
        return {items: []}
    },
    getInitialState: function(){
        this.genetic = new Genetic([],10,10,10);

        return {bagItems: this.props.items,numberGenerations: 0,newGeneration: []}
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
                <GeneticConfigForm updateParent={this.handleNumberOfGeneration}/>
                <button className="btn btn-primary" onClick={this.newGeneration}>Avanzar una generacion</button>
                <button className="btn btn-warning">Parar</button>
                <div className="row">
                    <div className="col-md-3">
                        {this.valuesDisplay(this.state.newGeneration)}
                    </div>
                </div>
            </div>
        );
    },
    newGeneration: function(){
        var generation = this.genetic.nextStep();
        this.setState({newGeneration: generation});

    },
    handleNumberOfGeneration: function(numberGenerations){
        this.setState({numberGenerations: numberGenerations});
    },
    valuesDisplay: function(items){
        return (
            <div>
                <p>{"Numero de cromosomas ("  + items.length + ")"}</p>
                <ul>{
                    items.map(function (individual, index) {
                        return <li key={index}>{ individual.map(function(item){return item.quantity + '-';})}</li>;
                    })
                    }
                </ul>
            </div>
        )

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
        bagItem.quantity = parseInt(bagItem.quantity);
        var items = this.state.bagItems.slice();
        items.push(bagItem);
        this.genetic.addItem(bagItem);
        this.setState({bagItems: items,newGeneration: this.genetic.population})
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
