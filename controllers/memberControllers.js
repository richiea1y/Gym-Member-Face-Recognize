import Member from "../models/member";
import { body, validationResult } from "express-vaildator";
import asyncHandler from "express-async-handler";

/*
export const index = asyncHandler(async (req, res, next) => {
    // Get details of members, member instances, authors and genre counts (in parallel)
    const [
        numMembers,
        numMemberInstances,
        numAvailableMemberInstances,
        numAuthors,
        numGenres,
    ] = await Promise.all([
        Member.count(),
        MemberInstance.countDocuments({}).exec(),
        MemberInstance.countDocuments({ status: "Available" }).exec(),
        Author.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Local Library Home",
        member_count: numMembers,
        member_instance_count: numMemberInstances,
        member_instance_available_count: numAvailableMemberInstances,
        author_count: numAuthors,
        genre_count: numGenres,
    });
});
*/

// Display list of all members.
export const member_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: member list");
});

// Display detail page for a specific member.
export const member_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: member detail: ${req.params.id}`);
});

// Display member create form on GET.
export const member_create_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: member create GET");
};

// Handle member create on POST.
export const member_create_post = [
    body("member_id"),
    body("member_gender"),
    body("member_name"),
    body("member_phone"),
    body("member_age"),
    body("member_city"),
    body("member_image"),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data
        const author = new Member({
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
            await author.save();
            // Redirect to new author record.
            res.redirect(author.url);
        }
    }),
];

// Display member delete form on GET.
export const member_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: member delete GET");
});

// Handle member delete on POST.
export const member_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: member delete POST");
});

// Display member update form on GET.
export const member_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: member update GET");
});

// Handle member update on POST.
export const member_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: member update POST");
});