function mergeSort(arr) {
    if (arr.length === 1) return arr

    const middle = Math.floor(arr.length / 2)

    const leftArr = arr.slice(0, middle)
    const rightArr = arr.slice(middle)

    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

function merge(leftArr, rightArr) {
    const result = []

    while (leftArr.length && rightArr.length) {
        if (leftArr[0] < rightArr[0]) {
            result.push(leftArr.shift())
        } else {
            result.push(rightArr.shift())
        }
    }

    while (leftArr.length > 0) {
        result.push(leftArr.shift())
    }

    while (rightArr.length > 0) {
        result.push(rightArr.shift())
    }

    return result
}

// Tests

const arrayOne = [3, 2, 1, 13, 8, 5, 0, 1] 
const arrayTwo = [105, 79, 100, 110] 

console.log(mergeSort(arrayOne)) // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(mergeSort(arrayTwo)) // [79, 100, 105, 110]