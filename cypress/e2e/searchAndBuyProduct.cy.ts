/// <reference types="cypress" />

import searchPageAndCart from "../pages/searchPageAndCart";

interface TestData {
    searchItem: string;
    advanceDropdownPicks: string;
}

const testData: TestData = {
    searchItem: "notebook",
    advanceDropdownPicks: "1",
}

describe('nopCommerce Search and filters test', () => {
    before(() => {
        cy.visit('https://demo.nopcommerce.com/')
    })

    it('Should search for eletronic devices and add it to cart', () => {
        cy.log("Check search alert");
        searchPageAndCart.clickSearchButton();
        cy.on('window:alert', (str: string) => {
            expect(str).to.include('Please enter some search keyword');
        });
        cy.log("Searching for eletronic devices");
        searchPageAndCart.searchInput(testData.searchItem);
        searchPageAndCart.clickSearchButton();
        cy.log("Use advanced search and pick manufacturer name");
        searchPageAndCart.useAdvancedSearch();
        searchPageAndCart.pickManufacturer(testData.advanceDropdownPicks);
        searchPageAndCart.clickAdvancedSearchButton();
        cy.log("Check manufacturer name");
        searchPageAndCart.elements.productGrid()
            .should('be.visible').and('contain', 'Apple');
        cy.log("Navigate to details of the product and check error");
        searchPageAndCart.enterProductDetails();
        searchPageAndCart.quantityProduct('1');
        searchPageAndCart.addItemToCart();
        searchPageAndCart.elements.barNotification()
            .should('be.visible').and('contain', 'The minimum quantity allowed for purchase is 2.')
        cy.log('Add product to cart');
        searchPageAndCart.quantityProduct('2');
        searchPageAndCart.addItemToCart();
        searchPageAndCart.clickCloseNotyficationButton();
        cy.log("Verify purchase")
        searchPageAndCart.goToShoppingCart();
        searchPageAndCart.elements.productNameInCart()
            .should('be.visible').and('contain', 'Apple');
        searchPageAndCart.elements.qtyInCart()
            .should('not.be.empty').and('contain.text', '2');
    })
});