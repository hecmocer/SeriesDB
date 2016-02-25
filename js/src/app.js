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

        // Petición ajax asíncrona
        $.ajax({
            method: 'POST',
            url: "/api/series/",
            data: JSON.stringify({
                title: title,
                url: url,
            }),
            contentType: 'application/json',
            success: function(){
                reloadSeries();
                alert("Guardado con éxito!");
            },
            error: function(){
                alert("Se ha producido un error");
            }
        });

        return false;
    });

    function reloadSeries(){
        console.log("Cargando series");
        $.ajax({
            url: "/api/series",
            //method: "GET", Por defecto es get
            //contentType : "aplication/json", Por defecto es json
            success: function(data){
                console.log("Series recuperadas", data);
                var html = "";
                for(var i in data) {
                    var id = data[i].id;
                    var title = data[i].title;
                    var url = data[i].url || ""; // Para capturar que sea undefined
                    html += "<li>";
                    html += '<button data-serieid ="'+ id + '"">Eliminar</button> ';
                    html += title;
                    if (url.length > 0){
                        html += " (" + url + ")";
                    }
                    html += "</li>";

                }
                $("#seriesList").html(html);
            }
        });
    }

    //Patrón para pasar función con parámetros porque si pusieramos paréntesis arriba se ejecutaría, no se pasaría la función
    $("#reloadSeriesButton").on("click", function(){
        reloadSeries();
    });

    reloadSeries();

    //No funciona ya que los botones se añaden despues de cargar la página7
    /*
    $("#seriesList button").on("click", function(){
        console.log("Elimino la serie");
    })*/

    $("#seriesList").on("click", "button", function(){
        console.log("Elimino la serie");
        var self = this;
        var id = $(self).data("serieid"); //Tomo el valor del atributo data-serieid

        $.ajax({
            url: "/api/series/" + id,
            method: "DELETE",
            success: function(){
                // reloadSeries(); <-- implica una peticion ajax
                $(self).parent().remove();
            }
        });

    });

});