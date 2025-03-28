// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Show loading indicators
  const loadingIndicators = document.querySelectorAll(".loading-indicator")
  loadingIndicators.forEach((indicator) => {
    indicator.style.display = "block"
  })

  // Hide loading indicators after a short delay to simulate loading
  setTimeout(() => {
    loadingIndicators.forEach((indicator) => {
      indicator.style.display = "none"
    })
  }, 500)

  // Modal functionality
  setupModals()

  // Setup page-specific functionality
  if (document.querySelector(".job-list")) {
    setupJobListings()
  }

  if (document.querySelector(".scholarship-list")) {
    setupScholarships()
  }

  if (document.querySelector(".course-list")) {
    setupCourses()
  }

  // Auth buttons
  setupAuth()
})

// Modal Setup
function setupModals() {
  // Login Modal
  const loginBtn = document.getElementById("login-btn")
  const loginModal = document.getElementById("login-modal")

  // Signup Modal
  const signupBtn = document.getElementById("signup-btn")
  const signupModal = document.getElementById("signup-modal")

  // Add Job Modal
  const addJobBtn = document.getElementById("add-job-btn")
  const addJobModal = document.getElementById("add-job-modal")

  // Add Scholarship Modal
  const addScholarshipBtn = document.getElementById("add-scholarship-btn")
  const addScholarshipModal = document.getElementById("add-scholarship-modal")

  // Add Course Modal
  const addCourseBtn = document.getElementById("add-course-btn")
  const addCourseModal = document.getElementById("add-course-modal")

  // Close buttons
  const closeButtons = document.querySelectorAll(".close")

  // Open modals
  if (loginBtn && loginModal) {
    loginBtn.addEventListener("click", () => {
      loginModal.style.display = "block"
    })
  }

  if (signupBtn && signupModal) {
    signupBtn.addEventListener("click", () => {
      signupModal.style.display = "block"
    })
  }

  if (addJobBtn && addJobModal) {
    addJobBtn.addEventListener("click", () => {
      addJobModal.style.display = "block"
    })
  }

  if (addScholarshipBtn && addScholarshipModal) {
    addScholarshipBtn.addEventListener("click", () => {
      addScholarshipModal.style.display = "block"
    })
  }

  if (addCourseBtn && addCourseModal) {
    addCourseBtn.addEventListener("click", () => {
      addCourseModal.style.display = "block"
    })
  }

  // Close modals
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal")
      if (modal) {
        modal.style.display = "none"
      }
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none"
    }
  })
}

// Job Listings Setup
function setupJobListings() {
  // Load jobs from localStorage
  const jobs = getFromLocalStorage("jobs") || []

  // Display jobs
  displayJobs(jobs)

  // Add job form submission
  const addJobForm = document.getElementById("add-job-form")
  if (addJobForm) {
    addJobForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const newJob = {
        id: Date.now(),
        title: document.getElementById("job-title").value,
        company: document.getElementById("job-company").value,
        location: document.getElementById("job-location").value,
        url: document.getElementById("job-url").value,
        dateApplied: document.getElementById("job-date-applied").value,
        status: document.getElementById("job-status").value,
        description: document.getElementById("job-description").value,
        notes: document.getElementById("job-notes").value,
      }

      // Add to jobs array
      jobs.push(newJob)

      // Save to localStorage
      saveToLocalStorage("jobs", jobs)

      // Display updated jobs
      displayJobs(jobs)

      // Close modal and reset form
      document.getElementById("add-job-modal").style.display = "none"
      addJobForm.reset()
    })
  }

  // Job search functionality
  const jobSearch = document.getElementById("job-search")
  if (jobSearch) {
    jobSearch.addEventListener("input", () => {
      const searchTerm = jobSearch.value.toLowerCase()
      const filteredJobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          (job.location && job.location.toLowerCase().includes(searchTerm)) ||
          (job.description && job.description.toLowerCase().includes(searchTerm)),
      )
      displayJobs(filteredJobs)
    })
  }

  // Job status filter
  const jobStatusFilter = document.getElementById("job-status-filter")
  if (jobStatusFilter) {
    jobStatusFilter.addEventListener("change", () => {
      const status = jobStatusFilter.value
      let filteredJobs = jobs

      if (status !== "all") {
        filteredJobs = jobs.filter((job) => job.status === status)
      }

      displayJobs(filteredJobs)
    })
  }

  const jobSort = document.getElementById("job-sort")
  if (jobSort) {
    jobSort.addEventListener("change", () => {
      const sortOption = jobSort.value
      const sortedJobs = [...jobs] // Create a copy of the jobs array

      switch (sortOption) {
        case "newest":
          sortedJobs.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
          break
        case "oldest":
          sortedJobs.sort((a, b) => new Date(a.dateApplied) - new Date(b.dateApplied))
          break
        case "company":
          sortedJobs.sort((a, b) => a.company.localeCompare(b.company))
          break
        case "title":
          sortedJobs.sort((a, b) => a.title.localeCompare(b.title))
          break
      }

      displayJobs(sortedJobs)
    })
  }
}

