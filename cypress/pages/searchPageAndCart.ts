/// <reference types="cypress" />

class SearchPageAndCart {
    elements = {
        advancedSearchCheck: () => cy.get('[for="advs"]').contains('Advanced search'),
        manufacturerDropdown: (value: string) => cy.get('[name="mid"]'),
        productGrid: () => cy.get('[class="item-grid"]').scrollIntoView(),
        applePrduct: () => cy.get('[data-productid="4"]'),
        barNotification: () => cy.get('[class="bar-notification error"]'),
        productNameInCart: () => cy.get('[class="product"]'),
        qtyInCart: () => cy.get('[class="quantity"]'),
    }

    buttons = {
        searchButton: () => cy.get('[class="button-1 search-box-button"]'),
        advancedSearchButton: () => cy.get('[class="button-1 search-button"]'),
        addToCartButton: () => cy.get('[id="add-to-cart-button-4"]'),
        closeBarNotyficationButton: () => cy.get('[class="close"]'),
        shoppingCartButton: () => cy.get('[class="cart-label"]')
    }

    inputs = {
        searchStoreInput: () => cy.get('[class="search-box-text ui-autocomplete-input"]'),
        quantityProductInput: () => cy.get('[id="product_enteredQuantity_4"]'),
    }

    searchInput(value: string): void {
        this.inputs.searchStoreInput().type(value);
    }

    clickSearchButton(): void {
        this.buttons.searchButton().click();
    }

    useAdvancedSearch(): void {
        this.elements.advancedSearchCheck().click();
    }

    pickManufacturer(value: string): void {
        this.elements.manufacturerDropdown(value).select(value);
    }

    clickAdvancedSearchButton(): void {
        this.buttons.advancedSearchButton().click();
    }

    enterProductDetails(): void {
        this.elements.applePrduct().click();
    }

    quantityProduct(value: string): void {
        this.inputs.quantityProductInput().clear().type(value);
    }

    addItemToCart(): void {
        this.buttons.addToCartButton().click();
    }

    clickCloseNotyficationButton(): void {
        this.buttons.closeBarNotyficationButton().click();
    }

    goToShoppingCart(): void {
        this.buttons.shoppingCartButton().click();
    }
}
export default new SearchPageAndCart();