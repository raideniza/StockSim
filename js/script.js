window.onload = function() {

    var backgroundCanvas;
    var backgroundContext;

    var menuAnimationCanvas;
    var menuAnimationContext;

    var inventoryBackgroundCanvas;
    var inventoryBackgroundContext;

    var inventoryAnimationCanvas;
    var inventoryAnimationContext;

    var tickCounterCanvas;
    var tickCounterContext;

    var tickCounterEnabled = true;
    var tickCounterIsWhite = true;

    var ping;


    const reset_button = document.getElementById("reset_button");

    ping = document.getElementById('ping').value;

    const pingInputSlider = document.getElementById('ping');
    const pingInputSliderValue = document.getElementById('ping-value');

    pingInputSlider.oninput = ( () => {
        pingInputSliderValue.textContent = pingInputSlider.value + " ms";
        ping = pingInputSlider.value;
    });

    
    const directionDropdown = document.getElementById("direction");
    directionDropdown.onchange = ( () => {
        updateBackground(directionDropdown.value, highlightDropdown.value);
    });

    const highlightDropdown = document.getElementById("highlight");
    highlightDropdown.onchange = ( () => {
        updateBackground(directionDropdown.value, highlightDropdown.value);
    });


    const rightClickMenu = new Image();
    const rightClickMenuStockUp = new Image();
    const rightClicKMenuVial = new Image();
    const rightClickMenuTofu = new Image();
    const rightClickMenuWorms = new Image();
    const rightClickMenuWalkHere = new Image();
    const rightClickMenuExamine = new Image();
    const rightClickMenuMeat = new Image();
    const rightClickMenuCancel = new Image();

    const tofu = new Image();
    const worms = new Image();
    const meat = new Image();
    const horn = new Image();
    const vial = new Image();

    const tofuText = new Image();
    const wormsText = new Image();
    const meatText = new Image();
    const stockUpText = new Image();
    const vialText = new Image();
    const examineText = new Image();
    const fullInventoryText = new Image();


    const redClick = new Image();
    const yellowClick = new Image();
    const background = new Image();

    const inventoryTopLeftX = 550;
    const inventoryTopLeftY = 230;


    backgroundCanvas = document.getElementById("backgroundCanvas");
    backgroundContext = backgroundCanvas.getContext("2d");

    menuAnimationCanvas = document.getElementById("menuAnimationCanvas");
    menuAnimationContext = menuAnimationCanvas.getContext("2d");

    inventoryBackgroundCanvas = document.getElementById("inventoryBackgroundCanvas");
    inventoryBackgroundContext = inventoryBackgroundCanvas.getContext("2d");

    chatCanvas = document.getElementById("chatCanvas");
    chatContext = chatCanvas.getContext("2d");

    inventoryAnimationCanvas = document.getElementById("inventoryAnimationCanvas");
    inventoryAnimationContext = inventoryAnimationCanvas.getContext("2d");

    tickCounterCanvas = document.getElementById("tickCounterCanvas");
    tickCounterContext = tickCounterCanvas.getContext("2d");


    // chatContext.strokeStyle = 'black';
    // chatContext.lineWidth = 2;
    // chatContext.strokeRect(0, 0, chatCanvas.width, chatCanvas.height);


    rightClickMenu.src = "./assets/healermenu.png";
    rightClickMenuStockUp.src = "./assets/healermenustockup.png";
    rightClicKMenuVial.src = "./assets/healermenuvial.png";
    rightClickMenuTofu.src = "./assets/healermenutofu.png";
    rightClickMenuWorms.src = "./assets/healermenuworms.png";
    rightClickMenuWalkHere.src = "./assets/healermenuwalkhere.png";
    rightClickMenuExamine.src = "./assets/healermenuexamine.png";
    rightClickMenuMeat.src = "./assets/healermenumeat.png";
    rightClickMenuCancel.src = "./assets/healermenucancel.png";

    tofu.src = "./assets/poisontofu.png";
    worms.src = "./assets/poisonworms.png";
    meat.src = "./assets/poisonmeat.png";
    horn.src = "./assets/healerhorn.png";
    vial.src = "./assets/healingvial.png";

    tofuText.src = "./assets/tofutext.png";
    wormsText.src = "./assets/wormstext.png";
    meatText.src = "./assets/meattext.png";
    stockUpText.src = "./assets/stockuptext.png";
    vialText.src = "./assets/nothinginterestingtext.png";
    examineText.src = "./assets/examinetext.png";
    fullInventoryText.src = "./assets/fullinventorytext.png";

    redClick.src = "./assets/red_click.gif";
    yellowClick.src = "./assets/yellow_click.gif";
    background.src = "./assets/Backgrounds/No Highlight/North.png"

    let imageX = 0, imageY = 0;
    let imgWidth = 222, imgHeight = 142;
    let imageDrawn = false;

    let highlightedOption = "stock up"; // options are: none, stock up, vial, tofu, worms, walk here, examine, meat, cancel
    const redXOptions = ["stock up", "vial", "tofu", "worms", "examine", "meat"];

    let selectedOption = "";


    background.onload = function () {
        updateBackground(directionDropdown.value, highlightDropdown.value);
    }


    function updateBackground(direction, highlight) {
        path = "./assets/Backgrounds/" + highlight + "/" + direction + ".png";
        background.src = path;

        background.onload = function () {
            backgroundContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            backgroundContext.drawImage(background, 0, 0);
    
            backgroundContext.beginPath();
            backgroundContext.moveTo(dispenserClickbox[direction][0]['x'], dispenserClickbox[direction][0]['y']);
            for (let i = 1; i < dispenserClickbox[direction].length; i++) {
                backgroundContext.lineTo(dispenserClickbox[direction][i]['x'], dispenserClickbox[direction][i]['y']);
            }
            backgroundContext.closePath();
    
            // backgroundContext.strokeStyle = "red";
            // backgroundContext.lineWidth = 0.8;
            // backgroundContext.stroke();
        }
    }

    
    function playRedXAnimation(event) {
        redClick.style.position = "absolute";
        redClick.draggable = false;
        redClick.style.left = event.clientX - 8 + "px";
        redClick.style.top = event.clientY - 8 + "px";
        redClick.style.zIndex = 2;
        redClick.classList.add("noSelect");

        if (document.body.contains(redClick)) {
            document.body.removeChild(redClick);
            clearTimeout(redClickTimeout);
        }

        document.body.appendChild(redClick);

        redClickTimeout = setTimeout(function () {
            document.body.removeChild(redClick);
        }, 220);
    }


    function playYellowXAnimation(event) {
        yellowClick.style.position = "absolute";
        yellowClick.draggable = false;
        yellowClick.style.left = event.clientX - 8 + "px";
        yellowClick.style.top = event.clientY - 8 + "px";
        yellowClick.style.zIndex = 2;
        yellowClick.classList.add("noSelect");

        if (document.body.contains(yellowClick)) {
            document.body.removeChild(yellowClick);
            clearTimeout(yellowClickTimeout);
        }

        document.body.appendChild(yellowClick);

        yellowClickTimeout = setTimeout(function () {
            document.body.removeChild(yellowClick);
        }, 220);
    }


    function gameTick() {
        setInterval(() => {
            switch (selectedOption) {
                case "stock up":
                    stock_up();
                    break;
                case "vial":
                    take_vial();
                    break;
                case "tofu":
                    take_tofu();
                    break;
                case "worms":
                    take_worms();
                    break;
                case "meat":
                    take_meat();
                    break;
                case "examine":
                    examine();
                    break;
            }

            drawInventory();
            drawChat();

            selectedOption = "none";

            if (tickCounterEnabled === true) {
                tickCounterIsWhite = !tickCounterIsWhite;
                let tickCounterColor = tickCounterIsWhite ? 'white' : 'black';
                drawTickCounterSquare(tickCounterColor);
            }

        }, 600);
    }


    function drawTickCounterSquare(color) {
        tickCounterContext.clearRect(0, 0, 25, 25);
        tickCounterContext.fillStyle = color;
        tickCounterContext.fillRect(0, 0, 25, 25);
    }


    const rows = 7;
    const cols = 4;
    var inventory = Array.from({ length: rows }, () => Array(cols).fill(""));
    inventory[0][0] = 'h';

    var chat = ["", "", "", "", "", "", "", ""];

    // Values to cycle through
    const fillValues = ['t', 'w', 'm'];
    let fillIndex = 0; // Keeps track of which value to insert next

    function customPop(arr) {
        if (arr.length === 0) return;
      
        for (let i = arr.length - 1; i > 0; i--) {
            arr[i] = arr[i - 1];
        }
        arr[0] = "";
    }

    function arrayIsFull(arr) {
        return arr.length > 0 && arr.every(item => {
          if (Array.isArray(item)) {
            return arrayIsFull(item); // Recursively check subarray
          }
          return item !== ""; // Check base case
        });
      }

    function hasVial() {
        return inventory.some(row => row.includes('v'));
    }

    function stock_up() {
        customPop(chat);
        chat[0] = 'stock up';
        if (arrayIsFull(inventory)) {
            chat[0] = 'full invy';
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (inventory[i][j] === "") {
                    if (!hasVial()) {
                        inventory[i][j] = 'v'; // First inserted value is 'v'
                    } else {
                        inventory[i][j] = fillValues[fillIndex];
                        fillIndex = (fillIndex + 1) % fillValues.length; // Cycle through 't', 'w', 'm'
                    }
                }
            }
        }
        fillIndex = 0;
    }

    function take_vial() {
        customPop(chat);
        chat[0] = 'vial';
        if (arrayIsFull(inventory)) {
            chat[0] = 'full invy';
        }
        if (!hasVial()) {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (inventory[i][j] === "") {
                        inventory[i][j] = 'v';
                        break;
                    }
                }
                if (hasVial()) break;
            }
        }
    }

    function take_tofu() {
        customPop(chat);
        chat[0] = 'tofu';
        if (arrayIsFull(inventory)) {
            chat[0] = 'full invy';
        }
        let num_food_given = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (inventory[i][j] === "") {
                    inventory[i][j] = 't';

                    num_food_given++;
                    if (num_food_given === 5) break;
                }
            }
            if (num_food_given === 5) break;
        }
    }

    function take_worms() {
        customPop(chat);
        chat[0] = 'worms';
        if (arrayIsFull(inventory)) {
            chat[0] = 'full invy';
        }
        let num_food_given = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (inventory[i][j] === "") {
                    inventory[i][j] = 'w';

                    num_food_given++;
                    if (num_food_given === 5) break;
                }
            }
            if (num_food_given === 5) break;
        }
    }

    function take_meat() {
        customPop(chat);
        chat[0] = 'meat';
        if (arrayIsFull(inventory)) {
            chat[0] = 'full invy';
        }
        let num_food_given = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (inventory[i][j] === "") {
                    inventory[i][j] = 'm';

                    num_food_given++;
                    if (num_food_given === 5) break;
                }
            }
            if (num_food_given === 5) break;
        }
    }

    function examine() {
        customPop(chat);
        chat[0] = 'examine';
    }


    function drawInventory() {
        inventoryAnimationContext.clearRect(0, 0, inventoryAnimationCanvas.width, inventoryAnimationCanvas.height);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = 40 + j * 42;
                let y = 45 + i * 36;
                if (inventory[i][j] === 't') {
                    inventoryAnimationContext.drawImage(tofu, x, y);
                }
                else if (inventory[i][j] === 'w') {
                    inventoryAnimationContext.drawImage(worms, x, y);
                }
                else if (inventory[i][j] === 'm') {
                    inventoryAnimationContext.drawImage(meat, x, y);
                }
                else if (inventory[i][j] === 'h') {
                    inventoryAnimationContext.drawImage(horn, x, y);
                }
                else if (inventory[i][j] === 'v') {
                    inventoryAnimationContext.drawImage(vial, x, y);
                }
            }
        }
    }


    function drawChat() {
        chatContext.clearRect(0, 0, chatCanvas.width, chatCanvas.height);
        for (let i = 0; i < chat.length; i++) {
            const x = 0;
            let y = 98 - (i * 14);
            if (chat[i] === 'tofu') {
                chatContext.drawImage(tofuText, x, y);
            }
            else if (chat[i] === 'worms') {
                chatContext.drawImage(wormsText, x, y);
            }
            else if (chat[i] === 'meat') {
                chatContext.drawImage(meatText, x, y);
            }
            else if (chat[i] === 'stock up') {
                chatContext.drawImage(stockUpText, x, y);
            }
            else if (chat[i] === 'vial') {
                chatContext.drawImage(vialText, x, y);
            }
            else if (chat[i] === 'examine') {
                chatContext.drawImage(examineText, x, y);
            }
            else if (chat[i] === 'full invy') {
                chatContext.drawImage(fullInventoryText, x, y);
            }
        }
    }


    function isInventoryClickInDeadSpace(x, y) {

        // let x = 40 + j * 42; (horizontal gap of 6)
        // let y = 45 + i * 36; (vertical gap of 4)

        // Is the click too high or too to the left
        if (x < 40 || y < 45) {
            return true;
        }

        // Is the click too low or too to the right
        else if (x > 202 || y > 293) {
            return true;
        }

        // Is the click in between different foods
        if (x % 42 >= 34 && x % 42 <= 39) {
            if (y % 36 >= 5 && y % 36 <= 8) {
                return true;
            }
        }

        // The click therefore must be on an item
        return false;
    }


    function deleteFood(x, y) {

        // Get the [x][y] of the food
        // If inventory[x][y] is 't', 'w', or 'm', continue, otherwise return
        // Iterate through inventory until the same type of food is found
        // Replace that coordinate with ''
        // Redraw inventory

        let col_index = Math.floor((x - 40) / 42);
        let row_index = Math.floor((y - 45) / 36);

        let itemToDelete = inventory[row_index][col_index];

        if (['t', 'w', 'm'].includes(itemToDelete)) {

            let foodDeleted = false;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (inventory[i][j] === itemToDelete) {
                        inventory[i][j] = '';

                        foodDeleted = true;
                        break;
                    }
                }
                if (foodDeleted) break;
            }
        }
    }



    gameTick();
    


    backgroundCanvas.addEventListener("mousedown", (event) => {

        const rect = menuAnimationCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = Math.floor(event.clientY - rect.top);

        if (event.button === 0) { // left click

            menuAnimationContext.clearRect(0, 0, menuAnimationCanvas.width, menuAnimationCanvas.height);

            if (imageDrawn === true) {

                switch (highlightedOption) {
                    case "stock up":
                        // setTimeout(function() { selectedOption = "stock up" }, ping);
                        selectedOption = "stock up";
                        break;
                    case "vial":
                        // setTimeout(function() { selectedOption = "vial" }, ping);
                        selectedOption = "vial";
                        break;
                    case "tofu":
                        // setTimeout(function() { selectedOption = "tofu" }, ping);
                        selectedOption = "tofu";
                        break;
                    case "worms":
                        // setTimeout(function() { selectedOption = "worms" }, ping);
                        selectedOption = "worms";
                        break;
                    case "meat":
                        // setTimeout(function() { selectedOption = "meat" }, ping);
                        selectedOption = "meat";
                        break;
                    case "examine":
                        selectedOption = "examine";
                        break;
                }


                if (redXOptions.includes(highlightedOption)) {
                    playRedXAnimation(event);
                }
                else if (highlightedOption === "walk here") {
                    playYellowXAnimation(event);
                }
            }

            else if (backgroundContext.isPointInPath(mouseX, mouseY)) {
                playRedXAnimation(event);
                // setTimeout(function() { selectedOption = "stock up" }, ping);
                selectedOption = "stock up";
            }

            imageDrawn = false;
            highlightedOption = "none";

        }


        else if (event.button === 2) { // right click

            if (imageDrawn) return;


            if (backgroundContext.isPointInPath(mouseX, mouseY)) {
                imageX = event.clientX - rect.left - 110; // 110 is half the width of the right click menu
                imageY = Math.floor(event.clientY - rect.top);
        
                menuAnimationContext.clearRect(0, 0, menuAnimationCanvas.width, menuAnimationCanvas.height);
                menuAnimationContext.drawImage(rightClickMenu, imageX, imageY);
                highlightedOption = "none";
                
                imageDrawn = true;
            }
        }
    });



    backgroundCanvas.addEventListener("mousemove", (event) => {

        if (!imageDrawn) return;

        const rect = menuAnimationCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = Math.floor(event.clientY - rect.top);

        const mouseisOutsideMenu = mouseX < imageX - 10 || mouseX > imageX + imgWidth + 10 || mouseY < imageY - 10 || mouseY > imageY + imgHeight + 10;

        if (mouseisOutsideMenu) {
            menuAnimationContext.clearRect(0, 0, menuAnimationCanvas.width, menuAnimationCanvas.height);
            imageDrawn = false;
            return;
        }


        menuAnimationContext.clearRect(0, 0, menuAnimationCanvas.width, menuAnimationCanvas.height);

        const menuMouseX = mouseX - imageX;
        const menuMouseY = mouseY - imageY;

        if (menuMouseX >= -10 && menuMouseX <= -1) {
            menuAnimationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }
        else if (menuMouseX >= 222 && menuMouseX <= 232) {
            menuAnimationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }

        if (menuMouseY >= -10 && menuMouseY <= -1) {
            menuAnimationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }
        else if (menuMouseY >= 141 && menuMouseY <= 152) {
            menuAnimationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }


        if (menuMouseX >= 1 && menuMouseX <= 221) {
            if (menuMouseY >= 0 && menuMouseY <= 20) { // Choose Option
                menuAnimationContext.drawImage(rightClickMenu, imageX, imageY);
                highlightedOption = "none";
            }
            else if (menuMouseY >= 21 && menuMouseY <= 35) { // Stock Up
                menuAnimationContext.drawImage(rightClickMenuStockUp, imageX, imageY);
                highlightedOption = "stock up";
            }
            else if (menuMouseY >= 36 && menuMouseY <= 50) { // Vial
                menuAnimationContext.drawImage(rightClicKMenuVial, imageX, imageY);
                highlightedOption = "vial";
            }
            else if (menuMouseY >= 51 && menuMouseY <= 65) { // Tofu
                menuAnimationContext.drawImage(rightClickMenuTofu, imageX, imageY);
                highlightedOption = "tofu";
            }
            else if (menuMouseY >= 66 && menuMouseY <= 80) { // Worms
                menuAnimationContext.drawImage(rightClickMenuWorms, imageX, imageY);
                highlightedOption = "worms";
            }
            else if (menuMouseY >= 81 && menuMouseY <= 95) { // Walk Here
                menuAnimationContext.drawImage(rightClickMenuWalkHere, imageX, imageY);
                highlightedOption = "walk here";
            }
            else if (menuMouseY >= 96 && menuMouseY <= 110) { // Examine
                menuAnimationContext.drawImage(rightClickMenuExamine, imageX, imageY);
                highlightedOption = "examine";
            }
            else if (menuMouseY >= 111 && menuMouseY <= 125) { // Meat
                menuAnimationContext.drawImage(rightClickMenuMeat, imageX, imageY);
                highlightedOption = "meat";
            }
            else if (menuMouseY >= 126 && menuMouseY <= 140) { // Cancel
                menuAnimationContext.drawImage(rightClickMenuCancel, imageX, imageY);
                highlightedOption = "cancel";
            }
        }
    });


    inventoryBackgroundCanvas.addEventListener("mousedown", (event) => {
        if (event.button === 0) {

            const rect = menuAnimationCanvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = Math.floor(event.clientY - rect.top);

            const invyX = mouseX - inventoryTopLeftX;
            const invyY = mouseY - inventoryTopLeftY;
    

            if (!isInventoryClickInDeadSpace(invyX, invyY)) {
                deleteFood(invyX, invyY);
            }
            
        }
    });


    reset_button.addEventListener("mousedown", (event) => {
        if (event.button === 0) {
            
            inventory = Array.from({ length: rows }, () => Array(cols).fill(""));
            inventory[0][0] = 'h';

            chat = ["", "", "", "", "", "", "", ""];
        }
    });


    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

}



var dispenserClickbox = 
    {
        "North": [{'x': 379, 'y': 334}, {'x': 379, 'y': 318}, {'x': 389, 'y': 294}, {'x': 395, 'y': 289}, {'x': 409, 'y': 293}, {'x': 409, 'y': 295}, {'x': 412, 'y': 331}, {'x': 405, 'y': 338}, {'x': 383, 'y': 337}],
        "South": [{'x': 381, 'y': 264}, {'x': 380, 'y': 244}, {'x': 386, 'y': 227}, {'x': 396, 'y': 219}, {'x': 403, 'y': 224}, {'x': 410, 'y': 242}, {'x': 413, 'y': 263}, {'x': 407, 'y': 270}, {'x': 384, 'y': 270}]
    }
