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
//도형에 닿았을때도 fix되어야 함
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
                let parentRows = Array.from(
                    new Set(Array.from(movingElem).map((e) => e.parentElement))
                );
                let columnIdx = [];
                parentRows.forEach((parentRow) => {
                    let _columnIdx = [];
                    parentRow.childNodes.forEach((e, i) => {
                        if (e.classList.contains("moving")) _columnIdx.push(i);
                    });
                    columnIdx.push(_columnIdx);
                });

                movingElem.forEach((e) => {
                    e.classList.remove("moving");
                });
                try {
                    parentRows.forEach((parentRow, rowIdx) => {
                        columnIdx[rowIdx].forEach((columnIdx) => {
                            let nextElem =
                                parentRow.nextSibling.childNodes[columnIdx];

                            //도형에 닿았을 때
                            if (nextElem.classList.contains("fixed")) {
                                throw new Error("touched");
                            }

                            nextElem.classList.add("moving");
                        });
                    });
                } catch {
                    movingElem.forEach((e) => {
                        e.classList.add("fixed");
                    });
                }

                //바닥에 닿았을때
                if (
                    document
                        .querySelectorAll(".row")
                        [rowCount - 1].querySelector(".moving")
                ) {
                    document.querySelectorAll(".moving").forEach((e) => {
                        e.classList.remove("moving");
                        e.classList.add("fixed");
                    });
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
