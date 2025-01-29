import Role from "../models/roles.js";
import roleHasPermisssions from "../models/role_has_permisssions.js";
import Permissions from "../models/permissions.js";
import mongoose from "mongoose";


//Role 
export const role = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


//RoleCreate
export const rolesCreate = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, permissionIds } = req.body;

        const errors = [];

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            errors.push('The name has already been taken.');
        }

        // Validation
        if (!name) {
            errors.push('The name field is required.');
        }
        if (!permissionIds || permissionIds.length === 0) {
            errors.push('The permission field is required.');
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        async function getNextSequence(name) {
            const ret = await mongoose.connection.collection('counters').findOneAndUpdate(
                { _id: name },
                { $inc: { seq: 1 } },
                { returnOriginal: false }
            );
            return ret.seq;
        }

        const roleId = await getNextSequence('userid');

        const role = new Role({
            id: roleId,
            name: name
        });

        
        const rolePermissions = await permissionIds.map(permission_id => ({ role_id: roleId.toString(), permission_id }));
        const rolePermission = await roleHasPermisssions.insertMany(rolePermissions);
        await role.save();
        // console.log('saved role', role);
        // console.log('saved permission', rolePermission);

        return res.status(200).json({ message: "Role created successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send('The role field is required')
    }
}

//get permission
export const getPermissions = async (req, res) => {
    try {
        const permissions = await Permissions.find();
        return res.json(permissions)
    } catch (error) {
        console.log(error);
        return res.status(400).send('Error.Try again!')
    }
}


//show Role
export const viewRoles = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findOne({ id: id }, { _id: 0, id: 1, name: 1 }).select('-__v');

        const rolePermissions = await roleHasPermisssions.find({ role_id: id });

        const permissionIds = rolePermissions.map(rp => rp.permission_id);

        const permissions = await Permissions.find({ id: { $in: permissionIds } }, { _id: 0, name: 1, id: 1 });
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        // console.log(id)
        res.json({
            permissions, role
        });
    } catch (error) {
        console.error('Error fetching role details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//edit role
export const editRoles = async (req, res) => {
    try {
        const { name, permissionIds } = req.body;
        // console.log(name)
        // console.log(req.body);
        const id = req.params.id;

        const errors = [];
    
        // Validation
        if (!name) {
            errors.push('The name field is required.');
        }
        if (!permissionIds || permissionIds.length === 0) {
            errors.push('The permission field is required.');
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const result = await Role.updateOne(
            { id },
            { $set: { name } },
            { upsert: true }
        );

        const deleteResult = await roleHasPermisssions.deleteMany({ role_id: id });

        const newPermissions = permissionIds.map(permission_id => ({ permission_id, role_id: id }));

        const insertResult = await roleHasPermisssions.insertMany(newPermissions);
        res.status(200).json({ message: 'Role updated successfully' });
    }
    catch (error) {
        console.error('Error updating role details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//delete roles

export const deleteRoles = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(req)
        const deleteId = await Role.deleteOne({ id: id });
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Role delete failed' });
    }
}


