// Application Data
const taskCategories = {
  "digitalMarketing": {
    "name": "Digital Marketing",
    "color": "#3B82F6",
    "activities": ["LinkedIn Content Creation", "X Platform Management", "Social Media Analytics", "Follower Growth Strategy"]
  },
  "seo": {
    "name": "Website & SEO",
    "color": "#10B981",
    "activities": ["Website Optimization", "SEO Audit", "Keyword Research", "Content Updates"]
  },
  "leadGeneration": {
    "name": "Lead Generation",
    "color": "#F59E0B",
    "activities": ["Database Building", "Email Campaigns", "Sales Navigator", "Industry Research"]
  },
  "meetings": {
    "name": "Meetings",
    "color": "#8B5CF6",
    "activities": ["GSI Partnership", "Central Marketing Team", "Quest Team Collaboration", "Internal Reviews"]
  },
  "collaterals": {
    "name": "Marketing Collaterals",
    "color": "#EF4444",
    "activities": ["Deck Creation", "Brochure Design", "UI Coordination", "Asset Development"]
  },
  "newsletter": {
    "name": "Newsletter & Content",
    "color": "#06B6D4",
    "activities": ["Content Preparation", "Approval Process", "Distribution", "LinkedIn Articles"]
  },
  "thailand": {
    "name": "Thailand Pilot",
    "color": "#84CC16",
    "activities": ["Thai Content Creation", "Market Research", "Email Campaigns", "Performance Analysis"]
  },
  "podcast": {
    "name": "Podcast",
    "color": "#F97316",
    "activities": ["Content Planning", "Guest Coordination", "Production", "Distribution"]
  },
  "analytics": {
    "name": "Analytics & Reporting",
    "color": "#6366F1",
    "activities": ["Performance Reviews", "KPI Tracking", "Campaign Analysis", "Monthly Reports"]
  }
};

let tasks = [
  {
    "id": "1",
    "title": "LinkedIn Content Creation & Posting",
    "category": "digitalMarketing",
    "day": "Monday",
    "priority": "High",
    "status": "todo",
    "description": "Create and schedule LinkedIn posts for company page"
  },
  {
    "id": "2",
    "title": "GSI Partnership Meeting",
    "category": "meetings",
    "day": "Monday",
    "priority": "High",
    "status": "todo",
    "description": "Discuss partnership strategies and initiatives"
  },
  {
    "id": "3",
    "title": "Website SEO Optimization",
    "category": "seo",
    "day": "Monday",
    "priority": "Medium",
    "status": "inprogress",
    "description": "Optimize website pages for search engines"
  },
  {
    "id": "4",
    "title": "Lead Generation Database Update",
    "category": "leadGeneration",
    "day": "Monday",
    "priority": "High",
    "status": "inprogress",
    "description": "Update and maintain lead generation database"
  },
  {
    "id": "5",
    "title": "Marketing Collaterals Review",
    "category": "collaterals",
    "day": "Monday",
    "priority": "Medium",
    "status": "todo",
    "description": "Review and approve marketing materials with UI team"
  },
  {
    "id": "6",
    "title": "Email Campaign Management",
    "category": "leadGeneration",
    "day": "Tuesday",
    "priority": "High",
    "status": "todo",
    "description": "Manage and execute email outreach campaigns"
  },
  {
    "id": "7",
    "title": "Sales Navigator Training",
    "category": "leadGeneration",
    "day": "Tuesday",
    "priority": "Medium",
    "status": "todo",
    "description": "Learn advanced Sales Navigator features"
  },
  {
    "id": "8",
    "title": "Thailand Pilot Content Development",
    "category": "thailand",
    "day": "Tuesday",
    "priority": "High",
    "status": "todo",
    "description": "Develop localized content for Thailand market"
  },
  {
    "id": "9",
    "title": "Newsletter Content Preparation",
    "category": "newsletter",
    "day": "Wednesday",
    "priority": "Medium",
    "status": "todo",
    "description": "Prepare content for LinkedIn newsletter"
  },
  {
    "id": "10",
    "title": "Podcast Planning with Rudresh",
    "category": "podcast",
    "day": "Wednesday",
    "priority": "Medium",
    "status": "todo",
    "description": "Plan podcast content and guest coordination"
  },
  {
    "id": "11",
    "title": "Central Marketing Team Meeting",
    "category": "meetings",
    "day": "Thursday",
    "priority": "High",
    "status": "done",
    "description": "Weekly coordination with central marketing team"
  },
  {
    "id": "12",
    "title": "Monthly Performance Analysis",
    "category": "analytics",
    "day": "Thursday",
    "priority": "High",
    "status": "inprogress",
    "description": "Analyze monthly marketing performance and KPIs"
  },
  {
    "id": "13",
    "title": "Customer Deck Creation",
    "category": "collaterals",
    "day": "Friday",
    "priority": "High",
    "status": "todo",
    "description": "Create presentation decks for customer meetings"
  },
  {
    "id": "14",
    "title": "X Platform Strategy Review",
    "category": "digitalMarketing",
    "day": "Friday",
    "priority": "Medium",
    "status": "todo",
    "description": "Review and optimize X platform strategy"
  },
  {
    "id": "15",
    "title": "Quest Team Collaboration",
    "category": "meetings",
    "day": "Friday",
    "priority": "Medium",
    "status": "todo",
    "description": "Collaborate with Quest team on marketing initiatives"
  }
];

