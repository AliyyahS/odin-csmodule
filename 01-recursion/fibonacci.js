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

// Using dynamic programming (more efficient for larger numbers)
function fibsDP(index) {
    if (index <= 2) return [0, 1].slice(0, index)
    
    const dp = new Array(index)
    dp[0] = 0
    dp[1] = 1
    
    for (let i = 2; i < index; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }
    
    return dp
}

// Using generator (memory efficient for large sequences)
function* fibsGenerator(index) {
    if (index <= 0) return
    yield 0
    if (index <= 1) return
    yield 1
    
    let prev = 0
    let current = 1
    
    for (let i = 2; i < index; i++) {
        const next = prev + current
        yield next
        prev = current
        current = next
    }
}

// Using tail recursion (more memory efficient recursion)
function fibsTailRec(index) {
    function fibHelper(n, current, next, arr) {
        if (n === 0) return arr
        arr.push(current)
        return fibHelper(n - 1, next, current + next, arr)
    }
    
    if (index <= 0) return []
    return fibHelper(index, 0, 1, [])
}

// Tests

console.log(fibs(8))      // [0,1,1,2,3,5,8,13]
console.log(fibsRec(9))   // [0,1,1,2,3,5,8,13,21]
console.log(fibsDP(8))    // [0,1,1,2,3,5,8,13]
console.log([...fibsGenerator(8)]) // [0,1,1,2,3,5,8,13]
console.log(fibsTailRec(8)) // [0,1,1,2,3,5,8,13]