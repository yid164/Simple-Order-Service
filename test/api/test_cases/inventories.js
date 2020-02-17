const expect = require('chai').expect;

const request = require('supertest');

const app = require('../../../app');


/**
 * POST /inventories
 */
it('POST /inventoreis/,... OK, creating a new inventoiris', async ()=>{
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

it('GET /inventoreis/,... OK, get all inventoiris', async ()=>{
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
it('GET /inventories/items,... OK, get one item from inventoiris', async ()=>{
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

/**
 * Update inventory item
 */

it('Update PUT /inventoreis/id ,... OK, updating inventories item id: 5e48dc640ab53f0aa918c296 ', async ()=>{
    request(app).put('/inventories/5e48dc640ab53f0aa918c296')
    .send([{ name: 'ITEM 4', price: '12.99', description: 'THIS IS ITEM 4', quantity: '8'}])
    .then((res)=>{
        const body = res.body;
        expect(body).to.contain.property('ok');
        expect(body).to.contain.property('n');
        expect(body).to.contain.property('nModified');
        done();
    }).catch(err=>{
        error: err
    });

});

/**
 * Delete inventory item
 */
it('DELELTE /inventoreis/id ,... OK, Deleting inventories item id: 5e48ea6cecd7c80c3b4f8f72 ', async ()=>{
    request(app).delete('/inventories/5e48ea6cecd7c80c3b4f8f72')
    .then((res)=>{
        const body = res.body;
        expect(body.message).to('Delete inventory item successful');
        done();
    }).catch(err=>{
        error: err
    });

});