(function(){
   self.Genetic = function(items,bagSize,individualNumber){
       this.items = items;
       this.setBagSize = parseInt(bagSize);
       this.setIndividualNumber = parseInt(individualNumber);
       this.MAX_VALUE = Number.MAX_SAFE_INTEGER;
       this.CROSSOVER_PROBABILITY = 0.94;
       this.MUTATION_PROBABILITY = 0.98;
   };
    Genetic.prototype = {
        set setIndividualNumber(number){
            this.individualNumber = number;
            this.regeneratePopulation();
        },
        set setBagSize(bagSize){
            this.bagSize = parseInt(bagSize);
            this.regeneratePopulation();
        }

    };
    Genetic.prototype.addItem = function(item){
        this.items.push(item);
        this.regeneratePopulation();

    };

    Genetic.prototype.nextStepRoullet = function(){
        var i,mother,father;
        var newPopulation = [];
        var acumulatedFitness = 0;
        //=========Add normalizefitness for selection=======//
        for( i = 0;i < this.population.length;i++){
            this.population[i].normalizeFitness = this.population[i].fitness / this.population.acumulatedFitness;
        }
        this.population.sort(function(a,b){return  b.fitness - a.fitness ;});
        for( i = 0;i < this.population.length;i += 2){
            //=========Selection=======//
            mother = this.selectFromRoulette();
            father = this.selectFromRoulette();
            //=========Crossover=======//
            if(Math.random() > this.CROSSOVER_PROBABILITY){
                newPopulation = newPopulation.concat(this.singleCrossOver(mother,father));
                console.log("Crossover");
            }else{
                newPopulation[i] = mother;
                newPopulation[i + 1] = father;
            }
            //=========Muatation=======//
            this.mutation(newPopulation[i]);
            this.mutation(newPopulation[i + 1]);
            //obtain the fitness for the new elements
            this.getFitnessAndWeightSum(newPopulation[i]);
            this.getFitnessAndWeightSum(newPopulation[i + 1]);
            acumulatedFitness += newPopulation[i].fitness + newPopulation[i + 1].fitness;
        }


        this.population = newPopulation;
        this.population.acumulatedFitness = acumulatedFitness;
        return this.population.slice();
    };
    Genetic.prototype.mutation = function(individual){
        var i;

        for(i = 0;i < individual.length;i++){
            if(Math.random() > this.MUTATION_PROBABILITY){
                individual[i] = individual[i] == 0 ? 1 : 0;
                console.log("Mutate 2 " + individual);
            }
        }
    };
    Genetic.prototype.singleCrossOver = function(mother,father){
        //divide each individual in half and cross every half with the other
        var newChild1 = mother.slice(0,mother.length  / 2);
        var newChild2 = father.slice(0,father.length / 2);
        newChild1 = newChild1.concat(father.slice((father.length / 2) ,father.length));
        newChild2 = newChild2.concat(mother.slice((mother.length / 2) ,mother.length));
        return [newChild1,newChild2];

    };
    Genetic.prototype.selectFromRoulette = function(){
        var random = Math.random();
        var i;
        var acummulate = 0;
        for( i = 0;i < this.population.length;i++) {
            acummulate += this.population[i].normalizeFitness;
            if(acummulate > random){
                console.log(this.population[i]);
                return this.population[i].slice();
            }
        }
        return this.population[0];
    };

    Genetic.prototype.regeneratePopulation = function(){
        this.population = [];
        var i;
        var acumulatedFitness = 0;
        for( i = 0;i < this.individualNumber; i++){
            this.population.push(this.generateIndividual());
            this.getFitnessAndWeightSum(this.population[i]);
            //if the individual came with bagWeight overload then sen the acumulated fitness to max
            acumulatedFitness += this.population[i].fitness;
        }
        this.population.acumulatedFitness = acumulatedFitness;
    };
    Genetic.prototype.generateIndividual = function(){
        var i;
        var individual = [];
        for(i = 0;i < this.items.length;i++){
            individual[i] = Math.floor((Math.random() *2));
        }
        return individual;
    };
    Genetic.prototype.getFitnessAndWeightSum = function(individual){
        var weightSum = 0,fitness = 0,i;
        for(i = 0;i < individual.length;i++){
            if(individual[i] == '1') {
                //if the bag is max size
                if (parseInt(this.items[i].weight) + weightSum > this.bagSize) {
                    individual.weightSum = this.MAX_VALUE;
                    individual.fitness = 0;
                    return;
                }
                else {
                    fitness += this.items[i].benefit;
                    weightSum += this.items[i].weight;
                }
            }
        }
        individual.weightSum = weightSum;
        individual.fitness = fitness;
    };
    Genetic.prototype.getBetter = function(){

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
