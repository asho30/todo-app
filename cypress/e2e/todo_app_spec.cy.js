import LoginPage from '../support/pages/LoginPage';
import TodoListPage from '../support/pages/TodoListPage';

describe('To-Do App E2E Flow', () => {
    const USERNAME = 'Asho';
    const PASSWORD = 'P@ssw0rd';
    const NEW_TASK = 'Refactor tests with POM';
    const EDITED_TASK = 'Confirm tests are refactored';

    beforeEach(() => {
        // Start with a clean slate and logged-in state for each test
        LoginPage.visit();
        LoginPage.login(USERNAME, PASSWORD);
        TodoListPage.getTodoContainer().should('be.visible');
    });

    it('should allow a user to add a new task', () => {
        // ** 1. Add a new task **
        TodoListPage.addTask(NEW_TASK);
        TodoListPage.getTaskByName(NEW_TASK).should('be.visible');
    });
    
    it('should allow a user to edit a task', () => {
        // ** 2. Edit the task **
        TodoListPage.editTask(NEW_TASK, EDITED_TASK);
        TodoListPage.getTaskByName(EDITED_TASK).should('be.visible');
        TodoListPage.getTaskByName(NEW_TASK).should('not.exist');
    });
    
    it('should allow a user to complete a task', () => {
        // ** 3. Mark the task as done and then undone **
        TodoListPage.toggleTaskCompletion(EDITED_TASK).check();
        TodoListPage.getTaskByName(EDITED_TASK)
            .should('have.class', 'completed')
            .find('.task-text')
            .should('have.css', 'text-decoration-line', 'line-through');

        TodoListPage.toggleTaskCompletion(EDITED_TASK).uncheck();
        TodoListPage.getTaskByName(EDITED_TASK)
            .should('not.have.class', 'completed');
    });

    it('should allow a user to delete a task', () => {
        // ** 4. Delete the task **
        TodoListPage.deleteTask(EDITED_TASK);
        TodoListPage.getTaskByName(EDITED_TASK).should('not.exist');
    });
});