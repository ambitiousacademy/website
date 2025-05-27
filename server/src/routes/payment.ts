import express from 'express';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';
import prisma from '../lib/prisma';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const router = express.Router();


router.post('/create-order', async (req, res) => {
    try {
        const options = {
            amount: req.body.amount,
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature, "done")
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        console.log(sign, expectedSign, "Done")
        if (razorpay_signature === expectedSign) {
            // Payment is verified
            console.log("payment verified")
            res.status(200).json({ message: 'success' });
        } else {
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/user', async (req, res) => {
    try {
        const { username, phone, email, address, course, order_id, payment_id } = req.body;
        const newUser = await prisma.user.create({
            data: {
                username: username,
                phone: phone,
                email: email,
                address: address,
                course: course,
                order_id: order_id,
                payment_id: payment_id,
            },
        });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router