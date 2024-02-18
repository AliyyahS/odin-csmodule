class Key {
    constructor(key, nextKey = null) {
        this.key = key
        this.nextKey = nextKey
    }
}

class HashSet {
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

    set(key) {
        if (this.length() / this.size >= this.loadFactor) this.resize()

        const newKey = new Key(key)
        const index = this.hash(key)

        if (this.buckets[index] === null) return this.buckets[index] = newKey

        let prev = null
        let current = this.buckets[index]

        while (current !== null) {
            if (current.key === key) return
            prev = current
            current = current.nextKey
        }
        prev.nextKey = newKey
    }

    has(key) {
        const index = this.hash(key)

        let current = this.buckets[index]

        while (current !== null) {
            if (current.key === key) return true
            current = current.nextKey
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
                    this.buckets[index] = current.nextKey
                } else {
                    prev.nextKey = current.nextKey
                }
                return true
            }
            prev = current
            current = current.nextKey
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
                current = current.nextKey
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
                current = current.nextKey
            } 
        }
        return keysArray
    }
}