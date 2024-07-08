/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import mainPage from '../pages/mainPage';
import myAccountPage from '../pages/myAccountPage';
import myAccountTabsPage from '../pages/myAccountTabsPage';

interface TestData {
    login: string;
    passwordFake: string;
    randomEmail: string;
    randomPassword: string;
}

const testData: TestData = {
    login: 'Lorem ipsum dolor sit amet, consectetur adip',
    passwordFake: 'Lorem',
    randomEmail: faker.internet.email(),
    randomPassword: faker.internet.password(12),
};

describe('Skleptest my account test', () => {
    beforeEach(() => {
        cy.visit('https://skleptest.pl/');
    });

    it('Fail try to login and go to forgot password screen', () => {
        mainPage.goToAccount();
        myAccountPage.clickLoginButton();
        myAccountPage.elements.incorrectLoginInfo()
            .should('be.visible').and('contain', 'Username is required.');
        myAccountPage.enterLoginAndPassword(testData.login);
        myAccountPage.elements.incorrectLoginInfo()
            .should('be.visible').and('contain', 'The password field is empty.');
        myAccountPage.lostPassword();
        cy.url()
            .should('include', '/lost-password/');
        myAccountPage.forgotPasswordInput(testData.login);
        myAccountPage.elements.incorrectLoginInfo()
            .should('be.visible').and('contain', 'Invalid username or email');
    });

    it('Create a new user and successfully login and logout', () => {
        cy.log("Go to login page");
        mainPage.goToAccount();
        cy.url()
            .should('include', '/my-account/');
        cy.log("Enter invalid credentials to register");
        myAccountPage.clickRegisterButton();
        myAccountPage.elements.incorrectLoginInfo()
            .should('be.visible').and('contain', 'Please provide a valid email address.');
        myAccountPage.registerAccount(testData.randomEmail);
        myAccountPage.clickRegisterButton();
        myAccountPage.elements.incorrectLoginInfo()
            .should('be.visible').and('contain', 'Please enter an account password.');
        cy.log("Enter valid credentials");
        myAccountPage.registerAccount(testData.randomEmail, testData.randomPassword);
        cy.log("Validate user");
        myAccountPage.elements.accountContent()
            .should('be.visible')
            .contains(testData.randomEmail.split('@')[0]);
        cy.log("Log out");
        myAccountPage.clickButtonFromMyAccountList("customer-logout");
        myAccountTabsPage.logoutTab.confirmAndLogout();
        cy.log("Incorrect login credentials");
        mainPage.goToAccount();
        myAccountPage.enterLoginAndPassword(testData.randomEmail, testData.randomPassword);
        myAccountPage.elements.accountContent()
            .should('be.visible')
            .contains(testData.randomEmail.split('@')[0]);
    });
});