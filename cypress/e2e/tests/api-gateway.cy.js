describe('api gateway spec', () => {
   
    it('TC#6 The provider service can provide if an apartment is available and TC#8 for pricing', () => {

        cy.request(Cypress.env("test_url")+"/apartmentstatus/1")
        .then((response) => {
          expect(response).property('status').to.equal(200)
          expect(response).property('body').to.have.property('price').to.be.equal("300")
          expect(response).property('body').to.have.property('available').to.be.equal(true)
          expect(response).property('body').to.have.property('id').to.be.equal("1")
        })
      })

      it('TC#12 calling amenities service.', () => {

        cy.request(Cypress.env("test_url")+"/apartmentamenities/2")
        .then((response) => {
          expect(response).property('status').to.equal(200)
          expect(response).property('body').to.have.property('Internet').to.be.equal(false)
          expect(response).property('body').to.have.property('Heating').to.be.equal(true)
        })
      })
  
})
  