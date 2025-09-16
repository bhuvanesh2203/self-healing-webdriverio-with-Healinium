

import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {

    get inputName() {
        return $('//*[@id="change:name"]');
    }

    get inputId() { return $('//*[@id="change_id"]'); }
    get inputClass() { return $('//*[@id="change_className"]'); }
    get descendantParent() { return $('//*[@id="descendant_change"]'); }
    get inputWait() { return $('//*[@id="change_wait"]'); }
    get linkText() { return $('//*[@id="change_links"]'); }
    get textareaEnabled() { return $('//*[@id="change_enabled"]'); }
    get checkboxDisabled() { return $('//*[@id="change_disabled"]'); }
    get checkboxChecked() { return $('//*[@id="change_checked"]'); }
    get btnSubmit() {
        return $('//*[@id="Submit"]');
    }

    /**
     * a method to find element on the page, 
     * then generate new id for it and find element agein
     */
    async fillForm() {
        await this.inputName;
        await this.btnSubmit.click();
        await this.inputName; // healing
    }
    async triggerChangeLocators() {
        await this.btnSubmit.click();
    }
    async fetchHealedInfo(element, name) {
        try {
            await element; // this triggers healing
            // Healenium automatically logs healed locator, but we can fetch some info
            const tag = await element.getTagName();
            const id = await element.getAttribute('id');
            const cls = await element.getAttribute('class');
            console.log(`Element: ${name} → Tag: ${tag}, ID: ${id}, Class: ${cls}`);
        } catch (err) {
            console.error(`Failed to fetch ${name}:`, err.message);
        }
    }

    async testAllElements() {
        console.log("=== BEFORE clicking Submit ===");
        await this.fetchHealedInfo(this.inputName, 'inputName');
        await this.fetchHealedInfo(this.inputId, 'inputId');
        await this.fetchHealedInfo(this.inputClass, 'inputClass');
        await this.fetchHealedInfo(this.descendantParent, 'descendantParent');
        await this.fetchHealedInfo(this.linkText, 'linkText');
        await this.fetchHealedInfo(this.textareaEnabled, 'textareaEnabled');
        await this.fetchHealedInfo(this.checkboxDisabled, 'checkboxDisabled');
        await this.fetchHealedInfo(this.checkboxChecked, 'checkboxChecked');

        console.log("\n=== AFTER clicking Submit ===");
        await this.triggerChangeLocators();

        await this.fetchHealedInfo(this.inputName, 'inputName');
        await this.fetchHealedInfo(this.inputId, 'inputId');
        await this.fetchHealedInfo(this.inputClass, 'inputClass');
        await this.fetchHealedInfo(this.descendantParent, 'descendantParent');
        await this.fetchHealedInfo(this.linkText, 'linkText');
        await this.fetchHealedInfo(this.textareaEnabled, 'textareaEnabled');
        await this.fetchHealedInfo(this.checkboxDisabled, 'checkboxDisabled');
        await this.fetchHealedInfo(this.checkboxChecked, 'checkboxChecked');
    }

}

export default new LoginPage();
