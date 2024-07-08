/// <reference types="cypress" />

class MyAccountPage {
    elements = {
      myAccountheader: () => cy.get('[class="page-title margin-top"]'),
      incorrectLoginInfo: () => cy.get('[class="woocommerce-error"]'),
      accountContent: () => cy.get('[class="woocommerce-MyAccount-content"]'),
      weakPasswordInfo: () => cy.get('[class="woocommerce-password-strength bad"]'),
    };
  
    buttons = {
      loginButton: () => cy.get('[class="woocommerce-Button button"]').contains('Login'),
      registerButton: () => cy.get('[class="woocommerce-Button button"]').contains('Register'),
      rememberMeButton: () => cy.get('[class="woocommerce-form__input woocommerce-form__input-checkbox"]'),
      lostPasswordButton: () => cy.xpath('//p[contains(@class, "woocommerce-LostPassword")]//a'),
      resetPasswordButton: () => cy.xpath('//input[contains(@value, "Reset password")]'),
      myAccountListButtons: (buttonName: string) => cy.get(`.woocommerce-MyAccount-navigation-link--${buttonName} > a`),
      confirmLogoutButton: () => cy.xpath('//div[@class="woocommerce-message"]//a'),
    };
  
    inputs = {
      loginInput: () => cy.xpath('//input[contains(@name, "username")]'),
      loginPasswordInput: () => cy.xpath('(//input[contains(@name, "password")])[1]'),
      emailInput: () => cy.xpath('//input[contains(@id, "reg_email")]'),
      emailPasswordInput: () => cy.xpath('//input[contains(@id, "reg_password")]'),
      forgotPasswordInput: () => cy.xpath('//input[contains(@name, "user_login")]')
    };
  
    enterLoginAndPassword(email: string = '', password: string = ''): void {
      if (email) {
        this.inputs.loginInput().clear().type(email);
      }
      if (password) {
        this.inputs.loginPasswordInput().clear().type(password);
      }
      this.buttons.loginButton().click();
    }
  
    registerAccount(email: string, password: string | null = null): void {
      this.inputs.emailInput().clear().type(email);
      if (password !== null) {
        this.inputs.emailPasswordInput().type(password);
      }
      this.buttons.registerButton().click();
    }
  
    rememberMe(): void {
      this.buttons.rememberMeButton().click();
    }
  
    lostPassword(): void {
      this.buttons.lostPasswordButton().click();
    }
  
    clickLoginButton(): void {
      this.buttons.loginButton().click();
    }
  
    clickRegisterButton(): void {
      this.buttons.registerButton().click();
    }
  
    forgotPasswordInput(value: string): void {
      this.inputs.forgotPasswordInput().type(value);
      this.buttons.resetPasswordButton().click();
    }
  
    clickButtonFromMyAccountList(buttonName: string): void {
      this.buttons.myAccountListButtons(buttonName).click();
    }
  
    moveMyAccountTab(tab: string): void {
      this.buttons.myAccountListButtons(tab).click();
    }
  }
  
  export default new MyAccountPage();