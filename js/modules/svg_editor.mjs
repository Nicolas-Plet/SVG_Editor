import { menu_svg_editor } from "./menu_svg_editor.mjs";

const svg_editor = {

    window_size_x: "100%",
    window_size_y: "400px",

    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    defs: document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
    graphics: document.createElementNS('http://www.w3.org/2000/svg', 'g'),

    background: null,


    actual_selection: null,
    type: "",
    mousePos: [0, 0],
    isDragging: false,



    
    // ----------------------------------------------------------------------------------
    // ------------------------------------------Initialize Function---------------------
    // ----------------------------------------------------------------------------------
    Initialize: function (parent) {
        svg_editor.svg.style.width = svg_editor.window_size_x;
        svg_editor.svg.style.height = svg_editor.window_size_y;
        svg_editor.svg.viewbox = "0 0 " + (svg_editor.window_size_x / 100).toString() + " " + (svg_editor.window_size_y / 100).toString();
        //Empeche la selection du text
        svg_editor.svg.onselectstart = (e) => { e.preventDefault(); };

        svg_editor.svg.appendChild(svg_editor.defs);
        svg_editor.svg.appendChild(svg_editor.graphics);

        svg_editor.AddRect(svg_editor.window_size_x, svg_editor.window_size_y, false);
        svg_editor.SetPosition(0, 0);
        svg_editor.SetColor("white");
        svg_editor.SetStroke("black", "2px");
        

        parent.appendChild(svg_editor.svg);

    },




    // ----------------------------------------------------------------------------------
    // ------------------------------------------Add Component---------------------------
    // ----------------------------------------------------------------------------------
    AddText: function (content, fontSize) {
        let newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        newText.innerHTML = content;
        newText.style.fontSize = fontSize;

        svg_editor.actual_selection = newText;
        svg_editor.SetClickSelection("text", newText);
        svg_editor.SetDragAndDropEvent("text", newText);
        svg_editor.SetPosition(0, fontSize);
        svg_editor.SetColor("rgb(0,0,0)");

        svg_editor.graphics.appendChild(newText);
    },

    AddRect: function (size_x, size_y, isDraggable = true) {
        let newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        newRect.style.width = size_x;
        newRect.style.height = size_y;

        svg_editor.actual_selection = newRect;
        if (isDraggable == true) {
            this.SetClickSelection("rect", newRect);
            this.SetDragAndDropEvent("rect", newRect);
        }

        svg_editor.SetPosition(0, 0);
        svg_editor.SetColor("black");
        svg_editor.graphics.appendChild(newRect);
    },

    AddCircle: function (rayon) {
        let newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        newCircle.setAttributeNS(null, 'r', rayon + "px");
        newCircle.setAttributeNS(null, 'cx', 0 + rayon);
        newCircle.setAttributeNS(null, 'cy', 0 + rayon);

        svg_editor.actual_selection = newCircle;
        svg_editor.SetClickSelection("circle", newCircle);
        svg_editor.SetDragAndDropEvent("circle", newCircle);

        svg_editor.SetPosition(0, 0);
        svg_editor.SetColor("black");
        svg_editor.graphics.appendChild(newCircle);
    },

    AddLine: function(pos1, pos2) {
        let newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLine.setAttributeNS(null, 'x1', 0);
        newLine.setAttributeNS(null, 'y1', 0);
        newLine.setAttributeNS(null, 'x2', 10);
        newLine.setAttributeNS(null, 'y2', 10);

    },

    AddGradient: function (color_start, color_center, color_end) {
        let newGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        newGradient.id = "gradient_1";
        newGradient.setAttributeNS(null, 'x1', "1");
        newGradient.setAttributeNS(null, 'y1', "1");
        newGradient.setAttributeNS(null, 'x2', "0");
        newGradient.setAttributeNS(null, 'y2', "0");

        let stop_1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        let stop_2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        let stop_3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');

        stop_1.setAttributeNS(null, 'offset', "0%");
        stop_1.setAttributeNS(null, 'stop-color', color_start);
        stop_2.setAttributeNS(null, 'offset', "50%");
        stop_2.setAttributeNS(null, 'stop-color', color_center);
        stop_2.setAttributeNS(null, 'stop-opacity', "0");
        stop_3.setAttributeNS(null, 'offset', "100%");
        stop_3.setAttributeNS(null, 'stop-color', color_end);

        newGradient.appendChild(stop_1);
        newGradient.appendChild(stop_2);
        newGradient.appendChild(stop_3);

        svg_editor.defs.appendChild(newGradient);

    },




    // ----------------------------------------------------------------------------------
    // ------------------------------------------Setting Function------------------------
    // ----------------------------------------------------------------------------------
    SetClickSelection: function (element_type, element) {
        element.addEventListener("click", function () {
            svg_editor.type = element_type;
            svg_editor.actual_selection = element;
            menu_svg_editor.DisplayMenu(element_type);
        })
    },

    SetDragAndDropEvent: function (element_type, element) {

        element.addEventListener("mousedown", function () {
            svg_editor.isDragging = true;
            svg_editor.actual_selection = element;
        })
        element.addEventListener("mouseup", function Drop() {
            svg_editor.mousePos = [0, 0];
            svg_editor.isDragging = false;
            svg_editor.actual_selection = null;
        })
        element.addEventListener("mousemove", function Drag() {
            if (svg_editor.isDragging == true) {
                let boundingBox = svg_editor.actual_selection.getBoundingClientRect();
                let offset_move = svg_editor.GetMouseOffset();

                svg_editor.type = element_type;
                svg_editor.mousePos = svg_editor.GetMousePosition();


                if (element_type == "text") {
                    let posX = parseInt(svg_editor.actual_selection.getAttributeNS(null, 'x')) + offset_move[0];
                    let posY = parseInt(svg_editor.actual_selection.getAttributeNS(null, 'y')) + offset_move[1];

                    svg_editor.SetPosition(posX, posY);
                }
                else if (element_type == "rect") {
                    let posX = parseInt(svg_editor.actual_selection.getAttributeNS(null, 'x')) + offset_move[0];
                    let posY = parseInt(svg_editor.actual_selection.getAttributeNS(null, 'y')) + offset_move[1];

                    svg_editor.SetPosition(posX, posY);
                }
                else if (element_type == "circle") {
                    let posX = parseInt(svg_editor.actual_selection.getAttributeNS(null, 'cx')) + offset_move[0];
                    let posY = parseInt(svg_editor.actual_selection.getAttributeNS(null, 'cy')) + offset_move[1];

                    svg_editor.SetPositionCircle(posX, posY);
                }
            }
        })

    },

    DisplayBorderSelection: function () {
        let boundingBox = svg_editor.actual_selection.getBoundingClientRect();


    },

    // ----------------------------------------------------------------------------------
    // ------------------------------------------Setter fonction-------------------------
    // ----------------------------------------------------------------------------------
    SetColor: function (color) {
       svg_editor.actual_selection.style.fill = color;
    },

    SetPosition: function (x, y) {

        svg_editor.actual_selection.setAttributeNS(null, 'x', x);
        svg_editor.actual_selection.setAttributeNS(null, 'y', y);
    },

    SetPositionCircle: function (x, y) {

        svg_editor.actual_selection.setAttributeNS(null, 'cx', x);
        svg_editor.actual_selection.setAttributeNS(null, 'cy', y);
    },

    SetRotation: function (deg) {
        svg_editor.actual_selection.style.transform = "rotate(" + deg.toString() + "deg)";
    },

    SetStroke: function (color, size) {
        svg_editor.actual_selection.style.stroke = color;
        svg_editor.actual_selection.style.strokeWidth = size;
    },



    // ----------------------------------------------------------------------------------
    // ------------------------------------------Getter fonction-------------------------
    // ----------------------------------------------------------------------------------
    GetMousePosition: function (event) {
        var e = event || window.event;
        var scroll = new Array((document.documentElement && document.documentElement.scrollLeft) || window.pageXOffset || self.pageXOffset || document.body.scrollLeft, (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || self.pageYOffset || document.body.scrollTop);;
        return new Array(e.clientX + scroll[0] - document.body.clientLeft, e.clientY + scroll[1] - document.body.clientTop);
    },

    GetMouseOffset: function () {
        let actual_mousePos = svg_editor.GetMousePosition();
        let offset_move_x = 0;
        let offset_move_y = 0;

        if (svg_editor.mousePos[0] != actual_mousePos[0] && svg_editor.mousePos[0] > 0 ||
            svg_editor.mousePos[1] != actual_mousePos[1] && svg_editor.mousePos[1] > 0) {
            offset_move_x = actual_mousePos[0] - svg_editor.mousePos[0];
            offset_move_y = actual_mousePos[1] - svg_editor.mousePos[1];
        }

        svg_editor.mousePos = actual_mousePos;
        return [offset_move_x, offset_move_y];
    }
}

export { svg_editor };