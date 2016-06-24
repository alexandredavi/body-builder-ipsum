var bodyBuilderIpsum = require('./gerador')

console.log(
    bodyBuilderIpsum({
        count: 3,
        units: 'paragrafos',
        paragraphUpperBound: 15
    })
);