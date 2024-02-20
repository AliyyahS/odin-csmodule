class Board {
    constructor() {
        this.board = this.createBoard(8)
    }

    createBoard(size) {
        const board = []

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                board.push([i, j])
            }
        }
        return board
    }

    getEdges(square) {
        const edges = []

        const x = square[0]
        const y = square[1]

        // clockwise
        const direction = {
            1: [x + 1, y + 2],
            2: [x + 2, y + 1],
            3: [x + 2, y - 1],
            4: [x + 1, y - 2],
            5: [x - 1, y - 2],
            6: [x - 2, y - 1],
            7: [x - 2, y + 1],
            8: [x - 1, y + 2]
        }

        for (const step in direction) {
            const [first, second] = direction[step]
            const edge = [first, second]

            if (this.board.some(coord => coord[0] === first && coord[1] === second)) {
                edges.push(edge)
            }
        }
        return edges
    }

    knightMoves(start, end) {
        const queue = [[start, [start]]]
        const visited = {}

        while (queue.length > 0) {
            const [current, path] = queue.shift()
            visited[current.toString()] = true

            if (current.toString() === end.toString()) return this.printOutput(path)

            const edges = this.getEdges(current)
            for (const edge of edges) {
                if(!visited[edge.toString()]) {
                    queue.push([edge, [...path, edge]])
                }
            }
        }
    }

    printOutput(arr) {
        console.log(`You made it in ${arr.length - 1} moves! Here's your path:`)
        arr.forEach((square) => {
            console.log(square)
        })
    }
}

// test cases

const b = new Board()
b.knightMoves([3,3], [4,3])
b.knightMoves([0,0], [3,3])