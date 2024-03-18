$(document).ready(function(){

fetchData();

});

async function fetchData(){

const API_URL = "https://fakestoreapi.com/products";


	try{
		const response = await fetch(API_URL);
		
		if (!response.ok) {
			throw new Error("Could not fetch resources");
		}
		
		const data = await response.json();
		
		// do the html display here
		view_json(data);
		
	}
	catch(Error) {
		console.error(Error);
	}
}

// Function to display JSON data to HTML table
      function view_json(data) {

         
         // Get the container element where the table will be inserted
         let container = $("#container");
         
         // Create the table element
         let table = $("<table>");
         
         // Get the keys (column names) of the first object in the JSON data
         let cols = Object.keys(data[0]);
         
         // Create the header element
         let thead = $("<thead>");
         let tr = $("<tr>");
         
         // Loop through the column names and create header cells
         $.each(cols, function(i, item){
            let th = $("<th>");
            th.text(item); // Set the column name as the text of the header cell
            tr.append(th); // Append the header cell to the header row
         });
         thead.append(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table
         
         // Loop through the JSON data and create table rows
         $.each(data, function(i, item){
         let tr = $("<tr>");
            
            // Get the values of the current object in the JSON data
            let vals = Object.values(item);
            
            // Loop through the values and create table cells
            $.each(vals, (i, elem) => {
               let td = $("<td>");
               td.text(elem); // Set the value as the text of the table cell
               tr.append(td); // Append the table cell to the table row
            });
            table.append(tr); // Append the table row to the table
         });
         container.append(table) // Append the table to the container element
      }