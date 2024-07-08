/// <reference types="cypress" />

class MainShopPage {
    elements = {
        mainHeader: () => cy.get('[class="col-sm-4 header-logo"]'),
    }

    inputs = {
        searchInput: () => cy.get('[class="search-field-top-bar"]'),
    }

    buttons = {
        emailButton: () => cy.get('[class="top-email"]'),
        cartButton: () => cy.get('[class="top-cart"]'),
        accountButton: () => cy.get('[class="top-account"]'),
        searchInputButton: () => cy.get('[class="search-top-bar-submit"]'),
        shopButton: () => cy.get('[title="Shop"]'),
    }

    goToEmail(): void {
        this.buttons.emailButton().click();
    }

    goToCart(): void {
        this.buttons.cartButton().click();
    }

    goToAccount(): void {
        this.buttons.accountButton().click();
    }

    enterInputInSearchField(value: string): void {
        this.inputs.searchInput().type(value);
    }

    enterShop(): void {
        this.buttons.shopButton().click();
    }
}

export default new MainShopPage();