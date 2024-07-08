/// <reference types="cypress" />

class OrdersTab {
    elements = {
        emptyOrderListPlaceholder: () => cy.get('[class="woocommerce-message woocommerce-message--info"]').contains('No order has been made yet.'),
    }

    buttons = {
        goToShopButton: () => cy.get('[class="woocommerce-Button button"]')
    }

    goToShop(): void {
        this.buttons.goToShopButton().click();
    }
}

class DownloadsTab {
    elements = {
        emptyDownloadListPlaceholder: () => cy.get('[class="woocommerce-Message woocommerce-Message--info woocommerce-info"]').contains('No downloads available yet.'),
    }
}

class LogoutTab {
    buttons = {
        logoutButton: () => cy.xpath('//div[contains(@class, "woocommerce-message")]//a')
    }

    confirmAndLogout(): void {
        this.buttons.logoutButton().click();
    }
}

class MyAccountTabs {
    ordersTab = new OrdersTab();
    downloadsTab = new DownloadsTab();
    logoutTab = new LogoutTab();
}

export default new MyAccountTabs();