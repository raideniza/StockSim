window.onload = function() {

    var mainCanvas;
    var mainContext;

    var inventoryCanvas;
    var inventoryContext;

    var animationCanvas;
    var animationContext;

    var ping;


    ping = document.getElementById('ping').value;

    const pingInputSlider = document.getElementById('ping');
    const pingInputSliderValue = document.getElementById('ping-value');

    pingInputSlider.oninput = ( () => {
        pingInputSliderValue.textContent = pingInputSlider.value + " ms";
        ping = pingInputSlider.value;
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


    mainCanvas = document.getElementById("mainCanvas");
    mainContext = mainCanvas.getContext("2d");

    inventoryCanvas = document.getElementById("inventoryCanvas");
    inventoryContext = inventoryCanvas.getContext("2d");

    animationCanvas = document.getElementById("animationCanvas");
    animationContext = animationCanvas.getContext("2d");

    mainContext.fillStyle = "white";
    mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

    inventoryContext.fillstyle = "black";
    inventoryContext.fillRect(0, 0, inventoryCanvas.width, inventoryCanvas.height);

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

    let imageX = 0, imageY = 0;
    let imgWidth = 222, imgHeight = 142;
    let imageDrawn = false;

    let highlightedOption = "none"; // options are: none, stock up, vial, tofu, worms, walk here, examine, meat, cancel
    const redXOptions = ["stock up", "vial", "tofu", "worms", "examine", "meat"];

    
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

        if (event.button === 0) {

            animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

            if (redXOptions.includes(highlightedOption)) {
                playRedXAnimation(event);
            }
            else if (highlightedOption === "walk here") {
                playYellowXAnimation(event);
            }
            
            imageDrawn = false;
        }


        else if (event.button === 2) {

            if (imageDrawn) return;
    
            const rect = animationCanvas.getBoundingClientRect();
            imageX = event.clientX - rect.left - 110; // 110 is half the width of the right click menu
            imageY = Math.floor(event.clientY - rect.top);
    
            animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
            animationContext.drawImage(rightClickMenu, imageX, imageY);
            highlightedOption = "none";
            
            imageDrawn = true;
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