var GeneticApp = React.createClass({
    displayName: 'GeneticApp',

    getDefaultProps: function(){
        return {items: []}
    },
    getInitialState: function(){
        this.genetic = new Genetic([],10,10,10);

        return {bagItems: this.props.items,numberGenerations: 10,newGeneration: [],advanceGenerations: 0,individuals: 10}
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
                <h2>Generacion</h2>
                <GeneticConfigForm updateParent={this.configChange}/>
                <button className="btn btn-default" onClick={this.newGeneration}>Avanzar una generacion</button>
                <button className="btn btn-primary" onClick={this.selfAdvance}>Avanzar solo</button>
                <div className="row">
                    <div className="col-md-12">
                        <p>Numero de generacion: {this.state.numberGenerations} Genraciones que han pasado: {this.state.advanceGenerations} </p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"  aria-valuemin="0" aria-valuemax="100" style={{ width: ((this.state.advanceGenerations*100)/this.state.numberGenerations) + '%'}}>
                            </div>
                        </div>
                        {this.valuesDisplay(this.state.newGeneration)}
                    </div>
                </div>
            </div>
        );
    },
    newGeneration: function(){
        var generation = this.genetic.nextStepRoullet();
        this.setState({newGeneration: generation,advanceGenerations: this.state.advanceGenerations + 1});

    },
    selfAdvance: function(){
        var i, initial = this.state.advanceGenerations,final = this.state.numberGenerations;
        for(i = initial;i < final;i++){
            console.log(i);
            this.setState({newGeneration: this.genetic.nextStepRoullet(),advanceGenerations: i + 1});
        }
    },
    configChange: function(data){
        data['newGeneration'] = this.genetic.population;
        if(data.bagSize){
            this.genetic.setBagSize = data.bagSize;
        }
        if(data.individuals){
            this.genetic.setIndividualNumber = data.individuals;
            this.setState({newGeneration: this.genetic.population})
        }
        this.setState(data);

    },
    valuesDisplay: function(items){
        return (
            <div>
                <p>{"Numero de indivduos ("  + items.length + ") Tamano de bolsa: " + parseInt(this.genetic.bagSize)}</p>
                <ul>{
                    items.map(this.createChromosomeString)
                    }
                </ul>
            </div>
        )

    },
    createChromosomeString: function(items,index){
        var i;
        var chromosomes = "";
        for(i = 0;i < items.length;i++){
            chromosomes += items[i];
        }

        return <li key={index}>{chromosomes + " | fitness: " + items.fitness}</li>;
    },
    bagElementsList: function(bagItems){

        return (
             <div>
                <p>{"Numero de elementos ("  + bagItems.length + ")"}</p>
                <ul>
                {
                    bagItems.map(function(item,index){
                        return <li key={index}>{'Id: '+ item.name + ' weigth: ' + item.weight +' Value: ' +item.benefit}</li>;
                    })
                }
                </ul>
             </div>
        )
    },

    addNewBagItem: function(bagItem){
        var items = this.state.bagItems.slice();
        items.push(bagItem);
        this.genetic.addItem(bagItem);
        this.setState({bagItems: items,newGeneration: this.genetic.population,advanceGenerations: 0})
    }

});


//TODO solve problem when updating parent state
//var InputWithLabel = React.createClass({
//    displayName: 'InputWithLabel',
//    getDefaultProps: function(){
//        return { label: 'label',updateParent: function(){},type: 'text'}
//    },
//    getInitialState: function(){
//        return {value: this.props.benefit}
//    },
//    render: function(){
//        return(
//            <div className="form-group">
//                <label >{this.props.label}</label>
//                <input onChange={this.handleChange.bind(this)} name={this.props.name} className="form-control" value={this.state.benefit} type={this.props.type}></input>
//            </div>
//        )
//    },
//    handleChange: function(e){
//        var data = {};
//        data[this.props.name] = e.target.benefit;
//        this.setState({value:e.target.benefit});
//        this.props.updateParent(data);
//    }
//});
