const board = document.querySelector(".board");
const rowCount = 20;
const columnCount = 10;
const speed = 500;
let movingElem;

init();

// 자동내려옴
setInterval(async () => {
    if (movingElem && movingElem.length > 0) await moving("down");
    else await setBlock(Math.floor(Math.random() * 7));
    await checkGameOver();
    await checkMath();
}, speed);

document.addEventListener("keydown", (e) => {
    let type = e.key;
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

document.querySelector(".buttonLeft").addEventListener("click", () => {
    moving("left");
});
document.querySelector(".buttonDown").addEventListener("click", () => {
    moving("down");
});
document.querySelector(".buttonRight").addEventListener("click", () => {
    moving("right");
});

function checkGameOver() {
    if (document.querySelectorAll(".moving.fixed").length > 0) {
        document.querySelector(".score").innerHTML = 0;
        init();
    }
}

function checkMath() {
    let rows = document.querySelectorAll(".row");
    let score = document.querySelector(".score").innerHTML;

    rows.forEach((row) => {
        if (row.querySelectorAll(".fixed").length == 10) {
            row.remove();
            addNewRow();
            document.querySelector(".score").innerHTML = score * 1 + 10;
        }
    });
}

function setBlock(type) {
    let markIdx;
    switch (type) {
        case 0:
            markIdx = [[0], [0], [0], [0]];
            break;
        case 1:
            markIdx = [[0, 1], [0], [0]];
            break;
        case 2:
            markIdx = [[0, 1], [1], [1]];
            break;
        case 3:
            markIdx = [
                [0, 1],
                [0, 1],
            ];
            break;

        case 4:
            markIdx = [[0], [0, 1], [1]];
            break;

        case 5:
            markIdx = [[1], [0, 1, 2]];
            break;

        case 6:
            markIdx = [[1], [0, 1], [0]];
            break;
    }
    markIdx.forEach((row, rowIdx) => {
        row.forEach((columnIdx) => {
            document
                .querySelectorAll(".row")
                [rowIdx].childNodes[columnIdx].classList.add("moving");
        });
    });
    movingElem = document.querySelectorAll(".moving");
}

//방향키 입력한대로 움직이기 ← → ↓
//도형에 닿았을때도 fix되어야 함
function moving(type) {
    movingElem = document.querySelectorAll(".moving");
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

                            if (nextElem.classList.contains("fixed")) {
                                throw new Error("touched");
                            }

                            nextElem.classList.add("moving");
                        });
                    });
                } catch {
                    //도형에 닿았을 때
                    document.querySelectorAll(".moving").forEach((e) => {
                        e.classList.remove("moving");
                    });

                    movingElem.forEach((e) => {
                        e.classList.add("fixed");
                    });
                    movingElem = null;
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
                    movingElem = null;
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
    document.querySelectorAll(".row").forEach((row) => row.remove());
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
