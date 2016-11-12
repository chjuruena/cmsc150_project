var startParams = [1, 1, 1, 1, 1]; // starting values, if there are 5 parameters

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

function Simplex(StartPars, Steps, Epsilon) {
/*
% The structure elements are the following:
%   t.n  number of elements in the parameter vector
%   t.prow row vector of parameters presently being tested
%   t.simp the simplex matrix, (n+1) row vectors
%   t.vals the (n+1) element column vector of function values
%   t.high index of the highest t.vals element
%   t.low index of the lowest t.vals element
%   t.centr centroid row vector of the best n vertices
%   t.index counter for loops
%   t.state the state variable of the machine
%   t.epsilon is the largest score that is considered converged
*/
    var t = this;
    t.n=StartPars.length;
    t.prow=StartPars.slice();
    
    // Handle defaults for the step size.
    Steps = Steps || 0.1;
    if ( typeof(Steps.length) === 'undefined' ) { // Only a scalar given.
         var zerostep = 1e-3;
         Steps = t.prow.map(function(p) {
             return Steps*p || zerostep;
         });
    }
    
    // The simplex is (n+1) row vectors.
    // vals is a column vector of function values
    t.simp = [];
    t.vals = [];
    for (var i=0; i<=t.n; ++i) {
        t.simp[i] = t.prow.slice();
        if ( i ) {
            t.simp[i][i-1] += Steps[i-1];
            t.vals[i-1] = 0;
        }
    }
    
    // Initialize the other variables
    t.index=0;
    t.state=1;
    t.high=0;
    t.low=0;
    t.centr=t.prow;
    t.epsilon = Epsilon || 1e-8;
};

Simplex.prototype.centroid = function() {
    var t = this;
    return sumColumns(t.simp).map(function(s) { return s/(t.n+1); });
};

Simplex.prototype.converged = function(epsilon) {
    var t = this;
    var err = Math.max.apply(null, t.vals) - Math.min.apply(null, t.vals);
    epsilon = epsilon || t.epsilon;
    return (t.state === 3) && (err < epsilon);
};

Simplex.prototype.next = function(y) {
    var t = this;
    if ( t.state === 1 ) { // Start-up
        t.vals[t.index]=y;  // pick up the function value from last time.
        t.index++;
        if ( t.index <= t.n ) { // % continue to fill up the simplex
            t.prow = t.simp[t.index];
        } else {// Simplex is full, make the first move
            t.state=3;
        }
    } else if ( t.state === 3 ) { // Test a new vertex
        var i=t.high;
        if ( y < t.vals[i] ) { // The new vertex is better than some.
            t.simp[i] = t.prow.slice(); // replace the worst one.
            t.vals[i]=y;
            if ( y < t.vals[t.low] ) { // The new vertex is better than the best,
                t.prow = t.simp[i].map(function(s,is) { return s + 1.1*(s-t.centr[is]); }); // so, expand in the new direction.
                t.prevy=y;
                t.state=4;
            } else {
                t.state=3;
            }
        } else { // the new vertex is worse than the worst: contract.
            t.prow=t.simp[t.high].map(function(s,is) { return 0.5*(s+t.centr[is]); });
            t.state=5;
        }
    } else if ( t.state === 4 ) { // Test an expansion
        if ( y < t.prevy ) { // Accept the expansion
            t.simp[t.high] = t.prow.slice();
            t.vals[t.high] = y;
        }
        t.state=3;
    } else if ( t.state === 5 ) { // Test a contraction
        if ( y < t.vals[t.high] ) { // Accept the contraction
            t.simp[t.high] = t.prow.slice();
            t.vals[t.high]=y;
            t.state=3;
        } else { // contract the whole simplex toward the best vertex.
           t.index=0;
           t.simp[0] = t.simp[0].map(function(s, is) {
               return 0.5*(s + t.simp[t.low][is]);
           });
           t.prow=t.simp[0];
           t.state=6;
        }
    } else if ( t.state === 6 ) {
        t.vals[t.index] = y; // pick up the function value.
        t.index++;
        var i=t.index;
        if ( i <= t.n ) {
            t.simp[i] = t.simp[i].map(function(s,is) {
                return 0.5*(s + t.simp[t.low][is]);
            });
            t.prow = t.simp[i].slice();
            t.state=6; // continue evaluating the vertices
        } else {
            t.state=3;
        }
    } // end switch
   
    if ( t.state === 3 ) { // Normal exit mode: sort the vertices and try a reflection.
        // assign min and max
        var lo = t.vals[0],
            iLo = 0,
            hi = t.vals[0],
            iHi = 0;
        t.vals.forEach(function(v,i) {
            if ( v < lo ) {
                lo = v;
                iLo = i;
            }
            if ( v > hi ) {
                hi = v;
                iHi = i;
            }
        });
        t.low = iLo;
        t.high = iHi;
        // find the excluded centroid
        var sum = sumColumns(t.simp);
        t.centr = t.simp[t.high].map(function(s,is) { return (sum[is] - s) / t.n; });
        // reflect about the centroid from the highest vertex
        t.prow = t.simp[t.high].map(function(s,is) { return 2*t.centr[is] - s; });
    }
   
    return t.prow;
};

