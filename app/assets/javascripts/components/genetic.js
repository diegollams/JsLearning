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
        for( i = 0;i < this.population.length;i++){
            this.population[i].normalizeFitness = this.population[i].fitness / this.population.acumulatedFitness;
        }
        this.population.sort(function(a,b){return  b.fitness - a.fitness ;});


        for( i = 0;i < this.population.length;i += 2){
            mother = this.selectFromRoulet();
            father = this.selectFromRoulet();
            newPopulation = newPopulation.concat(this.singleCrossOver(mother,father));
            this.getFitnessAndWeightSum(newPopulation[i]);
            this.getFitnessAndWeightSum(newPopulation[i + 1]);
            acumulatedFitness += newPopulation[i].fitness + newPopulation[i + 1];
            console.log(newPopulation);
        }
        this.population.acumulatedFitness = acumulatedFitness;
        this.population = newPopulation;
        return this.population.slice();
    };
    Genetic.prototype.singleCrossOver = function(mother,father){
        var newChild1 = mother.slice(0,mother.length  / 2);
        var newChild2 = father.slice(0,father.length / 2);
        newChild1 = newChild1.concat(father.slice((father.length / 2) ,father.length));
        newChild2 = newChild2.concat(mother.slice((mother.length / 2) ,mother.length));
        //console.log(newChild1);
        //console.log(newChild2);
        return [newChild1,newChild2]

    };
    Genetic.prototype.selectFromRoulet = function(){
        var random = Math.random();
        var i;
        var acummulate = 0;
        for( i = 0;i < this.population.length;i++) {
            acummulate += this.population[i].normalizeFitness;
            if(acummulate > random){
                return this.population[i];
            }
        }
    };

    Genetic.prototype.regeneratePopulation = function(){
        this.population = [];
        var i;
        var acumulatedFitness = 0;
        for( i = 0;i < this.individualNumber; i++){
            this.population.push(this.shuffle_individual(this.items));
            this.getFitnessAndWeightSum(this.population[i]);
            acumulatedFitness += this.population[i].fitness;
        }
        this.population.acumulatedFitness = acumulatedFitness;
    };
    Genetic.prototype.getFitnessAndWeightSum = function(indivual){
        var weightSum = 0,fitness = 0,i;
        for(i = 0;i < indivual.length;i++){
            if(parseInt(indivual[i].weight) + weightSum > this.bagSize){
                break;
            }
            fitness += indivual[i].benefit;
            weightSum += indivual[i].weight;
        }
        indivual.weightSum = weightSum;
        indivual.fitness = fitness;
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
