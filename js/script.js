window.onload = function() {

    var backgroundCanvas;
    var backgroundContext;

    var backgroundAnimationCanvas;
    var backgroundAnimationContext;

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

    // var ping = document.getElementById('ping').value;

    var currentTab = 'inventory';
    var queueAlch = false;
    var queueVialDestroy = false;
    var queueVialInterface = false;
    var isvialDestroyInterfaceOpen = false;
    var alchSelected = false;
    var alchTickDelay = 0;
    var alchxCoord = 0;
    var alchyCoord = 0;

    let inventoryKeybind = "F1";
    let spellsKeybind = "F4";

    const reset_button = document.getElementById("reset_button");

    // const pingInputSlider = document.getElementById('ping');
    // const pingInputSliderValue = document.getElementById('ping-value');

    // pingInputSlider.oninput = ( () => {
    //     pingInputSliderValue.textContent = pingInputSlider.value + " ms";
    //     ping = pingInputSlider.value;
    // });

    
    const directionDropdown = document.getElementById("direction");
    directionDropdown.onchange = ( () => {
        updateBackground(directionDropdown.value, highlightDropdown.value);
    });

    const highlightDropdown = document.getElementById("highlight");
    highlightDropdown.onchange = ( () => {
        updateBackground(directionDropdown.value, highlightDropdown.value);
    });

    const inventoryKeyDropdown = document.getElementById("inventoryKey");
    inventoryKeyDropdown.onchange = ( () => {
        for (let i = 0; i < 6; i++) {
            spellsKeyDropdown[i].disabled = false;
            if (spellsKeyDropdown[i].value === inventoryKeyDropdown.value) {
                spellsKeyDropdown[i].disabled = true;
            }
        }
        inventoryKeybind = inventoryKeyDropdown.value;
    });

    const spellsKeyDropdown = document.getElementById("spellsKey");
    spellsKeyDropdown.onchange = ( () => {
        for (let i = 0; i < 6; i++) {
            inventoryKeyDropdown[i].disabled = false;
            if (inventoryKeyDropdown[i].value === spellsKeyDropdown.value) {
                inventoryKeyDropdown[i].disabled = true;
            }
        }
        spellsKeybind = spellsKeyDropdown.value;
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
    var scorchAlch = GIF();
    const background = new Image();

    const vialDestroyInterface = new Image();
    const vialDestroyInterfaceYes = new Image();
    const vialDestroyInterfaceNo = new Image();

    const inventoryTopLeftX = 550;
    const inventoryTopLeftY = 230;


    backgroundCanvas = document.getElementById("backgroundCanvas");
    backgroundContext = backgroundCanvas.getContext("2d");

    backgroundAnimationCanvas = document.getElementById("backgroundAnimationCanvas");
    backgroundAnimationContext = backgroundAnimationCanvas.getContext("2d");

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

    redClick.src = "./assets/Animations/red_click.gif";
    yellowClick.src = "./assets/Animations/yellow_click.gif";

    scorchAlch.load("./assets/Animations/inventorygiftest.gif");
    scorchAlch.playOnLoad = false;

    background.src = "./assets/Backgrounds/No Highlight/North/inventory.png";

    vialDestroyInterface.src = "./assets/vialdestroy.png";
    vialDestroyInterfaceYes.src = "./assets/vialdestroyyes.png";
    vialDestroyInterfaceNo.src = "./assets/vialdestroyno.png";

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
        path = "./assets/Backgrounds/" + highlight + "/" + direction + "/inventory.png";
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


    function swapTab() {
        if (currentTab === 'inventory') {
            currentTab = 'spells';
            inventoryAnimationContext.clearRect(0, 0, inventoryAnimationCanvas.width, inventoryAnimationCanvas.height);
        }

        else if (currentTab === 'spells') {
            currentTab = 'inventory';
            drawInventory();
        }

        path = "./assets/Backgrounds/" + highlightDropdown.value + "/" + directionDropdown.value + "/" + currentTab + ".png";
        background.src = path;

        background.onload = function () {
            backgroundContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            backgroundContext.drawImage(background, 0, 0);
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


    function animate() {

        if (stop === true) {
            stop = false;
            return;
        }

        requestAnimationFrame(animate);

        now = Date.now();
        elapsed = now - then;


        if (elapsed > fpsInterval) {
            
            then = now - (elapsed % fpsInterval);

            backgroundAnimationContext.setTransform(1, 0, 0, 1, 0, 0); // reset transform to a square
            backgroundAnimationContext.clearRect(0, 0, backgroundAnimationCanvas.width, backgroundAnimationCanvas.height);

            if (scorchAlch) { // If gif object defined

                if (!scorchAlch.loading) {  // if loaded

                    if (scorchAlch.currentFrame === scorchAlch.frames.length - 1) {
                        scorchAlch.pause();
                        scorchAlch.seekFrame(0);
                        stop = true;
                    }
                    else {
                        scorchAlch.play();
                        backgroundAnimationContext.drawImage(scorchAlch.image, 347, 230); // (347, 230) are the alch coords
                    }
                }
            }
        }
    }

    var stop = false;
    var fpsInterval, now, then, elapsed;

    // initialize the timer variables and start the animation
    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }


    function processStock() {
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
        selectedOption = 'none';
    }


    function processVialDestroy() {
        if (queueVialDestroy === true) {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (inventory[i][j] === 'v') {
                        inventory[i][j] = '';
                        break;
                    }
                }
            }
            queueVialDestroy = false;
        }
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
        if (queueVialInterface === true) {
            chatContext.drawImage(vialDestroyInterface, 0, 0);
            isvialDestroyInterfaceOpen = true;
        }
        else {
            isvialDestroyInterfaceOpen = false;
            chatContext.clearRect(0, 0, chatCanvas.width, chatCanvas.height);
            for (let i = 0; i < chat.length; i++) {
                const x = 11;
                let y = 106 - (i * 14);
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
    }


    function processAlch() {
        if (queueAlch === true) {
            if (alchTickDelay === 0) {
                deleteItem(alchxCoord, alchyCoord);
                queueAlch = false;
                alchTickDelay = 3;
                startAnimating(15);
                if (currentTab === 'inventory') {
                    swapTab();
                }
            }
        }

        if (alchTickDelay > 0) {
            alchTickDelay = alchTickDelay - 1;
        }
    }





    function gameTick() {
        setInterval(() => {

            processVialDestroy();
            processAlch();
            processStock();
            if (currentTab === 'inventory') { drawInventory(); }
            drawChat();

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


    function isAlchButtonClicked(x, y) {
        if (x < 35 || x > 58) {
            return false;
        }

        if (y < 70 || y > 93) {
            return false;
        }

        return true;
    }


    function deleteItem(x, y) {

        // Get the [x][y] of the food
        // If inventory[x][y] is 't', 'w', or 'm', continue, otherwise return
        // Iterate through inventory until the same type of food is found
        // Replace that coordinate with ''
        // Redraw inventory

        let col_index = Math.floor((x - 40) / 42);
        let row_index = Math.floor((y - 45) / 36);

        let itemToDelete = inventory[row_index][col_index];
        let foodCondition = ['t', 'w', 'm'].includes(itemToDelete);
        if (queueAlch) {
            foodCondition = ['t', 'w', 'm', 'h', 'v'].includes(itemToDelete);
        }

        if (foodCondition) {

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
            queueVialInterface = false;
        }

        else if (itemToDelete === 'v') {
            queueVialInterface = true;
        }

        else {
            console.log("click");
            queueAlch = false;
        }
    }




    gameTick();
    


    document.addEventListener("keydown", (event) => {
        if (event.key === inventoryKeybind) {
            event.preventDefault();
            if (currentTab === 'spells') { swapTab(); }
        }
        else if (event.key === spellsKeybind) {
            event.preventDefault();
            if (currentTab === 'inventory') { swapTab(); }
        }

        if (isvialDestroyInterfaceOpen === true) {
            if (event.key === "1") {
                chatContext.drawImage(vialDestroyInterfaceYes, 0, 0);
                queueVialInterface = false;
                queueVialDestroy = true;
            }
            else if (event.key === "2") {
                chatContext.drawImage(vialDestroyInterfaceNo, 0, 0);
                queueVialInterface = false;
            }
        }
        
    });


    backgroundCanvas.addEventListener("mousedown", (event) => {

        const rect = menuAnimationCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = Math.floor(event.clientY - rect.top);


        if (event.button === 0) { // left click

            if (alchSelected) {
                alchSelected = false;
                return;
            }

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
            queueAlch = false;

        }


        else if (event.button === 2) { // right click

            if (imageDrawn) return;

            if (alchSelected) return;

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
        else if (menuMouseX >= 222 && menuMouseX <= 232) { // 222 is width
            menuAnimationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }

        if (menuMouseY >= -10 && menuMouseY <= -1) {
            menuAnimationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }
        else if (menuMouseY >= 141 && menuMouseY <= 152) { // 142 is height
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
    
            if (currentTab === 'inventory') {
                // checks if an item in the inventory was actually clicked, not dead space or an empty space
                if (!isInventoryClickInDeadSpace(invyX, invyY) && inventory[Math.floor((invyY - 45) / 36)][Math.floor((invyX - 40) / 42)] !== '') {
                    if (alchSelected) {
                        queueAlch = true;
                        alchxCoord = invyX;
                        alchyCoord = invyY;
                    }
                    else {
                        deleteItem(invyX, invyY);
                    }
                }
                alchSelected = false;
            }

            else if (currentTab === 'spells') {
                if (isAlchButtonClicked(invyX, invyY)) {
                    swapTab();
                    alchSelected = true;
                }
            }
            
        }
    });


    reset_button.addEventListener("mousedown", (event) => {
        if (event.button === 0) {
            
            inventory = Array.from({ length: rows }, () => Array(cols).fill(""));
            inventory[0][0] = 'h';

            chat = ["", "", "", "", "", "", "", ""];
            isvialDestroyInterfaceOpen = false;
            isVialClicked = false;
            queueVialDestroy = false;
            queueVialInterface = false;
            alchSelected = false;
            queueAlch = false;
            alchTickDelay = 0;
        }
    });


    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

}



    var dispenserClickbox = 
    {
        "North": [{'x': 377, 'y': 335}, {'x': 378, 'y': 318}, {'x': 389, 'y': 295}, {'x': 396, 'y': 292}, {'x': 411, 'y': 298}, {'x': 413, 'y': 333}, {'x': 405, 'y': 342}, {'x': 385, 'y': 342}],
        "South": [{'x': 377, 'y': 263}, {'x': 377, 'y': 240}, {'x': 383, 'y': 216}, {'x': 396, 'y': 205}, {'x': 408, 'y': 215}, {'x': 415, 'y': 242}, {'x': 415, 'y': 262}, {'x': 410, 'y': 268}, {'x': 405, 'y': 270}, {'x': 385, 'y': 270}]
    };






/*============================================================================
  Gif Decoder and player for use with Canvas API's

**NOT** for commercial use.

To use

    var myGif = GIF();                  // creates a new gif  
    var myGif = new GIF();              // will work as well but not needed as GIF() returns the correct reference already.    
    myGif.load("myGif.gif");            // set URL and load
    myGif.onload = function(event){     // fires when loading is complete
                                        //event.type   = "load"
                                        //event.path   array containing a reference to the gif
    }
    myGif.onprogress = function(event){ // Note this function is not bound to myGif
                                        //event.bytesRead    bytes decoded
                                        //event.totalBytes   total bytes
                                        //event.frame        index of last frame decoded
    }
    myGif.onerror = function(event){    // fires if there is a problem loading. this = myGif
                                        //event.type   a description of the error
                                        //event.path   array containing a reference to the gif
    }

Once loaded the gif can be displayed
    if(!myGif.loading){
        ctx.drawImage(myGif.image,0,0); 
    }
You can display the last frame loaded during loading

    if(myGif.lastFrame !== null){
        ctx.drawImage(myGif.lastFrame.image,0,0); 
    }


To access all the frames
    var gifFrames = myGif.frames; // an array of frames.

A frame holds various frame associated items.
    myGif.frame[0].image; // the first frames image
    myGif.frame[0].delay; // time in milliseconds frame is displayed for




Gifs use various methods to reduce the file size. The loaded frames do not maintain the optimisations and hold the full resolution frames as DOM images. This mean the memory footprint of a decode gif will be many time larger than the Gif file.
 */
const GIF = function () {
    // **NOT** for commercial use.
    var timerID;                          // timer handle for set time out usage
    var st;                               // holds the stream object when loading.
    var interlaceOffsets  = [0, 4, 2, 1]; // used in de-interlacing.
    var interlaceSteps    = [8, 8, 4, 2];
    var interlacedBufSize;  // this holds a buffer to de interlace. Created on the first frame and when size changed
    var deinterlaceBuf;
    var pixelBufSize;    // this holds a buffer for pixels. Created on the first frame and when size changed
    var pixelBuf;
    const GIF_FILE = { // gif file data headers
        GCExt   : 0xF9,
        COMMENT : 0xFE,
        APPExt  : 0xFF,
        UNKNOWN : 0x01, // not sure what this is but need to skip it in parser
        IMAGE   : 0x2C,
        EOF     : 59,   // This is entered as decimal
        EXT     : 0x21,
    };      
    // simple buffered stream used to read from the file 
    var Stream = function (data) { 
        this.data = new Uint8ClampedArray(data);
        this.pos  = 0;
        var len   = this.data.length;
        this.getString = function (count) { // returns a string from current pos of len count
            var s = "";
            while (count--) { s += String.fromCharCode(this.data[this.pos++]) }
            return s;
        };
        this.readSubBlocks = function () { // reads a set of blocks as a string
            var size, count, data  = "";
            do {
                count = size = this.data[this.pos++];
                while (count--) { data += String.fromCharCode(this.data[this.pos++]) }
            } while (size !== 0 && this.pos < len);
            return data;
        }
        this.readSubBlocksB = function () { // reads a set of blocks as binary
            var size, count, data = [];
            do {
                count = size = this.data[this.pos++];
                while (count--) { data.push(this.data[this.pos++]);}
            } while (size !== 0 && this.pos < len);
            return data;
        }
    };
    // LZW decoder uncompressed each frames pixels
    // this needs to be optimised.
    // minSize is the min dictionary as powers of two
    // size and data is the compressed pixels
    function lzwDecode(minSize, data) {
        var i, pixelPos, pos, clear, eod, size, done, dic, code, last, d, len;
        pos = pixelPos = 0;
        dic      = [];
        clear    = 1 << minSize;
        eod      = clear + 1;
        size     = minSize + 1;
        done     = false;
        while (!done) { // JavaScript optimisers like a clear exit though I never use 'done' apart from fooling the optimiser
            last = code;
            code = 0;
            for (i = 0; i < size; i++) {
                if (data[pos >> 3] & (1 << (pos & 7))) { code |= 1 << i }
                pos++;
            }
            if (code === clear) { // clear and reset the dictionary
                dic = [];
                size = minSize + 1;
                for (i = 0; i < clear; i++) { dic[i] = [i] }
                dic[clear] = [];
                dic[eod] = null;
            } else {
                if (code === eod) {  done = true; return }
                if (code >= dic.length) { dic.push(dic[last].concat(dic[last][0])) }
                else if (last !== clear) { dic.push(dic[last].concat(dic[code][0])) }
                d = dic[code];
                len = d.length;
                for (i = 0; i < len; i++) { pixelBuf[pixelPos++] = d[i] }
                if (dic.length === (1 << size) && size < 12) { size++ }
            }
        }
    };
    function parseColourTable(count) { // get a colour table of length count  Each entry is 3 bytes, for RGB.
        var colours = [];
        for (var i = 0; i < count; i++) { colours.push([st.data[st.pos++], st.data[st.pos++], st.data[st.pos++]]) }
        return colours;
    }
    function parse (){        // read the header. This is the starting point of the decode and async calls parseBlock
        var bitField;
        st.pos                += 6;  
        gif.width             = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);
        gif.height            = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);
        bitField              = st.data[st.pos++];
        gif.colorRes          = (bitField & 0b1110000) >> 4;
        gif.globalColourCount = 1 << ((bitField & 0b111) + 1);
        gif.bgColourIndex     = st.data[st.pos++];
        st.pos++;                    // ignoring pixel aspect ratio. if not 0, aspectRatio = (pixelAspectRatio + 15) / 64
        if (bitField & 0b10000000) { gif.globalColourTable = parseColourTable(gif.globalColourCount) } // global colour flag
        setTimeout(parseBlock, 0);
    }
    function parseAppExt() { // get application specific data. Netscape added iterations and terminator. Ignoring that
        st.pos += 1;
        if ('NETSCAPE' === st.getString(8)) { st.pos += 8 }  // ignoring this data. iterations (word) and terminator (byte)
        else {
            st.pos += 3;            // 3 bytes of string usually "2.0" when identifier is NETSCAPE
            st.readSubBlocks();     // unknown app extension
        }
    };
    function parseGCExt() { // get GC data
        var bitField;
        st.pos++;
        bitField              = st.data[st.pos++];
        gif.disposalMethod    = (bitField & 0b11100) >> 2;
        gif.transparencyGiven = bitField & 0b1 ? true : false; // ignoring bit two that is marked as  userInput???
        gif.delayTime         = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);
        gif.transparencyIndex = st.data[st.pos++];
        st.pos++;
    };
    function parseImg() {                           // decodes image data to create the indexed pixel image
        var deinterlace, frame, bitField;
        deinterlace = function (width) {                   // de interlace pixel data if needed
            var lines, fromLine, pass, toline;
            lines = pixelBufSize / width;
            fromLine = 0;
            if (interlacedBufSize !== pixelBufSize) {      // create the buffer if size changed or undefined.
                deinterlaceBuf = new Uint8Array(pixelBufSize);
                interlacedBufSize = pixelBufSize;
            }
            for (pass = 0; pass < 4; pass++) {
                for (toLine = interlaceOffsets[pass]; toLine < lines; toLine += interlaceSteps[pass]) {
                    deinterlaceBuf.set(pixelBuf.subarray(fromLine, fromLine + width), toLine * width);
                    fromLine += width;
                }
            }
        };
        frame                = {}
        gif.frames.push(frame);
        frame.disposalMethod = gif.disposalMethod;
        frame.time           = gif.length;
        frame.delay          = gif.delayTime * 10;
        gif.length          += frame.delay;
        if (gif.transparencyGiven) { frame.transparencyIndex = gif.transparencyIndex }
        else { frame.transparencyIndex = undefined }
        frame.leftPos = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);
        frame.topPos  = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);
        frame.width   = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);
        frame.height  = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);
        bitField      = st.data[st.pos++];
        frame.localColourTableFlag = bitField & 0b10000000 ? true : false; 
        if (frame.localColourTableFlag) { frame.localColourTable = parseColourTable(1 << ((bitField & 0b111) + 1)) }
        if (pixelBufSize !== frame.width * frame.height) { // create a pixel buffer if not yet created or if current frame size is different from previous
            pixelBuf     = new Uint8Array(frame.width * frame.height);
            pixelBufSize = frame.width * frame.height;
        }
        lzwDecode(st.data[st.pos++], st.readSubBlocksB()); // decode the pixels
        if (bitField & 0b1000000) {                        // de interlace if needed
            frame.interlaced = true;
            deinterlace(frame.width);
        } else { frame.interlaced = false }
        processFrame(frame);                               // convert to canvas image
    };
    function processFrame(frame) { // creates a RGBA canvas image from the indexed pixel data.
        var ct, cData, dat, pixCount, ind, useT, i, pixel, pDat, col, frame, ti;
        frame.image        = document.createElement('canvas');
        frame.image.width  = gif.width;
        frame.image.height = gif.height;
        frame.image.ctx    = frame.image.getContext("2d");
        ct = frame.localColourTableFlag ? frame.localColourTable : gif.globalColourTable;
        if (gif.lastFrame === null) { gif.lastFrame = frame }
        useT = (gif.lastFrame.disposalMethod === 2 || gif.lastFrame.disposalMethod === 3) ? true : false;
        if (!useT) { frame.image.ctx.drawImage(gif.lastFrame.image, 0, 0, gif.width, gif.height) }
        cData = frame.image.ctx.getImageData(frame.leftPos, frame.topPos, frame.width, frame.height);
        ti  = frame.transparencyIndex;
        dat = cData.data;
        if (frame.interlaced) { pDat = deinterlaceBuf }
        else { pDat = pixelBuf }
        pixCount = pDat.length;
        ind = 0;
        for (i = 0; i < pixCount; i++) {
            pixel = pDat[i];
            col   = ct[pixel];
            if (ti !== pixel) {
                dat[ind++] = col[0];
                dat[ind++] = col[1];
                dat[ind++] = col[2];
                dat[ind++] = 255;      // Opaque.
            } else
                if (useT) {
                    dat[ind + 3] = 0; // Transparent.
                    ind += 4;
                } else { ind += 4 }
        }
        frame.image.ctx.putImageData(cData, frame.leftPos, frame.topPos);
        gif.lastFrame = frame;
        if (!gif.waitTillDone && typeof gif.onload === "function") { doOnloadEvent() }// if !waitTillDone the call onload now after first frame is loaded
    };
    // **NOT** for commercial use.
    function finnished() { // called when the load has completed
        gif.loading           = false;
        gif.frameCount        = gif.frames.length;
        gif.lastFrame         = null;
        st                    = undefined;
        gif.complete          = true;
        gif.disposalMethod    = undefined;
        gif.transparencyGiven = undefined;
        gif.delayTime         = undefined;
        gif.transparencyIndex = undefined;
        gif.waitTillDone      = undefined;
        pixelBuf              = undefined; // dereference pixel buffer
        deinterlaceBuf        = undefined; // dereference interlace buff (may or may not be used);
        pixelBufSize          = undefined;
        deinterlaceBuf        = undefined;
        gif.currentFrame      = 0;
        if (gif.frames.length > 0) { gif.image = gif.frames[0].image }
        doOnloadEvent();
        if (typeof gif.onloadall === "function") {
            (gif.onloadall.bind(gif))({   type : 'loadall', path : [gif] });
        }
        if (gif.playOnLoad) { gif.play() }
    }
    function canceled () { // called if the load has been cancelled
        finnished();
        if (typeof gif.cancelCallback === "function") { (gif.cancelCallback.bind(gif))({ type : 'canceled', path : [gif] }) }
    }
    function parseExt() {              // parse extended blocks
        const blockID = st.data[st.pos++];
        if(blockID === GIF_FILE.GCExt) { parseGCExt() }
        else if(blockID === GIF_FILE.COMMENT) { gif.comment += st.readSubBlocks() }
        else if(blockID === GIF_FILE.APPExt) { parseAppExt() }
        else {
            if(blockID === GIF_FILE.UNKNOWN) { st.pos += 13; } // skip unknow block
            st.readSubBlocks();
        }

    }
    function parseBlock() { // parsing the blocks
        if (gif.cancel !== undefined && gif.cancel === true) { canceled(); return }

        const blockId = st.data[st.pos++];
        if(blockId === GIF_FILE.IMAGE ){ // image block
            parseImg();
            if (gif.firstFrameOnly) { finnished(); return }
        }else if(blockId === GIF_FILE.EOF) { finnished(); return }
        else { parseExt() }
        if (typeof gif.onprogress === "function") {
            gif.onprogress({ bytesRead  : st.pos, totalBytes : st.data.length, frame : gif.frames.length });
        }
        setTimeout(parseBlock, 0); // parsing frame async so processes can get some time in.
    };
    function cancelLoad(callback) { // cancels the loading. This will cancel the load before the next frame is decoded
        if (gif.complete) { return false }
        gif.cancelCallback = callback;
        gif.cancel         = true;
        return true;
    }
    function error(type) {
        if (typeof gif.onerror === "function") { (gif.onerror.bind(this))({ type : type, path : [this] }) }
        gif.onload  = gif.onerror = undefined;
        gif.loading = false;
    }
    function doOnloadEvent() { // fire onload event if set
        gif.currentFrame = 0;
        gif.nextFrameAt  = gif.lastFrameAt  = new Date().valueOf(); // just sets the time now
        if (typeof gif.onload === "function") { (gif.onload.bind(gif))({ type : 'load', path : [gif] }) }
        gif.onerror = gif.onload  = undefined;
    }
    function dataLoaded(data) { // Data loaded create stream and parse
        st = new Stream(data);
        parse();
    }
    function loadGif(filename) { // starts the load
        var ajax = new XMLHttpRequest();
        ajax.responseType = "arraybuffer";
        ajax.onload = function (e) {
            if (e.target.status === 404) { error("File not found") }
            else if(e.target.status >= 200 && e.target.status < 300 ) { dataLoaded(ajax.response) }
            else { error("Loading error : " + e.target.status) }
        };
        ajax.open('GET', filename, true);
        ajax.send();
        ajax.onerror = function (e) { error("File error") };
        this.src = filename;
        this.loading = true;
    }
    function play() { // starts play if paused
        if (!gif.playing) {
            gif.paused  = false;
            gif.playing = true;
            playing();
        }
    }
    function pause() { // stops play
        gif.paused  = true;
        gif.playing = false;
        clearTimeout(timerID);
    }
    function togglePlay(){
        if(gif.paused || !gif.playing){ gif.play() }
        else{ gif.pause() }
    }
    function seekFrame(frame) { // seeks to frame number.
        clearTimeout(timerID);
        gif.currentFrame = frame % gif.frames.length;
        if (gif.playing) { playing() }
        else { gif.image = gif.frames[gif.currentFrame].image }
    }
    function seek(time) { // time in Seconds  // seek to frame that would be displayed at time
        clearTimeout(timerID);
        if (time < 0) { time = 0 }
        time *= 1000; // in ms
        time %= gif.length;
        var frame = 0;
        while (time > gif.frames[frame].time + gif.frames[frame].delay && frame < gif.frames.length) {  frame += 1 }
        gif.currentFrame = frame;
        if (gif.playing) { playing() }
        else { gif.image = gif.frames[gif.currentFrame].image}
    }
    function playing() {
        var delay;
        var frame;
        if (gif.playSpeed === 0) {
            gif.pause();
            return;
        } else {
            if (gif.playSpeed < 0) {
                gif.currentFrame -= 1;
                if (gif.currentFrame < 0) {gif.currentFrame = gif.frames.length - 1 }
                frame = gif.currentFrame;
                frame -= 1;
                if (frame < 0) {  frame = gif.frames.length - 1 }
                delay = -gif.frames[frame].delay * 1 / gif.playSpeed;
            } else {
                gif.currentFrame += 1;
                gif.currentFrame %= gif.frames.length;
                delay = gif.frames[gif.currentFrame].delay * 1 / gif.playSpeed;
            }
            gif.image = gif.frames[gif.currentFrame].image;
            timerID = setTimeout(playing, delay);
        }
    }
    var gif = {                      // the gif image object
        onload         : null,       // fire on load. Use waitTillDone = true to have load fire at end or false to fire on first frame
        onerror        : null,       // fires on error
        onprogress     : null,       // fires a load progress event
        onloadall      : null,       // event fires when all frames have loaded and gif is ready
        paused         : false,      // true if paused
        playing        : false,      // true if playing
        waitTillDone   : true,       // If true onload will fire when all frames loaded, if false, onload will fire when first frame has loaded
        loading        : false,      // true if still loading
        firstFrameOnly : false,      // if true only load the first frame
        width          : null,       // width in pixels
        height         : null,       // height in pixels
        frames         : [],         // array of frames
        comment        : "",         // comments if found in file. Note I remember that some gifs have comments per frame if so this will be all comment concatenated
        length         : 0,          // gif length in ms (1/1000 second)
        currentFrame   : 0,          // current frame. 
        frameCount     : 0,          // number of frames
        playSpeed      : 1,          // play speed 1 normal, 2 twice 0.5 half, -1 reverse etc...
        lastFrame      : null,       // temp hold last frame loaded so you can display the gif as it loads
        image          : null,       // the current image at the currentFrame
        playOnLoad     : true,       // if true starts playback when loaded
        // functions
        load           : loadGif,    // call this to load a file
        cancel         : cancelLoad, // call to stop loading
        play           : play,       // call to start play
        pause          : pause,      // call to pause
        seek           : seek,       // call to seek to time
        seekFrame      : seekFrame,  // call to seek to frame
        togglePlay     : togglePlay, // call to toggle play and pause state
    };
    return gif;
}

