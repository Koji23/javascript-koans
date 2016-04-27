var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried   tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = _.filter(products, function(pizza){
        hasMushrooms = _.any(pizza.ingredients, function(item){
          return item === "mushrooms";
        })
        return !hasMushrooms && !pizza.containsNuts;
      });

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1000).reduce(function(memo, item){
      if(item % 3 === 0 || item % 5 === 0){
        return memo + item;
      }
      return memo;
    });    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = _.chain(products)
                            .map(function(pizza){return pizza.ingredients})
                            .flatten()
                            .reduce(function(memo, item){
                              if(item in memo){
                                memo[item]++;
                              } else {
                                memo[item] = 1;
                              }
                              return memo;
                            }, { "{ingredient name}": 0 })
                            .value();

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
 
  it("should find the largest prime factor of a composite number", function (compNum) {
    var primeNum = 1;
    function isPrime(num){
      for(var i=2; i<num; i++){
        if(num%i === 0){
          return false
        }
      }
      return true;
    }
    for(var j=2; j<compNum; j++){
      if(isPrime(j) && (compNum%j === 0) ){
        primeNum = j;
      }
    }
    return primeNum;
  });
  
  it("should find the largest palindrome made from the product of two 3 digit numbers", function (num1, num2) {
    var result;
    var product = String(num1 * num2).split("");
    var histogram = product.reduce(function(combine, item){
      combine[item] = (combine[item] || 0) + 1;
      return combine;
    }, {});
    var biggestSingle;
    for(var i in histogram){
      if(histogram[i] === 1){
        if(biggestSingle === undefined || i > biggestSingle){
        biggestSingle = i; 
        } 
        delete histogram[i];
      }
    }
    biggestSingle = String(biggestSingle);
    var doubles = Object.keys(histogram).sort(function(a,b){
      return b - a;
    });
    result = doubles[0];
    for(var k=1; k<doubles.length; k++){
      result += doubles[k]; 
    }
    result = result + biggestSingle + result.split("").reverse().join("");
    return result;
  });


  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    //Too Slow
    var start = 20; //passes on 232792560, takes over 2 seconds to reach
    function isDivisible1_20(num){
      for(var i=20; i>=2; i--){  //start checking backwards from 20, end in 2
        if(num%i !== 0){
          return false 
        }
      }
      return true;
    }
    while(!isDivisible1_20(start)){
      start += 10;  //a number divisible by 10 must always end in 0
    }
    return start;
  });

  it("should find the difference between the sum of the squares and the square of the sums", function (num1, num2) {
    
    var sumOfTheSquares = Math.pow(num1, 2) + Math.pow(num2, 2);
    var squareOfTheSums = Math.pow((num1 + num2), 2);
  
    return sumOfTheSquares - squareOfTheSums;
  });

  it("should find the 10001st prime", function () {
    //WAY Too Slow
    var primes = [];
    var start = 2;
    function isPrime(num){
      for(var i=num-1; i>=2; i--){
        if(num % i !== 0){
          return false; 
        }
      }
      return true;
    }
    while(primes.length < 10001){
      if(isPrime(start))
        primes.push(start);
      start++;
    }
    return primes[primes.length - 1];
  });

});
