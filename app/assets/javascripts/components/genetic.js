(function(){
   self.Genetic = function(items,bagSize,individualNumber){
       this.items = items;
       this.setBagSize = parseInt(bagSize);
       this.setIndividualNumber = parseInt(individualNumber);


   };
    Genetic.prototype = {
        set setIndividualNumber(number){
            this.individualNumber = number;
            this.regeneratePopulation();
        },
        set setBagSize(bagSize){
            this.bagSize = parseInt(bagSize);
            this.regeneratePopulation();
        },

    };
    Genetic.prototype.addItem = function(item){
        this.items.push(item);
        this.regeneratePopulation();

    };

    Genetic.prototype.nextStepRoullet = function(){

        var fitnessAcummulate = 0;
        for(var i = 0;i < this.population.length;i++){
            fitnessAcummulate += this.population[i].fitness;
            console.log(fitnessAcummulate);
        }
        for(var i = 0;i < this.population.length;i++){
            this.population[i].normalizeFitness = this.population[i].fitness / fitnessAcummulate;
        }
       this.population.sort(function(a,b){a.fitness});


        return this.population.slice();
    };

    Genetic.prototype.regeneratePopulation = function(){
        this.population = [];
        for(var i = 0;i < this.individualNumber; i++){
            this.population.push(this.shuffle_individual(this.items));
            var weightSum = 0;
            var fitness = 0;
            for(var e = 0;e < this.population[i].length;e++){
                if(parseInt(this.population[i][e].weight) + weightSum > this.bagSize){
                    break;
                }
                weightSum += parseInt(this.population[i][e].weight);
                fitness += parseInt(this.population[i][e].benefit);
            }
            this.population[i].weightSum = weightSum;
            this.population[i].fitness = fitness;
        }
    };
    Genetic.prototype.shuffle_individual = function(items){
        for(var i = items.length - 1;i > 0 ;  i--){
            var random = Math.floor(Math.random() * i );
            var a = {name: items[random].name,weight: items[random].weight,benefit: items[random].benefit };
            items[random] = items[i];
            items[i] = a;
        }
        return items.slice();
    };


})();
