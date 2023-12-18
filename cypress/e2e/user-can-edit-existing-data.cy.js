describe('User Can Edit Existing Data', () => {
  afterEach(() => {
    cy.exec(
      'cd ../PMPL/clone/demo-app-cypress-automation && php artisan migrate:fresh --seed'
    );
  });
  // Mustika
  //before each test case
  beforeEach(() => {
    //reset database using cypress command
    cy.exec('cd ../PMPL/clone/demo-app-cypress-automation && php artisan migrate:fresh --seed');
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit('http://127.0.0.1:8000/user-management/user');
  });
  //positive test case
  it('User can edit existing data ', () => {
    cy.get('.table td')
    .contains('user')
    .parent()
    .find('a')
    .contains('Edit')
    .click();

    cy.get('#name').clear('user ');
    cy.get('#name').type('user edited');
    cy.get('.btn-primary').contains('Submit').click();
    cy.get('.table td')
    .contains('user').should('have.text', 'user edited')
    .click();
    cy.get('.alert')
    .should('be.visible')
    .and('have.class', 'alert-success')
    .and('contain', 'User Berhasil Diupdate');
  });

  it('User can cancel edit existing data ', () => {
    cy.get('.table td')
    .contains('user')
    .parent()
    .find('a')
    .contains('Edit')
    .click();

    cy.get('.btn-secondary').contains('Cancel').click();
    cy.get('.table td')
    .contains('user').should('be.visible');

  });
  //negative test case
  it('User cannot edit existing data with empty name', () => {
    cy.get('.table td')
    .contains('user')
    .parent()
    .find('a')
    .contains('Edit')
    .click();

    cy.get('#name').clear('user');
    cy.get('.btn-primary').contains('Submit').click();
    //assert
    cy.get('.invalid-feedback').should('be.visible');
    cy.get('.invalid-feedback').should('have.class', 'invalid-feedback');
    cy.get('.invalid-feedback').should('contain', 'The name field is required.');
  });

  it('User cannot edit existing data with empty email', () => {
    cy.get('.table td')
    .contains('user')
    .parent()
    .find('a')
    .contains('Edit')
    .click();

    cy.get('#email').clear('user@gmail.com');
    cy.get('.btn-primary').contains('Submit').click();
    //assert
    cy.get('.invalid-feedback').should('be.visible');
    cy.get('.invalid-feedback').should('have.class', 'invalid-feedback');
    cy.get('.invalid-feedback').should('contain', 'The email field is required.');
  });
});