// Scholarships Setup
function setupScholarships() {
  // Load scholarships from localStorage
  const scholarships = getFromLocalStorage("scholarships") || []

  // Display scholarships
  displayScholarships(scholarships)

  // Add scholarship form submission
  const addScholarshipForm = document.getElementById("add-scholarship-form")
  if (addScholarshipForm) {
    addScholarshipForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const newScholarship = {
        id: Date.now(),
        name: document.getElementById("scholarship-name").value,
        organization: document.getElementById("scholarship-organization").value,
        amount: document.getElementById("scholarship-amount").value,
        deadline: document.getElementById("scholarship-deadline").value,
        url: document.getElementById("scholarship-url").value,
        status: document.getElementById("scholarship-status").value,
        eligibility: document.getElementById("scholarship-eligibility").value,
        requirements: document.getElementById("scholarship-requirements").value,
        notes: document.getElementById("scholarship-notes").value,
      }

      // Add to scholarships array
      scholarships.push(newScholarship)

      // Save to localStorage
      saveToLocalStorage("scholarships", scholarships)

      // Display updated scholarships
      displayScholarships(scholarships)

      // Close modal and reset form
      document.getElementById("add-scholarship-modal").style.display = "none"
      addScholarshipForm.reset()
    })
  }

  // Scholarship search functionality
  const scholarshipSearch = document.getElementById("scholarship-search")
  if (scholarshipSearch) {
    scholarshipSearch.addEventListener("input", () => {
      const searchTerm = scholarshipSearch.value.toLowerCase()
      const filteredScholarships = scholarships.filter(
        (scholarship) =>
          scholarship.name.toLowerCase().includes(searchTerm) ||
          scholarship.organization.toLowerCase().includes(searchTerm) ||
          (scholarship.eligibility && scholarship.eligibility.toLowerCase().includes(searchTerm)) ||
          (scholarship.requirements && scholarship.requirements.toLowerCase().includes(searchTerm)),
      )
      displayScholarships(filteredScholarships)
    })
  }

  // Scholarship status filter
  const scholarshipStatusFilter = document.getElementById("scholarship-status-filter")
  if (scholarshipStatusFilter) {
    scholarshipStatusFilter.addEventListener("change", () => {
      const status = scholarshipStatusFilter.value
      let filteredScholarships = scholarships

      if (status !== "all") {
        filteredScholarships = scholarships.filter((scholarship) => scholarship.status === status)
      }

      displayScholarships(filteredScholarships)
    })
  }

  // Scholarship sort
  const scholarshipSort = document.getElementById("scholarship-sort")
  if (scholarshipSort) {
    scholarshipSort.addEventListener("change", () => {
      const sortOption = scholarshipSort.value
      const sortedScholarships = [...scholarships] // Create a copy of the scholarships array

      switch (sortOption) {
        case "deadline-asc":
          sortedScholarships.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          break
        case "deadline-desc":
          sortedScholarships.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
          break
        case "amount-desc":
          sortedScholarships.sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount))
          break
        case "amount-asc":
          sortedScholarships.sort((a, b) => parseAmount(a.amount) - parseAmount(b.amount))
          break
        case "name":
          sortedScholarships.sort((a, b) => a.name.localeCompare(b.name))
          break
      }

      displayScholarships(sortedScholarships)
    })
  }
}

// Helper function to parse amount strings like "$5,000" to numbers
function parseAmount(amountStr) {
  if (!amountStr) return 0
  // Remove currency symbols and commas, then parse as float
  return Number.parseFloat(amountStr.replace(/[$,]/g, "")) || 0
}

