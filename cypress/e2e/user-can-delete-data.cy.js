describe('template spec', () => {
  afterEach(() => {
    cy.exec(
      'cd ../PMPL/clone/demo-app-cypress-automation && php artisan migrate:fresh --seed'
    );
  });
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
  it('User can delete', () => {
    cy.get('.table td')
    .contains('user')
    .parent()
    .find('button')
    .contains('Delete')
    .click();
    //make sure sweet alert visible
    cy.get('.swal-button-container').find('button').contains('OK').click();
    cy.get('p').should('be.visible');
    cy.get('p').should('contain', 'User Deleted Successfully');
    cy.get('.table').should('not.contain', 'user');    
  });

  it('User can cancel delete data', () => {
    //arrange
    //act
    cy.get('.table td')
    .contains('user')
    .parent()
    .find('button')
    .contains('Delete')
    .click();
    //make sure sweet alert visible
    cy.get('.swal-button-container').find('button').contains('Cancel').click();
    //assert
    cy.get('.table td')
    .contains('user').should('be.visible');
  });

  it('User can cancel delete data cara lain', () => {
    cy.get('.table td')
    .contains('user')
    .parent()
    .find('button')
    .contains('Delete')
    .click();
    
    cy.get('.swal-overlay').click();
    cy.get('.table td')
    .contains('user').should('be.visible');
  });

  //negative test case
  it('dummy test', () => {
    //arrange
    //act
    //assert
  });

});