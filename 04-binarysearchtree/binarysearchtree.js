class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(mergeSort(arr))
    }

    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) return null
    
        const mid = Math.ceil((start + end) / 2)
        const node = new Node(arr[mid])
    
        node.left = this.buildTree(arr, start, mid - 1)
        node.right = this.buildTree(arr, mid + 1, end)
    
        return node
    }

    insert(value) {
        return this.root = this.insertRec(value, this.root)
    }

    insertRec(value, node) {
        if (node === null) return node = new Node(value)

        if (value === node.data) return node

        if (value < node.data) {
            node.left = this.insertRec(value, node.left)
        } else if (value > node.data) {
            node.right = this.insertRec(value, node.right)
        }
        return node
    }

    delete(value) {
        return this.root = this.deleteRec(value, this.root)
    }

    deleteRec(value, node) {
        if (node === null) return null

        if (value < node.data) {
            node.left = this.deleteRec(value, node.left)
        } else if (value > node.data) {
            node.right = this.deleteRec(value, node.right)
        } else {
            // Found the node to be deleted

            // No child or one child
            if (node.left === null) {
                return node.right
            } else if (node.right === null) {
                return node.left
            }

            // Two children
                const min = this.findMin(node.right)
                node.data = min.data
                node.right = this.deleteRec(min.data, node.right)
            }
        return node
    }

    findMin(node) {
        while (node.left !== null) {
            node = node.left
        }
        return node
    }

    find(value) {
        const node = this.findRec(value, this.root)
        return node
    }

    findRec(value, node) {
        if (node === null) return null

        if (value === node.data) return node

        if (value < node.data) {
            node = this.findRec(value, node.left)
        } else if (value > node.data) {
            node = this.findRec(value, node.right)
        }
        return node
    }

    levelOrder(callback) {
        const queue = [this.root]
        const arr = []

        while(queue.length > 0) {
            const node = queue.shift()

            if (typeof callback === 'function') {
                arr.push(callback(node.data))
            } else arr.push(node.data)

            if (node.left !== null) queue.push(node.left)
            if (node.right !== null) queue.push(node.right)         
        }
        return arr
    }

    preOrder(callback, arr = [], node = this.root) {
        if (node === null) return arr

        if (typeof callback === 'function') {
            arr.push(callback(node.data))
        } else arr.push(node.data)

        this.preOrder(callback, arr, node.left)
        this.preOrder(callback, arr, node.right)

        return arr
    }

    inOrder(callback, arr = [], node = this.root) {
        if (node === null) return arr

        this.inOrder(callback, arr, node.left)

        if (typeof callback === 'function') {
            arr.push(callback(node.data))
        } else arr.push(node.data)

        this.inOrder(callback, arr, node.right)

        return arr
    }

    postOrder(callback, arr = [], node = this.root) {
        if (node === null) return arr

        this.postOrder(callback, arr, node.left)
        this.postOrder(callback, arr, node.right)

        if (typeof callback === 'function') {
            arr.push(callback(node.data))
        } else arr.push(node.data)

        return arr
    }

    // height is number of edges in the longest path from a given node to a leaf node
    height(node) {
        if (typeof node === 'number') {
            node = this.find(node)
        }

        if (node === null) return -1

        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)

        if (leftHeight > rightHeight) {
            return leftHeight + 1
        } else return rightHeight + 1
    }

    // depth is number of edges in the longest path from a given node to the root node
    depth(value, node = this.root, depth = 0) {
        if (node === null) return 0

        if (value === node.data) return depth

        if (value < node.data) {
            return this.depth(value, node.left, depth + 1)
        } else if (value > node.data) {
            return this.depth(value, node.right, depth + 1)
        }
    }

    isBalanced(node = this.root) {
        if (node === null) return

        const leftSubTree = this.height(node.left)
        const rightSubTree = this.height(node.right)

        const heightDiff = Math.max(leftSubTree, rightSubTree) - Math.min(leftSubTree, rightSubTree)

        if (heightDiff <= 1) return true
        
        return false
    }

    rebalance() {
        const newArr = this.inOrder()
        const sortedArr = mergeSort(newArr)
        return this.root = this.buildTree(sortedArr)
    }
}

const mergeSort = (arr) => {
    if (arr.length === 1) return arr

    const middle = Math.floor(arr.length / 2)

    const leftArr = arr.slice(0, middle)
    const rightArr = arr.slice(middle)

    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

const merge = (leftArr, rightArr) => {
    const result = []

    while (leftArr.length && rightArr.length) {
        if (leftArr[0] < rightArr[0]) {
            result.push(leftArr.shift())
        } else if (leftArr[0] === rightArr[0]) {
            result.push(leftArr.shift())
            rightArr.shift()
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

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return
    
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
    
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
}

// driver script

// create new binary search tree
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 45, 32, 93, 76, 34, 52, 12, 38, 10]
const bst = new Tree(arr)
prettyPrint(bst.root)

// confirm tree is balanced
console.log(bst.isBalanced())

// prints out all elements
// level order
console.log(`Level order: ${bst.levelOrder()}`)

// preorder
console.log(`Preorder: ${bst.preOrder()}`)

// postorder
console.log(`Postorder: ${bst.postOrder()}`)

// inorder
console.log(`Inorder: ${bst.inOrder()}`)

// unbalancing the tree
bst.insert(849)
bst.insert(209)
bst.insert(123)
bst.insert(357)
bst.insert(220)

// confirm tree is unbalanced
console.log(bst.isBalanced())

// balance the tree
bst.rebalance()
prettyPrint(bst.root)

// confirm tree is balanced again
console.log(bst.isBalanced())

// prints out all elements
// level order
console.log(`Level order: ${bst.levelOrder()}`)

// preorder
console.log(`Preorder: ${bst.preOrder()}`)

// postorder
console.log(`Postorder: ${bst.postOrder()}`)

// inorder
console.log(`Inorder: ${bst.inOrder()}`)