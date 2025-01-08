import {ImageType} from "@/types/cloudinary";

describe('fetchImages API', () => {
    it('fetches images from Cloudinary', () => {
        cy.request('/api/fetchImages').then((response: Cypress.Response<ImageType[]>) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response!.body.length).to.be.greaterThan(0);
            expect(response.body[0]).to.have.property('url');
        });
    });
});