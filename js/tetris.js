init();

function init() {
    const rowCount = 20;
    const columnCount = 10;

    for (let i = 0; i < rowCount; i++) {
        let rowElem = document.createElement("div");
        rowElem.className = "row";

        for (let j = 0; j < columnCount; j++) {
            let columnElem = document.createElement("div");
            columnElem.className = "column";
            rowElem.prepend(columnElem);
        }

        document.querySelector(".board").prepend(rowElem);
    }
}
