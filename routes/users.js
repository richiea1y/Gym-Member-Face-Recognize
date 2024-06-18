import express from "express";

const router = express.Router();
import member_controller from "../controllers/memberControllers.js";

// GET home page.
router.get("/", function (req, res) {
    res.send("respond with a resource");
});

/// Gym Members ///

// Get users home page.
router.get("/", member_controller.index);

// Get request for creating a Member.
router.get("/member/create", member_controller.member_create_get);

// Post request for creating a Member.
router.post("/member/create", member_controller.member_create_post);

// Get request for delete Member.
router.get("/member/:id/delete", member_controller.member_delete_get);

// Post request to delete Member.
router.post("/member/:id/delete", member_controller.member_delete_post);

// Get request to update Member.
router.get("/member/:id/update", member_controller.member_update_get);

// Post request to update Member.
router.post("/member/:id/update", member_controller.member_update_post);

// Get request for one Member.
router.get("/member/:id", member_controller.member_detail);

// Get request for list of all Members.
router.get("/members", member_controller.member_list);

export default router;