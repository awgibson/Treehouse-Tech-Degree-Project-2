const studentList = document.getElementsByClassName('student-item');
const totalStudents = studentList.length;
const totalPages = Math.ceil(totalStudents / 10);
const paginationLinks = document.getElementsByClassName('pagination');
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
    paginationLinks[0].innerHTML = paginationHTML;
}

function studentDisplay(page) {
    let lastStudent = page * 10;
    let firstStudent = lastStudent - 10;

    for (let i = 0; i < totalStudents; i++) {
        studentList[i].style = 'display: show';
    } for (let i = lastStudent; i < totalStudents; i++) {
        studentList[i].style = 'display: none';
    }
    for (let i = firstStudent - 1; i > -1; i--) {
        studentList[i].style = 'display: none';
    }


}

pagination();
studentDisplay(1);

linkButtons = document.querySelectorAll('.pagination ul li a');

window.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        for (let i = 0; i < linkButtons.length; i++) {
            linkButtons[i].className = '';
        }
        event.target.className = 'active';
        studentDisplay(parseInt(event.target.innerText));
    }
});