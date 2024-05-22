const Group = require('../models/group');
const GroupMember = require('../models/groupMember');

exports.postGroup = async (req, res) => {
    try{
        const { groupName, description } = req.body;

        console.log(`groupName: ${groupName}, description: ${description}`);

        const group = await Group.create({
            groupName,
            description,
            creatoruserId: req.user.id
        });

        console.log(group.id);
        
        // await GroupMember.create({ groupId: group.id, userId: req.user.id });

        return res.status(201).json(group);
    } catch (err) {
        console.error('Error creating Group: ', err);
        res.status(500).json({ error: 'Could not Create Room' });
    }
}