let draggedTask = null;
let editingTaskId = null;
let taskIdCounter = 16;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Marketing Activity Dashboard...');
  
  // Small delay to ensure DOM is fully loaded
  setTimeout(() => {
    setupEventListeners();
    renderTasks();
    updateTaskCounts();
    console.log('Dashboard initialized successfully');
  }, 50);
});

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keyup', handleSearch);
    console.log('Search input listener attached');
  }
  
  // Filter functionality
  const dayFilter = document.getElementById('dayFilter');
  if (dayFilter) {
    dayFilter.addEventListener('change', handleFilter);
    console.log('Day filter listener attached');
  }
  
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleFilter);
    console.log('Category filter listener attached');
  }
  
  // Add task button
  const addTaskBtn = document.getElementById('addTaskBtn');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Add task button clicked');
      openAddTaskModal();
    });
    console.log('Add task button listener attached');
  }
  
  // Modal controls
  const closeModal = document.getElementById('closeModal');
  if (closeModal) {
    closeModal.addEventListener('click', function(e) {
      e.preventDefault();
      closeTaskModal();
    });
  }
  
  const cancelBtn = document.getElementById('cancelBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeTaskModal();
    });
  }
  
  const saveTaskBtn = document.getElementById('saveTaskBtn');
  if (saveTaskBtn) {
    saveTaskBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleSaveTask();
    });
  }
  
  // Form submission
  const taskForm = document.getElementById('taskForm');
  if (taskForm) {
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleSaveTask();
    });
  }
  
  // Modal overlay click
  const taskModal = document.getElementById('taskModal');
  if (taskModal) {
    taskModal.addEventListener('click', function(e) {
      if (e.target === taskModal) {
        closeTaskModal();
      }
    });
  }
  
  // Setup drag and drop
  setupDragAndDrop();
  
  console.log('All event listeners setup complete');
}

function setupDragAndDrop() {
  console.log('Setting up drag and drop...');
  
  // Add event listeners to all existing column contents
  const columns = document.querySelectorAll('.column-content');
  columns.forEach(column => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('drop', handleDrop);
    column.addEventListener('dragenter', handleDragEnter);
    column.addEventListener('dragleave', handleDragLeave);
  });
  
  console.log('Drag and drop setup complete');
}

function renderTasks() {
  console.log('Rendering tasks...');
  
  const filteredTasks = getFilteredTasks();
  console.log('Filtered tasks count:', filteredTasks.length);
  
  // Clear all columns
  const todoColumn = document.getElementById('todoColumn');
  const inprogressColumn = document.getElementById('inprogressColumn');
  const doneColumn = document.getElementById('doneColumn');
  
  if (todoColumn) todoColumn.innerHTML = '';
  if (inprogressColumn) inprogressColumn.innerHTML = '';
  if (doneColumn) doneColumn.innerHTML = '';
  
  // Group tasks by status
  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    inprogress: filteredTasks.filter(task => task.status === 'inprogress'),
    done: filteredTasks.filter(task => task.status === 'done')
  };
  
  // Render tasks in each column
  Object.keys(tasksByStatus).forEach(status => {
    const column = document.getElementById(status + 'Column');
    if (column) {
      if (tasksByStatus[status].length === 0) {
        column.innerHTML = '<div class="empty-state"><p>No tasks</p></div>';
      } else {
        tasksByStatus[status].forEach(task => {
          const taskElement = createTaskElement(task);
          column.appendChild(taskElement);
        });
      }
    }
  });
  
  console.log('Tasks rendered successfully');
}

