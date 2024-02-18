class Pair {
    constructor(key, value, nextPair = null) {
        this.key = key
        this.value = value
        this.nextPair = nextPair
    }
}

class HashMap {
    constructor(size) {
        this.size = size
        this.buckets = new Array(size).fill(null)
        this.loadFactor = 0.75
    }

    resize() {
        const initialSize = this.size
        this.size = initialSize * 2

        for (let i = initialSize; i < this.size; i++) {
            this.buckets.push(null)
        }
        return
    }

    hash(key) {
        let hashCode = 0

        const primeNumber = 31 
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i)
        }

        return hashCode % this.size
    }

    set(key, value) {
        if (this.length() / this.size >= this.loadFactor) this.resize()

        const pair = new Pair(key, value)
        const index = this.hash(key)

        if (this.buckets[index] === null) return this.buckets[index] = pair

        let prev = null
        let current = this.buckets[index]

        while (current !== null) {
            if (current.key === key) {
                current.value = value
                return
            }
            prev = current
            current = current.nextPair
        }
        prev.nextPair = pair
    }

    get(key) {
        const index = this.hash(key)

        let current = this.buckets[index]

        while (current !== null) {
            if (current.key === key) return current.value
            current = current.nextPair
        }
        return null
    }

    has(key) {
        const index = this.hash(key)

        let current = this.buckets[index]

        while (current !== null) {
            if (current.key === key) return true
            current = current.nextPair
        }
        return false
    }

    remove(key) {
        const index = this.hash(key)

        let prev = null
        let current = this.buckets[index]

        while (current !== null) {
            if (current.key === key) {
                if (prev === null) {
                    this.buckets[index] = current.nextPair
                } else {
                    prev.nextPair = current.nextPair
                }
                return true
            }
            prev = current
            current = current.nextPair
        }
        return false
    }

    length() {
        let length = 0
        const size = this.size

        for (let i = 0; i < size; i++) {
            let current = this.buckets[i]
            while (current !== null) {
                length++
                current = current.nextPair
            }
        }
        return length 
    }

    clear() {
        return this.buckets = this.buckets.fill(null)
    }

    keys() {
        const keysArray = []
        const size = this.size

        for (let i = 0; i < size; i++) {
            let current = this.buckets[i]
            while (current !== null) {
                keysArray.push(current.key)
                current = current.nextPair
            } 
        }
        return keysArray
    }

    values() {
        const valuesArray = []
        const size = this.size

        for (let i = 0; i < size; i++) {
            let current = this.buckets[i]
            while (current !== null) {
                valuesArray.push(current.value)
                current = current.nextPair
            } 
        }
        return valuesArray
    }

    entries() {
        const entryArray = []
        const size = this.size

        for (let i = 0; i < size; i++) {
            let current = this.buckets[i]
            while (current !== null) {
                entryArray.push([current.key, current.value])
                current = current.nextPair
            }
        }
        return entryArray
    }
}