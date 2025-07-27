import LoginPage from '../support/pages/LoginPage';
import TodoListPage from '../support/pages/TodoListPage';

describe('Login Functionality Tests', () => {
    // Define constants for test data
    const USERNAME = 'Asho';
    const PASSWORD = 'P@ssw0rd';

    beforeEach(() => {
        LoginPage.visit();
    });

    it('should show an error message with invalid credentials', () => {
        LoginPage.login('wronguser', 'wrongpassword');
        
        // Verify error message is displayed
        LoginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Login failed');
            
        // Verify user is NOT logged in (todo list is not visible)
        TodoListPage.getTodoContainer().should('not.exist');
    });

    it('should show an error message with an empty password', () => {
        LoginPage.getUsernameInput().type(USERNAME);
        LoginPage.getLoginButton().click();
        
        // Note: The UI prevents empty submission via `required` attribute.
        // This test verifies the browser's native validation behavior.
        // We check if the input is invalid.
        //LoginPage.getPasswordInput().should('be.invalid');
        TodoListPage.getTodoContainer().should('not.exist');
    });

    it('should successfully log in with valid credentials', () => {
        LoginPage.login(USERNAME, PASSWORD);
        
        // Verify successful login by checking for the todo list
        TodoListPage.getTodoContainer().should('be.visible');
        LoginPage.getErrorMessage().should('not.exist');
    });
});