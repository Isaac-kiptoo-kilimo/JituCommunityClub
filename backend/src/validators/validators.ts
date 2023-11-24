import Joi from "joi";


export const regUserValidation = Joi.object({
    fName: Joi.string().required().min(3).max(30),
    lName: Joi.string().required().min(3).max(30),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 })
        .custom((value, helpers) => {
            const emailParts = value;
            const [username, domain] = emailParts[0].split('.');

            if (domain !== 'thejitu' || emailParts[1] !== 'com' || !username || !domain) {
                return helpers.error('any.invalid');
            }

            return value;
        }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{3,30}$')),
    cohortNumber: Joi.string().required().min(3).max(30)
});



// user registration validators
// export const regUserValidation = Joi.object({
//     fName: Joi.string().required().min(3).max(30),
//     lName: Joi.string().required().min(3).max(30),
//     email : Joi.string().required().email({
//         minDomainSegments:2, tlds:{
//             allow: ['com', 'thejitu']
//         }
//     }),
//     password: Joi.string().required().pattern(
//         new RegExp('^[a-zA-Z0-9!@#$%^&*()]{3,30}$')
//     )
// })


// user login validators
export const loginUserValidation=Joi.object({
    email: Joi.string().required().email({
        minDomainSegments:2, tlds:{
            allow: ['com', 'ke']
        }
    }),
    password: Joi.string().required().pattern(
        new RegExp('^[a-zA-Z0-9!@#$%^&*()]{3,30}$')
    )

})

// update user validators

// export const validateUpdateuser=Joi.object({
//     fName: Joi.string().required().min(3).max(30),
//     lName: Joi.string().required().min(3).max(30),
//     email : Joi.string().required().email({
//         minDomainSegments:2, tlds:{
//             allow: ['com', 'ke']
//         }
//     })
// })

export const validateUpdateuser = Joi.object({
    fName: Joi.string().required().min(3).max(30),
    lName: Joi.string().required().min(3).max(30),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 })
        .custom((value, helpers) => {
            const emailParts = value.split('@');
            const [username, domain] = emailParts[0].split('.');

            if (domain !== 'thejitu' || emailParts[1] !== 'com' || !username || !domain) {
                return helpers.error('any.invalid');
            }

            return value;
        }),
    cohortNumber: Joi.string().required().min(3).max(30)
});

