export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns,numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
   if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
     console.log("This tile has already been flipped!");
     return;
   }else if(this._bombBoard[rowIndex][columnIndex] === 'B'){
     this._playerBoard[rowIndex][columnIndex] = 'B';
   }else {
     this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
   }
   this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [[-1,1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if(neighborRowIndex >= 0
        && neighborRowIndex <= numberOfRows
        && neighborColumnIndex >= 0
        && neighborColumnIndex <= numberOfColumns){
          if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numberOfBombs++;
          }
      }
    })
    return numberOfBombs;
  }

  hasSafeTiles(){
    return this._numberOfBombs !== this._numberOfTiles;

    }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows,numberOfColumns) {
    // This is the board we are building
    const board = [];

    // Loop through each row and add something to the array
    for(let i = 0; i < numberOfRows; i++){
      const row = [];
      // Loop through the numberOfColumns and add spaces for each column
      for(let i = 0; i < numberOfColumns; i++){
        row.push(" ");
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    // Loop through each row and add something to the array
    for(let i = 0; i < numberOfRows; i++){
      const row = [];

      // Loop through the numberOfColumns and add spaces for each column
      for(let i = 0; i < numberOfColumns; i++){
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs){
      // Set random columns and rows to place bombs
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      // Places bombs randomly
       if(board[randomRowIndex][randomColumnIndex] !== 'B'){
         board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }


    return board;
  }

} // Ends Board class