// Courses Setup
function setupCourses() {
  // Load courses from localStorage
  const courses = getFromLocalStorage("courses") || []

  // Display courses
  displayCourses(courses)

  // Add course form submission
  const addCourseForm = document.getElementById("add-course-form")
  if (addCourseForm) {
    addCourseForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const newCourse = {
        id: Date.now(),
        title: document.getElementById("course-title").value,
        platform: document.getElementById("course-platform").value,
        instructor: document.getElementById("course-instructor").value,
        duration: document.getElementById("course-duration").value,
        url: document.getElementById("course-url").value,
        status: document.getElementById("course-status").value,
        progress: document.getElementById("course-progress").value,
        category: document.getElementById("course-category").value,
        description: document.getElementById("course-description").value,
        notes: document.getElementById("course-notes").value,
        dateAdded: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
      }

      // Verify that progress matches status
      if (newCourse.status === "completed" && Number.parseInt(newCourse.progress) < 100) {
        // If status is completed but progress is not 100%, set progress to 100%
        newCourse.progress = "100"
      } else if (newCourse.status === "not-started" && Number.parseInt(newCourse.progress) > 0) {
        // If status is not started but progress is greater than 0%, set progress to 0%
        newCourse.progress = "0"
      } else if (newCourse.status === "in-progress" && Number.parseInt(newCourse.progress) === 100) {
        // If status is in progress but progress is 100%, set status to completed
        newCourse.status = "completed"
      } else if (newCourse.status === "in-progress" && Number.parseInt(newCourse.progress) === 0) {
        // If status is in progress but progress is 0%, set status to not started
        newCourse.status = "not-started"
      }

      // Add to courses array
      courses.push(newCourse)

      // Save to localStorage
      saveToLocalStorage("courses", courses)

      // Display updated courses
      displayCourses(courses)

      // Close modal and reset form
      document.getElementById("add-course-modal").style.display = "none"
      addCourseForm.reset()

      // Show success message
      showNotification("Course added successfully!", "success")
    })
  }

  // Course search functionality
  const courseSearch = document.getElementById("course-search")
  if (courseSearch) {
    courseSearch.addEventListener("input", () => {
      const searchTerm = courseSearch.value.toLowerCase()
      const filteredCourses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm) ||
          course.platform.toLowerCase().includes(searchTerm) ||
          (course.instructor && course.instructor.toLowerCase().includes(searchTerm)) ||
          (course.description && course.description.toLowerCase().includes(searchTerm)) ||
          (course.category && course.category.toLowerCase().includes(searchTerm)),
      )
      displayCourses(filteredCourses)
    })
  }

  // Course status filter
  const courseStatusFilter = document.getElementById("course-status-filter")
  if (courseStatusFilter) {
    courseStatusFilter.addEventListener("change", () => {
      const status = courseStatusFilter.value
      let filteredCourses = courses

      if (status !== "all") {
        filteredCourses = courses.filter((course) => course.status === status)
      }

      displayCourses(filteredCourses)
    })
  }

  // Course sort
  const courseSort = document.getElementById("course-sort")
  if (courseSort) {
    courseSort.addEventListener("change", () => {
      const sortOption = courseSort.value
      const sortedCourses = [...courses] // Create a copy of the courses array

      switch (sortOption) {
        case "name":
          sortedCourses.sort((a, b) => a.title.localeCompare(b.title))
          break
        case "platform":
          sortedCourses.sort((a, b) => a.platform.localeCompare(b.platform))
          break
        case "duration-asc":
          sortedCourses.sort((a, b) => Number.parseFloat(a.duration || 0) - Number.parseFloat(b.duration || 0))
          break
        case "duration-desc":
          sortedCourses.sort((a, b) => Number.parseFloat(b.duration || 0) - Number.parseFloat(a.duration || 0))
          break
        case "progress-asc":
          sortedCourses.sort((a, b) => Number.parseInt(a.progress || 0) - Number.parseInt(b.progress || 0))
          break
        case "progress-desc":
          sortedCourses.sort((a, b) => Number.parseInt(b.progress || 0) - Number.parseInt(a.progress || 0))
          break
      }

      displayCourses(sortedCourses)
    })
  }

  // Status and progress synchronization in the form
  const courseStatus = document.getElementById("course-status")
  const courseProgress = document.getElementById("course-progress")

  if (courseStatus && courseProgress) {
    courseStatus.addEventListener("change", () => {
      const status = courseStatus.value
      if (status === "completed") {
        courseProgress.value = "100"
      } else if (status === "not-started") {
        courseProgress.value = "0"
      }
    })

    courseProgress.addEventListener("change", () => {
      const progress = Number.parseInt(courseProgress.value)
      if (progress === 100) {
        courseStatus.value = "completed"
      } else if (progress === 0) {
        courseStatus.value = "not-started"
      } else if (progress > 0 && progress < 100) {
        courseStatus.value = "in-progress"
      }
    })
  }
}

