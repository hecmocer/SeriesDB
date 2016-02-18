// exportar grunt
module.exports = function (grunt) {

    // Configuración de Grunt
    var settings = {
        less: {
            build: { // nombre cualquiera
                files: { // archivos a compilar
                    "style.css": "less/style.less" // destino: origen
                }
            }
            // en el caso de tener otra página css para una página de login
            /*login: {
                files: {
                    "login.css": "less\\login.less"
                }
            }*/
        },
        watch: {
            styles: {
                files: ["less/*.less"], // observa cualqueir cambio en archivos LESS
                tasks: ["less"], // ejecuta la compilación/tarea less
                options: {
                    spawn: false // para que no se quede tostado (creemos)
                }
            }
        }
    };

    // Cargamos configuración de Grunt
    grunt.initConfig(settings);


    // Cargamos plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Definimos tareas disponibles para grunt-cli
    grunt.registerTask('default', ['less', 'watch']); //en caso de solo cargar el login--> less:login
    //Para pasar a producción--> grunt.registerTask('production', ['less']);
}