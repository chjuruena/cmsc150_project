

var rio = require("rio");
rio.$e({
   
    command: "",
    filename: "simplex.r",

    entrypoint: "main", // entrypoint is called
    data: { foo: "bar" }, // data is stringified and passed to entrypoint

    callback: function (err, res) {
        if (!err) {
            console.log(res);
        } else {
            console.log("Rserve call failed. " + err);
        }
    },
    p1 : new Promise(function(resolve, reject) {
      resolve("Success!");
      // or
      // reject ("Error!");
      if (!err) {
            console.log(res);
        } else {
            console.log("Rserve call failed. " + err);
        }
    }),
    host : "127.0.0.1",
    port : "6311",
    path : undefined,

    user : "anon",
    password : "anon"

}).then(function (res) {
    console.log(res);
}, function(reason) {
  console.log(reason); // Error!
});

