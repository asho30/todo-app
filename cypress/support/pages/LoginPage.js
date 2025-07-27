class LoginPage {
    // Selectors
    visit() {
        cy.visit('http://localhost:3000');
    }

    getUsernameInput() {
        return cy.get('input[placeholder="Username (Asho)"]');
    }

    getPasswordInput() {
        return cy.get('input[placeholder="Password (P@ssw0rd)"]');
    }

    getLoginButton() {
        return cy.get('button[type="submit"]');
    }

    getErrorMessage() {
        return cy.get('.error');
    }

    // Actions
    login(username, password) {
        this.getUsernameInput().type(username);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }
}

export default new LoginPage();