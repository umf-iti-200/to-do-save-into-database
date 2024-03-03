
let COUNT_ID = 4;

$(function () {

    // Every time the user opens the list, all never-do checkboxes should not be checked
    $("#never-do .form-check-input").prop("checked", false);

    // Every time the user opens the list, all not-done checkboxes should be checked
    $("#not-done .form-check-input").prop("checked", true);

    $("#btn-new").click(function () {

        let name = prompt("What is the name?");

        if (name === undefined || name === null) {
            return;
        }

        // Remove all empty spaces at the beginning and at the end of the string
        name = name.trim();

        if (name === "") {
            return;
        }

        $("#never-do").append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <input class="form-check-input me-1" type="checkbox" value="" id="${COUNT_ID}">
                <div class="ms-2 me-auto">
                    <label class="form-check-label me-austo " for="${COUNT_ID}">${name}</label>
                </div>
                <button class="btn btn-sm btn-danger btn-delete"><i class="bi bi-trash"></i></button>
            </li>
        `)

        const request = {
            nerverDo: name
        };

        $.post("http://localhost:3000/save/never-do", request, function (response) {
            console.log(response)
        });

        COUNT_ID++
    });


    $(document).on("click", ".btn-delete", function () {
        if (confirm("Are you sure?")) {
            $(this).parent().remove();
        }
    });

    $(document).on("change", "#never-do .form-check-input", function () {

        $("#not-done").append($(this).parent().clone())

        $(this).parent().remove();
    });

    $(document).on("change", "#not-done .form-check-input", function () {

        $("#never-do").append($(this).parent().clone())

        $(this).parent().remove();
    });

});