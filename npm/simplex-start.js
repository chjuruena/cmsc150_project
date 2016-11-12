import { Simplex } from '/simplex2'; // or: from '/path/to/simplex'

let startParams = [1, 1, 1, 1, 1]; // starting values, if there are 5 parameters

new Simplex(startParams)
    .run(
        function(params) { // score callback
           return Promise.resolve(scoreOf(params)); // simplest way to return a promise, if you know the answer right away
        },
        {
            maxIterations: 200,
            shouldContinue: function(params, score, iteration) {
                console.log('iteration',iteration,score,params);
                return true; // return false to stop iteration
            }
        }
    )
    .then(function(result) {
        console.log('result',result.score,result.centroid);
    });