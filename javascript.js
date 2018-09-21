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
        cell.className = 'cell';
    });
}

function calculateSize() {
    length = (Math.min(container.clientHeight, container.clientWidth) - (gridSize * 2)) / gridSize;
}

function sketch(mouse) {
    var cell = mouse.target;
    
    if (cell.classList.contains('sketched')) {
        darkenRgb(cell);
    } else {
        cell.style.backgroundColor = getRandomRgb();
        cell.classList.add('sketched');
    }

    function getRandomRgb() {
        var rgbArr = []

        for (i = 0; i < 3; i++) {
            rgbArr.push(Math.floor(Math.random() * 255));
        }
        return rgbArrToStr(rgbArr);
    }

    function darkenRgb(cell) {
        var rgbText = cell.style.backgroundColor;
        var rgbArr = rgbText.substring(4, rgbText.length - 1).replace(/ /g, '').split(',');
        
        rgbArr.forEach((value, index) => {
            rgbArr[index] = value * 0.9;
        });
        cell.style.backgroundColor = rgbArrToStr(rgbArr);
    }

    function rgbArrToStr(rgb) {
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
}

calculateSize();
generateRows();
generateCells();
