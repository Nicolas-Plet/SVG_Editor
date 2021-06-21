import { svg_editor } from "./svg_editor.mjs";

const menu_svg_editor = {

    // -----------------------------------------------------------------------------------------
    // ------------------------------------------Base variable----------------------------------
    // -----------------------------------------------------------------------------------------
    display_menu: "",
    actual_element: null,

    add_text_button: document.getElementById("add_text"),
    add_rect_button: document.getElementById("add_rect"),
    add_circle_button: document.getElementById("add_circle"),




    // -----------------------------------------------------------------------------------------
    // ------------------------------------------Menu text--------------------------------------
    // -----------------------------------------------------------------------------------------
    menu_text: document.getElementById("text_menu"),

    text_value_input: document.getElementById("input_text"),
    text_font_value_input: document.getElementById("input_font"),

    text_color_checkbox: document.getElementById("input_gradient_checkbox"),
    text_simple_color_container: document.getElementById("text_simple_color"),
    input_text_color: document.getElementById("input_text_color"),

    text_gradient_container: document.getElementById("text_gradient"),
    text_gradient_1: document.getElementById("input_text_gradient_1"),
    text_gradient_2: document.getElementById("input_text_gradient_2"),
    text_gradient_3: document.getElementById("input_text_gradient_3"),



    // -----------------------------------------------------------------------------------------
    // ------------------------------------------Menu Rect--------------------------------------
    // -----------------------------------------------------------------------------------------




    // -----------------------------------------------------------------------------------------
    // ------------------------------------------Menu Circle------------------------------------
    // -----------------------------------------------------------------------------------------




    
    // -----------------------------------------------------------------------------------------
    // ------------------------------------------Function--------------------------------------
    // -----------------------------------------------------------------------------------------
    Initialize: function () {



        // -----------------------------------------------------------------------------------------
        // ------------------------------------------Function boutton menu--------------------------
        // -----------------------------------------------------------------------------------------
        menu_svg_editor.add_text_button.addEventListener("click", function () {
            svg_editor.AddText("Placeholder", "25px");
            menu_svg_editor.DisplayMenu("text");
        });

        menu_svg_editor.add_rect_button.addEventListener("click", function () {
            svg_editor.AddRect(100, 100);
            // menu_svg_editor.DisplayMenu("rect");
        });

        menu_svg_editor.add_circle_button.addEventListener("click", function () {
            svg_editor.AddCircle(25);
            // menu_svg_editor.DisplayMenu("circle");
        });

        menu_svg_editor.text_color_checkbox.addEventListener("click", function () {
            let check = menu_svg_editor.text_color_checkbox.checked;

            if (check == true) {
                menu_svg_editor.text_gradient_container.style.height = "100%";
                menu_svg_editor.text_simple_color_container.style.height = "0";
            }
            else {
                menu_svg_editor.text_gradient_container.style.height = "0";
                menu_svg_editor.text_simple_color_container.style.height = "100%";
            }
        });



        // -----------------------------------------------------------------------------------------
        // ------------------------------------------Mise a jour des elements afficher--------------
        // -----------------------------------------------------------------------------------------
        menu_svg_editor.text_value_input.addEventListener("input", function () {
            svg_editor.actual_selection.innerHTML = menu_svg_editor.text_value_input.value;
        });

        menu_svg_editor.text_font_value_input.addEventListener("input", function () {
            svg_editor.actual_selection.style.fontSize = menu_svg_editor.text_font_value_input.value + "px";
        });

        menu_svg_editor.input_text_color.addEventListener("input", function () {
            svg_editor.actual_selection.style.fill = menu_svg_editor.input_text_color.value;
        });

    },

    DisplayMenu: function (type) {

        if (type == "text") {
            console.log("color : " + menu_svg_editor.RgbToHex(svg_editor.actual_selection.style.fill));

            menu_svg_editor.menu_text.style.height = "fit-content";
            menu_svg_editor.text_value_input.value = svg_editor.actual_selection.innerHTML;
            menu_svg_editor.text_font_value_input.value = parseInt(svg_editor.actual_selection.style.fontSize.split("px")[0]);
            menu_svg_editor.input_text_color.value = menu_svg_editor.RgbToHex(svg_editor.actual_selection.style.fill);
        }
    },

    ResetMenu: function () {
        menu_svg_editor.menu_text.style.height = "0";
    },




    // -----------------------------------------------------------------------------------------
    // ------------------------------------------Module complementaire--------------------------
    // -----------------------------------------------------------------------------------------
    GetRGBValue: function (color) {
        let rgb = color;

        rgb = rgb.replace(/[^\d,]/g, '').split(',');
        return rgb;
    },

    RgbToHex: function (color) {
        let rgb = menu_svg_editor.GetRGBValue(color);

        return "#" + menu_svg_editor.ComponentToHex(rgb[0]) +
            menu_svg_editor.ComponentToHex(rgb[1]) +
            menu_svg_editor.ComponentToHex(rgb[2]);
    },

    ComponentToHex: function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

}

export { menu_svg_editor };