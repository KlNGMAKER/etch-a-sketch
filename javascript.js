var container = document.querySelector('.container');
var createBtn = document.querySelector('#createBtn');
var resetBtn = document.querySelector('#resetBtn');
var length = 0;
var gridSize = 10;

createBtn.addEventListener('click', generateBoard);
resetBtn.addEventListener('click', resetBoard);

function generateBoard() {
    input = document.querySelector('#gridSize');
    if (input.valueAsNumber <= 100) {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
        gridSize = input.valueAsNumber;
        calculateSize()
        generateRows();
        generateCells();
    } else {
        alert("Maximum size: 100\nIt gets hard to compute beyond that.");
    }
}

function generateRows() {
    var container = document.querySelector('.container');
    for (i = 0; i < gridSize; i++) {
        var row = document.createElement('div');
        row.className = 'row';
        row.style.height = length + 'px';
        row.style.width = (length * gridSize) + 'px';
        container.appendChild(row);
    }
}

function generateCells() {
    var rows = document.querySelectorAll('.row');
    rows.forEach((row) => { 
        for (i = 0; i < gridSize; i++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.height = length + 'px';
            cell.style.width = length + 'px';
            cell.addEventListener('mouseover', sketch);
            row.appendChild(cell);
        }
    });
}

function resetBoard() {
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = 'white';
    });
}

function calculateSize() {
    length = (Math.min(container.clientHeight, container.clientWidth) - (gridSize * 2)) / gridSize;
}

function sketch(mouse) {
    var cell = mouse.target;

    cell.style.backgroundColor = getRandomColor();

    function getRandomColor() {
        var digits = '0123456789ABCDEF';
        var hash = '#';
        for (i = 0; i < 6; i++) {
            hash += digits[Math.floor(Math.random() * 16)];
        }
        return hash;
    }
}

calculateSize();
generateRows();
generateCells();
