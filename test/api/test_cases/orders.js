const expect = require('chai').expect;

const request = require('supertest');

const app = require('../../../app');

/**
 * POST /orders
 */
it('POST /orders/,... OK, creating a new inventoiris', async ()=>{
    request(app).post('/orders')
    .send(
        {
            inventoryId: "5e48dc640ab53f0aa918c296",
            customerEmail: "sssd@gmail.com",
            orderQuantity:"4",
            orderStatus: "OK"
        }
    )
    .then((res)=>{
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('inventoryId');
        expect(body).to.contain.property('customerEmail');
        expect(body).to.contain.property('orderQuantity');
        expect(body).to.contain.property('orderStatus');
        done();
    }).catch(err=>{
        error: err
    });

});

/**
 * GET /orders
 */

it('GET /order/,... OK, get all orders', async ()=>{
    request(app).get('/inventories')
    .then((res)=>{
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('inventoryId');
        expect(body).to.contain.property('customerEmail');
        expect(body).to.contain.property('orderQuantity');
        expect(body).to.contain.property('orderStatus');
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
    request(app).put('/inventories/5e48ea6cecd7c80c3b4f8f72')
    .then((res)=>{
        const body = res.body;
        expect(body.message).to('Delete inventory item successful');
        done();
    }).catch(err=>{
        error: err
    });

});


