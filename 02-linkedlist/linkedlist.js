class Node {
    constructor(value = null, nextNode = null) {
        this.value = value
        this.nextNode = nextNode
    }
}

class LinkedList {
    constructor() {
        this.listHead = null
    }

    append(value) {
        if (this.listHead === null) return prepend(value)

        let temp = this.listHead
        while (temp.nextNode !== null) {
            temp = temp.nextNode
        }
        temp.nextNode = new Node(value)
    } 

    prepend(value) {
        const newNode = new Node(value)
        if (this.listHead !== null) {
            newNode.nextNode = currentHead
        }
        this.listHead = newNode
    }

    size() {
        if (this.listHead === null) return 0

        let temp = this.listHead
        let size = 1
        while (temp.nextNode !== null) {
            temp = temp.nextNode
            size++
        }
        return size
    }

    head() {
        return this.listHead
    }

    tail() {
        let temp = this.listHead
        while (temp.nextNode !== null) {
            temp = temp.nextNode
        }
        return temp
    }

    at(index) {
        if (this.listHead === null) return null

        let temp = this.listHead
        let currentIndex = 0
        while (currentIndex < index) {
            temp = temp.nextNode
            currentIndex++
        }
        return temp
    }

    pop() {
        if (this.listHead === null) return null

        let current = this.listHead
        let prev = null

        while (current.nextNode !== null) {
            prev = current
            current = prev.nextNode
        }
        prev.nextNode = null
    }

    contains(value) {
        if (this.listHead.value === value) return true

        let temp = this.listHead
        while (temp.nextNode !== null) {
            temp = temp.nextNode
            if (temp.value === value) return true
        }
        return false
    }

    find(value) {
        if (this.listHead === null) return null

        let index = 0
        if (this.listHead.value === value) return index

        let temp = this.listHead
        while (temp.nextNode !== null) {
            temp = temp.nextNode
            index++
            if (temp.value === value) return index
        }
        return null
    }

    toString() {
        if (this.listHead === null) return null

        let message = `${this.listHead.value}`
        let temp = this.listHead
        while (temp.nextNode !== null) {
            temp = temp.nextNode
            message += ` -> ${temp.value}`
        }
        return message
    }

    insertAt(value, index) {
        if (index === 0) return prepend(value)

        let currentIndex = 0

        let prev = null
        let current = this.listHead
        let next = current.nextNode

        while (currentIndex < index) {
            prev = current
            current = next
            next = current.nextNode
            currentIndex++
        }

        const newNode = new Node(value)
        newNode.nextNode = current
        prev.nextNode = newNode
    }

    removeAt(index) {
        if (index === 0) return this.listHead = this.listHead.nextNode

        let currentIndex = 0

        let prev = null
        let current = this.listHead
        let next = current.nextNode

        while (currentIndex < index) {
            prev = current
            current = next
            next = current.nextNode
            currentIndex++
        }
        prev.nextNode = next
    }
}