(function(){
   self.Genetic = function(items,bagSize,individualNumber){
       this.items = items;
       this.setBagSize = bagSize;
       this.setIndividualNumber = individualNumber;


   };
    Genetic.prototype = {
        set setIndividualNumber(number){
            this.individualNumber = number;
            this.regeneratePopulation();
        },
        set setBagSize(bagSize){
            this.bagSize = bagSize;
        },

    };
    Genetic.prototype.addItem = function(item){
        this.items.push(item);
        this.regeneratePopulation();

    };

    Genetic.prototype.nextStep = function(){
        this.regeneratePopulation();
        return population;
    };

    Genetic.prototype.regeneratePopulation = function(){
        this.population = [];
        for(var i = 0;i < this.individualNumber; i++){
            this.population.push(this.shuffle_individual(this.items));
        }
    };
    Genetic.prototype.shuffle_individual = function(items){
        for(var i = items.length - 1;i > 0 ;  i--){
            var random = Math.floor(Math.random() * i );
            var a = {name: items[random].name,quantity: items[random].quantity};
            items[random] = items[i];
            items[i] = a;
        }
        return items;
    };


})();