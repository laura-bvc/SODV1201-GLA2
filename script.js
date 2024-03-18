/**
 * @name: GLA 2
 * @Course Code: SODV1201
 * @class: Software Development Diploma program.
 * @author: Laurainda Fan
 **/

$(document).ready(function () {

    fetchData();

});

async function fetchData() {

    const API_URL = "https://fakestoreapi.com/products";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not fetch resources");
        }

        const data = await response.json();

        // do the html display here
        view_json(data);

    } catch (Error) {
        console.error(Error);
    }
}

// Function to display JSON data to HTML table
function view_json(data) {

    // Identify the column with Image Link
    let img_col;
    let img_url;

    let price_col;
    let cat_col; // category column
    let cat_array = []; //array to hold distinct category value
    let rate_col; // rating column

    // Get the container element where the table will be inserted
    let container = $("#container");

    // Create the table element
    let table = $("<table id='data'>");

    // Get the keys (column names) of the first object in the JSON data
    let cols = Object.keys(data[0]);

    // Create the header element
    let thead = $("<thead>");
    let tr = $("<tr>");

    // Loop through the column names and create header cells
    $.each(cols, function (i, item) {
        let th = $("<th>");
        th.text(item); // Set the column name as the text of the header cell
        switch (item) {
        case 'image':
            img_col = i;
            break;
        case 'price':
            price_col = i;
            break;
        case 'category':
            cat_col = i;
            break;
        case 'rating':
            rate_col = i;
            break;
        }
        tr.append(th); // Append the header cell to the header row
    });
    thead.append(tr); // Append the header row to the header
    table.append(tr) // Append the header to the table

    // Loop through the JSON data and create table rows
    $.each(data, function (i, item) {
        let tr = $("<tr>");

        // Get the values of the current object in the JSON data
        let vals = Object.values(item);

        // Loop through the values and create table cells
        $.each(vals, (i, elem) => {
            let td = $("<td>");
            switch (i) {
            case img_col:
                img_url = elem;
                td.append($('<img>').attr('src', img_url));
                break;
            case rate_col:
                var rate_str = JSON.stringify(elem);
                rate_str = rate_str.slice(1, rate_str.length - 1);
                rate_str = rate_str.replace(",", "<br>");
                rate_str = rate_str.replace(/"/g, '');
                td.html(rate_str);
                break;
            case cat_col:
                if (!cat_array.includes(elem)) {
                    cat_array.push(elem);
                }
            case price_col:
            default:
                td.text(elem); // Set the value as the text of the table cell
            }

            tr.append(td); // Append the table cell to the table row
        });
        table.append(tr); // Append the table row to the table
    });
    container.append(table) // Append the table to the container element

    // add sort by price (asc/desc) & button
    table.before("<form><label for='sortBy'>Sort by Price</label>" +
        "<select name='sortOrder' id='sortOrder'><option value='asc'>Ascending</option>" +
        "<option value='des'>Descending</option></select>" +
        "<input type='button' id='button_sort' value='Sort'></form><br>");

    //$("#button_sort").click(sort_data);


    // add filter by category

    var filter_str = "";
    filter_str += "<form><label for='filterBy'>Filter by Category</label>" +
    "<select name='filterBy' id='filterBy'>";

    //option
    cat_array.forEach(function (item) {
        filter_str += '<option value="' + item + '">' + item + '</option>';
    });

    filter_str += "</select><input type='button' id='button_filter' value='Filter' onclick='filter_data()'></form><br>";

    table.before(filter_str);
}

function filter_data() {
    $('#data').children().show();

    console.log($('#filterBy').val());
    console.log($('tr:not(:contains("' + $('#filterBy').val() + '"))'));

    $('tr:not(:contains("' + $('#filterBy').val() + '"))').hide();
    $('#data').children().first().show();
}
