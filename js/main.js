import { svg_editor } from "./modules/svg_editor.mjs"
import { menu_svg_editor } from "./modules/menu_svg_editor.mjs"

// ----------------------------------------------------------------------------------
// ------------------------------------------Initialize Display----------------------
// ----------------------------------------------------------------------------------

var editor = document.getElementById("editor");

// ----------------------------------------------------------------------------------
// ------------------------------------------Initialize Element----------------------
// ----------------------------------------------------------------------------------


// var text = svg_editor.AddText("Inline svg", "35px");
// svg_editor.SetPosition(text, 10, 35);
// svg_editor.SetColor(text, "url(#gradient_1)");

// var circle = svg_editor.AddCircle("25px");
// svg_editor.SetPositionCircle(circle, 100, 100);
// svg_editor.SetStroke(circle, "red", "3px");
// svg_editor.SetColor(circle, "black");

svg_editor.Initialize(editor);
menu_svg_editor.Initialize();

