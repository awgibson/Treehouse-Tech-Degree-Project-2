const studentList = document.getElementsByClassName('student-item');
const mainContainer = document.querySelector('.student-list');
const listItem = document.createElement('LI');
let totalPages = 0;
const paginationNav = document.querySelector('.pagination');
let paginationHTML;
let linkButtons;
const searchArea = document.querySelector('.student-search');
let studentTempList = [];
const noResult = document.createElement('DIV');



function pagination(totalStudentsToSort) {
    totalPages = Math.ceil(totalStudentsToSort / 10);
    paginationHTML = '<ul>';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += '<li>';
        if (i === 1) {
            paginationHTML += '<a class=\"active\" href=\"#\">' + i + '</a>';
        } else {
            paginationHTML += '<a href=\"#\">' + i + '</a>';
        }
        paginationHTML += '</li>';
    }
    paginationHTML += '</ul>';
    paginationNav.innerHTML = paginationHTML;
}

function studentDisplay(page, studentsToDisplay) {
    let totalStudents = studentsToDisplay.length;
    let lastStudent = page * 10;
    let firstStudent = lastStudent - 10;
    studentTempList = studentsToDisplay;
    console.log(studentTempList, lastStudent, firstStudent, totalStudents);
    for (let i = 0; i < totalStudents; i++) {
        if (i < lastStudent && i > firstStudent - 1) {
            studentTempList[i].style = 'display: show';
            console.log('Displayed students');
        }
        else {
            studentTempList[i].style = 'display: none';
            console.log('Hidden students');
        }
    }

}

function paginationNavClick() {
    linkButtons = document.querySelectorAll('.pagination ul li a');

    if (event.target.tagName === 'A') {
        for (let i = 0; i < linkButtons.length; i++) {
            if (linkButtons[i].innerText != event.target.innerText) {
                linkButtons[i].className = '';
            } else {
                event.target.className = 'active';
            }
        }
        studentDisplay(parseInt(event.target.innerText), studentTempList);
    }
}

function search() {
    let searchResults = [];
    let searchTerm = searchBox.value.toLowerCase();

    console.log(searchTerm);
    for (i = 0; i < studentList.length; i++) {
        let studentItem = studentList[i];
        let studentName = studentList[i].firstElementChild.firstElementChild.nextElementSibling.innerText;
        let studentEmail = studentList[i].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText;
        studentList[i].style = 'display: none';
        if (studentName.toLowerCase().indexOf(searchTerm) > - 1 || studentEmail.toLowerCase().indexOf(searchTerm) > - 1) {
            console.log('Search match');
            noResult.style = 'display: none';
            searchResults.push(studentItem);
        }
        if (searchResults.length === 0) {
            noResult.style = 'display: show';
        }
    }

    console.log(searchResults);
    studentDisplay(1, searchResults);
    pagination(searchResults.length);
}


mainContainer.appendChild(noResult).innerText = 'No results found.';
noResult.style = 'display: none';
searchArea.innerHTML = '<input placeholder="Search for students..."><button>Search</button>';
const searchBox = document.querySelector('.student-search input');
const searchButton = document.querySelector('.student-search button');

//function calls
pagination(studentList.length);
studentDisplay(1, studentList);

paginationNav.addEventListener('click', paginationNavClick);
searchButton.addEventListener('click', search);
searchBox.addEventListener('keyup', search);