function createTaskElement(task) {
  const taskCard = document.createElement('div');
  taskCard.className = 'task-card';
  taskCard.draggable = true;
  taskCard.dataset.taskId = task.id;
  
  const category = taskCategories[task.category];
  const priorityClass = task.priority.toLowerCase();
  
  taskCard.innerHTML = `
    <div class="task-header">
      <h4 class="task-title">${escapeHtml(task.title)}</h4>
      <div class="task-actions">
        <button class="task-action-btn edit" title="Edit task">✏️</button>
        <button class="task-action-btn delete" title="Delete task">🗑️</button>
      </div>
    </div>
    <div class="task-meta">
      <span class="task-category" style="background-color: ${category.color}">
        ${category.name}
      </span>
      <span class="task-priority ${priorityClass}">${task.priority}</span>
    </div>
    <div class="task-day">${task.day}</div>
    ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
  `;
  
  // Add drag event listeners
  taskCard.addEventListener('dragstart', function(e) {
    handleDragStart(e, task);
  });
  
  taskCard.addEventListener('dragend', handleDragEnd);
  
  // Add click event listeners for edit and delete
  const editBtn = taskCard.querySelector('.edit');
  const deleteBtn = taskCard.querySelector('.delete');
  
  if (editBtn) {
    editBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openEditTaskModal(task.id);
    });
  }
  
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      deleteTask(task.id);
    });
  }
  
  return taskCard;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getFilteredTasks() {
  const searchInput = document.getElementById('searchInput');
  const dayFilter = document.getElementById('dayFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedDay = dayFilter ? dayFilter.value : '';
  const selectedCategory = categoryFilter ? categoryFilter.value : '';
  
  return tasks.filter(task => {
    const matchesSearch = !searchTerm || 
                         task.title.toLowerCase().includes(searchTerm) ||
                         (task.description && task.description.toLowerCase().includes(searchTerm));
    const matchesDay = !selectedDay || task.day === selectedDay;
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    
    return matchesSearch && matchesDay && matchesCategory;
  });
}

function handleSearch() {
  console.log('Search triggered');
  renderTasks();
  updateTaskCounts();
}

function handleFilter() {
  console.log('Filter triggered');
  renderTasks();
  updateTaskCounts();
}

function updateTaskCounts() {
  const filteredTasks = getFilteredTasks();
  const counts = {
    todo: filteredTasks.filter(task => task.status === 'todo').length,
    inprogress: filteredTasks.filter(task => task.status === 'inprogress').length,
    done: filteredTasks.filter(task => task.status === 'done').length
  };
  
  const todoCount = document.getElementById('todoCount');
  const inprogressCount = document.getElementById('inprogressCount');
  const doneCount = document.getElementById('doneCount');
  
  if (todoCount) todoCount.textContent = counts.todo;
  if (inprogressCount) inprogressCount.textContent = counts.inprogress;
  if (doneCount) doneCount.textContent = counts.done;
}

// Drag and Drop handlers
function handleDragStart(e, task) {
  console.log('Drag start:', task.title);
  draggedTask = { element: e.target, task: task };
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', task.id);
}

function handleDragEnd(e) {
  console.log('Drag end');
  e.target.classList.remove('dragging');
  
  // Remove drag-over class from all columns
  document.querySelectorAll('.column-content').forEach(col => {
    col.classList.remove('drag-over');
  });
  
  draggedTask = null;
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  e.preventDefault();
  if (e.target.classList.contains('column-content')) {
    e.target.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  if (e.target.classList.contains('column-content')) {
    // Only remove if we're actually leaving the column
    if (!e.target.contains(e.relatedTarget)) {
      e.target.classList.remove('drag-over');
    }
  }
}

function handleDrop(e) {
  e.preventDefault();
  
  if (e.target.classList.contains('column-content')) {
    e.target.classList.remove('drag-over');
  }
  
  if (draggedTask) {
    const column = e.target.closest('.kanban-column');
    if (column) {
      const newStatus = column.dataset.status;
      const taskId = draggedTask.task.id;
      
      console.log('Dropping task', taskId, 'into', newStatus);
      
      // Find and update the task
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        task.status = newStatus;
        console.log('Task status updated to:', newStatus);
        renderTasks();
        updateTaskCounts();
      }
    }
  }
}

// Modal functions
function openAddTaskModal() {
  console.log('Opening add task modal');
  editingTaskId = null;
  
  const modalTitle = document.getElementById('modalTitle');
  const taskForm = document.getElementById('taskForm');
  const taskModal = document.getElementById('taskModal');
  
  if (modalTitle) modalTitle.textContent = 'Add New Task';
  if (taskForm) taskForm.reset();
  
  // Set default values
  const taskStatus = document.getElementById('taskStatus');
  if (taskStatus) taskStatus.value = 'todo';
  
  if (taskModal) {
    taskModal.classList.add('show');
    console.log('Modal opened');
  }
}

function openEditTaskModal(taskId) {
  console.log('Opening edit modal for task:', taskId);
  editingTaskId = taskId;
  
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    console.error('Task not found:', taskId);
    return;
  }
  
  const modalTitle = document.getElementById('modalTitle');
  const taskModal = document.getElementById('taskModal');
  
  if (modalTitle) modalTitle.textContent = 'Edit Task';
  
  // Populate form fields
  const taskTitle = document.getElementById('taskTitle');
  const taskCategory = document.getElementById('taskCategory');
  const taskDay = document.getElementById('taskDay');
  const taskPriority = document.getElementById('taskPriority');
  const taskDescription = document.getElementById('taskDescription');
  const taskStatus = document.getElementById('taskStatus');
  
  if (taskTitle) taskTitle.value = task.title;
  if (taskCategory) taskCategory.value = task.category;
  if (taskDay) taskDay.value = task.day;
  if (taskPriority) taskPriority.value = task.priority;
  if (taskDescription) taskDescription.value = task.description || '';
  if (taskStatus) taskStatus.value = task.status;
  
  if (taskModal) {
    taskModal.classList.add('show');
    console.log('Edit modal opened');
  }
}

