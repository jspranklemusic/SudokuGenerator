# SudokuGenerator
A sudoku solver, generation algorithm, and interactive game made with vanilla Javascript, CSS, and HTML. 

## The Algorithm
The algorithm works with a combined brute-force and randomness approach. Whereas a traditional brute-force approach would involve starting at 1, checking for errors, and incrementing the value until no errors occur. Eventually, it is possible to run into an unavoidable conflict. In this case, a stack storing an array of "attempted" values is implemented. When an unavoidable conflict occurs, the most recent attempt is popped, and new values are tried in the previous location of the stack. 

The sudoku map itself is stored in a simple, 1-dimensional array. To determine which indices are related to the current index, (i.e., rows, columns quadrants), mathematical relations are used for instant access time. 

For instance, `const p = i - ((i%9)%3) - (i - (i%9))%27;` determines p as the starting index of the quadrant, where `const pInds = [p,p+1,p+2,p+9,p+10,p+11,p+18,p+19,p+20];` would determine the values of the indices in the quadrant. 

## Using the Game

### Input Mode
This is the default mode. To make a guess, select a number using either the buttons or numbers 1-9 on the keypad, and then click a location on the grid. 
If the number is correct, the input will be written on the grid. If not, the grid generates an error, written in red. To undo an error, click the invalid number with the same value as the selected number.

### Notes Mode

This game works especially well on dekstop. Each of the numbers are controlled with the number keys, where selecting a key will result in the number being selected. 
To try a number, select a number from the buttons, and click a location on the map. To make a note, press the 'n' key

