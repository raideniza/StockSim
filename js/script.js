window.onload = function() {

    var mainCanvas;
    var mainContext;

    var inventoryCanvas;
    var inventoryContext;

    var animationCanvas;
    var animationContext;

    var ping;
    var direction = 'North';
    var highlight = 'No Highlight';


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
        direction = directionDropdown.value;
    });

    const highlightDropdown = document.getElementById("highlight");
    highlightDropdown.onchange = ( () => {
        updateBackground(directionDropdown.value, highlightDropdown.value);
        highlight = highlightDropdown.value;
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

    const redClick = new Image();
    const yellowClick = new Image();
    const background = new Image();


    mainCanvas = document.getElementById("mainCanvas");
    mainContext = mainCanvas.getContext("2d");

    inventoryCanvas = document.getElementById("inventoryCanvas");
    inventoryContext = inventoryCanvas.getContext("2d");

    animationCanvas = document.getElementById("animationCanvas");
    animationContext = animationCanvas.getContext("2d");


    rightClickMenu.src = "./assets/healermenu.png";
    rightClickMenuStockUp.src = "./assets/healermenustockup.png";
    rightClicKMenuVial.src = "./assets/healermenuvial.png";
    rightClickMenuTofu.src = "./assets/healermenutofu.png";
    rightClickMenuWorms.src = "./assets/healermenuworms.png";
    rightClickMenuWalkHere.src = "./assets/healermenuwalkhere.png";
    rightClickMenuExamine.src = "./assets/healermenuexamine.png";
    rightClickMenuMeat.src = "./assets/healermenumeat.png";
    rightClickMenuCancel.src = "./assets/healermenucancel.png";

    redClick.src = "./assets/red_click.gif";
    yellowClick.src = "./assets/yellow_click.gif";
    background.src = "./assets/Backgrounds/Highlight/South.png"

    let imageX = 0, imageY = 0;
    let imgWidth = 222, imgHeight = 142;
    let imageDrawn = false;

    let highlightedOption = "none"; // options are: none, stock up, vial, tofu, worms, walk here, examine, meat, cancel
    const redXOptions = ["stock up", "vial", "tofu", "worms", "examine", "meat"];


    background.onload = function () {
        updateBackground(directionDropdown.value, highlightDropdown.value);
    }


    function updateBackground(direction, highlight) {
        path = "./assets/Backgrounds/" + highlight + "/" + direction + ".png";
        background.src = path;

        background.onload = function () {
            mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
            mainContext.drawImage(background, 0, 0);
    
            mainContext.beginPath();
            mainContext.moveTo(dispenserClickbox[direction][0]['x'], dispenserClickbox[direction][0]['y']);
            for (let i = 1; i < dispenserClickbox[direction].length; i++) {
                mainContext.lineTo(dispenserClickbox[direction][i]['x'], dispenserClickbox[direction][i]['y']);
            }
            mainContext.closePath();
    
            // mainContext.strokeStyle = "red";
            // mainContext.lineWidth = 0.8;
            // mainContext.stroke();
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




    mainCanvas.addEventListener("mousedown", (event) => {

        const rect = animationCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = Math.floor(event.clientY - rect.top);

        if (event.button === 0) {

            animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

            if (imageDrawn === true) {
                if (redXOptions.includes(highlightedOption)) {
                    playRedXAnimation(event);
                }
                else if (highlightedOption === "walk here") {
                    playYellowXAnimation(event);
                }
            }
            else if (mainContext.isPointInPath(mouseX, mouseY)) {
                playRedXAnimation(event);
            }

            imageDrawn = false;
        }


        else if (event.button === 2) {

            if (imageDrawn) return;


            if (mainContext.isPointInPath(mouseX, mouseY)) {
                imageX = event.clientX - rect.left - 110; // 110 is half the width of the right click menu
                imageY = Math.floor(event.clientY - rect.top);
        
                animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
                animationContext.drawImage(rightClickMenu, imageX, imageY);
                highlightedOption = "none";
                
                imageDrawn = true;
            }
        }
    });



    mainCanvas.addEventListener("mousemove", (event) => {

        if (!imageDrawn) return;

        const rect = animationCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = Math.floor(event.clientY - rect.top);

        const mouseisOutsideMenu = mouseX < imageX - 10 || mouseX > imageX + imgWidth + 10 || mouseY < imageY - 10 || mouseY > imageY + imgHeight + 10;

        if (mouseisOutsideMenu) {
            animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
            imageDrawn = false;
            return;
        }


        animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

        const menuMouseX = mouseX - imageX;
        const menuMouseY = mouseY - imageY;

        if (menuMouseX >= -10 && menuMouseX <= -1) {
            animationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }
        else if (menuMouseX >= 222 && menuMouseX <= 232) {
            animationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }

        if (menuMouseY >= -10 && menuMouseY <= -1) {
            animationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }
        else if (menuMouseY >= 142 && menuMouseY <= 152) {
            animationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
        }


        if (menuMouseX >= 1 && menuMouseX <= 221) {
            if (menuMouseY >= 0 && menuMouseY <= 20) { // Choose Option
                animationContext.drawImage(rightClickMenu, imageX, imageY);
                highlightedOption = "none";
            }
            else if (menuMouseY >= 21 && menuMouseY <= 35) { // Stock Up
                animationContext.drawImage(rightClickMenuStockUp, imageX, imageY);
                highlightedOption = "stock up";
            }
            else if (menuMouseY >= 36 && menuMouseY <= 50) { // Vial
                animationContext.drawImage(rightClicKMenuVial, imageX, imageY);
                highlightedOption = "vial";
            }
            else if (menuMouseY >= 51 && menuMouseY <= 65) { // Tofu
                animationContext.drawImage(rightClickMenuTofu, imageX, imageY);
                highlightedOption = "tofu";
            }
            else if (menuMouseY >= 66 && menuMouseY <= 80) { // Worms
                animationContext.drawImage(rightClickMenuWorms, imageX, imageY);
                highlightedOption = "worms";
            }
            else if (menuMouseY >= 81 && menuMouseY <= 95) { // Walk Here
                animationContext.drawImage(rightClickMenuWalkHere, imageX, imageY);
                highlightedOption = "walk here";
            }
            else if (menuMouseY >= 96 && menuMouseY <= 110) { // Examine
                animationContext.drawImage(rightClickMenuExamine, imageX, imageY);
                highlightedOption = "examine";
            }
            else if (menuMouseY >= 111 && menuMouseY <= 125) { // Meat
                animationContext.drawImage(rightClickMenuMeat, imageX, imageY);
                highlightedOption = "meat";
            }
            else if (menuMouseY >= 126 && menuMouseY <= 140) { // Cancel
                animationContext.drawImage(rightClickMenuCancel, imageX, imageY);
                highlightedOption = "cancel";
            }
        }

    });


    mainCanvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    })

}



var dispenserClickbox = 
    {
        "North": [{'x': 379, 'y': 334}, {'x': 379, 'y': 318}, {'x': 389, 'y': 294}, {'x': 395, 'y': 289}, {'x': 409, 'y': 293}, {'x': 409, 'y': 295}, {'x': 412, 'y': 331}, {'x': 405, 'y': 338}, {'x': 383, 'y': 337}],
        "South": [{'x': 381, 'y': 264}, {'x': 380, 'y': 244}, {'x': 386, 'y': 227}, {'x': 396, 'y': 219}, {'x': 403, 'y': 224}, {'x': 410, 'y': 242}, {'x': 413, 'y': 263}, {'x': 407, 'y': 270}, {'x': 384, 'y': 270}]
    }