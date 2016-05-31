var GeneticAppOneMax = React.createClass({
    displayName: 'GeneticAppOneMax',
    getDefaultProps: function(){
        return {items: []}

    },
    getInitialState: function(){
        this.genetic = new Genetic([],10,25);
        return {bagItems: this.props.items,numberGenerations: 10,newGeneration: [],advanceGenerations: 0,individuals: 25,eliteGeneration: []}
    },
    render:  function() {
        return (
            <div>
                <h1>EDA</h1>
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
                <div className="row">
                    <div className="col-sm-6"><h4>Generacion </h4>{this.valuesDisplay(this.state.newGeneration)}</div>
                    <div className="col-sm-6"><h4>10 Mejores </h4>{this.valuesDisplay(this.state.eliteGeneration)}</div>
                </div>
            </div>
        );
    },
    valuesDisplay: function(items){
        return (
            <div>
                <p>{"Numero de indivduos ("  + items.length + ") Tamano de bolsa: " + parseInt(this.genetic.bagSize)}</p>
                <ul>
                {items.map(this.createChromosomeString)}
                </ul>
            </div>
        )

    },
    newGeneration: function(){
        var value = this.genetic.nextStepOneMax(10);
        this.setState({newGeneration: value.population,eliteGeneration: value.best,advanceGenerations: this.state.advanceGenerations + 1});


    },
    createChromosomeString: function(items,index){
        var i;
        var chromosomes = "";
        for(i = 0;i < items.length;i++){
            chromosomes += items[i];
        }

        return <li key={index}>{chromosomes + " | fitness: " + items.fitness}</li>;
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
    addNewBagItem: function(bagItem){
        var items = this.state.bagItems.slice();
        items.push(bagItem);
        this.genetic.addItem(bagItem);
        this.setState({bagItems: items,newGeneration: this.genetic.population,advanceGenerations: 0})
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
    }
});