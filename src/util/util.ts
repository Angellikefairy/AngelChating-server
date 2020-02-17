const thuntify = require('thunkify');

export const bePromise = (fn,...args) => {
    const thunkFn = thuntify(fn);
    return new Promise((resolve,reject) => {
        thunkFn(...args)((data,err) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    }); 
}