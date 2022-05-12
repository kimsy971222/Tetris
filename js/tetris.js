const board = document.querySelector(".board");
const rowCount = 20;
const columnCount = 10;
let movingElem;

init();

document.addEventListener("keydown", (e) => {
    let type = e.key;
    movingElem = document.querySelectorAll(".moving");
    switch (type) {
        case "ArrowLeft":
            moving("left");
            break;
        case "ArrowRight":
            moving("right");
            break;
        case "ArrowDown":
            moving("down");
            break;
        case "ArrowUp":
        //도형 모양 바꾸기 ↑
    }
});

//방향키 입력한대로 움직이기 ← → (임시 ↓)
function moving(type) {
    try {
        switch (type) {
            case "left":
                movingElem.forEach((e) => {
                    e.classList.remove("moving");
                });
                movingElem.forEach((e) => {
                    e.previousSibling.classList.add("moving");
                });
                break;
            case "right":
                movingElem.forEach((e) => {
                    e.classList.remove("moving");
                });
                movingElem.forEach((e) => {
                    e.nextSibling.classList.add("moving");
                });
                break;
            case "down":
                if (
                    document
                        .querySelectorAll(".row")
                        [rowCount - 1].querySelector(".moving")
                ) {
                    movingElem.forEach((e) => {
                        e.classList.remove("moving");
                        e.classList.add("fixed");
                    });
                } else if (
                    !document
                        .querySelectorAll(".row")
                        [rowCount - 1].querySelector(".fixed")
                ) {
                    document.querySelectorAll(".row")[rowCount - 1].remove();
                    addNewRow();
                }

                break;
        }
    } catch {
        movingElem.forEach((e) => {
            e.classList.add("moving");
        });
    }
}

//테트리스 판 작성
function init() {
    for (let i = 0; i < rowCount; i++) {
        addNewRow();
    }
}

//새 Row 추가
function addNewRow() {
    let rowElem = document.createElement("div");
    rowElem.className = "row";

    for (let j = 0; j < columnCount; j++) {
        let columnElem = document.createElement("div");
        columnElem.className = "column";
        rowElem.prepend(columnElem);
    }

    board.prepend(rowElem);
}
