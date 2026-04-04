import { test, request, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

// Read test data
let data = JSON.parse(fs.readFileSync(path.join(__dirname, "day_31.json")));

test('Day 31 - Full CRUD API Test', async () => {

    const req = await request.newContext();
    const baseurl = data.baseurl;

    // =========================
    // 🔐 AUTH
    // =========================
    const r1 = await req.post(`${baseurl}/auth`, {
        headers: {
            "Content-Type": "application/json"
        },
        data: data.login
    });

    await expect(r1.status()).toBe(200);
    const token = (await r1.json()).token;
    console.log("Token:", token);

    // =========================
    // 📄 GET ALL BOOKINGS
    // =========================
    const r2 = await req.get(`${baseurl}/booking`);
    await expect(r2.status()).toBe(200);

    const bookingList = await r2.json();
    console.log("Booking List:", bookingList);

    // =========================
    // 🔍 GET BOOKING BY ID
    // =========================
    const bookingIdFromList = bookingList[0].bookingid;

    const r3 = await req.get(`${baseurl}/booking/${bookingIdFromList}`);
    await expect(r3.status()).toBe(200);

    console.log("Single Booking:", await r3.json());

    // =========================
    // ➕ CREATE BOOKING
    // =========================
    const r4 = await req.post(`${baseurl}/booking`, {
        headers: {
            "Content-Type": "application/json"
        },
        data: data.post
    });

    await expect(r4.status()).toBe(200);

    const response4 = await r4.json();
    console.log("Created Booking:", response4);

    const bookingid = response4.bookingid;

    // =========================
    // ✏️ UPDATE BOOKING
    // =========================
    const r5 = await req.put(`${baseurl}/booking/${bookingid}`, {
        headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`
        },
        data: data.update
    });

    await expect(r5.status()).toBe(200);
    console.log("Updated Booking:", await r5.json());

    // =========================
    // ❌ DELETE BOOKING
    // =========================
    const r6 = await req.delete(`${baseurl}/booking/${bookingid}`, {
        headers: {
            Cookie: `token=${token}`
        }
    });

    await expect([200, 201, 204]).toContain(r6.status());
    console.log("Delete Response:", await r6.text());

    // =========================
    // ✅ VERIFY DELETE
    // =========================
    const r7 = await req.get(`${baseurl}/booking/${bookingid}`);
    await expect(r7.status()).toBe(404);

    console.log("Verification Passed: Booking deleted successfully ✅");

    
});