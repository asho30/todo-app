class TodoListPage {
    // Selectors
    getTodoContainer() {
        return cy.get('.todo-container');
    }

    getNewTaskInput() {
        return cy.get('input[placeholder="Add a new task..."]');
    }

    getAddTaskButton() {
        return cy.get('.add-task-form button[type="submit"]');
    }

    getTaskList() {
        return cy.get('.task-list');
    }

    getTaskByName(taskName) {
        return this.getTaskList().contains('li', taskName);
    }

    // Actions
    addTask(taskName) {
        this.getNewTaskInput().type(taskName);
        this.getAddTaskButton().click();
    }

    editTask(originalTaskName, updatedTaskName) {
        this.getTaskByName(originalTaskName).find('.edit-btn').click();
        cy.get('input[type="text"][value="'+ originalTaskName +'"]').clear().type(updatedTaskName);
        cy.get('.edit-form > button').click();
    }

    deleteTask(taskName) {
        this.getTaskByName(taskName).find('.delete-btn').click();
    }

    toggleTaskCompletion(taskName) {
        return this.getTaskByName(taskName).find('.task-checkbox');
    }
}

export default new TodoListPage();