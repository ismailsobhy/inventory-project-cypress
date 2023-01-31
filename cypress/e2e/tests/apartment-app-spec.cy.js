describe('apartment spec', () => {

    it('TC#12 When booking happens, extra charges should be sent from provider service to app', () => {

        cy.request("PUT",Cypress.env("test_url")+"/apartmentmanger/apartments/1",{
            "charge":"10 USD"
        })
            .then((response) => {
              expect(response).property('status').to.equal(200)
              expect(response).property('body').to.have.property('success').to.be.equal(true)
        })
    })
        
    // body can be added to fixtures instead of being here
    it('TC#14 and TC#15 Data should be accepted only if in right format', () => {
        cy.request("POST",Cypress.env("test_url")+"/apartmentmanger/apartments",
        [
            {
                "id": "1",
                "price": "300",
                "available": true,
                "rating": "4",
                "amenities": [
                    "Internet",
                    "Heating",
                    "Telephone"
                ],
                "paymentoptions": [
                    "free cancelation",
                    "discount"
                ]
            },
            {
                "id": "2",
                "price": "400",
                "available": true,
                "rating": "3",
                "amenities": [
                    "Dishwasher",
                    "Heating",
                    "Toaster"
                ],
                "paymentoptions": [
                    "free cancelation"
                ]
            }
        ]
              )
            .then((response) => {
              expect(response).property('status').to.equal(200)
              expect(response.body.success).to.equal(true)
              expect(response.body.message).to.equal("apartments loaded to apartment app")
            
        })
    })
    
})