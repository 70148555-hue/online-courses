/**
 * PROJECT: Smart Study Hub
 * MODULE: Home Page CRUD Logic
 * TASK 5 & 6 COMPLIANCE: Object, String, and Array Methods
 */

// 1. Initial Data (Task 5: Using Object.freeze to define a constant data set)
const INITIAL_COURSES = Object.freeze([
    { id: 1001, title: 'JavaScript Mastery', price: 50, category: 'development' },
    { id: 1002, title: 'UI/UX Design', price: 40, category: 'design' },
    { id: 1003, title: 'Python for Data Science', price: 60, category: 'data science' }
]);

// Main State
let courses = [...INITIAL_COURSES];

// Selectors
const courseList = document.getElementById('course-list');
const addCourseBtn = document.getElementById('add-course-btn');
const searchInput = document.getElementById('search-input');

/**
 * RENDER FUNCTION (Read)
 * Task 5: Uses Object.values to extract data from objects.
 * Task 6: Uses String methods (toUpperCase, padStart) and Array methods (forEach).
 */
const renderCourses = (dataToRender) => {
    courseList.innerHTML = '';

    if (dataToRender.length === 0) {
        courseList.innerHTML = `<p class="text-gray-500 dark:text-gray-400 col-span-full text-center py-10">No courses found matching your search.</p>`;
        return;
    }

    dataToRender.forEach(course => {
        // Task 5: Accessing values dynamically
        const [id, title, price, category] = Object.values(course);

        const card = document.createElement('div');
        card.className = "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 transition-transform hover:scale-105";
        
        // Task 6: title.toUpperCase() and String(id).padStart()
        card.innerHTML = `
            <div class="flex flex-col h-full justify-between">
                <div>
                    <span class="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded uppercase">${category}</span>
                    <h3 class="text-xl font-bold mt-2 text-gray-900 dark:text-white">${title.toUpperCase()}</h3>
                    <p class="text-gray-400 text-xs mt-1">ID: SSH-${String(id).padStart(5, '0')}</p>
                    <p class="text-2xl font-extrabold text-blue-600 mt-4">$${price}</p>
                </div>
                <button onclick="deleteCourse(${id})" class="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors shadow-md">
                    Delete Course
                </button>
            </div>
        `;
        courseList.appendChild(card);
    });
};

/**
 * CREATE FUNCTION
 * Task 5: Uses Object.assign to create the new course object.
 */
const addCourse = () => {
    const titleVal = document.getElementById('course-title').value;
    const priceVal = document.getElementById('course-price').value;

    if (!titleVal || !priceVal) {
        alert("Please fill in both title and price!");
        return;
    }

    // Task 5: Merging objects using Object.assign
    const newCourse = Object.assign({}, {
        id: Date.now(),
        title: titleVal.trim(),
        price: Number(priceVal),
        category: 'general'
    });

    courses.push(newCourse);
    renderCourses(courses);
    
    // Reset inputs
    document.getElementById('course-title').value = '';
    document.getElementById('course-price').value = '';
};

/**
 * SEARCH FUNCTION
 * Task 5: Uses Object.keys to search through any attribute.
 */
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    
    const filtered = courses.filter(course => {
        // Task 5: Object.keys checks if the term exists in ANY key of the course
        return Object.keys(course).some(key => {
            return String(course[key]).toLowerCase().includes(term);
        });
    });
    
    renderCourses(filtered);
});

/**
 * DELETE FUNCTION
 */
window.deleteCourse = (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
        courses = courses.filter(course => course.id !== id);
        renderCourses(courses);
    }
};

// Event Listeners
addCourseBtn.addEventListener('click', addCourse);

// Initial Render
renderCourses(courses);