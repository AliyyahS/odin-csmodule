// Using iteration

function fibs(index, arr = [0, 1]) {
    if (index <= 2) return arr

    for (let i = 2; i < index; i++) {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2])
    }
    
    return arr
}

// Using recursion

function fibsRec(index, arr = [0, 1]) {
    if (index <= 2) return arr

    arr.push(arr[arr.length - 1] + arr[arr.length - 2])
    return fibsRec(index - 1, arr)
}

// Tests

console.log(fibs(8)) // [0,1,1,2,3,5,8,13]
console.log(fibsRec(9)) // [0,1,1,2,3,5,8,13,21]