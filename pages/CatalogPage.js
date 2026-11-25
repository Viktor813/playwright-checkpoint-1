export class CatalogPage {
  constructor(page) {
    this.page = page;
  }

  async search(query) {
    await this.page.getByRole('textbox').fill(query);
  }

  async selectBrand(brand) {
    const brandGroup = this.page.getByText('Brand', { exact: true })
      .locator('xpath=ancestor::*[.//input[@type="checkbox"]][1]');
    await brandGroup.getByRole('checkbox', { name: brand, exact: true }).check();
  }

  async openProduct(name) {
    await this.page.getByRole('heading', { name, exact: true })
      .locator('xpath=ancestor::a[1]').click();
  }

  async nextPage() {
    await this.page.getByRole('link', { name: 'Next', exact: true }).first().click();
  }
}
