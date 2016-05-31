var Parallel = React.createClass({
    displayName: 'GeneticAppOneMax',
    getDefaultProps: function(){
        return {items: []}

    },
    getInitialState: function(){
        this.genetic1 = new Genetic([],10,20);
        this.genetic2 = new Genetic([],10,20);
        this.genetic3 = new Genetic([],10,20);
        this.genetic4 = new Genetic([],10,20);
        
        return {bagItems: this.props.items,numberGenerations: 10,newGeneration: [],advanceGenerations: 0,individuals: 20,elite1: [], elite2: [], elite3: [], elite4: []}
    },
    render:  function() {
        return (
            <div>
                <h1>Eda Paralelo</h1>
                <h2>Agrega elementos que se pueden agregara la mochila</h2>
                <div className="row"><ItemFromBagForm newItemHandler={this.addNewBagItem}/></div>
                <div className="row">
                    <div className="col-md-3">
                        {this.bagElementsList(this.state.bagItems)}
                    </div>
                </div>
                <h2>Generacion</h2>
                <button className="btn btn-default" onClick={this.newGeneration}>Avanzar una generacion</button>
                <div className="row">
                    <div className="col-sm-6"><h4>Generacion </h4>{this.valuesDisplay(this.state.newGeneration)}</div>
                </div>
                    <div className="col-sm-6"><h4>10 Mejores 1 isla</h4>{this.valuesDisplay(this.state.elite1)}</div>
                    <div className="col-sm-6"><h4>10 Mejores 2 isla</h4>{this.valuesDisplay(this.state.elite2)}</div>
                    <div className="col-sm-6"><h4>10 Mejores 3 isla</h4>{this.valuesDisplay(this.state.elite3)}</div>
                    <div className="col-sm-6"><h4>10 Mejores 4 isla</h4>{this.valuesDisplay(this.state.elite4)}</div>

            </div>
        );
    },
    valuesDisplay: function(items){
        return (
            <div>
                <p>{"Numero de indivduos ("  + items.length + ") Tamano de bolsa: " + parseInt(this.genetic1.bagSize)}</p>
                <ul>
                    {items.map(this.createChromosomeString)}
                </ul>
            </div>
        )

    },
    newGeneration: function(){
        var value1 = this.genetic1.nextStepOneMax(10);
        var value2 = this.genetic2.nextStepOneMax(10);
        var value3 = this.genetic3.nextStepOneMax(10);
        var value4 = this.genetic4.nextStepOneMax(10);
        var newGen = this.newGen();
        this.setState({newGeneration: newGen,elite1: value1.best, elite2: value2.best, elite3: value3.best, elite4: value4.best,advanceGenerations: this.state.advanceGenerations + 1});
        this.genetic1.setPopulation = newGen;
        this.genetic2.setPopulation= newGen;
        this.genetic3.setPopulation = newGen;
        this.genetic4.setPopulation = newGen;
    },
    newGen: function () {
        var newGeneration = [];
        for(var i = 0;i < 5; i++){
            newGeneration.push(this.genetic1.population[i]);
            newGeneration.push(this.genetic2.population[i]);
            newGeneration.push(this.genetic3.population[i]);
            newGeneration.push(this.genetic4.population[i]);
        }
        return newGeneration;
    },
    createChromosomeString: function(items,index){
        var i;
        var chromosomes = "";
        for(i = 0;i < items.length;i++){
            chromosomes += items[i];
        }

        return <li key={index}>{chromosomes + " | fitness: " + items.fitness}</li>;
    },
    addNewBagItem: function(bagItem){
        var items = this.state.bagItems.slice();
        items.push(bagItem);
        this.genetic1.addItem(bagItem);
        this.genetic2.addItem(bagItem);
        this.genetic3.addItem(bagItem);
        this.genetic4.addItem(bagItem);
        this.setState({bagItems: items,newGeneration: this.newGen(),advanceGenerations: 0})
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