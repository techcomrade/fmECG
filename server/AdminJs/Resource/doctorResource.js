const User = require('../../Models/userModel.js');
const { ValidationError } = require('adminjs');
const bcrypt = require("bcryptjs");

const customDoctorBefore = (request, context) => {
    const { query = {} } = request
    const newQuery = {
        ...query,
        ['filters.role']: 1,
    }

    request.query = newQuery

    return request
}


const DoctorResource = {
    resource: User,
    options: {
        id: 'Doctor',
        parent: {
            // icon: 'User',
        },
        properties: {
            user_id: {
                position: 1,
                isVisible: { list: true, edit: false, filter: false, show: true },
            },
            name: {
                position: 2,
                isVisible: { list: true, edit: true, filter: false, show: true },
            },
            email: {
                position: 3,
                isVisible: { list: true, edit: true, filter: false, show: true },
            },
            phone_number: {
                position: 4,
                isVisible: { list: true, edit: true, filter: false, show: true },
            },
            doB: {
                position: 5,
                isVisible: { list: true, edit: true, filter: false, show: true },
            },
            role: {
                isVisible: { list: true, filter: false, show: true },
                position: 6,
                isRequired: true,
                availableValues: [
                    { value: 1, label: 'Doctor' },
                ],
            },
        },

        actions: {
            list: {
                before: [customDoctorBefore],
            },
            new: {
                before: async (request, context) => {
                    request.payload.role = 1;
                    const email = request.payload.email;
                    const existingDoctor = await User.findOne({ where: { email } });
                    const errors = {}
                    if (existingDoctor) {
                        console.log(existingDoctor)
                        errors.email = {
                            message: 'Email existed',
                        }
                    }

                    const phoneNumber = request.payload.phone_number;
                    const phoneRegex = /^\d{10,15}$/;
                    if (!phoneRegex.test(phoneNumber)) {
                        errors.phone_number = {
                            message: 'Phone number invalid',
                        }
                    }

                    const password = request.payload.password;
                    if (password) {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        request.payload.password = hashedPassword;
                    }
                    if (Object.keys(errors).length) {
                        throw new ValidationError(errors)
                    }
                    return request;
                },
                isVisible: true
            },
            edit: {
                before: async (request, context) => {
                    const errors = {};

                    const phoneNumber = request.payload.phone_number;
                    if (phoneNumber) {
                        const phoneRegex = /^\d{10,15}$/;
                        if (!phoneRegex.test(phoneNumber)) {
                            errors.phone_number = {
                                message: 'Phone number invalid',
                            }
                        }
                    }

                    const existingDoctor = await User.findByPk(request.params.recordId);
                    const password = request.payload.password;
                    if (password && password !== existingDoctor.password) {
                        const hashedPassword = await bcrypt.hash(password.toString(), 10);
                        request.payload.password = hashedPassword;
                    }


                    if (Object.keys(errors).length) {
                        throw new ValidationError(errors)
                    }
                    return request;
                },

                isVisible: true
            },
            delete: { isVisible: true },
        },

    },


};


module.exports = DoctorResource
