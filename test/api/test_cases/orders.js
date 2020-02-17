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
 * GET /orders/items
 */
it('GET /orders/items,... OK, get one item from orders 5e49913db8daa417fd6dda05', async ()=>{
    request(app).get('/inventories/5e49913db8daa417fd6dda05')
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
 * Update a single orderorder
 */

it('Update PUT /orders/id ,... OK, updating inventories item id: 5e498b9440a4541659a21aa6', async ()=>{
    request(app).put('/orders/5e498b9440a4541659a21aa6')
    .send([{ inventoryId: '5e48dc640ab53f0aa918c296', customerEmail: 'bcd@gmail.com', orderQuantity: '14', orderStatus: 'Good'}])
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
 * Delete order item
 */
it('DELELTE /orders/id ,... OK, Deleting inventories item id: 5e49913db8daa417fd6dda05', async ()=>{
    request(app).delete('/orders/5e49913db8daa417fd6dda05')
    .then((res)=>{
        const body = res.body;
        expect(body.message).to('Delete order successful');
        done();
    }).catch(err=>{
        error: err
    });

});


