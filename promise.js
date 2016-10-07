"use strict"
//3 promises
let cleanTheRoom = function() {
    return new Promise(function(resolve, reject) {
        resolve('Cleaned the Room, ');
    });
};
let removedTheGarbage = function(message) {
    return new Promise(function(resolve, reject) {
        resolve(message + 'removed the garbage, ');
    });
};
let getIcecream = function(message) {
    return new Promise(function(resolve, reject) {
        resolve(message + 'got icecream.');
    });
};

//message gets concat from fulfilling each promise
cleanTheRoom().then(function(message) {
    return removedTheGarbage(message);
}).then(function(message) {
    return getIcecream(message);
}).then(function(message) {
    console.log('This is the message:\n' + message);
});

//do all in parallel, all 3 promises at same time and once all done then do something:
Promise.all([ cleanTheRoom(), removedTheGarbage('i '), getIcecream('i ')]).then(function(done) {
    console.log('Everythings done..' + done );
});
//we can use race for as soon as any promise is finished,then do something

Promise.race([getIcecream('i ') , cleanTheRoom() , removedTheGarbage('i ') ]).then(function(done) {
    console.log('one of them is finished which one? ' + done);
});
