describe('Backend spec', () => {

  it('TC#0 Traveler will only get available apartments within certain filters (dates)', () => {

    cy.request({url:Cypress.env("test_url")+"/apartments", qs: {
      "startdate": "20022023",
      "days": "3"
   }})
    .then((response) => {
      expect(response).property('status').to.equal(200)
      expect(response.body[0]).to.have.property('available').to.be.equal(true)
      expect(response.body[1]).to.have.property('available').to.be.equal(true)
    })
  })

  it('TC#1 Traveler can get no available apartments in certain filters (dates) with price TC#2', () => {
    cy.request({url:Cypress.env("test_url")+"/apartments", qs: {
      "startdate": "21032023",
      "days": "2"
   },failOnStatusCode: false})
    .then((response) => {
      expect(response).property('status').to.equal(404)
      expect(response.body).to.have.property('message').to.be.equal("no unit in this time, try a different time")
    })
  })

  it('TC#3 if the traveler can book apartment', () => {
    cy.request("POST",Cypress.env("test_url")+"/apartments/1", {
      "userid": "1",
      "discount":true,
      "startdate":"2002203",
      "days":"3"
  })
    .then((response) => {
      expect(response).property('status').to.equal(200)
      console.log(response.body)
      expect(response).property('body').to.have.property('success').to.be.equal(true)
    })
  })


  it('TC#4 the travler should fail to book a no longer existing apartment', () => {
    cy.request({method:"POST",url:Cypress.env("test_url")+"/apartments/7",failOnStatusCode: false,body:{
      "userid": "1",
      "discount":false,
      "startdate":"2002203",
      "days":"3"
  }})
    .then((response) => {
      expect(response).property('status').to.equal(404)
      expect(response).property('body').to.have.property('success').to.be.equal(false)
    })
  })

  it('TC#5 The backend will update apartment status', () => {
    cy.request("PUT",Cypress.env("test_url")+"/apartmentmanger/apartmentstatus/1",{
        "available":"false"
    })
        .then((response) => {
          expect(response).property('status').to.equal(200)
          expect(response).property('body').to.have.property('success').to.be.equal(true)
    })
})

it('TC#6 The provider service can provide if an apartment is available and TC#8 for pricing', () => {

  cy.request(Cypress.env("test_url")+"/apartmentstatus/1")
  .then((response) => {
    expect(response).property('status').to.equal(200)
    expect(response).property('body').to.have.property('price').to.be.equal("300")
    expect(response).property('body').to.have.property('available').to.be.equal(true)
    expect(response).property('body').to.have.property('id').to.be.equal("1")
  })
})

it('TC#7 The provider service will return to BE if the apartment is not available', () => {

  cy.request(Cypress.env("test_url")+"/apartmentstatus/2")
  .then((response) => {
    expect(response).property('status').to.equal(200)
    expect(response).property('body').to.have.property('price').to.be.equal("400")
    expect(response).property('body').to.have.property('available').to.be.equal(false)
    expect(response).property('body').to.have.property('id').to.be.equal("2")
  })
})

it('Try to get a non existing apartment', () => {

  cy.request({url:Cypress.env("test_url")+"/apartmentstatus/3",failOnStatusCode: false})
  .then((response) => {
    expect(response).property('status').to.equal(404)
    expect(response).property('body').to.have.property('message').to.equal("unit not found")
   })
})

})