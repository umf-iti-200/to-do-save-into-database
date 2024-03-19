
function addToDoItem(item) {

    $("#to-do").append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <input class="form-check-input me-1" type="checkbox" value="" id="${item.id}">
            <div class="ms-2 me-auto">
                <label class="form-check-label me-austo " for="${item.id}">${item.title}</label>
            </div>
            <button class="btn btn-sm btn-danger btn-delete"><i class="bi bi-trash"></i></button>
        </li>
    `)
}

function addDoneItem(item) {

    $("#done").append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <input class="form-check-input me-1" type="checkbox" checked value="" id="${item.id}">
            <div class="ms-2 me-auto">
                <label class="form-check-label me-austo " for="${item.id}">${item.title}</label>
            </div>
            <button class="btn btn-sm btn-danger btn-delete"><i class="bi bi-trash"></i></button>
        </li>
    `)
}

function loadItems(){

    $("#to-do li").remove();
    $("#done li").remove();

    $.get("/items", function (response) {

        for (let item of response) {

            if (item.done) {
                addDoneItem(item)
            } else {
                addToDoItem(item);
            }
        }
    });
}

$(function () {

    loadItems();

    // Every time the user opens the list, all to-do checkboxes should not be checked
    $("#to-do .form-check-input").prop("checked", false);

    // Every time the user opens the list, all done checkboxes should be checked
    $("#done .form-check-input").prop("checked", true);

    $("#btn-new").click(function () {

        let name = prompt("What is the name?");

        if (!name || name.trim() === "") {
            return;
        }

        const request = {
            title: name,
            done: false
        };

        $.post("http://localhost:3000/items/save", request, function (response) {
            
            loadItems();
        });
    });


    $(document).on("click", ".btn-delete", function () {
        if (confirm("Are you sure?")) {
            $(this).parent().remove();
        }
    });

    $(document).on("change", "#to-do .form-check-input", function () {

        $("#done").append($(this).parent().clone())

        $(this).parent().remove();
    });

    $(document).on("change", "#done .form-check-input", function () {

        $("#to-do").append($(this).parent().clone())

        $(this).parent().remove();
    });

});