describe('importer spec', () => {
    // The request body could have been added into a fixture
    it('TC#9 The importer will filter invalid data .', () => {
        cy.request("POST",Cypress.env("test_url")+"/importer/apartments",
            [
                {
                    "id": "3",
                    "price": "0",
                    "available": true,
                    "rating": "-1",
                    "Dishwasher": true,
                    "Heating": true,
                    "Toaster": true,
                    "free cancelation":true

                },
                {
                    "id": "2",
                    "price": "400",
                    "available": true,
                    "rating": "3",
                    "Dishwasher": true,
                    "Heating": true,
                    "Toaster": true,
                    "free cancelation":true
                },
                {
                    "id": "1",
                    "price": "300",
                    "available": true,
                    "rating": "4",
                    "Internet": true,
                    "Heating": true,
                    "Telephone": true,
                    "free cancelation":true,
                    "discount":"true"                }
            ])
            // Verify on data ranges (here we verify only on price and ratings)
            .then((response) => {
              expect(response).property('status').to.equal(200)
              expect(response.body[0].rating).to.be.a('number')
              .and.to.be.lte(5).and.to.be.gte(0)
              expect(response.body[1].rating).to.be.a('number')
              .and.to.be.lte(10000).and.to.be.gt(0)
              expect(response.body[0].price).to.be.a('number')
              .and.to.be.lte(10000).and.to.be.gt(0)
              expect(response.body[1].price).to.be.a('number')
              .and.to.be.lte(10000).and.to.be.gt(0)
        })
    })
        
  
})
  