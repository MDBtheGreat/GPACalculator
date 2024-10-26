const courseList = document.getElementById('courseList');
const addRowBtn = document.getElementById('addRow');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const gpaResult = document.getElementById('gpaResult');
const gpaValue = document.getElementById('gpaValue');

const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
};

let courseId = 0;

function createCourseRow() {
    courseId++;
    const row = document.createElement('div');
    row.className = 'grid grid-cols-5 gap-2 items-center';
    row.innerHTML = `
        <div>
            <input type="checkbox" checked>
        </div>
        <div>
            <input type="text" placeholder="Course Name">
        </div>
        <div>
            <select>
                <option value="">--</option>
                ${Object.keys(gradePoints).map(grade => `<option value="${grade}">${grade}</option>`).join('')}
            </select>
        </div>
        <div>
            <input type="number" min="0" step="1.0" placeholder="Credits">
        </div>
        <div>
            <button class="delete-btn">X</button>
        </div>
    `;
    courseList.appendChild(row);

    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        courseList.removeChild(row);
    });
}

function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    courseList.querySelectorAll('.grid').forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const gradeSelect = row.querySelector('select');
        const creditsInput = row.querySelector('input[type="number"]');

        if (checkbox.checked && gradeSelect.value && creditsInput.value) {
            const grade = gradeSelect.value;
            const credits = parseFloat(creditsInput.value);
            totalPoints += gradePoints[grade] * credits;
            totalCredits += credits;
        }
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    gpaValue.textContent = gpa.toFixed(2);
    gpaResult.classList.remove('hidden');
}

function resetForm() {
    courseList.querySelectorAll('.grid').forEach(row => {
        row.querySelector('select').value = '';
        row.querySelector('input[type="number"]').value = '';
    });
    gpaResult.classList.add('hidden');
}

addRowBtn.addEventListener('click', createCourseRow);
calculateBtn.addEventListener('click', calculateGPA);
resetBtn.addEventListener('click', resetForm);

// Initialize with one row
createCourseRow();