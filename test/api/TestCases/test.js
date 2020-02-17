const expect = require('chai').expect;

const request = require('supertest');

const app = require('../../../app');


/**
 * POST /inventories
 */
it('POST /inventoreis,... OK, creating a new inventoiris', async ()=>{
    request(app).post('/inventories')
    .send({ name: 'ITEM 2', price: '22.99', description: 'THIS IS ITEM 1', quantity: '20'})
    .then((res)=>{
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('price');
        expect(body).to.contain.property('description');
        expect(body).to.contain.property('quantity');
        done();
    }).catch(err=>{
        error: err
    });

});

/**
 * GET /inventoreis
 */

it('GET /inventoreis,... OK, get all inventoiris', async ()=>{
    request(app).get('/inventories')
    .then((res)=>{
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('price');
        expect(body).to.contain.property('description');
        expect(body).to.contain.property('quantity');
        done();
    }).catch(err=>{
        error: err
    });

});

/**
 * GET /inventoreis/items
 */
it('GET /inventory Items,... OK, get one item from inventoiris', async ()=>{
    request(app).get('/inventories/5e48dc640ab53f0aa918c296')
    .then((res)=>{
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('price');
        expect(body).to.contain.property('description');
        expect(body).to.contain.property('quantity');
        done();
    }).catch(err=>{
        error: err
    });
});