//Declare global variables. studentList holds the HTML collection of all the students within index.html and is what the initial function calls use on page load. 
//studentTempList will be overriden as needed when using the search function
const studentList = document.getElementsByClassName('student-item');
let studentTempList = [];

//Function to create all the DIV elements needed for the other functions to work.
//Side note: I originally wrote this by using .innerHTML. I personally thought it looked cleaner but wasn't sure if I would meet the project
//requirements if I did not create elements and append them to the DOM
function initialize() {
    //Create DIV elements
    const paginationDiv = document.createElement('DIV'); //This will hold the page numbers
    const searchDiv = document.createElement('DIV'); //This will hold the search input box and search button
    const noResultsDiv = document.createElement('DIV'); //This will hold the error message for no search results found

    //Create UL element for the pagination list
    const paginationUL = document.createElement('UL');

    //Create the INPUT and BUTTON elements for the search area
    const searchField = document.createElement('INPUT')
    const searchButton = document.createElement('BUTTON');

    //Place the DIV elements in the DOM
    const paginationNav = document.querySelector('.page').appendChild(paginationDiv);
    const searchArea = document.querySelector('.page-header').appendChild(searchDiv);
    const noResults = document.querySelector('.student-list').appendChild(noResultsDiv);

    //Set the classname of the pagination DIV
    paginationNav.className = 'pagination';

    paginationNav.appendChild(paginationUL);

    //Place the search input and button within the search DIV.
    searchArea.appendChild(searchField);
    searchArea.appendChild(searchButton);

    //Set the classname and other values of all the elements within the search DIV
    searchArea.className = 'student-search';
    searchField.placeholder = 'Search for students...';
    searchButton.innerText = 'Search';

    //Creates the no search results message and initially hides it until it is needed
    noResultsDiv.innerText = 'No results found.';
    noResults.className = 'no-results';
    noResults.style.display = 'none';
}

//This function creates the the page buttons on the bottom of the page.
//The totalStudentsToSort parimeter is used to determin how many pages should be generated based on how many students exist. A perimeter is used because when using the search box,
//the total number of students will constantly change during the live search.
function pagination(totalStudentsToSort) {
    const paginationNav = document.querySelector('.pagination ul');
    let totalPages = Math.ceil(totalStudentsToSort / 10);
    let paginationHTML = ''; //Value is cleared each time the function is called.

    //This loop will run for the length of total pages needed. paginationHTML builds the list elements needed and adds the 'active' classname to the first
    //page for styling.
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += '<li>';
        if (i === 1) {
            paginationHTML += '<a class=\"active\" href=\"#\">' + i + '</a>';
        } else {
            paginationHTML += '<a href=\"#\">' + i + '</a>';
        }
        paginationHTML += '</li>';
    }
    paginationNav.innerHTML = paginationHTML;
}

//This function displays 10 students based on the two perimeters passed in.
//Page number is supplied by the first perimeter.
//Simple equations are used to find where in the studentlist array to start. 
//Multiplying the page number you want to display by 10 - 1 will give you the array postion of the 10th student on the page
//Multipling the page number you want - 10 will give the array position of the first student of the page.
function studentDisplay(page, studentsToDisplay) {
    let totalStudents = studentsToDisplay.length;
    let lastStudent = (page * 10) - 1;
    let firstStudent = (page * 10) - 10;
    studentTempList = studentsToDisplay;

    //The loop will run to the length of total students needed to display.
    //A single IF/ELSE conditional checks if each student falls between or is equal to the first student of the page and the last student.
    //If true, the student will be displayed otherwise the student will be hidden.
    for (let i = 0; i < totalStudents; i++) {
        if (i <= lastStudent && i >= firstStudent) {
            studentTempList[i].style.display = 'block';
        }
        else {
            studentTempList[i].style.display = 'none';
        }
    }

}

//Function is called from an event listener looking for clicks in the .pagination DIV
//The loop will reset all the page links to the default styling with no classname
//The page number that is clicked is styled as active.
//After styling is complete, the studentDisplay function is called passing the page number clicked
function paginationNavClick(event) {
    const linkButtons = document.querySelectorAll('.pagination ul li a');

    if (event.target.tagName === 'A') {
        for (let i = 0; i < linkButtons.length; i++) {
            if (linkButtons[i].innerText != event.target.innerText) {
                linkButtons[i].className = '';
            }
            else {
                event.target.className = 'active';
            }
        }
        studentDisplay(parseInt(event.target.innerText), studentTempList);
    }
}

//Search function which is called every time a keyup is detected in the input field
//If there are no values in the input field, the orignal list of students is displayed
function search() {
    let searchResults = [];
    let searchTerm = document.querySelector('.student-search input').value.toLowerCase();
    const noResult = document.querySelector('.no-results'); //No search results DIV

    //Loop through the original list of students and compare the value of the search box to the student name or student email
    for (i = 0; i < studentList.length; i++) {
        let studentItem = studentList[i]; //Current student
        let studentName = studentList[i].firstElementChild.firstElementChild.nextElementSibling.innerText; //Navigates to the H3 tag that holds the student's name
        let studentEmail = studentList[i].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText; //Navigates to the span that holds the student's email
        studentList[i].style.display = 'none'; //Initially hides the student

        //Conditional checks the index position of the what is entered in the INPUT field using indexOf(). If -1 is returned, this means none of the student names or emails contain
        //what was entered in the search field. If 0 or greater is returned, the student is pushed to the searchResults array.
        if (studentName.toLowerCase().indexOf(searchTerm) > - 1 || studentEmail.toLowerCase().indexOf(searchTerm) > - 1) {
            noResult.style.display = 'none'; //The no search results DIV is set to hide if a match is found
            searchResults.push(studentItem);
        }
        //If the searchResults array contains nothing, the no search results message is displayed.
        if (searchResults.length === 0) {
            noResult.style.display = 'block';
        }
    }

    //StudentDisplay function is called with the search results starting on page 1
    //Pagination function is called to create the correct amount of page links
    studentDisplay(1, searchResults);
    pagination(searchResults.length);
}


//function calls
initialize();
pagination(studentList.length);
studentDisplay(1, studentList);


//Set event listeners
//Originally the search only worked when the search button was pressed. The keyup even listener creates a live search so I removed the event listener for the searchButtom
document.querySelector('.student-search input').addEventListener('keyup', search);
document.querySelector('.pagination').addEventListener('click', paginationNavClick);