// Simple notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === "success" ? "fa-check-circle" : "fa-info-circle"}"></i>
      <p>${message}</p>
    </div>
    <button class="notification-close">&times;</button>
  `

  // Add to document
  document.body.appendChild(notification)

  // Show notification with animation
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      notification.remove()
    }, 300) // Wait for the fade out animation to complete
  }, 3000)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.classList.remove("show")
    setTimeout(() => {
      notification.remove()
    }, 300)
  })
}

// Auth Setup
function setupAuth() {
  // Login form submission
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value

      // For now, just simulate login (would connect to backend in real app)
      alert(`Login attempted with ${email}`)

      // Close modal and reset form
      document.getElementById("login-modal").style.display = "none"
      loginForm.reset()
    })
  }

  // Signup form submission
  const signupForm = document.getElementById("signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("signup-name").value
      const email = document.getElementById("signup-email").value
      const password = document.getElementById("signup-password").value
      const confirmPassword = document.getElementById("signup-confirm-password").value

      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return
      }

      // For now, just simulate signup (would connect to backend in real app)
      alert(`Account created for ${name} (${email})`)

      // Close modal and reset form
      document.getElementById("signup-modal").style.display = "none"
      signupForm.reset()
    })
  }
}

// Helper Functions
function displayJobs(jobs) {
  const jobList = document.querySelector(".job-list")
  if (!jobList) return

  if (jobs.length === 0) {
    jobList.innerHTML = '<p class="no-items">No jobs added yet. Click "Add New Job" to get started.</p>'
    return
  }

  jobList.innerHTML = ""

  jobs.forEach((job) => {
    const jobCard = document.createElement("div")
    jobCard.className = "job-card"
    jobCard.innerHTML = `
            <div class="job-header">
                <h3>${job.title}</h3>
                <span class="job-company">${job.company}</span>
                <span class="job-status ${job.status}">${formatStatus(job.status)}</span>
            </div>
            <div class="job-details">
                <p><strong>Date Applied:</strong> ${formatDate(job.dateApplied)}</p>
                <p><strong>Location:</strong> ${job.location || "Not specified"}</p>
                ${job.description ? `<p><strong>Description:</strong> ${job.description}</p>` : ""}
                ${job.notes ? `<p><strong>Notes:</strong> ${job.notes}</p>` : ""}
            </div>
            <div class="job-actions">
                <button class="btn btn-small edit-job" data-id="${job.id}"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-small btn-danger delete-job" data-id="${job.id}"><i class="fas fa-trash"></i> Delete</button>
                ${job.url ? `<a href="${job.url}" target="_blank" class="btn btn-small btn-secondary"><i class="fas fa-external-link-alt"></i> View Job</a>` : ""}
            </div>
        `

    jobList.appendChild(jobCard)
  })

  // Add event listeners for edit and delete buttons
  document.querySelectorAll(".delete-job").forEach((button) => {
    button.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this job?")) {
        const jobId = Number.parseInt(button.getAttribute("data-id"))
        deleteItem("jobs", jobId)
        setupJobListings()
      }
    })
  })

  document.querySelectorAll(".edit-job").forEach((button) => {
    button.addEventListener("click", () => {
      const jobId = Number.parseInt(button.getAttribute("data-id"))
      editJob(jobId)
    })
  })
}

function displayScholarships(scholarships) {
  const scholarshipList = document.querySelector(".scholarship-list")
  if (!scholarshipList) return

  if (scholarships.length === 0) {
    scholarshipList.innerHTML =
      '<p class="no-items">No scholarships added yet. Click "Add New Scholarship" to get started.</p>'
    return
  }

  scholarshipList.innerHTML = ""

  scholarships.forEach((scholarship) => {
    const scholarshipCard = document.createElement("div")
    scholarshipCard.className = `scholarship-card ${scholarship.status}`
    scholarshipCard.innerHTML = `
            <div class="scholarship-header">
                <h3>${scholarship.name}</h3>
                <span class="scholarship-organization">${scholarship.organization}</span>
                <span class="scholarship-status ${scholarship.status}">${formatStatus(scholarship.status)}</span>
            </div>
            <div class="scholarship-details">
                <p><strong>Amount:</strong> ${scholarship.amount}</p>
                <p><strong>Deadline:</strong> ${formatDate(scholarship.deadline)}</p>
                ${scholarship.eligibility ? `<p><strong>Eligibility:</strong> ${scholarship.eligibility}</p>` : ""}
                ${scholarship.requirements ? `<p><strong>Requirements:</strong> ${scholarship.requirements}</p>` : ""}
                ${scholarship.notes ? `<p><strong>Notes:</strong> ${scholarship.notes}</p>` : ""}
                ${isDeadlineSoon(scholarship.deadline) ? `<p classNotes:</strong> ${scholarship.notes}</p>` : ""}
                ${isDeadlineSoon(scholarship.deadline) ? `<p class="deadline-alert"><i class="fas fa-exclamation-triangle"></i> Deadline approaching!</p>` : ""}
            </div>
            <div class="scholarship-actions">
                <button class="btn btn-small edit-scholarship" data-id="${scholarship.id}"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-small btn-danger delete-scholarship" data-id="${scholarship.id}"><i class="fas fa-trash"></i> Delete</button>
                ${scholarship.url ? `<a href="${scholarship.url}" target="_blank" class="btn btn-small btn-secondary"><i class="fas fa-external-link-alt"></i> View Details</a>` : ""}
            </div>
        `

    scholarshipList.appendChild(scholarshipCard)
  })

  // Add event listeners for edit and delete buttons
  document.querySelectorAll(".delete-scholarship").forEach((button) => {
    button.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this scholarship?")) {
        const scholarshipId = Number.parseInt(button.getAttribute("data-id"))
        deleteItem("scholarships", scholarshipId)
        setupScholarships()
      }
    })
  })

  document.querySelectorAll(".edit-scholarship").forEach((button) => {
    button.addEventListener("click", () => {
      const scholarshipId = Number.parseInt(button.getAttribute("data-id"))
      editScholarship(scholarshipId)
    })
  })
}

// Check if deadline is within 14 days
function isDeadlineSoon(deadlineStr) {
  if (!deadlineStr) return false

  const deadline = new Date(deadlineStr)
  const today = new Date()
  const diffTime = deadline - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 && diffDays <= 14
}

function displayCourses(courses) {
  const courseList = document.querySelector(".course-list")
  if (!courseList) return

  if (courses.length === 0) {
    courseList.innerHTML = '<p class="no-items">No courses added yet. Click "Add New Course" to get started.</p>'
    return
  }

  courseList.innerHTML = ""

  courses.forEach((course) => {
    // Get appropriate icon for course category
    let categoryIcon = "fa-laptop-code" // Default icon
    if (course.category) {
      switch (course.category) {
        case "web-development":
          categoryIcon = "fa-globe"
          break
        case "data-science":
          categoryIcon = "fa-chart-bar"
          break
        case "mobile-development":
          categoryIcon = "fa-mobile-alt"
          break
        case "programming":
          categoryIcon = "fa-code"
          break
        case "design":
          categoryIcon = "fa-palette"
          break
        case "business":
          categoryIcon = "fa-briefcase"
          break
        case "marketing":
          categoryIcon = "fa-bullhorn"
          break
      }
    }

    // Determine progress bar color based on status
    let progressBarColor = "var(--info-color)"
    if (course.status === "completed") {
      progressBarColor = "var(--success-color)"
    } else if (course.status === "not-started") {
      progressBarColor = "var(--gray-color)"
    }

    const courseCard = document.createElement("div")
    courseCard.className = `course-card ${course.status}`
    courseCard.innerHTML = `
            <div class="course-header">
                <h3><i class="fas ${categoryIcon} category-icon"></i> ${course.title}</h3>
                <span class="course-platform">${course.platform}</span>
                <span class="course-status ${course.status}">${formatStatus(course.status)}</span>
            </div>
            <div class="course-details">
                ${course.instructor ? `<p><strong>Instructor:</strong> ${course.instructor}</p>` : ""}
                ${course.duration ? `<p><strong>Duration:</strong> ${course.duration} hours</p>` : ""}
                ${course.description ? `<p><strong>Description:</strong> ${course.description}</p>` : ""}
                ${course.notes ? `<p><strong>Notes:</strong> ${course.notes}</p>` : ""}
                <p><strong>Progress:</strong> ${course.progress}%</p>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${course.progress}%; background-color: ${progressBarColor}"></div>
                    </div>
                    <div class="progress-actions">
                        <button class="progress-btn decrease-progress" data-id="${course.id}" ${Number.parseInt(course.progress) <= 0 ? "disabled" : ""}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="progress-btn increase-progress" data-id="${course.id}" ${Number.parseInt(course.progress) >= 100 ? "disabled" : ""}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                ${course.dateAdded ? `<p class="date-added"><small>Added on ${formatDate(course.dateAdded)}</small></p>` : ""}
            </div>
            <div class="course-actions">
                <button class="btn btn-small edit-course" data-id="${course.id}"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-small btn-danger delete-course" data-id="${course.id}"><i class="fas fa-trash"></i> Delete</button>
                ${course.url ? `<a href="${course.url}" target="_blank" class="btn btn-small btn-secondary"><i class="fas fa-external-link-alt"></i> Go to Course</a>` : ""}
            </div>
        `

    courseList.appendChild(courseCard)
  })

  // Add event listeners for edit and delete buttons
  document.querySelectorAll(".delete-course").forEach((button) => {
    button.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this course?")) {
        const courseId = Number.parseInt(button.getAttribute("data-id"))
        deleteItem("courses", courseId)
        setupCourses()
      }
    })
  })

  document.querySelectorAll(".edit-course").forEach((button) => {
    button.addEventListener("click", () => {
      const courseId = Number.parseInt(button.getAttribute("data-id"))
      editCourse(courseId)
    })
  })

  // Add event listeners for progress increment/decrement buttons
  document.querySelectorAll(".increase-progress").forEach((button) => {
    button.addEventListener("click", () => {
      const courseId = Number.parseInt(button.getAttribute("data-id"))
      updateCourseProgress(courseId, 5) // Increment progress by 5%
    })
  })

  document.querySelectorAll(".decrease-progress").forEach((button) => {
    button.addEventListener("click", () => {
      const courseId = Number.parseInt(button.getAttribute("data-id"))
      updateCourseProgress(courseId, -5) // Decrement progress by 5%
    })
  })
}

// Add function to update course progress
function updateCourseProgress(courseId, changeAmount) {
  const courses = getFromLocalStorage("courses") || []
  const courseIndex = courses.findIndex((c) => c.id === courseId)

  if (courseIndex !== -1) {
    // Get current progress and calculate new progress
    const currentProgress = Number.parseInt(courses[courseIndex].progress) || 0
    let newProgress = currentProgress + changeAmount

    // Ensure progress stays within 0-100 range
    newProgress = Math.max(0, Math.min(100, newProgress))

    // Update progress
    courses[courseIndex].progress = newProgress.toString()

    // Update status based on progress
    if (newProgress === 100) {
      courses[courseIndex].status = "completed"
    } else if (newProgress === 0) {
      courses[courseIndex].status = "not-started"
    } else {
      courses[courseIndex].status = "in-progress"
    }

    // Save to localStorage
    saveToLocalStorage("courses", courses)

    // Display updated courses
    displayCourses(courses)

    // Show notification
    showNotification(`Progress updated to ${newProgress}%`, "success")
  }
}

// Add the editJob function after the displayJobs function

function editJob(jobId) {
  const jobs = getFromLocalStorage("jobs") || []
  const job = jobs.find((job) => job.id === jobId)

  if (!job) return

  // Populate the form with job data
  document.getElementById("job-title").value = job.title
  document.getElementById("job-company").value = job.company
  document.getElementById("job-location").value = job.location || ""
  document.getElementById("job-url").value = job.url || ""
  document.getElementById("job-date-applied").value = job.dateApplied
  document.getElementById("job-status").value = job.status
  document.getElementById("job-description").value = job.description || ""
  document.getElementById("job-notes").value = job.notes || ""

  // Change the form submission to update instead of add
  const addJobForm = document.getElementById("add-job-form")
  const addJobModal = document.getElementById("add-job-modal")
  const modalTitle = addJobModal.querySelector("h2")
  const submitButton = addJobForm.querySelector('button[type="submit"]')

  // Update modal title and button text
  modalTitle.textContent = "Edit Job"
  submitButton.textContent = "Update Job"

  // Show the modal
  addJobModal.style.display = "block"

  // Store the job ID in a data attribute
  addJobForm.setAttribute("data-edit-id", jobId)

  // Update the form submission handler
  const originalSubmitHandler = addJobForm.onsubmit
  addJobForm.onsubmit = (e) => {
    e.preventDefault()

    const editId = Number.parseInt(addJobForm.getAttribute("data-edit-id"))
    const jobs = getFromLocalStorage("jobs") || []
    const jobIndex = jobs.findIndex((job) => job.id === editId)

    if (jobIndex !== -1) {
      // Update the job
      jobs[jobIndex] = {
        id: editId,
        title: document.getElementById("job-title").value,
        company: document.getElementById("job-company").value,
        location: document.getElementById("job-location").value,
        url: document.getElementById("job-url").value,
        dateApplied: document.getElementById("job-date-applied").value,
        status: document.getElementById("job-status").value,
        description: document.getElementById("job-description").value,
        notes: document.getElementById("job-notes").value,
      }

      // Save to localStorage
      saveToLocalStorage("jobs", jobs)

      // Display updated jobs
      displayJobs(jobs)

      // Close modal and reset form
      addJobModal.style.display = "none"
      addJobForm.reset()

      // Reset the form to add mode
      modalTitle.textContent = "Add New Job"
      submitButton.textContent = "Save Job"
      addJobForm.removeAttribute("data-edit-id")

      // Reset the form submission handler
      addJobForm.onsubmit = originalSubmitHandler
    }
  }

  // Handle modal close to reset form
  const closeButton = addJobModal.querySelector(".close")
  const originalCloseHandler = closeButton.onclick
  closeButton.onclick = () => {
    addJobModal.style.display = "none"
    addJobForm.reset()

    // Reset the form to add mode
    modalTitle.textContent = "Add New Job"
    submitButton.textContent = "Save Job"
    addJobForm.removeAttribute("data-edit-id")

    // Reset the form submission handler
    addJobForm.onsubmit = originalSubmitHandler

    // Reset the close button handler
    closeButton.onclick = originalCloseHandler
  }
}

// Add the editScholarship function
function editScholarship(scholarshipId) {
  const scholarships = getFromLocalStorage("scholarships") || []
  const scholarship = scholarships.find((s) => s.id === scholarshipId)

  if (!scholarship) return

  // Populate the form with scholarship data
  document.getElementById("scholarship-name").value = scholarship.name
  document.getElementById("scholarship-organization").value = scholarship.organization
  document.getElementById("scholarship-amount").value = scholarship.amount
  document.getElementById("scholarship-deadline").value = scholarship.deadline
  document.getElementById("scholarship-url").value = scholarship.url || ""
  document.getElementById("scholarship-status").value = scholarship.status
  document.getElementById("scholarship-eligibility").value = scholarship.eligibility || ""
  document.getElementById("scholarship-requirements").value = scholarship.requirements || ""
  document.getElementById("scholarship-notes").value = scholarship.notes || ""

  // Change the form submission to update instead of add
  const addScholarshipForm = document.getElementById("add-scholarship-form")
  const addScholarshipModal = document.getElementById("add-scholarship-modal")
  const modalTitle = addScholarshipModal.querySelector("h2")
  const submitButton = addScholarshipForm.querySelector('button[type="submit"]')

  // Update modal title and button text
  modalTitle.textContent = "Edit Scholarship"
  submitButton.textContent = "Update Scholarship"

  // Show the modal
  addScholarshipModal.style.display = "block"

  // Store the scholarship ID in a data attribute
  addScholarshipForm.setAttribute("data-edit-id", scholarshipId)

  // Update the form submission handler
  const originalSubmitHandler = addScholarshipForm.onsubmit
  addScholarshipForm.onsubmit = (e) => {
    e.preventDefault()

    const editId = Number.parseInt(addScholarshipForm.getAttribute("data-edit-id"))
    const scholarships = getFromLocalStorage("scholarships") || []
    const scholarshipIndex = scholarships.findIndex((s) => s.id === editId)

    if (scholarshipIndex !== -1) {
      // Update the scholarship
      scholarships[scholarshipIndex] = {
        id: editId,
        name: document.getElementById("scholarship-name").value,
        organization: document.getElementById("scholarship-organization").value,
        amount: document.getElementById("scholarship-amount").value,
        deadline: document.getElementById("scholarship-deadline").value,
        url: document.getElementById("scholarship-url").value,
        status: document.getElementById("scholarship-status").value,
        eligibility: document.getElementById("scholarship-eligibility").value,
        requirements: document.getElementById("scholarship-requirements").value,
        notes: document.getElementById("scholarship-notes").value,
      }

      // Save to localStorage
      saveToLocalStorage("scholarships", scholarships)

      // Display updated scholarships
      displayScholarships(scholarships)

      // Close modal and reset form
      addScholarshipModal.style.display = "none"
      addScholarshipForm.reset()

      // Reset the form to add mode
      modalTitle.textContent = "Add New Scholarship"
      submitButton.textContent = "Save Scholarship"
      addScholarshipForm.removeAttribute("data-edit-id")

      // Reset the form submission handler
      addScholarshipForm.onsubmit = originalSubmitHandler
    }
  }

  // Handle modal close to reset form
  const closeButton = addScholarshipModal.querySelector(".close")
  const originalCloseHandler = closeButton.onclick
  closeButton.onclick = () => {
    addScholarshipModal.style.display = "none"
    addScholarshipForm.reset()

    // Reset the form to add mode
    modalTitle.textContent = "Add New Scholarship"
    submitButton.textContent = "Save Scholarship"
    addScholarshipForm.removeAttribute("data-edit-id")

    // Reset the form submission handler
    addScholarshipForm.onsubmit = originalSubmitHandler

    // Reset the close button handler
    closeButton.onclick = originalCloseHandler
  }
}

// Add the editCourse function
function editCourse(courseId) {
  const courses = getFromLocalStorage("courses") || []
  const course = courses.find((c) => c.id === courseId)

  if (!course) return

  // Populate the form with course data
  document.getElementById("course-title").value = course.title
  document.getElementById("course-platform").value = course.platform
  document.getElementById("course-instructor").value = course.instructor || ""
  document.getElementById("course-duration").value = course.duration || ""
  document.getElementById("course-url").value = course.url || ""
  document.getElementById("course-status").value = course.status
  document.getElementById("course-progress").value = course.progress || "0"
  document.getElementById("course-category").value = course.category || ""
  document.getElementById("course-description").value = course.description || ""
  document.getElementById("course-notes").value = course.notes || ""

  // Change the form submission to update instead of add
  const addCourseForm = document.getElementById("add-course-form")
  const addCourseModal = document.getElementById("add-course-modal")
  const modalTitle = addCourseModal.querySelector("h2")
  const submitButton = addCourseForm.querySelector('button[type="submit"]')

  // Update modal title and button text
  modalTitle.textContent = "Edit Course"
  submitButton.textContent = "Update Course"

  // Show the modal
  addCourseModal.style.display = "block"

  // Store the course ID in a data attribute
  addCourseForm.setAttribute("data-edit-id", courseId)

  // Update the form submission handler
  const originalSubmitHandler = addCourseForm.onsubmit
  addCourseForm.onsubmit = (e) => {
    e.preventDefault()

    const editId = Number.parseInt(addCourseForm.getAttribute("data-edit-id"))
    const courses = getFromLocalStorage("courses") || []
    const courseIndex = courses.findIndex((c) => c.id === editId)

    if (courseIndex !== -1) {
      // Get the current date added or use today's date
      const dateAdded = courses[courseIndex].dateAdded || new Date().toISOString().slice(0, 10)

      // Update the course
      courses[courseIndex] = {
        id: editId,
        title: document.getElementById("course-title").value,
        platform: document.getElementById("course-platform").value,
        instructor: document.getElementById("course-instructor").value,
        duration: document.getElementById("course-duration").value,
        url: document.getElementById("course-url").value,
        status: document.getElementById("course-status").value,
        progress: document.getElementById("course-progress").value,
        category: document.getElementById("course-category").value,
        description: document.getElementById("course-description").value,
        notes: document.getElementById("course-notes").value,
        dateAdded: dateAdded, // Preserve the original date added
      }

      // Verify that progress matches status
      if (courses[courseIndex].status === "completed" && Number.parseInt(courses[courseIndex].progress) < 100) {
        courses[courseIndex].progress = "100"
      } else if (courses[courseIndex].status === "not-started" && Number.parseInt(courses[courseIndex].progress) > 0) {
        courses[courseIndex].progress = "0"
      } else if (
        courses[courseIndex].status === "in-progress" &&
        Number.parseInt(courses[courseIndex].progress) === 100
      ) {
        courses[courseIndex].status = "completed"
      } else if (
        courses[courseIndex].status === "in-progress" &&
        Number.parseInt(courses[courseIndex].progress) === 0
      ) {
        courses[courseIndex].status = "not-started"
      }

      // Save to localStorage
      saveToLocalStorage("courses", courses)

      // Display updated courses
      displayCourses(courses)

      // Show success message
      showNotification("Course updated successfully!", "success")

      // Close modal and reset form
      addCourseModal.style.display = "none"
      addCourseForm.reset()

      // Reset the form to add mode
      modalTitle.textContent = "Add New Course"
      submitButton.textContent = "Save Course"
      addCourseForm.removeAttribute("data-edit-id")

      // Reset the form submission handler
      addCourseForm.onsubmit = originalSubmitHandler
    }
  }

  // Handle modal close to reset form
  const closeButton = addCourseModal.querySelector(".close")
  const originalCloseHandler = closeButton.onclick
  closeButton.onclick = () => {
    addCourseModal.style.display = "none"
    addCourseForm.reset()

    // Reset the form to add mode
    modalTitle.textContent = "Add New Course"
    submitButton.textContent = "Save Course"
    addCourseForm.removeAttribute("data-edit-id")

    // Reset the form submission handler
    addCourseForm.onsubmit = originalSubmitHandler

    // Reset the close button handler
    closeButton.onclick = originalCloseHandler
  }
}

// LocalStorage Functions
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

function deleteItem(key, id) {
  const items = getFromLocalStorage(key) || []
  const updatedItems = items.filter((item) => item.id !== id)
  saveToLocalStorage(key, updatedItems)
}

// Utility Functions
function formatDate(dateString) {
  if (!dateString) return "N/A"

  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatStatus(status) {
  if (!status) return "Unknown"
  return status.split("-").map(capitalizeFirstLetter).join(" ")
}

document.querySelectorAll(".modal-cancel").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal")
    if (modal) {
      modal.style.display = "none"
      const form = modal.querySelector("form")
      if (form) form.reset()
    }
  })
})

