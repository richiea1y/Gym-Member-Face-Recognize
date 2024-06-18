import express from "express";
import Member from "../models/member.js";


const router = express.Router();

// GET home page.
router.get("/", (req, res) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

/// Gym Members ///

// Get users home page.
router.get("/", (req, res) => {
    console.log("")
});

// Get request for creating a Member.
router.get("/member/create", (req, res) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

// Post request for creating a Member.
router.post("/member/create", async(req, res) => {
    const member = new Member({
        member_id: req.body.member_id,
        member_gender: req.body.member_gender,
        member_name: req.body.member_name,
        member_phone: req.body.member_phone,
        member_age: req.body.member_age,
        member_city: req.body.member_city,
        member_image: req.body.member_image,
    });
    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("author_form", {
            title: "Create Author",
            author: author,
            errors: errors.array(),
        });
        return;
    } else {
        // Data from form is valid.
        // Save author.
        await member.save();
        // Redirect to new author record.
        res.redirect(member.getterMethods.profileUrl());
    }Í
});

// Get request for delete Member.
router.get("/member/:id/delete", (req, res) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

// Post request to delete Member.
router.post("/member/:id/delete", (req, res) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

// Get request to update Member.
router.get("/member/:id/update", (req, res) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

// Post request to update Member.
router.post("/member/:id/update", (req, res) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

// Get request for one Member.
router.get("/member/:id", (req, res) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

// Get request for list of all Members.
router.get("/members", (req, res) => {
    res.send("NOT IMPLEMENTED: Author update GET");
});

export default router;