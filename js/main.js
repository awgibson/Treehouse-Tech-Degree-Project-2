const studentList = document.getElementsByClassName('student-item');
const totalStudents = studentList.length;
const totalPages = Math.ceil(totalStudents / 10);
const paginationNav = document.querySelector('.pagination');
let paginationHTML;
let linkButtons;


function pagination() {
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

function studentDisplay(page) {
    let lastStudent = page * 10;
    let firstStudent = lastStudent - 10;

    for (let i = 0; i < totalStudents; i++) {
        if (i < lastStudent && i > firstStudent - 1) {
            studentList[i].style = 'display: show';
        } else {
            studentList[i].style = 'display: none';
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
        studentDisplay(parseInt(event.target.innerText));
    }
}


pagination();
studentDisplay(1);

paginationNav.addEventListener('click', paginationNavClick);