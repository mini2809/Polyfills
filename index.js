// polyfills for promises

const fastpromise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject("resolved after 1 sec");
    },1000);
});
const slowpromise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("resolved after 4 sec");
    },4000);
});
const midpromise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject("resolved after 2 sec");
    },2000);
});

//polyfill for Promise.all 
//Promise.all returns set of promises which are fulfilled,if any rejects it will reject as a whole.

function customPromiseAll(promises){
    console.log(promises);
    let fulfilledPromise = [];
    let count =0;
    return new Promise((resolve,reject)=>{
        promises.forEach((promise)=>{
            promise.then((res)=>{
                fulfilledPromise.push(res);
                count++;
                if(count == promises.length) resolve(fulfilledPromise);
            }).catch(err=> reject(err));
        })
    })
}
//customPromiseAll([fastpromise,slowpromise,midpromise]);

// Polyfill for Promise.allSettled -> this will wait for every promise and collect all settled promises ,it will igonre reject ones, It will throw error only when all promises rejects

function customPromiseAllSettled(promises){
    let fulfilledPromise = [];
    let count = 0;
    return new Promise((resolve,reject)=>{
        promises.forEach((promise)=>{
            promise.then((res)=>{
                fulfilledPromise.push(res);
                count++;
                if(count == promises.length) resolve(fulfilledPromise);
            }).catch(err=> {
                count++;
                if(count == promises.length) reject("All promises got rejected")
            });
        })
    })
}
//console.log(Promise.allSettled([fastpromise,slowpromise,midpromise]));
//console.log(customPromiseAllSettled([fastpromise,slowpromise,midpromise]));

// polyfill for promise.any  -> if any of the promise gets reolved will be returned.

function customPromiseAny(promises){
    let count=0;
    return new Promise((resolve,reject)=>{
        promises.forEach((promise)=>{
            promise.then((res)=>{
                resolve(res);
            }).catch(()=>{
                count++;
                if(count == promises.length) reject("All promises got rejected");
            })
        })
    })
}
//console.log(customPromiseAny([fastpromise,slowpromise,midpromise]));

function customPromiseRace(promises){
    return new Promise((resolve,reject)=>{
        promises.forEach((promise)=>{
            promise.then((res)=>resolve(res))
            .catch(err=> reject(err));
        })
    })
}
console.log(customPromiseRace([fastpromise,slowpromise,midpromise]));