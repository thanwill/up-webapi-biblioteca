// chama todos os componentes do Materilize de uma única vez.
M.AutoInit();



$(document).ready(function () {
    $('.fixed-action-btn').floatingActionButton({
        toolbarEnabled: true
    });
});

function escrever() {
    Console.log("cliquei");
}
