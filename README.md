# SudokuGenerator
A sudoku solver, generation algorithm, and interactive game made with vanilla Javascript, CSS, and HTML. A working version is available here: https://happy-meitner-914d9b.netlify.app/

## The Algorithm
The algorithm works with a combined brute-force and randomness approach. Whereas a traditional brute-force approach would involve starting at 1, checking for errors, and incrementing the value until no errors occur, this approach involves randomizing the input for a more balanced approach. Eventually, it is possible to run into an unavoidable conflict. In this case, a stack storing an array of "attempted" values is implemented. When an unavoidable conflict occurs, the most recent attempt is popped, and new values are tried in the previous location of the stack. 

The sudoku map itself is stored in a simple, 1-dimensional array. To determine which indices are related to the current index, (i.e., rows, columns quadrants), mathematical relations are used for instant access time. 

For instance, `const p = i - ((i%9)%3) - (i - (i%9))%27;` determines p as the starting index of the respective quadrant, and `const y = Math.floor(i/9)*9;` determines the starting index of the respective row. 

## Using the Game

### Input Mode
This is the default mode. To make a guess, select a number using either the buttons or numbers 1-9 on the keypad, and then click a location on the grid. 
If the number is correct, the input will be written on the grid. If not, the grid generates an error, written in red. To undo an error, click the invalid number with the same value as the selected number.

### Notes Mode

To make a note, press the 'n' key on your keyboard to activate notes mode, or select the pen button. Any clicks on the grid will now create a new note. If the note is illegal, the note will not write, but no mistakes will be made. Each new valid note input will erase any newly-invalid existing notes.

