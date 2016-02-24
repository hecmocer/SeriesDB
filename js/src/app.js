$(document).ready(function(){ // Cuando la página se ha cargado por completo

    // Ponemos el foco en el primer input
    $(".auto-focus").focus(); //De esta forma se podría poner focus siempre en el primer campo del formulario, solo añadiendo clase de css

    $("form").on("submit", function(){ // Cuando se intenta enviar el formulario

    //Validación del título
    var title = $.trim( $("#title").val() );
    if (title == "") {
        alert("El título no puede ser vacío");
            return false; // Jquery cancela el envio del formulario (prevent default)
        }

        //Validación de URL
        var url = $.trim( $("#cover_url").val() );
        // Expresión regular entre /(...)/ig
        //i flag ignore case, g flag global
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig
        if(url != "" && pattern.test(url) == false){
            alert("La URL de la carátula no es válida");
            return false;
        }

        //Validacion de categorías
        var selectedCategories = $('input[name="category"]:checked');
        if( selectedCategories.length <= 0 ){

            alert("Selecciona al menos una categoría");
            return false;
        }

        $.ajax({
            url: "/api/series/",
            data: JSON.stringify({
                title: title,
                url: url,
            }),
            contentType: 'application/json',
            method: 'POST',
            success: function(){
                alert("Guardado con éxito!");
            },
            error: function(){
                alert("Se ha producido un error");
            }
        });

        return false;

    });
});