function closeTaskModal() {
  console.log('Closing task modal');
  
  const taskModal = document.getElementById('taskModal');
  const taskForm = document.getElementById('taskForm');
  
  if (taskModal) taskModal.classList.remove('show');
  if (taskForm) taskForm.reset();
  
  editingTaskId = null;
}

function handleSaveTask() {
  console.log('Saving task...');
  
  const taskTitle = document.getElementById('taskTitle');
  const taskCategory = document.getElementById('taskCategory');
  const taskDay = document.getElementById('taskDay');
  const taskPriority = document.getElementById('taskPriority');
  const taskDescription = document.getElementById('taskDescription');
  const taskStatus = document.getElementById('taskStatus');
  
  const title = taskTitle ? taskTitle.value.trim() : '';
  const category = taskCategory ? taskCategory.value : '';
  const day = taskDay ? taskDay.value : '';
  const priority = taskPriority ? taskPriority.value : '';
  const description = taskDescription ? taskDescription.value.trim() : '';
  const status = taskStatus ? taskStatus.value : 'todo';
  
  if (!title || !category || !day || !priority) {
    alert('Please fill in all required fields (Title, Category, Day, Priority)');
    return;
  }
  
  if (editingTaskId) {
    // Update existing task
    const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title,
        category,
        day,
        priority,
        description,
        status
      };
      console.log('Task updated successfully');
    }
  } else {
    // Add new task
    const newTask = {
      id: taskIdCounter.toString(),
      title,
      category,
      day,
      priority,
      description,
      status
    };
    tasks.push(newTask);
    taskIdCounter++;
    console.log('New task added successfully');
  }
  
  closeTaskModal();
  renderTasks();
  updateTaskCounts();
}

function deleteTask(taskId) {
  console.log('Deleting task:', taskId);
  
  if (confirm('Are you sure you want to delete this task?')) {
    const originalLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);
    
    if (tasks.length < originalLength) {
      console.log('Task deleted successfully');
      renderTasks();
      updateTaskCounts();
    }
  }
}