function sumColumns(mat) {
    var n = mat.length;
    var m = n ? mat[0].length : 0;
    var sums = [];
    for (var j=0; j<m; ++j) {
        var sum = 0.0;
        for (var i=0; i<n; ++i) {
           sum += mat[i][j];
        }
        sums[j] = sum;
    }
    return sums;
}


/* Promise-based run() method */

Simplex.prototype.run = function(scoreFunc, config) {
    // scoreFunc: (params) => Promise(score)
    // shouldContinue: (params, score, iteration) => boolean
    // returns: Promise({params, score, iteration, centroid})
    var maxIterations = config.maxIterations || 200;
    var shouldContinue = config.shouldContinue || function(){return true;};
    var t = this;
    t.iter = 0;
    function finished(params, score) {
        // Returns true on max iterations, !shouldContinue(), or convergence
        return ( t.iter && ((t.iter === maxIterations) ||
                            (! shouldContinue(params, score, t.iter)) ||
                           t.converged()) );
    }
    // The promised result is an object with params, score, iteration, and centroid; available when finished()
    return new Promise(function(resolve, reject) {
        // Each iteration begins with the asynchronous resolution of the previous params' score
        function nextIteration(params, score) {
            if ( finished(params, score) ) {
                var centroid = t.centroid();
                scoreFunc(centroid).then(function(centroidScore) {
                    resolve({
                        score: centroidScore,
                        iteration: t.iter,
                        params: centroid,
                        centroid: centroid
                    });
                });
                return;
            } else if ( t.iter === 0 ) { // first iteration's params are from Simplex constructor
                params = t.prow;
            } else { // for subsequent iterations they are computed given the previous params' score
                params = t.next(score);
            }
            t.iter++;
            scoreFunc(params).then(function(score) {
                // Request next score(params), then iterate when it's ready
                nextIteration(params, score);
            });
        }
        // Start the first iteration immediately
        nextIteration();
    });
};

/* Test / Example */

function sqr(x) { return x*x; }

Simplex.test = function(params, fun) {
    // if not provided, we test the optimizer's ability to find params=[2,-5]
    fun = fun || function(params) {
        return sqr(params[0]-2) + sqr(params[1]-(-5));
    };
    params = params || [1, 1];
    var simplex = new Simplex(params);
    for (var iter=0; iter<200; ++iter) {
        var y = fun(params);
        params = simplex.next(y);
        if ( ! (i%10) ) { // every 10 iterations print out the fitted value
            console.log('value',y,'at params',params,'iteration',iter);
        }
        if ( simplex.converged() ) {
            break;
        }
    }
    params = simplex.centroid();
    console.log('final params',params);
    return params;
};

Simplex.testRun = function(params, scoreFunc, maxIterations, shouldContinue) {
    scoreFunc = scoreFunc || function(params) {
        return Promise.resolve(sqr(params[0]-2) + sqr(params[1]-(-5)));
    };
    shouldContinue = shouldContinue = function(params, score, iter) {
        console.log('iteration',iter,'score',score,'params',params);
        return true;
    };
    params = params || [1,1];
    
    new Simplex(params)
        .run(scoreFunc, {shouldContinue: shouldContinue})
        .then(function(result) {
            console.log('finished after iteration',result.iteration,'score',result.score,'centroid',result.centroid);
        });
};